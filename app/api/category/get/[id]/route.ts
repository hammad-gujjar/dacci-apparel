import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { Category } from "@/models/category.model";
import { isValidObjectId } from "mongoose";
import { NextResponse, NextRequest } from "next/server";

type Params = { id: string };

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<Params> }
) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' });
        }

        await databaseConnection();

        const getParams = await params;
        const id = getParams.id;

        if (!isValidObjectId(id)) {
            return NextResponse.json({ success: false, statusCode: 400, message: 'invalid Object Id.' });
        }

        const filter: Record<string, any> = {
            deletedAt: null,
            _id: id
        };

        const getCategory = await Category.findOne(filter).lean();

        if (!getCategory) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'category not found.' });
        }

        return NextResponse.json({
            success: true,
            statusCode: 200,
            message: 'category found',
            data: getCategory
        });

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            statusCode: err?.code,
            message: err?.message || 'Something went wrong while getting category.',
        });
    }
}