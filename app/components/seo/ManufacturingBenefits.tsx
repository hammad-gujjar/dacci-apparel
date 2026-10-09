import React from 'react';
import { SolutionBenefit } from '@/lib/seo/solutionsData';
import {
    IoLayersOutline,
    IoDocumentTextOutline,
    IoCashOutline,
    IoShieldCheckmarkOutline,
    IoSparklesOutline
} from 'react-icons/io5';

interface ManufacturingBenefitsProps {
    introHeading: string;
    introText: string[];
    benefits: SolutionBenefit[];
}

export default function ManufacturingBenefits({
    introHeading,
    introText,
    benefits,
}: ManufacturingBenefitsProps) {
    const getBenefitIcon = (iconName?: string) => {
        switch (iconName) {
            case 'layers':
                return <IoLayersOutline className="text-2xl" />;
            case 'document':
                return <IoDocumentTextOutline className="text-2xl" />;
            case 'cash':
                return <IoCashOutline className="text-2xl" />;
            case 'shield':
                return <IoShieldCheckmarkOutline className="text-2xl" />;
            default:
                return <IoSparklesOutline className="text-2xl" />;
        }
    };

    return (
        <section className="w-full py-16 sm:py-24 px-5 md:px-10 max-w-7xl mx-auto space-y-16">
            {/* Editorial Introduction Block */}
            <div className="max-w-3xl mx-auto text-center space-y-4">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500 font-[middle]">
                    OEM / ODM Production Capability
                </span>
                <h2 className="font-[main] text-xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#111111]">
                    {introHeading}
                </h2>
                <div className="space-y-3 pt-2">
                    {introText.map((paragraph, idx) => (
                        <p key={idx} className="font-[middle] text-sm sm:text-base text-neutral-700 leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>

            {/* 4-Card Equal Height Value Propositions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {benefits.map((benefit, idx) => (
                    <article
                        key={idx}
                        className="bg-white/60 border border-black/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-black/30 hover:shadow-lg transition-all duration-300 group"
                    >
                        <div className="space-y-4">
                            <div className="size-12 rounded-2xl bg-black text-[#EDEEE7] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                {getBenefitIcon(benefit.icon)}
                            </div>
                            <h3 className="font-[main] text-sm sm:text-base font-bold uppercase tracking-tight text-[#111111]">
                                {benefit.title}
                            </h3>
                            <p className="font-[middle] text-xs sm:text-sm text-neutral-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                        <div className="pt-4 mt-4 border-t border-black/5 text-[9px] uppercase tracking-widest font-bold text-neutral-400 font-[middle]">
                            Standard Factory Protocol
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
