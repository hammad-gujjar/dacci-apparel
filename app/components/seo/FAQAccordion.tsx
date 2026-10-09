'use client';

import React, { useState } from 'react';
import { SolutionFAQ } from '@/lib/seo/solutionsData';
import { IoChevronDownOutline } from 'react-icons/io5';

interface FAQAccordionProps {
    faqs: SolutionFAQ[];
    title?: string;
    subtitle?: string;
}

export default function FAQAccordion({
    faqs,
    title = 'Frequently Asked Manufacturing Questions',
    subtitle = 'Key answers regarding minimum order quantities, prototype turnarounds, payment terms, and global shipping.',
}: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (idx: number) => {
        setOpenIndex(prev => (prev === idx ? null : idx));
    };

    return (
        <section className="w-full py-16 sm:py-24 px-5 md:px-10 max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500 font-[middle]">
                    B2B Buyer Knowledge Base
                </span>
                <h2 className="font-[main] text-xl sm:text-3xl uppercase tracking-tight text-[#111111]">
                    {title}
                </h2>
                <p className="font-[middle] text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
                    {subtitle}
                </p>
            </div>

            <div className="space-y-4">
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
