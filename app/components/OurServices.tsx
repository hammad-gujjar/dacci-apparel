'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heading from './Heading';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Premium Custom Apparel Manufacturing',
        description: 'We specialize in producing high-quality sportswear and casual clothing tailored to your brand’s unique identity. From fabric selection to final stitching, every piece is crafted with precision, durability, and style to meet global standards.',
        images: [
            'https://i.pinimg.com/736x/06/64/65/06646591daec1f4ae432e7b743748466.jpg',
            'https://i.pinimg.com/474x/83/bd/2b/83bd2bc196bd39d7343d1d6aa4798130.jpg',
            'https://i.pinimg.com/736x/ab/15/d6/ab15d685d26ddcbdb5ab6a7be2a54483.jpg',
        ],
    },
    {
        title: 'Private Label & OEM Services',
        description: 'Launch your own clothing brand with ease through our private labeling solutions. We manufacture garments under your brand name, ensuring top-tier quality, custom designs, and complete confidentiality.',
        images: [
            'https://i.pinimg.com/1200x/ee/15/d2/ee15d2c8a1641d62ecebeb0f442ab89e.jpg',
            'https://i.pinimg.com/736x/ba/ff/e2/baffe26a65ab0af2bee5c6f9945f2fbb.jpg',
            'https://i.pinimg.com/1200x/ea/0e/89/ea0e89663a99ddbffed21ba8c9b7f7c8.jpg',
        ],
    },
    {
        title: 'Bulk Production & Scalable Manufacturing',
        description: 'Our advanced production facilities enable us to handle large-volume orders efficiently while maintaining consistent quality. Ideal for wholesalers, retailers, and international brands seeking reliable supply.',
        images: [
            'https://i.pinimg.com/1200x/e2/11/f3/e211f3ca9a3d8d808b00e857d1212a82.jpg',
            'https://i.pinimg.com/736x/1c/5d/63/1c5d6330c717fe2e03969618f7e11e1c.jpg',
            'https://i.pinimg.com/1200x/9e/72/ae/9e72ae0d39b00ec28d4d9d137752c29f.jpg',
        ],
    },
    {
        title: 'Global Export & Logistics Solutions',
        description: 'We provide seamless export services worldwide, handling documentation, packaging, and shipping with efficiency. Our experienced logistics team ensures timely delivery to your destination without hassle.',
        images: [
            'https://i.pinimg.com/1200x/e2/11/f3/e211f3ca9a3d8d808b00e857d1212a82.jpg',
            'https://i.pinimg.com/736x/1c/5d/63/1c5d6330c717fe2e03969618f7e11e1c.jpg',
            'https://i.pinimg.com/1200x/9e/72/ae/9e72ae0d39b00ec28d4d9d137752c29f.jpg',
        ],
    },
    {
        title: 'Custom Design & Product Development',
        description: 'Turn your ideas into reality with our in-house design team. From concept sketches to final samples, we help you create trendy, market-ready sportswear and casual collections.',
        images: [
            'https://i.pinimg.com/1200x/e2/11/f3/e211f3ca9a3d8d808b00e857d1212a82.jpg',
            'https://i.pinimg.com/736x/1c/5d/63/1c5d6330c717fe2e03969618f7e11e1c.jpg',
            'https://i.pinimg.com/1200x/9e/72/ae/9e72ae0d39b00ec28d4d9d137752c29f.jpg',
        ],
    },
    {
        title: 'Quality Assurance & Compliance',
        description: 'We follow strict quality control procedures at every stage of production. Our garments meet international standards, ensuring durability, safety, and customer satisfaction.',
        images: [
            'https://i.pinimg.com/1200x/e2/11/f3/e211f3ca9a3d8d808b00e857d1212a82.jpg',
            'https://i.pinimg.com/736x/1c/5d/63/1c5d6330c717fe2e03969618f7e11e1c.jpg',
            'https://i.pinimg.com/1200x/9e/72/ae/9e72ae0d39b00ec28d4d9d137752c29f.jpg',
        ],
    },
    {
        title: 'Custom Branding & Packaging Solutions',
        description: 'Enhance your brand identity with customized labels, tags, and packaging. We provide complete branding solutions to make your products stand out in competitive markets.',
        images: [
            'https://i.pinimg.com/1200x/e2/11/f3/e211f3ca9a3d8d808b00e857d1212a82.jpg',
            'https://i.pinimg.com/736x/1c/5d/63/1c5d6330c717fe2e03969618f7e11e1c.jpg',
            'https://i.pinimg.com/1200x/9e/72/ae/9e72ae0d39b00ec28d4d9d137752c29f.jpg',
        ],
    },
];

const OurServices = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        const mainImages = gsap.utils.toArray('.service-main-image');
        const sideImages1 = gsap.utils.toArray('.service-side-1');
        const sideImages2 = gsap.utils.toArray('.service-side-2');
        const contentSlides = gsap.utils.toArray('.service-content-slide');

        // Initial state for all images except first one
        gsap.set([mainImages, sideImages1, sideImages2], { x: '-120%' });
        gsap.set([mainImages[0], sideImages1[0], sideImages2[0]], { x: '0%' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: `+=${services.length * 400}vh`,
                pin: true,
                scrub: 2,
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

            // 1. Slide Images in from Left
            tl.to([mainImages[i], sideImages1[i], sideImages2[i]], {
                x: '0%',
                duration: 2,
                stagger: 0.1,
                ease: 'expo.inOut',
            }, pos);

            // 2. Text Transitions (Prev Out -> Next In)
            if (prevContent) {
                const prevChars = prevContent.querySelectorAll('.title-char, .desc-char');
                tl.to(prevChars, {
                    translateY: '-100%',
                    duration: 0.8,
                    stagger: 0.005,
                    ease: 'power2.inOut',
                }, pos);

                // Hide previous container after text is gone
                tl.set(prevContent, { opacity: 0 }, pos + 0.8);
            }

            // Ensure current slide container is visible
            tl.set(currentContent, { opacity: 1 }, pos);

            // 3. Current Text Reveal
            tl.to(titleChars, {
                translateY: '0%',
                duration: 1.2,
                stagger: 0.02,
                ease: 'expo.out',
            }, pos + 0.4);

            tl.to(descChars, {
                translateY: '0%',
                duration: 1.2,
                stagger: 0.01,
                ease: 'expo.out',
            }, pos + 0.5);
        });

    }, { scope: sectionRef });

    return (
        <>
            <div className="w-full flex justify-between items-end px-5 pt-20 mt-20 bg-black rounded-t-full">
                <Heading title="Our Services" className='w-full md:w-1/2 !text-[#EDEEE7]'/>
                <p className='w-full md:w-1/3 text-center md:text-left !text-[#EDEEE7]'>We provide proper custom service to our customers without charging extra fee.</p>
            </div>
            <section ref={sectionRef} className="relative w-full h-screen overflow-hidden px-5 py-10 bg-black">
                <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Main image shared container */}
                    <div className="relative row-span-2 h-full overflow-hidden rounded-[2vw] bg-gray-100">
                        {services.map((service, index) => (
                            <img
                                key={index}
                                src={service.images[0]}
                                alt={service.title}
                                className="service-main-image absolute inset-0 w-full h-full object-cover"
                            />
                        ))}
                    </div>

                    {/* Side images shared containers */}
                    <div className="col-span-1 flex gap-5 h-full">
                        <div className="relative flex-1 overflow-hidden rounded-[2vw] bg-gray-100">
                            {services.map((service, index) => (
                                <img
                                    key={index}
                                    src={service.images[1]}
                                    alt={service.title}
                                    className="service-side-1 absolute inset-0 w-full h-full object-cover"
                                />
                            ))}
                        </div>
                        <div className="relative flex-1 overflow-hidden rounded-[2vw] bg-gray-100">
                            {services.map((service, index) => (
                                <img
                                    key={index}
                                    src={service.images[2]}
                                    alt={service.title}
                                    className="service-side-2 absolute inset-0 w-full h-full object-cover"
                                />
                            ))}
                        </div>
                    </div>


                    {/* SHARED CONTENT SECTION */}
                    <div className="relative h-full flex flex-col z-20">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="service-content-slide absolute inset-0 flex flex-col justify-end pointer-events-none h-full"
                                style={{ opacity: index === 0 ? 1 : 0 }}
                            >
                                <div className="space-y-5 pointer-events-auto h-full flex flex-col">
                                    <div className="overflow-hidden">
                                        <div className="flex flex-wrap py-1 gap-x-[0.9em]">
                                            {service.title.split(' ').map((word, wIdx) => (
                                                <div key={wIdx} className="flex overflow-hidden">
                                                    {word.split('').map((char, cIdx) => (
                                                        <h2
                                                            key={cIdx}
                                                            className="title-char !text-[#EDEEE7]"
                                                            style={{ transform: index === 0 ? 'translateY(0%)' : 'translateY(100%)' }}
                                                        >
                                                            {char}
                                                        </h2>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="flex flex-wrap gap-x-[0.2em]">
                                            {service.description.split(' ').map((word, wIdx) => (
                                                <div key={wIdx} className="flex overflow-hidden">
                                                    {word.split('').map((char, cIdx) => (
                                                        <p
                                                            key={cIdx}
                                                            className="desc-char text-lg md:text-xl !text-[#EDEEE7]"
                                                            style={{ transform: index === 0 ? 'translateY(0%)' : 'translateY(100%)' }}
                                                        >
                                                            {char}
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
                </div>
            </section>
        </>
    );
};

export default OurServices;
