import { adminAuth } from "@/lib/adminhelperfunction";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' });
        }

        // Connect to APPLICATION database for Products and Reviews
        const appConnection = await mongoose.createConnection(
            process.env.MONGODB_URL_APPLICATION!,
            { dbName: "APPLICATION" }
        ).asPromise();

        // Connect to USERS database for User data
        const userConnection = await mongoose.createConnection(
            process.env.MONGODB_URL!,
            { dbName: "USERS" }
        ).asPromise();

        // Import models with proper connections
        const { Product } = await import("@/models/product.model");
        const { Review } = await import("@/models/review.model");
        const { User } = await import("@/models/User.model");

        // Get models bound to correct databases
        const ProductModel = appConnection.model('Product', Product.schema);
        const ReviewModel = appConnection.model('Review', Review.schema);
        const UserModel = userConnection.model('User', User.schema);

        // Get total counts
        const totalProducts = await ProductModel.countDocuments({ deletedAt: null });
        const totalUsers = await UserModel.countDocuments();
        const totalReviews = await ReviewModel.countDocuments({ deletedAt: null });

        // Get recent users (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const recentUsers = await UserModel.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        // Get user activity by day for the last 7 days
        const userActivityByDay = await UserModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Get recent reviews (without populate since they're in different databases)
        const recentReviews = await ReviewModel.find({ deletedAt: null })
            .sort({ createdAt: -1 })
            .limit(6)
            .lean();

        // Manually populate user and product data
        const reviewsWithData = await Promise.all(
            recentReviews.map(async (review: any) => {
                const user = await UserModel.findById(review.user).select('name image').lean();
                const product = await ProductModel.findById(review.product).select('name').lean();
                return {
                    ...review,
                    user: user || { name: 'Unknown User' },
                    product: product || { name: 'Unknown Product' }
                };
            })
        );

        // Calculate average rating
        const avgRatingResult = await ReviewModel.aggregate([
            { $match: { deletedAt: null } },
            { $group: { _id: null, avgRating: { $avg: "$rating" } } }
        ]);
        const avgRating = avgRatingResult.length > 0 ? avgRatingResult[0].avgRating : 0;

        // Close connections
        await appConnection.close();
        await userConnection.close();

        return NextResponse.json({
            success: true,
            data: {
                stats: {
                    totalProducts,
                    totalUsers,
                    totalReviews,
                    recentUsers,
                    avgRating: avgRating.toFixed(1)
                },
                userActivity: userActivityByDay,
                recentReviews: reviewsWithData
            }
        });

    } catch (error: any) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json({ 
            success: false, 
            statusCode: 500, 
            message: error?.message || 'Internal Server Error' 
        });
    }
}
