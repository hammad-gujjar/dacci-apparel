import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { zSchema } from "@/lib/zodSchema";
import { NextResponse } from "next/server";
import { ProductVariant } from "@/models/productVariant.model";

export async function POST(req: Request) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' })
        }

        await databaseConnection()
        const payload = await req.json()

        const Schema = zSchema.pick({
            product: true,
            color: true,
            sku: true,
            size: true,
            mrp: true,
            sellingPrice: true,
            discountPercentage: true,
            media: true,
        })

        const validate = Schema.safeParse(payload);

        if (!validate.success) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'Invalid or missing fields.' })
        }


        const variantData = validate.data

        const newVariant = new ProductVariant({
            product: variantData.product,
            color: variantData.color,
            sku: variantData.sku,
            size: variantData.size,
            mrp: variantData.mrp,
            sellingPrice: variantData.sellingPrice,
            discountPercentage: variantData.discountPercentage,
            media: variantData.media,
        })

        await newVariant.save()

        return NextResponse.json({ success: true, statusCode: 200, message: 'Variant created successfully.' })

    } catch (err: any) {
        return NextResponse.json({ success: false, statusCode: err?.code, message: err?.message })
    }
}