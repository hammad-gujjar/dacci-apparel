import { databaseConnection } from "@/lib/database";
import { Category } from "@/models/category.model";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await databaseConnection();
        
        const categories = await Category.find({ deletedAt: null }).lean();

        const response = NextResponse.json({
            success: true,
            data: categories
        });
        response.headers.set(
            'Cache-Control',
            'public, s-maxage=3600, stale-while-revalidate=86400'
        );
        return response;

    } catch (err: any) {
        return NextResponse.json({ success: false, message: err?.message || "Failed to fetch categories" }, { status: 500 });
    }
}
