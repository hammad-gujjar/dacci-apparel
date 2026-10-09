'use client';

import React, { useState } from 'react';
import { KnowledgeFAQ } from '@/lib/seo/knowledgeData';
import { IoChevronDownOutline, IoHelpCircleOutline } from 'react-icons/io5';

interface FAQSectionProps {
    faqs: KnowledgeFAQ[];
    title?: string;
    subtitle?: string;
}

export default function FAQSection({
    faqs,
    title = 'Technical & Manufacturing FAQ',
    subtitle = 'Detailed engineering answers on fabric testing, sampling timelines, tolerances, and bulk production.',
}: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (idx: number) => {
        setOpenIndex(prev => (prev === idx ? null : idx));
    };

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="w-full max-w-5xl mx-auto px-5 md:px-10 py-12 space-y-8">
            <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 font-[middle]">
                    <IoHelpCircleOutline className="text-sm text-neutral-700" />
                    <span>Technical Inquiries</span>
                </div>
                <h2 className="font-[main] text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-[#111111]">
                    {title}
                </h2>
                <p className="font-[middle] text-xs sm:text-sm text-neutral-600 max-w-2xl">
                    {subtitle}
                </p>
            </div>

            <div className="space-y-3">
                {faqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                        <div
                            key={idx}
                            className="bg-white/70 border border-black/10 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs hover:border-black/25"
                        >
                            <button
                                type="button"
                                onClick={() => toggleFAQ(idx)}
                                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                                aria-expanded={isOpen}
                            >
                                <span className="font-[main] text-xs sm:text-sm font-bold uppercase tracking-tight text-[#111111]">
                                    {faq.question}
                                </span>
                                <span
                                    className={`size-8 rounded-full bg-black/5 flex items-center justify-center text-neutral-600 transition-transform duration-300 shrink-0 ${
                                        isOpen ? 'rotate-180 bg-black text-white' : ''
                                    }`}
                                >
                                    <IoChevronDownOutline className="text-sm" />
                                </span>
                            </button>

                            {isOpen && (
                                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm font-[middle] text-neutral-700 leading-relaxed border-t border-black/5">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
