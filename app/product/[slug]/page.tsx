import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import ProductClient from './ProductClient';
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
    if (!product) return { title: 'Product Not Found - Dacci' };

    return {
        title: `${product.name} - Dacci Apparel`,
        description: product.description.substring(0, 160),
        openGraph: {
            title: product.name,
            description: product.description.substring(0, 160),
            images: [product.media?.[0]?.secure_url || '/placeholder.png'],
        },
    };
}

export default async function Page({ params }: ProductPageProps) {
    const { slug } = await params;
    const productData = await getProductData(slug);

    if (!productData) {
        notFound();
    }

    return <ProductClient initialData={productData} />;
}
