import mongoose from "mongoose";
import { getUsersConnection } from "@/lib/database";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    phone: {
        type: Number,
    },
    // better-auth fields
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
}, {
    timestamps: true,
    collection: 'user' // Explicitly map to 'user' collection used by better-auth
});

// Prevent overwrite if compiled
const conn = await (async () => {
    try {
        return await getUsersConnection();
    } catch (e) {
        return mongoose;
    }
})();

export const User = conn.models.User || conn.model("User", UserSchema, "user");