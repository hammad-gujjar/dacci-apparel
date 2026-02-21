import { databaseConnection } from "@/lib/databseconnection";
import { Category } from "@/models/category.model";
import { Product } from "@/models/product.model";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await databaseConnection();
        
        // Fetch all categories
        const categories = await Category.find({ deletedAt: null }).lean();

        // For each category, fetch 2 sample products for the megamenu
        const categoriesWithProducts = await Promise.all(categories.map(async (cat: any) => {
            const products = await Product.find({ category: cat._id, deletedAt: null })
                .limit(2)
                .populate('media')
                .lean();
            
            return {
                ...cat,
                sampleProducts: products
            };
        }));

        return NextResponse.json({
            success: true,
            data: categoriesWithProducts
        });

    } catch (err: any) {
        console.error("Nav Data API Error:", err);
        return NextResponse.json({ success: false, message: err?.message || "Failed to fetch navigation data" }, { status: 500 });
    }
}
