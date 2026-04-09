import type { Metadata } from 'next';
import Link from 'next/link';
import FormattedTitle from '../components/FormattedTitle';

export const metadata: Metadata = {
    title: 'Our Story',
    description: 'Discover the story behind Slots Sports Wear — a premium sportswear manufacturer born in Pakistan, built on quality craftsmanship, low MOQ, and a passion for performance apparel.',
    openGraph: {
        title: 'Our Story — Slots Sports Wear',
        description: 'From a small workshop to a globally trusted sportswear manufacturer. Learn how Slots Sports Wear was built on quality, integrity, and performance.',
        images: [{ url: 'https://i.pinimg.com/1200x/70/64/3f/70643f7a6e3937ce322314083d60ea8d.jpg', width: 1200, height: 630, alt: 'Slots Sports Wear Factory' }],
    },
};

const milestones = [
    { year: '2018', title: 'The Beginning', desc: 'Started as a small workshop in Lahore, Pakistan, with a mission to produce performance sportswear that meets international quality standards.' },
    { year: '2020', title: 'Global Expansion', desc: 'Began exporting to brands across the USA, UK, and Australia. Our ISO-certified facility expanded to 100+ skilled workers.' },
    { year: '2022', title: 'Tech-Pack Integration', desc: 'Introduced a full tech-pack submission system, enabling global brands to submit designs and receive samples in as little as 7 days.' },
    { year: '2024', title: 'Industry Recognition', desc: 'Reached 50,000+ monthly production capacity. Trusted by 200+ active brands worldwide with a 4.8★ average client rating.' },
    { year: '2026', title: 'Today & Beyond', desc: 'Continuing to innovate with sustainable fabric sourcing, digital design tools, and next-day sampling for premium customers.' },
];

const values = [
    { title: 'Craftsmanship', desc: 'Every stitch matters. Our artisans bring decades of textile know-how to every order, small or large.' },
    { title: 'Transparency', desc: 'No hidden costs. No surprises. We give you full cost breakdowns, production timelines, and honest communication.' },
    { title: 'Sustainability', desc: 'We source eco-certified fabrics and minimise waste across our production lines — because quality should not cost the planet.' },
    { title: 'Partnership', desc: 'We are not just a vendor — we are your brand\'s manufacturing partner, invested in your long-term growth.' },
];

export default function StoryPage() {
    return (
        <main className="w-full bg-[#EDEEE7] min-h-screen">

            {/* Hero */}
            <section className="w-full pt-[12vh] pb-20 px-5 md:px-10">
                <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-6 text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Est. 2018 · Punjab, Pakistan</span>
                    <h1 className="uppercase"><FormattedTitle>Our Story</FormattedTitle></h1>
                    <p className="md:w-[55%] w-full">
                        From a single cutting table in Lahore to a globally trusted manufacturing partner — this is how Slots Sports Wear was built, stitch by stitch.
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

            {/* Mission */}
            <section className="w-full px-5 md:px-10 py-20 max-w-screen-xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Our Mission</span>
                        <h2><FormattedTitle>Manufacturing Excellence, Without Compromise</FormattedTitle></h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>
                            Slots Sports Wear was founded on a belief that quality sportswear manufacturing should be accessible to brands of all sizes. We combine Pakistan's deep textile heritage with modern production technology to deliver apparel that performs — on the field and in the market.
                        </p>
                        <p>
                            Our ISO-certified facility runs on a simple principle: every brand that trusts us with their product deserves factory-direct pricing, expert craftsmanship, and a partner that communicates honestly throughout the entire process.
                        </p>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="w-full px-5 md:px-10 py-20 bg-[#111111] text-[#EDEEE7]">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-14">
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">How We Got Here</span>
                        <h2 className="!text-[#EDEEE7]"><FormattedTitle>Our Journey</FormattedTitle></h2>
                    </div>
                    <div className="flex flex-col gap-0">
                        {milestones.map((m, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-5 md:gap-16 border-t border-white/10 py-8">
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30 md:w-24 shrink-0 pt-1">{m.year}</span>
                                <div className="flex flex-col gap-2">
                                    <h3 className="!text-[#EDEEE7]"><FormattedTitle>{m.title}</FormattedTitle></h3>
                                    <p className="text-[#EDEEE7]/60">{m.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="w-full px-5 md:px-10 py-20 max-w-screen-xl mx-auto">
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">What We Stand For</span>
                        <h2><FormattedTitle>Our Core Values</FormattedTitle></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {values.map((v, i) => (
                            <div key={i} className="ios-card flex flex-col gap-3 p-8">
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">0{i + 1}</span>
                                <h3><FormattedTitle>{v.title}</FormattedTitle></h3>
                                <p>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full px-5 md:px-10 py-20 border-t border-black/10">
                <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col gap-3">
                        <h2><FormattedTitle>Ready to Build Your Brand?</FormattedTitle></h2>
                        <p className="md:w-[70%]">Start with 50 pieces. Scale to 50,000. Our team is ready to help you produce the apparel your customers will love.</p>
                    </div>
                    <div className="flex gap-4 shrink-0">
                        <Link href="/contact#teckpack" className="px-8 py-4 bg-black text-[#EDEEE7] hover:bg-black/80 transition-colors tracking-widest text-[10px] uppercase font-bold">
                            Submit Tech Pack
                        </Link>
                        <Link href="/about" className="px-8 py-4 border border-black hover:bg-black hover:text-[#EDEEE7] transition-colors tracking-widest text-[10px] uppercase font-bold">
                            About Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
