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
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoader();

  useGSAP(() => {
    if (isLoading) return;

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

    // 2. Story Section Reveal (excluding heading which has its own)
    const storyParts = gsap.utils.toArray('.story-animate-smooth', containerRef.current);
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
    const imageReveals = gsap.utils.toArray('.image-reveal-container', containerRef.current);
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

  const marqueeText = "JOIN OUR MAILING LIST AND RECEIVE 10% OFF ON FIRST ORDER";

  return (
    <>
      <div ref={containerRef} className='w-full flex flex-col'>
        {/* Marquee Section */}
        <div ref={sectionRef} className='w-full bg-black my-20 p-5 overflow-hidden relative z-10'>
          <div className="flex whitespace-nowrap">
            <div ref={marqueeRef} className="flex">
              {[...Array(4)].map((_, i) => (
                <h1 key={i} className="inline-block !text-[#EDEEE7]">
                  {marqueeText} <span className="mx-10 !text-[#EDEEE7]">•</span>
                </h1>
              ))}
            </div>
          </div>
        </div>
        {/* Secondary Collection Highlights */}
        <div className="highlights-grid w-full grid grid-cols-2 md:grid-cols-3 gap-5 relative z-10 p-5">
          {[
            { title: "Private Label Clothing", desc: "Vendorist Apparel is a quality-focused private-label clothing manufacturer that meets the demands of both a fresh clothing line and well-known businesses.", img: 'https://i.pinimg.com/1200x/09/30/41/093041bbdd205a7676b5a38c1d6e646b.jpg' },
            { title: "Cut & Sew Manufacturer", desc: "The top maker of cut-and-sew clothing is at your disposal. You have complete control over the creation process of your intended content.", img: 'https://i.pinimg.com/1200x/9d/1d/68/9d1d689b6ff37f8f303e2e89afb6bac4.jpg' },
            { title: "Custom Embroidery Services", desc: "Enhance your brand with our state-of-the-art bespoke embroidery processes and techniques.", img: 'https://i.pinimg.com/1200x/e2/7b/c9/e27bc914c5db41b42a134b0b81aa062c.jpg' },
            { title: "Custom Printing Services", desc: "With our custom printing services, you can add a personal touch to your clothing.", img: 'https://i.pinimg.com/736x/44/1e/c6/441ec6acd0ca332a83a1d9ba5540bf05.jpg' },
            { title: "Custom Sportswear Apparels", desc: "Slot-sports-wear can help you create your own personalized fitness apparel manufacturer brand.", img: 'https://i.pinimg.com/1200x/06/d3/81/06d3814393fb753615336fd489e5a6bf.jpg' },
            { title: "Custom Activewear Apparels", desc: "Slot-sports-wear can help you create your own personalized fitness apparel manufacturer brand.", img: 'https://i.pinimg.com/736x/09/c1/54/09c1542f59b443d1f9d4ad06f5c7e6e6.jpg' },
          ].map((item, i) => (
            <div key={i} className="highlight-card flex flex-col gap-5 h-full rounded-[2vw] p-2 border border-black/10">
              <div className="h-[40vh] w-full relative overflow-hidden rounded-[2vw]">
                <img className='size-full object-cover' src={item.img} alt="" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="uppercase text-black flex items-center gap-2 font-semibold"><span className="text-black text-2xl">•</span>{item.title}</h3>
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
