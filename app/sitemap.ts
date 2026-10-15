import { MetadataRoute } from 'next';
import { databaseConnection } from '@/lib/database';
import { Product } from '@/models/product.model';
import { SEOPage } from '@/models/SEOPage.model';
import { KnowledgeArticle } from '@/models/KnowledgeArticle.model';
import { getAllSolutionsSlugs } from '@/lib/seo/solutionsData';
import { getAllKnowledgeSlugs } from '@/lib/seo/knowledgeData';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // regenerate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app';

  // Static core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/manufacturing-process`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/knowledge`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/story`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Programmatic B2B SEO Solutions pages
  const staticSolutionSlugs = getAllSolutionsSlugs();
  let allSolutionSlugs = [...staticSolutionSlugs];

  try {
    await databaseConnection();
    const dbSEOPages = await SEOPage.find({}).select('slug published status noIndex updatedAt').lean();
    const publishedDbSlugs = dbSEOPages
      .filter((p: any) => p.published !== false && p.status !== 'Draft' && !p.noIndex)
      .map((p: any) => p.slug);
    const draftDbSlugs = new Set(
      dbSEOPages
        .filter((p: any) => p.published === false || p.status === 'Draft' || p.noIndex)
        .map((p: any) => p.slug)
    );

    const allowedStaticSlugs = staticSolutionSlugs.filter(slug => !draftDbSlugs.has(slug));
    allSolutionSlugs = Array.from(new Set([...allowedStaticSlugs, ...publishedDbSlugs]));
  } catch {
    // Continue with static solution slugs if DB unavailable
  }

  const solutionPages: MetadataRoute.Sitemap = allSolutionSlugs.map(slug => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // Technical Manufacturing Knowledge Hub articles
  const staticKnowledgeSlugs = getAllKnowledgeSlugs();
  let allKnowledgeSlugs = [...staticKnowledgeSlugs];

  try {
    await databaseConnection();
    const dbArticles = await KnowledgeArticle.find({}).select('slug published status noIndex updatedAt').lean();
    const publishedDbSlugs = dbArticles
      .filter((a: any) => a.published !== false && a.status !== 'Draft' && !a.noIndex)
      .map((a: any) => a.slug);
    const draftDbSlugs = new Set(
      dbArticles
        .filter((a: any) => a.published === false || a.status === 'Draft' || a.noIndex)
        .map((a: any) => a.slug)
    );

    const allowedStaticSlugs = staticKnowledgeSlugs.filter(slug => !draftDbSlugs.has(slug));
    allKnowledgeSlugs = Array.from(new Set([...allowedStaticSlugs, ...publishedDbSlugs]));
  } catch {
    // Continue with static knowledge slugs if DB unavailable
  }

  const knowledgePages: MetadataRoute.Sitemap = allKnowledgeSlugs.map(slug => ({
    url: `${baseUrl}/knowledge/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic product pages
  try {
    await databaseConnection();
    const products = await Product.find({ deletedAt: null })
      .select('slug updatedAt')
      .lean();

    const productPages: MetadataRoute.Sitemap = products.map((p: any) => ({
      url: `${baseUrl}/product/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...staticPages, ...solutionPages, ...knowledgePages, ...productPages];
  } catch {
    // Return static, solution, and knowledge pages if product DB fails
    return [...staticPages, ...solutionPages, ...knowledgePages];
  }
}
