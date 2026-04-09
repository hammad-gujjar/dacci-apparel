import type { Metadata } from 'next';
import Link from 'next/link';
import FormattedTitle from '../components/FormattedTitle';

export const metadata: Metadata = {
    title: 'Terms & Conditions',
    description: 'Read the Terms and Conditions of Slots Sports Wear. Understand your rights and obligations when placing orders, using our website, or engaging our manufacturing services.',
    openGraph: {
        title: 'Terms & Conditions — Slots Sports Wear',
        description: 'The complete terms governing use of the Slots Sports Wear website and manufacturing services.',
    },
    robots: { index: true, follow: true },
};

const clauses = [
    {
        title: 'Acceptance of Terms',
        body: 'By accessing this website, submitting a tech pack, placing an order, or otherwise engaging with Slots Sports Wear ("the Company"), you ("the Client") agree to be bound by these Terms and Conditions. If you do not agree, you must discontinue use of our services immediately. We reserve the right to update these Terms at any time without prior notice. Continued use of our services constitutes acceptance of any revised Terms.',
    },
    {
        title: 'Services Provided',
        body: 'Slots Sports Wear provides custom sportswear and apparel manufacturing services, including but not limited to: custom cut-and-sew production, private label manufacturing, sample development, embroidery, printing, and global logistics. All services are subject to capacity availability, minimum order quantities (MOQ), and approved tech pack specifications. The Company reserves the right to decline any order at its discretion.',
    },
    {
        title: 'Orders & Minimum Order Quantities',
        body: 'All orders are subject to a minimum order quantity (MOQ) of 50 pieces per style unless otherwise agreed in writing. Orders are considered confirmed only upon receipt of the signed purchase order or written confirmation, along with the required deposit payment. Any changes to confirmed orders must be communicated in writing within 48 hours of order confirmation; changes requested after production commencement may incur additional charges.',
    },
    {
        title: 'Pricing & Payment',
        body: 'All quoted prices are in US Dollars (USD) and are valid for 30 days from the date of issue. Prices exclude shipping, customs duties, and applicable taxes. A 30% non-refundable deposit is required to commence production. The remaining 70% balance is due upon production completion and before shipment. The Company reserves the right to adjust pricing for raw material fluctuations exceeding 5% between quotation and production commencement.',
    },
    {
        title: 'Samples & Approvals',
        body: 'Pre-production samples are produced at the Client\'s request and expense. Clients must provide written sample approval before bulk production commences. Proceeding with bulk production without documented sample approval constitutes acceptance of the production standard. The Company is not liable for deviations from unapproved or verbally approved samples. Sample costs are deducted from the order invoice upon minimum bulk order placement.',
    },
    {
        title: 'Quality & Tolerance',
        body: 'All products undergo AQL 2.5 quality inspection prior to shipment. Industry-standard tolerances apply to measurements: ±1.5 cm for garment dimensions, ±5% for fabric weight, and minor colour variation within acceptable dye lot ranges. The Company warrants that goods will substantially conform to the approved sample. The Company is not responsible for quality issues arising from Client-supplied materials, approved designs with inherent production limitations, or misuse of products after delivery.',
    },
    {
        title: 'Intellectual Property',
        body: 'Clients retain full ownership of designs, logos, and branding elements submitted to the Company. By submitting design files, the Client grants Slots Sports Wear a limited licence to use the designs solely for the purpose of production fulfilment. The Company will not reproduce, share, or commercially use Client designs without explicit written consent. The Client warrants that submitted designs do not infringe third-party intellectual property rights and agrees to indemnify the Company against any related claims.',
    },
    {
        title: 'Shipping & Risk of Loss',
        body: 'Risk of loss and title of goods passes to the Client upon delivery to the carrier. Shipping terms are EXW (Ex-Works) unless otherwise agreed. The Company will arrange shipping on the Client\'s behalf at the Client\'s cost and risk. The Company is not liable for delays caused by carriers, customs authorities, force majeure events, or circumstances beyond its reasonable control. Clients are responsible for ensuring correct import documentation and compliance with destination country regulations.',
    },
    {
        title: 'Limitation of Liability',
        body: 'To the maximum extent permitted by law, the Company\'s total liability to the Client for any claim arising from or related to our services shall not exceed the total amount paid by the Client for the specific order giving rise to the claim. The Company shall not be liable for indirect, incidental, special, or consequential damages, including lost profits, loss of business opportunity, or reputational harm, even if advised of the possibility of such damages.',
    },
    {
        title: 'Confidentiality',
        body: 'Both parties agree to keep confidential all proprietary information exchanged in connection with orders and services. This includes but is not limited to: pricing, design files, production processes, and business strategies. Confidentiality obligations survive termination of the business relationship for a period of three (3) years.',
    },
    {
        title: 'Governing Law & Disputes',
        body: 'These Terms shall be governed by and construed in accordance with the laws of Pakistan. Any dispute arising out of or in connection with these Terms shall first be subject to good-faith negotiation between the parties. Unresolved disputes shall be referred to binding arbitration in Lahore, Pakistan. The language of arbitration shall be English.',
    },
    {
        title: 'Contact',
        body: 'For questions regarding these Terms and Conditions, please contact us at the email address listed on our Contact page. We aim to respond to all legal inquiries within 3 business days.',
    },
];

export default function TermsPage() {
    return (
        <main className="w-full bg-[#EDEEE7] min-h-screen">

            {/* Hero */}
            <section className="w-full pt-[12vh] pb-16 px-5 md:px-10 border-b border-black/10">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-5">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Legal · Last Updated: April 2026</span>
                    <h1 className="uppercase"><FormattedTitle>Terms & Conditions</FormattedTitle></h1>
                    <p className="md:w-[55%] w-full">
                        These Terms govern your use of the Slots Sports Wear website and all manufacturing services we provide. Please read them carefully before placing any order.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        <Link href="/policy" className="text-[10px] uppercase tracking-[0.4em] font-bold underline underline-offset-4 opacity-50 hover:opacity-100 transition-opacity">
                            Privacy Policy
                        </Link>
                        <Link href="/refund" className="text-[10px] uppercase tracking-[0.4em] font-bold underline underline-offset-4 opacity-50 hover:opacity-100 transition-opacity">
                            Returns Policy
                        </Link>
                    </div>
                </div>
            </section>

            {/* Clauses */}
            <section className="w-full px-5 md:px-10 py-16 max-w-screen-xl mx-auto flex flex-col gap-0">
                {clauses.map((clause, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-20 border-b border-black/10 py-10">
                        <div className="md:w-72 shrink-0 flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">{`${i + 1 < 10 ? '0' : ''}${i + 1}`}</span>
                            <h3><FormattedTitle>{clause.title}</FormattedTitle></h3>
                        </div>
                        <p className="flex-1">
                            {clause.body}
                        </p>
                    </div>
                ))}
            </section>

            {/* Footer CTA */}
            <section className="w-full px-5 md:px-10 py-16 bg-[#111111] text-[#EDEEE7]">
                <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col gap-3">
                        <h2 className="!text-[#EDEEE7]"><FormattedTitle>Questions About Our Terms?</FormattedTitle></h2>
                        <p className="text-[#EDEEE7]/60">Our team is happy to clarify anything before you place your first order.</p>
                    </div>
                    <div className="flex gap-4 shrink-0 flex-wrap">
                        <Link href="/contact" className="px-8 py-4 bg-[#EDEEE7] text-black hover:bg-white transition-colors tracking-widest text-[10px] uppercase font-bold">
                            Contact Us
                        </Link>
                        <Link href="/faq" className="px-8 py-4 border border-[#EDEEE7]/30 text-[#EDEEE7] hover:border-[#EDEEE7] transition-colors tracking-widest text-[10px] uppercase font-bold">
                            View FAQs
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
