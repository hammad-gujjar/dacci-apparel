import type { Metadata } from 'next';
import Link from 'next/link';
import Heading from '../components/Heading';
import TransitionButton from '../components/TransitionButton';

export const metadata: Metadata = {
    title: {
        absolute: 'Custom Sportswear Manufacturing for Brands | SLOTS SPORTSWEAR',
    },
    description: 'Discover our heritage in custom sportswear manufacturing for brands. Precision private label sportswear and custom apparel production from Sialkot, Pakistan to global athletic labels.',
    alternates: {
        canonical: '/story',
    },
    openGraph: {
        title: 'Custom Sportswear Manufacturing for Brands | SLOTS SPORTSWEAR',
        description: 'Discover our heritage in custom sportswear manufacturing for brands. Precision private label sportswear and custom apparel production from Sialkot, Pakistan to global athletic labels.',
        url: 'https://slotssportswear.vercel.app/story',
        images: [{ url: 'https://i.pinimg.com/1200x/70/64/3f/70643f7a6e3937ce322314083d60ea8d.jpg', width: 1200, height: 630, alt: 'Slots Sports Wear Manufacturing Facility' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Custom Sportswear Manufacturing for Brands | SLOTS SPORTSWEAR',
        description: 'Discover our heritage in custom sportswear manufacturing for brands. Precision private label sportswear and custom apparel production from Sialkot, Pakistan to global athletic labels.',
        images: ['https://i.pinimg.com/1200x/70/64/3f/70643f7a6e3937ce322314083d60ea8d.jpg'],
    }
};

const milestones = [
    { year: '2018', title: 'The Beginning', desc: 'Established as a specialized cut-and-sew workshop in Sialkot, Pakistan, focusing purely on high-performance athletic apparel for local teams and athletic clubs.' },
    { year: '2020', title: 'Global Export Operations', desc: 'Scaled operations to support international B2B clients across North America, the UK, and Australia with integrated OEM manufacturing services.' },
    { year: '2022', title: 'Technical Modernization', desc: 'Implemented comprehensive digital tech-pack translation, automated laser cutting, and industrial dye-sublimation departments to streamline global orders.' },
    { year: '2024', title: 'High-Volume Capacity', desc: 'Expanded infrastructure to support 50,000+ pieces monthly while maintaining strict AQL 2.5 quality control standards for over 200 active brand partners.' },
    { year: '2026', title: 'Advanced Private Label', desc: 'Pioneering rapid 7-14 day prototype sampling and sustainable technical fabric sourcing for premium global activewear and streetwear brands.' },
];

const principles = [
    { title: 'Precision Manufacturing', desc: 'Every tech pack is meticulously translated into CAD patterns with exact grading tolerances to ensure absolute consistency across all bulk production runs.' },
    { title: 'Fabric Development', desc: 'Strategic sourcing of premium technical textiles, moisture-wicking blends, and high-recovery elastane directly from certified global mills.' },
    { title: 'Total Customization', desc: 'End-to-end OEM/ODM capabilities including sublimation, high-density screen printing, tackle twill embroidery, and custom bespoke trims.' },
    { title: 'Quality Control', desc: 'Rigorous inline and final QA inspections following strict AQL guidelines to guarantee zero compromises on seam strength, sizing, and color accuracy.' },
    { title: 'Reliable Communication', desc: 'Direct, transparent factory-to-brand communication providing complete visibility over your production timeline, sampling, and exact cost breakdowns.' },
    { title: 'Global Partnerships', desc: 'Built to scale with your brand - from flexible 30-piece low MOQs for startups to high-volume container shipments for established global retailers.' },
];

const capabilities = [
    'Custom Teamwear',
    'Fitness Apparel',
    'Activewear',
    'Sports Uniforms',
    'Private Label Apparel'
];

export default function StoryPage() {
    return (
        <main className="w-full bg-[#EDEEE7] min-h-screen text-[#111111]">
            {/* Hero */}
            <section className="w-full pt-[15vh] pb-20 px-5 md:px-10">
                <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-6 text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Est. 2018 · Sialkot, Pakistan</span>
                    <Heading as="h1" title="Custom Sportswear Manufacturing For Brands" className="uppercase justify-center" />
                    <p className="md:w-[55%] w-full">
                        From a dedicated workshop in Sialkot, Pakistan to an international factory-direct partner. Discover our heritage in custom apparel production and private label sportswear.
                    </p>
                </div>
            </section>

            {/* Full-width image */}
            <div className="w-full px-5 md:px-10">
                <img
                    src="https://i.pinimg.com/1200x/70/64/3f/70643f7a6e3937ce322314083d60ea8d.jpg"
                    alt="Slots Sports Wear manufacturing facility"
                    className="w-full h-[60vh] md:h-[80vh] object-cover"
                    loading="eager"
                />
            </div>

            {/* Origins */}
            <section className="w-full px-5 md:px-10 py-24 max-w-screen-xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Our Origins</span>
                        <h2 className="uppercase">Manufacturing Excellence, Without Compromise</h2>
                    </div>
                    <div className="flex flex-col gap-6">
                        <p>
                            SLOTS SPORTSWEAR was founded on a distinct manufacturing philosophy: premium custom sportswear production must be accessible, transparent, and scalable for brands of all sizes. By combining Pakistan's deep textile heritage with modern production technology, we deliver athletic apparel that performs flawlessly on the field and in the market.
                        </p>
                        <p>
                            Our ISO-certified facility operates under one strict principle - every brand that trusts us with their tech packs deserves factory-direct pricing, expert craftsmanship, and a B2B partner that communicates honestly throughout the entire OEM/ODM lifecycle.
                        </p>
                    </div>
                </div>
            </section>

            {/* What We Manufacture Today */}
            <section className="w-full px-5 md:px-10 py-20 bg-white/40 backdrop-blur-sm border-y border-black/10">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-10 text-center items-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Production Capabilities</span>
                    <h2 className="uppercase">What We Manufacture Today</h2>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {capabilities.map((cap, i) => (
                            <span key={i} className="px-6 py-3 border border-black/20 rounded-full text-sm font-semibold tracking-wider uppercase">
                                {cap}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="w-full px-5 md:px-10 py-24 bg-[#111111] text-[#EDEEE7]">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-14">
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Manufacturing Evolution</span>
                        <h2 className="!text-[#EDEEE7] uppercase">Our Journey</h2>
                    </div>
                    <div className="flex flex-col gap-0">
                        {milestones.map((m, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-5 md:gap-16 border-t border-white/10 py-10">
                                <span className="text-[12px] font-[main] tracking-[0.2em] opacity-40 md:w-32 shrink-0 pt-1">{m.year}</span>
                                <div className="flex flex-col gap-4">
                                    <h3 className="!text-[#EDEEE7] text-2xl uppercase">{m.title}</h3>
                                    <p className="text-[#EDEEE7]/60 md:w-[80%] leading-relaxed">{m.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Principles */}
            <section className="w-full px-5 md:px-10 py-24 max-w-screen-xl mx-auto">
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Our Core Principles</span>
                        <h2 className="uppercase">Manufacturing Standards</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {principles.map((v, i) => (
                            <div key={i} className="ios-card bg-white/40 flex flex-col gap-4 p-10 border border-black/5">
                                <span className="text-[10px] font-bold opacity-30">0{i + 1}</span>
                                <h3 className="uppercase text-xl">{v.title}</h3>
                                <p className="text-neutral-700 leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full px-5 md:px-10 py-24 border-t border-black/10">
                <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center gap-8">
                    <h2 className="uppercase">Ready to Build Your Brand?</h2>
                    <p className="md:w-[60%] text-lg">
                        From design to bulk production, our factory is equipped to scale with your brand. Partner with a manufacturer that prioritizes quality and transparency.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <TransitionButton
                            text="Request A Quote"
                            url="/contact"
                            rollingText
                            className="px-10 py-5 bg-[#111111] text-[#EDEEE7] hover:bg-black/80 transition-colors tracking-widest text-[12px] uppercase font-bold"
                        />
                        <TransitionButton
                            text="View Manufacturing Process"
                            url="/manufacturing-process"
                            rollingText
                            className="px-10 py-5 border border-[#111111] text-[#111111] hover:bg-black hover:text-[#EDEEE7] transition-colors tracking-widest text-[12px] uppercase font-bold"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
