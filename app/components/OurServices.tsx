'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heading from './Heading';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Premium Custom Apparel',
        description: 'We specialize in producing high-quality sportswear and casual clothing tailored to your brand’s unique identity. From fabric selection to final stitching, every piece is crafted with precision.',
        images: [
            'https://i.pinimg.com/736x/06/64/65/06646591daec1f4ae432e7b743748466.jpg'
        ],
    },
    {
        title: 'Private Label Services',
        description: 'Launch your own clothing brand with ease through our private labeling solutions. We manufacture garments under your brand name, ensuring custom designs and complete confidentiality.',
        images: [
            'https://i.pinimg.com/1200x/ee/15/d2/ee15d2c8a1641d62ecebeb0f442ab89e.jpg'
        ],
    },
    {
        title: 'Bulk Scale Manufacturing',
        description: 'Our advanced production facilities enable us to handle large-volume orders efficiently while maintaining reliable quality. Ideal for wholesalers, retailers, and international brands.',
        images: [
            'https://i.pinimg.com/1200x/e2/11/f3/e211f3ca9a3d8d808b00e857d1212a82.jpg'
        ],
    },
    {
        title: 'Global Export Solutions',
        description: 'We provide seamless export services worldwide, handling documentation, packaging, and shipping with extreme efficiency. Our experienced logistics team ensures timely delivery.',
        images: [
            'https://i.pinimg.com/736x/1c/5d/63/1c5d6330c717fe2e03969618f7e11e1c.jpg'
        ],
    },
    {
        title: 'Bespoke Product Design',
        description: 'Turn your ideas into reality with our in-house design team. From concept sketches to final prototypes, we help you create trendy, market-ready casual collections.',
        images: [
            'https://i.pinimg.com/736x/e3/18/4d/e3184d658507ecf32dbff5dfced7453c.jpg'
        ],
    },
    {
        title: 'Quality Assurance',
        description: 'We follow strict quality control procedures at every stage of production. Our garments meet strict international standards, ensuring extreme durability and safety.',
        images: [
            'https://i.pinimg.com/736x/ab/15/d6/ab15d685d26ddcbdb5ab6a7be2a54483.jpg'
        ],
    },
    {
        title: 'Branding Solutions',
        description: 'Enhance your brand identity with customized labels, tags, and packaging. We provide complete unique branding solutions to make your products stand out.',
        images: [
            'https://i.pinimg.com/736x/ba/ff/e2/baffe26a65ab0af2bee5c6f9945f2fbb.jpg'
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
        
        if (document.body) {
            ro.observe(document.body);
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
                        stagger: { amount: 0.15 },
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
                        stagger: { amount: 0.15 },
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
        <div className='w-full bg-[#111111]'>
            <div className="w-full flex flex-col items-center gap-10 py-25 px-10">
                <Heading title='Our Services' className='w-fit !text-[#EDEEE7]' />
                <p className='text-center md:px-15 !text-[#EDEEE7]'>At Slots Sportswear, we specialize in manufacturing high-quality sports apparel designed to meet international standards. Based in Pakistan, we offer a complete range of services including custom design, fabric sourcing, cutting, stitching, printing, and branding. Our expertise covers team uniforms, fitness wear, and performance sports clothing tailored to your specifications. With a strong focus on quality, durability, and timely delivery, Slots Sportswear is committed to helping brands, teams, and businesses bring their vision to life with precision and professionalism.</p>
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
                                <h2 className="mb-6 !text-[#EDEEE7]">
                                    {renderText(service.title)}
                                </h2>
                                <p className='!text-[#EDEEE7]'>
                                    {renderText(service.description)}
                                </p>
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
        </div>
    );
};

export default OurServices;