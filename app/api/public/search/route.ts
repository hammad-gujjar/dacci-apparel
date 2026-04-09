import { databaseConnection } from "@/lib/database";
import { Product } from "@/models/product.model";
import { Media } from "@/models/Media.model"; 
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('q');

        if (!query) {
            return NextResponse.json({ success: true, data: [] });
        }

        await databaseConnection();

        // Find products matching the tag query
        const products = await Product.find({
            tags: { $regex: query, $options: 'i' },
            deletedAt: null
        })
        .populate({ path: 'media', model: Media })
        .lean();

        // Extract unique tags that match the query and pair them with the first product found for that tag
        const tagMap = new Map();
        products.forEach((product: any) => {
            product.tags.forEach((tag: string) => {
                if (tag.toLowerCase().includes(query.toLowerCase()) && !tagMap.has(tag.toLowerCase())) {
                    tagMap.set(tag.toLowerCase(), {
                        tag: tag,
                        sampleProduct: product
                    });
                }
            });
        });

        const tagSuggestions = Array.from(tagMap.values()).slice(0, 10);
        
        const response = NextResponse.json({
            success: true,
            data: tagSuggestions
        });
        response.headers.set(
            'Cache-Control',
            'public, s-maxage=120, stale-while-revalidate=300'
        );
        return response;

    } catch (err: any) {
        console.error("Search API Error:", err);
        return NextResponse.json({ success: false, message: err?.message || "Failed to fetch suggestions" }, { status: 500 });
    }
}

