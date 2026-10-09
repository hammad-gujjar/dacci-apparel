'use client';

import React, { useState } from 'react';
import Heading from '@/app/components/Heading';
import { 
    IoInformationCircleOutline, 
    IoBrushOutline, 
    IoShieldCheckmarkOutline, 
    IoBusinessOutline, 
    IoHelpCircleOutline,
    IoChevronDown
} from 'react-icons/io5';

interface ProductContentStructureProps {
    product: any;
}

const ProductContentStructure = ({ product }: ProductContentStructureProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const tabs = [
        {
            id: 'overview',
            label: 'Product Overview',
            icon: IoInformationCircleOutline
        },
        {
            id: 'customization',
            label: 'Customization Options',
            icon: IoBrushOutline
        },
        {
            id: 'why-choose',
            label: 'Why Choose This Product',
            icon: IoShieldCheckmarkOutline
        },
        {
            id: 'capability',
            label: 'Manufacturing Capability',
            icon: IoBusinessOutline
        },
        {
            id: 'faq',
            label: 'FAQ',
            icon: IoHelpCircleOutline
        }
    ];

    const faqs = [
        {
            q: 'What is the Minimum Order Quantity (MOQ)?',
            a: 'Our standard production minimum is 50 pieces per style/design. You can split this quantity across standard size gradings (XS through 5XL).'
        },
        {
            q: 'How fast can you produce and deliver samples?',
            a: 'Pre-production prototypes and fit samples are manufactured within 7 to 14 business days upon technical approval of your design and tech pack.'
        },
        {
            q: 'Can you work from rough sketches, mockups, or reference garments?',
            a: 'Yes. Our technical pattern team can translate digital mockups, rough concept sketches, or physical reference samples into production-ready CAD patterns and tech packs.'
        },
        {
            q: 'What private label branding options do you offer?',
            a: 'We provide full private label finishing: custom woven or heat-press neck labels, printed care tags, barcode hangtags, branded drawstrings, and custom-printed polybags.'
        },
        {
            q: 'What international shipping methods do you support?',
            a: 'We partner with DHL Express and FedEx for worldwide door-to-door air freight (typically 3–5 business days transit) and manage sea freight for large-scale container orders.'
        }
    ];

    return (
        <section className="mt-20 py-16 border-t border-black/10 scroll-reveal">
            <div className="flex flex-col gap-4 mb-10">
                <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-black/40">
                    B2B Client Information
                </span>
                <Heading title="Manufacturing Specifications & FAQ" className="text-left" />
            </div>

            {/* Desktop Tabs / Mobile Scroll Header */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-black/10">
                {tabs.map((tab, idx) => {
                    const IconComponent = tab.icon;
                    const isActive = activeTab === idx;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(idx)}
                            className={`flex items-center gap-2.5 px-6 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold whitespace-nowrap transition-all duration-300 cursor-pointer active:scale-[0.97] ${
                                isActive
                                    ? 'bg-black text-[#EDEEE7] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.25)]'
                                    : 'bg-white/40 text-black/60 hover:text-black hover:bg-white/70 border border-black/5'
                            }`}
                        >
                            <IconComponent className="text-base" />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Tab Contents Area */}
            <div className="mt-8">
                {/* 1. Product Overview */}
                {activeTab === 0 && (
                    <div className="p-8 md:p-12 bg-white/40 border border-black/10 rounded-2xl backdrop-blur-sm flex flex-col gap-8 animate-fadeIn">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl font-bold tracking-tight text-black">
                                Production & Garment Overview
                            </h3>
                            <p className="text-black/80 text-base leading-relaxed max-w-3xl">
                                {product.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-black/10">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-black/40">Ideal For</span>
                                <p className="text-sm font-semibold text-black">
                                    Sportswear Brands, Athletic Teams, Fitness Clubs & Premium Private Labels
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-black/40">Construction</span>
                                <p className="text-sm font-semibold text-black">
                                    Reinforced Seaming, High-Elastic Thread & Ergonomic Paneling
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-black/40">Sizing Range</span>
                                <p className="text-sm font-semibold text-black">
                                    Standard Adult Unisex (XS–5XL) & Youth / Female Grading Available
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-black/40">Origin</span>
                                <p className="text-sm font-semibold text-black">
                                    Precision In-House Manufacturing with Direct Export Worldwide
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. Customization Options */}
                {activeTab === 1 && (
                    <div className="p-8 md:p-12 bg-white/40 border border-black/10 rounded-2xl backdrop-blur-sm flex flex-col gap-8 animate-fadeIn">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-2xl font-bold tracking-tight text-black">
                                Customization Techniques & Finishes
                            </h3>
                            <p className="text-black/70 text-sm md:text-base leading-relaxed max-w-3xl">
                                Tailored to match your brand identity with state-of-the-art decoration machinery and precision color management.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                            <div className="p-6 bg-white/60 rounded-xl border border-black/5 flex flex-col gap-3">
                                <span className="text-xs uppercase tracking-widest font-bold text-black/40">Printing</span>
                                <h4 className="text-lg font-bold text-black">Sublimation & Screen Print</h4>
                                <p className="text-sm text-black/70 leading-relaxed">
                                    Zero-fade all-over digital sublimation printing for vibrant jerseys, alongside eco-friendly water-based and plastisol screen prints.
                                </p>
                            </div>
                            <div className="p-6 bg-white/60 rounded-xl border border-black/5 flex flex-col gap-3">
                                <span className="text-xs uppercase tracking-widest font-bold text-black/40">Embellishment</span>
                                <h4 className="text-lg font-bold text-black">3D Embroidery & Silicone</h4>
                                <p className="text-sm text-black/70 leading-relaxed">
                                    High-density 3D puff embroidery, woven patches, tactile matte silicone heat seals, and reflective safety accents.
                                </p>
                            </div>
                            <div className="p-6 bg-white/60 rounded-xl border border-black/5 flex flex-col gap-3">
                                <span className="text-xs uppercase tracking-widest font-bold text-black/40">Packaging</span>
                                <h4 className="text-lg font-bold text-black">Private Label & Packaging</h4>
                                <p className="text-sm text-black/70 leading-relaxed">
                                    Custom woven main labels, printed satin care tags, barcode stickers, bespoke swing hangtags, and custom frosted polybags.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Why Choose This Product */}
                {activeTab === 2 && (
                    <div className="p-8 md:p-12 bg-white/40 border border-black/10 rounded-2xl backdrop-blur-sm flex flex-col gap-8 animate-fadeIn">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-2xl font-bold tracking-tight text-black">
                                Why Brands Choose Our Manufacturing
                            </h3>
                            <p className="text-black/70 text-sm md:text-base leading-relaxed max-w-3xl">
                                Built for longevity, comfort, and commercial retail appeal. Every run meets rigorous international apparel standards.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="p-6 bg-white/60 rounded-xl border border-black/5 flex flex-col gap-2">
                                <span className="text-xs uppercase tracking-widest font-bold text-black/40">Performance Grade</span>
                                <h4 className="text-lg font-bold text-black">Commercial-Grade Durability</h4>
                                <p className="text-sm text-black/70 leading-relaxed">
                                    Engineered with high tensile-strength stitching and pre-shrunk fabrics designed to endure repetitive athletic strain and industrial wash cycles.
                                </p>
                            </div>
                            <div className="p-6 bg-white/60 rounded-xl border border-black/5 flex flex-col gap-2">
                                <span className="text-xs uppercase tracking-widest font-bold text-black/40">Fit Perfection</span>
                                <h4 className="text-lg font-bold text-black">Ergonomic Athletic Cut</h4>
                                <p className="text-sm text-black/70 leading-relaxed">
                                    CAD-calibrated grading provides full mobility and premium fit across all body types, eliminating bunching and chafing.
                                </p>
                            </div>
                            <div className="p-6 bg-white/60 rounded-xl border border-black/5 flex flex-col gap-2">
                                <span className="text-xs uppercase tracking-widest font-bold text-black/40">Responsible Sourcing</span>
                                <h4 className="text-lg font-bold text-black">Certified Non-Toxic Chemistry</h4>
                                <p className="text-sm text-black/70 leading-relaxed">
                                    We utilize certified eco-friendly dyes and skin-safe inks adhering to OEKO-TEX and international consumer safety compliance.
                                </p>
                            </div>
                            <div className="p-6 bg-white/60 rounded-xl border border-black/5 flex flex-col gap-2">
                                <span className="text-xs uppercase tracking-widest font-bold text-black/40">B2B Scalability</span>
                                <h4 className="text-lg font-bold text-black">Smooth Growth Path</h4>
                                <p className="text-sm text-black/70 leading-relaxed">
                                    Start with 50 pieces to test a new launch, and scale up seamlessly to 5,000+ pieces with volume price advantages and dedicated production lines.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. Manufacturing Capability */}
                {activeTab === 3 && (
                    <div className="p-8 md:p-12 bg-white/40 border border-black/10 rounded-2xl backdrop-blur-sm flex flex-col gap-8 animate-fadeIn">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-2xl font-bold tracking-tight text-black">
                                Production Capacity & Logistics
                            </h3>
                            <p className="text-black/70 text-sm md:text-base leading-relaxed max-w-3xl">
                                Equipped with modern sewing machinery, automatic cutting tables, and integrated finishing lines.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                            <div className="p-6 bg-white/60 rounded-xl border border-black/5 flex flex-col gap-1">
                                <span className="text-3xl md:text-4xl font-bold text-black">5000+</span>
                                <span className="text-xs uppercase tracking-wider font-semibold text-black/50">Monthly Capacity</span>
                            </div>
                            <div className="p-6 bg-white/60 rounded-xl border border-black/5 flex flex-col gap-1">
                                <span className="text-3xl md:text-4xl font-bold text-black">50 Pcs</span>
                                <span className="text-xs uppercase tracking-wider font-semibold text-black/50">Flexible Low MOQ</span>
                            </div>
                            <div className="p-6 bg-white/60 rounded-xl border border-black/5 flex flex-col gap-1">
                                <span className="text-3xl md:text-4xl font-bold text-black">7–14 Days</span>
                                <span className="text-xs uppercase tracking-wider font-semibold text-black/50">Sample Turnaround</span>
                            </div>
                            <div className="p-6 bg-white/60 rounded-xl border border-black/5 flex flex-col gap-1">
                                <span className="text-3xl md:text-4xl font-bold text-black">Worldwide</span>
                                <span className="text-xs uppercase tracking-wider font-semibold text-black/50">Tracked Logistics</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* 5. FAQ */}
                {activeTab === 4 && (
                    <div className="p-8 md:p-12 bg-white/40 border border-black/10 rounded-2xl backdrop-blur-sm flex flex-col gap-6 animate-fadeIn">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-2xl font-bold tracking-tight text-black">
                                Frequently Asked Questions
                            </h3>
                            <p className="text-black/70 text-sm md:text-base leading-relaxed max-w-3xl">
                                Everything you need to know about partnering with us for custom sportswear production.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                            {faqs.map((faq, idx) => {
                                const isOpen = openFaq === idx;
                                return (
                                    <div
                                        key={idx}
                                        className="border border-black/10 rounded-xl overflow-hidden bg-white/60 transition-colors"
                                    >
                                        <button
                                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                                            className="w-full flex items-center justify-between p-5 text-left font-bold text-sm md:text-base text-black cursor-pointer hover:bg-black/5 transition-colors"
                                        >
                                            <span>{faq.q}</span>
                                            <IoChevronDown
                                                className={`text-lg transition-transform duration-300 ${
                                                    isOpen ? 'rotate-180 text-black' : 'text-black/40'
                                                }`}
                                            />
                                        </button>
                                        {isOpen && (
                                            <div className="px-5 pb-5 text-sm text-black/70 leading-relaxed border-t border-black/5 pt-3">
                                                {faq.a}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductContentStructure;
