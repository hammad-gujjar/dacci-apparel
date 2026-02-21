import { databaseConnection } from "@/lib/databseconnection";
import { zSchema } from "@/lib/zodSchema";
import { Review } from "@/models/review.model";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await databaseConnection();
        
        // Validate session via Better-Auth
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ 
                success: false, 
                statusCode: 401, 
                message: 'Unauthorized: Please login to leave a review.' 
            });
        }

        const payload = await req.json();

        // Validation using zSchema
        const Schema = zSchema.pick({
            product: true,
            rating: true,
            title: true,
            review: true,
        });

        const validate = Schema.safeParse(payload);

        if (!validate.success) {
            return NextResponse.json({ 
                success: false, 
                statusCode: 400, 
                message: 'Invalid or missing fields.',
            });
        }

        const reviewData = validate.data;

        const newReview = new Review({
            product: reviewData.product,
            user: session.user.id,
            rating: reviewData.rating,
            title: reviewData.title,
            review: reviewData.review,
        });

        await newReview.save();

        // Populate user for the UI to display immediately
        const populatedReview = await Review.findById(newReview._id)
            .populate("user", "name image")
            .lean();

        return NextResponse.json({ 
            success: true, 
            statusCode: 200, 
            data: populatedReview,
            message: 'Your thought has been captured successfully.' 
        });

    } catch (err: any) {
        console.error("Review creation error:", err);
        return NextResponse.json({ 
            success: false, 
            statusCode: err?.code || 500, 
            message: err?.message || 'Internal server error' 
        });
    }
}