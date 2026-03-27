'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import { IoStar, IoStarOutline, IoStarHalf } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { useLoader } from '@/app/context/LoaderContext';

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
  text.split(' ').map((word, wi) => (
    <div key={wi} className="flex overflow-hidden">
      {word.split('').map((char, ci) => (
        <span key={ci} className="hero-char inline-block translate-y-full">
          {char}
        </span>
      ))}
    </div>
  ));

// ─── HeroSection ─────────────────────────────────────────────────────────────
const HeroSection = ({ arrivalData }: HeroSectionProps) => {
  const { isLoading, transitionTo } = useLoader();

  const heroRef        = useRef<HTMLDivElement>(null);
  const productCardRef = useRef<HTMLDivElement>(null);

  // Showcase state
  const [showcaseUsers, setShowcaseUsers] = useState<ShowcaseUser[]>([]);
  const [userCount,     setUserCount]     = useState<number>(0);
  const [avgRating,     setAvgRating]     = useState<number>(0);

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

  // ── Hero entrance animations ──────────────────────────────────────────────
  useGSAP(() => {
    if (!isLoading) {
      // Character stagger animation
      const chars = heroRef.current?.querySelectorAll('.hero-char');
      if (chars && chars.length > 0) {
        gsap.to(chars, {
          y: '0%',
          duration: 0.5,
          delay: 1.1,
          ease: 'power2.out',
          stagger: 0.02,
        });
      }
    }
  }, { dependencies: [isLoading], scope: heroRef });

  // ─── Render ────────────────────────────────────────────────────────────────
  const latest = arrivalData[0];
  const latestImg = latest?.media?.[0]?.secure_url;

  return (
    <div ref={heroRef} className="w-screen h-[92vh] md:h-screen relative overflow-hidden">
      <div className='size-full absolute top-0 left-0 bg-linear-to-t from-black/80 via-black/20 to-transparent'></div>
      {/* Background video */}
      <video
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full -z-1"
      />

      {/* Overlay content */}
      <div className="absolute top-0 left-0 size-full flex flex-col justify-end p-5 md:p-10 gap-2 z-[2]">

        {/* ── User Showcase ───────────────────────────────────────────────── */}
        <div className="w-full md:w-[90%] mb-3">
          <div
            className="flex items-center w-fit px-3 py-1.5 rounded-full border border-white/10"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            {/* Overlapping profile images */}
            <div className="flex items-center">
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

            {/* User count */}
            <div className="flex flex-col ml-3 gap-1">
              <span className="text-[#EDEEE7] text-xs font-semibold leading-tight">
                {userCount > 0 ? `${userCount.toLocaleString()}+` : '...'} customers
              </span>
              <span className="text-[#EDEEE7]/40 text-[9px] uppercase tracking-widest">
                happy &amp; growing
              </span>
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-white/10 mx-3" />

            {/* Avg. Rating */}
            <div className="flex flex-col items-start gap-1">
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
                  {avgRating > 0 ? avgRating.toFixed(1) : '—'}
                </span>
              </div>
              <span className="text-[#EDEEE7]/40 text-[10px] tracking-widest">
                Avg. Rating
              </span>
            </div>
          </div>
        </div>

        {/* ── Hero title ─────────────────────────────────────────────────── */}
        <div className="w-full md:w-[65%]">
          <h1 className="text-[#EDEEE7]! w-full uppercase flex flex-wrap gap-x-[0.3em]">
            {splitText('High-Quality Clothing Manufacturer Low MOQ for Startups')}
          </h1>
        </div>

        {/* ── Hero subtitle ──────────────────────────────────────────────── */}
        <div className="w-full md:w-[60%] md:mt-4 mt-2">
          <p className="text-[#EDEEE7]! w-full flex flex-wrap gap-x-[0.3em]">
            {splitText(
              'Daccia Apparel is a classic and modern clothing brand that promote classic formal and streatwear clothes and custom manufacturing for clients even in bulk and quality you can see in website'
            )}
          </p>
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
  );
};

export default HeroSection;
