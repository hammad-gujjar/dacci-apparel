import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { Product } from "@/models/product.model";
import { isValidObjectId } from "mongoose";
import { NextResponse, NextRequest } from "next/server";
import { Media } from "@/models/Media.model";
import { ProductVariant } from "@/models/productVariant.model";

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

        const { id } = await params;


        if (!isValidObjectId(id)) {
            return NextResponse.json({ success: false, statusCode: 400, message: 'invalid Object Id.' });
        }

        const filter: Record<string, any> = {
            deletedAt: null,
            _id: id
        };

        const getProductVariant = await ProductVariant.findOne(filter).populate('media', 'secure_url').lean();

        if (!getProductVariant) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'product-variant not found.' });
        }

        return NextResponse.json({
            success: true,
            statusCode: 200,
            message: 'product-variant found',
            data: getProductVariant
        });

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            statusCode: err?.code,
            message: err?.message || 'Something went wrong while getting product-variant.',
        });
    }
}