import React from 'react';
import { Metadata } from 'next';
import CartClient from './CartClient';

export const metadata: Metadata = {
    title: {
        absolute: 'Tech Pack Specification & Wholesale RFQ | Slots Sports Wear',
    },
    description: 'Review and customize your custom sportswear manufacturing specifications. Configure colors, size breakdowns, embellishments and submit your wholesale RFQ.',
    openGraph: {
        title: 'Tech Pack Specification & Wholesale RFQ | Slots Sports Wear',
        description: 'Review and customize your custom sportswear manufacturing specifications. Configure colors, size breakdowns, embellishments and submit your wholesale RFQ.',
        type: 'website',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app'}/cart`,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app'}/images/logo.png`,
                width: 800,
                height: 600,
                alt: 'Slots Sports Wear Tech Pack Request',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tech Pack Specification & Wholesale RFQ | Slots Sports Wear',
        description: 'Review and customize your custom sportswear manufacturing specifications. Configure colors, size breakdowns, embellishments and submit your wholesale RFQ.',
    },
};

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function CartPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        redirect('/auth/signin?callbackUrl=/cart');
    }

    return <CartClient />;
}
