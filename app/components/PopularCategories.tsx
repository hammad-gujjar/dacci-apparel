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
    id: 'man',
    type: 'detailed',
    title: "men's top",
    subtitle: "Designed to last",
    image: "https://i.pinimg.com/736x/09/76/cf/0976cff2a137e7cefe03baada5ca6e74.jpg",
    width: "w-[280px] md:w-[400px]",
  },
  {
    id: 'women',
    type: 'detailed',
    title: "Women",
    subtitle: "Elegance redefined",
    image: "https://i.pinimg.com/736x/91/07/6a/91076a498ecc85a30091c6f500f378c4.jpg",
    width: "w-[280px] md:w-[400px]",
  },
  {
    id: 'autumn',
    type: 'detailed',
    title: "Autumn",
    subtitle: "Warm layers",
    image: "https://i.pinimg.com/1200x/f9/1b/38/f91b38b62b069ff7d769ab4311627d7b.jpg",
    width: "w-[280px] md:w-[400px]",
  },
  {
    id: 'shoes',
    type: 'simple',
    title: "Shoes",
    image: "https://i.pinimg.com/1200x/64/25/ad/6425ad018953f7a520aa907496cd6b85.jpg",
    width: "w-[280px] md:w-[400px]",
  },
  {
    id: 'girls',
    type: 'detailed_with_btn',
    title: "Girl's Top",
    subtitle: "Mysterious everyday",
    image: "https://i.pinimg.com/1200x/55/e5/29/55e5298261a13271488f08ed61488543.jpg",
    width: "w-[280px] md:w-[400px]",
  },
  {
    id: 'acc',
    type: 'simple',
    title: "Acc.",
    image: "https://i.pinimg.com/736x/a6/c3/3b/a6c33b26fdb8d433ac4dd1e0a5226d53.jpg",
    width: "w-[280px] md:w-[400px]",
  },
  {
    id: 'essential',
    type: 'simple',
    title: "Basic",
    image: "https://i.pinimg.com/1200x/eb/b6/7e/ebb67eaa0d380249978d690bd365da2a.jpg",
    width: "w-[280px] md:w-[400px]",
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
    const href = `/shop?tags=${cat.title}`;

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
            <img src={cat.image} alt={cat.title} className="size-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000 ease-out" />
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
            <img src={cat.image} alt={cat.title} className="size-full object-cover scale-105 group-hover:scale-110 transition-transform duration-2000 ease-out object-center" />
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/40 transition-colors duration-700" />
          </div>

          <div className="absolute top-4 right-4 z-30 size-8 md:size-10 border border-white/30 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all duration-500">
            <IoMdArrowForward className="-rotate-45 text-white group-hover:text-black text-lg transition-colors" />
          </div>

          <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 z-20 space-y-1">
            <div className="transition-all duration-700 ease-out translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
              <AnimatedSwapText text={cat.title} active={inView} className="text-[#EDEEE7] text-[20px] md:text-[28px] font-medium mb-1 font-[main]" stagger={0.02} delay={0.5} />
            </div>
            <p className="text-[#EDEEE7] font-light text-xs md:text-sm transition-all duration-700 ease-out delay-100 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 mb-4">
              {cat.subtitle}
            </p>

            {cat.type === 'detailed_with_btn' && (
              <div className="transition-all duration-700 delay-200 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 hidden md:inline-block mt-3 w-fit">
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
      <section ref={containerRef} className="py-5 overflow-hidden">
        <div
          className="w-full relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={marqueeRef} className="flex flex-nowrap w-max">
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
