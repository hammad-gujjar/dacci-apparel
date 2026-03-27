'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface AnimatedSwapTextProps {
  text: string;
  active: boolean;
  className?: string;
  stagger?: number;
  delay?: number;
  uppercase?: boolean;
  tag?: React.ElementType;
}

const AnimatedSwapText = ({
  text,
  active,
  className,
  stagger = 0.02,
  delay = 0,
  uppercase = false,
  tag: Tag = 'div'
}: AnimatedSwapTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    
    if (active) {
      gsap.to(chars, {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: stagger,
        delay: delay,
        ease: 'power3.out',
        overwrite: true
      });
    } else {
      gsap.to(chars, {
        y: '100%',
        opacity: 0,
        duration: 0.5,
        stagger: stagger,
        ease: 'power2.in',
        overwrite: true
      });
    }
  }, { dependencies: [active, text, stagger, delay], scope: containerRef });

  const words = text.split(' ');

  return (
    <Tag 
      ref={containerRef as any} 
      className={cn("flex flex-wrap gap-x-[0.3em] overflow-hidden", className)}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex overflow-hidden">
          {word.split('').map((char, charIndex) => (
            <span 
              key={charIndex} 
              className={cn(
                "char inline-block translate-y-full opacity-0 will-change-transform",
                uppercase && "uppercase"
              )}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
};

export default AnimatedSwapText;
