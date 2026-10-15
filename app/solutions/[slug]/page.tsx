import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { databaseConnection } from '@/lib/database';
import { SEOPage } from '@/models/SEOPage.model';
import {
    getAllSolutionsSlugs,
    getSolutionData,
    SolutionPageData
} from '@/lib/seo/solutionsData';

// Reusable SEO page components
import SEOHero from '@/app/components/seo/SEOHero';
import ManufacturingBenefits from '@/app/components/seo/ManufacturingBenefits';
import CapabilityGrid from '@/app/components/seo/CapabilityGrid';
import ProcessTimeline from '@/app/components/seo/ProcessTimeline';
import FAQAccordion from '@/app/components/seo/FAQAccordion';
import RelatedKnowledgeGuides from '@/app/components/seo/RelatedKnowledgeGuides';
import RFQCTA from '@/app/components/seo/RFQCTA';

interface SolutionPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export const revalidate = 86400; // Cache for 24 hours (ISR)

export async function generateStaticParams() {
    const staticSlugs = getAllSolutionsSlugs();
    try {
        await databaseConnection();
        const dbPages = await SEOPage.find({ published: true }).select('slug').lean();
        const allSlugs = Array.from(new Set([...staticSlugs, ...dbPages.map((p: any) => p.slug)]));
        return allSlugs.map(slug => ({ slug }));
    } catch {
        return staticSlugs.map(slug => ({ slug }));
    }
}

async function fetchSolution(slug: string): Promise<SolutionPageData | null> {
    // 1. Try DB override first
    try {
        await databaseConnection();
        const dbPage = await SEOPage.findOne({ slug }).lean();
        if (dbPage) {
            // If unpublished or draft, return with published: false flag for preview
            return {
                slug: dbPage.slug,
                title: dbPage.title,
                subtitle: dbPage.heroDescription || '',
                metaTitle: dbPage.metaTitle,
                metaDescription: dbPage.metaDescription,
                keywords: dbPage.keywords || [],
                heroBadge: dbPage.heroBadge || 'OEM / ODM Manufacturing Excellence',
                heroDescription: dbPage.heroDescription || '',
                targetCategory: 'Activewear',
                stats: dbPage.stats || [],
                introHeading: dbPage.introHeading || 'Manufacturing Excellence',
                introText: dbPage.introText || [],
                benefits: dbPage.benefits || [],
                capabilities: dbPage.capabilities || [],
                fabrics: dbPage.fabrics || [],
                customization: dbPage.customization || [],
                faqs: dbPage.faqs || [],
                relatedKnowledgeGuides: dbPage.relatedKnowledgeGuides || [],
                canonicalUrl: dbPage.canonicalUrl,
                noIndex: dbPage.noIndex,
                published: dbPage.published !== false && dbPage.status !== 'Draft',
            };
        }
    } catch {
        // Fall back to static dataset if database error occurs
    }

    // 2. Return high-quality static dataset
    return getSolutionData(slug);
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
    const { slug } = await params;
    const solution = await fetchSolution(slug);

    if (!solution) {
        return {
            title: 'Manufacturing Solution Not Found | Slots Sports Wear',
            description: 'Custom sportswear manufacturing solution not found.',
        };
    }

    const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app';
    const canonicalUrl = solution.canonicalUrl || `${siteBase}/solutions/${slug}`;
    const ogImage = 'https://res.cloudinary.com/dhrfua4wp/image/upload/v1780148472/remove_the_text_on_this_202605301840_dqohzp.webp';
    const isIndexable = !solution.noIndex && solution.published !== false;

    return {
        title: {
            absolute: solution.metaTitle,
        },
        description: solution.metaDescription,
        keywords: solution.keywords,
        alternates: {
            canonical: canonicalUrl,
        },
        robots: {
            index: isIndexable,
            follow: isIndexable,
            googleBot: {
                index: isIndexable,
                follow: isIndexable,
            },
        },
        openGraph: {
            title: solution.metaTitle,
            description: solution.metaDescription,
            url: canonicalUrl,
            siteName: 'Slots Sports Wear',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: solution.title,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: solution.metaTitle,
            description: solution.metaDescription,
            images: [ogImage],
        },
    };
}

export default async function Page({ params }: SolutionPageProps) {
    const { slug } = await params;
    const solution = await fetchSolution(slug);

    if (!solution) {
        notFound();
    }

    const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app';
    const canonicalUrl = `${siteBase}/solutions/${slug}`;

    // Schema 1: Organization
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Slots Sports Wear',
        url: siteBase,
        logo: 'https://res.cloudinary.com/dhrfua4wp/image/upload/v1780148472/remove_the_text_on_this_202605301840_dqohzp.webp',
        description: 'B2B custom sportswear, fitness apparel, and activewear OEM/ODM manufacturer.',
        address: {
            '@type': 'PostalAddress',
            addressRegion: 'Punjab',
            addressCountry: 'PK',
        },
    };

    // Schema 2: Service / Manufacturing Service
    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: solution.title,
        name: solution.title,
        provider: {
            '@type': 'Organization',
            name: 'Slots Sports Wear',
            url: siteBase,
        },
        areaServed: 'Worldwide',
        description: solution.metaDescription,
    };

    // Schema 3: BreadcrumbList
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
                name: solution.title,
                item: canonicalUrl,
            },
        ],
    };

    // Schema 4: FAQPage
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: solution.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <main className="w-full min-h-screen bg-[#EDEEE7]">
            {/* 1. Structured Data Injection */}
            <JsonLd data={organizationSchema} />
            <JsonLd data={serviceSchema} />
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={faqSchema} />

            {/* 2. Hero Section */}
            <SEOHero
                title={solution.title}
                subtitle={solution.subtitle}
                heroBadge={solution.heroBadge}
                heroDescription={solution.heroDescription}
                stats={solution.stats}
                targetCategory={solution.targetCategory}
                slug={solution.slug}
            />

            {/* 3. Manufacturing Benefits & Intro */}
            <ManufacturingBenefits
                introHeading={solution.introHeading}
                introText={solution.introText}
                benefits={solution.benefits}
            />

            {/* 4. Production Capabilities, Fabrics & Customization */}
            <CapabilityGrid
                capabilities={solution.capabilities}
                fabrics={solution.fabrics}
                customization={solution.customization}
            />

            {/* 5. Five-Stage Manufacturing Timeline */}
            <ProcessTimeline />

            {/* 6. Frequently Asked Questions */}
            <FAQAccordion faqs={solution.faqs} />

            {/* 7. Internal Linking: Technical Manufacturing Knowledge Guides */}
            <RelatedKnowledgeGuides guides={solution.relatedKnowledgeGuides} />

            {/* 8. Strong Conversion RFQ CTA */}
            <RFQCTA
                title={`Start Manufacturing Your ${solution.targetCategory} Line`}
                subtitle={`Partner with Slots Sports Wear for precision ${solution.title.toLowerCase()}. Request a physical prototype with your custom branding within 7–14 days.`}
                targetCategory={solution.targetCategory}
                slug={solution.slug}
            />
        </main>
    );
}
