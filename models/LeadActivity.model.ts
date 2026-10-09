import mongoose from "mongoose";
import { databaseConnection } from "@/lib/database";

export type ActivityType = 
    | 'STATUS_CHANGE'
    | 'NOTE_ADDED'
    | 'EMAIL_SENT'
    | 'FILE_UPLOADED'
    | 'STAGE_UPDATE'
    | 'SAMPLE_REQUESTED'
    | 'SYSTEM';

const LeadActivitySchema = new mongoose.Schema({
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
        required: true,
        index: true,
    },
    type: {
        type: String,
        enum: ['STATUS_CHANGE', 'NOTE_ADDED', 'EMAIL_SENT', 'FILE_UPLOADED', 'STAGE_UPDATE', 'SAMPLE_REQUESTED', 'SYSTEM'],
        default: 'SYSTEM',
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
        trim: true,
    },
    performedBy: {
        type: String,
        default: 'System',
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true,
    },
});

const conn = await (async () => {
    try {
        return await databaseConnection();
    } catch {
        return mongoose;
    }
})();

export const LeadActivity = conn.models.LeadActivity || conn.model("LeadActivity", LeadActivitySchema);
