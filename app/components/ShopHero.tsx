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
                    src="https://i.pinimg.com/1200x/04/c5/09/04c5096da839fda9f22f05446f7ca061.jpg" 
                    alt="Shop Hero" 
                    className="w-full h-full object-cover position-center"
                />
                {/* <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black"></div> */}
            </div>

            {/* Content */}
            <div ref={contentRef} className="relative flex flex-col items-center z-10 text-center px-5">
                <p className="text-[#EDEEE7]/40 uppercase tracking-[0.5em] font-bold block mb-4">Explore our Collections</p>
                <Heading title='THE COLLECTION' className='text-[#EDEEE7]!' delay={1.5}/>
                <p className="text-[#EDEEE7]/60 mt-6 max-w-xl mx-auto">
                    Curated pieces designed for the modern individual. Quality, craftsmanship, and timeless style.
                </p>
            </div>
        </section>
    );
};

export default ShopHero;