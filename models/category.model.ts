import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required:true, unique:true },
    slug: { type: String, required:true, unique:true, lowercase:true, trim: true },
    types: [{ type: String, trim: true }],
    deletedAt: { type: Date, default: null, index: true },
}, { timestamps: true });

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema, "categories");