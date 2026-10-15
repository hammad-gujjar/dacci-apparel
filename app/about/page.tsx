import React from 'react';
import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    alternates: {
        canonical: '/about',
    },
    title: {
        absolute: 'Sportswear Manufacturer for Private-Label Brands | SLOTS SPORTSWEAR',
    },
    description: 'SLOTS SPORTSWEAR is an export-focused custom sportswear manufacturer in Pakistan, serving USA and international private-label apparel brands with OEM production.',
    openGraph: {
        title: 'Sportswear Manufacturer for Private-Label Brands | SLOTS SPORTSWEAR',
        description: 'SLOTS SPORTSWEAR is an export-focused custom sportswear manufacturer in Pakistan, serving USA and international private-label apparel brands with OEM production.',
        images: [
            {
                url: 'https://i.pinimg.com/1200x/70/64/3f/70643f7a6e3937ce322314083d60ea8d.jpg',
                width: 1200,
                height: 630,
                alt: 'Slots Sports Wear Manufacturing Facility',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sportswear Manufacturer for Private-Label Brands | SLOTS SPORTSWEAR',
        description: 'SLOTS SPORTSWEAR is an export-focused custom sportswear manufacturer in Pakistan, serving USA and international private-label apparel brands with OEM production.',
    },
};

const page = () => {
    return (
        <AboutClient />
    );
};

export default page;