import mongoose from "mongoose";
import { databaseConnection } from "@/lib/database";

export type LeadStatus = 'New' | 'Contacted' | 'Sample Requested' | 'Production' | 'Completed' | 'Rejected';
export type LeadPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    userId: {
        type: String,
        trim: true,
        default: '',
        index: true,
    },
    company: {
        type: String,
        trim: true,
        default: '',
    },
    country: {
        type: String,
        trim: true,
        default: 'Global / Unspecified',
    },
    website: {
        type: String,
        trim: true,
        default: '',
    },
    phone: {
        type: String,
        trim: true,
        default: '',
    },
    productType: {
        type: String,
        required: true,
        trim: true,
    },
    productSlug: {
        type: String,
        trim: true,
        default: '',
    },
    quantity: {
        type: Number,
        required: true,
        default: 30,
    },
    estimatedQuantity: {
        type: String,
        default: '30 pcs',
    },
    deadline: {
        type: Date,
        default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
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
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Sample Requested', 'Production', 'Completed', 'Rejected'],
        default: 'New',
        index: true,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium',
    },
    leadSource: {
        type: String,
        default: 'Website RFQ',
    },
    estimatedValue: {
        type: Number,
        default: 0,
    },
    notes: [{
        note: { type: String, required: true },
        author: { type: String, default: 'Admin' },
        createdAt: { type: Date, default: Date.now },
    }],
    lastContactedAt: {
        type: Date,
    },
    isArchived: {
        type: Boolean,
        default: false,
        index: true,
    },
    techPackRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TechPack',
    },
}, {
    timestamps: true,
});

// Compile or reuse on application connection
const conn = await (async () => {
    try {
        return await databaseConnection();
    } catch {
        return mongoose;
    }
})();

export const Lead = conn.models.Lead || conn.model("Lead", LeadSchema);
