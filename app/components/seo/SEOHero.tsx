import React from 'react';
import Link from 'next/link';
import { SolutionStat } from '@/lib/seo/solutionsData';
import TransitionButton from '../TransitionButton';
import { IoShieldCheckmarkOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface SEOHeroProps {
    title: string;
    subtitle: string;
    heroBadge: string;
    heroDescription: string;
    stats: SolutionStat[];
    targetCategory: string;
    slug: string;
}

export default function SEOHero({
    title,
    subtitle,
    heroBadge,
    heroDescription,
    stats,
    targetCategory,
    slug,
}: SEOHeroProps) {
    return (
        <section className="relative w-full pt-28 sm:pt-36 pb-16 sm:pb-24 px-5 md:px-10 max-w-7xl mx-auto text-center flex flex-col items-center">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-neutral-500 font-[middle]">
                <Link href="/" className="hover:text-black transition-colors">
                    Home
                </Link>
                <IoChevronForwardOutline className="text-neutral-400 text-xs" />
                <span className="text-neutral-400">Solutions</span>
                <IoChevronForwardOutline className="text-neutral-400 text-xs" />
                <span className="text-black font-bold truncate max-w-[200px] sm:max-w-xs">{title}</span>
            </nav>

            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold text-neutral-800 font-[middle] mb-6">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{heroBadge}</span>
            </div>

            {/* Main H1 Title */}
            <h1 className="font-[main] text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-[#111111] max-w-4xl mx-auto leading-[1.1] mb-6">
                {title}
            </h1>

            {/* Subtitle / Lead narrative */}
            <p className="font-[middle] text-base sm:text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed mb-4">
                {subtitle}
            </p>

            {/* Detailed Factory Scope Description */}
            <p className="font-[middle] text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto leading-normal mb-10">
                {heroDescription}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-16">
                <Link href={`/contact?type=${encodeURIComponent(targetCategory)}&slug=${encodeURIComponent(slug)}`} className="w-full sm:w-auto">
                    <TransitionButton
                        text="REQUEST QUOTE & TECH PACK"
                        rollingText={true}
                        arrow={true}
                        className="w-full sm:w-auto px-8 py-4 bg-black text-[#EDEEE7] rounded-full text-xs font-bold uppercase tracking-[0.25em] hover:bg-neutral-800 transition-all shadow-md active:scale-[0.97]"
                    />
                </Link>
                <a
                    href="#capabilities"
                    className="w-full sm:w-auto px-8 py-4 border border-black/20 hover:border-black rounded-full text-xs font-bold uppercase tracking-[0.25em] text-neutral-800 hover:bg-black/5 transition-all text-center"
                >
                    View Capabilities
                </a>
            </div>

            {/* Trust Stats Bar */}
            {stats && stats.length > 0 && (
                <div className="w-full max-w-5xl bg-white/60 border border-black/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center space-y-1">
                                <span className="font-[middle] font-bold text-2xl sm:text-3xl text-[#111111] tabular-nums">
                                    {stat.value}
                                </span>
                                <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-500 font-[middle]">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
