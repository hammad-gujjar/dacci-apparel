import mongoose from "mongoose";
import { databaseConnection } from "@/lib/database";

const KnowledgeArticleSchema = new mongoose.Schema({
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
    category: {
        type: String,
        required: true,
    },
    readTime: {
        type: String,
        default: "8 min read",
    },
    publishDate: {
        type: String,
        default: () => new Date().toISOString().split('T')[0],
    },
    author: {
        name: { type: String, default: "Slots Sports Wear Engineering Team" },
        role: { type: String, default: "Technical Apparel Specialists" },
    },
    heroBadge: {
        type: String,
        default: "Technical Manufacturing Guide",
    },
    heroSummary: {
        type: String,
        required: true,
    },
    introText: {
        type: [String],
        default: [],
    },
    sections: [{
        id: { type: String },
        heading: { type: String },
        content: { type: [String], default: [] },
        keyTakeaways: { type: [String], default: [] },
    }],
    technicalSpecs: {
        title: { type: String },
        subtitle: { type: String },
        headers: { type: [String], default: [] },
        rows: { type: [[String]], default: [] },
    },
    buyerConsiderations: [{
        title: { type: String },
        description: { type: String },
        advice: { type: String },
    }],
    faqs: [{
        question: { type: String },
        answer: { type: String },
    }],
    relatedSolutions: [{
        slug: { type: String },
        title: { type: String },
        category: { type: String },
    }],
    relatedArticles: [{
        slug: { type: String },
        title: { type: String },
        readTime: { type: String },
        category: { type: String },
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
        default: "Informational / Technical Garment Specification",
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

export const KnowledgeArticle = conn.models.KnowledgeArticle || conn.model("KnowledgeArticle", KnowledgeArticleSchema);
