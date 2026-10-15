'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoader } from '../context/LoaderContext';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface HeadingProps {
    title?: string;
    className?: string;
    delay?: number;
    padding?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
}

const Heading = ({ title, className, delay, padding, as = 'h2' }: HeadingProps) => {
    const containerRef = useRef<HTMLElement>(null);
    const { isLoading } = useLoader();

    // Split text into words safely
    const words = title ? title.trim().split(/\s+/) : [];

    useGSAP(() => {
        if (isLoading) return;

        const containerElement = containerRef.current;
        if (!containerElement) return;

        const chars = containerElement.querySelectorAll('.char');
        if (!chars.length) return;

        gsap.to(chars, {
            scrollTrigger: {
                trigger: containerElement,
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
            y: "0%",
            duration: 0.6,
            ease: "expo.out",
            stagger: 0.02,
            delay: delay,
        });
    }, { dependencies: [isLoading], scope: containerRef });

    const Tag = as as any;

    const defaultSize = {
        h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold',
        h2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold',
        h3: 'text-xl sm:text-2xl md:text-3xl font-semibold',
        h4: 'text-lg sm:text-xl md:text-2xl font-semibold',
        div: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold',
        span: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold',
    }[as] || 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold';

    return (
        <Tag
            ref={containerRef}
            aria-label={title}
            className={cn(
                "font-[main] uppercase tracking-tight flex flex-wrap gap-x-[0.35em] leading-tight",
                defaultSize,
                className
            )}
        >
            {words.map((word, wordIndex) => (
                <span
                    key={wordIndex}
                    className={cn(
                        "inline-flex whitespace-nowrap overflow-hidden shrink-0",
                        padding
                    )}
                >
                    {/* Split word into characters */}
                    {word.split('').map((char, charIndex) => (
                        <span
                            key={charIndex}
                            className="char inline-block"
                            style={{ transform: 'translateY(100%)' }}
                        >
                            {char}
                        </span>
                    ))}
                </span>
            ))}
        </Tag>
    );
};

export default Heading;