import { MetadataRoute } from 'next';
import { databaseConnection } from '@/lib/database';
import { Product } from '@/models/product.model';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // regenerate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://slotssportswear.com';

  // Static pages
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
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

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

    return [...staticPages, ...productPages];
  } catch {
    // Return static pages only if DB fails
    return staticPages;
  }
}
