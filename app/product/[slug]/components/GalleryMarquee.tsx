'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { IoCloseOutline } from "react-icons/io5";

interface GalleryMarqueeProps {
    isMarqueeOpen: boolean;
    setIsMarqueeOpen: (open: boolean) => void;
    allImages: any[];
}

const GalleryMarquee = ({
    isMarqueeOpen,
    setIsMarqueeOpen,
    allImages
}: GalleryMarqueeProps) => {
    const marqueeContainerRef = useRef<HTMLDivElement>(null);
    const marqueeContentRef = useRef<HTMLDivElement>(null);

    // Marquee Animation
    useGSAP(() => {
        if (isMarqueeOpen && marqueeContentRef.current) {
            gsap.fromTo(marqueeContainerRef.current, 
                { opacity: 0, backdropFilter: 'blur(0px)' },
                { opacity: 1, backdropFilter: 'blur(32px)', duration: 0.8, ease: 'power4.out' }
            );

            const content = marqueeContentRef.current;
            const width = content.offsetWidth / 2;
            
            gsap.to(content, {
                x: -width,
                duration: 25,
                repeat: -1,
                ease: "none"
            });
        }
    }, [isMarqueeOpen]);

    if (!isMarqueeOpen) return null;

    return (
        <div 
            ref={marqueeContainerRef}
            onClick={() => setIsMarqueeOpen(false)}
            className="fixed inset-0 z-200 bg-black/90 flex flex-col justify-center items-center overflow-hidden cursor-pointer"
        >
            <button 
                onClick={(e) => { e.stopPropagation(); setIsMarqueeOpen(false); }}
                className="absolute top-12 right-12 z-210 p-8 hover:bg-white/10 rounded-full transition-all text-white/50 hover:text-white"
            >
                <IoCloseOutline size={40} />
            </button>

            <div className="w-full overflow-hidden whitespace-nowrap pointer-events-none">
                <div ref={marqueeContentRef} className="flex gap-10 md:gap-20 px-20 md:px-40 w-fit">
                    {[...Array(2)].map((_, groupIdx) => (
                        <div key={groupIdx} className="flex md:gap-20 gap-10">
                            {allImages.map((img, i) => (
                                <div key={i} className="w-[50vw] h-[50vh] md:h-[75vh] aspect-4/5 relative rounded-[3vw] overflow-hidden shrink-0 shadow-[0_100px_100px_-50px_rgba(0,0,0,0.8)] bg-zinc-900 border border-white/5">
                                    <Image 
                                        src={img.secure_url} 
                                        alt={`Overlay Image ${i}`} 
                                        fill 
                                        className="size-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            
            <h3 className="w-full text-center absolute bottom-10 left-0 text-white/10 uppercase font-bold pointer-events-none animate-pulse">
                <button
                    onClick={(e) => { e.stopPropagation(); setIsMarqueeOpen(false); }}
                    className="absolute bottom-15 right-1/3 z-210 p-8 hover:bg-white/10 rounded-full transition-all text-white/50 hover:text-white pointer-events-auto"
                >
                    <IoCloseOutline size={32} />
                </button>
                Endless Inspiration
            </h3>
        </div>
    );
};

export default GalleryMarquee;
