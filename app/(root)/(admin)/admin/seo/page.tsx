import React from 'react';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/lib/adminhelperfunction';
import SEOOverviewClient from './SEOOverviewClient';

export const metadata = {
    title: 'B2B SEO Content CMS & Organic Growth | Admin Dashboard | Slots Sports Wear',
    description: 'Manage programmatic landing pages, technical knowledge articles, and internal linking equity.',
};

export default async function AdminSEOPage() {
    const isAdmin = await adminAuth();

    if (!isAdmin || !isAdmin.role) {
        redirect('/');
    }

    return (
        <div className="w-full min-h-screen bg-[#EDEEE7] p-4 sm:p-6 md:p-8 pt-6">
            <SEOOverviewClient />
        </div>
    );
}
