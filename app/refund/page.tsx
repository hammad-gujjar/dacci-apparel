import type { Metadata } from 'next';
import Link from 'next/link';
import FormattedTitle from '../components/FormattedTitle';

export const metadata: Metadata = {
    title: 'Returns & Refunds',
    description: 'Understand the Slots Sports Wear Returns and Refund Policy. Learn the conditions for returns, how to initiate a return, and our refund processing timelines.',
    openGraph: {
        title: 'Returns & Refunds Policy — Slots Sports Wear',
        description: 'Our clear and fair returns policy for custom sportswear orders. Your satisfaction is backed by our quality guarantee.',
    },
    robots: { index: true, follow: true },
};

export default function RefundPage() {
    return (
        <main className="w-full bg-[#EDEEE7] min-h-screen">

            {/* Hero */}
            <section className="w-full pt-[12vh] pb-16 px-5 md:px-10 border-b border-black/10">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-5">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Policy · Last Updated: April 2026</span>
                    <h1 className="uppercase"><FormattedTitle>Returns & Refunds</FormattedTitle></h1>
                    <p className="md:w-[55%] w-full">
                        At Slots Sports Wear, we stand behind the quality of every order. This policy outlines when returns are accepted, how they are processed, and what you can expect.
                    </p>
                </div>
            </section>

            {/* Key Policy Points */}
            <section className="w-full px-5 md:px-10 py-16 max-w-screen-xl mx-auto flex flex-col gap-12">
                <div className="flex flex-col gap-3">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">At a Glance</span>
                    <h2><FormattedTitle>Our Return Commitment</FormattedTitle></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                        {
                            label: 'Return Window',
                            value: '14 Days',
                            desc: 'Claims must be raised within 14 days of delivery. Provide photographic evidence and written details of the issue.',
                        },
                        {
                            label: 'Quality Defects',
                            value: 'Full Remedy',
                            desc: 'Confirmed defects receive free replacement production or a full refund — your choice, no questions asked.',
                        },
                        {
                            label: 'Refund Timeline',
                            value: '7–14 Days',
                            desc: 'Approved refunds are processed within 7–14 business days to your original payment method or bank account.',
                        },
                    ].map((item, i) => (
                        <div key={i} className="ios-card flex flex-col gap-4 p-8">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">{item.label}</span>
                            <h2><FormattedTitle>{item.value}</FormattedTitle></h2>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Eligible Returns */}
            <section className="w-full px-5 md:px-10 py-16 bg-[#111111] text-[#EDEEE7]">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-12">
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Conditions</span>
                        <h2 className="!text-[#EDEEE7]"><FormattedTitle>When Returns Are Accepted</FormattedTitle></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="border border-white/10 p-8 flex flex-col gap-5">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-green-400">Eligible for Return</span>
                            <ul className="flex flex-col gap-3">
                                {[
                                    'Goods with confirmed manufacturing defects (stitching failures, fabric flaws, wrong cuts).',
                                    'Items that significantly differ from the approved production sample.',
                                    'Incorrect items shipped due to an error on our part.',
                                    'Goods damaged in transit (must be reported within 48 hours of delivery with carrier documentation).',
                                    'Colour deviations outside the accepted dye lot tolerance range.',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-[#EDEEE7]/80">
                                        <span className="size-1.5 rounded-full bg-green-400 shrink-0 mt-1.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="border border-white/10 p-8 flex flex-col gap-5">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-red-400">Not Eligible for Return</span>
                            <ul className="flex flex-col gap-3">
                                {[
                                    'Custom orders where the design was approved by the Client before bulk production.',
                                    'Minor variations within standard industry tolerances (±1.5 cm dimensions, minor colour variation).',
                                    'Products damaged by the Client or end consumer after delivery.',
                                    'Returns requested after the 14-day window from delivery date.',
                                    'Change of mind or market demand changes after production has commenced.',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-[#EDEEE7]/80">
                                        <span className="size-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="w-full px-5 md:px-10 py-16 max-w-screen-xl mx-auto flex flex-col gap-12">
                <div className="flex flex-col gap-3">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">How It Works</span>
                    <h2><FormattedTitle>Return Process</FormattedTitle></h2>
                </div>
                <div className="flex flex-col gap-0">
                    {[
                        {
                            step: '01',
                            title: 'Raise a Claim',
                            desc: 'Contact our support team within 14 days of delivery via our Contact page. Include your order number, photos of the defective goods, and a written description of the issue.',
                        },
                        {
                            step: '02',
                            title: 'Claim Review',
                            desc: 'Our quality team will review your submission within 2–3 business days and determine eligibility. We may request additional images or a video walkthrough for complex claims.',
                        },
                        {
                            step: '03',
                            title: 'Resolution Agreement',
                            desc: 'If your claim is approved, we will offer you a choice: free replacement production with priority scheduling, or a full or partial refund depending on the scope of the defect.',
                        },
                        {
                            step: '04',
                            title: 'Return Shipment (if required)',
                            desc: 'For claims requiring physical product return, we will provide a pre-paid return shipping label. Goods must be returned in their original condition, unused, and in original packaging.',
                        },
                        {
                            step: '05',
                            title: 'Refund Processing',
                            desc: 'Approved refunds are processed within 7–14 business days. Refunds are issued to the original payment method. Bank transfer refunds may take an additional 3–5 days depending on your bank.',
                        },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-16 border-b border-black/10 py-8">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30 md:w-16 shrink-0 pt-1">{item.step}</span>
                            <div className="flex flex-col gap-2">
                                <h3><FormattedTitle>{item.title}</FormattedTitle></h3>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="w-full px-5 md:px-10 py-16 border-t border-black/10">
                <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col gap-3">
                        <h2><FormattedTitle>Need to Raise a Claim?</FormattedTitle></h2>
                        <p>Our support team handles every return claim personally. Reach out and we will resolve your issue quickly.</p>
                    </div>
                    <div className="flex gap-4 shrink-0 flex-wrap">
                        <Link href="/contact" className="px-8 py-4 bg-black text-[#EDEEE7] hover:bg-black/80 transition-colors tracking-widest text-[10px] uppercase font-bold">
                            Contact Support
                        </Link>
                        <Link href="/terms" className="px-8 py-4 border border-black hover:bg-black hover:text-[#EDEEE7] transition-colors tracking-widest text-[10px] uppercase font-bold">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
