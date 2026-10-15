import { Metadata } from 'next';
import ManufacturingProcessClient from './ManufacturingProcessClient';

export const metadata: Metadata = {
    alternates: {
        canonical: '/manufacturing-process',
    },
    title: {
        absolute: 'Private Label Clothing Manufacturer | Sportswear Production Process',
    },
    description: 'Learn how SLOTS SPORTSWEAR operates as a private label clothing manufacturer. Our end-to-end custom sportswear manufacturing and production process for global brands.',
    openGraph: {
        title: 'Private Label Clothing Manufacturer | Sportswear Production Process',
        description: 'Learn how SLOTS SPORTSWEAR operates as a private label clothing manufacturer. Our end-to-end custom sportswear manufacturing and production process for global brands.',
        images: [
            {
                url: 'https://i.pinimg.com/1200x/70/64/3f/70643f7a6e3937ce322314083d60ea8d.jpg',
                width: 1200,
                height: 630,
                alt: 'Slots Sports Wear Manufacturing Process',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Private Label Clothing Manufacturer | Sportswear Production Process',
        description: 'Learn how SLOTS SPORTSWEAR operates as a private label clothing manufacturer. Our end-to-end custom sportswear manufacturing and production process for global brands.',
    },
};

export default function ManufacturingProcessPage() {
    return <ManufacturingProcessClient />;
}
