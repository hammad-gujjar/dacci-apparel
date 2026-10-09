import React from 'react';
import Link from 'next/link';
import { IoArrowForwardOutline, IoBookOutline } from 'react-icons/io5';

interface GuideLink {
    slug: string;
    title: string;
    readTime?: string;
    category?: string;
}

interface RelatedKnowledgeGuidesProps {
    guides?: GuideLink[];
}

const DEFAULT_GUIDES: GuideLink[] = [
    {
        slug: 'sportswear-fabric-guide',
        title: 'Sportswear Fabric Sourcing Guide: GSM Weights & Technical Blends',
        category: 'Materials & Fabrics',
        readTime: '9 min read',
    },
    {
        slug: 'sublimation-printing-guide',
        title: 'Complete Sublimation Printing Guide For Performance Apparel',
        category: 'Printing & Decoration',
        readTime: '8 min read',
    },
    {
        slug: 'aql-2-5-quality-control',
        title: 'AQL 2.5 Quality Control & Inspection Standards in Garment Manufacturing',
        category: 'Quality & Inspection',
        readTime: '10 min read',
    },
];

export default function RelatedKnowledgeGuides({ guides }: RelatedKnowledgeGuidesProps) {
    const displayGuides = guides && guides.length > 0 ? guides : DEFAULT_GUIDES;

    return (
        <section className="w-full max-w-6xl mx-auto px-5 md:px-10 py-12 md:py-16 space-y-8">
            <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 font-[middle]">
                    <IoBookOutline className="text-sm text-neutral-700" />
                    <span>E-E-A-T Technical Garment Knowledge</span>
                </div>
                <h2 className="font-[main] text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#111111]">
                    Manufacturing Engineering & Textile Standards
                </h2>
                <p className="font-[middle] text-xs sm:text-sm text-neutral-600 max-w-2xl">
                    Explore our in-depth technical guides covering GSM fabric weights, seam durability, and factory testing standards.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayGuides.map((guide, idx) => (
                    <Link
                        key={idx}
                        href={`/knowledge/${guide.slug}`}
                        className="group bg-white/80 hover:bg-white border border-black/10 hover:border-black rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-2xs hover:shadow-md"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="inline-block px-2.5 py-1 rounded-md bg-black/5 text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-600 font-[middle]">
                                    {guide.category || 'Technical Guide'}
                                </span>
                                <span className="text-[10px] text-neutral-400 font-[middle]">
                                    {guide.readTime || '8 min read'}
                                </span>
                            </div>

                            <h3 className="font-[main] text-sm sm:text-base uppercase tracking-tight text-[#111111] group-hover:text-black transition-colors leading-snug">
                                {guide.title}
                            </h3>
                        </div>

                        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-neutral-500 font-[middle] pt-4 border-t border-black/5 group-hover:text-black">
                            <span>Read Technical Standard</span>
                            <IoArrowForwardOutline className="text-sm transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
