'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heading from './Heading';
import Whychooseus from './Whychooseus';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Fabric Sourcing',
        points: [
            'Premium technical fabric sourcing',
            'Performance knit and mesh options',
            'Breathable athletic textile selection',
            'Certified organic cotton sourcing',
            'Production-ready material coordination'
        ],
        images: [
            'images/4-our-services-images/sportswear-fabric-sourcing.webp'
        ],
    },
    {
        title: 'Custom Pattern Development',
        points: [
            'Digital CAD pattern development',
            '3D garment prototyping',
            'Athletic fit engineering',
            'Size grading for production',
            'Production-ready pattern preparation'
        ],
        images: [
            'images/4-our-services-images/custom-sportswear-pattern-development.webp'
        ],
    },
    {
        title: 'Printing & Embroidery',
        points: [
            'Sublimation sportswear printing',
            'DTF custom garment printing',
            'Computerized embroidery production',
            'Durable athletic branding',
            'Consistent logo application'
        ],
        images: [
            'images/4-our-services-images/sportswear-printing-embroidery.webp'
        ],
    },
    {
        title: 'Quality Control',
        points: [
            'Multi-stage production inspections',
            'Four-point fabric quality checks',
            'Seam and stitching inspection',
            'Dimensional tolerance verification',
            'AQL-based quality assurance'
        ],
        images: [
            'images/4-our-services-images/sportswear-quality-control.webp'
        ],
    },
    {
        title: 'Packaging',
        points: [
            'Custom woven neck labels',
            'Branded hang tags',
            'Barcode and product stickers',
            'Secure polybag packaging',
            'Export-ready carton packing'
        ],
        images: [
            'images/4-our-services-images/sportswear-packaging.webp'
        ],
    },
];

const OurServices = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLElement>(null);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);
    const trainRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Robust resize observer to recalculate ScrollTrigger if ANY layout shift happens above this component
        let resizeTimer: NodeJS.Timeout;
        const ro = new ResizeObserver(() => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        });

        if (wrapperRef.current) {
            ro.observe(wrapperRef.current);
        }

        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            let { isDesktop } = context.conditions as { isDesktop: boolean };

            gsap.set(trainRef.current, { clearProps: "all" });

            textRefs.current.forEach((el, index) => {
                if (!el) return;
                const words = el.querySelectorAll('.word');
                if (index === 0) {
                    gsap.set(el, { autoAlpha: 1, zIndex: 1 });
                    gsap.set(words, { yPercent: 0 });
                } else {
                    gsap.set(el, { autoAlpha: 0, zIndex: 0 });
                    gsap.set(words, { yPercent: 100 });
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current, // Pin the clean wrapper to avoid flex layout shift glitches
                    start: "top top",
                    end: `+=${services.length * 100}%`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    fastScrollEnd: true,
                }
            });

            services.forEach((_, i) => {
                if (i === 0) {
                    tl.to({}, { duration: 1 });
                    return;
                }

                const prevText = textRefs.current[i - 1];
                const currentText = textRefs.current[i];
                const transitionLabel = `step-${i}`;

                if (isDesktop) {
                    tl.to(trainRef.current, {
                        yPercent: -100 * i,
                        duration: 1,
                        ease: "power2.inOut"
                    }, transitionLabel);
                } else {
                    tl.to(trainRef.current, {
                        xPercent: -100 * i,
                        duration: 1,
                        ease: "power2.inOut"
                    }, transitionLabel);
                }

                if (prevText && currentText) {
                    // 1. Previous text animates out (takes exact 0.55s total)
                    tl.to(prevText.querySelectorAll('.word'), {
                        yPercent: -100,
                        duration: 0.4,
                        stagger: { amount: 0.05 },
                        ease: "power2.in"
                    }, transitionLabel);

                    tl.to(prevText, {
                        autoAlpha: 0,
                        duration: 0.1
                    }, `${transitionLabel}+=0.45`);

                    // 2. Current text animates in (takes exact 0.5s total)
                    tl.to(currentText, {
                        autoAlpha: 1,
                        zIndex: 1,
                        duration: 0.1
                    }, `${transitionLabel}+=0.5`);

                    tl.to(currentText.querySelectorAll('.word'), {
                        yPercent: 0,
                        duration: 0.4,
                        stagger: { amount: 0.05 },
                        ease: "power2.out"
                    }, `${transitionLabel}+=0.5`);
                }

                tl.to({}, { duration: 1 });
            });

            return () => {
                tl.kill();
            };
        });

        return () => {
            ro.disconnect();
            clearTimeout(resizeTimer);
        };

    }, { scope: wrapperRef });

    const renderText = (text: string) => {
        return text.split(' ').map((word, index) => (
            <span key={index} className="inline-block overflow-hidden mr-[0.25em] mb-[-0.1em] pb-[0.1em] align-top">
                <span className="block word will-change-transform">{word}</span>
            </span>
        ));
    };

    return (
        <div className='w-full bg-[#111111] mt-15'>
            <div className="w-full flex flex-col items-center gap-10 py-15 px-10">
                <Heading as="h2" title='Our Services' className='w-fit !text-[#EDEEE7]' />
            </div>

            <div ref={wrapperRef} className="w-full relative">
                <section ref={containerRef} className="h-screen w-full text-[#EDEEE7] flex flex-col md:flex-row overflow-hidden relative">

                    <div className="w-full h-1/2 md:w-1/2 md:h-full relative flex items-center justify-center p-6 md:p-12 lg:p-20 z-10 bg-black/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                ref={el => { textRefs.current[index] = el; }}
                                className="absolute inset-0 flex flex-col justify-center p-6 md:p-12 lg:p-24 opacity-0 invisible"
                            >
                                <h2 className="mb-6 !text-[#EDEEE7] text-2xl md:text-4xl lg:text-5xl font-bold uppercase">
                                    {renderText(service.title)}
                                </h2>
                                <ul className="flex flex-col gap-3 !text-[#EDEEE7]/90 text-sm md:text-base list-none pl-0 m-0">
                                    {service.points.map((point, ptIdx) => (
                                        <li key={ptIdx} className="flex items-start gap-3">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#EDEEE7] shrink-0 opacity-80"></span>
                                            <span className="block leading-relaxed">
                                                {renderText(point)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="w-full h-1/2 md:w-1/2 md:h-full overflow-hidden relative bg-zinc-900">
                        <div
                            ref={trainRef}
                            className="absolute top-0 left-0 w-full h-full flex flex-row md:flex-col will-change-transform"
                        >
                            {services.map((service, index) => (
                                <div key={index} className="w-full h-full flex-shrink-0 relative overflow-hidden">
                                    <img
                                        src={service.images[0]}
                                        alt={service.title}
                                        className="w-full h-full object-cover scale-[1.02] transform-gpu"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 md:bg-gradient-to-l pointer-events-none"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                </section>
            </div>
            <Whychooseus/>
        </div>
    );
};

export default OurServices;
