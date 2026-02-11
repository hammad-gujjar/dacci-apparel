import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { zSchema } from "@/lib/zodSchema";
import { Category } from "@/models/category.model";
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
            types: true
        })

        const validate = Schema.safeParse(payload);

        if (!validate.success) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'Invalid or missing fields.' })
        }


        const { name, slug, types } = validate.data

        const newCategory = new Category({
            name, slug, types: types || []
        })

        await newCategory.save()

        return NextResponse.json({ success: true, statusCode: 200, message: 'Category created successfully.', data: newCategory })

    } catch (err: any) {
        return NextResponse.json({ success: false, statusCode: err?.code, message: err?.message })
    }
}