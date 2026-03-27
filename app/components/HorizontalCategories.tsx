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
    title: "Sports Collection",
    description: "Explore our thoughtfully designed clothing and accessories for women, balancing contemporary style with enduring quality.",
    img: "https://i.pinimg.com/736x/ea/14/62/ea1462687561612f83a6436f4073165f.jpg",
    url: "/shop?category=sport"
  },
  {
    title: "Team Collection",
    description: "Discover premium menswear that combines modern aesthetics with classic craftsmanship for every occasion.",
    img: "https://i.pinimg.com/736x/f7/7b/95/f77b95f1e220d0ba92fe049ef6ec0b5a.jpg",
    url: "/shop?category=team"
  },
  {
    title: "Casual Collection",
    description: "Comfortable, durable, and stylish clothing designed for the next generation of trendsetters.",
    img: "https://i.pinimg.com/1200x/04/af/87/04af87fc18f01e6398fe32bc8bda3f89.jpg",
    url: "/shop?category=casual"
  },
  {
    title: "Fitness Collection",
    description: "The perfect finishing touch. From leather goods to statement pieces that define your style.",
    img: "https://i.pinimg.com/1200x/0a/a5/06/0aa506c761fd47a8bc55e461ae8f4357.jpg",
    url: "/shop?category=fitness"
  }
];

const HorizontalCategories = () => {


  const { transitionTo } = useLoader();
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!section || !scrollContainer) return;

    const scrollWidth = scrollContainer.offsetWidth - window.innerWidth;

    gsap.to(scrollContainer, {
      x: () => -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 3.5,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="h-[95vh] md:h-screen w-full overflow-hidden">
      <div ref={scrollContainerRef} className="h-full flex w-fit p-5 gap-3 md:gap-4">
        {CATEGORIES.map((cat, index) => {
          const isActive = activeCategory === index;
          return (
            <div
              onClick={() => { transitionTo(cat.url) }}
              key={index}
              onMouseEnter={() => setActiveCategory(index)}
              className={cn(
                'category-item group h-full relative flex flex-col gap-2 justify-end shrink-0 rounded-[2vw] overflow-hidden transition-all duration-700 ease-in-out cursor-pointer',
                isActive ? 'w-screen md:w-[50vw]' : 'w-screen md:w-[25vw]'
              )}
            >
              {/* Background image */}
              <div className="absolute inset-0 size-full z-[-1] overflow-hidden">
                <img
                  className={cn(
                    'absolute top-0 left-1/2 -translate-x-1/2 h-full min-w-[100vw] md:min-w-[50vw] object-cover transition-transform duration-2000 ease-out',
                    isActive ? 'scale-115' : 'scale-100'
                  )}
                  src={cat.img}
                  alt={cat.title}
                />
              </div>

              {/* Content overlay */}
              <div className={cn(
                'category-content flex flex-col gap-4 p-6 md:p-12 size-full justify-end transition-all duration-700',
                isActive ? 'bg-black/50' : 'bg-black/20'
              )}>
                <div className="bg-linear-to-t from-black/90 via-black/20 to-transparent absolute inset-0 z-0 pointer-events-none" />

                <div className="relative z-10 w-full flex flex-col items-start">
                  <AnimatedSwapText
                    text={cat.title}
                    active={isActive}
                    tag="h3"
                    className="text-[#EDEEE7] text-3xl md:text-5xl lg:text-6xl font-bold mb-4 uppercase"
                    stagger={0.02}
                    delay={0.1}
                  />

                  <div className={cn(
                    'transition-all w-full duration-700 ease-out delay-200',
                    isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
                  )}>
                    <AnimatedSwapText
                      text={cat.description}
                      active={isActive}
                      className="w-[90%] text-[#EDEEE7]/90 tracking-wider text-sm md:text-lg mb-8"
                      stagger={0.005}
                      delay={0.2}
                    />

                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "text-black bg-[#EDEEE7] rounded-full w-14 h-14 flex items-center justify-center p-3 hover:scale-110 transition-all duration-500",
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      )}>
                        <IoMdArrowForward className="w-full h-full -rotate-45" />
                      </div>
                      <AnimatedSwapText
                        text="Explore Collection"
                        active={isActive}
                        className="text-[#EDEEE7] uppercase tracking-[0.2em] text-sm font-medium"
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
