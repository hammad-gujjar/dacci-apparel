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
                    <Heading title="About Us" />
                    <p className='md:w-[60%] w-[80%] text-center'>
                        We combine Pakistani manufacturing strength with global quality standards to deliver reliable apparel production for brands worldwide.
                    </p>
                </div>
                <img 
                    src="https://i.pinimg.com/1200x/70/64/3f/70643f7a6e3937ce322314083d60ea8d.jpg" 
                    alt="Manufacturing Banner" 
                    className='about-main-img w-full h-[90vh] object-cover py-10' 
                />
                <div className='py-15 grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-5'>
                    <img 
                        src="https://i.pinimg.com/originals/e9/a1/95/e9a195242f14c700aec400a3490b8d4b.jpg" 
                        alt="Expertise" 
                        className='manufact-animate object-cover' 
                    />
                    <div className='manufact-animate flex flex-col gap-2'>
                        <Heading title='Manufacturing Excellence from Pakistan' className='!text-[25px] font-semibold' />
                        <p>
                            Pakistan is one of the world's largest textile producers, with decades of expertise in cotton cultivation, knitting, dyeing, and garment construction. Our facilities leverage this heritage with modern equipment and global quality standards.
                        </p>
                        <p>
                            We operate ISO-certified production lines with capacity for 50,000+ units per month. Every order goes through multi-point quality inspection, and we maintain direct relationships with fabric mills for consistent material quality.
                        </p>
                    </div>
                    <img 
                        src="https://i.pinimg.com/1200x/4f/ef/fc/4feffc865f39f7b3f6484265c81e1fa5.jpg" 
                        alt="Export Quality" 
                        className='manufact-animate row-span-2 object-cover' 
                    />
                    <div className='stats-grid col-span-2 grid grid-cols-2 gap-5'>
                        {[
                            { title: "Monthly Capacity", value: "50,000+ units" },
                            { title: "Quality Standard", value: "AQL 2.5" },
                            { title: "Team Size", value: "100+ workers" },
                            { title: "Export Markets", value: "USA, Europe, Australia" },
                        ].map((item, index) => (
                            <ul key={index} className='stat-card ios-card flex flex-col gap-2'>
                                <p className='font-semibold'>{item.title}</p>
                                <p>{item.value}</p>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>

            <div className='p-5 flex flex-col items-center justify-center gap-5 pb-10'>
                <div className='why-choose-header w-full flex flex-col items-center gap-10'>
                    <Heading title="Why Brands Choose Us" />
                    <p className='md:w-1/2 w-full text-center'>
                        We combine Pakistani manufacturing strength with global quality standards to deliver reliable apparel production for brands worldwide.
                    </p>
                </div>
                <div className='features-grid grid grid-cols-2 md:grid-cols-4 gap-5 px-5 w-full'>
                    {[
                        {
                            title:"Low MOQ — 50pcs",
                            des:"No massive commitments. Start with 50 units per style and scale as you grow.",
                            img:'/images/box.png'
                        },
                        {
                            title:"14-Day Lead Times",
                            des:"Core styles manufactured and shipped within two weeks of order confirmation.",
                            img:'/images/schedule.png'
                        },
                        {
                            title:"Direct Pricing",
                            des:"Factory-direct pricing with no middlemen. Transparent cost breakdowns per unit.",
                            img:'/images/price-tag.png'
                        },
                        {
                            title:"Quality Assured",
                            des:"AQL 2.5 inspection standards. Every batch tested before it leaves the facility.",
                            img:'/images/guarantee.png'
                        },
                    ].map((item, index) => (
                        <ul key={index} className='feature-card ios-card flex flex-col items-center gap-5 h-full'>
                            <img src={item.img} alt="" className='w-10 h-10 object-cover mb-5' />
                            <p className='font-semibold'>{item.title}</p>
                            <p className='text-center'>{item.des}</p>
                        </ul>
                    ))}
                </div>
            </div>
            
            <HowItWorks />
        </div>
    );
};

export default AboutClient;
