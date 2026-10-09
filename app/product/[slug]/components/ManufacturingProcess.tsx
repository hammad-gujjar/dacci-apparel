'use client';

import React from 'react';
import Heading from '@/app/components/Heading';
import {
    IoDocumentTextOutline,
    IoColorFilterOutline,
    IoCutOutline,
    IoCogOutline,
    IoCheckmarkDoneCircleOutline,
    IoAirplaneOutline
} from 'react-icons/io5';

const steps = [
    {
        number: '01',
        icon: IoDocumentTextOutline,
        title: 'Design Review',
        subtitle: 'Tech Pack Consultation',
        description: 'Comprehensive review of your design sketches, measurement charts, and vector artwork. Our technical team confirms construction methods and finishes.'
    },
    {
        number: '02',
        icon: IoColorFilterOutline,
        title: 'Fabric Selection',
        subtitle: 'Sourcing & Lab Dips',
        description: 'Selection of performance textiles, custom GSM weights, and Pantone color lab dips. All fabrics are pre-tested for shrinkage, stretch, and colorfastness.'
    },
    {
        number: '03',
        icon: IoCutOutline,
        title: 'Pattern Development',
        subtitle: 'Grading & Prototyping',
        description: 'Master pattern drafting with digital grading from XS through 5XL. Physical samples are manufactured within 7–14 days for your fit and quality approval.'
    },
    {
        number: '04',
        icon: IoCogOutline,
        title: 'Production',
        subtitle: 'Precision Cut & Sew',
        description: 'Bulk manufacturing launched with automated fabric cutters, specialized flatlock stitching machines, high-speed sublimation, and high-density embroidery.'
    },
    {
        number: '05',
        icon: IoCheckmarkDoneCircleOutline,
        title: 'Quality Inspection',
        subtitle: 'AQL 2.5 Verification',
        description: '100% inline and end-of-line audits. Each piece undergoes seam tensile tests, dimensional measurement checks, and needle detection.'
    },
    {
        number: '06',
        icon: IoAirplaneOutline,
        title: 'Global Shipping',
        subtitle: 'Door-to-Door Logistics',
        description: 'Custom private label packaging, branded polybags, export cartons, and priority worldwide air freight delivery with real-time tracking via DHL & FedEx.'
    }
];

const ManufacturingProcess = () => {
    return (
        <section className="mt-20 py-16 border-t border-black/10 scroll-reveal">
            <div className="flex flex-col gap-4 mb-14">
                <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-black/40">
                    OEM Production Workflow
                </span>
                <Heading title="From Design To Delivery" className="text-left" />
                <p className="text-black/60 max-w-2xl text-sm md:text-base leading-relaxed">
                    Our streamlined 6-stage manufacturing protocol guarantees consistent international export quality, rapid turnaround times, and complete transparency from initial concept to your doorstep.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {steps.map((step, idx) => {
                    const IconComponent = step.icon;
                    return (
                        <div
                            key={step.number}
                            className="p-8 rounded-2xl bg-white/40 border border-black/10 backdrop-blur-sm flex flex-col justify-between hover:border-black/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 relative group overflow-hidden"
                        >
                            {/* Watermark Step Number */}
                            <span className="absolute -top-4 -right-2 text-7xl font-bold text-black/[0.04] select-none pointer-events-none group-hover:text-black/[0.08] transition-colors duration-500">
                                {step.number}
                            </span>

                            <div className="flex flex-col gap-5 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div className="size-12 rounded-xl bg-black text-white flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent />
                                    </div>
                                    <span className="text-[11px] font-bold tracking-widest text-black/40">
                                        STAGE {step.number}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <h3 className="text-xl font-bold tracking-tight text-black">
                                        {step.title}
                                    </h3>
                                    <span className="text-xs uppercase tracking-wider font-semibold text-black/40">
                                        {step.subtitle}
                                    </span>
                                </div>

                                <p className="text-sm text-black/70 leading-relaxed pt-2 border-t border-black/5">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ManufacturingProcess;
