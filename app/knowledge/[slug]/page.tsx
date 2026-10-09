import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { databaseConnection } from '@/lib/database';
import { KnowledgeArticle } from '@/models/KnowledgeArticle.model';
import {
    getAllKnowledgeSlugs,
    getKnowledgeArticle,
    KnowledgeArticleData,
} from '@/lib/seo/knowledgeData';

// Knowledge Hub Components
import KnowledgeHero from '@/app/components/knowledge/KnowledgeHero';
import ArticleContent from '@/app/components/knowledge/ArticleContent';
import TechnicalSpecification from '@/app/components/knowledge/TechnicalSpecification';
import FAQSection from '@/app/components/knowledge/FAQSection';
import RelatedSolutions from '@/app/components/knowledge/RelatedSolutions';
import RFQCTA from '@/app/components/knowledge/RFQCTA';

interface KnowledgePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export const revalidate = 86400; // Cache for 24 hours (ISR)

export async function generateStaticParams() {
    const staticSlugs = getAllKnowledgeSlugs();
    try {
        await databaseConnection();
        const dbArticles = await KnowledgeArticle.find({ published: true }).select('slug').lean();
        const allSlugs = Array.from(new Set([...staticSlugs, ...dbArticles.map((a: any) => a.slug)]));
        return allSlugs.map(slug => ({ slug }));
    } catch {
        return staticSlugs.map(slug => ({ slug }));
    }
}

async function fetchArticle(slug: string): Promise<KnowledgeArticleData | null> {
    // 1. Try DB first
    try {
        await databaseConnection();
        const dbArticle = await KnowledgeArticle.findOne({ slug }).lean();
        if (dbArticle) {
            return {
                slug: dbArticle.slug,
                title: dbArticle.title,
                metaTitle: dbArticle.metaTitle || dbArticle.title,
                metaDescription: dbArticle.metaDescription || dbArticle.heroSummary || '',
                category: dbArticle.category || 'Manufacturing',
                readTime: dbArticle.readTime || '8 min read',
                publishDate: dbArticle.publishDate || '2026-03-01',
                author: dbArticle.author || { name: 'Slots Engineering Team', role: 'OEM Technical Director' },
                heroBadge: dbArticle.heroBadge || 'Technical Manufacturing Standard',
                heroSummary: dbArticle.heroSummary || '',
                introText: dbArticle.introText || [],
                sections: dbArticle.sections || [],
                technicalSpecs: dbArticle.technicalSpecs || { title: '', subtitle: '', headers: [], rows: [] },
                buyerConsiderations: dbArticle.buyerConsiderations || [],
                faqs: dbArticle.faqs || [],
                relatedSolutions: dbArticle.relatedSolutions || [],
                relatedArticles: dbArticle.relatedArticles || [],
                canonicalUrl: dbArticle.canonicalUrl,
                noIndex: dbArticle.noIndex,
                published: dbArticle.published !== false && dbArticle.status !== 'Draft',
            };
        }
    } catch {
        // Fall back gracefully to static content library
    }

    // 2. Static Knowledge Base
    return getKnowledgeArticle(slug);
}

export async function generateMetadata({ params }: KnowledgePageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await fetchArticle(slug);

    if (!article) {
        return {
            title: 'Technical Guide Not Found | Slots Sports Wear',
            description: 'Manufacturing technical guide not found.',
        };
    }

    const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app';
    const canonicalUrl = article.canonicalUrl || `${siteBase}/knowledge/${slug}`;
    const ogImage = 'https://res.cloudinary.com/dhrfua4wp/image/upload/v1780148472/remove_the_text_on_this_202605301840_dqohzp.webp';
    const isIndexable = !article.noIndex && article.published !== false;

    return {
        title: {
            absolute: `${article.metaTitle} | Slots Sports Wear`,
        },
        description: article.metaDescription,
        keywords: [
            article.category.toLowerCase(),
            article.slug.replace(/-/g, ' '),
            'sportswear manufacturing',
            'Sialkot OEM factory',
            'apparel production guide',
            'OEM activewear specs',
        ],
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
            title: `${article.metaTitle} | Slots Sports Wear`,
            description: article.metaDescription,
            url: canonicalUrl,
            siteName: 'Slots Sports Wear',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
            type: 'article',
            publishedTime: article.publishDate,
            authors: [article.author.name],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.metaTitle,
            description: article.metaDescription,
            images: [ogImage],
        },
    };
}

export default async function KnowledgeArticlePage({ params }: KnowledgePageProps) {
    const { slug } = await params;
    const article = await fetchArticle(slug);

    if (!article) {
        notFound();
    }

    const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app';
    const canonicalUrl = `${siteBase}/knowledge/${slug}`;

    // Schema 1: Organization
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

    // Schema 2: TechArticle
    const techArticleSchema = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: article.title,
        description: article.metaDescription,
        url: canonicalUrl,
        inLanguage: 'en',
        proficiencyLevel: 'Expert',
        datePublished: article.publishDate,
        dateModified: article.publishDate,
        author: {
            '@type': 'Person',
            name: article.author.name,
            jobTitle: article.author.role,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Slots Sports Wear',
            logo: {
                '@type': 'ImageObject',
                url: 'https://res.cloudinary.com/dhrfua4wp/image/upload/v1780148472/remove_the_text_on_this_202605301840_dqohzp.webp',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
        },
        articleSection: article.category,
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
                name: 'Knowledge Hub',
                item: `${siteBase}/knowledge`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: article.title,
                item: canonicalUrl,
            },
        ],
    };

    // Schema 4: FAQPage
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqs.map(faq => ({
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
            <JsonLd data={techArticleSchema} />
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={faqSchema} />

            {/* 2. Knowledge Hero */}
            <KnowledgeHero
                title={article.title}
                heroBadge={article.heroBadge}
                category={article.category}
                readTime={article.readTime}
                publishDate={article.publishDate}
                author={article.author}
                heroSummary={article.heroSummary}
                slug={article.slug}
                sections={article.sections.map(s => ({ id: s.id, heading: s.heading }))}
            />

            {/* 3. Deep Technical Article Body */}
            <ArticleContent
                introText={article.introText}
                sections={article.sections}
                buyerConsiderations={article.buyerConsiderations}
            />

            {/* 4. Laboratory Technical Specification Matrix */}
            <TechnicalSpecification specs={article.technicalSpecs} />

            {/* 5. Frequently Asked Technical Questions */}
            <FAQSection faqs={article.faqs} />

            {/* 6. Related Production Solutions */}
            <RelatedSolutions solutions={article.relatedSolutions} />

            {/* 7. Conversion RFQ CTA */}
            <RFQCTA
                title={`Engineer Your Next Collection to These Standards`}
                subtitle={`Partner with Slots Sports Wear for precision manufacturing in Sialkot, Pakistan. Rapid prototyping from your CAD/Tech Pack files within 7–14 days.`}
                category={article.category}
                articleSlug={article.slug}
            />
        </main>
    );
}
