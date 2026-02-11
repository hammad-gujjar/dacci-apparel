import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { Coupon } from "@/models/Coupon.model";
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

        const { id } = await params;


        if (!isValidObjectId(id)) {
            return NextResponse.json({ success: false, statusCode: 400, message: 'invalid Object Id.' });
        }

        const filter: Record<string, any> = {
            deletedAt: null,
            _id: id
        };

        const getCoupon = await Coupon.findOne(filter).lean();

        if (!getCoupon) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'coupon not found.' });
        }

        return NextResponse.json({
            success: true,
            statusCode: 200,
            message: 'coupon found',
            data: getCoupon
        });

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            statusCode: err?.code,
            message: err?.message || 'Something went wrong while getting coupon.',
        });
    }
}