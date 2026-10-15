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
    'Private label sportswear manufacturer in Sialkot, Pakistan. Custom golf polos, team uniforms and activewear for small, growing brands. Low MOQ from 30 pieces, OEM/ODM and worldwide shipping.',
  openGraph: {
    title: 'Private Label Sportswear Manufacturer in Sialkot, Pakistan',
    description:
      'Private label sportswear manufacturer in Sialkot, Pakistan. Custom golf polos, team uniforms and activewear for small, growing brands. Low MOQ from 30 pieces, OEM/ODM and worldwide shipping.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Label Sportswear Manufacturer in Sialkot, Pakistan',
    description:
      'Private label sportswear manufacturer in Sialkot, Pakistan. Custom golf polos, team uniforms and activewear for small, growing brands. Low MOQ from 30 pieces, OEM/ODM and worldwide shipping.',
  },
};

export default function Page() {
  return <HomePageClient />;
}