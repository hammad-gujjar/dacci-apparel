import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Nav from "./components/Nav";
import Providers from "@/components/globalprovider/provider";
import { LoaderProvider } from "./context/LoaderContext";
import SmoothScroll from "./components/SmoothScroll";
import Footer from "./components/Footer";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL('https://slotssportswear.com'),
  title: {
    default: 'Slots Sports Wear — Premium Clothing Manufacturer | Low MOQ',
    template: '%s | Slots Sports Wear',
  },
  description:
    'Slots Sports Wear is a premium clothing manufacturer based in Pakistan offering high-quality custom apparel, activewear, and formal wear with low minimum order quantities starting at 50 pieces.',
  keywords: [
    'clothing manufacturer Pakistan',
    'custom apparel manufacturer',
    'low MOQ clothing',
    'bulk clothing manufacturer',
    'custom activewear',
    'custom sportswear',
    'private label clothing',
    'Slots Sports Wear',
    'Pakistan garment factory',
  ],
  authors: [{ name: 'Slots Sports Wear', url: 'https://slotssportswear.com' }],
  creator: 'Slots Sports Wear',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    siteName: 'Slots Sports Wear',
    title: 'Slots Sports Wear — Premium Clothing Manufacturer | Low MOQ',
    description:
      'High-quality custom apparel manufacturing with low MOQ. Activewear, formalwear & more from Pakistan.',
    url: 'https://slotssportswear.com',
    images: [
      {
        url: 'https://i.pinimg.com/originals/cd/44/98/cd4498d59ae2318e6283df5a611568d4.png',
        width: 1200,
        height: 630,
        alt: 'Slots Sports Wear - Premium Clothing Manufacturer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Slots Sports Wear — Premium Clothing Manufacturer',
    description:
      'High-quality custom apparel manufacturing with low MOQ. Activewear, formalwear & more from Pakistan.',
    images: ['https://i.pinimg.com/originals/cd/44/98/cd4498d59ae2318e6283df5a611568d4.png'],
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
        {/* Organization structured data — enables Google Knowledge Panel */}
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Slots Sports Wear",
          "url": "https://slotssportswear.com",
          "logo": "https://slotssportswear.com/images/logosvg.png",
          "description": "Premium clothing manufacturer in Pakistan offering high-quality custom apparel, activewear, and formal wear with low MOQ starting at 50 pieces.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "PK"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "url": "https://slotssportswear.com/contact"
          },
          "sameAs": []
        }} />
        <LoaderProvider>
          <Nav />
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
            <Footer />
          </SmoothScroll>
        </LoaderProvider>
      </body>
    </html>
  );
}