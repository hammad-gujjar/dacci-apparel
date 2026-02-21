'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import TransitionButton from './TransitionButton';
import Heading from './Heading';
import { useLoader } from '../context/LoaderContext';

gsap.registerPlugin(ScrollTrigger);

const HomeMiddle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoader();

  useGSAP(() => {
    if (isLoading) return;

    // 1. Marquee Animation
    if (marqueeRef.current) {
      const marqueeContent = marqueeRef.current;
      const totalWidth = marqueeContent.scrollWidth / 2;

      gsap.to(marqueeContent, {
        x: -totalWidth,
        duration: 30, // Slower for smoothness
        ease: "none",
        repeat: -1,
      });
    }

    // 2. Story Section Reveal (excluding heading which has its own)
    const storyParts = gsap.utils.toArray('.story-animate-smooth', containerRef.current);
    storyParts.forEach((part: any) => {
      gsap.fromTo(part,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: part,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // 3. Image Reveal Animation (Width 0 to 100%)
    const imageReveals = gsap.utils.toArray('.image-reveal-container', containerRef.current);
    imageReveals.forEach((reveal: any) => {
      gsap.fromTo(reveal,
        { width: "0%" },
        {
          width: "100%",
          duration: 1.8,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: reveal,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // 4. Staggered Highlights Reveal (Bottom 100% to 0)
    gsap.fromTo('.highlight-card',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: '.highlights-grid',
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Refresh ScrollTrigger once everything is set up
    ScrollTrigger.refresh();

  }, { dependencies: [isLoading], scope: containerRef });

  const marqueeText = "JOIN OUR MAILING LIST AND RECEIVE 10% OFF ON FIRST ORDER";

  return (
    <>
      <div ref={containerRef} className='w-full bg-black flex flex-col py-10'>
        {/* Marquee Section */}
        <div ref={sectionRef} className='w-full bg-[#EDEEE7] py-4 overflow-hidden border-y border-zinc-100 relative z-10'>
          <div className="flex whitespace-nowrap">
            <div ref={marqueeRef} className="flex">
              {[...Array(4)].map((_, i) => (
                <h1 key={i} className="inline-block">
                  {marqueeText} <span className="mx-10 text-black">•</span>
                </h1>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Story Section */}
        <div ref={storyRef} className="w-full min-h-screen py-20 px-5 md:px-10 flex flex-col gap-24 relative overflow-hidden">
          {/* Visual Flair (Optional background text) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/2 pointer-events-none uppercase select-none font-serif">
            Dacci
          </div>

          {/* Main Philosophy Section */}
          <div className="w-full flex flex-col md:flex-row gap-12 md:items-center relative z-10">
            <div className="w-full md:w-1/2 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="story-animate-smooth text-[#EDEEE7]/40 text-xs uppercase tracking-[0.5em] font-bold">The Philosophy</span>
                <Heading
                  title="ELEGANCE IN EVERY STITCH."
                  className="text-4xl md:text-7xl font-[main] text-[#EDEEE7]! uppercase tracking-tighter leading-none"
                />
              </div>

              <div className="story-animate-smooth max-w-md">
                <p className="text-[#EDEEE7]/60 text-lg md:text-xl font-light leading-relaxed">
                  We believe that true luxury lies in the details. Dacci is more than just a label;
                  it's a commitment to craftsmanship, timeless design, and the art of professional attire.
                </p>
              </div>

              <div className="story-animate-smooth mt-4">
                <TransitionButton
                  text="EXPLORE THE COLLECTION"
                  url="/shop"
                  className="dark-button"
                  arrow={true}
                />
              </div>
            </div>

            {/* Image Placeholder with Reveal Animation */}
            <div className="w-full md:w-1/2 aspect-4/5 relative group overflow-hidden rounded-[2vw]">
              <div className="image-reveal-container h-full border border-[#EDEEE7]/10 relative overflow-hidden">
                {/* Fixed width content container to prevent shrinking */}
                <div className="w-[calc(100vw-3rem)] md:w-[calc(40vw)] h-full absolute top-0 left-0">
                  <div className="absolute inset-4 border border-[#EDEEE7]/5 rounded-[1.5vw] flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <img src="https://i.pinimg.com/1200x/89/51/ec/8951ec93e815a5bc4dfbe29e5617f792.jpg" className='size-full object-cover' alt="media" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Collection Highlights */}
          <div className="highlights-grid w-full grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">
            {[
              { title: "Craftsmanship", desc: "Hand-finished details from artisanal workshops.", img: 'https://i.pinimg.com/1200x/5f/9f/85/5f9f8567c395da288c43bdaaf960ab2f.jpg' },
              { title: "Modern Fit", desc: "Tailored for the contemporary silhouette.", img: 'https://i.pinimg.com/1200x/1a/ef/14/1aef1433de94f66332347971b4f2f062.jpg' },
              { title: "Premium Fabrics", desc: "Sourced from the finest global textile mills.", img: 'https://i.pinimg.com/1200x/6b/c2/fc/6bc2fccccc6cfbfb939fc2be3dbfb813.jpg' }
            ].map((item, i) => (
              <div key={i} className="highlight-card flex flex-col gap-6">
                <div className="aspect-4/3 relative overflow-hidden rounded-[1.5vw]">
                  <div className="h-full bg-[#EDEEE7]/5 border border-[#EDEEE7]/10 relative overflow-hidden">
                    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center whitespace-nowrap">
                      <img className='size-full object-cover' src={item.img} alt="" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#EDEEE7] text-xl font-[main] uppercase tracking-tighter">{item.title}</h3>
                  <p className="text-[#EDEEE7]/40 text-xs leading-relaxed max-w-[250px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeMiddle;
