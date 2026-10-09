import React from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import InquiriesClient from './InquiriesClient';

export const metadata = {
    title: 'My Inquiries & Tech Packs | Buyer Portal | Slots Sports Wear',
    description: 'Track your custom sportswear manufacturing inquiries, Tech Packs, and production stages.',
    robots: {
        index: false,
        follow: false,
    },
};

export default async function InquiriesPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        return redirect('/auth/signin');
    }

    return (
        <div className="w-full min-h-screen bg-[#EDEEE7] py-10 px-4 sm:px-6 md:px-10">
            <InquiriesClient userName={session.user.name || ''} userEmail={session.user.email || ''} />
        </div>
    );
}
