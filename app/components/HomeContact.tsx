'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Heading from './Heading';
import { useLoader } from '../context/LoaderContext';
import Icon from './Icon';

gsap.registerPlugin(ScrollTrigger);

const HomeContact = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isLoading } = useLoader();

    useGSAP(() => {
        if (isLoading) return;

        // 1. Text Reveal Animation
        const textAnimate = gsap.utils.toArray('.contact-animate-smooth', containerRef.current);
        textAnimate.forEach((part: any) => {
            gsap.fromTo(part,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: part,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });

        // 2. Image Reveal Animation
        const imageReveals = gsap.utils.toArray('.contact-image-reveal', containerRef.current);
        imageReveals.forEach((reveal: any) => {
            gsap.fromTo(reveal,
                { width: "0%" },
                {
                    width: "100%",
                    duration: 1.5,
                    ease: "expo.inOut",
                    scrollTrigger: {
                        trigger: reveal,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });

        // 3. Staggered Social Links
        gsap.fromTo('.social-link',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.social-links-container',
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                }
            }
        );

        ScrollTrigger.refresh();

    }, { dependencies: [isLoading], scope: containerRef });

    const contactInfo = [
        { label: "General Inquiries", value: "hello@dacciapparel.com" },
        { label: "Customer Support", value: "support@dacciapparel.com" },
        { label: "Collaborations", value: "press@dacciapparel.com" },
        { label: "Visit our Showroom", value: "123 Fashion Ave, NY 10001" }
    ];

    const socials = [
        { name: "Instagram", url: "#" },
        { name: "Pinterest", url: "#" },
        { name: "LinkedIn", url: "#" },
        { name: "TikTok", url: "#" }
    ];

    return (
        <section ref={containerRef} className="w-full bg-black py-24 px-5 md:px-10 overflow-hidden">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-20">
                
                {/* Header */}
                <div className="flex flex-col gap-6 max-w-2xl">
                    <span className="contact-animate-smooth text-[#EDEEE7]/40 text-xs uppercase tracking-[0.5em] font-bold">Get In Touch</span>
                    <Heading 
                        title="STAY CONNECTED WITH DACCI." 
                        className="text-4xl md:text-7xl font-[main] text-[#EDEEE7]! uppercase tracking-tighter leading-none"
                    />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                    
                    {/* Contact Details */}
                    <div className="flex flex-col gap-16">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            {contactInfo.map((item, i) => (
                                <div key={i} className="contact-animate-smooth flex flex-col gap-2">
                                    <span className="text-[#EDEEE7]/30 text-[10px] uppercase font-bold tracking-widest">{item.label}</span>
                                    <p className="text-[#EDEEE7] text-lg font-light hover:text-[#EDEEE7]/60 transition-colors cursor-pointer">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-col gap-8 social-links-container">
                            <span className="text-[#EDEEE7]/30 text-[10px] uppercase font-bold tracking-widest">Follow Us</span>
                            <div className="flex flex-wrap gap-x-12 gap-y-6">
                                {socials.map((social, i) => (
                                    <a key={i} href={social.url} className="social-link text-[#EDEEE7] text-2xl font-[main] uppercase tracking-tight group flex items-center gap-2">
                                        {social.name}
                                        <div className="size-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                                            {/* <Icon name="ArrorRight" /> */}
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Image Placeholder Reveal */}
                    <div className="w-full aspect-4/5 md:aspect-square relative group rounded-[2vw] overflow-hidden">
                        <div className="contact-image-reveal h-full border border-[#EDEEE7]/10 relative overflow-hidden">
                            <div className="w-[calc(100vw-3rem)] md:w-[600px] h-full absolute top-0 left-0">
                                <div className="absolute inset-2 border border-[#EDEEE7]/5 rounded-[1.5vw] overflow-hidden">
                                     <img 
                                        src="https://i.pinimg.com/1200x/c1/96/63/c1966373b8893118cf507a7e8ea6c75b.jpg" 
                                        alt="Contact Visual" 
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Overlay Text */}
                        <div className="absolute bottom-6 left-6 z-10">
                            <p className="text-[#EDEEE7] text-xs font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                Dacci Headquarters
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Style Divider */}
                <div className="w-full h-px bg-[#EDEEE7]/10 contact-animate-smooth mt-10"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 contact-animate-smooth text-[#EDEEE7]/30 text-[10px] uppercase font-bold tracking-[0.3em]">
                    <p>© 2024 Dacci Apparel. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-[#EDEEE7] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#EDEEE7] transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeContact;
