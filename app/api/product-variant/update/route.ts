import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { zSchema } from "@/lib/zodSchema";
import { ProductVariant } from "@/models/productVariant.model";
import { encode } from "entities";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' });
        }

        await databaseConnection();

        const payload = await request.json();

        const Schema = zSchema.pick({
            _id: true,
            product: true,
            sku: true,
            size: true,
            color: true,
            mrp: true,
            sellingPrice: true,
            discountPercentage: true,
            media: true,
        });

        const validate = Schema.safeParse(payload);
        if (!validate.success) {
            return NextResponse.json({ success: false, statusCode: 400, message: 'Invalid or missing fields.' });
        }

        // destructure validated fields, using _id according to zod schema
        const validatedData = validate.data;
        const id = validatedData._id
        if (!id || !isValidObjectId(id)) {
            return NextResponse.json({ success: false, statusCode: 400, message: 'Invalid object id.' });
        }

        const getProductVariant = await ProductVariant.findOne({ deletedAt: null, _id: id });
        if (!getProductVariant) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'product-variant not found.' });
        }

        getProductVariant.product = validatedData.product
        getProductVariant.sku = validatedData.sku
        getProductVariant.size = validatedData.size
        getProductVariant.color = validatedData.color
        getProductVariant.mrp = validatedData.mrp
        getProductVariant.sellingPrice = validatedData.sellingPrice
        getProductVariant.discountPercentage = validatedData.discountPercentage
        getProductVariant.media = validatedData.media

        await getProductVariant.save();

        return NextResponse.json({ success: true, statusCode: 200, message: 'product-variant updated successfully.' });

    } catch (err: any) {
        console.log(err)
        return NextResponse.json({
            success: false,
            statusCode: err?.code,
            message: err?.message || 'Something went wrong while updating product-variant.',
        });
    }
}