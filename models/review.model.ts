import mongoose from "mongoose";
import { getApplicationConnection } from "@/lib/database";

const ReviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    review: {
        type: String,
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

export const Review = conn.models.Review || conn.model("Review", ReviewSchema, "reviews");