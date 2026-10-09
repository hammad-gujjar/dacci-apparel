import React from 'react';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/lib/adminhelperfunction';
import SolutionsClient from './SolutionsClient';

export const metadata = {
    title: 'B2B Solution Landing Pages | Admin SEO CMS | Slots Sports Wear',
    description: 'Manage programmatic commercial landing pages, target keywords, and factory capabilities.',
};

export default async function AdminSolutionsPage() {
    const isAdmin = await adminAuth();

    if (!isAdmin || !isAdmin.role) {
        redirect('/');
    }

    return (
        <div className="w-full min-h-screen bg-[#EDEEE7] p-4 sm:p-6 md:p-8 pt-6">
            <SolutionsClient />
        </div>
    );
}
