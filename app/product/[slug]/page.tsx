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

    const description = product.description?.substring(0, 160) || '';
    const imageUrl = product.media?.[0]?.secure_url || 'https://slotssportswear.com/images/daccilogosvg.png';

    return {
        title: product.name,
        description,
        openGraph: {
            type: 'website',
            title: product.name,
            description,
            images: [{ url: imageUrl, width: 800, height: 600, alt: product.name }],
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
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

    // Build Product JSON-LD for Google rich results (star ratings, price, availability)
    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: productData.name,
        description: productData.description?.substring(0, 500) || '',
        image: productData.media?.map((m: any) => m.secure_url) || [],
        sku: productData.slug,
        brand: {
            '@type': 'Brand',
            name: 'Slots Sports Wear',
        },
        category: productData.category?.name || '',
        offers: {
            '@type': 'Offer',
            url: `https://slotssportswear.com/product/${productData.slug}`,
            priceCurrency: 'PKR',
            price: productData.sellingPrice || productData.price || 0,
            availability: 'https://schema.org/InStock',
            seller: { '@type': 'Organization', name: 'Slots Sports Wear' },
        },
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

    return (
        <>
            <JsonLd data={productJsonLd} />
            <ProductClient initialData={productData} />
        </>
    );
}
