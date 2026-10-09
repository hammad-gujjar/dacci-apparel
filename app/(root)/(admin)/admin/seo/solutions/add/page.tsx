import React from 'react';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/lib/adminhelperfunction';
import BreadCrumb from '../../../components/BreadCrumb';
import SolutionForm from '../components/SolutionForm';

export const metadata = {
    title: 'Create Solution Landing Page | Admin SEO CMS | Slots Sports Wear',
    description: 'Add new programmatic B2B sportswear solution page with custom keywords, fabric matrix, and internal links.',
};

const breadcrumbData = [
    { label: "Home", href: "/admin/dashboard" },
    { label: "SEO & Content CMS", href: "/admin/seo" },
    { label: "Solutions", href: "/admin/seo/solutions" },
    { label: "Create Solution", href: "" },
];

export default async function AddSolutionPage() {
    const isAdmin = await adminAuth();

    if (!isAdmin || !isAdmin.role) {
        redirect('/');
    }

    return (
        <div className="w-full min-h-screen bg-[#EDEEE7] p-4 sm:p-6 md:p-8 pt-6">
            <div className="max-w-5xl mx-auto mb-6">
                <BreadCrumb breadcrumbData={breadcrumbData} />
                <h1 className="text-2xl sm:text-3xl font-[main] uppercase tracking-tight text-[#111111]">
                    Create New Solution Page
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 font-[middle] mt-1">
                    Design a high-converting B2B activewear manufacturing landing page optimized for organic search.
                </p>
            </div>
            <SolutionForm isEdit={false} />
        </div>
    );
}
