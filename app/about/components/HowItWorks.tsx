'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heading from '../../components/Heading';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        title: 'Submit Tech Pack',
        description: 'Provide your design specifications, materials, and sizing details. Our team will review and ensure everything is ready for sampling.',
        image: 'https://i.pinimg.com/736x/ab/5c/04/ab5c048111b26580dc804d40013f2d9f.jpg'
    },
    {
        title: 'Sampling',
        description: 'We create a prototype based on your tech pack. You review the sample for fit, fabric, and construction before greenlighting bulk production.',
        image: 'https://i.pinimg.com/736x/fe/6d/8a/fe6d8adf9189b38e60e74fc496bb5339.jpg'
    },
    {
        title: 'Production',
        description: 'Once the sample is approved, we move into bulk manufacturing. Our quality control team monitors every step to maintain high standards.',
        image: 'https://i.pinimg.com/736x/55/3f/e1/553fe1cc62f86ea61c26ef0ff0b7c0ac.jpg'
    },
    {
        title: 'Ship to USA',
        description: 'After final inspection and packaging, your order is shipped globally. We handle logistics to ensure timely and safe delivery.',
        image: 'https://i.pinimg.com/736x/5f/27/12/5f2712f78631282060150dce5158c3d8.jpg'
    }
];

const HowItWorks = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !bgRef.current) return;

        const items = gsap.utils.toArray('.hiw-item') as HTMLElement[];
        const headers = gsap.utils.toArray('.hiw-header') as HTMLElement[];
        const titles = gsap.utils.toArray('.hiw-title') as HTMLElement[];
        const descriptions = gsap.utils.toArray('.hiw-description') as HTMLElement[];
        const rightImages = gsap.utils.toArray('.hiw-right-image') as HTMLElement[];

        // Master Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: `+=${steps.length * 350}vh`, // Slower scroll for maximum dwell time
                pin: true,
                scrub: 3, // Heavier weight for a more professional, "premium" feel
                snap: {
                    snapTo: 1 / (steps.length - 1),
                    duration: { min: 0.8, max: 2.5 },
                    delay: 0.5,
                    ease: "power3.inOut"
                }
            }
        });

        const container = document.querySelector('.hiw-list-container');

        // Robust function to get header position relative to the list container
        const getHeaderPos = (i: number) => {
            const header = headers[i];
            if (!header || !container) return { top: 0, height: 0 };
            const hRect = header.getBoundingClientRect();
            const cRect = container.getBoundingClientRect();
            return {
                top: hRect.top - cRect.top,
                height: hRect.height
            };
        };

        // Initial setup
        const initialPos = getHeaderPos(0);
        gsap.set(bgRef.current, { top: initialPos.top, height: initialPos.height });
        gsap.set(titles[0], { color: '#ffffff' });
        gsap.set(headers[0], { color: '#ffffff' });
        gsap.set(descriptions[0], { height: 'auto', opacity: 1, paddingTop: 16, paddingBottom: 24 });
        gsap.set(rightImages[0], { clipPath: 'inset(0% 0 0 0)', scale: 1, zIndex: 10 });

        // Build the timeline steps
        steps.forEach((_, i) => {
            if (i === steps.length - 1) return;
            const next = i + 1;

            // 1. Dwell - High pause time (long duration in timeline space)
            tl.to({}, { duration: 4 });

            // 2. Transition - Professional "wet" slide with continuous interpolation
            const proxy = { p: 0 };
            const transition = tl.to(proxy, {
                p: 1,
                duration: 3, // Slower, more controlled transition
                onUpdate: () => {
                    if (!bgRef.current) return;
                    const pos1 = getHeaderPos(i);
                    const pos2 = getHeaderPos(next);
                    const currentTop = pos1.top + (pos2.top - pos1.top) * proxy.p;
                    const currentHeight = pos1.height + (pos2.height - pos1.height) * proxy.p;
                    gsap.set(bgRef.current, { top: currentTop, height: currentHeight });
                },
                ease: "power3.inOut"
            });

            // Text color & Description transitions (synchronized with slide)
            transition.to([titles[i], headers[i]], { color: '#111111', ease: "power3.inOut" }, "<")
                .to([titles[next], headers[next]], { color: '#ffffff', ease: "power3.inOut" }, "<")
                .to(descriptions[i], { height: 0, duration: 0.5, opacity: 0, paddingTop: 0, paddingBottom: 0, ease: "power3.inOut" }, "<")
                .to(descriptions[next], { height: 'auto', duration: 0.5, opacity: 1, paddingTop: 16, paddingBottom: 24, ease: "power3.inOut" }, "<");

            // Image Transitions
            transition.set(rightImages[next], { zIndex: 10 }, "<")
                .to(rightImages[i], { clipPath: 'inset(0 0 100% 0)', duration: 0.5, scale: 1.1, ease: "power3.inOut" }, "<")
                .fromTo(rightImages[next],
                    { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
                    { clipPath: 'inset(0% 0 0 0)', scale: 1, ease: "power3.inOut" },
                    "<");
        });

        tl.to({}, { duration: 4 }); // Final dwell

        // Ensure positions are perfectly recalculated on refresh
        ScrollTrigger.addEventListener("refresh", () => {
            const currentIdx = Math.round(tl.progress() * (steps.length - 1));
            const pos = getHeaderPos(currentIdx);
            gsap.set(bgRef.current, { top: pos.top, height: pos.height });
        });
        ScrollTrigger.refresh();

    }, { scope: sectionRef });

    return (
        <>
            <div className="my-10 w-full justify-center flex flex-col items-center gap-5 pb-10">
                <Heading title="How It Works" />
                <p className='md:w-1/2 w-full text-center'>
                    We combine Pakistani manufacturing strength with global quality standards to deliver reliable apparel production for brands worldwide.
                </p>
            </div>
            <section ref={sectionRef} className="w-full h-screen flex-col overflow-hidden mt-20">

                <div className="w-full flex flex-col md:flex-row h-full px-5 gap-10">
                    {/* Left Side: Texts */}
                    <div className="w-full md:w-1/2 h-full flex flex-col justify-center relative z-10">
                        <div className="relative w-full md:w-4/5 hiw-list-container">
                            {/* Dynamic Active Background with no roundness */}
                            <div
                                ref={bgRef}
                                className="absolute left-0 w-full bg-black z-0 pointer-events-none"
                                style={{ top: 0, height: 0 }}
                            />

                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="hiw-item relative z-10 border-b border-black/20"
                                >
                                    <div
                                        className="hiw-header flex items-center justify-between px-6 py-6 cursor-pointer"
                                        style={{ color: '#111111' }}
                                    >
                                        <h3
                                            className="hiw-title text-xl md:text-2xl font-bold font-sf-pro"
                                        >
                                            {step.title}
                                        </h3>
                                        <div className="w-10 h-10 flex items-center justify-center shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="-rotate-45">
                                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div
                                        className="hiw-description overflow-hidden text-sm md:text-base opacity-0 font-medium px-6"
                                        style={{ height: 0, opacity: 0 }}
                                    >
                                        {step.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Images */}
                    <div className="hidden md:flex w-1/2 h-full items-center justify-center relative">
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-200">
                            {steps.map((step, index) => (
                                <img
                                    key={index}
                                    src={step.image}
                                    alt={step.title}
                                    className="hiw-right-image absolute inset-0 w-full h-full object-cover"
                                    style={{ clipPath: 'inset(100% 0 0 0)', zIndex: 0 }}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default HowItWorks;
