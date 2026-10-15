'use client';

import { useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    let locomotiveScroll: any;

    const initLocomotive = async () => {
      // Respect prefers-reduced-motion accessibility preference
      if (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      // Import dynamically to avoid SSR issues
      const LocomotiveScroll = (await import('locomotive-scroll')).default;

      // Prevent GSAP lag smoothing from pausing or stuttering smooth scrolling
      gsap.ticker.lagSmoothing(0);

      locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
          wrapper: window,
          content: document.documentElement,
          lerp: 0.1, // 0.1 provides fluid, responsive momentum (0.001 caused 99.9% scroll resistance)
          duration: 1.2,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1,
          syncTouch: false, // Preserve hardware-accelerated native momentum on touch screens
          infinite: false,
        },
        scrollCallback: () => ScrollTrigger.update(),
        initCustomTicker: (render: () => void) => {
          gsap.ticker.add(render);
        },
        destroyCustomTicker: (render: () => void) => {
          gsap.ticker.remove(render);
        },
      });
    };

    initLocomotive();

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, []);

  return <div data-scroll-container>{children}</div>;
};

export default SmoothScroll;
