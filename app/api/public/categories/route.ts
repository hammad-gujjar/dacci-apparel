import { databaseConnection } from "@/lib/databseconnection";
import { Category } from "@/models/category.model";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await databaseConnection();
        
        const categories = await Category.find({ deletedAt: null }).lean();

        return NextResponse.json({
            success: true,
            data: categories
        });

    } catch (err: any) {
        return NextResponse.json({ success: false, message: err?.message || "Failed to fetch categories" }, { status: 500 });
    }
}
