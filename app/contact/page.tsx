'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heading from '../components/Heading';
import Icon from '../components/Icon';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [openAccordion, setOpenAccordion] = useState<number | null>(0);

    useGSAP(() => {
        const section = containerRef.current;
        if (!section) return;

        // Entrance animations
        gsap.from('.contact-reveal', {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out'
        });

        // Map scroll reveal
        gsap.from('.map-container', {
            scale: 0.95,
            opacity: 0,
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.map-container',
                start: 'top 85%'
            }
        });
    }, { scope: containerRef });

    const ACCORDION_ITEMS = [
        { title: "Wholesale Inquiries", content: "For boutiques and department stores looking to carry Dacci Apparel, please contact wholesale@dacci.com. We offer curated seasonal selections for premium retailers." },
        { title: "Press & Media", content: "Contact press@dacci.com for high-res assets, interview requests, or lookbook access. Our PR team responds within 24 hours." },
        { title: "Custom Commissions", content: "For bespoke tailoring or unique limited editions, reach out to atelier@dacci.com. We take on a limited number of commissions each quarter." },
        { title: "General Support", content: "Questions about your order or our processes? Email hello@dacci.com or visit our FAQ page." }
    ];

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-[#EDEEE7] text-black pt-32">
            
            {/* VISIT US SECTION (Image 1 Style) */}
            <section className="px-5 md:px-10 lg:px-20 mb-10">
                <div className="bg-black text-[#EDEEE7] rounded-[3vw] overflow-hidden p-10 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div className="space-y-12">
                        <div className="space-y-4 contact-reveal">
                            <h1 className="text-5xl md:text-8xl font-[main] uppercase tracking-tighter text-white">Visit Us.</h1>
                            <p className="text-white/50 font-light max-w-sm leading-relaxed">
                                Our flagship studio is located in the corazón of the design district, where we host private viewings and fittings.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-10 contact-reveal">
                            <div className="space-y-4">
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30">Location</span>
                                <p className="text-sm font-light leading-relaxed">
                                    500 Terry Francois Street,<br /> San Francisco, CA 94158
                                </p>
                            </div>
                            <div className="space-y-4">
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30">Hours</span>
                                <p className="text-sm font-light leading-relaxed">
                                    Mon-Fri: 9am - 6pm<br />
                                    Sat-Sun: 10am - 4pm
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="map-container relative aspect-video lg:aspect-square bg-neutral-800 rounded-[2vw] overflow-hidden group">
                        {/* Mock Map View */}
                        <div className="absolute inset-0 grayscale opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=San+Francisco&zoom=13&size=800x800&sensor=false')] bg-cover bg-center group-hover:scale-110 transition-transform duration-2000" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="size-16 bg-white rounded-full flex items-center justify-center shadow-2xl relative">
                                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
                                <div className="size-4 bg-black rounded-full" />
                            </div>
                        </div>
                        <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold">Directions</div>
                    </div>
                </div>
            </section>

            {/* GET IN TOUCH SECTION */}
            <section className="py-32 px-5 md:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="space-y-8">
                    <Heading title="Start a Conversation." />
                    <p className="text-black/50 font-light max-w-md leading-relaxed">
                        Whether you have a question about our collections or just want to discuss minimalism, we're always open for a dialogue.
                    </p>
                </div>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Your Name</label>
                            <input type="text" className="w-full bg-transparent border-b border-black/10 py-4 focus:border-black outline-none transition-colors uppercase text-sm font-medium tracking-tighter" placeholder="Hammad Gujjar" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Email Address</label>
                            <input type="email" className="w-full bg-transparent border-b border-black/10 py-4 focus:border-black outline-none transition-colors uppercase text-sm font-medium tracking-tighter" placeholder="hello@example.com" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Message</label>
                        <textarea rows={4} className="w-full bg-transparent border-b border-black/10 py-4 focus:border-black outline-none transition-colors uppercase text-sm font-medium tracking-tighter resize-none" placeholder="How can we help?" />
                    </div>
                    <button className="dark-button !bg-black !text-white px-12">Submit Request</button>
                </form>
            </section>

            {/* CONNECT - ACCORDION SECTION (Image 3 Style Inspiration) */}
            <section className="py-32 bg-black text-[#EDEEE7]">
                <div className="px-5 md:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-20">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-6xl font-[main] uppercase tracking-tighter leading-none">Global <br /> Operations.</h2>
                        <p className="text-white/40 font-light max-w-xs leading-relaxed">
                            Our network spans across design, production, and distribution. Reach out to the specific department for faster processing.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {ACCORDION_ITEMS.map((item, i) => (
                            <div key={i} className="border-b border-white/10 pb-6 overflow-hidden">
                                <button 
                                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                                    className="w-full flex items-center justify-between group py-4"
                                >
                                    <h3 className={cn(
                                        "text-2xl font-[main] uppercase tracking-tight transition-colors",
                                        openAccordion === i ? "text-white" : "text-white/40 group-hover:text-white"
                                    )}>
                                        {item.title}
                                    </h3>
                                    <div className={cn(
                                        "size-4 flex items-center justify-center transition-transform duration-500",
                                        openAccordion === i ? "rotate-45" : "rotate-0"
                                    )}>
                                        <div className="absolute w-full h-0.5 bg-white" />
                                        <div className="absolute h-full w-0.5 bg-white" />
                                    </div>
                                </button>
                                <div className={cn(
                                    "overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16, 1, 0.3, 1)]",
                                    openAccordion === i ? "max-h-[200px] opacity-100 mt-4" : "max-h-0 opacity-0"
                                )}>
                                    <p className="text-white/50 font-light leading-relaxed max-w-lg pb-4">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEWSLETTER (Image 1 Style Inspiration) */}
            <section className="py-32 px-5 md:px-10 lg:px-20">
                <div className="bg-[#B39C7E] rounded-[3vw] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative group">
                    <div className="space-y-6 relative z-10">
                        <span className="inline-block px-4 py-1.5 border border-black/10 rounded-full text-xs uppercase tracking-[0.3em] font-bold">Join the club</span>
                        <h3 className="text-4xl md:text-6xl font-[main] uppercase tracking-tighter leading-none">
                            Get system <br /> updates to <br /> your inbox.
                        </h3>
                    </div>
                    
                    <div className="w-full md:w-1/3 space-y-4 relative z-10">
                        <input type="email" className="w-full p-6 bg-white/20 backdrop-blur-md rounded-2xl border border-black/5 outline-none placeholder:text-black/30 text-black uppercase text-xs font-bold tracking-widest focus:bg-white/40 transition-all" placeholder="Enter Your Email" />
                        <button className="w-full py-6 bg-black text-white rounded-2xl uppercase text-xs font-black tracking-widest hover:scale-[1.02] active:scale-95 transition-all">Subscribe Now</button>
                    </div>

                    {/* Background abstract decoration from Image 1 */}
                    <div className="absolute top-0 right-0 h-full w-1/2 bg-white/5 skew-x-[-20deg] translate-x-1/2" />
                </div>
            </section>

        </div>
    );
};

export default ContactPage;
