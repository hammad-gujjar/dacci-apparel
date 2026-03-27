'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoMdArrowForward } from 'react-icons/io';
import TransitionButton from './TransitionButton';
import AnimatedSwapText from './AnimatedSwapText';
import { cn } from '@/lib/utils';
import Heading from './Heading';

gsap.registerPlugin(ScrollTrigger);

const PopularCategories = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [inView, setInView] = useState(false);

  useGSAP(() => {
    const section = containerRef.current;
    if (!section) return;

    // Set inView state for triggered animations
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => setInView(true),
    });

    // Header entrance
    gsap.from(section.querySelectorAll('.header-animate'), {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
      }
    });

    // Grid cards entrance
    gsap.from(section.querySelectorAll('.category-card'), {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: section.querySelector('.grid'),
        start: 'top 80%',
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="px-5 py-5">
      {/* --- Header Section --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start mb-5 gap-5">
        <div className="lg:w-1/2 space-y-5">
          <Heading
            title='Discover Collections'
          />
          <div className="header-animate flex gap-4 pt-4">
            <TransitionButton
              text="Shop now"
              url="/shop"
              className="dark-button !bg-black !text-[#EDEEE7]"
              arrow
            />
            <TransitionButton
              text="2023 Lookbook"
              url="/shop"
              className="light-button"
            />
          </div>
        </div>
        <div className="lg:w-1/3 header-animate">
          <p className="text-lg text-neutral-500 leading-relaxed font-light">
            A contemporary fashion brand that focuses on designing and producing minimalist, high-quality clothing and accessories.
          </p>
        </div>
      </div>

      {/* --- 3-Column Premium Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.3fr] gap-3 w-full mx-auto min-h-[90vh]">

        {/* Column 1: Man Collection (Left Wide) */}
        <div
          className="category-card relative h-[600px] lg:h-full rounded-[2.5vw] overflow-hidden group cursor-pointer bg-neutral-100"
          onMouseEnter={() => setHoveredCard('man')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Top Right Arrow */}
          <div className="absolute top-8 right-8 z-30 size-14 border border-white/30 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all duration-500">
            <IoMdArrowForward className="-rotate-45 text-white group-hover:text-black text-2xl transition-colors" />
          </div>

          <div className="absolute inset-0 size-full z-0 overflow-hidden">
            <img
              src="https://i.pinimg.com/736x/09/76/cf/0976cff2a137e7cefe03baada5ca6e74.jpg"
              alt="Man Collection"
              className="size-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000 ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700" />
          </div>

          <div className="absolute bottom-12 left-10 z-20 max-w-[80%]">
            <AnimatedSwapText
              text="men's top"
              active={inView}
              className="text-[#EDEEE7] text-[20px] lg:text-[25px] font-medium mb-3 font-[main]"
              stagger={0.02}
              delay={0.5}
            />
            <p className={cn(
              "text-[#EDEEE7] font-light tracking-wide text-lg transition-all duration-700 delay-100",
              hoveredCard === 'man' ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}>
              Designed to stand the test of time
            </p>
          </div>
        </div>

        {/* Column 2: Women & Offer (Center) */}
        <div className="flex flex-col gap-3 lg:h-full">
          {/* Women Collection */}
          <div className="category-card relative flex-1 min-h-[300px] rounded-[2.5vw] overflow-hidden group cursor-pointer bg-neutral-100">
            <div className="absolute inset-0 size-full z-0">
              <img
                src="https://i.pinimg.com/1200x/33/ee/cf/33eecf4466269b6d3659e2899fe18df3.jpg"
                alt="Women Collection"
                className="size-full object-cover group-hover:scale-110 transition-transform duration-2000"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
            </div>
            <div className="absolute bottom-8 left-8 z-20">
              <h3 className="text-[#EDEEE7] font-medium">Women Collection</h3>
            </div>
          </div>

          {/* Special Offer Card */}
          <div className="category-card relative flex-1 min-h-[300px] rounded-[2.5vw] bg-[#B39C7E] p-12 flex flex-col justify-center gap-4 group cursor-pointer overflow-hidden">
            <div className="size-full absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500 z-0" />
            <div className="relative z-10 space-y-6">
              <span className="inline-block px-4 py-1.5 border border-black/10 rounded-full text-xs uppercase tracking-widest font-medium">Special offer</span>
              <h3 className="text-3xl md:text-3xl font-normal leading-snug">
                Save 20% off this <br /> holiday season <br /> using the code <br /> <span className="font-bold">Y2023.</span>
              </h3>
            </div>
          </div>
        </div>

        {/* Column 3: Girl's Top (Right Wide) */}
        <div
          className="category-card relative h-[550px] lg:h-[100%] rounded-[2.5vw] overflow-hidden group cursor-pointer bg-neutral-100"
          onMouseEnter={() => setHoveredCard('girls')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="absolute inset-0 size-full z-0 overflow-hidden">
            <img
              src="https://i.pinimg.com/1200x/55/e5/29/55e5298261a13271488f08ed61488543.jpg"
              alt="Girl's Top"
              className="size-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000 ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700" />
          </div>

          <div className="absolute bottom-12 left-10 z-20 max-w-[80%] space-y-6">
            <div className="space-y-2">
              <AnimatedSwapText
                text="Girl's Top"
                active={inView}
                className="text-[#EDEEE7] text-[20px] lg:text-[25px] font-medium font-[main]"
                stagger={0.02}
                delay={0.7}
              />
              <p className={cn(
                "text-[#EDEEE7] font-light tracking-wide text-lg transition-all duration-700 delay-100",
                hoveredCard === 'girls' ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}>
                Mysterious everyday
              </p>
            </div>

            {/* Liquid Glass Button */}
            <div className={cn(
              "transition-all duration-700 delay-200 rounded-full overflow-hidden",
              hoveredCard === 'girls' ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}>
              <button className="relative px-8 py-3 rounded-full overflow-hidden transition-transform duration-500 active:scale-95 group/btn">
                {/* Glass Base */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] transition-colors group-hover/btn:bg-white/20" />

                {/* Liquid Highlight Refraction */}
                <div className="absolute -inset-x-full inset-y-0 bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover/btn:animate-[shimmer_2s_infinite]" />

                <span className="relative z-10 text-white text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                  Shop now <IoMdArrowForward className="-rotate-45" />
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `}</style>
    </section>
  );
};

export default PopularCategories;
