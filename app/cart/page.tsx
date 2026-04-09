import React from 'react';
import Link from 'next/link';
import FormattedTitle from '../components/FormattedTitle';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cart · Slots Sports Wear',
    description: 'The cart page is currently under construction. Please check back soon or contact us for direct orders.',
};

export default function CartApologyPage() {
    return (
        <main className="w-full min-h-screen flex items-center justify-center py-20 px-5 overflow-hidden">
            <div className="max-w-2xl w-full flex flex-col items-center text-center gap-10">
                
                {/* Visual element */}
                <div className="size-24 border border-black/10 rounded-full flex items-center justify-center animate-pulse">
                    <div className="size-3 bg-black rounded-full" />
                </div>

                <div className="flex flex-col gap-5">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Status: In Development</span>
                    <h1><FormattedTitle>Cart Experience Coming Soon</FormattedTitle></h1>
                    <p className="text-center">
                        We are currently refining our minimalist checkout flow to provide you with a seamless experience. This page will be available very soon. 
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 items-center w-full sm:w-auto">
                    <Link 
                        href="/shop" 
                        className="w-full sm:w-auto px-12 py-5 bg-black text-[#EDEEE7] hover:bg-black/80 transition-all font-bold text-[10px] uppercase tracking-[0.4em]"
                    >
                        Explore shop
                    </Link>
                    <Link 
                        href="/contact" 
                        className="w-full sm:w-auto px-12 py-5 border border-black hover:bg-black hover:text-[#EDEEE7] transition-all font-bold text-[10px] uppercase tracking-[0.4em]"
                    >
                        Get in touch
                    </Link>
                </div>

                <div className="pt-10">
                    <p className="text-center">
                        Slots Sports Wear · Manufacturing Excellence
                    </p>
                </div>
            </div>
        </main>
    );
}
