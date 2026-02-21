'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface ProductGalleryProps {
    productName: string;
    mainImage: string;
    currentMedia: any[];
    activeImageIndex: number;
    setActiveImageIndex: (index: number) => void;
    currentDiscount: number;
    setIsMarqueeOpen: (open: boolean) => void;
}

const ProductGallery = ({
    productName,
    mainImage,
    currentMedia,
    activeImageIndex,
    setActiveImageIndex,
    currentDiscount,
    setIsMarqueeOpen
}: ProductGalleryProps) => {
    const mainImageRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    // Custom Cursor Logic
    useGSAP(() => {
        const moveCursor = (e: MouseEvent) => {
            if (!mainImageRef.current || !cursorRef.current) return;
            const rect = mainImageRef.current.getBoundingClientRect();
            
            if (
                e.clientX >= rect.left && 
                e.clientX <= rect.right && 
                e.clientY >= rect.top && 
                e.clientY <= rect.bottom
            ) {
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "power3.out"
                });
            } else {
                gsap.to(cursorRef.current, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3
                });
            }
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, { scope: mainImageRef });

    return (
        <div className="w-full lg:w-[60%] flex flex-col gap-6 product-image-section">
            <div 
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-100 h-32 w-32 -mt-16 -ml-16 rounded-full bg-black text-white flex items-center justify-center text-center p-4 text-[10px] uppercase tracking-[0.2em] font-bold opacity-0 scale-0 leading-tight shadow-2xl"
            >
                View Gallery
            </div>

            <div 
                ref={mainImageRef}
                onClick={() => setIsMarqueeOpen(true)}
                className="aspect-4/5 bg-zinc-200/50 relative overflow-hidden group/main cursor-none rounded-[1.5vw]"
            >
                <Image 
                    src={mainImage} 
                    alt={productName} 
                    fill 
                    className="object-cover group-hover/main:scale-105 transition-transform duration-[2.5s] ease-out"
                    priority
                />
                {currentDiscount > 0 && (
                    <div className="absolute top-8 left-8 bg-black text-white px-6 py-3 text-[10px] uppercase tracking-[0.4em] font-bold shadow-xl border border-white/10">
                        {currentDiscount}% OFF
                    </div>
                )}
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
                {currentMedia.map((m: any, i: number) => (
                    <div 
                        key={i} 
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex(i);
                        }}
                        className={`aspect-square bg-white/50 relative overflow-hidden rounded-[1vw] transition-all cursor-pointer border group ${
                            activeImageIndex === i ? "border-black scale-95" : "border-black/5 hover:border-black/20"
                        }`}
                    >
                        <Image src={m.secure_url} alt={`${productName} ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;
