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
    const [activeIndex, setActiveIndex] = useState(0);
    const activeIndexRef = useRef(0);
    const bgRef = useRef<HTMLDivElement>(null);

    // Initial pin scroll trigger
    useGSAP(() => {
        if (!sectionRef.current) return;

        const items = gsap.utils.toArray('.hiw-item') as HTMLElement[];
        const headers = gsap.utils.toArray('.hiw-header') as HTMLElement[];

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${steps.length * 150}vh`, // Increased distance to slow down the scroll
            pin: true,
            scrub: 2, // Slightly more scrub for smoothness
            snap: {
                snapTo: 1 / (steps.length - 1),
                duration: { min: 0.2, max: 0.8 },
                delay: 0.1,
                ease: "power2.inOut"
            },
            onUpdate: (self) => {
                const progress = self.progress;
                let index = Math.min(steps.length - 1, Math.floor(progress * (steps.length)));
                if (progress >= 0.99) index = steps.length - 1;

                if (index !== activeIndexRef.current) {
                    activeIndexRef.current = index;
                    setActiveIndex(index);
                }

                // Continuous background movement for extreme smoothness
                if (bgRef.current && headers.length > 0) {
                    const totalSteps = steps.length;
                    const stepProgress = progress * (totalSteps - 1);
                    const i = Math.floor(stepProgress);
                    const f = stepProgress - i;

                    if (i < totalSteps - 1) {
                        const currentItem = items[i];
                        const currentHeader = headers[i];
                        const nextItem = items[i + 1];
                        const nextHeader = headers[i + 1];

                        if (currentItem && currentHeader && nextItem && nextHeader) {
                            const currentTop = currentItem.offsetTop + currentHeader.offsetTop;
                            const nextTop = nextItem.offsetTop + nextHeader.offsetTop;
                            const currentHeight = currentHeader.offsetHeight;
                            const nextHeight = nextHeader.offsetHeight;

                            const interpolatedTop = currentTop + (nextTop - currentTop) * f;
                            const interpolatedHeight = currentHeight + (nextHeight - currentHeight) * f;

                            gsap.to(bgRef.current, {
                                top: interpolatedTop,
                                height: interpolatedHeight,
                                duration: 0.1,
                                overwrite: 'auto',
                                ease: "none"
                            });
                        }
                    } else {
                        // Final step
                        const lastItem = items[totalSteps - 1];
                        const lastHeader = headers[totalSteps - 1];
                        if (lastItem && lastHeader) {
                            gsap.to(bgRef.current, {
                                top: lastItem.offsetTop + lastHeader.offsetTop,
                                height: lastHeader.offsetHeight,
                                duration: 0.1,
                                overwrite: 'auto'
                            });
                        }
                    }
                }
            }
        });

        const rightImages = gsap.utils.toArray('.hiw-right-image') as HTMLElement[];
        rightImages.forEach((img, i) => {
            gsap.set(img, { 
                clipPath: i === 0 ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)', 
                scale: i === 0 ? 1 : 1.1,
                zIndex: i === 0 ? 10 : 0
            });
        });
        
    }, { scope: sectionRef });

    // Handle animations driven by activeIndex
    useGSAP(() => {
        const rightImages = gsap.utils.toArray('.hiw-right-image') as HTMLElement[];
        const descriptions = gsap.utils.toArray('.hiw-description') as HTMLElement[];
        const titles = gsap.utils.toArray('.hiw-title') as HTMLElement[];
        const headers = gsap.utils.toArray('.hiw-header') as HTMLElement[];

        // Animate images
        rightImages.forEach((img, i) => {
            gsap.killTweensOf(img);
            if (i === activeIndex) {
                gsap.set(img, { zIndex: 10 });
                gsap.to(img, { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.2, ease: "expo.out", delay: 0.1 });
            } else {
                gsap.set(img, { zIndex: 0 });
                gsap.to(img, { 
                    clipPath: i < activeIndex ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)', 
                    scale: 1.1, 
                    duration: 1.2, 
                    ease: "expo.out"
                });
            }
        });

        // Expand/Collapse descriptions
        descriptions.forEach((desc, i) => {
            gsap.killTweensOf(desc);
            gsap.killTweensOf(titles[i]);
            gsap.killTweensOf(headers[i]);
            
            if (i === activeIndex) {
                gsap.to(desc, { height: 'auto', opacity: 1, paddingTop: 16, paddingBottom: 24, duration: 1, ease: "expo.out" });
                gsap.to(titles[i], { color: '#ffffff', duration: 0.5 });
                gsap.to(headers[i], { color: '#ffffff', duration: 0.5 });
            } else {
                gsap.to(desc, { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0, duration: 0.8, ease: "expo.out" });
                gsap.to(titles[i], { color: '#000000', duration: 0.5 });
                gsap.to(headers[i], { color: '#000000', duration: 0.5 });
            }
        });

    }, [activeIndex]);

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
                                    style={{ color: index === 0 ? '#EDEEE7' : '#000000' }}
                                >
                                    <h3 
                                        className="hiw-title text-xl md:text-2xl font-bold font-sf-pro"
                                        style={{ color: index === 0 ? '#EDEEE7' : '#000000' }}
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
                                    style={{ 
                                        height: index === 0 ? 'auto' : 0, 
                                        opacity: index === 0 ? 1 : 0, 
                                        paddingTop: index === 0 ? 16 : 0, 
                                        paddingBottom: index === 0 ? 24 : 0 
                                    }}
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
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;
