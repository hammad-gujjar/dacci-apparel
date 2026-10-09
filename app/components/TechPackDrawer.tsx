'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTechPack } from '../context/TechPackContext';
import { authClient } from '@/lib/auth-client';
import TransitionButton from './TransitionButton';
import { IoCloseOutline, IoTrashOutline, IoAddOutline, IoRemoveOutline, IoDocumentTextOutline, IoLayersOutline } from 'react-icons/io5';

export default function TechPackDrawer() {
    const { items, isDrawerOpen, closeDrawer, removeItem, updateItem, totalQuantity, itemCount } = useTechPack();
    const router = useRouter();
    const drawerRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeDrawer();
        };
        if (isDrawerOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isDrawerOpen, closeDrawer]);

    const handleQuantityChange = (id: string, current: number, delta: number) => {
        const next = current + delta;
        if (next >= 50) {
            updateItem(id, { quantity: next });
        }
    };

    const handleProceed = async () => {
        const { data: session } = await authClient.getSession();
        closeDrawer();
        
        if (session?.user) {
            router.push('/cart');
        } else {
            router.push('/auth/signin?callbackUrl=/cart');
        }
    };

    if (!isDrawerOpen) return null;

    return (
        <div className="fixed inset-0 z-110 flex justify-end">
            {/* Backdrop Blur Overlay */}
            <div
                onClick={closeDrawer}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
                aria-hidden="true"
            />

            {/* Slide-Over Drawer Panel */}
            <aside
                ref={drawerRef}
                className="relative w-full max-w-lg md:max-w-xl h-full bg-[#EDEEE7] text-[#111111] shadow-2xl flex flex-col z-10 animate-slide-left border-l border-black/10 overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-labelledby="tech-pack-drawer-title"
            >
                {/* 1. Header */}
                <header className="px-6 py-5 border-b border-black/10 flex items-center justify-between bg-[#EDEEE7]/90 backdrop-blur-md shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-black text-[#EDEEE7] flex items-center justify-center">
                            <IoLayersOutline className="text-base" />
                        </div>
                        <div>
                            <h2 id="tech-pack-drawer-title" className="font-[main] text-base md:text-lg uppercase tracking-tight text-[#111111]">
                                Tech Pack Request
                            </h2>
                            <p className="text-[11px] font-[middle] text-neutral-600 tracking-wider">
                                {itemCount} {itemCount === 1 ? 'Style' : 'Styles'} in Manufacturing RFQ
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={closeDrawer}
                        className="size-9 rounded-full border border-black/10 hover:border-black flex items-center justify-center transition-colors text-black hover:bg-black hover:text-white cursor-pointer"
                        aria-label="Close drawer"
                    >
                        <IoCloseOutline className="text-xl" />
                    </button>
                </header>

                {/* 2. Manufacturing Credibility Notice */}
                <div className="bg-[#111111] text-[#EDEEE7] px-6 py-2.5 text-[10px] uppercase font-bold tracking-[0.25em] flex items-center justify-between shrink-0 font-[middle]">
                    <span>MOQ: 50 Pieces / Style</span>
                    <span className="text-neutral-400">7–14 Days Prototyping</span>
                </div>

                {/* 3. Items List or Empty State */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                    {items.length === 0 ? (
                        <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center gap-5 p-6">
                            <div className="size-16 rounded-full border border-black/10 flex items-center justify-center bg-white/40">
                                <IoDocumentTextOutline className="text-2xl text-neutral-400" />
                            </div>
                            <div className="space-y-2 max-w-xs">
                                <h3 className="font-[main] text-sm uppercase tracking-tight text-neutral-800">
                                    No Archetypes Selected
                                </h3>
                                <p className="text-xs font-[middle] text-neutral-600 leading-relaxed">
                                    Explore our custom sportswear catalog to add silhouettes, specifications, and customization requests.
                                </p>
                            </div>
                            <Link
                                href="/shop"
                                onClick={closeDrawer}
                                className="mt-2 px-8 py-3.5 bg-black text-[#EDEEE7] rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-neutral-800 transition-all active:scale-[0.97]"
                            >
                                Browse Catalog
                            </Link>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white/60 border border-black/10 rounded-2xl p-4 flex gap-4 transition-all hover:border-black/25 shadow-sm"
                            >
                                {/* Thumbnail Image */}
                                <div className="relative size-24 sm:size-28 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-black/5">
                                    <Image
                                        src={item.image || '/placeholder.png'}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-1 left-1 bg-black/85 text-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                                        OEM
                                    </div>
                                </div>

                                {/* Spec Details */}
                                <div className="flex-1 flex flex-col justify-between min-w-0">
                                    <div>
                                        <div className="flex items-start justify-between gap-2">
                                            <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-neutral-500 font-[middle] truncate">
                                                {item.category}
                                            </span>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                                                title="Remove style"
                                                aria-label={`Remove ${item.name}`}
                                            >
                                                <IoTrashOutline className="text-base" />
                                            </button>
                                        </div>
                                        <h4 className="font-[main] text-xs sm:text-sm font-bold uppercase tracking-tight truncate text-[#111111]">
                                            {item.name}
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            <span className="text-[9px] font-[middle] px-2 py-0.5 rounded-full bg-black/5 text-neutral-700 font-semibold">
                                                Color: {item.color || 'Default'}
                                            </span>
                                            <span className="text-[9px] font-[middle] px-2 py-0.5 rounded-full bg-black/5 text-neutral-700 font-semibold">
                                                Sizes: {item.sizeRange || 'Full Range (XS–5XL)'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Quantity & Customization Badges */}
                                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-black/5">
                                        <div className="flex items-center gap-1.5 bg-white border border-black/10 rounded-full px-2 py-1">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity, -25)}
                                                disabled={item.quantity <= 50}
                                                className="size-5 rounded-full hover:bg-black/10 flex items-center justify-center disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                                                title="Decrease quantity (min 50)"
                                            >
                                                <IoRemoveOutline className="text-xs" />
                                            </button>
                                            <span className="text-xs font-bold font-[middle] tabular-nums px-2">
                                                {item.quantity} pcs
                                            </span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity, 25)}
                                                className="size-5 rounded-full hover:bg-black/10 flex items-center justify-center cursor-pointer"
                                                title="Increase quantity"
                                            >
                                                <IoAddOutline className="text-xs" />
                                            </button>
                                        </div>

                                        <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500 font-[middle]">
                                            MOQ: 50+
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* 4. Footer & Actions */}
                {items.length > 0 && (
                    <footer className="px-6 py-5 border-t border-black/10 bg-[#EDEEE7]/90 backdrop-blur-md space-y-3 shrink-0">
                        <div className="flex items-center justify-between text-xs font-[middle] font-semibold text-neutral-700">
                            <span>Total Estimated Production:</span>
                            <span className="font-bold text-sm text-black tabular-nums">{totalQuantity} Pieces</span>
                        </div>

                        <button
                            onClick={handleProceed}
                            className="w-full py-4 bg-black text-[#EDEEE7] rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-neutral-900 transition-all hover:shadow-lg active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2"
                        >
                            <span>Proceed To Full Specification & RFQ</span>
                            <span className="text-sm">→</span>
                        </button>

                        <div className="flex items-center justify-between pt-1">
                            <button
                                onClick={closeDrawer}
                                className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 hover:text-black transition-colors cursor-pointer"
                            >
                                Continue Browsing
                            </button>
                            <Link
                                href="/contact#teckpack"
                                onClick={closeDrawer}
                                className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 hover:text-black transition-colors"
                            >
                                Direct Inquiry Form
                            </Link>
                        </div>
                    </footer>
                )}
            </aside>
        </div>
    );
}
