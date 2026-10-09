import React from 'react';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/lib/adminhelperfunction';
import EditSolutionClient from './EditSolutionClient';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export const metadata = {
    title: 'Edit Solution Page | Admin SEO CMS | Slots Sports Wear',
    description: 'Update B2B sportswear solution page details, target keywords, fabrics, and FAQs.',
};

export default async function EditSolutionPage({ params }: PageProps) {
    const isAdmin = await adminAuth();

    if (!isAdmin || !isAdmin.role) {
        redirect('/');
    }

    const { id } = await params;

    return (
        <div className="w-full min-h-screen bg-[#EDEEE7] p-4 sm:p-6 md:p-8 pt-6">
            <EditSolutionClient id={id} />
        </div>
    );
}
