import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '404 - Page Not Found | Slots Sports Wear',
    },
    description: 'The page you are looking for does not exist or has been moved. Explore our custom sportswear collections or contact our manufacturing team.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function NotFound() {
    return (
        <main className="w-full min-h-[80vh] bg-[#EDEEE7] flex items-center justify-center px-5 py-24">
            <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-6">
                <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-black/40">
                    Error 404
                </span>
                
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#111111]">
                    Page Not Found
                </h1>
                
                <p className="text-sm md:text-base text-black/70 leading-relaxed max-w-md">
                    The requested page could not be located. It may have been moved, renamed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full justify-center">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-4 bg-black text-[#EDEEE7] hover:bg-black/85 transition-colors tracking-widest text-[10px] uppercase font-bold text-center"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/shop"
                        className="w-full sm:w-auto px-8 py-4 border border-black/20 text-black hover:bg-black hover:text-[#EDEEE7] transition-colors tracking-widest text-[10px] uppercase font-bold text-center"
                    >
                        View Collections
                    </Link>
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-8 py-4 bg-transparent text-black hover:underline tracking-widest text-[10px] uppercase font-bold text-center"
                    >
                        Contact Team
                    </Link>
                </div>
            </div>
        </main>
    );
}
