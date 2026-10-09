import { NextResponse } from "next/server";
import { databaseConnection } from "@/lib/database";
import { adminAuth } from "@/lib/adminhelperfunction";
import { KnowledgeArticle } from "@/models/KnowledgeArticle.model";
import { getAllKnowledgeSlugs, getKnowledgeArticle } from "@/lib/seo/knowledgeData";

export async function GET(req: Request) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        await databaseConnection();

        const { searchParams } = new URL(req.url);
        const statusFilter = searchParams.get('status'); // 'all', 'Published', 'Draft', 'Archived'
        const categoryFilter = searchParams.get('category');
        const search = (searchParams.get('search') || '').toLowerCase().trim();

        // 1. Fetch DB articles
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

        if (categoryFilter && categoryFilter !== 'all') {
            query.category = categoryFilter;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { slug: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
                { targetKeyword: { $regex: search, $options: 'i' } },
            ];
        }

        const dbArticles = await KnowledgeArticle.find(query).sort({ updatedAt: -1 }).lean();
        const dbSlugs = new Set(dbArticles.map((a: any) => a.slug));

        // 2. Include static fallback guides that aren't overridden in DB
        const staticList: any[] = [];
        if (!statusFilter || statusFilter === 'all' || statusFilter === 'Published') {
            const staticSlugs = getAllKnowledgeSlugs();
            for (const kSlug of staticSlugs) {
                if (!dbSlugs.has(kSlug)) {
                    const staticData = getKnowledgeArticle(kSlug);
                    if (staticData) {
                        if (categoryFilter && categoryFilter !== 'all' && staticData.category !== categoryFilter) {
                            continue;
                        }

                        if (!search || 
                            staticData.title.toLowerCase().includes(search) || 
                            staticData.slug.toLowerCase().includes(search) ||
                            staticData.category.toLowerCase().includes(search)) {
                            staticList.push({
                                _id: `static_${staticData.slug}`,
                                slug: staticData.slug,
                                title: staticData.title,
                                category: staticData.category,
                                readTime: staticData.readTime,
                                metaTitle: staticData.metaTitle,
                                metaDescription: staticData.metaDescription,
                                targetKeyword: staticData.title,
                                searchIntent: 'Informational / Technical Garment Specification',
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

        const combined = [...dbArticles, ...staticList];

        return NextResponse.json({
            success: true,
            data: combined,
            total: combined.length,
            dbCount: dbArticles.length,
            staticCount: staticList.length,
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching Knowledge articles:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to fetch knowledge articles" }, { status: 500 });
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
        const existing = await KnowledgeArticle.findOne({ slug: body.slug });
        if (existing) {
            return NextResponse.json({ success: false, message: `A knowledge article with slug "${body.slug}" already exists.` }, { status: 409 });
        }

        const status = body.status || (body.published === false ? 'Draft' : 'Published');
        const published = status === 'Published';

        const newArticle = await KnowledgeArticle.create({
            slug: body.slug,
            title: body.title,
            metaTitle: body.metaTitle || body.title,
            metaDescription: body.metaDescription || '',
            category: body.category || 'Fabric Engineering',
            readTime: body.readTime || '8 min read',
            publishDate: body.publishDate || new Date().toISOString().split('T')[0],
            author: body.author || { name: 'Slots Sports Wear Engineering Team', role: 'Technical Apparel Specialists' },
            heroBadge: body.heroBadge || 'Technical Manufacturing Guide',
            heroSummary: body.heroSummary || '',
            introText: Array.isArray(body.introText) ? body.introText : [],
            sections: Array.isArray(body.sections) ? body.sections : [],
            technicalSpecs: body.technicalSpecs || { title: '', subtitle: '', headers: [], rows: [] },
            buyerConsiderations: Array.isArray(body.buyerConsiderations) ? body.buyerConsiderations : [],
            faqs: Array.isArray(body.faqs) ? body.faqs : [],
            relatedSolutions: Array.isArray(body.relatedSolutions) ? body.relatedSolutions : [],
            relatedArticles: Array.isArray(body.relatedArticles) ? body.relatedArticles : [],
            targetKeyword: body.targetKeyword || '',
            secondaryKeywords: Array.isArray(body.secondaryKeywords) ? body.secondaryKeywords : [],
            searchIntent: body.searchIntent || 'Informational / Technical Garment Specification',
            canonicalUrl: body.canonicalUrl || '',
            noIndex: Boolean(body.noIndex),
            status,
            published,
        });

        return NextResponse.json({
            success: true,
            data: newArticle,
            message: `Knowledge guide "${newArticle.title}" created successfully.`,
        }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating knowledge article:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to create knowledge article" }, { status: 500 });
    }
}
