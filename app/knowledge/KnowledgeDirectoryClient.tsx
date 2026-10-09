'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KnowledgeArticleData } from '@/lib/seo/knowledgeData';
import { IoTimeOutline, IoArrowForwardOutline, IoDocumentTextOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

interface KnowledgeDirectoryClientProps {
    articles: KnowledgeArticleData[];
}

export default function KnowledgeDirectoryClient({ articles }: KnowledgeDirectoryClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];

    const filteredArticles = selectedCategory === 'All'
        ? articles
        : articles.filter(a => a.category === selectedCategory);

    return (
        <div className="w-full space-y-12">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto px-4">
                {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-[middle] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                isSelected
                                    ? 'bg-[#111111] text-[#EDEEE7] shadow-sm'
                                    : 'bg-white/60 hover:bg-white text-neutral-600 hover:text-black border border-black/10'
                            }`}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-5 md:px-10">
                {filteredArticles.map((article) => (
                    <article
                        key={article.slug}
                        className="group bg-white/80 hover:bg-white border border-black/10 hover:border-black rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-lg"
                    >
                        <div className="space-y-4">
                            {/* Meta Top: Category & Read Time */}
                            <div className="flex items-center justify-between gap-2">
                                <span className="inline-block px-3 py-1 rounded-full bg-black/5 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-700 font-[middle]">
                                    {article.category}
                                </span>
                                <span className="flex items-center gap-1 text-[11px] font-semibold text-neutral-500 font-[middle]">
                                    <IoTimeOutline className="text-neutral-400" />
                                    {article.readTime}
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="font-[main] text-base sm:text-lg uppercase tracking-tight text-[#111111] group-hover:text-black leading-snug line-clamp-2">
                                <Link href={`/knowledge/${article.slug}`}>
                                    {article.title}
                                </Link>
                            </h2>

                            {/* Summary */}
                            <p className="font-[middle] text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                                {article.heroSummary}
                            </p>

                            {/* Technical Focus Highlights */}
                            <div className="pt-3 border-t border-black/5 space-y-1.5">
                                <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 font-[middle] flex items-center gap-1.5">
                                    <IoDocumentTextOutline /> Key Focus:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                    {article.sections.slice(0, 3).map((sec, sIdx) => (
                                        <span
                                            key={sIdx}
                                            className="px-2 py-0.5 rounded bg-black/[0.03] text-[10px] text-neutral-600 font-[middle] truncate max-w-[200px]"
                                        >
                                            {sec.heading.split(':')[0]}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Card Footer: Author & Link */}
                        <div className="pt-6 mt-6 border-t border-black/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="size-7 rounded-full bg-[#111111] text-[#EDEEE7] flex items-center justify-center font-[main] text-[9px] font-bold shrink-0">
                                    SSW
                                </div>
                                <div className="text-[10px] font-[middle]">
                                    <p className="font-semibold text-neutral-800 truncate max-w-[120px]">{article.author.name}</p>
                                    <p className="text-neutral-400">OEM Division</p>
                                </div>
                            </div>

                            <Link
                                href={`/knowledge/${article.slug}`}
                                className="inline-flex items-center gap-1.5 text-xs font-[main] uppercase tracking-wider font-bold text-[#111111] group-hover:text-black group-hover:translate-x-0.5 transition-all"
                            >
                                <span>Read Guide</span>
                                <IoArrowForwardOutline />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
