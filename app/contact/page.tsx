import { Suspense } from 'react';
import { databaseConnection } from '@/lib/database';
import { Category } from '@/models/category.model';
import ContactClient from './ContactClient';

import { Metadata } from 'next';

export const metadata: Metadata = {
    alternates: {
        canonical: '/contact',
    },
    title: {
        absolute: 'Contact a Private Label Sportswear Manufacturer | SLOTS SPORTSWEAR',
    },
    description: 'Contact SLOTS SPORTSWEAR, an experienced private label sportswear manufacturer. Request a custom apparel manufacturing quote or submit a wholesale sportswear inquiry.',
    openGraph: {
        title: 'Contact a Private Label Sportswear Manufacturer | SLOTS SPORTSWEAR',
        description: 'Contact SLOTS SPORTSWEAR, an experienced private label sportswear manufacturer. Request a custom apparel manufacturing quote or submit a wholesale sportswear inquiry.',
        images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app'}/images/logo.png`, width: 800, height: 600, alt: 'Slots Sports Wear' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact a Private Label Sportswear Manufacturer | SLOTS SPORTSWEAR',
        description: 'Contact SLOTS SPORTSWEAR, an experienced private label sportswear manufacturer. Request a custom apparel manufacturing quote or submit a wholesale sportswear inquiry.',
    },
};

async function getCategories() {
    try {
        await databaseConnection();
        const categories = await Category.find({ deletedAt: null }).select('_id name slug').lean();
        return JSON.parse(JSON.stringify(categories));
    } catch (error) {
        console.error('Failed to fetch categories', error);
        return [];
    }
}

export default async function ContactPage() {
    const categories = await getCategories();

    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#EDEEE7] flex items-center justify-center">
                <div className="size-10 border border-black/20 border-t-black rounded-full animate-spin" />
            </div>
        }>
            <ContactClient categories={categories} />
        </Suspense>
    );
}
