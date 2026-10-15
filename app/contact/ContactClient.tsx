'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heading from '../components/Heading';
import TransitionButton from '../components/TransitionButton';
import TechPackUploadZone, { TechPackUploadedFile } from '../components/TechPackUploadZone';
import axios from 'axios';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { trackEvent } from '@/lib/analytics';
import Icon from '../components/Icon';
import {
    IoLogoInstagram,
    IoLogoFacebook,
    IoLogoPinterest,
    IoShirtOutline,
    IoLayersOutline,
    IoGlobeOutline
} from 'react-icons/io5';
import { FaMedium } from 'react-icons/fa';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ContactClientProps {
    categories: { _id: string; name: string; slug: string }[];
}

const SPECIFIED_CATEGORIES = [
    "Teamwear",
    "Golfwear",
    "Fitness Apparel",
    "Activewear",
    "Running Wear",
    "Training Wear",
    "Custom Clothing"
];

const OUTDATED_CATEGORIES = new Set(['men', 'women', 'gloves', 'gears']);

const MINIMUM_MOQ = 30;

const CUSTOMIZATION_OPTIONS = [
    "Sublimation",
    "Embroidery",
    "Screen Printing",
    "Private Label",
    "Custom Packaging"
];

const TRUST_METRICS = [
    {
        number: "50",
        label: "MOQ Starting"
    },
    {
        number: "7-14",
        label: "Days Sampling"
    },
    {
        number: "Worldwide",
        label: "Shipping"
    }
];

export default function ContactClient({ categories }: ContactClientProps) {
    const searchParams = useSearchParams();
    const routerType = searchParams.get('type') || '';
    const routerSlug = searchParams.get('slug') || '';

    const containerRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session } = authClient.useSession();

    // Merge specified categories with any dynamic database categories, excluding outdated options without duplicates
    const allCategories = (() => {
        const seen = new Set<string>();
        const result: string[] = [];

        for (const cat of [...SPECIFIED_CATEGORIES, ...categories.map(c => c.name)]) {
            if (!cat) continue;
            const trimmed = cat.trim();
            const lower = trimmed.toLowerCase();
            if (OUTDATED_CATEGORIES.has(lower)) continue;
            if (!seen.has(lower)) {
                seen.add(lower);
                const matchedSpec = SPECIFIED_CATEGORIES.find(s => s.toLowerCase() === lower);
                result.push(matchedSpec || trimmed);
            }
        }
        return result;
    })();

    // Match routerType if passed
    const initialCategory = allCategories.find(
        c => c.toLowerCase() === routerType.toLowerCase() || c.toLowerCase().includes(routerType.toLowerCase())
    ) || SPECIFIED_CATEGORIES[0];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        country: '',
        website: '',
        productType: initialCategory,
        productSlug: routerSlug,
        quantity: '30',
        deadline: '',
        customizationOptions: ['Sublimation', 'Private Label'] as string[],
        customizationDetails: '',
        website_hp: ''
    });

    // Auto-populate from authenticated session if available
    useEffect(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                name: prev.name || session.user.name || '',
                email: prev.email || session.user.email || '',
            }));
        }
    }, [session]);

    const [uploadedFiles, setUploadedFiles] = useState<TechPackUploadedFile[]>([]);

    const LINKS = {
        quickLinks: [
            { label: 'Instagram', href: 'https://www.instagram.com/slotssportswear2025/', icon: <IoLogoInstagram /> },
            { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61579978311422', icon: <IoLogoFacebook /> },
            { label: 'Medium', href: '#', icon: <FaMedium /> },
            { label: 'Pinterest', href: 'https://www.pinterest.com/slotssportswear/', icon: <IoLogoPinterest /> },
        ]
    };

    useGSAP(() => {
        if (!containerRef.current) return;

        // Hero and Intro Animation
        gsap.from('.fade-up', {
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power4.out'
        });

        // Scroll reveals
        gsap.utils.toArray<HTMLElement>('.scroll-fade').forEach(el => {
            gsap.from(el, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                }
            });
        });

        // Stat items reveal animation matching CompanyStats
        const statItems = containerRef.current.querySelectorAll('.stat-item');
        if (statItems.length > 0) {
            gsap.fromTo(statItems,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: statItems[0],
                        start: 'top 85%',
                        once: true,
                    }
                }
            );
        }
    }, { scope: containerRef });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleCustomization = (option: string) => {
        setFormData(prev => {
            const exists = prev.customizationOptions.includes(option);
            const updated = exists
                ? prev.customizationOptions.filter(item => item !== option)
                : [...prev.customizationOptions, option];
            return { ...prev, customizationOptions: updated };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Client-side validations
        const trimmedName = formData.name.trim();
        const trimmedEmail = formData.email.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!trimmedName || trimmedName.length < 2) {
            toast.error("Please enter a valid contact person's name (at least 2 characters).");
            return;
        }

        if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
            toast.error("Please enter a valid business email address.");
            return;
        }

        if (!formData.company.trim()) {
            toast.error("Please enter your company or brand name.");
            return;
        }

        if (!formData.country.trim()) {
            toast.error("Please enter your country.");
            return;
        }

        if (!formData.productType) {
            toast.error("Please select a product category.");
            return;
        }

        // Validate whole-number quantity of at least 30 pieces
        const qtyStr = String(formData.quantity ?? '').trim();
        const parsedQty = Number(qtyStr);

        if (!qtyStr) {
            toast.error("Please enter a required production quantity.");
            return;
        }

        if (isNaN(parsedQty) || !Number.isInteger(parsedQty) || !/^\d+$/.test(qtyStr)) {
            toast.error("Quantity must be a valid whole number (no fractions or decimals).");
            return;
        }

        if (parsedQty < MINIMUM_MOQ) {
            toast.error(`Minimum order quantity is ${MINIMUM_MOQ} pieces per style.`);
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                ...formData,
                quantity: parsedQty,
                files: uploadedFiles,
            };
            const { data } = await axios.post('/api/contact/submit', payload);
            if (data.success) {
                // Record the RFQ Submission Conversion
                trackEvent('rfq_submitted', {
                    source: 'Contact Page',
                    company: formData.company,
                    country: formData.country,
                    productType: formData.productType,
                    quantity: parsedQty,
                    hasFiles: uploadedFiles.length > 0
                });

                toast.success('Manufacturing quote request successfully submitted. Our technical team will review your specifications.');
                setFormData({
                    name: session?.user?.name || '',
                    email: session?.user?.email || '',
                    company: '',
                    country: '',
                    website: '',
                    productType: SPECIFIED_CATEGORIES[0],
                    productSlug: '',
                    quantity: '30',
                    deadline: '',
                    customizationOptions: ['Sublimation', 'Private Label'],
                    customizationDetails: '',
                    website_hp: ''
                });
                setUploadedFiles([]);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen">
            <div className="space-y-16 md:space-y-24">

                {/* SECTION 1: CENTERED HERO SECTION */}
                <section className="pt-20 md:pt-28 pb-10 px-6 sm:px-12 max-w-4xl mx-auto flex flex-col items-center text-center gap-6 fade-up" id="contact-form">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-900/40">
                        OEM / ODM Manufacturing
                    </span>
                    
                    <Heading as="h1" title="Contact A Private Label Sportswear Manufacturer" className="justify-center text-center" />
                    
                    <p className="text-sm md:text-base text-neutral-700 leading-relaxed max-w-2xl mx-auto">
                        Request a custom apparel manufacturing quote or submit your wholesale sportswear inquiry. Share your designs and tech packs with our production team for dedicated consultation.
                    </p>
                </section>

                {/* SECTION 2: BALANCED CONTACT CARDS */}
                <section className="px-6 sm:px-12 lg:px-16 max-w-6xl mx-auto w-full fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                        {/* Card 1: Production Inquiry */}
                        <div className="h-full p-8 rounded-2xl bg-white/40 border border-neutral-900/10 backdrop-blur-sm flex flex-col justify-between hover:border-neutral-900/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 group">
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center justify-between">
                                    <div className="size-12 rounded-xl bg-black text-[#EDEEE7] flex items-center justify-center text-xl group-hover:scale-105 transition-transform duration-300">
                                        <IoShirtOutline />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-neutral-400">
                                        Channel 01
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
                                        Production Inquiry
                                    </h3>
                                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 block">
                                        Bespoke OEM & ODM Orders
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-1">
                                    {["OEM Orders", "Private Label", "Teamwear Production"].map((item) => (
                                        <span key={item} className="px-3 py-1 bg-black/5 text-black/80 text-[10px] uppercase tracking-wider font-semibold rounded-sm border border-black/10">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <p className="text-xs text-neutral-600 pt-5 mt-6 border-t border-neutral-900/10 tracking-wide">
                                Direct Line: {process.env.NEXT_PUBLIC_EMAIL_ADDRESS || 'slotssportswear@gmail.com'} • +92 331 9165413
                            </p>
                        </div>

                        {/* Card 2: Technical Support */}
                        <div className="h-full p-8 rounded-2xl bg-white/40 border border-neutral-900/10 backdrop-blur-sm flex flex-col justify-between hover:border-neutral-900/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 group">
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center justify-between">
                                    <div className="size-12 rounded-xl bg-black text-[#EDEEE7] flex items-center justify-center text-xl group-hover:scale-105 transition-transform duration-300">
                                        <IoLayersOutline />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-neutral-400">
                                        Channel 02
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
                                        Technical Support
                                    </h3>
                                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 block">
                                        Design & Specification Lab
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-1">
                                    {["Tech Pack Review", "Sampling", "Fabric Selection"].map((item) => (
                                        <span key={item} className="px-3 py-1 bg-black/5 text-black/80 text-[10px] uppercase tracking-wider font-semibold rounded-sm border border-black/10">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <p className="text-xs text-neutral-600 pt-5 mt-6 border-t border-neutral-900/10 tracking-wide">
                                CAD Prototyping & Pattern Engineering Lab
                            </p>
                        </div>

                        {/* Card 3: Global Sales */}
                        <div className="h-full p-8 rounded-2xl bg-white/40 border border-neutral-900/10 backdrop-blur-sm flex flex-col justify-between hover:border-neutral-900/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 group">
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center justify-between">
                                    <div className="size-12 rounded-xl bg-black text-[#EDEEE7] flex items-center justify-center text-xl group-hover:scale-105 transition-transform duration-300">
                                        <IoGlobeOutline />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-neutral-400">
                                        Channel 03
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
                                        Global Sales
                                    </h3>
                                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 block">
                                        Worldwide Export Accounts
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-1">
                                    {["International Buyers", "Wholesale Partnerships"].map((item) => (
                                        <span key={item} className="px-3 py-1 bg-black/5 text-black/80 text-[10px] uppercase tracking-wider font-semibold rounded-sm border border-black/10">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-5 mt-6 border-t border-neutral-900/10">
                                <span className="text-xs text-neutral-600 tracking-wide">Connect With Us</span>
                                <div className="flex items-center gap-2.5">
                                    {LINKS.quickLinks.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.href}
                                            aria-label={link.label}
                                            className="size-8 rounded-full border border-black/15 flex items-center justify-center text-xs hover:bg-black hover:text-white transition-all duration-300"
                                        >
                                            {link.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-neutral-900/10 max-w-6xl mx-auto" />

                {/* SECTION 3: READABLE & SYMMETRICAL B2B FORM */}
                <section className="px-6 sm:px-12 lg:px-16 max-w-4xl mx-auto w-full scroll-fade" id="teckpack">
                    <div className="text-center space-y-4 mb-14">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-900/40 block">
                            Inquiry Form
                        </span>
                        <Heading as="h2" title="Request Your Manufacturing Quote" className="justify-center text-center" />
                        <p className="text-neutral-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                            Submit your detailed specifications. We streamline the initial phase of design to ensure absolute clarity before production begins.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        {/* Hidden honeypot field for bot protection */}
                        <div className="hidden" aria-hidden="true">
                            <input
                                type="text"
                                name="website_hp"
                                value={formData.website_hp}
                                onChange={handleChange}
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </div>

                        {/* 01 / Company Information */}
                        <div className="space-y-6">
                            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-900/70 pb-2 border-b border-black/10">
                                01 / Company Information
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-2">
                                {/* Company Name */}
                                <div className="relative group">
                                    <input
                                        required
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium placeholder-transparent"
                                    />
                                    <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-neutral-900 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-neutral-900 pointer-events-none">
                                        Company Name *
                                    </label>
                                </div>

                                {/* Contact Person */}
                                <div className="relative group">
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium placeholder-transparent"
                                    />
                                    <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-neutral-900 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-neutral-900 pointer-events-none">
                                        Contact Person *
                                    </label>
                                </div>

                                {/* Business Email */}
                                <div className="relative group">
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium placeholder-transparent"
                                    />
                                    <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-neutral-900 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-neutral-900 pointer-events-none">
                                        Business Email *
                                    </label>
                                </div>

                                {/* Country */}
                                <div className="relative group">
                                    <input
                                        required
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium placeholder-transparent"
                                    />
                                    <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-neutral-900 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-neutral-900 pointer-events-none">
                                        Country *
                                    </label>
                                </div>

                                {/* Website */}
                                <div className="relative group md:col-span-2">
                                    <input
                                        type="text"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors tracking-wider font-medium placeholder-transparent"
                                    />
                                    <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-neutral-900 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-neutral-900 pointer-events-none">
                                        Website (Optional)
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* 02 / Project Details */}
                        <div className="space-y-6">
                            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-900/70 pb-2 border-b border-black/10">
                                02 / Project Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-2">
                                {/* Product Category */}
                                <div className="relative group flex flex-col justify-end">
                                    <select
                                        required
                                        name="productType"
                                        value={formData.productType}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select Product Category *</option>
                                        {allCategories.map((cat) => (
                                            <option key={cat} value={cat} className="uppercase text-neutral-900">
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="absolute left-0 -top-4 text-[9px] uppercase tracking-widest text-neutral-900 font-bold pointer-events-none">
                                        Product Category *
                                    </label>
                                    <Icon name="arrow" className="absolute right-0 bottom-4 w-3 h-3 text-neutral-900 pointer-events-none -rotate-45deg" />
                                </div>

                                {/* Quantity (pieces) */}
                                <div className="relative group flex flex-col justify-end">
                                    <input
                                        required
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        name="quantity"
                                        id="contact-quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        placeholder="30"
                                        className="w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors tracking-widest font-medium text-neutral-900"
                                    />
                                    <label htmlFor="contact-quantity" className="absolute left-0 -top-4 text-[9px] uppercase tracking-widest text-neutral-900 font-bold pointer-events-none">
                                        Quantity (pieces) *
                                    </label>
                                    <span className="text-[10px] text-neutral-500 font-[middle] mt-1.5 block">
                                        Minimum order is 30 pieces per style. Whole numbers only.
                                    </span>
                                </div>

                                {/* Target Delivery Date */}
                                <div className="relative group">
                                    <input
                                        required
                                        type="date"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium text-neutral-900"
                                    />
                                    <label className="absolute left-0 -top-4 text-[9px] uppercase tracking-widest text-neutral-900 font-bold pointer-events-none">
                                        Target Delivery Date *
                                    </label>
                                </div>

                                {/* Reference Product Slug (Optional) */}
                                <div className="relative group">
                                    <input
                                        type="text"
                                        name="productSlug"
                                        value={formData.productSlug}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium placeholder-transparent"
                                    />
                                    <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-neutral-900 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-neutral-900 pointer-events-none">
                                        Reference Product Slug (Optional)
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* 03 / Customization Options */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-black/10">
                                <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-900/70">
                                    03 / Customization Options
                                </h4>
                                <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-medium">
                                    Select all that apply
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-3 pt-2">
                                {CUSTOMIZATION_OPTIONS.map((opt) => {
                                    const isSelected = formData.customizationOptions.includes(opt);
                                    return (
                                        <button
                                            type="button"
                                            key={opt}
                                            onClick={() => handleToggleCustomization(opt)}
                                            className={`px-5 py-3 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] border transition-all duration-300 cursor-pointer active:scale-[0.97] ${
                                                isSelected
                                                    ? 'bg-neutral-900 text-[#EDEEE7] border-neutral-900 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.25)]'
                                                    : 'bg-white/50 text-neutral-700 border-neutral-900/10 hover:border-neutral-900 hover:bg-white'
                                            }`}
                                        >
                                            {isSelected ? `✓ ${opt}` : `+ ${opt}`}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 04 / Customization Specs & Technical Details */}
                        <div className="space-y-4">
                            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-900/70 pb-2 border-b border-black/10">
                                04 / Customization Specs & Requirements
                            </h4>
                            <div className="relative group pt-2">
                                <textarea
                                    required
                                    rows={4}
                                    name="customizationDetails"
                                    value={formData.customizationDetails}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium placeholder-transparent resize-none"
                                />
                                <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-neutral-900 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-neutral-900 pointer-events-none">
                                    Customization Specs & Material Need (Fabric GSM, Print Technique, Sizing) *
                                </label>
                            </div>
                        </div>

                        {/* 05 / Attach Tech Pack & Technical Files */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-black/10">
                                <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-900/70">
                                    05 / Attach Tech Pack & Vector Files (Optional)
                                </h4>
                                <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-medium">
                                    PDF, AI, EPS, PSD, DXF, ZIP (Max 25MB)
                                </span>
                            </div>
                            <div className="pt-2">
                                <TechPackUploadZone
                                    files={uploadedFiles}
                                    onFilesChange={setUploadedFiles}
                                    title="Upload Garment Specifications"
                                    description="Directly attach your vector artwork, measurement charts, tech pack ZIP, or CAD patterns."
                                />
                            </div>
                        </div>

                        {/* CTA Button: TransitionButton with Rolling Text */}
                        <div className="pt-6">
                            <TransitionButton
                                text={isSubmitting ? "Transmitting Request..." : "SUBMIT MANUFACTURING REQUEST"}
                                type="submit"
                                disabled={isSubmitting}
                                rollingText={!isSubmitting}
                                arrow={!isSubmitting}
                                className="w-full bg-neutral-900 hover:bg-neutral-800 text-[#EDEEE7] py-6 rounded-full text-[11px] uppercase tracking-[0.35em] md:tracking-[0.45em] font-bold transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-4 cursor-pointer shadow-[0_20px_45px_-10px_rgba(0,0,0,0.35)]"
                            />
                        </div>
                    </form>
                </section>

                {/* SECTION 4: TRUST SECTION (MATCHING HOMEPAGE COMPANYSTATS DESIGN) */}
                <section className="scroll-fade py-20 px-6 sm:px-12 border-t border-neutral-900/10">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-center">
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
                                <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-neutral-900/40">
                                    Manufacturing Credibility
                                </span>
                                <Heading as="h2" title="Why Brands Choose Our Manufacturing" className="text-center lg:text-left" />
                                <p className="text-neutral-600 text-sm md:text-base leading-relaxed max-w-md">
                                    As an established custom sportswear manufacturer, we power global apparel brands with scalable OEM and ODM production lines, precision craftsmanship, and low minimum order quantities.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-between">
                                {TRUST_METRICS.map((item, index) => (
                                    <div key={index} className="stat-item flex flex-col items-center justify-center text-center space-y-3 p-6 bg-white/30 rounded-2xl border border-black/5 backdrop-blur-xs">
                                        <div className="relative flex items-center justify-center">
                                            <h2 className="stat-value !font-[middle] text-5xl md:text-6xl font-bold tracking-tight text-neutral-900">
                                                {item.number}
                                            </h2>
                                        </div>
                                        <div className="w-12 h-[1px] bg-black/10 rounded-full" />
                                        <p className="uppercase text-xs md:text-sm font-semibold tracking-wider text-neutral-700">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 5: LOCATION MAP & HQ BANNER */}
                <section className="scroll-fade relative aspect-[21/9] lg:aspect-[3/1] bg-neutral-200 overflow-hidden group mb-10">
                    <div className="absolute inset-0 scale-105 group-hover:scale-100 transition-transform duration-[3s] ease-out brightness-90 grayscale bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />

                    {/* Location Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                        <div className="size-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl relative animate-pulse">
                            <div className="size-3 bg-white rounded-full" />
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20">
                        <span className="block text-[10px] uppercase font-bold tracking-[0.4em] text-white opacity-80 mb-1">
                            HQ Location
                        </span>
                        <span className="text-sm font-medium tracking-wide text-white">
                            Punjab, PK - Global Reach
                        </span>
                    </div>
                </section>

            </div>
        </div>
    );
}
