import type { Metadata } from 'next';
import HomePageClient from '@/app/components/HomePageClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Custom Sportswear Manufacturer | OEM Teamwear Supplier',
  },
  description:
    'Custom sportswear manufacturer providing OEM and private label apparel production for global brands, teams and wholesalers.',
  openGraph: {
    title: 'Custom Sportswear Manufacturer | OEM Teamwear Supplier',
    description:
      'Custom sportswear manufacturer providing OEM and private label apparel production for global brands, teams and wholesalers.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Sportswear Manufacturer | OEM Teamwear Supplier',
    description:
      'Custom sportswear manufacturer providing OEM and private label apparel production for global brands, teams and wholesalers.',
  },
};

export default function Page() {
  return <HomePageClient />;
}