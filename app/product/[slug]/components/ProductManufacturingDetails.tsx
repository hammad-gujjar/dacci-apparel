'use client';

import React from 'react';
import Heading from '@/app/components/Heading';
import { IoShirtOutline, IoColorPaletteOutline, IoLayersOutline } from 'react-icons/io5';

const manufacturingCards = [
    {
        icon: IoShirtOutline,
        title: 'Fabric Options',
        subtitle: 'Engineered Technical Textiles',
        primaryTags: ['Polyester', 'Cotton Blend', 'Performance Fabric'],
        secondaryTags: ['4-Way Stretch', 'Moisture-Wicking', 'Anti-Pilling', 'GSM 160–320g'],
        description: 'Certified technical knits and blends engineered for athletic durability, breathability, and thermal regulation. Custom weights, colors, and lab-dips available to your exact Pantone specs.'
    },
    {
        icon: IoColorPaletteOutline,
        title: 'Customization',
        subtitle: 'Precision Branding & Finishes',
        primaryTags: ['Sublimation', 'Embroidery', 'Screen Printing', 'Heat Transfer'],
        secondaryTags: ['High-Density 3D', 'Silicone Badges', 'Reflective Prints', 'Woven Labels'],
        description: 'Multi-technique application with all-over digital sublimation, needle-dense 3D embroidery, soft-hand discharge inks, and precision silicone heat-press transfers.'
    },
    {
        icon: IoLayersOutline,
        title: 'Production',
        subtitle: 'Full-Scale OEM / ODM Scalability',
        primaryTags: ['OEM', 'ODM', 'Private Label'],
        secondaryTags: ['Low 30 MOQ', 'Tech Pack Support', 'Custom Packaging', 'Barcode & Polybag'],
        description: 'End-to-end bespoke garment development with rapid sample creation, flexible 30-piece minimum order quantities, strict AQL quality audits, and custom branded packaging.'
    }
];

const ProductManufacturingDetails = () => {
    return (
        <section className="mt-20 py-16 border-t border-black/10 scroll-reveal">
            <div className="flex flex-col gap-4 mb-12">
                <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-black/40">
                    Technical Specifications
                </span>
                <Heading as="h2" title="Product Manufacturing Details" className="text-left" />
                <p className="text-black/60 max-w-2xl text-sm md:text-base leading-relaxed">
                    Custom apparel manufacturing tailored to your exact brand specifications. From fiber selection to private label packaging, every step is executed with precision craftsmanship.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {manufacturingCards.map((card, idx) => {
                    const IconComponent = card.icon;
                    return (
                        <div
                            key={idx}
                            className="p-8 rounded-2xl bg-white/40 border border-black/10 backdrop-blur-sm flex flex-col justify-between hover:border-black/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 group"
                        >
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <div className="size-12 rounded-xl bg-black text-white flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-black/30">
                                        Spec 0{idx + 1}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black">
                                        {card.title}
                                    </h3>
                                    <span className="text-xs uppercase tracking-wider font-semibold text-black/40">
                                        {card.subtitle}
                                    </span>
                                </div>

                                {/* Primary Required Tags */}
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {card.primaryTags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1.5 bg-black text-[#EDEEE7] text-[10px] uppercase tracking-[0.2em] font-bold rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Secondary Specs */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {card.secondaryTags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-1 bg-black/5 text-black/70 text-[9px] uppercase tracking-wider font-medium rounded-full border border-black/5"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-sm text-black/70 leading-relaxed pt-2 border-t border-black/5">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ProductManufacturingDetails;
