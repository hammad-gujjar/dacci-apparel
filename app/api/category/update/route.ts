import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { zSchema } from "@/lib/zodSchema";
import { Category } from "@/models/category.model";
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
            types: true
        });

        const validate = Schema.safeParse(payload);
        if (!validate.success) {
            return NextResponse.json({ success: false, statusCode: 400, message: 'Invalid or missing fields.' });
        }

        // destructure validated fields, using _id according to zod schema
        const { _id, name, slug, types } = validate.data;
        if (!_id || !isValidObjectId(_id)) {
            return NextResponse.json({ success: false, statusCode: 400, message: 'Invalid object id.' });
        }

        const getcategory = await Category.findOne({ deletedAt: null, _id });
        if (!getcategory) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'category not found.' });
        }

        getcategory.name = name;
        getcategory.slug = slug;
        getcategory.types = types || [];

        await getcategory.save();

        return NextResponse.json({ success: true, statusCode: 200, message: 'category updated successfully.' });

    } catch (err: any) {
        console.log(err)
        return NextResponse.json({
            success: false,
            statusCode: err?.code,
            message: err?.message || 'Something went wrong while updating category.',
        });
    }
}