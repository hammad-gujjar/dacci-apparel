import mongoose from "mongoose";
import { getApplicationConnection } from "@/lib/database";

const MediaSchema = new mongoose.Schema({
    asset_id: { type: String, required: true, trim: true },
    public_id: { type: String, required: true, trim: true },
    path: { type: String, required: true, trim: true },
    thumbnail_url: { type: String, required:true, trim: true },
    secure_url: { type: String, required:true, trim: true },
    alt: { type: String, trim: true },
    title: { type: String, trim: true },
    deletedAt: { type: Date, default: null, index: true },
}, { timestamps: true });

const conn = await (async () => {
    try {
        return await getApplicationConnection();
    } catch (e) {
        return mongoose;
    }
})();

export const Media = conn.models.Media || conn.model("Media", MediaSchema, "medias");