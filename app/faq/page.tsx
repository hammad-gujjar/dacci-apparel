import type { Metadata } from 'next';
import Link from 'next/link';
import FormattedTitle from '../components/FormattedTitle';

export const metadata: Metadata = {
    title: 'FAQs',
    description: 'Find answers to the most common questions about Slots Sports Wear — including MOQ, lead times, sampling, shipping, custom orders, and payment.',
    openGraph: {
        title: 'Frequently Asked Questions — Slots Sports Wear',
        description: 'Everything you need to know about working with Slots Sports Wear. MOQ, sampling, lead times, and more answered here.',
    },
};

const faqs = [
    {
        category: 'Ordering & MOQ',
        items: [
            { q: 'What is your minimum order quantity (MOQ)?', a: 'Our standard MOQ is 50 pieces per style. For repeat orders, we can discuss lower quantities based on your relationship history with us.' },
            { q: 'Do you accept custom orders from small brands?', a: 'Absolutely. We are built specifically to support emerging and independent brands. Starting with just 50 units means you can test the market before scaling.' },
            { q: 'Can I mix different styles in one order?', a: 'Yes. You can mix styles as long as each individual style meets the 50-piece MOQ. Combined orders often qualify for better per-unit pricing.' },
        ]
    },
    {
        category: 'Sampling & Design',
        items: [
            { q: 'How do I submit a design?', a: 'Visit our Contact page and use the Tech Pack Submission form. Provide your design files, material preferences, sizing, and any specific requirements. We will review and confirm within 48 hours.' },
            { q: 'How long does sampling take?', a: 'Standard sample development takes 7–14 business days from tech pack approval. Rush sampling (7 days) is available for premium clients.' },
            { q: 'Do you offer design support?', a: 'Yes. Our in-house design team can help you refine your tech pack, suggest fabric options, and ensure your design is production-ready before sampling begins.' },
        ]
    },
    {
        category: 'Production & Quality',
        items: [
            { q: 'What quality standards do you follow?', a: 'All orders go through AQL 2.5 inspection before shipment. We are an ISO-certified facility and conduct multi-point quality checks throughout production.' },
            { q: 'What fabrics and materials do you work with?', a: 'We work with a wide range of performance fabrics — polyester, spandex blends, moisture-wicking knits, organic cotton, and recycled materials. We can source specific fabrics on request.' },
            { q: 'What is your production capacity?', a: 'Our facility produces 50,000+ units per month across all styles. We maintain dedicated production slots to ensure your orders are delivered on schedule.' },
        ]
    },
    {
        category: 'Shipping & Delivery',
        items: [
            { q: 'Do you ship internationally?', a: 'Yes. We ship to the USA, UK, Europe, Australia, Canada, and more. We work with DHL, FedEx, and other major carriers to ensure safe and timely delivery.' },
            { q: 'How long does delivery take?', a: 'Air freight to the USA or Europe typically takes 5–10 business days. Sea freight for large orders takes 20–35 days. Timelines are provided with every order confirmation.' },
            { q: 'Who handles customs and import duties?', a: 'Buyers are responsible for their country\'s import duties and taxes. We provide all necessary export documentation, including commercial invoices and certificates of origin.' },
        ]
    },
    {
        category: 'Payment',
        items: [
            { q: 'What payment methods do you accept?', a: 'We accept bank wire transfer (T/T), PayPal, and Western Union. For established clients, we offer flexible payment terms including 30% deposit and 70% before shipment.' },
            { q: 'Is there a deposit required?', a: 'Yes. A 30% deposit is required to begin production. The remaining 70% is due upon production completion and before goods are shipped.' },
            { q: 'Do you offer a money-back guarantee?', a: 'If goods are found to be defective or do not match approved samples, we offer free replacement production or a partial refund. Please review our Returns policy for full details.' },
        ]
    },
];

export default function FaqPage() {
    return (
        <main className="w-full bg-[#EDEEE7] min-h-screen">

            {/* Hero */}
            <section className="w-full pt-[12vh] pb-16 px-5 md:px-10 border-b border-black/10">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-5">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Help Center</span>
                    <h1 className="uppercase"><FormattedTitle>Frequently Asked Questions</FormattedTitle></h1>
                    <p className="md:w-[50%] w-full">
                        Everything you need to know about partnering with Slots Sports Wear — from your first inquiry to final delivery.
                    </p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="w-full px-5 md:px-10 py-16 max-w-screen-xl mx-auto flex flex-col gap-16">
                {faqs.map((section, si) => (
                    <div key={si} className="flex flex-col gap-0">
                        <div className="flex items-center gap-5 pb-6">
                            <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">{`0${si + 1}`}</span>
                            <h2><FormattedTitle>{section.category}</FormattedTitle></h2>
                        </div>
                        <div className="flex flex-col gap-0">
                            {section.items.map((item, qi) => (
                                <div key={qi} className="border-t border-black/10 py-6 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 md:gap-16">
                                    <h3><FormattedTitle>{item.q}</FormattedTitle></h3>
                                    <p>{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Still have questions CTA */}
            <section className="w-full px-5 md:px-10 py-16 bg-[#111111] text-[#EDEEE7]">
                <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col gap-3">
                        <h2 className="!text-[#EDEEE7]"><FormattedTitle>Still Have Questions?</FormattedTitle></h2>
                        <p className="text-[#EDEEE7]/60">Our team responds within 24 hours on business days. Reach out and let's talk about your next order.</p>
                    </div>
                    <Link href="/contact" className="shrink-0 px-8 py-4 bg-[#EDEEE7] text-black hover:bg-white transition-colors tracking-widest text-[10px] uppercase font-bold">
                        Contact Us
                    </Link>
                </div>
            </section>
        </main>
    );
}
