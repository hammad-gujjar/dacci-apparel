import mongoose from "mongoose";
import { databaseConnection } from "@/lib/database";

const TechPackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    company: {
        type: String,
    },
    country: {
        type: String,
    },
    website: {
        type: String,
    },
    productType: {
        type: String,
        required: true,
    },
    productSlug: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
    },
    estimatedQuantity: {
        type: String,
    },
    deadline: {
        type: Date,
        required: true,
    },
    customizationOptions: {
        type: [String],
        default: [],
    },
    customizationDetails: {
        type: String,
        default: '',
    },
    items: [{
        name: { type: String },
        slug: { type: String },
        category: { type: String },
        image: { type: String },
        quantity: { type: Number },
        color: { type: String },
        sizeRange: { type: String },
        customizationOptions: { type: [String], default: [] },
        notes: { type: String },
    }],
    files: [{
        fileName: { type: String, required: true },
        fileUrl: { type: String, required: true },
        fileType: { type: String },
        fileSize: { type: Number },
        uploadedAt: { type: Date, default: Date.now },
    }],
    isNewStatus: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

// Prevent overwrite if compiled
const conn = await (async () => {
    try {
        return await databaseConnection();
    } catch (e) {
        return mongoose;
    }
})();

export const TechPack = conn.models.TechPack || conn.model("TechPack", TechPackSchema);
