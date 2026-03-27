import mongoose from "mongoose";
import { getApplicationConnection } from "@/lib/database";

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    discountPercentage: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    minShoppingAmount: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    validity: {
        type: Date,
        required: true,
    },
    deletedAt: { type: Date, default: null, index: true },
}, { timestamps: true });

const conn = await (async () => {
    try {
        return await getApplicationConnection();
    } catch (e) {
        return mongoose;
    }
})();

export const Coupon = conn.models.Coupon || conn.model("Coupon", CouponSchema, "coupons");