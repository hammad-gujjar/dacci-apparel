'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoMdArrowForward } from 'react-icons/io';
import AnimatedSwapText from './AnimatedSwapText';
import { cn } from '@/lib/utils';
import { useLoader } from '../context/LoaderContext';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    title: "Golfwear",
    description: "Tour-grade technical apparel and precision gloves crafted with moisture-wicking textiles and custom branding options.",
    img: "images/2-categories-4-images/golfwear-custom-golf-apparel.webp",
    url: "/shop?category=golfwear"
  },
  {
    title: "Teamwear",
    description: "Engineered for high athletic performance. Custom-manufactured jerseys, training kits, and technical sportswear with flexible low MOQs.",
    img: "images/2-categories-4-images/teamwear-custom-sports-uniforms.webp",
    url: "/shop?category=teamwear"
  },
  {
    title: "Fitness",
    description: "Premium athletic wear and seamless gym sets manufactured to your precise brand specifications and custom sizing charts.",
    img: "images/2-categories-4-images/fitness-apparel-custom-sportswear.webp",
    url: "/shop?category=fitness-apparel"
  },
  {
    title: "Activewear",
    description: "Full-package OEM activewear, hoodies, and performance athletic apparel tailored for international brands.",
    img: "images/2-categories-4-images/activewear-custom-athleisure.webp",
    url: "/shop?category=activewear"
  }
];

const HorizontalCategories = () => {


  const { transitionTo } = useLoader();
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} className="min-h-[95vh] md:min-h-screen w-full overflow-hidden">
      <div ref={scrollContainerRef} className="h-full flex w-full grid grid-cols-1 md:grid-cols-2 px-2 gap-2">
        {CATEGORIES.map((cat, index) => {
          const isActive = activeCategory === index;
          return (
            <div
              onClick={() => { transitionTo(cat.url) }}
              key={index}
              onMouseEnter={() => setActiveCategory(index)}
              className={cn(
                'category-item group h-[40.5vh] md:h-[60vh] relative flex flex-col gap-2 justify-end shrink-0 overflow-hidden cursor-pointer',
              )}
            >
              {/* Background image */}
              <div className="absolute inset-0 size-full z-[-1] overflow-hidden">
                <img
                  className={cn(
                    'absolute top-0 left-1/2 -translate-x-1/2 h-full min-w-[100vw] md:min-w-[50vw] object-cover transition-transform duration-2000 ease-out',
                    isActive ? 'scale-105' : 'scale-100'
                  )}
                  src={cat.img}
                  alt={cat.title}
                />
              </div>

              {/* Content overlay */}
              <div className={cn(
                'category-content flex flex-col gap-4 p-6 md:p-12 size-full justify-end transition-all duration-700',
                isActive ? 'bg-black/0 md:bg-black/50' : 'bg-black/0 md:bg-black/20'
              )}>

                <div className="relative z-10 w-full flex flex-col items-start">
                  {/* Title heading - desktop only. On mobile the title shows in the arrow row below instead. */}
                  <AnimatedSwapText
                    text={cat.title}
                    active={isActive}
                    tag="h3"
                    className="hidden md:block text-[#EDEEE7] mb-4 uppercase !font-[main]"
                    stagger={0.02}
                    delay={0.1}
                  />

                  {/* Description - desktop only, revealed on hover */}
                  <div className={cn(
                    'hidden md:block transition-all w-full duration-700 ease-out delay-200',
                    isActive ? 'md:opacity-100' : 'md:opacity-0 md:h-0 md:overflow-hidden'
                  )}>
                    <AnimatedSwapText
                      text={cat.description}
                      active={isActive}
                      tag="p"
                      className="w-[90%] text-[#EDEEE7]/90 mb-8"
                      stagger={0.005}
                      delay={0.2}
                    />
                  </div>

                  {/* Arrow + label row - always visible on mobile (label = title, no hover needed).
                      On desktop this keeps the original hover-reveal behavior (label = "Explore Collection"). */}
                  <div className={cn(
                    'transition-all w-full duration-700 ease-out delay-200 opacity-100',
                    isActive ? 'md:opacity-100' : 'md:opacity-0 md:h-0 md:overflow-hidden'
                  )}>
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "text-black bg-[#EDEEE7] rounded-full w-14 h-14 flex items-center justify-center p-3 hover:scale-110 transition-all duration-500 opacity-100 translate-y-0 shrink-0",
                        isActive ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:translate-y-4"
                      )}>
                        <IoMdArrowForward className="w-full h-full -rotate-45" />
                      </div>

                      {/* Mobile label: category title, always shown, no animation needed since it's static */}
                      <span className="md:hidden text-[#EDEEE7] uppercase tracking-wider text-[15px] sm:text-lg !font-[main] font-bold">
                        {cat.title}
                      </span>

                      {/* Desktop label: "Explore Collection", hover-revealed as before */}
                      <AnimatedSwapText
                        text="Explore Collection"
                        active={isActive}
                        className="hidden md:block text-[#EDEEE7] uppercase tracking-[0.2em] text-sm font-medium"
                        stagger={0.015}
                        delay={0.4}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalCategories;
