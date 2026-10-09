import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { databaseConnection } from '@/lib/database';
import { KnowledgeArticle } from '@/models/KnowledgeArticle.model';
import { getAllKnowledgeArticles, KnowledgeArticleData } from '@/lib/seo/knowledgeData';
import KnowledgeDirectoryClient from './KnowledgeDirectoryClient';
import RFQCTA from '@/app/components/knowledge/RFQCTA';
import { IoChevronForwardOutline } from 'react-icons/io5';

export const revalidate = 86400; // Cache for 24 hours (ISR)

export const metadata: Metadata = {
    title: {
        absolute: 'Sportswear Manufacturing Knowledge Hub & Technical Guides | Slots Sports Wear',
    },
    description: 'Engineering guides on technical sportswear fabrics, GSM weights, sublimation printing chemistry, AQL 2.5 quality control inspection, and private label OEM manufacturing.',
    keywords: [
        'sportswear manufacturing guide',
        'technical fabric sourcing',
        'apparel GSM guide',
        'sublimation printing sportswear',
        'AQL 2.5 quality control clothing',
        'private label activewear OEM',
        'Sialkot apparel manufacturer',
        'custom teamwear production',
    ],
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app'}/knowledge`,
    },
    openGraph: {
        title: 'Sportswear Manufacturing Knowledge Hub & Technical Guides | Slots Sports Wear',
        description: 'Engineering guides on technical sportswear fabrics, GSM weights, sublimation printing chemistry, AQL 2.5 quality control inspection, and private label OEM manufacturing.',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app'}/knowledge`,
        siteName: 'Slots Sports Wear',
        images: [
            {
                url: 'https://res.cloudinary.com/dhrfua4wp/image/upload/v1780148472/remove_the_text_on_this_202605301840_dqohzp.webp',
                width: 1200,
                height: 630,
                alt: 'Slots Sports Wear Manufacturing Knowledge Hub',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sportswear Manufacturing Knowledge Hub | Slots Sports Wear',
        description: 'Engineering guides on technical sportswear fabrics, GSM weights, sublimation printing chemistry, AQL 2.5 quality control inspection, and private label OEM manufacturing.',
        images: ['https://res.cloudinary.com/dhrfua4wp/image/upload/v1780148472/remove_the_text_on_this_202605301840_dqohzp.webp'],
    },
};

async function getArticles(): Promise<KnowledgeArticleData[]> {
    const staticArticles = getAllKnowledgeArticles();

    try {
        await databaseConnection();
        const dbArticles = await KnowledgeArticle.find({ published: true }).lean();
        if (dbArticles && dbArticles.length > 0) {
            // Map DB articles if any exist, merging with static definitions
            const dbSlugs = new Set(dbArticles.map((a: any) => a.slug));
            const merged: KnowledgeArticleData[] = [
                ...staticArticles.filter(a => !dbSlugs.has(a.slug)),
                ...dbArticles.map((a: any) => ({
                    slug: a.slug,
                    title: a.title,
                    metaTitle: a.metaTitle || a.title,
                    metaDescription: a.metaDescription || a.heroSummary || '',
                    category: a.category || 'Manufacturing',
                    readTime: a.readTime || '8 min read',
                    publishDate: a.publishDate || '2026-03-01',
                    author: a.author || { name: 'Slots Engineering Team', role: 'OEM Technical Director' },
                    heroBadge: a.heroBadge || 'Technical Manufacturing Standard',
                    heroSummary: a.heroSummary || '',
                    introText: a.introText || [],
                    sections: a.sections || [],
                    technicalSpecs: a.technicalSpecs || { title: '', subtitle: '', headers: [], rows: [] },
                    buyerConsiderations: a.buyerConsiderations || [],
                    faqs: a.faqs || [],
                    relatedSolutions: a.relatedSolutions || [],
                })),
            ];
            return merged;
        }
    } catch {
        // Fall back gracefully to static library
    }

    return staticArticles;
}

export default async function KnowledgeHubPage() {
    const articles = await getArticles();

    const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app';

    // 1. Organization Schema
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Slots Sports Wear',
        url: siteBase,
        logo: 'https://res.cloudinary.com/dhrfua4wp/image/upload/v1780148472/remove_the_text_on_this_202605301840_dqohzp.webp',
        description: 'B2B custom sportswear, fitness apparel, and activewear OEM/ODM manufacturer in Sialkot, Pakistan.',
        address: {
            '@type': 'PostalAddress',
            addressRegion: 'Punjab',
            addressCountry: 'PK',
        },
    };

    // 2. CollectionPage Schema
    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Sportswear Manufacturing Knowledge Hub & Technical Guides',
        url: `${siteBase}/knowledge`,
        description: 'Comprehensive engineering documentation and manufacturing guides for apparel brand owners and sourcing managers.',
        isPartOf: {
            '@type': 'WebSite',
            name: 'Slots Sports Wear',
            url: siteBase,
        },
        hasPart: articles.map(art => ({
            '@type': 'TechArticle',
            name: art.title,
            headline: art.title,
            url: `${siteBase}/knowledge/${art.slug}`,
            description: art.metaDescription,
            author: {
                '@type': 'Person',
                name: art.author.name,
                jobTitle: art.author.role,
            },
        })),
    };

    // 3. BreadcrumbList Schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: siteBase,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Knowledge Hub',
                item: `${siteBase}/knowledge`,
            },
        ],
    };

    return (
        <main className="w-full min-h-screen bg-[#EDEEE7]">
            {/* Schema.org JSON-LD */}
            <JsonLd data={organizationSchema} />
            <JsonLd data={collectionSchema} />
            <JsonLd data={breadcrumbSchema} />

            {/* Header / Intro Section */}
            <section className="relative w-full pt-28 sm:pt-36 pb-12 sm:pb-16 px-5 md:px-10 max-w-5xl mx-auto text-center flex flex-col items-center">
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-neutral-500 font-[middle]">
                    <Link href="/" className="hover:text-black transition-colors">
                        Home
                    </Link>
                    <IoChevronForwardOutline className="text-neutral-400 text-xs" />
                    <span className="text-black font-bold">Knowledge Hub</span>
                </nav>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold text-neutral-800 font-[middle] mb-6">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Technical Manufacturing Knowledge Hub</span>
                </div>

                {/* Title */}
                <h1 className="font-[main] text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-[#111111] max-w-4xl mx-auto leading-[1.1] mb-6">
                    Sportswear Manufacturing & Technical Guides
                </h1>

                {/* Subtitle */}
                <p className="font-[middle] text-base sm:text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
                    Engineering documentation for apparel brand founders, technical directors, and sourcing managers. Explore factory tolerances, fiber chemistry, sublimation heat transfer parameters, and AQL 2.5 inspection protocols.
                </p>
            </section>

            {/* Directory Component with Filter Tabs & Cards */}
            <KnowledgeDirectoryClient articles={articles} />

            {/* Global Manufacturing CTA */}
            <RFQCTA
                title="Have A Custom Sportswear Line in Development?"
                subtitle="Send your Tech Pack, CAD vector files, or fabric reference specs to our engineering team in Sialkot for rapid cost analysis and physical prototype development."
                category="Sportswear"
                articleSlug="hub"
            />
        </main>
    );
}
