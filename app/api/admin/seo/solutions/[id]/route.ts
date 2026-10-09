import { NextResponse } from "next/server";
import { databaseConnection } from "@/lib/database";
import { adminAuth } from "@/lib/adminhelperfunction";
import { SEOPage } from "@/models/SEOPage.model";
import { getSolutionData } from "@/lib/seo/solutionsData";

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

        // Check if querying by MongoDB ObjectId or static prefix
        if (id.startsWith('static_')) {
            const slug = id.replace('static_', '');
            const staticData = getSolutionData(slug);
            if (!staticData) {
                return NextResponse.json({ success: false, message: "Solution not found in static repository" }, { status: 404 });
            }
            return NextResponse.json({
                success: true,
                data: {
                    _id: id,
                    isStaticFallback: true,
                    ...staticData,
                    targetKeyword: staticData.keywords?.[0] || 'Sportswear Manufacturing',
                    secondaryKeywords: staticData.keywords?.slice(1) || [],
                    searchIntent: 'Commercial / B2B OEM Sourcing',
                    status: 'Published',
                    published: true,
                    noIndex: false,
                },
            }, { status: 200 });
        }

        // Query by DB ID or slug
        let page = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            page = await SEOPage.findById(id).lean();
        }
        if (!page) {
            page = await SEOPage.findOne({ slug: id }).lean();
        }

        if (!page) {
            // Check if exists in static data as fallback
            const staticData = getSolutionData(id);
            if (staticData) {
                return NextResponse.json({
                    success: true,
                    data: {
                        _id: `static_${staticData.slug}`,
                        isStaticFallback: true,
                        ...staticData,
                        targetKeyword: staticData.keywords?.[0] || 'Sportswear Manufacturing',
                        secondaryKeywords: staticData.keywords?.slice(1) || [],
                        searchIntent: 'Commercial / B2B OEM Sourcing',
                        status: 'Published',
                        published: true,
                        noIndex: false,
                    },
                }, { status: 200 });
            }

            return NextResponse.json({ success: false, message: "Solution page not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: page }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching solution detail:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to fetch solution" }, { status: 500 });
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

        // If updating a static fallback, create a new DB override entry
        if (id.startsWith('static_')) {
            const slug = body.slug || id.replace('static_', '');
            
            // Check if already created
            let existing = await SEOPage.findOne({ slug });
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
                    message: `Solution page "${existing.title}" updated successfully in database.`,
                }, { status: 200 });
            }

            const newPage = await SEOPage.create({
                ...body,
                slug,
                status,
                published,
            });

            return NextResponse.json({
                success: true,
                data: newPage,
                message: `Static solution converted to database CMS record successfully.`,
            }, { status: 201 });
        }

        // Standard DB update by ID or slug
        let page = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            page = await SEOPage.findById(id);
        }
        if (!page) {
            page = await SEOPage.findOne({ slug: id });
        }

        if (!page) {
            // If doesn't exist, create it as new DB record
            const newRecord = await SEOPage.create({
                ...body,
                status,
                published,
            });
            return NextResponse.json({
                success: true,
                data: newRecord,
                message: `Solution created in database.`,
            }, { status: 201 });
        }

        // Apply updates
        page.title = body.title || page.title;
        page.slug = body.slug || page.slug;
        page.metaTitle = body.metaTitle || page.metaTitle;
        page.metaDescription = body.metaDescription || page.metaDescription;
        page.keywords = Array.isArray(body.keywords) ? body.keywords : page.keywords;
        page.targetKeyword = body.targetKeyword !== undefined ? body.targetKeyword : page.targetKeyword;
        page.secondaryKeywords = Array.isArray(body.secondaryKeywords) ? body.secondaryKeywords : page.secondaryKeywords;
        page.searchIntent = body.searchIntent || page.searchIntent;
        page.heroBadge = body.heroBadge || page.heroBadge;
        page.heroDescription = body.heroDescription !== undefined ? body.heroDescription : page.heroDescription;
        page.stats = Array.isArray(body.stats) ? body.stats : page.stats;
        page.introHeading = body.introHeading || page.introHeading;
        page.introText = Array.isArray(body.introText) ? body.introText : page.introText;
        page.benefits = Array.isArray(body.benefits) ? body.benefits : page.benefits;
        page.capabilities = Array.isArray(body.capabilities) ? body.capabilities : page.capabilities;
        page.fabrics = Array.isArray(body.fabrics) ? body.fabrics : page.fabrics;
        page.customization = Array.isArray(body.customization) ? body.customization : page.customization;
        page.faqs = Array.isArray(body.faqs) ? body.faqs : page.faqs;
        page.relatedKnowledgeGuides = Array.isArray(body.relatedKnowledgeGuides) ? body.relatedKnowledgeGuides : page.relatedKnowledgeGuides;
        page.relatedProducts = Array.isArray(body.relatedProducts) ? body.relatedProducts : page.relatedProducts;
        page.canonicalUrl = body.canonicalUrl !== undefined ? body.canonicalUrl : page.canonicalUrl;
        page.noIndex = body.noIndex !== undefined ? Boolean(body.noIndex) : page.noIndex;
        page.status = status;
        page.published = published;

        await page.save();

        return NextResponse.json({
            success: true,
            data: page,
            message: `Solution page "${page.title}" updated successfully.`,
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error updating solution:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to update solution" }, { status: 500 });
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
                message: "Cannot delete a hardcoded static solution. You can override it by saving a draft or archived record in the database.",
            }, { status: 400 });
        }

        const deleted = await SEOPage.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ success: false, message: "Solution page not found in database" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: `Solution page "${deleted.title}" deleted from database.`,
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error deleting solution page:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to delete solution" }, { status: 500 });
    }
}
