import type { Metadata } from 'next';
import Link from 'next/link';
import FormattedTitle from '../components/FormattedTitle';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Read the Slots Sports Wear Privacy Policy. Learn how we collect, use, and protect your personal data when you interact with our website and services.',
    openGraph: {
        title: 'Privacy Policy — Slots Sports Wear',
        description: 'How Slots Sports Wear collects, uses, and protects your personal information. Your privacy is our priority.',
    },
    robots: { index: true, follow: true },
};

const sections = [
    {
        title: 'Information We Collect',
        content: [
            'When you visit our website, submit a tech pack, or contact our team, we may collect the following types of personal information:',
            '• Identity Information: Name, company name, and job title.',
            '• Contact Information: Email address, phone number, and postal address.',
            '• Order Information: Product specifications, quantities, size breakdowns, and design files submitted via our Tech Pack form.',
            '• Technical Data: IP address, browser type, device identifiers, and cookies collected automatically when you browse our site.',
            'We only collect information that is necessary for us to provide our manufacturing and communication services.',
        ]
    },
    {
        title: 'How We Use Your Information',
        content: [
            'Your personal data is used solely for legitimate business purposes:',
            '• To process and respond to your inquiries and tech pack submissions.',
            '• To communicate order updates, shipping timelines, and production status.',
            '• To send relevant service announcements and non-promotional operational messages.',
            '• To improve our website experience and analyse user behaviour through anonymised analytics.',
            '• To comply with legal obligations under Pakistani and international trade law.',
            'We do not sell, rent, or trade your personal data with any third parties for marketing purposes.',
        ]
    },
    {
        title: 'Cookies & Tracking',
        content: [
            'Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device that help us:',
            '• Remember your preferences and session state.',
            '• Analyse traffic patterns to improve our site.',
            '• Ensure security and prevent fraudulent activity.',
            'You may disable cookies through your browser settings. Note that some features of the website may not function correctly without cookies enabled.',
        ]
    },
    {
        title: 'Data Sharing & Third Parties',
        content: [
            'We may share limited data with trusted third-party partners solely to operate our business:',
            '• Shipping and logistics providers (DHL, FedEx, Aramex) to fulfil delivery.',
            '• Payment processors for secure transaction handling.',
            '• Email service providers for communication delivery.',
            '• Analytics platforms such as Google Analytics (anonymised data only).',
            'All third parties are contractually obligated to handle your data securely and in accordance with applicable data protection laws.',
        ]
    },
    {
        title: 'Data Security',
        content: [
            'We implement industry-standard security measures to protect your personal information:',
            '• HTTPS encryption on all pages and form submissions.',
            '• Restricted internal access to customer records on a need-to-know basis.',
            '• Regular security audits and vulnerability assessments.',
            'While we take every reasonable precaution, no method of data transmission or storage is completely secure. We encourage you to use strong passwords and to notify us immediately if you suspect any unauthorised access.',
        ]
    },
    {
        title: 'Data Retention',
        content: [
            'We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. Specifically:',
            '• Inquiry and contact data: Retained for up to 3 years from last interaction.',
            '• Order and production records: Retained for 7 years for accounting and legal compliance.',
            '• Technical and analytics data: Anonymised after 26 months.',
            'You may request deletion of your data at any time, subject to our legal retention obligations.',
        ]
    },
    {
        title: 'Your Rights',
        content: [
            'Depending on your location, you may have the following rights regarding your personal data:',
            '• Access: Request a copy of the personal data we hold about you.',
            '• Correction: Request correction of inaccurate or incomplete data.',
            '• Deletion: Request that we delete your personal data ("right to be forgotten").',
            '• Portability: Request your data in a machine-readable format.',
            '• Objection: Object to the processing of your data for specific purposes.',
            'To exercise any of these rights, please contact us at the email address listed below.',
        ]
    },
    {
        title: 'Changes to This Policy',
        content: [
            'We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. The date of the latest update is displayed at the top of this page.',
            'Continued use of our website and services after changes are posted constitutes your acceptance of the revised policy. We recommend reviewing this page periodically.',
        ]
    },
];

export default function PolicyPage() {
    return (
        <main className="w-full bg-[#EDEEE7] min-h-screen">

            {/* Hero */}
            <section className="w-full pt-[12vh] pb-16 px-5 md:px-10 border-b border-black/10">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-5">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Legal · Last Updated: April 2026</span>
                    <h1 className="uppercase"><FormattedTitle>Privacy Policy</FormattedTitle></h1>
                    <p className="md:w-[55%] w-full">
                        Slots Sports Wear is committed to protecting your personal information and your right to privacy. This policy explains what we collect, how we use it, and your rights as our customer.
                    </p>
                </div>
            </section>

            {/* Policy Content */}
            <section className="w-full px-5 md:px-10 py-16 max-w-screen-xl mx-auto flex flex-col gap-0">
                {sections.map((section, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-20 border-b border-black/10 py-10">
                        <div className="md:w-64 shrink-0 flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">{`0${i + 1}`}</span>
                            <h3><FormattedTitle>{section.title}</FormattedTitle></h3>
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                            {section.content.map((line, j) => (
                                <p key={j} className={line.startsWith('•') ? 'pl-4 opacity-70' : ''}>
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Contact for Privacy */}
            <section className="w-full px-5 md:px-10 py-16 bg-[#111111] text-[#EDEEE7]">
                <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Privacy Inquiries</span>
                        <h2 className="!text-[#EDEEE7]"><FormattedTitle>Questions About This Policy?</FormattedTitle></h2>
                        <p className="text-[#EDEEE7]/60">
                            Contact our data protection team at{' '}
                            <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`} className="text-[#EDEEE7] underline underline-offset-4">
                                {process.env.NEXT_PUBLIC_EMAIL_ADDRESS}
                            </a>
                        </p>
                    </div>
                    <div className="flex gap-4 shrink-0 flex-wrap">
                        <Link href="/contact" className="px-8 py-4 bg-[#EDEEE7] text-black hover:bg-white transition-colors tracking-widest text-[10px] uppercase font-bold">
                            Contact Us
                        </Link>
                        <Link href="/terms" className="px-8 py-4 border border-[#EDEEE7]/30 text-[#EDEEE7] hover:border-[#EDEEE7] transition-colors tracking-widest text-[10px] uppercase font-bold">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
