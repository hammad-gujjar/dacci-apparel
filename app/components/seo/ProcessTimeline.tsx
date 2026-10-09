import React from 'react';
import Link from 'next/link';

interface TimelineStep {
    number: string;
    stage: string;
    timeframe: string;
    description: string;
    deliverable: string;
}

const PRODUCTION_STEPS: TimelineStep[] = [
    {
        number: '01',
        stage: 'Tech Pack Audit & Quotation Matrix',
        timeframe: '24 Hours',
        description: 'Our CAD pattern engineers examine your specs, measurements, grading charts, and fabric requirements, delivering a tiered quotation matrix.',
        deliverable: 'Approved BOM & Cost Breakdown'
    },
    {
        number: '02',
        stage: 'Prototype & Fit Sample Development',
        timeframe: '7–14 Days',
        description: 'We cut, print, and construct exact physical fit prototypes for client fit testing, hand-feel verification, and trim approval.',
        deliverable: 'Physical Sample Dispatched via DHL'
    },
    {
        number: '03',
        stage: 'Bulk Fabric Knitting, Dyeing & Sublimation',
        timeframe: '10–14 Days',
        description: 'Approved textiles are knitted, dyed to Pantone lab dips, and fed through Japanese wide-format sublimation and laser cutting.',
        deliverable: 'Precision Laser-Cut Garment Panels'
    },
    {
        number: '04',
        stage: 'Cut & Sew Assembly & Embellishment',
        timeframe: '7–10 Days',
        description: 'Four-needle flatlock sewing lines assemble panels with bar-tack reinforcements, woven brand tags, and bespoke hardware.',
        deliverable: 'Fully Assembled Sportswear'
    },
    {
        number: '05',
        stage: 'AQL 2.5 Quality Audit & Express Dispatch',
        timeframe: '3–5 Days',
        description: 'Every garment undergoes measurement tolerance audits, pull-testing, steam pressing, barcoding, and express international air shipping.',
        deliverable: 'Delivered to Client Facility'
    }
];

export default function ProcessTimeline() {
    return (
        <section className="w-full py-16 sm:py-24 px-5 md:px-10 max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500 font-[middle]">
                    End-to-End Production
                </span>
                <h2 className="font-[main] text-xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#111111]">
                    Five-Stage Manufacturing Timeline
                </h2>
                <p className="font-[middle] text-xs sm:text-sm text-neutral-600">
                    A rigorous, structured production workflow designed to keep brand buyers informed at every milestone.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch">
                {PRODUCTION_STEPS.map((step, idx) => (
                    <div
                        key={idx}
                        className="bg-white/60 border border-black/10 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-black/30 hover:shadow-md transition-all shadow-xs relative"
                    >
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="font-[main] text-2xl font-bold text-[#111111]">
                                    {step.number}
                                </span>
                                <span className="text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/5 text-neutral-700 font-[middle]">
                                    {step.timeframe}
                                </span>
                            </div>
                            <h3 className="font-[main] text-xs sm:text-sm font-bold uppercase tracking-tight text-[#111111]">
                                {step.stage}
                            </h3>
                            <p className="font-[middle] text-xs text-neutral-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                        <div className="pt-3 border-t border-black/5">
                            <span className="text-[9px] uppercase tracking-wider font-bold text-neutral-400 font-[middle] block">
                                Output:
                            </span>
                            <span className="text-[10px] font-[middle] font-semibold text-neutral-800 block mt-0.5">
                                {step.deliverable}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center pt-4">
                <Link
                    href="/manufacturing-process"
                    className="inline-flex items-center gap-2 text-xs font-[middle] font-bold uppercase tracking-[0.25em] text-black hover:underline underline-offset-4"
                >
                    <span>Read Full Manufacturing Process & QA Protocols</span>
                    <span>→</span>
                </Link>
            </div>
        </section>
    );
}
