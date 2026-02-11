import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { zSchema } from "@/lib/zodSchema";
import { NextResponse } from "next/server";
import { Coupon } from '@/models/Coupon.model';

export async function POST(req: Request) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' })
        }

        await databaseConnection()
        const payload = await req.json()

        const Schema = zSchema.pick({
            code: true,
            discountPercentage: true,
            minShoppingAmount: true,
            validity: true,
        })

        const validate = Schema.safeParse(payload);

        if (!validate.success) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'Invalid or missing fields.' })
        }


        const couponData = validate.data

        const newCoupon = new Coupon({
            code: couponData.code,
            discountPercentage: couponData.discountPercentage,
            minShoppingAmount: couponData.minShoppingAmount,
            validity: couponData.validity,
        })

        await newCoupon.save()

        return NextResponse.json({ success: true, statusCode: 200, message: 'Coupon created successfully.' })

    } catch (err: any) {
        return NextResponse.json({ success: false, statusCode: err?.code, message: err?.message })
    }
}