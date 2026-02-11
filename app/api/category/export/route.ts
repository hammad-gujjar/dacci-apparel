import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { Category } from "@/models/category.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' });
        }

        await databaseConnection();

        const filter: Record<string, any> = {
            deletedAt: null,
        };

        // .find() returns all fields including type by default
        const getcategory = await Category.find(filter).sort({ createdAt: -1 }).lean()

        if(!getcategory) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'Collection empty' });
        }

        return NextResponse.json({ success: true, statusCode: 200, message: 'Collection has been export', data:getcategory });

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            statusCode: err?.code,
            message: err?.message || 'Something went wrong while getting category.',
        });
    }
}