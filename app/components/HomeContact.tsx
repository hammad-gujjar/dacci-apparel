'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import Heading from './Heading';
import { useLoader } from '../context/LoaderContext';
import Icon from './Icon';
import axios from 'axios';
import toast from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

const HomeContact = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isLoading } = useLoader();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        if (!email) return;

        setIsSubmitting(true);
        try {
            const { data } = await axios.post('/api/subscribe', { email });
            if (data.success) {
                toast.success('Successfully subscribed to our newsletter.');
                setEmail('');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Subscription failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section ref={containerRef} className="w-full py-24 px-5 md:px-10 bg-[#EDEEE7]">
            <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center gap-12">
                
                {/* Header */}
                <div className="flex flex-col gap-5 max-w-2xl reveal-up items-center">
                    <span className="text-black/30 text-[10px] uppercase tracking-[0.6em] font-bold">The Journal</span>
                    <Heading title="SUBSCRIBE TO OUR MINIMALIST DIALOGUE." className='!text-center' />
                    <p className='text-center'>
                        Join our exclusive circle for tech-pack insights, manufacturing updates, and new collection reveals.
                    </p>
                </div>

                {/* Minimalist Form */}
                <form 
                    onSubmit={handleSubmit} 
                    className="w-full max-w-md flex flex-col sm:flex-row gap-4 reveal-up"
                >
                    <div className="relative flex-1 group">
                        <input 
                            required
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address" 
                            className="w-full bg-transparent border-b border-black/20 py-4 text-sm focus:outline-none focus:border-black transition-colors uppercase tracking-widest font-medium placeholder:text-black/20 h-full"
                        />
                    </div>
                    <button 
                        disabled={isSubmitting}
                        type="submit"
                        className="group relative flex items-center justify-center gap-4 px-10 py-5 bg-black text-[#EDEEE7] cursor-pointer overflow-hidden disabled:opacity-50 min-w-[180px]"
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
