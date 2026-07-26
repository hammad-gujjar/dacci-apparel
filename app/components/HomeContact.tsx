'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import { useLoader } from '../context/LoaderContext';
import Icon from './Icon';
import axios from 'axios';
import toast from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

const HomeContact = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isLoading } = useLoader();
    const [form, setForm] = useState({ firstName: '', contact: '', inquiry: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const set = (key: keyof typeof form, value: string) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    useGSAP(() => {
        if (isLoading) return;

        // Reveal animation for the entire section
        gsap.fromTo('.reveal-up',
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power4.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );

    }, { dependencies: [isLoading], scope: containerRef });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.firstName || !form.contact || !form.inquiry) return;

        setIsSubmitting(true);
        try {
            const { data } = await axios.post('/api/subscribe', form);
            if (data.success) {
                toast.success('Your inquiry has been sent — we will get back to you shortly.');
                setForm({ firstName: '', contact: '', inquiry: '' });
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass =
        "w-full bg-transparent border-b border-black/20 py-4 text-sm focus:outline-none focus:border-black transition-colors tracking-widest font-medium placeholder:text-black/20";

    return (
        <section ref={containerRef} className="w-full py-24 px-5 md:px-10 bg-[#EDEEE7]">
            <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center gap-12">

                {/* Header — Heading component removed, plain centered h1 */}
                <div className="flex flex-col gap-5 max-w-2xl reveal-up items-center">
                    <span className="text-black/30 text-[10px] uppercase tracking-[0.6em] font-bold">The Journal</span>
                    <h1 className="text-center text-3xl md:text-5xl font-bold uppercase tracking-tight text-black">
                        Subscribe To Our Minimalist Dialogue.
                    </h1>
                    <p className='text-center'>
                        Join our exclusive circle for tech-pack insights, manufacturing updates, and new collection reveals.
                    </p>
                </div>

                {/* Inquiry Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md flex flex-col gap-6 reveal-up"
                >
                    <input
                        required
                        type="text"
                        value={form.firstName}
                        onChange={(e) => set('firstName', e.target.value)}
                        placeholder="First Name"
                        className={inputClass}
                    />
                    <input
                        required
                        type="text"
                        value={form.contact}
                        onChange={(e) => set('contact', e.target.value)}
                        placeholder="Email / WhatsApp Number"
                        className={inputClass}
                    />
                    <textarea
                        required
                        rows={3}
                        value={form.inquiry}
                        onChange={(e) => set('inquiry', e.target.value)}
                        placeholder="Your Inquiry"
                        className={`${inputClass} resize-none`}
                    />
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="group relative flex items-center justify-center gap-4 px-10 py-5 bg-black text-[#EDEEE7] cursor-pointer overflow-hidden disabled:opacity-50 mt-2"
                    >
                        <div className="absolute inset-0 bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                        <span className="relative z-10 text-[10px] uppercase font-bold tracking-[0.4em]">
                            {isSubmitting ? 'Processing' : 'Subscribe'}
                        </span>
                        {!isSubmitting && <Icon name="arrow" className="relative z-10 -rotate-45deg scale-75 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    </button>
                </form>

                {/* Footer Style Divider */}
                <div className="w-full h-px bg-black/5 reveal-up mt-12 pb-10"></div>

                <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 reveal-up text-black/20 text-[9px] uppercase font-bold tracking-[0.4em]">
                    <p>© 2026 Slots Sports Wear. All rights reserved.</p>
                    <div className="flex gap-10">
                        <a href="/policy" className="hover:text-black transition-colors">Privacy Policy</a>
                        <a href="/terms" className="hover:text-black transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeContact;
