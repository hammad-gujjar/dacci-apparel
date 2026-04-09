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

      {/* --- Solid Symmetrical Bento Grid (4x4) --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-2 md:gap-3 w-full md:h-[75vh] lg:h-[85vh] mt-10 grid-flow-row-dense">

        {/* 1. Man Collection (Large Top Left - 2x2) */}
        <div
          className="category-card relative overflow-hidden group cursor-pointer bg-neutral-100 min-h-[300px] md:min-h-0 md:col-span-2 md:row-span-2"
          onMouseEnter={() => setHoveredCard('man')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="absolute inset-0 size-full z-0 overflow-hidden">
            <img src="https://i.pinimg.com/736x/09/76/cf/0976cff2a137e7cefe03baada5ca6e74.jpg" alt="Man Collection" className="size-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000 ease-out" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700" />
          </div>
          <div className="absolute top-4 right-4 z-30 size-8 md:size-10 border border-white/30 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all duration-500">
            <IoMdArrowForward className="-rotate-45 text-white group-hover:text-black text-lg transition-colors" />
          </div>
          <div className="absolute bottom-4 left-5 md:bottom-6 md:left-6 z-20">
            <div className={cn("transition-all duration-700 ease-out", hoveredCard === 'man' ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
              <AnimatedSwapText text="men's top" active={inView} className="text-[#EDEEE7] text-[20px] md:text-[24px] font-medium mb-1 font-[main]" stagger={0.02} delay={0.5} />
            </div>
            <p className={cn("text-[#EDEEE7] font-light text-xs md:text-sm transition-all duration-700 ease-out delay-100", hoveredCard === 'man' ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
              Designed to last
            </p>
          </div>
        </div>

        {/* 2. Women Collection (Vertical Top Mid - 1x2) */}
        <div
          className="category-card relative overflow-hidden group cursor-pointer bg-neutral-100 min-h-[350px] md:min-h-0 md:col-span-1 md:row-span-2"
          onMouseEnter={() => setHoveredCard('women')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="absolute inset-0 size-full z-0 overflow-hidden">
            <img src="https://i.pinimg.com/736x/91/07/6a/91076a498ecc85a30091c6f500f378c4.jpg" alt="Women Collection" className="size-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000 ease-out" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-700" />
          </div>
          <div className="absolute bottom-4 left-5 z-20">
            <div className={cn("transition-all duration-700 ease-out", hoveredCard === 'women' ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
              <AnimatedSwapText text="Women" active={inView} className="text-[#EDEEE7] text-[18px] md:text-[20px] font-medium mb-1 font-[main]" stagger={0.02} delay={0.6} />
            </div>
            <p className={cn("text-[#EDEEE7] font-light text-[10px] md:text-xs transition-all duration-700 ease-out delay-100", hoveredCard === 'women' ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
              Elegance redefined
            </p>
          </div>
        </div>
        {/* 3. Autumn Edit (Vertical Top Right - 1x2) */}
        <div
          className="category-card relative overflow-hidden group cursor-pointer bg-neutral-100 min-h-[300px] md:min-h-0 md:col-span-1 md:row-span-2"
          onMouseEnter={() => setHoveredCard('autumn')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="absolute inset-0 size-full z-0 overflow-hidden">
            <img src="https://i.pinimg.com/1200x/f9/1b/38/f91b38b62b069ff7d769ab4311627d7b.jpg" alt="Autumn Edit" className="size-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000 ease-out object-center" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700" />
          </div>
          <div className="absolute bottom-4 left-5 z-20">
            <div className={cn("transition-all duration-700 ease-out", hoveredCard === 'autumn' ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
              <AnimatedSwapText text="Autumn" active={inView} className="text-[#EDEEE7] text-[18px] md:text-[20px] font-medium mb-1 font-[main]" stagger={0.02} delay={0.6} />
            </div>
            <p className={cn("text-[#EDEEE7] font-light text-[10px] md:text-xs transition-all duration-700 ease-out delay-100", hoveredCard === 'autumn' ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
              Warm layers
            </p>
          </div>
        </div>

        {/* 4. Special Offer (Small Bottom Left 1 - 1x1) */}
        <div
          className="category-card relative bg-[#B39C7E] flex flex-col justify-center p-4 lg:p-6 group cursor-pointer overflow-hidden min-h-[200px] md:min-h-0 md:col-span-1 md:row-span-1"
        >
          <div className="size-full absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-0" />
          <div className="relative z-10 space-y-2">
            <span className="inline-block px-2 py-1 border border-black/20 rounded-full text-[9px] uppercase tracking-widest font-medium">Special</span>
            <h3 className="text-lg md:text-xl font-normal leading-snug">
              Save 10% <br /> on sign up.
            </h3>
          </div>
        </div>

        {/* 5. Footwear (Small Bottom Left 2 - 1x1) */}
        <div
          className="category-card relative overflow-hidden group cursor-pointer bg-neutral-100 min-h-[200px] md:min-h-0 md:col-span-1 md:row-span-1"
          onMouseEnter={() => setHoveredCard('shoes')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="absolute inset-0 size-full z-0 overflow-hidden">
            <img src="https://i.pinimg.com/1200x/64/25/ad/6425ad018953f7a520aa907496cd6b85.jpg" alt="Footwear" className="size-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000 ease-out" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 bg-black/20">
            <h3 className="text-[#EDEEE7] text-xs font-medium font-[main] tracking-wider uppercase">Shoes</h3>
          </div>
        </div>

        {/* 6. Girl's Top (Large Bottom Right - 2x2) */}
        <div
          className="category-card relative overflow-hidden group cursor-pointer bg-neutral-100 min-h-[350px] md:min-h-0 md:col-span-2 md:row-span-2"
          onMouseEnter={() => setHoveredCard('girls')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="absolute inset-0 size-full z-0 overflow-hidden">
            <img src="https://i.pinimg.com/1200x/55/e5/29/55e5298261a13271488f08ed61488543.jpg" alt="Girls Top" className="size-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000 ease-out object-top" />
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/40 transition-colors duration-700" />
          </div>
          <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6 z-20 space-y-3 md:space-y-4">
            <div className={cn("transition-all duration-700 ease-out", hoveredCard === 'girls' ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
              <AnimatedSwapText text="Girl's Top" active={inView} className="text-[#EDEEE7] text-[20px] md:text-[24px] font-medium mb-1 font-[main]" stagger={0.02} delay={0.7} />
              <p className={cn("text-[#EDEEE7] font-light text-sm md:text-base transition-all duration-700 ease-out delay-100", hoveredCard === 'girls' ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
                Mysterious everyday
              </p>
            </div>
            
            <div className={cn("transition-all duration-700 delay-200 rounded-full", hoveredCard === 'girls' ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 hidden md:block")}>
              <button className="relative px-6 py-2.5 rounded-full overflow-hidden transition-transform duration-500 active:scale-95 group/btn">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] transition-colors group-hover/btn:bg-white/20" />
                <div className="absolute -inset-x-full inset-y-0 bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover/btn:animate-[shimmer_2s_infinite]" />
                <span className="relative z-10 text-white text-xs font-medium uppercase tracking-widest flex items-center gap-2">
                  Shop <IoMdArrowForward className="-rotate-45" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 7. Accessories (Small Bottom Left 3 - 1x1) */}
        <div
          className="category-card relative overflow-hidden group cursor-pointer bg-neutral-100 min-h-[200px] md:min-h-0 md:col-span-1 md:row-span-1"
          onMouseEnter={() => setHoveredCard('acc')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="absolute inset-0 size-full z-0 overflow-hidden">
            <img src="https://i.pinimg.com/736x/a6/c3/3b/a6c33b26fdb8d433ac4dd1e0a5226d53.jpg" alt="Accessories" className="size-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000 ease-out object-center" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 bg-black/40">
            <h3 className="text-[#EDEEE7] text-xs font-medium font-[main] tracking-wider uppercase">Acc.</h3>
          </div>
        </div>

        {/* 8. Essentials (Small Bottom Left 4 - 1x1) */}
        <div
          className="category-card relative overflow-hidden group cursor-pointer bg-neutral-100 min-h-[200px] md:min-h-0 md:col-span-1 md:row-span-1"
          onMouseEnter={() => setHoveredCard('essential')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="absolute inset-0 size-full z-0 overflow-hidden">
            <img src="https://i.pinimg.com/1200x/eb/b6/7e/ebb67eaa0d380249978d690bd365da2a.jpg" alt="Essentials" className="size-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000 ease-out" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 bg-black/20">
            <h3 className="text-[#EDEEE7] text-xs font-medium font-[main] tracking-wider uppercase">Basic</h3>
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
