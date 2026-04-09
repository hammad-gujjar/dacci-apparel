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
    deadline: {
        type: Date,
        required: true,
    },
    customizationDetails: {
        type: String,
        required: true,
    },
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
