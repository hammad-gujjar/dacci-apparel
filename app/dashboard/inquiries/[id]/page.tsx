import React from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import InquiryDetailClient from './InquiryDetailClient';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export const metadata = {
    title: 'Manufacturing Project Detail | Buyer Portal | Slots Sports Wear',
    description: 'Track real-time factory progress, Tech Pack specifications, and prototype sampling stages.',
    robots: {
        index: false,
        follow: false,
    },
};

export default async function InquiryDetailPage({ params }: PageProps) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        return redirect('/auth/signin');
    }

    const { id } = await params;

    return (
        <div className="w-full min-h-screen bg-[#EDEEE7] py-10 px-4 sm:px-6 md:px-10">
            <InquiryDetailClient id={id} />
        </div>
    );
}
