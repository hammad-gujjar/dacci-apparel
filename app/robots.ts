import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/api/', '/auth/'],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app'}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app',
  };
}
