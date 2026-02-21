'use client';
import Link from 'next/link';
import Logout from './logout';
import { usePathname } from 'next/navigation';
import TransitionButton from './TransitionButton';
import { useState, useEffect, useRef } from 'react';
import { useLoader } from '../context/LoaderContext';
import axios from 'axios';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { authClient } from '@/lib/auth-client';
import { IoCloseOutline } from "react-icons/io5";
import Image from 'next/image';
import Icon from './Icon';

const Nav = () => {
    const pathname = usePathname();
    const { isLoading, setIsReady, transitionTo } = useLoader();
    const [navData, setNavData] = useState<any[]>([]);
    const navRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [activeCategory, setActiveCategory] = useState<any>(null);
    const { data: session } = authClient.useSession();

    const megaMenuRef = useRef<HTMLDivElement>(null);
    const menuOverlayRef = useRef<HTMLDivElement>(null);
    const menuColumnsRef = useRef<(HTMLDivElement | null)[]>([]);
    const searchOverlayRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Fetch Nav Data
    useEffect(() => {
        const fetchNavData = async () => {
            try {
                const { data: res } = await axios.get('/api/public/nav-data');
                if (res.success) {
                    setNavData(res.data);
                }
            } catch (err) {
                console.error("Nav data fetch error:", err);
            } finally {
                setIsReady(true);
            }
        };
        fetchNavData();
    }, [setIsReady]);

    const handleMouseEnter = (cat: any) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setActiveCategory(cat);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveCategory(null);
            timeoutRef.current = null;
        }, 200); // Stay open for 1s
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Handle Search Suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchQuery.trim().length > 1) {
                try {
                    const { data: res } = await axios.get(`/api/public/search?q=${searchQuery}`);
                    if (res.success) {
                        setSuggestions(res.data);
                    }
                } catch (err) {
                    console.error("Search fetch error:", err);
                }
            } else {
                setSuggestions([]);
            }
        };
        const timer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Megamenu Animation
    useGSAP(() => {
        if (activeCategory) {
            gsap.to(megaMenuRef.current, {
                height: '70vh',
                opacity: 1,
                display: 'block',
                duration: 0.5,
                ease: 'power3.out'
            });
            // Stagger reveal of content
            gsap.from('.megamenu-item', {
                y: 20,
                opacity: 0,
                stagger: 0.05,
                duration: 0.4,
                ease: 'power2.out'
            });
        } else {
            gsap.to(megaMenuRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power3.in',
                onComplete: () => {
                    if (megaMenuRef.current) megaMenuRef.current.style.display = 'none';
                }
            });
        }
    }, [activeCategory]);

    // Search Overlay Animation
    useGSAP(() => {
        if (isSearchOpen) {
            gsap.to(searchOverlayRef.current, {
                opacity: 1,
                display: 'flex',
                duration: 0.4,
                ease: 'power3.out'
            });
            gsap.from('.search-content', {
                y: -50,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.out'
            });
        } else {
            gsap.to(searchOverlayRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power3.in',
                onComplete: () => {
                    if (searchOverlayRef.current) searchOverlayRef.current.style.display = 'none';
                }
            });
        }
    }, [isSearchOpen]);

    // Nav Entrance Animation
    useGSAP(() => {
        if (!isLoading) {
            gsap.to(navRef.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "expo.out",
                    delay: 1.5
                }
            );
        }
    }, { dependencies: [isLoading], scope: navRef });

    // Menu Overlay Animation
    useGSAP(() => {
        if (isMenuOpen) {
            gsap.set(menuOverlayRef.current, { display: 'flex' });

            // Randomize stagger every time
            const columns = menuColumnsRef.current.filter(Boolean);
            gsap.fromTo(columns,
                { yPercent: -100 },
                {
                    yPercent: 0,
                    duration: 0.8,
                    ease: "power4.inOut",
                    stagger: {
                        amount: 0.4,
                        from: "random"
                    }
                }
            );

            gsap.fromTo('.menu-content-item',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: 0.6,
                    stagger: 0.1,
                    ease: "power2.out"
                }
            );
        } else {
            const columns = menuColumnsRef.current.filter(Boolean);
            gsap.to(columns, {
                yPercent: -100,
                duration: 0.6,
                ease: "power4.inOut",
                stagger: {
                    amount: 0.3,
                    from: "random"
                },
                onComplete: () => {
                    if (menuOverlayRef.current) menuOverlayRef.current.style.display = 'none';
                }
            });
            gsap.to('.menu-content-item', {
                opacity: 0,
                y: -20,
                duration: 0.3
            });
        }
    }, [isMenuOpen]);

    if (pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <>
            <div ref={navRef} className="fixed top-0 left-0 w-full z-102 px-3 md:px-9 flex flex-col items-center transform -translate-y-full">
                {/* Main Nav Bar */}
                <div className="w-full h-fit md:h-[9vh] flex justify-between md:items-center transition-all duration-300 gap-2">
                    {/* Left: Categories (Hidden on mobile/tablet) */}
                    <div className="w-1/3 h-[7.5vh] hidden md:flex items-center justify-center gap-5 px-4 py-2 pointer-events-auto bg-[#EDEEE7]/90 backdrop-blur-md rounded-[2vw] border border-black/5 mt-2">
                        {navData.map((cat) => (
                            <div
                                key={cat._id}
                                className="relative group/nav"
                                onMouseEnter={() => handleMouseEnter(cat)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="text-[10px] uppercase tracking-[0.3em] font-bold py-2 hover:opacity-50 transition-all cursor-pointer">
                                    {cat.name}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Logo (Centered) */}
                    <div className="lg:flex-none lg:w-1/3 flex justify-center">
                        <TransitionButton text={<ul className="w-fit md:h-full">
                            <img className='size-full object-contain' src='/images/daccilogosvg.png' alt='logo' />
                            <span className='font-serif text-2xl tracking-tighter uppercase font-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>Dacci</span>
                        </ul>} url='/' className="relative md:h-[9vh] pointer-events-auto z-101 cursor-pointer" />
                    </div>

                    {/* Right Side Icons */}
                    <div className="h-[5vh] md:h-[7.5vh] md:w-1/3 justify-center flex items-center gap-2 md:gap-6 bg-[#EDEEE7]/90 backdrop-blur-md px-4 py-2 rounded-[2vw] border border-black/5 mt-1 md:mt-2">
                        <button onClick={() => setIsSearchOpen(true)} className="p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer">
                            <Icon name="search" className="" />
                        </button>

                        <div className="h-4 w-px bg-black/10"></div>

                        <TransitionButton text={<ul className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
                            <Icon name="shopping-bag" className="" />
                        </ul>} url='/cart' className='cursor-pointer' />

                        <div className="h-4 w-px bg-black/10"></div>

                        {session ? (
                            <div className="flex items-center gap-2">
                                <TransitionButton text={<ul className='p-2 hover:bg-black/5 rounded-full transition-colors'>
                                    <Icon name="user" className="" />
                                </ul>} url='/dashboard' className='cursor-pointer' />
                            </div>
                        ) : (
                            <TransitionButton text={<ul className='p-2 hover:bg-black/5 rounded-full transition-colors'>
                                <Icon name="login" className="" />
                            </ul>} url='/auth/signin' className='cursor-pointer' />
                        )}

                        <div className="h-4 w-px bg-black/10"></div>

                        <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer">
                            <Icon name="menu" className="" />
                        </button>
                    </div>
                </div>

                {/* Megamenu Overlay */}
                <div
                    ref={megaMenuRef}
                    className="w-full absolute top-[10vh] left-0 bg-[#EDEEE7] shadow-2xl rounded-b-[2vw] overflow-hidden hidden"
                    style={{ opacity: 0, height: 0 }}
                    onMouseEnter={() => {
                        if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current);
                            timeoutRef.current = null;
                        }
                    }}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="w-full h-full flex flex-col md:flex-row p-6 md:p-12 gap-8 md:gap-12">
                        {/* Left: Types */}
                        <div className="w-full md:w-1/2 flex flex-col gap-6 md:border-r md:border-black/5">
                            <h3 className="text-zinc-400 text-[10px] uppercase tracking-[0.4em] font-bold">Categories</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {activeCategory?.types?.map((type: string, i: number) => (
                                    <div key={i} className="megamenu-item">
                                        <TransitionButton
                                            text={type}
                                            url={`/shop?category=${activeCategory.slug}&type=${type}`}
                                            className="text-2xl md:text-4xl font-[main] hover:translate-x-4 transition-transform duration-300 uppercase tracking-tighter block w-fit"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Featured Images */}
                        <div className="hidden md:flex w-1/2 gap-6">
                            {activeCategory?.sampleProducts?.map((product: any, i: number) => (
                                <div
                                    key={product._id}
                                    onClick={() => {
                                        setActiveCategory(null);
                                        transitionTo(`/product/${product.slug}`);
                                    }}
                                    className="megamenu-item flex-1 relative h-full rounded-[1.5vw] overflow-hidden group/product cursor-pointer"
                                >
                                    <Image
                                        src={product.media?.[0]?.secure_url || '/placeholder.png'}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover/product:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover/product:bg-black/40 transition-colors"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <p className="text-[10px] uppercase tracking-widest opacity-70 mb-1">{activeCategory.name}</p>
                                        <p className="text-xl font-[main] leading-none uppercase">{product.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Overlay */}
            <div
                ref={searchOverlayRef}
                className="fixed inset-0 z-200 bg-[#EDEEE7]/60 backdrop-blur-2xl flex flex-col items-center pt-[15vh] px-6"
                style={{ opacity: 0 }}
            >
                <button
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                    className="absolute top-10 right-10 p-4 hover:bg-black/5 rounded-full transition-all"
                >
                    <IoCloseOutline size={32} />
                </button>

                <div className="search-content w-full max-w-4xl flex flex-col items-center gap-12">
                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="SEARCH BY PRODUCT OR TAGS..."
                            className="w-full bg-transparent border-b-2 border-black/10 py-6 text-[5vw] md:text-[4vw] font-[main] uppercase tracking-tighter focus:border-black outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                        <Icon name="search" className="absolute top-1/2 -translate-y-1/2 right-4" />
                    </div>

                    {/* Suggestions */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        {suggestions.map((item, i) => (
                            <Link
                                key={i}
                                href={`/shop?tag=${item.tag}`}
                                onClick={() => setIsSearchOpen(false)}
                                className="flex items-center gap-6 p-4 hover:bg-black/5 rounded-[1.5vw] transition-all group"
                            >
                                <div className="size-20 relative rounded-lg overflow-hidden shrink-0 border border-black/5">
                                    <Image
                                        src={item.sampleProduct.media?.[0]?.secure_url || '/placeholder.png'}
                                        alt={item.tag}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <Icon name="search" className="" />
                                        <h4 className="text-xl font-[main] uppercase tracking-tight">{item.tag}</h4>
                                    </div>
                                    <p className="text-[10px] uppercase tracking-widest opacity-40">View in Shop</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div
                ref={menuOverlayRef}
                className="fixed inset-0 z-300 hidden overflow-hidden pointer-events-none"
            >
                {/* Background Columns */}
                <div className="absolute inset-0 flex">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            ref={el => { menuColumnsRef.current[i] = el; }}
                            className="flex-1 bg-black h-full"
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="relative z-10 w-full h-full flex flex-col justify-center items-center pointer-events-auto">
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute top-10 right-10 p-4 text-white hover:bg-white/10 rounded-full transition-all"
                    >
                        <IoCloseOutline size={40} />
                    </button>

                    <nav className="flex flex-col items-center gap-8 md:gap-12">
                        {['HOME', 'SHOP', 'ABOUT', 'CONTACT', 'BLOGS'].map((item) => (
                            <div key={item} className="menu-content-item overflow-hidden">
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        const url = item === 'HOME' ? '/' : `/${item.toLowerCase()}`;
                                        setTimeout(() => transitionTo(url), 650);
                                    }}
                                    className="text-4xl md:text-7xl font-[main] text-white hover:text-[#EDEEE7]/60 transition-colors uppercase tracking-tight cursor-pointer"
                                >
                                    {item}
                                </button>
                            </div>
                        ))}

                        {/* Mobile Categories */}
                        {navData.length > 0 && (
                            <div className="md:hidden flex flex-wrap justify-center gap-4 mt-8 menu-content-item max-w-xs">
                                {navData.map((cat) => (
                                    <TransitionButton
                                        key={cat._id}
                                        text={cat.name}
                                        url={`/shop?category=${cat.slug}`}
                                        className="text-sm text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                                    />
                                ))}
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Nav;
