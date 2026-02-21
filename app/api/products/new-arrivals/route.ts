import { databaseConnection } from "@/lib/databseconnection";
import { Product } from "@/models/product.model";
import { Category } from "@/models/category.model"; // Ensure Category is registered
import { Media } from "@/models/Media.model"; // Ensure Media is registered
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await databaseConnection();

        const newArrivals = await Product.find({ deletedAt: null })
            .sort({ createdAt: -1 })
            .limit(6)
            .populate("media")
            .populate("category", "name");

        return NextResponse.json({
            success: true,
            data: newArrivals
        });

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message
        }, { status: 500 });
    }
}