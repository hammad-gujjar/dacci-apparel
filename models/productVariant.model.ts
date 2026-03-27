import mongoose from "mongoose";
import { getApplicationConnection } from "@/lib/database";

const productVariantSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    color: { type: String, required: true, trim: true },
    size: { type: String, required: false, trim: true, default: null },
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
    sku: {
        type: String,
        required: true,
        unique: true
    },
    media: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
            required: true
        }
    ],
    deletedAt: { type: Date, default: null, index: true },
}, { timestamps: true });

productVariantSchema.index({ product: 1 })

const conn = await (async () => {
    try {
        return await getApplicationConnection();
    } catch (e) {
        return mongoose;
    }
})();

export const ProductVariant = conn.models.ProductVariant || conn.model("ProductVariant", productVariantSchema, "productvariants");