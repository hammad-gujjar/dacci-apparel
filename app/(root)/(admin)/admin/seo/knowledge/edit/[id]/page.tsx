import React from 'react';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/lib/adminhelperfunction';
import EditKnowledgeClient from './EditKnowledgeClient';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export const metadata = {
    title: 'Edit Technical Guide | Admin SEO CMS | Slots Sports Wear',
    description: 'Update technical manufacturing guide content, testing matrix, and related solutions.',
};

export default async function EditKnowledgePage({ params }: PageProps) {
    const isAdmin = await adminAuth();

    if (!isAdmin || !isAdmin.role) {
        redirect('/');
    }

    const { id } = await params;

    return (
        <div className="w-full min-h-screen bg-[#EDEEE7] p-4 sm:p-6 md:p-8 pt-6">
            <EditKnowledgeClient id={id} />
        </div>
    );
}
