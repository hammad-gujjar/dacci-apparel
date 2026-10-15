'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heading from '../components/Heading';
import HowItWorks from './components/HowItWorks';
import { useLoader } from '../context/LoaderContext';

gsap.registerPlugin(ScrollTrigger);

const AboutClient = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isLoading } = useLoader();

    useGSAP(() => {
        if (isLoading) return;

        // 1. Initial Hero Animations
        gsap.fromTo('.about-hero-text', 
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
        );

        // 2. Main Hero Image Reveal
        gsap.fromTo('.about-main-img',
            { scale: 1.1, clipPath: 'inset(10% 10% 10% 10%)' },
            { 
                scale: 1, 
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.8, 
                ease: 'expo.inOut',
                scrollTrigger: {
                    trigger: '.about-main-img',
                    start: 'top 95%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // 3. Manufacturing Section Reveal
        const manufactParts = gsap.utils.toArray('.manufact-animate');
        manufactParts.forEach((part: any) => {
            gsap.fromTo(part,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: part,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        });

        // 4. Stats Cards Staggered Reveal
        gsap.fromTo('.stat-card',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.stats-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // 5. "Why Brands Choose Us" Header & Paragraph
        gsap.fromTo('.why-choose-header',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.why-choose-header',
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // 6. Feature Cards Staggered Reveal
        gsap.fromTo('.feature-card',
            { y: 60, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.4,
                stagger: 0.2,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: '.features-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

    }, { dependencies: [isLoading], scope: containerRef });

    return (
        <div ref={containerRef}>
            <div className='w-full pt-[10vh] px-5'>
                <div className='about-hero-text w-full flex flex-col items-center justify-between gap-5 pt-15'>
                    <Heading as="h1" title="Sportswear Manufacturer For Private-Label Brands" className="w-full justify-center text-center" />
                    <p className='md:w-[60%] w-[80%] text-center'>
                        Based in Sialkot, Pakistan, SLOTS SPORTSWEAR is an export-ready custom sportswear manufacturer and private label apparel supplier engineered for emerging and established athletic brands across the USA and worldwide.
                    </p>
                </div>
                <img
                    src="https://i.pinimg.com/1200x/70/64/3f/70643f7a6e3937ce322314083d60ea8d.jpg"
                    alt="SLOTS SPORTSWEAR athletic apparel manufacturing facility"
                    className='about-main-img w-full h-[90vh] object-cover py-10'
                />
                <div className='py-15 grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-5'>
                    <img
                        src="https://i.pinimg.com/originals/e9/a1/95/e9a195242f14c700aec400a3490b8d4b.jpg"
                        alt="Precision pattern cutting and athletic garment tailoring"
                        className='manufact-animate object-cover'
                    />
                    <div className='manufact-animate flex flex-col gap-2'>
                        <Heading as="h2" title='Advanced OEM & ODM Sportswear Production' className='!text-[25px] font-semibold' />
                        <p>
                            As a specialized custom sportswear manufacturer in Pakistan, our modern facility combines precision pattern drafting, laser cutting, sublimation, and high-density embroidery to serve private label apparel brands with export-grade craftsmanship.
                        </p>
                        <p>
                            Operating with an agile production model, we deliver scalable manufacturing from low 30-piece minimum order quantities to bulk volume orders exceeding 5,000+ units monthly. Every production run is backed by rigorous multi-point AQL quality inspection and comprehensive global door-to-door logistics.
                        </p>
                    </div>
                    <img
                        src="https://i.pinimg.com/1200x/4f/ef/fc/4feffc865f39f7b3f6484265c81e1fa5.jpg"
                        alt="Sportswear quality inspection and garment finishing"
                        className='manufact-animate row-span-2 object-cover'
                    />
                    <div className='stats-grid col-span-2 grid grid-cols-2 gap-5'>
                        {[
                            { title: "Production Capabilities", value: "5000+ monthly clothes" },
                            { title: "Quality Inspection Process", value: "Multi-stage AQL 2.5 inline & pre-shipment audits" },
                            { title: "Skilled Manufacturing Team", value: "50+ master pattern makers, tailors & QA specialists" },
                            { title: "Worldwide Logistics Support", value: "Tracked air & ocean freight to USA, Europe & Australia" },
                        ].map((item, index) => (
                            <ul key={index} className='stat-card ios-card flex flex-col gap-2'>
                                <p className='font-semibold'>{item.title}</p>
                                <p className='text-sm text-neutral-600'>{item.value}</p>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>

            <div className='p-5 flex flex-col items-center justify-center gap-5 pb-10'>
                <div className='why-choose-header w-full flex flex-col items-center gap-5'>
                    <Heading as="h2" title="Our Manufacturing Ethos" />
                    <p className='md:w-1/2 w-full text-center'>
                        Empowering athletic apparel brands with advanced sportswear engineering, agile low-MOQ production, and uncompromising factory-direct standards.
                    </p>
                </div>
                <div className='features-grid grid grid-cols-2 md:grid-cols-4 gap-5 px-5 w-full'>
                    {[
                        {
                            title: "Custom Apparel Development",
                            des: "Bespoke pattern drafting, 3D prototyping, and tailored athletic sizing engineered to bring your custom sportswear designs to life.",
                            img: '/images/box.png'
                        },
                        {
                            title: "Technical Fabric Sourcing",
                            des: "Direct procurement of moisture-wicking knits, high-recovery compression spandex, and certified sustainable performance textiles.",
                            img: '/images/schedule.png'
                        },
                        {
                            title: "Private Label Manufacturing",
                            des: "Complete branding customization including custom woven neck tags, heat-transfer care labels, barcode ticketing, and custom packaging.",
                            img: '/images/price-tag.png'
                        },
                        {
                            title: "Global Brand Partnerships",
                            des: "Trusted long-term manufacturing partner for international athletic labels, professional sports teams, gym chains, and wholesalers.",
                            img: '/images/guarantee.png'
                        },
                    ].map((item, index) => (
                        <ul key={index} className='feature-card ios-card flex flex-col items-center gap-4 h-full'>
                            <img src={item.img} alt={item.title} className='w-10 h-10 object-cover mb-3' />
                            <p className='font-semibold text-center'>{item.title}</p>
                            <p className='text-center text-sm'>{item.des}</p>
                        </ul>
                    ))}
                </div>
            </div>
            
            <HowItWorks />
        </div>
    );
};

export default AboutClient;
