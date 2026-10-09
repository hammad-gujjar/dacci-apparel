import React from 'react';
import Link from 'next/link';
import { IoChevronForwardOutline, IoTimeOutline, IoDocumentTextOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

interface KnowledgeHeroProps {
    title: string;
    heroBadge: string;
    category: string;
    readTime: string;
    publishDate: string;
    author: {
        name: string;
        role: string;
    };
    heroSummary: string;
    slug: string;
    sections?: { id: string; heading: string }[];
}

export default function KnowledgeHero({
    title,
    heroBadge,
    category,
    readTime,
    publishDate,
    author,
    heroSummary,
    slug,
    sections = [],
}: KnowledgeHeroProps) {
    return (
        <header className="relative w-full pt-28 sm:pt-36 pb-12 sm:pb-16 px-5 md:px-10 max-w-5xl mx-auto flex flex-col items-start border-b border-black/10">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-neutral-500 font-[middle]">
                <Link href="/" className="hover:text-black transition-colors">
                    Home
                </Link>
                <IoChevronForwardOutline className="text-neutral-400 text-xs" />
                <Link href="/knowledge" className="hover:text-black transition-colors">
                    Knowledge Hub
                </Link>
                <IoChevronForwardOutline className="text-neutral-400 text-xs" />
                <span className="text-neutral-400">{category}</span>
            </nav>

            {/* Badges & Meta Meta Row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-[#EDEEE7] text-[10px] uppercase tracking-[0.25em] font-bold font-[middle]">
                    {category}
                </span>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-700 font-[middle]">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{heroBadge}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-neutral-500 font-[middle]">
                    <IoTimeOutline className="text-neutral-400 text-sm" />
                    <span>{readTime}</span>
                </div>
            </div>

            {/* Main H1 Title */}
            <h1 className="font-[main] text-2xl sm:text-4xl md:text-5xl lg:text-5xl uppercase tracking-tight text-[#111111] leading-[1.15] mb-6">
                {title}
            </h1>

            {/* Hero Summary Lead */}
            <p className="font-[middle] text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed max-w-3xl mb-8">
                {heroSummary}
            </p>

            {/* Technical Byline / E-E-A-T Author Card */}
            <div className="w-full bg-white/70 border border-black/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="size-11 rounded-full bg-[#111111] text-[#EDEEE7] flex items-center justify-center font-[main] text-xs font-bold shrink-0">
                        SSW
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="font-[main] text-xs sm:text-sm font-bold uppercase tracking-tight text-[#111111]">
                                {author.name}
                            </span>
                            <IoCheckmarkCircleOutline className="text-emerald-600 text-sm" title="Verified OEM Technical Contributor" />
                        </div>
                        <p className="font-[middle] text-[11px] sm:text-xs text-neutral-600">
                            {author.role} • Verified Manufacturing Standard
                        </p>
                    </div>
                </div>

                <div className="text-[11px] sm:text-xs font-[middle] text-neutral-500 sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-black/5">
                    <p>Published: <span className="font-semibold text-neutral-700">{publishDate}</span></p>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-400">Sialkot OEM Factory Division</p>
                </div>
            </div>

            {/* Jump Navigation Pills */}
            {sections && sections.length > 0 && (
                <div className="w-full mt-6 pt-4 border-t border-black/5">
                    <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-500 font-[middle]">
                        <IoDocumentTextOutline className="text-sm" />
                        <span>In This Technical Guide:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {sections.map((sec, idx) => (
                            <a
                                key={sec.id || idx}
                                href={`#${sec.id}`}
                                className="px-3 py-1 bg-white/60 hover:bg-black hover:text-[#EDEEE7] text-neutral-700 rounded-lg border border-black/10 text-[11px] font-[middle] font-medium transition-all"
                            >
                                {idx + 1}. {sec.heading}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
