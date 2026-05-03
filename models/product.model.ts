import mongoose from "mongoose";
import { getApplicationConnection } from "@/lib/database";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    productType: {
        type: String,
        trim: true,
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    media: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
            required: true
        }
    ],
    description: {
        type: String,
        required: true
    },
    tags: [{ type: String, trim: true }],
    isNew: { type: Boolean, default: false },

    deletedAt: { type: Date, default: null, index: true },
}, { timestamps: true });

productSchema.index({ category: 1 })

const conn = await (async () => {
    try {
        return await getApplicationConnection();
    } catch (e) {
        return mongoose;
    }
})();

export const Product = conn.models.Product || conn.model("Product", productSchema, "products");