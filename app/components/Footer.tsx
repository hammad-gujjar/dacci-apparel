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
        <footer ref={footerRef} className="w-full bg-[#111111] text-[#EDEEE7] py-10 px-5 md:px-10 overflow-hidden">
            <div className="max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-10 md:gap-5 mb-5">
                    {/* Branding & Mission */}
                    <div className="footer-col flex flex-col gap-5 pr-15">
                        <div className="flex items-center gap-5">
                            <img src="/images/daccilogosvg.png" alt="logo" className="size-8 object-contain invert" />
                            <span className="text-xl font-[main] uppercase tracking-tighter">Slot Sports Wear</span>
                        </div>
                        <p className="text-sm font-light leading-relaxed text-[#EDEEE7]/60 max-w-sm">
                            A contemporary fashion brand that focuses on designing and producing minimalist, high-quality clothing and accessories. We believe in the power of aesthetic longevity.
                        </p>
                        <div className="flex gap-4">
                            {LINKS.quickLinks.map((link, i) => (
                                <a key={i} href={link.href} className="size-10 rounded-full border border-white/10 flex items-center justify-center text-lg hover:bg-white hover:text-black transition-all duration-500">
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Sitemap: Shop */}
                    <div className="footer-col flex flex-col gap-6">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Collections</h4>
                        <ul className="flex flex-col gap-3">
                            {[
                                { label: 'New Arrivals', href: '/shop?sort=newest' },
                                { label: 'Men\'s Collection', href: '/shop?category=man' },
                                { label: 'Women\'s Collection', href: '/shop?category=women' },
                                { label: 'Limited Editions', href: '/shop?tag=limited' },
                                { label: 'The Lookbook', href: '/shop' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm hover:opacity-50 transition-all font-[main] tracking-wide">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sitemap: Company */}
                    <div className="footer-col flex flex-col gap-6">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">System</h4>
                        <ul className="flex flex-col gap-3">
                            {[
                                { label: 'About Our Story', href: '/about' },
                                { label: 'Visit Our Studio', href: '/contact' },
                                { label: 'Ethics & Sourcing', href: '/about' },
                                { label: 'Careers', href: '#' },
                                { label: 'Contact Support', href: '/contact' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm hover:opacity-50 transition-all font-[main] tracking-wide">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info (Box Padel Style) */}
                    <div className="footer-col flex flex-col gap-8 lg:pl-12 border-l border-white/5">
                        <div className="flex flex-col gap-5">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Location</span>
                            <p>
                                500 Terry Francois Street,<br /> San Francisco, CA 94158
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Contact Us</span>
                            <p>
                                {process.env.NEXT_PUBLIC_EMAIL_ADDRESS}
                            </p>
                            <p>
                                {process.env.NEXT_PUBLIC_PHONE_NUMBER}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Massive Branding (Box Padel Style) */}
                <div className="footer-branding relative pointer-events-none select-none w-full h-fit flex justify-center py-5">
                    <Heading title="SLOT SPORTS WEAR" className='!text-[#EDEEE7]'/>
                </div>

                {/* Bottom Meta */}
                <div className="flex flex-col justify-between items-center gap-5 pt-10 border-t border-white/5">
                    <p className="uppercase opacity-30 font-bold">
                        © 2026 DACCI APPAREL • DESIGNED BY DACCI DEVELOPERS
                    </p>
                    <div className="flex gap-8">
                        {['Privacy', 'Terms', 'Shipping', 'Returns'].map(item => (
                            <Link key={item} href={`/${item.toLowerCase()}`} className="text-[9px] uppercase tracking-[0.3em] opacity-30 hover:opacity-100 transition-opacity font-bold">{item}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
