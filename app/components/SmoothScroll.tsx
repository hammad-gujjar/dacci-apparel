'use client';

import { useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    let locomotiveScroll: any;

    const initLocomotive = async () => {
      // Import dynamically to avoid SSR issues
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      
      locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
          wrapper: window,
          content: document.documentElement,
          lerp: 0.001, // Adjusted for smooth lerpness (0.1 is standard smooth, lower is smoother)
          duration: 1.2,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        },
      });

      // Locomotive v5 uses Lenis under the hood for smoothness
      // and automatically syncs with ScrollTrigger and others.
      // We can access the lenis instance if needed:
      // locomotiveScroll.lenis
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
