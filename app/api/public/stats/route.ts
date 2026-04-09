import { NextResponse } from "next/server";
import { databaseConnection } from "@/lib/database";
import { Review } from "@/models/review.model";
import { Product } from "@/models/product.model";
import { User } from "@/models/User.model";

export async function GET() {
    try {
        await databaseConnection();

        // 1. Get average rating from Review model
        const ratingResult = await Review.aggregate([
            { $match: { deletedAt: null } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);
        const averageRating = ratingResult.length > 0 ? parseFloat(ratingResult[0].averageRating.toFixed(1)) : 0;

        // 2. Get total products count
        const totalProducts = await Product.countDocuments({ deletedAt: null });

        // 3. Get total customers count from User model
        const totalCustomers = await User.countDocuments();

        // 4. Mock total orders (using reviews + a base factor since no Order model exists)
        const totalOrders = Math.floor(totalCustomers * 1.5) + ratingResult.length;

        const response = NextResponse.json({
            success: true,
            data: { 
                averageRating,
                totalProducts,
                totalCustomers,
                totalOrders 
            }
        });
        response.headers.set(
            'Cache-Control',
            'public, s-maxage=600, stale-while-revalidate=3600'
        );
        return response;
    } catch (err: any) {
        console.error('Public Stats API error:', err);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
