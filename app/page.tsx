import type { Metadata } from 'next';
import HomePageClient from '@/app/components/HomePageClient';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  title: {
    absolute: 'Private Label Sportswear Manufacturer in Sialkot, Pakistan',
  },
  description:
    'Slots Sportswear manufactures custom golf polos, team uniforms and private label activewear in Sialkot, Pakistan. OEM/ODM bulk production, custom branding and worldwide shipping for apparel brands, clubs and teams.',
  openGraph: {
    title: 'Private Label Sportswear Manufacturer in Sialkot, Pakistan',
    description:
      'Slots Sportswear manufactures custom golf polos, team uniforms and private label activewear in Sialkot, Pakistan. OEM/ODM bulk production, custom branding and worldwide shipping for apparel brands, clubs and teams.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Label Sportswear Manufacturer in Sialkot, Pakistan',
    description:
      'Slots Sportswear manufactures custom golf polos, team uniforms and private label activewear in Sialkot, Pakistan. OEM/ODM bulk production, custom branding and worldwide shipping for apparel brands, clubs and teams.',
  },
};

export default function Page() {
  return <HomePageClient />;
}