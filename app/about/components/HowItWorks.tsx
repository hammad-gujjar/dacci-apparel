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
        image: 'https://i.pinimg.com/1200x/65/5c/4b/655c4b8b6b0b55146c59b2ec512f45cc.jpg'
    },
    {
        title: 'Sampling',
        description: 'We create a prototype based on your tech pack. You review the sample for fit, fabric, and construction before greenlighting bulk production.',
        image: 'https://i.pinimg.com/1200x/9e/72/ae/9e72ae0d39b00ec28d4d9d137752c29f.jpg'
    },
    {
        title: 'Production',
        description: 'Once the sample is approved, we move into bulk manufacturing. Our quality control team monitors every step to maintain high standards.',
        image: 'https://i.pinimg.com/1200x/e2/11/f3/e211f3ca9a3d8d808b00e857d1212a82.jpg'
    },
    {
        title: 'Ship to USA',
        description: 'After final inspection and packaging, your order is shipped globally. We handle logistics to ensure timely and safe delivery.',
        image: 'https://i.pinimg.com/1200x/df/75/ca/df75ca8f2cccba08ea2d7aaae2fde375.jpg'
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
                end: `+=${steps.length * 200}vh`, // Slower scroll for more dwell time
                pin: true,
                scrub: 1.5,
                snap: {
                    snapTo: 1 / (steps.length - 1),
                    duration: { min: 0.5, max: 1.2 },
                    delay: 0.1,
                    ease: "power3.inOut"
                }
            }
        });

        // Initial setup for first item
        gsap.set(bgRef.current, {
            top: items[0].offsetTop + headers[0].offsetTop,
            height: headers[0].offsetHeight
        });
        gsap.set(titles[0], { color: '#ffffff' });
        gsap.set(headers[0], { color: '#ffffff' });
        gsap.set(descriptions[0], { height: 'auto', opacity: 1, paddingTop: 16, paddingBottom: 24 });
        gsap.set(rightImages[0], { clipPath: 'inset(0% 0 0 0)', scale: 1, zIndex: 10 });

        // Build the timeline steps
        steps.forEach((_, i) => {
            if (i === steps.length - 1) return;

            const next = i + 1;
            const currentItem = items[i];
            const currentHeader = headers[i];
            const nextItem = items[next];
            const nextHeader = headers[next];

            // 1. Dwell on current item (empty space in timeline)
            tl.to({}, { duration: 1 }); // Empty gap for dwell time

            // 2. Transition to next item
            const transition = tl.to({}, { duration: 2 }); // Duration of the "wet" slide

            // Background movement
            transition.to(bgRef.current, {
                top: nextItem.offsetTop + nextHeader.offsetTop,
                height: nextHeader.offsetHeight,
                ease: "expo.inOut"
            }, "<");

            // Text color & Description transitions
            transition.to([titles[i], headers[i]], { color: '#000000', ease: "expo.inOut" }, "<")
                      .to([titles[next], headers[next]], { color: '#ffffff', ease: "expo.inOut" }, "<")
                      .to(descriptions[i], { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0, ease: "expo.inOut" }, "<")
                      .to(descriptions[next], { height: 'auto', opacity: 1, paddingTop: 16, paddingBottom: 24, ease: "expo.inOut" }, "<");

            // Right Image Transitions (Clip Path Reveal)
            transition.set(rightImages[next], { zIndex: 10 }, "<")
                      .to(rightImages[i], { 
                          clipPath: 'inset(0 0 100% 0)', 
                          scale: 1.1, 
                          ease: "expo.inOut" 
                      }, "<")
                      .fromTo(rightImages[next], 
                          { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
                          { clipPath: 'inset(0% 0 0 0)', scale: 1, ease: "expo.inOut" }, 
                      "<");
        });

        // Final dwell
        tl.to({}, { duration: 1 });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full h-screen flex overflow-hidden mt-20">
            <div className="w-full flex flex-col md:flex-row h-full">
                
                {/* Left Side: Texts */}
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-5 md:pl-10 relative z-10">
                    <div className="mb-10 w-full md:w-4/5 pt-10 border-t border-black/20 pb-5">
                        <Heading title="How It Works" />
                    </div>
                    
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
                                    style={{ color: '#000000' }}
                                >
                                    <h3 
                                        className="hiw-title text-xl md:text-2xl font-bold font-sf-pro"
                                    >
                                        {step.title}
                                    </h3>
                                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="-rotate-45">
                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
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
                <div className="hidden md:flex w-1/2 h-full items-center justify-center p-10 relative">
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
    );
};

export default HowItWorks;
