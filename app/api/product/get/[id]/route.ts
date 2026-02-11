import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { Product } from "@/models/product.model";
import { isValidObjectId } from "mongoose";
import { NextResponse, NextRequest } from "next/server";
import { Media } from "@/models/Media.model";

type Params = { id: string };

export async function GET(
    request: NextRequest,
    { params }: { params: Params }
) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' });
        }

        await databaseConnection();

        const { id } = await params;


        if (!isValidObjectId(id)) {
            return NextResponse.json({ success: false, statusCode: 400, message: 'invalid Object Id.' });
        }

        const filter: Record<string, any> = {
            deletedAt: null,
            _id: id
        };

        const getProduct = await Product.findOne(filter).populate('media', 'secure_url').lean();

        if (!getProduct) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'product not found.' });
        }

        return NextResponse.json({
            success: true,
            statusCode: 200,
            message: 'product found',
            data: getProduct
        });

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            statusCode: err?.code,
            message: err?.message || 'Something went wrong while getting product.',
        });
    }
}