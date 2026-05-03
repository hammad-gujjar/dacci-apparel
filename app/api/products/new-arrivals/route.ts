import { databaseConnection } from "@/lib/database";
import { Product } from "@/models/product.model";
import { Category } from "@/models/category.model";
import { Media } from "@/models/Media.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await databaseConnection();

        const newArrivals = await Product.find({ deletedAt: null, isNew: true })
            .sort({ createdAt: -1 })
            .limit(8)
            .populate({ path: "media", model: Media })
            .populate({ path: "category", model: Category, select: "name" })
            .lean();

        // Calculate averageRating for each product
        const { Review } = await import("@/models/review.model");
        const productsWithRating = await Promise.all(newArrivals.map(async (product: any) => {
            const reviews = await Review.find({ product: product._id, deletedAt: null });
            const averageRating = reviews.length > 0
                ? reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0) / reviews.length
                : 0;
            return { ...product, averageRating };
        }));

        return NextResponse.json({
            success: true,
            data: productsWithRating
        });

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message
        }, { status: 500 });
    }
}