'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import Heading from './Heading';

const ShopHero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(contentRef.current, 
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "expo.out", delay: 0.5 }
        );
    }, { scope: heroRef });

    return (
        <section ref={heroRef} className="w-full h-[60vh] relative flex items-center justify-center overflow-hidden bg-[#EDEEE7]">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://i.pinimg.com/1200x/bc/69/ae/bc69ae56b023f03408ec03649520b296.jpg" 
                    alt="Shop Hero" 
                    className="w-full h-full object-cover opacity-50 scale-110"
                />
                {/* <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black"></div> */}
            </div>

            {/* Content */}
            <div ref={contentRef} className="relative flex flex-col items-center z-10 text-center px-5">
                <span className="text-black/40 text-xs uppercase tracking-[0.5em] font-bold block mb-4">Explore our Collections</span>
                <Heading title='THE COLLECTION' delay={1.5}/>
                <p className="text-black/60 mt-6 max-w-xl mx-auto">
                    Curated pieces designed for the modern individual. Quality, craftsmanship, and timeless style.
                </p>
            </div>
        </section>
    );
};

export default ShopHero;
