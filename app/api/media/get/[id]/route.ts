import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { Media } from "@/models/Media.model";
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

        const getMedia = await Media.findOne(filter).lean();

        if (!getMedia) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'Media not found.' });
        }

        return NextResponse.json({
            success: true,
            statusCode: 200,
            message: 'Media found',
            data: getMedia
        });

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            statusCode: err?.code,
            message: err?.message || 'Something went wrong while getting media.',
        });
    }
}