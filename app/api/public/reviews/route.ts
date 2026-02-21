import { databaseConnection } from "@/lib/databseconnection";
import { Review } from "@/models/review.model";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await databaseConnection();
        
        // Validate session
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized: Please login to leave a review." },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { product, rating, title, review } = body;

        // Basic validation
        if (!product || !rating || !title || !review) {
            return NextResponse.json(
                { success: false, message: "Missing required fields." },
                { status: 400 }
            );
        }

        const newReview = await Review.create({
            product,
            user: session.user.id,
            rating,
            title,
            review
        });

        // Populate user for the response
        const populatedReview = await Review.findById(newReview._id)
            .populate("user", "name image")
            .lean();

        return NextResponse.json({
            success: true,
            data: populatedReview,
            message: "Review submitted successfully!"
        });

    } catch (err: any) {
        console.error("Review submission error:", err);
        return NextResponse.json(
            { success: false, message: err?.message || "Internal server error" },
            { status: 500 }
        );
    }
}
