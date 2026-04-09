import { Suspense } from 'react';
import { databaseConnection } from '@/lib/database';
import { Category } from '@/models/category.model';
import ContactClient from './ContactClient';

export const metadata = {
    title: 'Contact & Tech Pack · Slots Sports Wear',
    description: 'Reach out to Slots Sports Wear for bespoke tailoring, unique collections, or submit a Tech Pack for your custom manufacturing needs.',
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
