import { NextResponse } from "next/server";
import { databaseConnection } from "@/lib/database";
import { adminAuth } from "@/lib/adminhelperfunction";
import { SEOPage } from "@/models/SEOPage.model";
import { getAllSolutionsSlugs, getSolutionData } from "@/lib/seo/solutionsData";

export async function GET(req: Request) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        await databaseConnection();

        const { searchParams } = new URL(req.url);
        const statusFilter = searchParams.get('status'); // 'all', 'Published', 'Draft', 'Archived'
        const search = (searchParams.get('search') || '').toLowerCase().trim();

        // 1. Fetch DB pages
        const query: any = {};
        if (statusFilter && statusFilter !== 'all') {
            if (statusFilter === 'Published') {
                query.$or = [{ status: 'Published' }, { published: true, status: { $exists: false } }];
            } else if (statusFilter === 'Draft') {
                query.$or = [{ status: 'Draft' }, { published: false }];
            } else {
                query.status = statusFilter;
            }
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { slug: { $regex: search, $options: 'i' } },
                { targetKeyword: { $regex: search, $options: 'i' } },
                { keywords: { $in: [new RegExp(search, 'i')] } },
            ];
        }

        const dbPages = await SEOPage.find(query).sort({ updatedAt: -1 }).lean();
        const dbSlugs = new Set(dbPages.map((p: any) => p.slug));

        // 2. Include static fallback pages that aren't overridden in DB (if filter permits)
        const staticList: any[] = [];
        if (!statusFilter || statusFilter === 'all' || statusFilter === 'Published') {
            const staticSlugs = getAllSolutionsSlugs();
            for (const sSlug of staticSlugs) {
                if (!dbSlugs.has(sSlug)) {
                    const staticData = getSolutionData(sSlug);
                    if (staticData) {
                        if (!search || 
                            staticData.title.toLowerCase().includes(search) || 
                            staticData.slug.toLowerCase().includes(search) ||
                            (staticData.keywords && staticData.keywords.some(k => k.toLowerCase().includes(search)))) {
                            staticList.push({
                                _id: `static_${staticData.slug}`,
                                slug: staticData.slug,
                                title: staticData.title,
                                metaTitle: staticData.metaTitle,
                                metaDescription: staticData.metaDescription,
                                targetKeyword: staticData.keywords?.[0] || 'Sportswear Manufacturing',
                                searchIntent: 'Commercial / B2B OEM Sourcing',
                                status: 'Published',
                                published: true,
                                isStaticFallback: true,
                                updatedAt: new Date(),
                            });
                        }
                    }
                }
            }
        }

        const combined = [...dbPages, ...staticList];

        return NextResponse.json({
            success: true,
            data: combined,
            total: combined.length,
            dbCount: dbPages.length,
            staticCount: staticList.length,
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching SEO Solutions:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to fetch solutions" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        const body = await req.json();

        if (!body.title || !body.slug) {
            return NextResponse.json({ success: false, message: "Title and slug are required" }, { status: 400 });
        }

        await databaseConnection();

        // Check if slug already exists in DB
        const existing = await SEOPage.findOne({ slug: body.slug });
        if (existing) {
            return NextResponse.json({ success: false, message: `A solution page with slug "${body.slug}" already exists.` }, { status: 409 });
        }

        const status = body.status || (body.published === false ? 'Draft' : 'Published');
        const published = status === 'Published';

        const newPage = await SEOPage.create({
            slug: body.slug,
            title: body.title,
            metaTitle: body.metaTitle || body.title,
            metaDescription: body.metaDescription || '',
            keywords: Array.isArray(body.keywords) ? body.keywords : [],
            targetKeyword: body.targetKeyword || (Array.isArray(body.keywords) && body.keywords[0]) || '',
            secondaryKeywords: Array.isArray(body.secondaryKeywords) ? body.secondaryKeywords : [],
            searchIntent: body.searchIntent || 'Commercial / B2B OEM Sourcing',
            heroBadge: body.heroBadge || 'OEM / ODM Manufacturing Excellence',
            heroDescription: body.heroDescription || '',
            stats: Array.isArray(body.stats) ? body.stats : [],
            introHeading: body.introHeading || 'Manufacturing Excellence',
            introText: Array.isArray(body.introText) ? body.introText : [],
            benefits: Array.isArray(body.benefits) ? body.benefits : [],
            capabilities: Array.isArray(body.capabilities) ? body.capabilities : [],
            fabrics: Array.isArray(body.fabrics) ? body.fabrics : [],
            customization: Array.isArray(body.customization) ? body.customization : [],
            faqs: Array.isArray(body.faqs) ? body.faqs : [],
            relatedKnowledgeGuides: Array.isArray(body.relatedKnowledgeGuides) ? body.relatedKnowledgeGuides : [],
            relatedProducts: Array.isArray(body.relatedProducts) ? body.relatedProducts : [],
            canonicalUrl: body.canonicalUrl || '',
            noIndex: Boolean(body.noIndex),
            status,
            published,
        });

        return NextResponse.json({
            success: true,
            data: newPage,
            message: `Solution page "${newPage.title}" created successfully.`,
        }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating SEO solution page:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to create solution page" }, { status: 500 });
    }
}
