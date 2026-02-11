import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { zSchema } from "@/lib/zodSchema";
import { Coupon } from "@/models/Coupon.model";
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
            code: true,
            discountPercentage: true,
            minShoppingAmount: true,
            validity: true,
        })

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

        const getCoupon = await Coupon.findOne({ deletedAt: null, _id: id });
        if (!getCoupon) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'coupon not found.' });
        }

        getCoupon.code = validatedData.code
        getCoupon.discountPercentage = validatedData.discountPercentage
        getCoupon.minShoppingAmount = validatedData.minShoppingAmount
        getCoupon.validity = validatedData.validity

        await getCoupon.save();

        return NextResponse.json({ success: true, statusCode: 200, message: 'coupon updated successfully.' });

    } catch (err: any) {
        console.log(err)
        return NextResponse.json({
            success: false,
            statusCode: err?.code,
            message: err?.message || 'Something went wrong while updating coupon.',
        });
    }
}