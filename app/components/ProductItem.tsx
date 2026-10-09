'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoader } from '@/app/context/LoaderContext';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ProductItemProps {
    product: any;
}

const ProductItem = ({ product }: ProductItemProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const { transitionTo } = useLoader();

    const media = product.media || [];
    const images = media.length > 0 ? media.map((m: any) => m.secure_url) : ['/placeholder.png'];
    const hasMultipleImages = images.length >= 2;
    const hasThreeOrMore = images.length >= 3;

    useGSAP(() => {
        if (!containerRef.current) return;

        gsap.from(containerRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            }
        });
    }, { scope: containerRef });

    const handleClick = () => {
        transitionTo(`/product/${product.slug}`);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!hasThreeOrMore) return;
        
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        
        if (x < width / 3) {
            setActiveIndex(0);
        } else if (x < (width / 3) * 2) {
            setActiveIndex(1);
        } else {
            setActiveIndex(2);
        }
    };

    const handleMouseEnter = () => {
        if (images.length === 2) {
            setActiveIndex(1);
        }
    };

    const handleMouseLeave = () => {
        setActiveIndex(0);
    };

    const categoryName = (typeof product.category === 'object' && product.category?.name)
        ? product.category.name
        : (typeof product.category === 'string' && product.category
            ? product.category
            : (product.productType || 'Custom Sportswear'));

    const CTA_TEXT = "REQUEST QUOTE & TECH PACK";

    return (
        <div 
            ref={containerRef} 
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            className="group flex flex-col gap-3 cursor-pointer"
        >
            {/* 1. Product Image */}
            <div className="aspect-3/4 overflow-hidden bg-zinc-100 relative">
                {images.slice(0, 3).map((img: string, idx: number) => (
                    <Image
                        key={img}
                        src={img}
                        alt={product.name}
                        fill
                        className={cn(
                            "object-cover transition-all duration-700 ease-in-out",
                            activeIndex === idx 
                                ? "opacity-100 blur-0 scale-105" 
                                : "opacity-0 blur-xl scale-110"
                        )}
                        priority={idx === 0}
                    />
                ))}
                
                {/* B2B Manufacturing Badges - Desktop (Original separated layout) */}
                <div className="hidden sm:block absolute top-3 left-3 bg-black/85 backdrop-blur-xs text-white text-[9px] uppercase tracking-widest px-2.5 py-1 z-10 font-bold">
                    OEM / ODM Available
                </div>
                <div className="hidden sm:block absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-black text-[9px] uppercase tracking-wider px-2 py-1 z-10 font-bold border border-black/10">
                    MOQ 50 PCS
                </div>

                {/* B2B Manufacturing Badges - Mobile (Stacked layout) */}
                <div className="sm:hidden absolute top-2 left-2 flex flex-col items-start gap-1.5 z-10">
                    <div className="bg-black/85 backdrop-blur-xs text-white text-[7px] uppercase tracking-widest px-1.5 py-1 font-bold">
                        OEM / ODM
                    </div>
                    <div className="bg-white/95 backdrop-blur-xs text-black text-[7px] uppercase tracking-wider px-1.5 py-1 font-bold border border-black/10">
                        MOQ 50
                    </div>
                </div>

                {/* Hover Zones Indicator (Optional visual aid, hidden) */}
                {hasThreeOrMore && (
                    <div className="absolute inset-0 flex z-20">
                        <div className="flex-1" />
                        <div className="flex-1" />
                        <div className="flex-1" />
                    </div>
                )}
            </div>

            {/* 2. Category Name, 3. Product Name, 4. Request Quote CTA */}
            <div className="flex flex-col gap-2 flex-1 justify-between">
                <div className="flex flex-col gap-1">
                    {/* 2. Dynamic Category Name */}
                    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-black/50 font-bold font-[middle]">
                        {categoryName}
                    </span>

                    {/* 3. Dynamic Product Name */}
                    <h3 className="text-sm md:text-base font-bold text-black uppercase tracking-tight group-hover:text-black/70 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </div>

                {/* 4. Request Quote CTA Button */}
                <div className="w-full pt-1">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick();
                        }}
                        className="group/btn relative w-full py-3 px-3 sm:px-4 bg-white text-black hover:bg-black hover:text-white border border-black/15 flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ease-out active:scale-[0.97] cursor-pointer overflow-hidden select-none rounded-none"
                    >
                        <span className="relative inline-flex items-center overflow-hidden leading-tight">
                            {CTA_TEXT.split('').map((char, i) => (
                                <span
                                    key={i}
                                    className="relative inline-flex flex-col overflow-hidden"
                                >
                                    {/* Primary character: rolls UP out of view on hover */}
                                    <span
                                        className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/btn:-translate-y-full will-change-transform text-black group-hover/btn:text-white"
                                        style={{ transitionDelay: `${i * 12}ms` }}
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>
                                    {/* Duplicate character: rolls UP into view on hover */}
                                    <span
                                        className="absolute top-full left-0 inline-block text-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/btn:-translate-y-full will-change-transform"
                                        style={{ transitionDelay: `${i * 12}ms` }}
                                        aria-hidden="true"
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>
                                </span>
                            ))}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
