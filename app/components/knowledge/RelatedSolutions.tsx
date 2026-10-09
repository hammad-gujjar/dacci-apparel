import React from 'react';
import Link from 'next/link';
import { KnowledgeRelatedSolution } from '@/lib/seo/knowledgeData';
import { IoArrowForwardOutline, IoLayersOutline } from 'react-icons/io5';

interface RelatedSolutionsProps {
    solutions: KnowledgeRelatedSolution[];
}

export default function RelatedSolutions({ solutions }: RelatedSolutionsProps) {
    if (!solutions || solutions.length === 0) return null;

    return (
        <section className="w-full max-w-5xl mx-auto px-5 md:px-10 py-12 space-y-8">
            <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 font-[middle]">
                    <IoLayersOutline className="text-sm text-neutral-700" />
                    <span>Manufacturing Capabilities & Lines</span>
                </div>
                <h2 className="font-[main] text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-[#111111]">
                    Related OEM / ODM Production Solutions
                </h2>
                <p className="font-[middle] text-xs sm:text-sm text-neutral-600 max-w-2xl">
                    Explore our active manufacturing lines and submit customized Tech Packs for these sports apparel categories.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {solutions.map((sol, idx) => (
                    <Link
                        key={idx}
                        href={`/solutions/${sol.slug}`}
                        className="group bg-white/70 hover:bg-white border border-black/10 hover:border-black rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-2xs hover:shadow-md"
                    >
                        <div className="space-y-3">
                            <span className="inline-block px-2.5 py-1 rounded-md bg-black/5 text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-600 font-[middle]">
                                {sol.category}
                            </span>
                            <h3 className="font-[main] text-xs sm:text-sm uppercase tracking-tight text-[#111111] group-hover:text-black transition-colors leading-snug">
                                {sol.title}
                            </h3>
                        </div>

                        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-neutral-500 font-[middle] pt-4 border-t border-black/5 group-hover:text-black">
                            <span>Explore Solution</span>
                            <IoArrowForwardOutline className="text-sm transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
