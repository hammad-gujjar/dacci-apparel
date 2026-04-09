import type { Metadata } from 'next';
import Link from 'next/link';
import FormattedTitle from '../components/FormattedTitle';

export const metadata: Metadata = {
    title: 'Shipping Information',
    description: 'Learn about Slots Sports Wear shipping options, international delivery timelines, customs, and how we ensure safe delivery of your bulk apparel orders worldwide.',
    openGraph: {
        title: 'Shipping Information — Slots Sports Wear',
        description: 'Fast, reliable international shipping from Pakistan. Air and sea freight options to the USA, UK, Europe, Australia, and beyond.',
    },
};

export default function ShippingPage() {
    return (
        <main className="w-full bg-[#EDEEE7] min-h-screen">

            {/* Hero */}
            <section className="w-full pt-[12vh] pb-16 px-5 md:px-10 border-b border-black/10">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-5">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Logistics & Delivery</span>
                    <h1 className="uppercase"><FormattedTitle>Shipping Information</FormattedTitle></h1>
                    <p className="md:w-[50%] w-full">
                        We ship globally from our facility in Punjab, Pakistan. Every order is packed with care, fully insured, and tracked from factory to your door.
                    </p>
                </div>
            </section>

            {/* Shipping Methods */}
            <section className="w-full px-5 md:px-10 py-16 max-w-screen-xl mx-auto flex flex-col gap-12">
                <div className="flex flex-col gap-3">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">How We Ship</span>
                    <h2><FormattedTitle>Shipping Methods</FormattedTitle></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                        {
                            label: 'Air Freight',
                            time: '5–10 Business Days',
                            desc: 'The fastest delivery option. We partner with DHL Express, FedEx, and Aramex for door-to-door delivery. Ideal for urgent orders and smaller consignments.',
                            note: 'Recommended for orders under 500 kg.'
                        },
                        {
                            label: 'Sea Freight',
                            time: '20–35 Business Days',
                            desc: 'Cost-effective for large bulk orders. Goods are shipped via partnered freight forwarders in FCL or LCL containers to major global ports.',
                            note: 'Best for orders above 500 kg or high-volume production runs.'
                        },
                        {
                            label: 'Express Courier',
                            time: '3–7 Business Days',
                            desc: 'Available for sample shipments and urgent small parcels. Shipped via DHL or FedEx Priority. Tracking provided immediately after dispatch.',
                            note: 'Samples and small test orders only.'
                        },
                        {
                            label: 'Custom Logistics',
                            time: 'Negotiated',
                            desc: 'For enterprise clients with regular large orders, we offer dedicated freight arrangements, preferred carrier rates, and consolidated shipping schedules.',
                            note: 'Contact us to discuss enterprise logistics solutions.'
                        },
                    ].map((m, i) => (
                        <div key={i} className="ios-card flex flex-col gap-4 p-8">
                            <div className="flex items-start justify-between gap-4">
                                <h3><FormattedTitle>{m.label}</FormattedTitle></h3>
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold bg-black text-[#EDEEE7] px-3 py-1 shrink-0">{m.time}</span>
                            </div>
                            <p>{m.desc}</p>
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">{m.note}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Delivery Regions */}
            <section className="w-full px-5 md:px-10 py-16 bg-[#111111] text-[#EDEEE7]">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-12">
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Where We Deliver</span>
                        <h2 className="!text-[#EDEEE7]"><FormattedTitle>Global Delivery Regions</FormattedTitle></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            { region: 'North America', countries: 'USA, Canada, Mexico', air: '6–9 days', sea: '22–28 days' },
                            { region: 'Europe', countries: 'UK, Germany, France, Italy, Netherlands', air: '5–8 days', sea: '20–30 days' },
                            { region: 'Australia & NZ', countries: 'Australia, New Zealand', air: '7–10 days', sea: '25–35 days' },
                            { region: 'Middle East', countries: 'UAE, Saudi Arabia, Qatar, Kuwait', air: '3–5 days', sea: '15–22 days' },
                            { region: 'Asia', countries: 'China, Japan, South Korea, Singapore', air: '4–7 days', sea: '18–25 days' },
                            { region: 'Rest of World', countries: 'All other regions on request', air: '8–14 days', sea: 'Varies' },
                        ].map((r, i) => (
                            <div key={i} className="border border-white/10 p-6 flex flex-col gap-3">
                                <h3 className="!text-[#EDEEE7]"><FormattedTitle>{r.region}</FormattedTitle></h3>
                                <p className="text-[#EDEEE7]/50 text-sm">{r.countries}</p>
                                <div className="flex flex-col gap-1 pt-2 border-t border-white/10">
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Air: {r.air}</span>
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Sea: {r.sea}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customs & Duties */}
            <section className="w-full px-5 md:px-10 py-16 max-w-screen-xl mx-auto flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Important</span>
                    <h2><FormattedTitle>Customs & Import Duties</FormattedTitle></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                    <div className="flex flex-col gap-4">
                        <p>
                            All shipments are dispatched from Pakistan and may be subject to customs inspections and import duties in the destination country. These costs are the buyer's responsibility and vary based on country, goods category, and order value.
                        </p>
                        <p>
                            We provide all required export documentation: commercial invoices, packing lists, certificates of origin, and any certifications requested. This ensures smooth customs clearance and minimal delays.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="ios-card p-6 flex flex-col gap-3">
                            <h3><FormattedTitle>Documents We Provide</FormattedTitle></h3>
                            <ul className="flex flex-col gap-2 pt-2">
                                {['Commercial Invoice', 'Packing List', 'Certificate of Origin', 'Quality Inspection Certificate', 'Bill of Lading / Airway Bill'].map((doc) => (
                                    <li key={doc} className="flex items-center gap-3 text-sm">
                                        <span className="size-1.5 rounded-full bg-black shrink-0" />
                                        {doc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full px-5 md:px-10 py-16 border-t border-black/10">
                <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col gap-3">
                        <h2><FormattedTitle>Questions About Your Shipment?</FormattedTitle></h2>
                        <p>Our logistics team is available to help with tracking, documentation, and freight questions.</p>
                    </div>
                    <div className="flex gap-4 shrink-0 flex-wrap">
                        <Link href="/contact" className="px-8 py-4 bg-black text-[#EDEEE7] hover:bg-black/80 transition-colors tracking-widest text-[10px] uppercase font-bold">
                            Contact Us
                        </Link>
                        <Link href="/faq" className="px-8 py-4 border border-black hover:bg-black hover:text-[#EDEEE7] transition-colors tracking-widest text-[10px] uppercase font-bold">
                            View FAQs
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
