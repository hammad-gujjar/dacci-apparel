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
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        const images = gsap.utils.toArray('.service-slide-image') as any[];
        const contentSlides = gsap.utils.toArray('.service-content-slide') as any[];
        const dotActive = gsap.utils.toArray('.service-dot-active') as any[];

        // Initial setup
        images.forEach((img, i) => {
            gsap.set(img as HTMLElement, {
                x: i === 0 ? '0%' : `${80 + i * 40}%`,
                scale: i === 0 ? 1 : 1 - i * 0.1,
                opacity: i < 4 ? 1 : 0,
                zIndex: 10 - i,
                transformOrigin: 'left center'
            });
            if (i === 0) {
                const overlay = (img as HTMLElement).querySelector('.service-image-overlay');
                if (overlay) gsap.set(overlay, { opacity: 0 });
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: `+=${services.length * 120}vh`,
                pin: true,
                scrub: 1.5,
            }
        });

        const stepSize = 3;
        services.forEach((_, i) => {
            if (i === 0) return;

            const prevContent = contentSlides[i - 1] as HTMLElement;
            const currentContent = contentSlides[i] as HTMLElement;
            const pos = i * stepSize;

            const titleChars = currentContent.querySelectorAll('.title-char');
            const descChars = currentContent.querySelectorAll('.desc-char');

            // 1. Dots
            if (dotActive[i - 1] && dotActive[i]) {
                tl.to(dotActive[i - 1], { scale: 0, duration: 0.5 }, pos);
                tl.to(dotActive[i], { scale: 2.5, duration: 0.5 }, pos);
            }

            // 2. Images Right to Left & Scale
            tl.to(images[i - 1], {
                x: '-80%',
                scale: 0.9,
                opacity: 0,
                duration: 2,
                ease: 'power2.inOut'
            }, pos);

            tl.to(images[i], {
                x: '0%',
                scale: 1,
                opacity: 1,
                duration: 2,
                ease: 'power3.out'
            }, pos);

            const currentOverlay = (images[i] as HTMLElement).querySelector('.service-image-overlay');
            if (currentOverlay) tl.to(currentOverlay, { opacity: 0, duration: 2 }, pos);

            const prevOverlay = (images[i - 1] as HTMLElement).querySelector('.service-image-overlay');
            if (prevOverlay) tl.to(prevOverlay, { opacity: 1, duration: 2 }, pos);

            for (let j = i + 1; j < services.length; j++) {
                const offset = j - i;
                tl.to(images[j], {
                    x: `${80 + offset * 40}%`,
                    scale: 1 - offset * 0.1,
                    opacity: offset < 4 ? 1 : 0,
                    duration: 2,
                    ease: 'power2.inOut'
                }, pos);
            }

            // 3. Text Transitions
            if (prevContent) {
                const prevTitle = prevContent.querySelectorAll('.title-char');
                const prevDesc = prevContent.querySelectorAll('.desc-char');

                tl.to(prevTitle, {
                    translateY: '-100%',
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.005,
                    ease: 'power2.inOut',
                }, pos);

                tl.to(prevDesc, {
                    translateY: '-100%',
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.002,
                    ease: 'power2.in',
                }, pos + 0.1);

                tl.set(prevContent, { opacity: 0 }, pos + 0.8);
            }

            tl.set(currentContent, { opacity: 1 }, pos);

            // Reveal incoming text characters
            tl.fromTo(titleChars, {
                translateY: '100%',
                opacity: 0
            }, {
                translateY: '0%',
                opacity: 1,
                duration: 1,
                stagger: 0.02,
                ease: 'expo.out',
            }, pos + 0.5);

            tl.fromTo(descChars, {
                translateY: '100%',
                opacity: 0
            }, {
                translateY: '0%',
                opacity: 1,
                duration: 1,
                stagger: 0.01,
                ease: 'expo.out',
            }, pos + 0.6);
        });

    }, { scope: sectionRef });

    return (
        <>
            <div className='mt-20 bg-[#111111]'>
                <div className="w-full flex flex-col gap-10 items-center justify-between px-5 pt-20 pb-40">
                    <Heading title="Our Services" className='w-fit !text-[#EDEEE7]' />
                    <p className='w-[80%] md:w-[60%] text-center !text-[#EDEEE7]'>We offer complete sportswear manufacturing solutions tailored to your brand. Whether you need custom designs, private labeling, or bulk production, we ensure top-tier quality, consistent results, and on-time delivery. Our goal is to help you bring high-performance apparel to market with confidence.</p>
                </div>

                <section ref={sectionRef} className="relative w-full h-[90vh] md:h-screen overflow-hidden px-5 flex flex-col md:flex-row items-center font-[main]">

                    {/* 2. Left Text Content (40%) */}
                    <div className="w-full md:w-[45%] lg:w-[40%] relative flex-[1] md:h-[60%] px-5 lg:pl-10 lg:pr-5 mt-10 md:mt-0 z-20">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="service-content-slide absolute inset-0 flex flex-col justify-center pointer-events-none px-5"
                                style={{ opacity: index === 0 ? 1 : 0 }}
                            >
                                <div className="space-y-6 pointer-events-auto flex flex-col">
                                    <div className="overflow-hidden">
                                        <div className="flex flex-wrap py-1 gap-x-[0.3em]">
                                            {service.title.split(' ').map((word, wIdx) => (
                                                <div key={wIdx} className="flex overflow-hidden">
                                                    {word.split('').map((char, cIdx) => (
                                                        <h2
                                                            key={cIdx}
                                                            className="title-char !text-[#EDEEE7]"
                                                            style={{ transform: index === 0 ? 'translateY(0%)' : 'translateY(100%)', opacity: index === 0 ? 1 : 0 }}
                                                        >
                                                            {char}
                                                        </h2>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="flex flex-wrap gap-x-[0.2em] md:max-w-[90%]">
                                            {service.description.split(' ').map((word, wIdx) => (
                                                <div key={wIdx} className="flex overflow-hidden">
                                                    {word.split('').map((char, cIdx) => (
                                                        <p
                                                            key={cIdx}
                                                            className="desc-char text-base lg:text-lg !text-[#B3B3B3] font-light leading-relaxed"
                                                            style={{ transform: index === 0 ? 'translateY(0%)' : 'translateY(100%)', opacity: index === 0 ? 1 : 0 }}
                                                        >
                                                            {char === ' ' ? '\u00A0' : char}
                                                        </p>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 3. Right Images Slider (50%) */}
                    <div className="w-full md:w-[45%] lg:w-[50%] h-[45vh] md:h-[60%] lg:h-[70%] relative flex items-center mt-10 md:mt-0 z-10 pointer-events-none overflow-hidden">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="service-slide-image absolute left-4 md:left-0 w-[70vw] md:w-[35vw] lg:w-[28vw] h-full overflow-hidden shadow-2xl"
                            >
                                <img src={service.images[0]} className="w-full h-full object-cover" />
                                <div
                                    className="service-image-overlay absolute inset-0 bg-black/30 transition-opacity"
                                    style={{ opacity: index === 0 ? 0 : 1 }}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default OurServices;
