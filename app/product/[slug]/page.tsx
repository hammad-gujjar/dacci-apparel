import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import ProductClient from './ProductClient';
import JsonLd from '@/components/JsonLd';
import { databaseConnection, userdatabaseConnection } from "@/lib/database";
import { Product } from "@/models/product.model";
import { ProductVariant } from "@/models/productVariant.model";
import { Review } from "@/models/review.model";
import { User } from "@/models/User.model";
import { Media } from "@/models/Media.model";
import { Category } from "@/models/category.model";

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const getProductData = cache(async (slug: string) => {
    try {
        await databaseConnection();
        
        const product = await Product.findOne({ slug, deletedAt: null })
            .populate({ path: "media", model: Media, select: "secure_url" })
            .populate({ path: "category", model: Category, select: "name slug" })
            .lean();

        if (!product) return null;

        await userdatabaseConnection();
        const rawReviews = await Review.find({ product: product._id, deletedAt: null }).lean();
        const userIds = rawReviews.map((r: any) => r.user).filter(Boolean);
        const users = await User.find({ _id: { $in: userIds } }, 'name image').lean();
        
        const reviews = rawReviews.map((rev: any) => ({
            ...rev,
            user: users.find((u: any) => u._id.toString() === rev.user?.toString()) || null
        }));

        const [variants, relatedProducts] = await Promise.all([
            ProductVariant.find({ product: product._id, deletedAt: null })
                .populate({ path: "media", model: Media, select: "secure_url" })
                .lean(),
            Product.find({
                category: product.category._id,
                _id: { $ne: product._id },
                deletedAt: null,
            })
                .limit(12)
                .populate({ path: "media", model: Media, select: "secure_url" })
                .lean(),
        ]);

        const averageRating = reviews.length > 0
            ? reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0) / reviews.length
            : 0;

        return JSON.parse(JSON.stringify({
            ...product,
            variants,
            reviews,
            averageRating,
            relatedProducts,
        }));
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
});

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductData(slug);
    if (!product) return { title: 'Product Not Found' };

    const isGolf = product.slug?.includes('golf') ||
                   product.name?.toLowerCase().includes('golf') ||
                   product.category?.name?.toLowerCase().includes('golf');

    const title = isGolf
        ? `${product.name} | Custom Golf Polo & Apparel Manufacturer | SLOTS SPORTSWEAR`
        : `${product.name} | Private Label Sportswear Manufacturer | SLOTS SPORTSWEAR`;

    const description = isGolf
        ? `Custom ${product.name} manufacturing by SLOTS SPORTSWEAR. High-performance private label golf apparel, custom golf polo shirts, and wholesale production for USA brands and golf clubs.`
        : `Custom ${product.name} manufacturing by SLOTS SPORTSWEAR. Wholesale custom apparel and private label sportswear production for USA and global athletic brands and teams.`;

    const imageUrl = product.media?.[0]?.secure_url || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app'}/images/logo.png`;

    return {
        title: {
            absolute: title,
        },
        description,
        alternates: {
            canonical: `/product/${slug}`,
        },
        openGraph: {
            type: 'website',
            title,
            description,
            url: `/product/${slug}`,
            images: [{ url: imageUrl, width: 800, height: 600, alt: product.name }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
    };
}

export default async function Page({ params }: ProductPageProps) {
    const { slug } = await params;
    const productData = await getProductData(slug);

    if (!productData) {
        notFound();
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app';

    // Build Product JSON-LD for B2B RFQ (No fixed retail price or false availability offers)
    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: productData.name,
        description: productData.description?.substring(0, 500) || '',
        image: productData.media?.map((m: any) => m.secure_url) || [],
        sku: productData.slug,
        brand: {
            '@type': 'Brand',
            name: 'SLOTS SPORTSWEAR',
        },
        manufacturer: {
            '@type': 'Organization',
            name: 'SLOTS SPORTSWEAR',
            url: siteUrl,
        },
        category: productData.category?.name || '',
        ...(productData.averageRating > 0 && productData.reviews?.length > 0
            ? {
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: productData.averageRating.toFixed(1),
                    reviewCount: productData.reviews.length,
                    bestRating: '5',
                    worstRating: '1',
                },
              }
            : {}),
    };

    // Build BreadcrumbList JSON-LD for rich snippet navigation
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${siteUrl}/`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Catalog',
                item: `${siteUrl}/shop`,
            },
            ...(productData.category?.name
                ? [
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: productData.category.name,
                        item: `${siteUrl}/shop?category=${productData.category.slug || encodeURIComponent(productData.category.name)}`,
                    },
                    {
                        '@type': 'ListItem',
                        position: 4,
                        name: productData.name,
                        item: `${siteUrl}/product/${productData.slug}`,
                    },
                  ]
                : [
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: productData.name,
                        item: `${siteUrl}/product/${productData.slug}`,
                    },
                  ]),
        ],
    };

    return (
        <>
            <JsonLd data={productJsonLd} />
            <JsonLd data={breadcrumbJsonLd} />
            <ProductClient initialData={productData} />
        </>
    );
}
