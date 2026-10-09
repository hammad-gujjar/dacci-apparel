import React from 'react';
import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    title: {
        absolute: 'About Us | Custom Sportswear Manufacturer',
    },
    description: 'Learn about our OEM and ODM sportswear manufacturing capabilities, production process and commitment to quality apparel solutions.',
    openGraph: {
        title: 'About Us | Custom Sportswear Manufacturer',
        description: 'Learn about our OEM and ODM sportswear manufacturing capabilities, production process and commitment to quality apparel solutions.',
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
        title: 'About Us | Custom Sportswear Manufacturer',
        description: 'Learn about our OEM and ODM sportswear manufacturing capabilities, production process and commitment to quality apparel solutions.',
    },
};

const page = () => {
    return (
        <AboutClient />
    );
};

export default page;