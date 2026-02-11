import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { zSchema } from "@/lib/zodSchema";
import { Media } from "@/models/Media.model";
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
            alt: true,
            title: true,
        });

        const validate = Schema.safeParse(payload);
        if (!validate.success) {
            return NextResponse.json({ success: false, statusCode: 400, message: 'Invalid or missing fields.' });
        }

        // destructure validated fields, using _id according to zod schema
        const { _id, alt, title } = validate.data;
        if (!_id || !isValidObjectId(_id)) {
            return NextResponse.json({ success: false, statusCode: 400, message: 'Invalid object id.' });
        }

        const getMedia = await Media.findById(_id);
        if (!getMedia) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'Media not found.' });
        }

        getMedia.alt = alt;
        getMedia.title = title;

        await getMedia.save();

        return NextResponse.json({ success: true, statusCode: 200, message: 'Media updated successfully.' });

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            statusCode: err?.code,
            message: err?.message || 'Something went wrong while updating media.',
        });
    }
}