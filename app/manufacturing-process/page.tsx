import { Metadata } from 'next';
import ManufacturingProcessClient from './ManufacturingProcessClient';

export const metadata: Metadata = {
    title: {
        absolute: 'Our Manufacturing Process | Custom Sportswear Manufacturer',
    },
    description: 'From concept development to final delivery, we follow a structured manufacturing process to produce premium custom sportswear for global brands.',
    openGraph: {
        title: 'Our Manufacturing Process | Custom Sportswear Manufacturer',
        description: 'From concept development to final delivery, we follow a structured manufacturing process to produce premium custom sportswear for global brands.',
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
        title: 'Our Manufacturing Process | Custom Sportswear Manufacturer',
        description: 'From concept development to final delivery, we follow a structured manufacturing process to produce premium custom sportswear for global brands.',
    },
};

export default function ManufacturingProcessPage() {
    return <ManufacturingProcessClient />;
}
