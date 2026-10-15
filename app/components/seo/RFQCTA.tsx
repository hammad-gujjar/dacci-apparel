import React from 'react';
import Link from 'next/link';
import TransitionButton from '../TransitionButton';
import { IoShieldCheckmarkOutline, IoTimeOutline, IoCubeOutline, IoAirplaneOutline } from 'react-icons/io5';

interface RFQCTAProps {
    title?: string;
    subtitle?: string;
    targetCategory?: string;
    slug?: string;
}

export default function RFQCTA({
    title = 'Ready to Manufacture Your Custom Sportswear Collection?',
    subtitle = 'Connect directly with our engineering team to review tech packs, request fabric swatches, or initiate pre-production sample development.',
    targetCategory = 'Activewear',
    slug = 'custom-sportswear-manufacturer',
}: RFQCTAProps) {
    return (
        <section className="w-full py-16 sm:py-24 px-5 md:px-10 max-w-7xl mx-auto">
            <div className="bg-[#111111] text-[#EDEEE7] rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl flex flex-col items-center text-center space-y-8">
                {/* Background Texture & Badges */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-300 font-[middle]">
                    <span>Factory Direct Partnerships</span>
                </div>

                <h2 className="font-[main] text-2xl sm:text-3xl md:text-5xl uppercase tracking-tight text-white max-w-3xl leading-[1.15]">
                    {title}
                </h2>

                <p className="font-[middle] text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
                    {subtitle}
                </p>

                {/* Reassurance Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 w-full max-w-3xl border-y border-white/10 text-neutral-300 text-xs font-[middle]">
                    <div className="flex items-center justify-center gap-2">
                        <IoCubeOutline className="text-lg text-emerald-400 shrink-0" />
                        <span className="font-semibold">MOQ 30 Pcs/Style</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <IoTimeOutline className="text-lg text-emerald-400 shrink-0" />
                        <span className="font-semibold">7–14 Days Prototyping</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <IoShieldCheckmarkOutline className="text-lg text-emerald-400 shrink-0" />
                        <span className="font-semibold">Strict NDA Protected</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <IoAirplaneOutline className="text-lg text-emerald-400 shrink-0" />
                        <span className="font-semibold">Express Air Logistics</span>
                    </div>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-2">
                    <Link
                        href={`/contact?type=${encodeURIComponent(targetCategory)}&slug=${encodeURIComponent(slug)}`}
                        className="w-full sm:w-auto"
                    >
                        <TransitionButton
                            text="REQUEST QUOTE & TECH PACK"
                            rollingText={true}
                            arrow={true}
                            className="w-full sm:w-auto px-8 py-4.5 bg-white text-black rounded-full text-xs font-bold uppercase tracking-[0.25em] hover:bg-neutral-200 transition-all shadow-lg active:scale-[0.97]"
                        />
                    </Link>
                    <Link
                        href="/cart"
                        className="w-full sm:w-auto px-8 py-4.5 border border-white/25 hover:border-white rounded-full text-xs font-bold uppercase tracking-[0.25em] text-white hover:bg-white/10 transition-all text-center"
                    >
                        Build Multi-Item RFQ
                    </Link>
                </div>

                <p className="text-[10px] font-[middle] text-neutral-400 uppercase tracking-widest pt-2">
                    Slots Sports Wear · Punjab, Pakistan · Global B2B Sportswear Manufacturer
                </p>
            </div>
        </section>
    );
}
