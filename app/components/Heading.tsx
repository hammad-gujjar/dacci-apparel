'use client';
import React, { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoader } from '../context/LoaderContext';

gsap.registerPlugin(ScrollTrigger);

const Heading = ({ title, className, delay }: { title?: string, className?: string, delay?: number }) => {
    const containerRef = useRef<HTMLHeadingElement>(null);
    const { isLoading } = useLoader();

    // Split text into words
    const words = title ? title.split(' ') : [];

    useGSAP(() => {
        if (isLoading) return;

        const containerElement = containerRef.current;
        if (!containerElement) return;

        const chars = containerElement.querySelectorAll('.char');

        gsap.to(chars, {
            scrollTrigger: {
                trigger: containerElement,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            y: "0%",
            duration: 0.6,
            ease: "expo.out",
            stagger: 0.02,
            delay: delay,
        });
    }, { dependencies: [isLoading], scope: containerRef });

    return (
        <div ref={containerRef} className={`${className || ''} flex flex-wrap gap-x-[0.3em]`}>
            {words.map((word, wordIndex) => (
                <div key={wordIndex} className="flex overflow-hidden">
                    {/* Split word into characters */}
                    {word.split('').map((char, charIndex) => (
                        <h1
                            key={charIndex}
                            className={`char inline-block ${className}`}
                            style={{ transform: 'translateY(100%)' }}
                        >
                            {char}
                        </h1>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Heading;