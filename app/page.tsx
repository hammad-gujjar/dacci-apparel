'use client';
import Heading from './components/Heading';
import NewArrival from './components/NewArrival';
import { useLoader } from './context/LoaderContext';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionButton from './components/TransitionButton';
import axios from 'axios';
import HomeMiddle from './components/HomeMiddle';
import HomeContact from './components/HomeContact';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const { isLoading, setIsReady } = useLoader();
  const [newArrivals, setNewArrivals] = useRef<any[]>([]).current; // We'll manage this in state for re-render
  const [arrivalData, setArrivalData] = useState<any[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Helper to split text into words, then characters
  const splitText = (text: string) => {
    return text.split(' ').map((word, wordIndex) => (
      <div key={wordIndex} className="flex overflow-hidden">
        {word.split('').map((char, charIndex) => (
          <span key={charIndex} className="hero-char inline-block translate-y-full">
            {char}
          </span>
        ))}
      </div>
    ));
  };

  useGSAP(() => {
    const fetchAllData = async () => {
      try {
        const { data: response } = await axios.get('/api/products/new-arrivals');
        if (response.success) {
          setArrivalData(response.data);
        }
      } catch (err) {
        console.error("Error fetching homepage data:", err);
      } finally {
        setIsReady(true);
      }
    };
    fetchAllData();
  }, [setIsReady]);

  useGSAP(() => {
    if (!isLoading) {
      // Refresh ScrollTrigger after loader finishes and layout is settled
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }
  }, { dependencies: [isLoading] });

  const SERVICES = [
    {
      title: "Core Product Creation",
      subtitle: "Design. Craft. Quality.",
      description: "We create thoughtfully designed clothing and accessories that balance contemporary style with enduring quality. From concept to final production, every piece is developed with precision, premium materials, and an uncompromising attention to detail.",
    },
    {
      title: "Customization & Personalization",
      subtitle: "Made to Feel Personal.",
      description: "Our customization services allow clients to adapt pieces to their individual preferences — from tailored fits to personalized details. Each customization is handled with care, ensuring every item feels unique, intentional, and truly yours."
    },
    {
      title: "Retail & Global Distribution",
      subtitle: "Seamless Access, Anywhere.",
      description: "We offer a streamlined shopping experience across digital and physical platforms, making our collections accessible worldwide. Through e-commerce, retail partners, and selective pop-ups, we ensure consistency, convenience, and brand integrity across every market."
    },
    {
      title: "Customer Experience & Styling",
      subtitle: "Beyond Shopping — A Relationship.",
      description: "Our customer experience is built around guidance, support, and trust. From personalized styling advice to responsive after-sales care, we focus on creating meaningful, long-term relationships rather than one-time transactions."
    },
    {
      title: "B2B & Private Label Solutions",
      subtitle: "Your Vision, Our Expertise.",
      description: "We partner with businesses, designers, and organizations to develop private label and collaborative collections. Our end-to-end capabilities ensure consistent quality, efficient production, and brand-aligned execution at every stage."
    },
    {
      title: "Sustainability & Responsibility",
      subtitle: "Designed with Purpose.",
      description: "We are committed to responsible practices that respect both people and the planet. From mindful material sourcing to ethical production standards, sustainability is embedded into our decision-making — not as a trend, but as a responsibility."
    },
  ]

  const CATEGORIES = [
    {
      title: "Women Collection",
      description: "We create thoughtfully designed clothing and accessories for women that balance contemporary style with enduring quality.",
      img: "https://i.pinimg.com/1200x/de/bc/97/debc97bb905d75568379e74b6f2f3bbb.jpg",
      url: "#"
    },
    {
      title: "Men Collection",
      description: "We create thoughtfully designed clothing and accessories for men that balance contemporary style with enduring quality.",
      img: "https://i.pinimg.com/1200x/7e/9a/26/7e9a262de7d4918a359a061a6b610584.jpg",
      url: "#"
    },
    {
      title: "Kids Collection",
      description: "We create thoughtfully designed clothing and accessories for kids that balance contemporary style with enduring quality.",
      img: "https://i.pinimg.com/736x/d2/d4/d8/d2d4d838bdd4db2456576fdf18ee6154.jpg",
      url: "#"
    },
    {
      title: "Accessories Collection",
      description: "We create thoughtfully designed accessories for women, men and kids that balance contemporary style with enduring quality.",
      img: "https://i.pinimg.com/1200x/74/c2/cc/74c2ccd48d1f8032e338ece75bd79453.jpg",
      url: "#"
    }
  ]

  useGSAP(() => {
    if (!isLoading) {
      const chars = heroRef.current?.querySelectorAll('.hero-char');

      // Hero Image Scale Animation
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current,
          {
            scale: 1,
            duration: 2.5,
            delay: 0.7,
            ease: "power2.out",
          }
        );
      }

      if (chars && chars.length > 0) {
        gsap.to(chars, {
          y: "0%",
          duration: 0.5,
          delay: 1.1,
          ease: "power2.out",
          stagger: 0.02,
        });
      }
    }
  }, { dependencies: [isLoading], scope: heroRef });

  useGSAP(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

    const scrollWidth = scrollContainer.offsetWidth - window.innerWidth;

    const horizAnim = gsap.to(scrollContainer, {
      x: () => -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 3.5, // Balanced scrub for responsiveness
        invalidateOnRefresh: true,
        anticipatePin: 1,
      }
    });

    // Add entry animations for category content with stagger
    const categories = scrollContainer.querySelectorAll('.category-item');
    categories.forEach((cat, i) => {
      // Animate the main card reveal
      gsap.from(cat, {
        y: '50%',
        opacity: 0,
        duration: 1,
        stagger: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scrollContainer,
          containerAnimation: horizAnim,
          start: "top top%",
          markers: true,
          toggleActions: "play none none reverse",
        }
      });

      // Animate the text content inside with a slight delay relative to the card
      const content = cat.querySelector('.category-content');
      if (content) {
        gsap.from(content, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: 0.2, // Small stagger effect
          ease: "power2.out",
          scrollTrigger: {
            trigger: cat,
            containerAnimation: horizAnim,
            start: "left 80%",
            toggleActions: "play none none reverse",
          }
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <>
      <div ref={heroRef} className='w-screen h-[92vh] md:h-screen relative overflow-hidden'>
        <img ref={heroImageRef} className='absolute top-0 left-0 size-full object-cover z-1 scale-[1.3]' src="https://res.cloudinary.com/dhrfua4wp/image/upload/v1771056602/generated_image_8b848485-5cab-4a43-8489-1a6663bf165a_yvayc3.webp" alt="" />
        <div className='absolute top-0 left-0 size-full flex flex-col justify-end p-5 md:p-10 gap-2 z-2'>
          <div className="w-full md:w-[90%]">
            <h1 className='text-[#EDEEE7]! w-full uppercase flex flex-wrap gap-x-[0.3em]'>
              {splitText("Premium clothes and accessories collection")}
            </h1>
          </div>
          <div className="w-full md:w-[90%] md:mt-4 mt-2">
            <p className='text-[#ffff] tracking-[0.2em] w-full flex flex-wrap gap-x-[0.2em]'>
              {splitText("tha classic and modern clothing brand that promote classic formal and streatwear clothes and custom manufacturing for clients even in bulk and quality you can see in website")}
            </p>
          </div>
        </div>
      </div>

      <div className='pt-5 flex flex-col md:flex-row justify-between md:items-start items-center gap-2'>
        <Heading title='SORT  BY  CATEGORIES' className="w-full md:w-1/2" />
        <p className='w-full md:w-1/3 md:text-left text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis voluptatem et dolorem inventore, libero unde. Sint ad vel obcaecati consequatur?</p>
      </div>

      <div ref={sectionRef} className='h-[95vh] md:h-screen w-full overflow-hidden'>
        <div ref={scrollContainerRef} className='h-full flex w-fit p-[5vw] gap-[5vw]'>
          {CATEGORIES.map((cat, index) => (
            <div key={index} className='category-item w-screen md:w-[50vw] h-full relative flex flex-col gap-2 justify-end shrink-0 rounded-[2vw] overflow-hidden'>
              <img className='absolute inset-0 size-full object-cover z-[-1]' src={cat.img} alt={cat.title} />
              <div className="category-content flex flex-col gap-2 p-5 size-full justify-end bg-linear-to-t from-black/70 via-black/30 to-transparent">
                <h2 className='text-[#EDEEE7]!'>{cat.title}</h2>
                <p className='text-[#EDEEE7] tracking-[0.2em]'>{cat.description}</p>
                <TransitionButton text='collection' url={cat.url} className='light-button w-fit' arrow={true} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <NewArrival products={arrivalData} />

      <HomeMiddle />

      <HomeContact />

    </>
  )
}

export default HomePage;