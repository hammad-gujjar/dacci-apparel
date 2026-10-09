import React from 'react';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/lib/adminhelperfunction';
import KnowledgeClient from './KnowledgeClient';

export const metadata = {
    title: 'Knowledge Hub Articles | Admin SEO CMS | Slots Sports Wear',
    description: 'Manage technical manufacturing guides, garment specifications, and B2B educational content.',
};

export default async function AdminKnowledgePage() {
    const isAdmin = await adminAuth();

    if (!isAdmin || !isAdmin.role) {
        redirect('/');
    }

    return (
        <div className="w-full min-h-screen bg-[#EDEEE7] p-4 sm:p-6 md:p-8 pt-6">
            <KnowledgeClient />
        </div>
    );
}
