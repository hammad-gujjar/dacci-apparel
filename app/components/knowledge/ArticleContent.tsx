import React from 'react';
import { KnowledgeSection, KnowledgeBuyerConsideration } from '@/lib/seo/knowledgeData';
import { IoInformationCircleOutline, IoCheckmarkCircle, IoWarningOutline } from 'react-icons/io5';

interface ArticleContentProps {
    introText: string[];
    sections: KnowledgeSection[];
    buyerConsiderations: KnowledgeBuyerConsideration[];
}

export default function ArticleContent({
    introText,
    sections,
    buyerConsiderations,
}: ArticleContentProps) {
    return (
        <article className="w-full max-w-5xl mx-auto px-5 md:px-10 py-12 space-y-14 text-neutral-800">
            {/* Executive Introduction Block */}
            {introText && introText.length > 0 && (
                <section className="space-y-4 pb-10 border-b border-black/10">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 font-[middle]">
                        <IoInformationCircleOutline className="text-sm" />
                        <span>Executive Manufacturing Brief</span>
                    </div>
                    {introText.map((p, idx) => (
                        <p
                            key={idx}
                            className={`font-[middle] leading-relaxed ${
                                idx === 0
                                    ? 'text-lg sm:text-xl font-normal text-neutral-800'
                                    : 'text-base sm:text-lg text-neutral-700'
                            }`}
                        >
                            {p}
                        </p>
                    ))}
                </section>
            )}

            {/* In-depth Sections */}
            <div className="space-y-16">
                {sections.map((section, idx) => (
                    <section
                        key={section.id || idx}
                        id={section.id}
                        className="scroll-mt-24 space-y-6"
                    >
                        {/* Section Number and Heading */}
                        <div className="space-y-2">
                            <span className="font-[main] text-xs font-bold text-neutral-400 tracking-widest uppercase">
                                SECTION 0{idx + 1}
                            </span>
                            <h2 className="font-[main] text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-[#111111] leading-snug">
                                {section.heading}
                            </h2>
                        </div>

                        {/* Section Body Paragraphs */}
                        <div className="space-y-4">
                            {section.content.map((paragraph, pIdx) => (
                                <p
                                    key={pIdx}
                                    className="font-[middle] text-base sm:text-lg text-neutral-700 leading-relaxed"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Key Takeaways Callout Card */}
                        {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                            <div className="bg-[#111111] text-[#EDEEE7] rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
                                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-bold text-neutral-300 font-[middle]">
                                    <IoCheckmarkCircle className="text-emerald-400 text-base" />
                                    <span>Technical Takeaways & Factory Tolerances</span>
                                </div>
                                <ul className="space-y-2.5">
                                    {section.keyTakeaways.map((takeaway, tIdx) => (
                                        <li key={tIdx} className="flex items-start gap-3 font-[middle] text-xs sm:text-sm text-neutral-200 leading-relaxed">
                                            <span className="size-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                                            <span>{takeaway}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                ))}
            </div>

            {/* Buyer Considerations Section */}
            {buyerConsiderations && buyerConsiderations.length > 0 && (
                <section className="pt-10 border-t border-black/10 space-y-8">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 font-[middle]">
                            <IoWarningOutline className="text-sm text-amber-600" />
                            <span>Procurement Due Diligence</span>
                        </div>
                        <h2 className="font-[main] text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-[#111111]">
                            Critical OEM Buyer Sourcing & Procurement Considerations
                        </h2>
                        <p className="font-[middle] text-sm sm:text-base text-neutral-600 max-w-2xl">
                            Key risk mitigation rules, sampling checkpoints, and factory verification strategies when procuring technical apparel.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {buyerConsiderations.map((consideration, cIdx) => (
                            <div
                                key={cIdx}
                                className="bg-white/70 border border-black/10 rounded-2xl p-6 flex flex-col justify-between space-y-5 hover:border-black/25 transition-all"
                            >
                                <div className="space-y-3">
                                    <span className="font-[main] text-xs font-bold text-neutral-400 tracking-wider">
                                        CHECKPOINT 0{cIdx + 1}
                                    </span>
                                    <h3 className="font-[main] text-sm sm:text-base font-bold uppercase tracking-tight text-[#111111]">
                                        {consideration.title}
                                    </h3>
                                    <p className="font-[middle] text-xs sm:text-sm text-neutral-700 leading-relaxed">
                                        {consideration.description}
                                    </p>
                                </div>

                                <div className="bg-[#111111]/5 border border-black/5 rounded-xl p-4">
                                    <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 font-[middle] mb-1">
                                        Factory Engineering Advice:
                                    </p>
                                    <p className="font-[middle] text-xs font-semibold text-[#111111] leading-relaxed">
                                        {consideration.advice}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
}
