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
        <section ref={heroRef} className="w-full h-[80vh] relative flex items-center justify-center overflow-hidden bg-[#EDEEE7]">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://i.pinimg.com/originals/83/90/cb/8390cb310766847e6b08b00b196960f4.jpg" 
                    alt="Shop Hero" 
                    className="w-full h-full object-cover position-center"
                />
                {/* <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black"></div> */}
            </div>

            {/* Content */}
            <div ref={contentRef} className="relative flex flex-col items-center z-10 text-center px-5">
                <p className="text-[#EDEEE7]! uppercase tracking-[0.3em] text-xs font-bold mb-4">B2B Manufacturing Catalog</p>
                <h1 className='text-[#EDEEE7]! text-center'>Custom Sportswear Collection</h1>
                <p className="text-[#EDEEE7]! mt-6 max-w-2xl mx-auto text-center font-light leading-relaxed">
                    Explore our complete range of custom sportswear, teamwear and activewear solutions designed for global brands, teams and wholesale buyers.
                </p>
            </div>
        </section>
    );
};

export default ShopHero;