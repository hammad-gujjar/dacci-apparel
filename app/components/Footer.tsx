'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoLogoInstagram, IoLogoFacebook, IoLogoPinterest } from 'react-icons/io5';
import { FaMedium } from 'react-icons/fa';
import Heading from './Heading';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
    const footerRef = useRef<HTMLDivElement>(null);

    const LINKS = {
        explore: [
            { label: 'Our Story', href: '/about' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Blog', href: '/blogs' },
            { label: 'Events', href: '/events' },
        ],
        support: [
            { label: 'Contact', href: '/contact' },
            { label: 'FAQs', href: '/faq' },
            { label: 'Shipping', href: '/shipping' },
            { label: 'Refund', href: '/refund' },
        ],
        quickLinks: [
            { label: 'Instagram', href: '#', icon: <IoLogoInstagram /> },
            { label: 'Facebook', href: '#', icon: <IoLogoFacebook /> },
            { label: 'Medium', href: '#', icon: <FaMedium /> },
            { label: 'Pinterest', href: '#', icon: <IoLogoPinterest /> },
        ]
    };

    useGSAP(() => {
        const columns = footerRef.current?.querySelectorAll('.footer-col');
        const branding = footerRef.current?.querySelector('.footer-branding');

        if (columns) {
            gsap.from(columns, {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 80%",
                }
            });
        }

        if (branding) {
            gsap.from(branding, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: branding,
                    start: "top 95%",
                }
            });
        }
    }, { scope: footerRef });

    return (
        <footer ref={footerRef} className="w-full bg-[#111111] text-[#EDEEE7] pt-20 pb-10 px-5 md:px-10 overflow-hidden">
            <div className="max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-20">
                    {/* Tagline Column */}
                    <div className="footer-col flex flex-col gap-6 lg:col-span-1">
                        <div className="inline-flex px-3 py-1 border border-[#EDEEE7]/20 rounded-full w-fit">
                            <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Dacci Apparel</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-[main] leading-[1.1] tracking-tight max-w-xs">
                            Classic formal and <span className="italic opacity-70 font-serif">streetwear</span> clothes crafted with <span className="italic opacity-70 font-serif">purpose</span>.
                        </h2>
                    </div>

                    {/* Link Columns */}
                    <div className="footer-col flex flex-col gap-6">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Explore</h4>
                        <ul className="flex flex-col gap-3">
                            {LINKS.explore.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm hover:opacity-50 transition-all font-[main] tracking-wide">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col flex flex-col gap-6">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Support</h4>
                        <ul className="flex flex-col gap-3">
                            {LINKS.support.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm hover:opacity-50 transition-all font-[main] tracking-wide">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col flex flex-col gap-6">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Quick Links</h4>
                        <ul className="flex flex-col gap-3">
                            {LINKS.quickLinks.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="flex items-center gap-3 text-sm hover:opacity-50 transition-all font-[main] tracking-wide">
                                        <span className="text-base opacity-60">{link.icon}</span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Big Branding Section */}
                <div className="footer-branding relative mt-10 pointer-events-none select-none w-full flex items-center justify-center">
                    <Heading
                        className="text-[9vw]! md:text-[12vw]! leading-none text-[#EDEEE7]! uppercase tracking-tighter opacity-100 italic font-serif"
                        title='DACCI'
                        padding='px-5'
                    />
                </div>

                {/* Bottom Meta */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-[#EDEEE7]/5">
                    <p className="uppercase tracking-[0.3em] opacity-30 text-center md:text-left">
                        DESIGN BY DACCI TEAM • COPYRIGHT © 2026. ALL RIGHTS RESERVED
                    </p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="text-[9px] uppercase tracking-[0.3em] opacity-30 hover:opacity-100 transition-opacity">Privacy Policy</Link>
                        <Link href="/terms" className="text-[9px] uppercase tracking-[0.3em] opacity-30 hover:opacity-100 transition-opacity">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
