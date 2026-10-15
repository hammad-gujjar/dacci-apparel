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
import { useLoader } from '@/app/context/LoaderContext';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 'polo-shirts',
    type: 'detailed_with_btn',
    title: "Polo Shirts",
    subtitle: "Custom polo shirts",
    alt: "Custom polo shirts sportswear",
    image: "images/3-sub-categories-6-images/custom-polo-shirts-sportswear.webp",
    width: "w-[280px] md:w-[400px]",
    url: "/shop?type=Polo Shirts",
  },
  {
    id: 't-shirts',
    type: 'detailed_with_btn',
    title: "T-Shirts",
    subtitle: "Custom sportswear t-shirts",
    alt: "Custom T-shirts for sportswear",
    image: "images/3-sub-categories-6-images/custom-t-shirts-sportswear.webp",
    width: "w-[280px] md:w-[400px]",
    url: "/shop?type=T-Shirts",
  },
  {
    id: 'golf-gloves',
    type: 'detailed_with_btn',
    title: "Golf Gloves",
    subtitle: "Performance golf gloves",
    alt: "Golf gloves for performance apparel",
    image: "images/3-sub-categories-6-images/golf-gloves-sportswear.webp",
    width: "w-[280px] md:w-[400px]",
    url: "/shop?category=golfwear&type=Golf Gloves",
  },
  {
    id: 'soccer-uniforms',
    type: 'detailed_with_btn',
    title: "Soccer Uniforms",
    subtitle: "Custom soccer uniforms",
    alt: "Custom soccer uniforms",
    image: "images/3-sub-categories-6-images/custom-soccer-uniforms.webp",
    width: "w-[280px] md:w-[400px]",
    url: "/shop?category=teamwear&type=Soccer Uniforms",
  },
  {
    id: 'compression-shirts',
    type: 'detailed_with_btn',
    title: "Compression Shirts",
    subtitle: "Custom compression shirts",
    alt: "Custom compression shirts",
    image: "images/3-sub-categories-6-images/compression-shirts-sportswear.webp",
    width: "w-[280px] md:w-[400px]",
    url: "/shop?category=fitness-apparel&type=Compression Shirts",
  },
  {
    id: 'hoodies',
    type: 'detailed_with_btn',
    title: "Hoodies",
    subtitle: "Custom sportswear hoodies",
    alt: "Custom sportswear hoodies",
    image: "images/3-sub-categories-6-images/custom-sportswear-hoodies.webp",
    width: "w-[280px] md:w-[400px]",
    url: "/shop?category=activewear&type=Hoodies",
  }
];

const PopularCategories = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [inView, setInView] = useState(false);
  const { transitionTo } = useLoader();

  useGSAP(() => {
    const section = containerRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => setInView(true),
    });

    if (marqueeRef.current) {
      tweenRef.current = gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 35, // Adjust this value to make the sliding faster or slower
        repeat: -1,
      });
    }

  }, { scope: containerRef });

  const handleMouseEnter = () => {
    tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    tweenRef.current?.play();
  };

  const renderCard = (cat: any, index: number, inView: boolean) => {
    const innerClasses = "category-card relative size-full overflow-hidden group cursor-pointer bg-neutral-100 flex flex-col justify-center";
    const href = cat.url || `/shop`;

    let content;

    if (cat.type === 'special') {
      content = (
        <div onClick={() => transitionTo(href, { scroll: true })} className={`${innerClasses} bg-[#B39C7E] p-6 lg:p-8 block`}>
          <div className="size-full absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-0" />
          <div className="relative z-10 space-y-3">
            <span className="inline-block px-3 py-1.5 border border-black/20 rounded-full text-[10px] uppercase tracking-widest font-medium">{cat.subtitle}</span>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-normal leading-snug whitespace-pre-line">
              {cat.title}
            </h3>
          </div>
        </div>
      );
    } else if (cat.type === 'simple') {
      content = (
        <div onClick={() => transitionTo(href, { scroll: true })} className={`${innerClasses} block`}>
          <div className="absolute inset-0 size-full z-0 overflow-hidden">
            <img src={cat.image} alt={cat.alt || cat.title} className="size-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000 ease-out" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 bg-black/20">
            <h3 className="text-[#EDEEE7] text-sm font-medium font-[main] tracking-wider uppercase">{cat.title}</h3>
          </div>
        </div>
      );
    } else {
      // detailed & detailed_with_btn
      content = (
        <div onClick={() => transitionTo(href, { scroll: true })} className={`${innerClasses} block`}>
          <div className="absolute inset-0 size-full z-0 overflow-hidden">
            <img src={cat.image} alt={cat.alt || cat.title} className="size-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000 ease-out object-center" />
            <div className="absolute inset-0 bg-black/0 md:bg-black/15 md:group-hover:bg-black/40 transition-colors duration-700" />
          </div>

          <div className="absolute top-4 right-4 z-30 size-8 md:size-10 border border-white/30 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all duration-500">
            <IoMdArrowForward className="-rotate-45 text-white group-hover:text-black text-lg transition-colors" />
          </div>

          <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 z-20 space-y-1 md:space-y-1 w-[80%] md:w-auto">
            <div className="transition-all duration-700 ease-out translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <AnimatedSwapText text={cat.title} active={inView} className="text-[#EDEEE7] text-[20px] md:text-[28px] font-medium mb-1 font-[main]" stagger={0.02} delay={0.5} />
            </div>
            <p className="text-[#EDEEE7] font-light text-xs md:text-sm transition-all duration-700 ease-out delay-100 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 mb-4">
              {cat.subtitle}
            </p>

            {cat.type === 'detailed_with_btn' && (
              <div className="transition-all duration-700 delay-200 rounded-full translate-y-0 opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 inline-block mt-2 md:mt-3 w-fit">
                <div className="relative px-6 py-2.5 rounded-full overflow-hidden transition-transform duration-500 active:scale-95 group/btn inline-block">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] transition-colors group-hover/btn:bg-white/20" />
                  <div className="absolute -inset-x-full inset-y-0 bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover/btn:animate-[shimmer_2s_infinite]" />
                  <span className="relative z-10 text-white text-xs font-medium uppercase tracking-widest flex items-center gap-2">
                    Shop <IoMdArrowForward className="-rotate-45" />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div key={`${cat.id}-${index}`} className={`shrink-0 pr-2 md:pr-4 h-[350px] md:h-[500px] ${cat.width}`}>
        {content}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-start mb-10 gap-5 px-5">
        <div className="lg:w-1/2 space-y-5">
          <Heading
            as="h2"
            title='Golfwear Collection'
          />
          <div className="header-animate flex gap-4 pt-4">
            <TransitionButton
              text="View Catalog"
              url="/shop"
              className="dark-button !bg-black !text-[#EDEEE7]"
              arrow
            />
            <TransitionButton
              text="Request Quote"
              url="/contact#teckpack"
              className="light-button"
            />
          </div>
        </div>
        <div className="lg:w-1/3 header-animate">
          <p className="text-lg text-neutral-500 leading-relaxed font-light">
            Comprehensive OEM, ODM, and private label production capabilities for sports teams, athletic clubs, and global apparel brands.
          </p>
        </div>
      </div>
      <section ref={containerRef} className="py-5 overflow-hidden">
        <div
          className="w-full relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={marqueeRef} className="flex flex-nowrap w-max will-change-transform">
            {categories.map((cat, i) => renderCard(cat, i, inView))}
            {categories.map((cat, i) => renderCard(cat, i + categories.length, inView))}
          </div>
        </div>

        <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `}</style>
      </section>
    </>
  );
};

export default PopularCategories;
