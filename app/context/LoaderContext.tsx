'use client';

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface LoaderContextType {
    isLoading: boolean;
    setIsReady: (ready: boolean) => void;
    transitionTo: (url: string) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const [progress, setProgress] = useState(0);
    const loaderRef = useRef<HTMLDivElement>(null);
    const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const isFirstLoad = useRef(true);

    gsap.registerPlugin(useGSAP);


    // GSAP-driven progress animation — called from animateIn/animateOut directly
    const animateProgress = (from: number, to: number, duration: number, onDone?: () => void) => {
        const obj = { val: from };
        gsap.to(obj, {
            val: to,
            duration,
            ease: 'none',
            onUpdate: () => setProgress(Math.round(obj.val)),
            onComplete: onDone,
        });
    };


    const { contextSafe } = useGSAP(() => {
        // Continuous Marquee Animation
        if (marqueeRef.current) {
            gsap.to(marqueeRef.current, {
                xPercent: -50,
                duration: 15,
                ease: "none",
                repeat: -1
            });
        }

        if (isFirstLoad.current && loaderRef.current) {
            // Ensure loader is active and covering on first load
            gsap.set(loaderRef.current, { display: 'flex' });
            const cols = columnsRef.current.filter(Boolean);
            gsap.set(cols, { yPercent: 0 }); // Cover the screen immediately

            const needsCoordination = pathname === '/';
            if (isReady || !needsCoordination) {
                // Count 0→100 over 1.8s to match the 1800ms delay
                animateProgress(0, 100, 1.8);
                const delay = setTimeout(() => {
                    animateOut();
                    isFirstLoad.current = false;
                }, 1800);
                return () => clearTimeout(delay);
            }

            // Fallback: count 0→100 over 4s
            animateProgress(0, 100, 4);
            const fallback = setTimeout(() => {
                if (isFirstLoad.current) {
                    animateOut();
                    isFirstLoad.current = false;
                }
            }, 4000);
            return () => clearTimeout(fallback);
        }
    }, { dependencies: [isReady, pathname], scope: loaderRef });

    const animateIn = contextSafe((onComplete: () => void) => {
        if (!loaderRef.current) return;

        gsap.set(loaderRef.current, { display: 'flex' });
        setProgress(0);

        const cols = columnsRef.current.filter(Boolean);
        gsap.set(cols, { yPercent: 100 });

        // Count 0→100 over the exact same 0.8s the columns rise
        animateProgress(0, 100, 0.8);

        gsap.to(cols, {
            yPercent: 0,
            duration: 0.8,
            ease: "power4.inOut",
            stagger: {
                amount: 0.4,
                from: "random"
            },
            onComplete: () => {
                setIsLoading(true);
                onComplete();
            }
        });

        gsap.to('.loader-content', {
            opacity: 1,
            duration: 0.4,
            delay: 0.4
        });
    });

    const animateOut = contextSafe(() => {
        if (!loaderRef.current) return;

        const cols = columnsRef.current.filter(Boolean);

        gsap.to('.loader-content', {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                setIsLoading(false); // Reveal next page
            }
        });

        // Go to bottom (Fall down)
        gsap.to(cols, {
            yPercent: 100,
            duration: 1,
            delay: 0.2,
            ease: "power4.inOut",
            stagger: {
                amount: 0.5,
                from: "random"
            },
            onComplete: () => {
                if (loaderRef.current) {
                    loaderRef.current.style.display = 'none';
                }
            }
        });
    });

    const transitionTo = (url: string) => {
        if (pathname === url) return;
        animateIn(() => {
            router.push(url);
        });
    };

    useEffect(() => {
        if (!isFirstLoad.current) {
            animateOut();
        }
    }, [pathname]);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsReady, transitionTo }}>
            <div 
                ref={loaderRef} 
                className="fixed inset-0 z-9999 flex overflow-hidden flex-col justify-center items-center pointer-events-none"
                style={{ display: 'flex', background: 'transparent' }}
            >
                {/* 10 Staggered Background Columns */}
                <div className="absolute inset-0 flex pointer-events-auto">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            ref={el => { columnsRef.current[i] = el; }}
                            className="flex-1 bg-black h-full border-x border-white/5"
                            style={{ transform: 'translateY(0%)' }} // Default to covering for first load
                        />
                    ))}
                </div>

                {/* Main Content Layer */}
                <div className="loader-content relative z-10 w-full h-full flex flex-col justify-center items-center text-white">
                    {/* Professional Marquee */}
                    <div className="w-full overflow-hidden flex whitespace-nowrap mb-12">
                        <div ref={marqueeRef} className="flex gap-16 items-center py-4">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="flex items-center gap-16">
                                    <h1 className="text-[#EDEEE7]!">DACCI</h1>
                                    <span className="size-4 md:size-8 rounded-full bg-[#EDEEE7]! opacity-40"></span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress Information */}
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-sm md:text-xl font-[main] tracking-[0.6em] text-[#EDEEE7]/30 uppercase font-bold">Initialising System</span>
                        <div className="flex items-end gap-1">
                            <span className="text-5xl md:text-8xl font-[main] tabular-nums">{progress.toString().padStart(2, '0')}</span>
                            <span className="text-xl md:text-2xl font-[main] opacity-30 mb-3 md:mb-5 tracking-widest">%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div 
                className="transition-opacity duration-300"
                style={{ opacity: isLoading ? 0 : 1, visibility: isLoading ? 'hidden' : 'visible' }}
            >
                {children}
            </div>
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
};