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

    return (
        <div 
            ref={containerRef} 
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            className="group flex flex-col gap-3 cursor-pointer"
        >
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
                
                {product.discountPercentage > 0 && (
                    <div className="absolute top-4 left-4 bg-black text-white text-[10px] uppercase tracking-widest px-2 py-1 z-10">
                        {product.discountPercentage}% OFF
                    </div>
                )}

                {/* Hover Zones Indicator (Optional visual aid, hidden) */}
                {hasThreeOrMore && (
                    <div className="absolute inset-0 flex z-20">
                        <div className="flex-1" />
                        <div className="flex-1" />
                        <div className="flex-1" />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="group-hover:text-black transition-colors">
                    {product.name}
                </h3>
                <div className="flex gap-3 items-center">
                    <span className="text-sm font-bold tracking-tight">
                        ₹{product.sellingPrice.toLocaleString()}
                    </span>
                    {product.mrp > product.sellingPrice && (
                        <span className="text-xs text-zinc-400 line-through">
                            ₹{product.mrp.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
