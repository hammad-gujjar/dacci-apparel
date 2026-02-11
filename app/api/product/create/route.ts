import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { zSchema } from "@/lib/zodSchema";
import { Product } from "@/models/product.model";
import { encode } from "entities";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' })
        }

        await databaseConnection()
        const payload = await req.json()

        const Schema = zSchema.pick({
            name: true,
            slug: true,
            category: true,
            productType: true,
            mrp: true,
            sellingPrice: true,
            discountPercentage: true,
            description: true,
            media: true,
        })

        const validate = Schema.safeParse(payload);

        if (!validate.success) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'Invalid or missing fields.' })
        }


        const productData = validate.data

        const newProduct = new Product({
            name: productData.name,
            slug: productData.slug,
            category: productData.category,
            productType: productData.productType,
            mrp: productData.mrp,
            sellingPrice: productData.sellingPrice,
            discountPercentage: productData.discountPercentage,
            description: encode(productData.description),
            media: productData.media,
        })

        await newProduct.save()

        return NextResponse.json({ success: true, statusCode: 200, message: 'Product created successfully.' })

    } catch (err: any) {
        return NextResponse.json({ success: false, statusCode: err?.code, message: err?.message })
    }
}