import Link from 'next/link';
import { IoLogoInstagram, IoLogoFacebook, IoLogoPinterest } from 'react-icons/io5';
import { FaXTwitter } from "react-icons/fa6";
import { FaMedium } from 'react-icons/fa';
import Heading from './Heading';

const LINKS = {
    quickLinks: [
        { label: 'Instagram', href: 'https://www.instagram.com/slotssportswear2025/', icon: <IoLogoInstagram /> },
        { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61579978311422', icon: <IoLogoFacebook /> },
        { label: 'Twitter', href: 'https://x.com/SlotsSportswear', icon: <FaXTwitter /> },
        { label: 'Pinterest', href: 'https://www.pinterest.com/slotssportswear/', icon: <IoLogoPinterest /> },
    ]
};

const Footer = () => {
    return (
        <footer className="w-full bg-[#111111] text-[#EDEEE7] py-10 px-5 md:px-10 overflow-hidden">
            <div className="max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-10 md:gap-5 mb-5">

                    {/* Branding & Mission */}
                    <div className="flex flex-col gap-5 pr-15">
                        <div className="flex items-center gap-5">
                            <img src="/images/daccilogosvg.png" alt="Slots Sports Wear logo" className="size-8 object-contain invert" />
                            <span className="text-xl font-[main] uppercase tracking-tighter">Slots Sports Wear</span>
                        </div>
                        <p className="text-sm font-light leading-relaxed text-[#EDEEE7]/60 max-w-sm">
                            A premium sportswear manufacturing brand focused on high-quality custom apparel. Low MOQ, fast lead times, and global delivery from Pakistan.
                        </p>
                        <div className="flex gap-4">
                            {LINKS.quickLinks.map((link, i) => (
                                <a key={i} href={link.href} aria-label={link.label} className="size-10 rounded-full border border-white/10 flex items-center justify-center text-lg hover:bg-white hover:text-black transition-all duration-500">
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Sitemap: Collections */}
                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Collections</span>
                        <ul className="flex flex-col gap-3">
                            {[
                                { label: 'New Arrivals', href: '/shop?sort=newest' },
                                { label: 'Sports Collection', href: '/shop?category=sport' },
                                { label: 'Casuals Collection', href: '/shop?category=casual' },
                                { label: 'Team Collection', href: '/shop?category=team' },
                                { label: 'Limited Edition', href: '/shop?tags=limited' },
                                { label: 'FAQs', href: '/faq' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="hover:opacity-50 transition-all tracking-wide font-[middle]">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sitemap: Company */}
                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Company</span>
                        <ul className="flex flex-col gap-3">
                            {[
                                { label: 'Our Story', href: '/story' },
                                { label: 'About Us', href: '/about' },
                                { label: 'Shipping Info', href: '/shipping' },
                                { label: 'Policies', href: '/policy' },
                                { label: 'Returns & Refunds', href: '/refund' },
                                { label: 'Contact Support', href: '/contact' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="hover:opacity-50 transition-all tracking-wide">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-8 lg:pl-12 border-l border-white/5">
                        <div className="flex flex-col gap-5">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Location</span>
                            <p>
                                Punjab, Pakistan<br />International Shipping Worldwide
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Contact Us</span>
                            <p>{process.env.NEXT_PUBLIC_EMAIL_ADDRESS}</p>
                            <p>{process.env.NEXT_PUBLIC_PHONE_NUMBER}</p>
                        </div>
                    </div>
                </div>

                {/* Massive Branding */}
                <div className="relative pointer-events-none select-none w-full h-fit flex justify-center py-5">
                    <Heading title="SLOT SPORTS WEAR" className='!text-[#EDEEE7]' />
                </div>

                {/* Bottom Meta */}
                <div className="flex flex-col justify-between items-center gap-5 pt-10 border-t border-white/5">
                    <p className="uppercase opacity-30 font-bold text-center">
                        © 2026 SLOTS SPORTS WEAR • DESIGNED BY SLOTS DEVELOPERS
                    </p>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            { label: 'Privacy', href: '/policy' },
                            { label: 'Terms', href: '/terms' },
                            { label: 'Shipping', href: '/shipping' },
                            { label: 'Returns', href: '/refund' },
                        ].map(item => (
                            <Link key={item.label} href={item.href} className="text-[9px] uppercase tracking-[0.3em] opacity-30 hover:opacity-100 transition-opacity font-bold">
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
