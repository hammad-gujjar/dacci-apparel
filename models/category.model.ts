import mongoose from "mongoose";
import { getApplicationConnection } from "@/lib/database";

const categorySchema = new mongoose.Schema({
    name: { type: String, required:true, unique:true },
    slug: { type: String, required:true, unique:true, lowercase:true, trim: true },
    types: [{ type: String, trim: true }],
    deletedAt: { type: Date, default: null, index: true },
}, { timestamps: true });

const conn = await (async () => {
    try {
        return await getApplicationConnection();
    } catch (e) {
        return mongoose;
    }
})();

export const Category = conn.models.Category || conn.model("Category", categorySchema, "categories");