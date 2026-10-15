'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heading from '../components/Heading';
import TransitionButton from '../components/TransitionButton';
import { useLoader } from '../context/LoaderContext';

gsap.registerPlugin(ScrollTrigger);

// ─── Timeline Steps Data ────────────────────────────────────────────────────────
interface TimelineStage {
    number: string;
    phase: string;
    title: string;
    description: string;
    specs: string[];
    image: string;
    imageAlt: string;
}

const SEVEN_STAGES: TimelineStage[] = [
    {
        number: '01',
        phase: 'Stage 01',
        title: 'Tech Pack Audit',
        description:
            'Review designs, measurements, materials and production requirements to create an accurate manufacturing roadmap.',
        specs: [
            'Design & Measurement Audit',
            'Bill of Materials (BOM)',
            'Grading Specifications',
            'Production Roadmap'
        ],
        image: '/images/our-manufacturing-process/tech-pack-audit-technical-apparel-blueprint.webp',
        imageAlt: 'Tech pack audit and technical apparel blueprint for sportswear manufacturing'
    },
    {
        number: '02',
        phase: 'Stage 02',
        title: 'Fabric Sourcing',
        description:
            'Select performance fabrics, colors and materials based on comfort, durability and brand requirements.',
        specs: [
            'Performance Knit Selection',
            'Custom GSM & Composition',
            'Colorfastness Testing',
            'Moisture-Wicking & Stretch'
        ],
        image: '/images/our-manufacturing-process/fabric-sourcing-sportswear.webp',
        imageAlt: 'Fabric sourcing for custom sportswear manufacturing'
    },
    {
        number: '03',
        phase: 'Stage 03',
        title: '7-14D Prototyping',
        description:
            'Develop physical samples quickly for fitting, quality review and production approval.',
        specs: [
            'Rapid Physical Sample',
            'Ergonomic Fit Review',
            'Athlete Mobility Check',
            'Production Approval Gate'
        ],
        image: '/images/our-manufacturing-process/7-14-day-prototyping-sportswear.webp',
        imageAlt: '7 to 14 day sportswear prototyping and sample development'
    },
    {
        number: '04',
        phase: 'Stage 04',
        title: 'Laser Cutting',
        description:
            'Precision cutting technology ensures consistent patterns and accurate garment construction.',
        specs: [
            'Automated Laser Cutting',
            'Micro-Millimeter Accuracy',
            'Pattern Consistency',
            'Precision Assembly'
        ],
        image: '/images/our-manufacturing-process/laser-cutting-sportswear.webp',
        imageAlt: 'Precision laser cutting for custom sportswear production'
    },
    {
        number: '05',
        phase: 'Stage 05',
        title: 'Sublimation & Embroidery',
        description:
            'Apply custom branding with advanced printing and embroidery techniques.',
        specs: [
            'All-Over Sublimation',
            'High-Density Silicone Prints',
            '3D Puff Embroidery',
            'Wash Durability Tested'
        ],
        image: '/images/our-manufacturing-process/sublimation-embroidery-sportswear.webp',
        imageAlt: 'Sublimation and embroidery for custom sportswear'
    },
    {
        number: '06',
        phase: 'Stage 06',
        title: 'AQL 2.5 QC',
        description:
            'Multi-stage quality inspection ensures every product meets international standards.',
        specs: [
            'Multi-Stage AQL 2.5 Audit',
            'Seam Pull Stress Testing',
            'Dimensional Tolerance Check',
            'Private Label Finishing'
        ],
        image: '/images/our-manufacturing-process/aql-2-5-quality-inspection-garment-finishing.webp',
        imageAlt: 'AQL 2.5 quality inspection and garment finishing'
    },
    {
        number: '07',
        phase: 'Stage 07',
        title: 'Worldwide Freight',
        description:
            'Secure packaging and global shipping solutions through trusted logistics partners.',
        specs: [
            'Custom Branded Packaging',
            'Barcoded SKU Sorting',
            'Express Air Logistics',
            'Global Freight Tracking'
        ],
        image: '/images/our-manufacturing-process/worldwide-sportswear-freight.webp',
        imageAlt: 'Worldwide freight and shipping for sportswear manufacturing'
    }
];

// ─── Credibility Statistics Data ────────────────────────────────────────────────
const STATS_ITEMS = [
    {
        target: '5000+',
        title: 'Monthly Production Capacity',
        description: 'Scalable OEM bulk production lines'
    },
    {
        target: '50',
        title: 'Pieces MOQ Starting',
        description: 'Low-risk launches for emerging brands'
    },
    {
        target: '7-14',
        title: 'Days Sample Turnaround',
        description: 'Rapid prototyping & physical review'
    },
    {
        target: 'Worldwide',
        title: 'Shipping Logistics',
        description: 'Door-to-door express via DHL & FedEx'
    }
];

const ManufacturingProcessClient = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef1 = useRef<HTMLSpanElement>(null);
    const counterRef2 = useRef<HTMLSpanElement>(null);
    const counterRef3 = useRef<HTMLSpanElement>(null);
    const counterRef4 = useRef<HTMLSpanElement>(null);
    const { isLoading } = useLoader();

    useGSAP(() => {
        if (isLoading) return;

        const container = containerRef.current;
        if (!container) return;

        // 1. Hero text fade up
        gsap.fromTo(
            '.process-hero-fade',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.15
            }
        );

        // 2. Stats Section Reveal & Counter Animation (Matching CompanyStats)
        const statsGrid = container.querySelector('.process-stats-grid');
        if (statsGrid) {
            gsap.fromTo(
                '.process-stat-card',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: statsGrid,
                        start: 'top 85%',
                        once: true,
                        onEnter: () => {
                            // Counter 1: 5000+ (start 0, end 5000, duration 3.5s)
                            const c1 = counterRef1.current;
                            if (c1) {
                                const obj1 = { val: 0 };
                                gsap.to(obj1, {
                                    val: 5000,
                                    duration: 3.5,
                                    ease: 'power1.out',
                                    onUpdate: () => {
                                        c1.innerText = `${Math.floor(obj1.val)}+`;
                                    }
                                });
                            }

                            // Counter 2: 50 (start 0, end 50, duration 2.5s)
                            const c2 = counterRef2.current;
                            if (c2) {
                                const obj2 = { val: 0 };
                                gsap.to(obj2, {
                                    val: 50,
                                    duration: 2.5,
                                    ease: 'power1.out',
                                    onUpdate: () => {
                                        c2.innerText = `${Math.floor(obj2.val)}`;
                                    }
                                });
                            }

                            // Counter 3: 7-14 (duration 2.5s, smooth transition)
                            const c3 = counterRef3.current;
                            if (c3) {
                                const obj3 = { min: 1, max: 1 };
                                gsap.to(obj3, {
                                    min: 7,
                                    max: 14,
                                    duration: 2.5,
                                    ease: 'power1.out',
                                    onUpdate: () => {
                                        c3.innerText = `${Math.floor(obj3.min)}-${Math.floor(obj3.max)}`;
                                    }
                                });
                            }

                            // Counter 4: Worldwide (fade and reveal, duration 2.5s)
                            const c4 = counterRef4.current;
                            if (c4) {
                                gsap.fromTo(
                                    c4,
                                    { opacity: 0, y: 20 },
                                    { opacity: 1, y: 0, duration: 2.5, ease: 'power2.out' }
                                );
                            }
                        }
                    }
                }
            );
        }

        // 3. Seven Stages Slide Animations: Left cards slide from left, Right cards slide from right with 0.15s stagger
        const rows = gsap.utils.toArray('.timeline-stage-row') as HTMLElement[];
        const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
        const xDistance = isDesktop ? 80 : 35;

        rows.forEach((row) => {
            const leftCard = row.querySelector('.timeline-left-card');
            const rightCard = row.querySelector('.timeline-right-card');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: 'top 82%',
                    toggleActions: 'play none none reverse'
                }
            });

            if (leftCard && rightCard) {
                tl.fromTo(
                    leftCard,
                    { x: -xDistance, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
                ).fromTo(
                    rightCard,
                    { x: xDistance, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
                    '-=0.85' // 0.15s stagger offset
                );
            }
        });

        // 4. CTA Section Reveal
        gsap.fromTo(
            '.process-cta-box',
            { y: 50, opacity: 0, scale: 0.98 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.process-cta-box',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { dependencies: [isLoading], scope: containerRef });

    return (
        <main ref={containerRef} className="w-full bg-[#EDEEE7] text-[#111111] overflow-x-hidden pt-28 md:pt-36 pb-20">
            {/* ── 1. HERO SECTION ───────────────────────────────────────────────── */}
            <section className="px-5 md:px-10 max-w-7xl mx-auto flex flex-col items-center text-center">
                {/* Section Badge */}
                <div className="process-hero-fade inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 mb-6">
                    <span className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-800">
                        OEM & ODM Sportswear Production
                    </span>
                </div>

                {/* Animated Heading (character stagger) */}
                <div className="w-full flex justify-center mb-6">
                    <Heading
                        as="h1"
                        title="Private Label Clothing Manufacturer"
                        className="justify-center text-center text-3xl sm:text-5xl md:text-7xl font-[main] tracking-tight uppercase"
                    />
                </div>

                {/* Description */}
                <p className="process-hero-fade max-w-3xl text-base sm:text-lg md:text-xl font-[middle] text-neutral-800 leading-relaxed font-normal">
                    From initial concept to final delivery, explore our full-scale sportswear production process engineered for private label brands and custom apparel manufacturing.
                </p>

                {/* Quick Process Roadmap Badges */}
                <div className="process-hero-fade flex flex-wrap justify-center items-center gap-2 md:gap-3 mt-8 max-w-4xl">
                    {SEVEN_STAGES.map((step, idx) => (
                        <span
                            key={idx}
                            className="text-[10px] md:text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/60 border border-black/10 backdrop-blur-sm text-neutral-700 tabular-nums font-[middle]"
                        >
                            {step.number}. {step.title}
                        </span>
                    ))}
                </div>
            </section>

            {/* ── 2. MANUFACTURING CREDIBILITY STATS (Aligned with CompanyStats) ── */}
            <section className="px-5 md:px-10 max-w-7xl mx-auto mt-14 md:mt-20">
                <div className="bg-white/40 border border-neutral-900/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-sm">
                    <div className="process-stats-grid grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 items-center md:items-start">
                        {/* 1. 5000+ */}
                        <div className="process-stat-card flex flex-col items-center text-center space-y-3">
                            <div className="relative flex items-center justify-center min-h-[60px]">
                                <h2 className="stat-value text-4xl sm:text-5xl md:text-6xl font-light !font-[middle] tracking-tight text-[#111111] tabular-nums">
                                    <span ref={counterRef1}>5000+</span>
                                </h2>
                            </div>
                            <div className="w-12 h-[1px] bg-black/10 rounded-full" />
                            <p className="uppercase text-xs md:text-sm font-semibold tracking-wider text-neutral-900 font-[middle]">
                                {STATS_ITEMS[0].title}
                            </p>
                            <p className="text-xs text-neutral-600 font-[middle] max-w-[220px] leading-relaxed">
                                {STATS_ITEMS[0].description}
                            </p>
                        </div>

                        {/* 2. 50 */}
                        <div className="process-stat-card flex flex-col items-center text-center space-y-3">
                            <div className="relative flex items-center justify-center min-h-[60px]">
                                <h2 className="stat-value text-4xl sm:text-5xl md:text-6xl font-light !font-[middle] tracking-tight text-[#111111] tabular-nums">
                                    <span ref={counterRef2}>50</span>
                                </h2>
                            </div>
                            <div className="w-12 h-[1px] bg-black/10 rounded-full" />
                            <p className="uppercase text-xs md:text-sm font-semibold tracking-wider text-neutral-900 font-[middle]">
                                {STATS_ITEMS[1].title}
                            </p>
                            <p className="text-xs text-neutral-600 font-[middle] max-w-[220px] leading-relaxed">
                                {STATS_ITEMS[1].description}
                            </p>
                        </div>

                        {/* 3. 7-14 */}
                        <div className="process-stat-card flex flex-col items-center text-center space-y-3">
                            <div className="relative flex items-center justify-center min-h-[60px]">
                                <h2 className="stat-value text-4xl sm:text-5xl md:text-6xl font-light !font-[middle] tracking-tight text-[#111111] tabular-nums">
                                    <span ref={counterRef3}>7-14</span>
                                </h2>
                            </div>
                            <div className="w-12 h-[1px] bg-black/10 rounded-full" />
                            <p className="uppercase text-xs md:text-sm font-semibold tracking-wider text-neutral-900 font-[middle]">
                                {STATS_ITEMS[2].title}
                            </p>
                            <p className="text-xs text-neutral-600 font-[middle] max-w-[220px] leading-relaxed">
                                {STATS_ITEMS[2].description}
                            </p>
                        </div>

                        {/* 4. Worldwide */}
                        <div className="process-stat-card flex flex-col items-center text-center space-y-3">
                            <div className="relative flex items-center justify-center min-h-[60px]">
                                <h2 className="stat-value text-4xl sm:text-5xl md:text-6xl font-light !font-[middle] tracking-tight text-[#111111]">
                                    <span ref={counterRef4}>Worldwide</span>
                                </h2>
                            </div>
                            <div className="w-12 h-[1px] bg-black/10 rounded-full" />
                            <p className="uppercase text-xs md:text-sm font-semibold tracking-wider text-neutral-900 font-[middle]">
                                {STATS_ITEMS[3].title}
                            </p>
                            <p className="text-xs text-neutral-600 font-[middle] max-w-[220px] leading-relaxed">
                                {STATS_ITEMS[3].description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. SEVEN STAGES OF PRECISION CRAFTSMANSHIP (Premium Dark Section) ─ */}
            <section className="w-full bg-[#111111] text-[#EDEEE7] py-20 md:py-28 mt-20 md:mt-28 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 md:px-10">
                    {/* Section Header */}
                    <div className="flex flex-col items-center text-center mb-16 md:mb-24">
                        <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/50 mb-3 block">
                            Structured Manufacturing Roadmap
                        </span>
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-[main] uppercase tracking-tight text-[#FFFFFF]">
                            Seven Stages Of Precision Craftsmanship
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm md:text-base font-[middle] text-[#EDEEE7]/80">
                            Every collection is engineered with strict quality gates at each step, ensuring consistency, high performance, and rapid delivery for every order.
                        </p>
                    </div>

                    {/* Timeline Container with center spine line on desktop */}
                    <div className="relative">
                        {/* Center Spine Line (Desktop) */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/15 -translate-x-1/2 pointer-events-none" />

                        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
                            {SEVEN_STAGES.map((step, index) => {
                                const isEven = index % 2 === 0;

                                // Content Card JSX (Premium Dark Styling with matched height)
                                const ContentCard = (
                                    <div className="h-full min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex flex-col justify-between bg-[#181818]/90 border border-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 hover:border-white/25 transition-all duration-300 shadow-xl">
                                        <div>
                                            {/* Phase & Tabular Number Header */}
                                            <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full bg-white text-[#111111]">
                                                        {step.phase}
                                                    </span>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                                                        Stage {step.number}
                                                    </span>
                                                </div>
                                                {/* Mobile tabular number indicator */}
                                                <span className="lg:hidden text-lg font-bold font-[middle] tabular-nums text-[#FFFFFF]">
                                                    {step.number}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl sm:text-2xl md:text-3xl font-[main] uppercase tracking-tight text-[#FFFFFF] mb-4">
                                                {step.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm md:text-base font-[middle] text-[#EDEEE7] leading-relaxed mb-6 font-normal">
                                                {step.description}
                                            </p>
                                        </div>

                                        {/* Deliverables / Specifications List */}
                                        <div className="mt-4">
                                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 block mb-3">
                                                Technical Deliverables
                                            </span>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {step.specs.map((spec, sIdx) => (
                                                    <div
                                                        key={sIdx}
                                                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[#EDEEE7] text-xs font-medium"
                                                    >
                                                        <span className="size-1.5 rounded-full bg-white/80 shrink-0" />
                                                        <span className="truncate">{spec}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );

                                // Image Card JSX (Equal height matched with detail card)
                                const ImageCard = (
                                    <div className="group relative w-full h-full min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-neutral-900 flex flex-col">
                                        <Image
                                            src={step.image}
                                            alt={step.imageAlt}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        {/* Inner Gradient & Step Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 pointer-events-none" />
                                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[#FFFFFF] pointer-events-none z-10">
                                            <div className="max-w-[80%]">
                                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#EDEEE7]/80 block">
                                                    Stage {step.number}
                                                </span>
                                                <span className="text-sm font-semibold uppercase tracking-wider truncate block text-[#FFFFFF]">
                                                    {step.title}
                                                </span>
                                            </div>
                                            {/* Tabular numeric rendering */}
                                            <span className="text-2xl font-[middle] tabular-nums font-semibold text-[#FFFFFF] opacity-80">
                                                {step.number}
                                            </span>
                                        </div>
                                    </div>
                                );

                                return (
                                    <div
                                        key={step.number}
                                        className="timeline-stage-row relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch"
                                    >
                                        {/* Desktop Center Step Node Marker */}
                                        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111111] border border-white/20 items-center justify-center z-10 shadow-lg">
                                            <span className="text-xs font-bold font-[middle] tabular-nums text-[#FFFFFF]">
                                                {step.number}
                                            </span>
                                        </div>

                                        {/* Left Card: slides from left */}
                                        <div className={`timeline-left-card flex flex-col h-full ${isEven ? 'order-1 lg:order-1' : 'order-2 lg:order-1'}`}>
                                            {isEven ? ContentCard : ImageCard}
                                        </div>

                                        {/* Right Card: slides from right */}
                                        <div className={`timeline-right-card flex flex-col w-full h-full ${isEven ? 'order-2 lg:order-2' : 'order-1 lg:order-2'}`}>
                                            {isEven ? ImageCard : ContentCard}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. CALL TO ACTION (CTA) SECTION ──────────────────────────────── */}
            <section className="px-5 md:px-10 max-w-5xl mx-auto mt-24 md:mt-32">
                <div className="process-cta-box bg-[#111111] text-[#EDEEE7] rounded-3xl p-8 sm:p-12 md:p-16 text-center flex flex-col items-center relative overflow-hidden shadow-xl">
                    {/* Background Decorative Pattern */}
                    <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#EDEEE7_1px,transparent_1px)] [background-size:24px_24px]" />

                    {/* Small Badge */}
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6 text-neutral-300">
                        Start Production
                    </span>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-[main] uppercase tracking-tight text-[#EDEEE7] max-w-3xl mb-4">
                        Ready To Engineer Your Next Apparel Collection?
                    </h2>

                    {/* Description */}
                    <p className="max-w-2xl text-sm sm:text-base font-[middle] text-[#EDEEE7]/70 leading-relaxed mb-8">
                        Have a product idea or ready design? Our manufacturing team helps global brands transform concepts into premium sportswear collections through reliable OEM and private label production.
                    </p>

                    {/* Symmetrical, Wide, Non-Wrapping CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-2xl mx-auto">
                        <TransitionButton
                            text="Start Your Custom Project"
                            url="/contact#teckpack"
                            className="w-full sm:w-auto min-w-[280px] sm:min-w-[310px] inline-flex flex-row items-center justify-center gap-3 whitespace-nowrap bg-[#EDEEE7] !text-[#111111] font-semibold px-9 py-4.5 !rounded-full shadow-lg shrink-0 cursor-pointer text-sm md:text-base"
                            arrow
                            rollingText
                        />
                        <TransitionButton
                            text="Explore Catalog"
                            url="/shop"
                            className="w-full sm:w-auto min-w-[240px] sm:min-w-[270px] inline-flex flex-row items-center justify-center gap-3 whitespace-nowrap bg-white/10 border border-white/20 !text-[#EDEEE7] font-semibold px-9 py-4.5 !rounded-full hover:bg-white/20 shrink-0 cursor-pointer text-sm md:text-base"
                            arrow
                            rollingText
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ManufacturingProcessClient;
