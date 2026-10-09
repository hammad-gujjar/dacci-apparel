import { NextResponse } from "next/server";
import { databaseConnection } from "@/lib/database";
import { adminAuth } from "@/lib/adminhelperfunction";
import { KnowledgeArticle } from "@/models/KnowledgeArticle.model";
import { getKnowledgeArticle } from "@/lib/seo/knowledgeData";

interface Params {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(req: Request, { params }: Params) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        const { id } = await params;
        await databaseConnection();

        // Check if querying by static prefix
        if (id.startsWith('static_')) {
            const slug = id.replace('static_', '');
            const staticData = getKnowledgeArticle(slug);
            if (!staticData) {
                return NextResponse.json({ success: false, message: "Knowledge guide not found in static repository" }, { status: 404 });
            }
            return NextResponse.json({
                success: true,
                data: {
                    _id: id,
                    isStaticFallback: true,
                    ...staticData,
                    targetKeyword: staticData.title,
                    secondaryKeywords: [],
                    searchIntent: 'Informational / Technical Garment Specification',
                    status: 'Published',
                    published: true,
                    noIndex: false,
                },
            }, { status: 200 });
        }

        // Query by DB ID or slug
        let article = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            article = await KnowledgeArticle.findById(id).lean();
        }
        if (!article) {
            article = await KnowledgeArticle.findOne({ slug: id }).lean();
        }

        if (!article) {
            // Check static fallback
            const staticData = getKnowledgeArticle(id);
            if (staticData) {
                return NextResponse.json({
                    success: true,
                    data: {
                        _id: `static_${staticData.slug}`,
                        isStaticFallback: true,
                        ...staticData,
                        targetKeyword: staticData.title,
                        secondaryKeywords: [],
                        searchIntent: 'Informational / Technical Garment Specification',
                        status: 'Published',
                        published: true,
                        noIndex: false,
                    },
                }, { status: 200 });
            }

            return NextResponse.json({ success: false, message: "Knowledge guide not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: article }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching knowledge article:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to fetch article" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: Params) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();

        await databaseConnection();

        const status = body.status || (body.published === false ? 'Draft' : 'Published');
        const published = status === 'Published';

        // If promoting/updating a static fallback
        if (id.startsWith('static_')) {
            const slug = body.slug || id.replace('static_', '');

            let existing = await KnowledgeArticle.findOne({ slug });
            if (existing) {
                Object.assign(existing, {
                    ...body,
                    status,
                    published,
                    updatedAt: new Date(),
                });
                await existing.save();
                return NextResponse.json({
                    success: true,
                    data: existing,
                    message: `Knowledge guide "${existing.title}" updated successfully in database.`,
                }, { status: 200 });
            }

            const newArticle = await KnowledgeArticle.create({
                ...body,
                slug,
                status,
                published,
            });

            return NextResponse.json({
                success: true,
                data: newArticle,
                message: `Static guide converted to database CMS record successfully.`,
            }, { status: 201 });
        }

        // Standard DB update by ID or slug
        let article = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            article = await KnowledgeArticle.findById(id);
        }
        if (!article) {
            article = await KnowledgeArticle.findOne({ slug: id });
        }

        if (!article) {
            const newRecord = await KnowledgeArticle.create({
                ...body,
                status,
                published,
            });
            return NextResponse.json({
                success: true,
                data: newRecord,
                message: `Knowledge guide created in database.`,
            }, { status: 201 });
        }

        article.title = body.title || article.title;
        article.slug = body.slug || article.slug;
        article.metaTitle = body.metaTitle || article.metaTitle;
        article.metaDescription = body.metaDescription || article.metaDescription;
        article.category = body.category || article.category;
        article.readTime = body.readTime || article.readTime;
        article.publishDate = body.publishDate || article.publishDate;
        article.author = body.author || article.author;
        article.heroBadge = body.heroBadge || article.heroBadge;
        article.heroSummary = body.heroSummary || article.heroSummary;
        article.introText = Array.isArray(body.introText) ? body.introText : article.introText;
        article.sections = Array.isArray(body.sections) ? body.sections : article.sections;
        article.technicalSpecs = body.technicalSpecs || article.technicalSpecs;
        article.buyerConsiderations = Array.isArray(body.buyerConsiderations) ? body.buyerConsiderations : article.buyerConsiderations;
        article.faqs = Array.isArray(body.faqs) ? body.faqs : article.faqs;
        article.relatedSolutions = Array.isArray(body.relatedSolutions) ? body.relatedSolutions : article.relatedSolutions;
        article.relatedArticles = Array.isArray(body.relatedArticles) ? body.relatedArticles : article.relatedArticles;
        article.targetKeyword = body.targetKeyword !== undefined ? body.targetKeyword : article.targetKeyword;
        article.secondaryKeywords = Array.isArray(body.secondaryKeywords) ? body.secondaryKeywords : article.secondaryKeywords;
        article.searchIntent = body.searchIntent || article.searchIntent;
        article.canonicalUrl = body.canonicalUrl !== undefined ? body.canonicalUrl : article.canonicalUrl;
        article.noIndex = body.noIndex !== undefined ? Boolean(body.noIndex) : article.noIndex;
        article.status = status;
        article.published = published;

        await article.save();

        return NextResponse.json({
            success: true,
            data: article,
            message: `Knowledge guide "${article.title}" updated successfully.`,
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error updating knowledge guide:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to update knowledge guide" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        const { id } = await params;
        await databaseConnection();

        if (id.startsWith('static_')) {
            return NextResponse.json({
                success: false,
                message: "Cannot delete a hardcoded static guide. You can override it by saving a draft or archived record in the database.",
            }, { status: 400 });
        }

        const deleted = await KnowledgeArticle.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ success: false, message: "Knowledge guide not found in database" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: `Knowledge guide "${deleted.title}" deleted from database.`,
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error deleting knowledge guide:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to delete knowledge guide" }, { status: 500 });
    }
}
