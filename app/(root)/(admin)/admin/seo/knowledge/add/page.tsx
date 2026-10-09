import React from 'react';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/lib/adminhelperfunction';
import BreadCrumb from '../../../components/BreadCrumb';
import KnowledgeForm from '../components/KnowledgeForm';

export const metadata = {
    title: 'Create Technical Guide | Admin SEO CMS | Slots Sports Wear',
    description: 'Add new manufacturing knowledge article with technical specs matrix and commercial cross-links.',
};

const breadcrumbData = [
    { label: "Home", href: "/admin/dashboard" },
    { label: "SEO & Content CMS", href: "/admin/seo" },
    { label: "Knowledge Hub", href: "/admin/seo/knowledge" },
    { label: "Create Guide", href: "" },
];

export default async function AddKnowledgePage() {
    const isAdmin = await adminAuth();

    if (!isAdmin || !isAdmin.role) {
        redirect('/');
    }

    return (
        <div className="w-full min-h-screen bg-[#EDEEE7] p-4 sm:p-6 md:p-8 pt-6">
            <div className="max-w-5xl mx-auto mb-6">
                <BreadCrumb breadcrumbData={breadcrumbData} />
                <h1 className="text-2xl sm:text-3xl font-[main] uppercase tracking-tight text-[#111111]">
                    Create Technical Knowledge Guide
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 font-[middle] mt-1">
                    Publish in-depth technical manufacturing specifications and establish E-E-A-T topical authority.
                </p>
            </div>
            <KnowledgeForm isEdit={false} />
        </div>
    );
}
