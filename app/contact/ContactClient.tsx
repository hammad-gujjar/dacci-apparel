'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heading from '../components/Heading';
import axios from 'axios';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import Icon from '../components/Icon';
import FormattedTitle from '../components/FormattedTitle';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ContactClientProps {
    categories: { _id: string; name: string; slug: string }[];
}

export default function ContactClient({ categories }: ContactClientProps) {
    const searchParams = useSearchParams();
    const routerType = searchParams.get('type') || '';
    const routerSlug = searchParams.get('slug') || '';

    const containerRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        productType: routerType,
        productSlug: routerSlug,
        quantity: '',
        deadline: '',
        customizationDetails: ''
    });

    useGSAP(() => {
        if (!containerRef.current) return;

        // Intro Animation
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
    }, { scope: containerRef });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { data } = await axios.post('/api/contact/submit', formData);
            if (data.success) {
                toast.success('Tech Pack successfully submitted to Slots Sports Wear.');
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    productType: '',
                    productSlug: '',
                    quantity: '',
                    deadline: '',
                    customizationDetails: ''
                });
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen">

            <div className="space-y-20">

                {/* SECTION 1: HEADER & INFO */}
                <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                    <div className="space-y-5 fade-up py-20 px-15">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-900/40">Say Hello</span>
                        <Heading title="Get In Touch" />
                        <p>
                            For bespoke collaborations, tech pack inquiries, or minimalist collections dialogue, we are at your disposal.
                        </p>
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-10 fade-up lg:pb-5">
                            <div className="space-y-1 group cursor-pointer">
                                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-400 group-hover:text-neutral-900 transition-colors duration-300">New Projects</span>
                                <p>
                                    info@slotssportswear.com
                                </p>
                                <p>
                                    +92 308 6762 402
                                </p>
                            </div>
                            <div className="space-y-1 group cursor-pointer">
                                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-400 group-hover:text-neutral-900 transition-colors duration-300">Headquarters</span>
                                <p>
                                    Slots Sports Wear Studio
                                </p>
                                <p>
                                    Punjab, Pakistan
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='hidden md:block'>
                        <img src="https://i.pinimg.com/originals/e9/44/59/e94459230601ba8b642e784ea1420457.png" alt="connect" className='object-cover h-full w-full' />
                    </div>
                </section>

                <div className="w-full h-px bg-neutral-900/10 fade-up" />

                {/* SECTION 2: TECH PACK FORM */}
                <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 scroll-fade p-15" id='teckpack'>
                    <div className="space-y-5">
                        <Heading title="Tech Pack Submission" />
                        <p>
                            Submit your detailed specifications. We streamline the initial phase of design to ensure absolute clarity before production begins.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                            {/* Name */}
                            <div className="relative group">
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder=" " className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium placeholder-transparent" />
                                <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-neutral-900 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-neutral-900 pointer-events-none">Full Name *</label>
                            </div>

                            {/* Email */}
                            <div className="relative group">
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder=" " className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium placeholder-transparent" />
                                <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-neutral-900 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-neutral-900 pointer-events-none">Email Address *</label>
                            </div>

                            {/* Company */}
                            <div className="relative group">
                                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder=" " className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium placeholder-transparent" />
                                <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-neutral-900 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-neutral-900 pointer-events-none">Company Name</label>
                            </div>

                            {/* Product Type (Select) */}
                            <div className="relative group flex flex-col justify-end pt-[10px]">
                                <select required name="productType" value={formData.productType} onChange={handleChange} className="w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium appearance-none cursor-pointer">
                                    <option value="" disabled>Select Product Type *</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat.slug} className="uppercase text-neutral-900">
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <Icon name="arrow" className="absolute right-0 bottom-4 w-3 h-3 text-neutral-900 pointer-events-none" />
                            </div>

                            {/* Product Slug (ReadOnly if from Wardrobe button) */}
                            <div className="relative group">
                                <input type="text" name="productSlug" value={formData.productSlug} onChange={handleChange} placeholder=" " className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium placeholder-transparent" />
                                <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-neutral-900 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-neutral-900 pointer-events-none">Product Title / Slug (Optional)</label>
                            </div>

                            {/* Quantity */}
                            <div className="relative group">
                                <input required type="number" min="1" name="quantity" value={formData.quantity} onChange={handleChange} placeholder=" " className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium placeholder-transparent" />
                                <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-neutral-900 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-neutral-900 pointer-events-none">Estimated Quantity *</label>
                            </div>

                            {/* Deadline */}
                            <div className="relative group md:col-span-2">
                                <input required type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium text-neutral-900" />
                                <label className="absolute left-0 -top-4 text-[9px] uppercase tracking-widest text-neutral-900 font-bold pointer-events-none">Target Deadline *</label>
                            </div>

                            {/* Customization Details */}
                            <div className="relative group md:col-span-2 mt-4">
                                <textarea required rows={4} name="customizationDetails" value={formData.customizationDetails} onChange={handleChange} placeholder=" " className="peer w-full bg-transparent border-b border-neutral-900/20 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors uppercase tracking-widest font-medium placeholder-transparent resize-none" />
                                <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-neutral-900 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-neutral-900 pointer-events-none">Customization Specs & Material Need *</label>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                disabled={isSubmitting}
                                className="group w-full relative flex items-center justify-center gap-4 px-12 py-5 bg-neutral-900 text-[#EDEEE7] cursor-pointer overflow-hidden disabled:opacity-50"
                            >
                                <div className="absolute inset-0 bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                                <span className="relative z-10 text-[10px] uppercase font-bold tracking-[0.4em]">{isSubmitting ? 'Transmitting...' : 'Submit Tech Pack'}</span>
                                {!isSubmitting && <Icon name="arrow" className="relative z-10 -rotate-45deg scale-75 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                            </button>
                        </div>
                    </form>
                </section>

                {/* SECTION 3: LOCATION MAP */}
                <section className="scroll-fade relative aspect-[21/9] lg:aspect-[3/1] bg-neutral-200 overflow-hidden group mb-10 mt-10">
                    <div className="absolute inset-0 scale-105 group-hover:scale-100 transition-transform duration-[3s] ease-out brightness-90 grayscale bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />

                    {/* Location Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                        <div className="size-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl relative animate-pulse">
                            <div className="size-3 bg-white rounded-full" />
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20">
                        <span className="block text-[10px] uppercase font-bold tracking-[0.4em] text-white opacity-80 mb-1">HQ Location</span>
                        <span className="text-sm font-medium tracking-wide text-white">Punjab, PK — Global Reach</span>
                    </div>
                </section>

            </div>
        </div>
    );
}
