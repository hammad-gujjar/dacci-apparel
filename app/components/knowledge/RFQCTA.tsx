import React from 'react';
import Link from 'next/link';
import TransitionButton from '../TransitionButton';
import { IoShieldCheckmarkOutline, IoFlaskOutline, IoRocketOutline, IoDocumentAttachOutline } from 'react-icons/io5';

interface RFQCTAProps {
    title?: string;
    subtitle?: string;
    category?: string;
    articleSlug?: string;
}

export default function RFQCTA({
    title = 'Ready to Put These Manufacturing Standards Into Production?',
    subtitle = 'Submit your Tech Pack or preliminary concept sketches directly to our Sialkot manufacturing engineers for rapid quotation, fabric swatch sampling, and physical pre-production prototyping.',
    category = 'Sportswear',
    articleSlug = '',
}: RFQCTAProps) {
    const contactUrl = `/contact?type=${encodeURIComponent(category)}${
        articleSlug ? `&ref=${encodeURIComponent(articleSlug)}` : ''
    }`;

    return (
        <section className="w-full max-w-5xl mx-auto px-5 md:px-10 py-16">
            <div className="relative overflow-hidden bg-[#111111] text-[#EDEEE7] rounded-3xl p-8 sm:p-12 md:p-16 border border-neutral-800 shadow-2xl flex flex-col items-center text-center">
                {/* Background decorative glow */}
                <div className="absolute -top-24 -left-24 size-72 bg-emerald-950/40 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 size-72 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none" />

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold text-neutral-300 font-[middle] mb-6">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Direct Factory OEM / ODM Manufacturing</span>
                </div>

                {/* Headline */}
                <h2 className="font-[main] text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#EDEEE7] max-w-3xl leading-[1.15] mb-6">
                    {title}
                </h2>

                {/* Subtitle */}
                <p className="font-[middle] text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl leading-relaxed mb-10">
                    {subtitle}
                </p>

                {/* Dual Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-12">
                    <Link href={contactUrl} className="w-full sm:w-auto">
                        <TransitionButton
                            text="REQUEST SAMPLE & RFQ"
                            rollingText={true}
                            arrow={true}
                            className="w-full sm:w-auto px-8 py-4 bg-[#EDEEE7] text-[#111111] rounded-full text-xs font-bold uppercase tracking-[0.25em] hover:bg-white transition-all shadow-lg active:scale-[0.97]"
                        />
                    </Link>
                    <Link
                        href="/manufacturing-process"
                        className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-white rounded-full text-xs font-bold uppercase tracking-[0.25em] text-[#EDEEE7] hover:bg-white/5 transition-all text-center"
                    >
                        7-Stage Process
                    </Link>
                </div>

                {/* Factory Commitments Grid */}
                <div className="w-full border-t border-neutral-800 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-neutral-400 font-[middle] text-xs">
                    <div className="flex flex-col items-center space-y-1.5">
                        <IoRocketOutline className="text-xl text-emerald-400" />
                        <span className="font-bold text-white uppercase text-[11px]">50 Pcs Low MOQ</span>
                        <span className="text-[10px] text-neutral-400">Accessible sampling</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1.5">
                        <IoShieldCheckmarkOutline className="text-xl text-emerald-400" />
                        <span className="font-bold text-white uppercase text-[11px]">AQL 2.5 Quality</span>
                        <span className="text-[10px] text-neutral-400">Strict factory inspection</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1.5">
                        <IoFlaskOutline className="text-xl text-emerald-400" />
                        <span className="font-bold text-white uppercase text-[11px]">7-14 Days Sample</span>
                        <span className="text-[10px] text-neutral-400">Fast physical prototype</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1.5">
                        <IoDocumentAttachOutline className="text-xl text-emerald-400" />
                        <span className="font-bold text-white uppercase text-[11px]">Tech Pack Direct</span>
                        <span className="text-[10px] text-neutral-400">CAD & PDF instant intake</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
