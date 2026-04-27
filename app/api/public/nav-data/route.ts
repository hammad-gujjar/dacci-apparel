import { databaseConnection } from "@/lib/database";
import { Category } from "@/models/category.model";
import { Product } from "@/models/product.model";
import { Media } from "@/models/Media.model";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await databaseConnection();

        // Fetch all categories
        const categories = await Category.find({ deletedAt: null }).lean();

        // For each category, fetch 2 sample products for the megamenu
        const categoriesWithProducts = await Promise.all(categories.map(async (cat: any) => {
            const products = await Product.find({ category: cat._id, deletedAt: null })
                .sort({ createdAt: -1 })
                .limit(2)
                .populate({ path: 'media', model: Media })
                .lean();

            return {
                ...cat,
                sampleProducts: products
            };
        }));

        // Sort categories so the ones with the most recently added products appear first
        categoriesWithProducts.sort((a, b) => {
            const aLatest = a.sampleProducts?.[0]?.createdAt ? new Date(a.sampleProducts[0].createdAt).getTime() : 0;
            const bLatest = b.sampleProducts?.[0]?.createdAt ? new Date(b.sampleProducts[0].createdAt).getTime() : 0;
            return bLatest - aLatest;
        });

        const response = NextResponse.json({
            success: true,
            data: categoriesWithProducts
        });
        response.headers.set(
            'Cache-Control',
            'public, s-maxage=3600, stale-while-revalidate=86400'
        );
        return response;

    } catch (err: any) {
        console.error("Nav Data API Error:", err);
        return NextResponse.json({ success: false, message: err?.message || "Failed to fetch navigation data" }, { status: 500 });
    }
}
