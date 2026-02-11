import mongoose from "mongoose";

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

export const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema, "coupons");