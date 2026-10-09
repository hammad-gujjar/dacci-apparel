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
  const storyRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoader();

  useGSAP(() => {
    if (isLoading) return;

    // 2. Story Section Reveal (excluding heading which has its own)
    const storyParts = gsap.utils.toArray('.story-animate-smooth', containerRef.current) as any[];
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
    const imageReveals = gsap.utils.toArray('.image-reveal-container', containerRef.current) as any[];
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

  return (
    <>
      <div ref={containerRef} className='w-full flex flex-col'>
        
        {/* Secondary Collection Highlights */}
        <div className="highlights-grid w-full grid grid-cols-2 md:grid-cols-3 gap-5 relative z-10 p-5">
          {[
            { 
              title: "Private Label Sportswear", 
              desc: "Private-label sportswear manufacturing for growing apparel brands.", 
              img: 'https://i.pinimg.com/1200x/09/30/41/093041bbdd205a7676b5a38c1d6e646b.jpg',
              alt: "Private label sportswear manufacturing and brand packaging"
            },
            { 
              title: "Cut & Sew Manufacturing", 
              desc: "Precision cut-and-sew production for custom performance apparel.", 
              img: 'https://i.pinimg.com/1200x/9d/1d/68/9d1d689b6ff37f8f303e2e89afb6bac4.jpg',
              alt: "Professional cut and sew manufacturing for custom sportswear"
            },
            { 
              title: "Custom Embroidery Services", 
              desc: "Custom embroidery for branded sportswear and athletic teamwear.", 
              img: 'https://i.pinimg.com/1200x/e2/7b/c9/e27bc914c5db41b42a134b0b81aa062c.jpg',
              alt: "Custom sportswear embroidery and teamwear branding"
            },
            { 
              title: "Custom Printing Services", 
              desc: "High-quality sublimation and garment printing for athletic wear.", 
              img: 'https://i.pinimg.com/736x/44/1e/c6/441ec6acd0ca332a83a1d9ba5540bf05.jpg',
              alt: "Custom sportswear printing and sublimation services"
            },
            { 
              title: "Custom Sportswear Apparel", 
              desc: "Full-scale custom sportswear production for professional athletic brands.", 
              img: 'https://i.pinimg.com/1200x/06/d3/81/06d3814393fb753615336fd489e5a6bf.jpg',
              alt: "Custom sportswear apparel manufacturing for athletic brands"
            },
            { 
              title: "Custom Activewear Production", 
              desc: "Premium OEM activewear manufacturing designed for high performance.", 
              img: 'https://i.pinimg.com/736x/09/c1/54/09c1542f59b443d1f9d4ad06f5c7e6e6.jpg',
              alt: "Custom OEM activewear and fitness apparel production"
            },
          ].map((item, i) => (
            <div key={i} className="highlight-card flex flex-col gap-5 h-full">
              <div className="h-[33vh] md:h-[40vh] w-full relative overflow-hidden">
                <img className='size-full object-cover' src={item.img} alt={item.alt} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="uppercase text-black flex items-center gap-2 font-semibold">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeMiddle;
