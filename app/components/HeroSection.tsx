'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import { IoStar, IoStarOutline, IoStarHalf } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { useLoader } from '@/app/context/LoaderContext';
import TransitionButton from './TransitionButton';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ──────────────────────────────────────────────────────────────────
interface ShowcaseUser {
  _id: string;
  name?: string;
  image?: string;
}

interface HeroSectionProps {
  arrivalData: any[];
}

// ─── Star Renderer ───────────────────────────────────────────────────────────
const renderStars = (
  rating: number,
  size: string = 'text-xl',
  interactive = false,
  onSelect?: (r: number) => void
) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isFull = i <= Math.floor(rating);
    const isHalf = i === Math.ceil(rating) && rating % 1 !== 0;
    stars.push(
      <button
        key={i}
        type="button"
        disabled={!interactive}
        onClick={() => onSelect?.(i)}
        className={cn(interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default')}
      >
        {isFull ? (
          <IoStar className={cn('text-black', size)} />
        ) : isHalf ? (
          <IoStarHalf className={cn('text-black', size)} />
        ) : (
          <IoStarOutline className={cn('text-black/10', size)} />
        )}
      </button>
    );
  }
  return stars;
};

// ─── Text split helper ───────────────────────────────────────────────────────
const splitText = (text: string) =>
  text.split(' ').map((word, wi, arr) => (
    <span key={wi} className="inline-flex whitespace-nowrap overflow-hidden shrink-0">
      {word.split('').map((char, ci) => (
        <span key={ci} className="hero-char inline-block translate-y-full">
          {char}
        </span>
      ))}
      {wi < arr.length - 1 && <span className="sr-only">{' '}</span>}
    </span>
  ));

// ─── HeroSection ─────────────────────────────────────────────────────────────
const HeroSection = ({ arrivalData }: HeroSectionProps) => {
  const { isLoading, transitionTo } = useLoader();

  const heroRef = useRef<HTMLDivElement>(null);
  const productCardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const showcaseContentRef = useRef<HTMLDivElement>(null);
  const showcaseInnerRef = useRef<HTMLDivElement>(null);


  // Showcase state
  const [showcaseUsers, setShowcaseUsers] = useState<ShowcaseUser[]>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [avgRating, setAvgRating] = useState<number>(0);

  // ── Fetch showcase data ────────────────────────────────────────────────────
  useEffect(() => {
    const fetchShowcaseData = async () => {
      try {
        const [usersRes, statsRes] = await Promise.all([
          axios.get('/api/public/users'),
          axios.get('/api/public/stats'),
        ]);
        if (usersRes.data.success) {
          setShowcaseUsers(usersRes.data.data.users);
          setUserCount(usersRes.data.data.totalCount);
        }
        if (statsRes.data.success) {
          setAvgRating(statsRes.data.data.averageRating);
        }
      } catch (err) {
        console.error('Error fetching showcase data:', err);
      }
    };
    fetchShowcaseData();
  }, []);

  // ── Product card slide-in ─────────────────────────────────────────────────
  useGSAP(() => {
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

    if (!isLoading && arrivalData.length > 0 && productCardRef.current) {
      gsap.to(productCardRef.current, {
        x: '0%',
        opacity: 1,
        duration: 1,
        delay: 0.7,
        ease: 'power2.out',
      });
    }
  }, { dependencies: [isLoading, arrivalData] });

  const marqueeText = <>LOW MOQs <span className="mx-2 font-[middle] text-[#EDEEE7]! font-extrabold">&</span> FULLY CUSTOMIZABLE SPORTSWEAR | EXPERT OEM <span className="mx-2 font-[middle] text-[#EDEEE7]! font-extrabold">&</span> ODM SERVICES</>;

  // ── Hero entrance animations ──────────────────────────────────────────────
  useGSAP(() => {
    if (!isLoading) {
      // Character stagger animation
      const chars = heroRef.current?.querySelectorAll('.hero-char');
      if (chars && chars.length > 0) {
        gsap.to(chars, {
          y: '0%',
          duration: 0.3,
          delay: 1,
          ease: 'power2.out',
          stagger: 0.02,
        });
      }
    }
  }, { dependencies: [isLoading], scope: heroRef });

  // ── Customer Showcase Pill Animation ─────────────────────────────────────
  useGSAP(() => {
    if (isLoading || !showcaseContentRef.current || !showcaseInnerRef.current) return;

    // Accessibility: Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(showcaseContentRef.current, { width: 'auto', opacity: 1 });
      gsap.set(showcaseInnerRef.current, { x: 0 });
      return;
    }

    // Initial collapsed state: only profile avatars visible
    gsap.set(showcaseContentRef.current, { width: 0, opacity: 0 });
    gsap.set(showcaseInnerRef.current, { x: -20 });

    // Measure target width once to avoid forced synchronous layout flushes during animation loops
    const targetWidth = showcaseInnerRef.current?.offsetWidth || 230;

    const tl = gsap.timeline({ repeat: -1 });

    tl
      // 1. Wait 2.5 seconds in the collapsed state
      .to({}, { duration: 2.5 })
      // 2. Smoothly expand from left to right to exact original full width
      .to(showcaseContentRef.current, {
        width: targetWidth,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      })
      .to(
        showcaseInnerRef.current,
        {
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '<'
      )
      // 3. Keep fully expanded for 2 seconds
      .to({}, { duration: 2.0 })
      // 4. Smoothly collapse back to 3-profile state
      .to(showcaseContentRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      })
      .to(
        showcaseInnerRef.current,
        {
          x: -20,
          duration: 0.8,
          ease: 'power2.in',
        },
        '<'
      );

    // Performance: Pause timeline when hero scrolls out of view to avoid offscreen backdrop blur repaints
    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => tl.play(),
      onLeave: () => tl.pause(),
      onEnterBack: () => tl.play(),
      onLeaveBack: () => tl.pause(),
    });

    return () => {
      trigger.kill();
      tl.kill();
    };
  }, { dependencies: [isLoading, userCount, avgRating], scope: heroRef });

  // ─── Render ────────────────────────────────────────────────────────────────
  const latest = arrivalData[0];
  const latestImg = latest?.media?.[0]?.secure_url;

  return (
    <>
      <div ref={heroRef} className="w-screen h-[90vh] md:h-screen relative overflow-hidden">
        <div className='size-full absolute top-0 left-0 bg-linear-to-t from-black/40 via-black/10 to-transparent'></div>
        {/* Background video */}
        {/* Background image - LCP element, load eagerly with high fetch priority */}
        <img
          className='hidden md:block object-cover size-full'
          src="images/1-hero-section-image/custom-sportswear-manufacturer-hero.webp"
          alt="Slots Sportswear custom sportswear and private label manufacturing showcase"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <img
          className='block md:hidden object-cover size-full'
          src="images/1-hero-section-image/mobilehero.jpg"
          alt="Slots Sportswear athletic apparel production and private label sportswear"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        {/* Overlay content */}
        <div className="absolute top-0 left-0 size-full flex flex-col justify-end p-5 md:p-10 gap-2 z-2">

          {/* ── User Showcase ───────────────────────────────────────────────── */}
          <div className="w-full md:w-[90%] mb-3">
            <div
              className="flex items-center w-fit px-3 py-1.5 rounded-full border border-white/10 overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                transform: 'translateZ(0)',
              }}
            >
              {/* Overlapping profile images */}
              <div className="flex items-center relative z-10 shrink-0">
                {(showcaseUsers.length > 0 ? showcaseUsers : new Array(3).fill(null)).map(
                  (user, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'w-8 h-8 rounded-full border-2 border-black/60 overflow-hidden bg-zinc-700 shrink-0',
                        idx !== 0 && '-ml-3'
                      )}
                      style={{ zIndex: 10 - idx }}
                    >
                      <img
                        src={
                          user?.image ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=3f3f46&color=fff&bold=true`
                        }
                        alt={user?.name || 'User'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                )}
              </div>

              {/* Collapsible details container */}
              <div
                ref={showcaseContentRef}
                className="flex items-center overflow-hidden shrink-0 relative z-0"
                style={{ width: 0, opacity: 0, willChange: 'width, opacity' }}
              >
                <div
                  ref={showcaseInnerRef}
                  className="flex items-center shrink-0 w-max"
                  style={{ transform: 'translateX(-20px)' }}
                >
                  {/* User count */}
                  <div className="flex flex-col ml-3 gap-1 shrink-0">
                    <span className="text-[#EDEEE7] text-xs font-semibold leading-tight whitespace-nowrap">
                      {userCount > 0 ? `${userCount.toLocaleString()}+` : '...'} customers
                    </span>
                    <span className="text-[#EDEEE7]/40 text-[9px] uppercase tracking-widest whitespace-nowrap">
                      happy &amp; growing
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-6 bg-white/10 mx-3 shrink-0" />

                  {/* Avg. Rating */}
                  <div className="flex flex-col items-start gap-1 shrink-0">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <IoStar
                          key={s}
                          className={cn(
                            'text-[11px]',
                            avgRating > 0 && s <= Math.round(avgRating)
                              ? 'text-[#facc15]'
                              : 'text-white/20'
                          )}
                        />
                      ))}
                      <span className="text-[#EDEEE7] text-[10px] font-bold ml-1">
                        {avgRating > 0 ? avgRating.toFixed(1) : '-'}
                      </span>
                    </div>
                    <span className="text-[#EDEEE7]/40 text-[10px] tracking-widest whitespace-nowrap">
                      Avg. Rating
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Hero title ─────────────────────────────────────────────────── */}
          <div className="w-full md:w-[70%]">
            <h1
              aria-label="Private Label Sportswear Manufacturing for Small, Growing Brands"
              className="text-[#EDEEE7]! w-full uppercase flex flex-wrap gap-x-[0.3em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[main] leading-tight"
            >
              {splitText('Private Label Sportswear Manufacturing for Small, Growing Brands')}
            </h1>
          </div>

          {/* ── Hero subtitle ──────────────────────────────────────────────── */}
          <div className="w-full md:w-[60%] md:mt-4 mt-2">
            <p className="text-[#EDEEE7]! w-full flex flex-wrap gap-x-[0.3em]">
              {splitText(
                'Full-service OEM & private label apparel manufacturing. Custom sportswear produced with low MOQ options and international export for growing athletic brands.'
              )}
            </p>
          </div>

          {/* ── Hero CTA buttons ───────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <TransitionButton
              text="Request A Quote"
              url="/contact#teckpack"
              className="light-button !rounded-full px-7 py-3.5 bg-[#EDEEE7] !text-black font-semibold border-none"
              arrow
              rollingText
            />
            <TransitionButton
              text="View Manufacturing Process"
              url="/manufacturing-process"
              className="dark-button !rounded-full px-7 py-3.5"
              arrow
              rollingText
            />
          </div>
        </div>

        {/* ── Latest Product Card (parallelogram, right side) ─────────────────── */}
        {latest && (
          <div
            ref={productCardRef}
            onClick={() => transitionTo(`/product/${latest.slug}`)}
            className="absolute w-[300px] h-fit right-10 top-2/5 z-10 hidden md:flex border border-white/20 cursor-pointer hover:scale-[1.03] transform translate-x-[120%] rounded-[2vw] transition-transform duration-300"
            style={{
              background: 'rgba(237, 238, 231, 0.08)',
              backdropFilter: 'blur(15px) saturate(1)',
              WebkitBackdropFilter: 'blur(15px) saturate(1)',
            }}
          >
            <div className="w-full flex items-center gap-4 p-5">
              {/* Product image */}
              {latestImg && (
                <div className="shrink-0 w-16 h-20 rounded-xl overflow-hidden border border-white/10">
                  <img src={latestImg} alt={latest.name} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Product info */}
              <div className="flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EDEEE7] opacity-70 shrink-0" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#EDEEE7]/60">New</span>
                </div>
                <p className="!text-[#EDEEE7] font-bold uppercase truncate">{latest.name}</p>
                <span className="text-[#EDEEE7] text-[10px] tracking-[0.4em] truncate">{latest.description}</span>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {renderStars(latest.averageRating || 0, 'text-lg')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Marquee Section */}
      <div ref={sectionRef} className='w-full bg-black mt-10 p-5 overflow-hidden relative z-10'>
        <div className="flex whitespace-nowrap">
          <div ref={marqueeRef} className="flex will-change-transform">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="inline-block text-[#EDEEE7]! font-[main] text-[35px] uppercase">
                {marqueeText} <span className="mx-10 text-[#EDEEE7]!">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
