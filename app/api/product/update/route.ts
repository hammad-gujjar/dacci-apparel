import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { zSchema } from "@/lib/zodSchema";
import { Product } from "@/models/product.model";
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
            name: true,
            slug: true,
            category: true,
            mrp: true,
            sellingPrice: true,
            discountPercentage: true,
            description: true,
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

        const getProduct = await Product.findOne({ deletedAt: null, _id: id });
        if (!getProduct) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'product not found.' });
        }

        getProduct.name = validatedData.name
        getProduct.slug = validatedData.slug
        getProduct.category = validatedData.category
        getProduct.mrp = validatedData.mrp
        getProduct.sellingPrice = validatedData.sellingPrice
        getProduct.discountPercentage = validatedData.discountPercentage
        getProduct.description = encode(validatedData.description)
        getProduct.media = validatedData.media

        await getProduct.save();

        return NextResponse.json({ success: true, statusCode: 200, message: 'product updated successfully.' });

    } catch (err: any) {
        console.log(err)
        return NextResponse.json({
            success: false,
            statusCode: err?.code,
            message: err?.message || 'Something went wrong while updating product.',
        });
    }
}