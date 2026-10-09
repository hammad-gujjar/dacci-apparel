import { NextResponse } from "next/server";
import { databaseConnection } from "@/lib/database";
import { adminAuth } from "@/lib/adminhelperfunction";
import { SEOPage } from "@/models/SEOPage.model";
import { KnowledgeArticle } from "@/models/KnowledgeArticle.model";
import { getAllSolutionsSlugs, SOLUTIONS_DATA } from "@/lib/seo/solutionsData";
import { getAllKnowledgeSlugs, KNOWLEDGE_ARTICLES } from "@/lib/seo/knowledgeData";

export async function GET() {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        await databaseConnection();

        const [dbSolutions, dbArticles] = await Promise.all([
            SEOPage.find({}).lean(),
            KnowledgeArticle.find({}).lean(),
        ]);

        const staticSolutionSlugs = getAllSolutionsSlugs();
        const staticKnowledgeSlugs = getAllKnowledgeSlugs();

        // Calculate counts
        const dbSolutionSlugs = new Set(dbSolutions.map((s: any) => s.slug));
        const dbKnowledgeSlugs = new Set(dbArticles.map((a: any) => a.slug));

        // Static pages that are not overridden by DB
        const purelyStaticSolutionsCount = staticSolutionSlugs.filter(slug => !dbSolutionSlugs.has(slug)).length;
        const purelyStaticKnowledgeCount = staticKnowledgeSlugs.filter(slug => !dbKnowledgeSlugs.has(slug)).length;

        const publishedSolutionsCount = dbSolutions.filter((s: any) => s.status === 'Published' || s.published === true).length + purelyStaticSolutionsCount;
        const draftSolutionsCount = dbSolutions.filter((s: any) => s.status === 'Draft' || s.published === false).length;

        const publishedKnowledgeCount = dbArticles.filter((a: any) => a.status === 'Published' || a.published === true).length + purelyStaticKnowledgeCount;
        const draftKnowledgeCount = dbArticles.filter((a: any) => a.status === 'Draft' || a.published === false).length;

        const totalSolutions = dbSolutions.length + purelyStaticSolutionsCount;
        const totalKnowledge = dbArticles.length + purelyStaticKnowledgeCount;

        // Health check: identify potential SEO quality issues
        const auditAlerts: string[] = [];

        dbSolutions.forEach((s: any) => {
            if (!s.metaTitle || s.metaTitle.length < 30) {
                auditAlerts.push(`Solution "${s.title || s.slug}": Title tag is under 30 characters.`);
            }
            if (!s.metaDescription || s.metaDescription.length < 100) {
                auditAlerts.push(`Solution "${s.title || s.slug}": Meta description is under 100 characters.`);
            }
            if (!s.faqs || s.faqs.length === 0) {
                auditAlerts.push(`Solution "${s.title || s.slug}": Missing FAQ schema section.`);
            }
        });

        dbArticles.forEach((a: any) => {
            if (!a.metaDescription || a.metaDescription.length < 100) {
                auditAlerts.push(`Knowledge Guide "${a.title || a.slug}": Meta description is under 100 characters.`);
            }
            if (!a.technicalSpecs || !a.technicalSpecs.rows || a.technicalSpecs.rows.length === 0) {
                auditAlerts.push(`Knowledge Guide "${a.title || a.slug}": Missing technical specification matrix.`);
            }
        });

        const totalPages = totalSolutions + totalKnowledge;
        const totalPublished = publishedSolutionsCount + publishedKnowledgeCount;
        const healthScore = totalPages > 0 
            ? Math.max(70, Math.round(((totalPages - (auditAlerts.length * 0.5)) / totalPages) * 100))
            : 100;

        return NextResponse.json({
            success: true,
            data: {
                solutions: {
                    total: totalSolutions,
                    published: publishedSolutionsCount,
                    drafts: draftSolutionsCount,
                    dbCount: dbSolutions.length,
                    staticFallbackCount: purelyStaticSolutionsCount,
                },
                knowledge: {
                    total: totalKnowledge,
                    published: publishedKnowledgeCount,
                    drafts: draftKnowledgeCount,
                    dbCount: dbArticles.length,
                    staticFallbackCount: purelyStaticKnowledgeCount,
                },
                overall: {
                    totalPages,
                    totalPublished,
                    totalDrafts: draftSolutionsCount + draftKnowledgeCount,
                    healthScore,
                    auditAlerts: auditAlerts.slice(0, 10), // Return top 10 actionable warnings
                },
            },
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching SEO CMS stats:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to fetch stats" }, { status: 500 });
    }
}
