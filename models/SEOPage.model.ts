import mongoose from "mongoose";
import { databaseConnection } from "@/lib/database";

const SEOPageSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
    },
    metaTitle: {
        type: String,
        required: true,
    },
    metaDescription: {
        type: String,
        required: true,
    },
    keywords: {
        type: [String],
        default: [],
    },
    heroBadge: {
        type: String,
        default: "OEM / ODM Manufacturing Excellence",
    },
    heroDescription: {
        type: String,
    },
    stats: [{
        value: { type: String },
        label: { type: String },
    }],
    introHeading: {
        type: String,
    },
    introText: {
        type: [String],
        default: [],
    },
    benefits: [{
        title: { type: String },
        description: { type: String },
        icon: { type: String },
    }],
    capabilities: [{
        title: { type: String },
        description: { type: String },
        specs: { type: [String], default: [] },
    }],
    fabrics: [{
        name: { type: String },
        weight: { type: String },
        composition: { type: String },
        bestFor: { type: String },
    }],
    customization: [{
        name: { type: String },
        description: { type: String },
        moq: { type: String },
    }],
    faqs: [{
        question: { type: String },
        answer: { type: String },
    }],
    targetKeyword: {
        type: String,
    },
    secondaryKeywords: {
        type: [String],
        default: [],
    },
    searchIntent: {
        type: String,
        default: "Commercial / B2B OEM Sourcing",
    },
    canonicalUrl: {
        type: String,
    },
    noIndex: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["Draft", "Published", "Archived"],
        default: "Published",
    },
    published: {
        type: Boolean,
        default: true,
    },
    relatedKnowledgeGuides: [{
        slug: { type: String },
        title: { type: String },
        readTime: { type: String },
        category: { type: String },
    }],
    relatedProducts: [{
        slug: { type: String },
        name: { type: String },
        category: { type: String },
        image: { type: String },
    }],
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

export const SEOPage = conn.models.SEOPage || conn.model("SEOPage", SEOPageSchema);
