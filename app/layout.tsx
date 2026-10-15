import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Nav from "./components/Nav";
import Providers from "@/components/globalprovider/provider";
import { LoaderProvider } from "./context/LoaderContext";
import SmoothScroll from "./components/SmoothScroll";
import ConditionalFooter from "./components/ConditionalFooter";
import JsonLd from "@/components/JsonLd";
import WhatsAppButton from "./components/WhatsAppButton";
import Notification from '../components/ui/EntranceNotification';
import { TechPackProvider } from "./context/TechPackContext";
import TechPackDrawer from "./components/TechPackDrawer";
import Script from "next/script";


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app'),
  title: {
    default: 'Slots Sportswear - Private Label Sportswear & Custom Apparel Manufacturer',
    template: '%s | Slots Sportswear',
  },
  description:
    'Slots Sportswear is an OEM/ODM custom sportswear manufacturer based in Sialkot, Pakistan. We produce private label athletic apparel, custom golfwear, team uniforms, and activewear for US and international brands with 30-piece low MOQs.',
  keywords: [
    'private label sportswear manufacturer',
    'custom sportswear manufacturer',
    'custom golf polo manufacturer',
    'custom team uniforms',
    'wholesale custom apparel',
    'clothing manufacturer Pakistan',
    'low MOQ sportswear manufacturer',
    'bulk athletic wear supplier',
    'OEM sportswear factory',
    'Slots Sportswear',
  ],
  authors: [{ name: 'Slots Sportswear', url: process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app' }],
  creator: 'Slots Sportswear',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : {}),
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Slots Sportswear',
    title: 'Slots Sportswear - Private Label Sportswear & Custom Apparel Manufacturer',
    description:
      'High-quality private label sportswear and custom athletic apparel manufacturing with low 30-piece MOQ. Golfwear, teamwear, and fitness apparel from Sialkot, Pakistan.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app',
    images: [
      {
        url: 'https://res.cloudinary.com/dhrfua4wp/image/upload/v1780148472/remove_the_text_on_this_202605301840_dqohzp.webp',
        width: 1200,
        height: 630,
        alt: 'Slots Sportswear - Private Label Sportswear Manufacturer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Slots Sportswear - Private Label Sportswear & Custom Apparel Manufacturer',
    description:
      'High-quality private label sportswear and custom athletic apparel manufacturing with low 30-piece MOQ. Golfwear, teamwear, and fitness apparel from Sialkot, Pakistan.',
    images: ['https://res.cloudinary.com/dhrfua4wp/image/upload/v1780148472/remove_the_text_on_this_202605301840_dqohzp.webp'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        {/* Preconnect to Cloudinary CDN for faster image loads */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://i.pinimg.com" />
      </head>
      <body
        className={`antialiased`}
      >
        {/* Organization structured data - enables Google Knowledge Panel */}
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Slots Sportswear",
          "url": process.env.NEXT_PUBLIC_SITE_URL || "https://slotssportswear.vercel.app",
          "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://slotssportswear.vercel.app"}/images/logo.png`,
          "description": "Custom sportswear and private label apparel manufacturer in Sialkot, Pakistan, offering OEM/ODM production for athletic wear, custom golfwear, team uniforms, and fitness apparel with low 30-piece MOQs.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "PK"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://slotssportswear.vercel.app"}/contact`
          },
          "sameAs": [
            "https://www.instagram.com/slotssportswear2025/",
            "https://www.facebook.com/profile.php?id=61579978311422",
            "https://x.com/SlotsSportswear",
            "https://www.pinterest.com/slotssportswear/"
          ]
        }} />

        {/* WebSite structured data with SearchAction for Sitelinks Searchbox */}
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Slots Sports Wear",
          "url": process.env.NEXT_PUBLIC_SITE_URL || "https://slotssportswear.vercel.app",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://slotssportswear.vercel.app"}/shop?searchQuery={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        }} />

        {/* Google Analytics 4 (Only loaded when NEXT_PUBLIC_GA_MEASUREMENT_ID is configured) */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <LoaderProvider>
          <TechPackProvider>
            <Nav />
            <TechPackDrawer />
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                className: 'macos-toast',
                duration: 4000,
                style: {
                  // Base styles are handled by CSS class .macos-toast
                },
              }}
            />
            <SmoothScroll>
              <Providers>
                {children}
              </Providers>
              <ConditionalFooter />
            </SmoothScroll>
            <Notification />
            <WhatsAppButton />
          </TechPackProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
