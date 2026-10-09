'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTechPack, TechPackItem } from '../context/TechPackContext';
import Heading from '../components/Heading';
import TransitionButton from '../components/TransitionButton';
import TechPackUploadZone, { TechPackUploadedFile } from '../components/TechPackUploadZone';
import axios from 'axios';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { trackEvent } from '@/lib/analytics';
import {
    IoTrashOutline,
    IoAddOutline,
    IoRemoveOutline,
    IoDocumentTextOutline,
    IoCheckmarkCircleOutline,
    IoShieldCheckmarkOutline,
    IoAirplaneOutline,
    IoTimeOutline,
    IoLayersOutline, IoLockClosedOutline
} from 'react-icons/io5';

const CUSTOMIZATION_OPTIONS_LIST = [
    'Sublimation',
    'Embroidery',
    'Screen Printing',
    'Heat Transfer',
    'Private Label',
    'Custom Packaging',
    'Custom Labels'
];

export default function CartClient() {
    const { items, removeItem, updateItem, clearItems, itemCount, totalQuantity } = useTechPack();
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    // Enforce authentication
    React.useEffect(() => {
        if (!isPending && !session?.user) {
            router.push('/auth/signin?callbackUrl=/cart');
        }
    }, [isPending, session, router]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<TechPackUploadedFile[]>([]);

    const [buyerDetails, setBuyerDetails] = useState({
        company: '',
        name: '',
        email: '',
        country: '',
        website: '',
        deadline: '',
        overallNotes: '',
    });

    React.useEffect(() => {
        if (session?.user) {
            setBuyerDetails(prev => ({
                ...prev,
                name: prev.name || session.user.name || '',
                email: session.user.email || prev.email,
            }));
        }
    }, [session]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBuyerDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleQuantityChange = (id: string, current: number, delta: number) => {
        const next = current + delta;
        if (next >= 50) {
            updateItem(id, { quantity: next });
        } else {
            toast.error('Minimum order quantity is 50 pieces per style');
        }
    };

    const handleCustomizationToggle = (itemId: string, currentOptions: string[], option: string) => {
        const exists = currentOptions.includes(option);
        const updated = exists
            ? currentOptions.filter(o => o !== option)
            : [...currentOptions, option];
        updateItem(itemId, { customizationOptions: updated });
    };

    const handleSubmitRFQ = async (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) {
            toast.error('Please add at least one manufacturing archetype to your Tech Pack request.');
            return;
        }

        if (!buyerDetails.name.trim() || !buyerDetails.email.trim() || !buyerDetails.company.trim() || !buyerDetails.country.trim()) {
            toast.error('Please complete all required company and contact fields.');
            return;
        }

        setIsSubmitting(true);
        try {
            // Aggregate all unique customization options
            const allCustomizations = Array.from(
                new Set(items.flatMap(item => item.customizationOptions))
            );

            // Construct formatted specs summary for the Tech Pack document
            const itemizedSummary = items.map((item, index) => (
                `[Item ${index + 1}]: ${item.name} (${item.category})\n` +
                `• Quantity: ${item.quantity} pcs (MOQ 50+)\n` +
                `• Color: ${item.color || 'Default'}\n` +
                `• Size Breakdown: ${item.sizeRange || 'Full Range XS–5XL'}\n` +
                `• Customizations: ${item.customizationOptions.join(', ') || 'Standard'}\n` +
                `• Notes: ${item.notes || 'None'}\n`
            )).join('\n');

            const fullNotes = `=== MULTI-ITEM TECH PACK SPECIFICATION (${items.length} STYLES) ===\n\n` +
                itemizedSummary +
                `\n=== BUYER PROJECT BRIEF ===\n${buyerDetails.overallNotes || 'No additional global notes provided.'}`;

            const payload = {
                name: buyerDetails.name,
                email: buyerDetails.email,
                company: buyerDetails.company,
                country: buyerDetails.country,
                website: buyerDetails.website,
                productType: items.length === 1 ? items[0].category : `Multi-Style (${items.length} Garments)`,
                productSlug: items.length === 1 ? items[0].slug : 'multi-item-tech-pack',
                quantity: totalQuantity,
                deadline: buyerDetails.deadline || new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
                customizationOptions: allCustomizations,
                customizationDetails: fullNotes,
                items: items.map(i => ({
                    name: i.name,
                    slug: i.slug,
                    category: i.category,
                    image: i.image,
                    quantity: i.quantity,
                    color: i.color,
                    sizeRange: i.sizeRange,
                    customizationOptions: i.customizationOptions,
                    notes: i.notes || '',
                })),
                files: uploadedFiles,
            };

            const { data } = await axios.post('/api/contact/submit', payload);

            if (data.success) {
                // Record the RFQ Submission Conversion
                trackEvent('rfq_submitted', {
                    source: 'Tech Pack Cart',
                    company: buyerDetails.company,
                    country: buyerDetails.country,
                    productType: payload.productType,
                    quantity: payload.quantity,
                    itemCount: items.length,
                    hasFiles: uploadedFiles.length > 0
                });

                toast.success('Manufacturing inquiry submitted successfully! Our engineering team will review your specifications.');
                setIsSubmitted(true);
                clearItems();
                setUploadedFiles([]);
            } else {
                toast.error(data.message || 'Failed to submit manufacturing inquiry');
            }
        } catch (error: any) {
            console.error('RFQ submission error:', error);
            toast.error(error.response?.data?.message || 'Failed to submit manufacturing inquiry. Please check your details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success Screen after RFQ submission
    if (isSubmitted) {
        return (
            <main className="w-full min-h-screen py-24 sm:py-32 px-5 flex items-center justify-center">
                <div className="max-w-2xl w-full bg-white/70 border border-black/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center gap-6 shadow-xl">
                    <div className="size-20 rounded-full bg-black text-[#EDEEE7] flex items-center justify-center">
                        <IoCheckmarkCircleOutline className="text-4xl text-green-400" />
                    </div>

                    <div className="space-y-3">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-500 font-[middle]">
                            Inquiry Received
                        </span>
                        <Heading title="Tech Pack Request Dispatched" className="justify-center text-center" />
                        <p className="text-sm md:text-base font-[middle] text-neutral-700 leading-relaxed max-w-lg mx-auto">
                            Thank you, <strong className="text-black">{buyerDetails.name}</strong> from <strong className="text-black">{buyerDetails.company}</strong>. Your custom sportswear manufacturing specifications have been routed to our factory production engineers.
                        </p>
                    </div>

                    <div className="w-full bg-[#EDEEE7]/80 rounded-2xl p-5 border border-black/5 text-left space-y-2 text-xs font-[middle] text-neutral-700">
                        <div className="flex items-center justify-between border-b border-black/10 pb-2">
                            <span className="font-semibold uppercase tracking-wider text-[10px] text-neutral-500">Contact Email:</span>
                            <span className="font-bold text-black">{buyerDetails.email}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-black/10 pb-2">
                            <span className="font-semibold uppercase tracking-wider text-[10px] text-neutral-500">Next Step:</span>
                            <span className="font-bold text-black">Factory Review & Quotation Matrix</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-semibold uppercase tracking-wider text-[10px] text-neutral-500">Turnaround:</span>
                            <span className="font-bold text-black">Within 24 Business Hours</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
                        <Link
                            href="/shop"
                            className="px-8 py-4 bg-black text-[#EDEEE7] rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-neutral-800 transition-all text-center"
                        >
                            Explore More Styles
                        </Link>
                        <Link
                            href="/"
                            className="px-8 py-4 border border-black/20 hover:border-black rounded-full text-xs font-bold uppercase tracking-[0.3em] text-black hover:bg-black hover:text-[#EDEEE7] transition-all text-center"
                        >
                            Return To Home
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="w-full min-h-screen py-24 sm:py-32 px-5 md:px-10 max-w-7xl mx-auto">
            {/* 1. Header Section */}
            <section className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-900/40 font-[middle]">
                    OEM / ODM Wholesale Manufacturing
                </span>
                <Heading title="Tech Pack Specification & RFQ" className="justify-center text-center" />
                <p className="text-sm sm:text-base font-[middle] text-neutral-700 leading-relaxed">
                    Review your selected manufacturing archetypes, configure size grading, colors, and branding techniques, and submit your wholesale inquiry directly to our engineering team.
                </p>
            </section>

            {/* 2. Empty State */}
            {items.length === 0 ? (
                <div className="max-w-xl mx-auto bg-white/40 border border-black/10 backdrop-blur-sm rounded-3xl p-10 sm:p-14 text-center flex flex-col items-center gap-6 shadow-sm">
                    <div className="size-20 rounded-full border border-black/10 flex items-center justify-center bg-white/60">
                        <IoLayersOutline className="text-3xl text-neutral-400" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-[main] text-lg uppercase tracking-tight text-neutral-800">
                            Your Tech Pack Request Is Empty
                        </h3>
                        <p className="text-xs sm:text-sm font-[middle] text-neutral-600 leading-relaxed max-w-md">
                            You have not added any garment styles to your specification inquiry yet. Browse our B2B catalog to select silhouettes, fabric options, and private label apparel.
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="px-8 py-4 bg-black text-[#EDEEE7] rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-neutral-800 transition-all active:scale-[0.97]"
                    >
                        Browse Sportswear Catalog
                    </Link>
                </div>
            ) : (
                /* 3. Main 2-Column RFQ Builder */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Product Specifications List (7 Columns) */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Manufacturing Assurance Banner */}
                        <div className="bg-[#111111] text-[#EDEEE7] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 font-[middle] shadow-lg">
                            <div className="flex items-center gap-2.5">
                                <IoShieldCheckmarkOutline className="text-xl text-neutral-300" />
                                <span className="text-xs font-bold uppercase tracking-wider">
                                    MOQ: 50 Pcs Per Style
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <IoTimeOutline className="text-xl text-neutral-300" />
                                <span className="text-xs font-bold uppercase tracking-wider">
                                    7–14 Days Prototyping
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <IoAirplaneOutline className="text-xl text-neutral-300" />
                                <span className="text-xs font-bold uppercase tracking-wider">
                                    DHL/FedEx Express
                                </span>
                            </div>
                        </div>

                        {/* List of Styles */}
                        <div className="space-y-6">
                            {items.map((item, index) => (
                                <article
                                    key={item.id}
                                    className="bg-white/60 border border-black/10 rounded-3xl p-5 sm:p-7 space-y-5 transition-all hover:border-black/25 shadow-sm"
                                >
                                    {/* Card Header: Product Summary & Image */}
                                    <div className="flex gap-4 sm:gap-6 items-start">
                                        <div className="relative size-24 sm:size-32 rounded-2xl overflow-hidden bg-neutral-100 shrink-0 border border-black/10">
                                            <Image
                                                src={item.image || '/placeholder.png'}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <span className="absolute top-2 left-2 bg-black/85 text-white text-[8px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                                                Style {index + 1}
                                            </span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-500 font-[middle]">
                                                    {item.category}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors rounded-full hover:bg-black/5 cursor-pointer"
                                                    title="Remove style from inquiry"
                                                    aria-label={`Remove ${item.name}`}
                                                >
                                                    <IoTrashOutline className="text-lg" />
                                                </button>
                                            </div>

                                            <h3 className="font-[main] text-base sm:text-lg font-bold uppercase tracking-tight text-[#111111] mt-0.5 truncate">
                                                {item.name}
                                            </h3>

                                            {/* Quantity Selector with MOQ pill */}
                                            <div className="mt-3 flex flex-wrap items-center gap-3">
                                                <span className="text-xs font-[middle] font-semibold text-neutral-600">
                                                    Production Volume:
                                                </span>
                                                <div className="flex items-center bg-white border border-black/10 rounded-full px-2 py-1 shadow-xs">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity, -25)}
                                                        disabled={item.quantity <= 50}
                                                        className="size-6 rounded-full hover:bg-black/10 flex items-center justify-center disabled:opacity-20 cursor-pointer"
                                                        title="Decrease (minimum 50 pcs)"
                                                    >
                                                        <IoRemoveOutline className="text-sm" />
                                                    </button>
                                                    <span className="px-3 font-bold text-xs sm:text-sm font-[middle] tabular-nums">
                                                        {item.quantity} pcs
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity, 25)}
                                                        className="size-6 rounded-full hover:bg-black/10 flex items-center justify-center cursor-pointer"
                                                        title="Increase quantity"
                                                    >
                                                        <IoAddOutline className="text-sm" />
                                                    </button>
                                                </div>
                                                <span className="text-[10px] uppercase font-bold tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                                                    MOQ 50 Valid
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Specifications Form Grid for this Garment */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-black/5">
                                        {/* Color Requirements */}
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-600 font-[middle]">
                                                Target Colorway / Pantone:
                                            </label>
                                            <input
                                                type="text"
                                                value={item.color}
                                                onChange={(e) => updateItem(item.id, { color: e.target.value })}
                                                placeholder="e.g. Jet Black, Olive Drab, Pantone 19-4052"
                                                className="w-full bg-white/80 border border-black/10 rounded-xl px-3.5 py-2.5 text-xs font-[middle] focus:border-black outline-none transition-all"
                                            />
                                        </div>

                                        {/* Size Range & Breakdown */}
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-600 font-[middle]">
                                                Size Range Breakdown:
                                            </label>
                                            <input
                                                type="text"
                                                value={item.sizeRange}
                                                onChange={(e) => updateItem(item.id, { sizeRange: e.target.value })}
                                                placeholder="e.g. 10x S, 15x M, 15x L, 10x XL"
                                                className="w-full bg-white/80 border border-black/10 rounded-xl px-3.5 py-2.5 text-xs font-[middle] focus:border-black outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Customization Multi-Select Chips */}
                                    <div className="space-y-2 pt-2 border-t border-black/5">
                                        <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-600 font-[middle] block">
                                            Branding & Customization Requirements:
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {CUSTOMIZATION_OPTIONS_LIST.map((option) => {
                                                const isSelected = item.customizationOptions.includes(option);
                                                return (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        onClick={() => handleCustomizationToggle(item.id, item.customizationOptions, option)}
                                                        className={`px-3 py-1.5 rounded-full text-[10px] font-[middle] font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                                                            isSelected
                                                                ? 'bg-black text-[#EDEEE7] border-black shadow-xs'
                                                                : 'bg-white/80 text-neutral-700 border-black/10 hover:border-black/30'
                                                        }`}
                                                    >
                                                        {option}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Specific Style Notes */}
                                    <div className="space-y-1.5 pt-2 border-t border-black/5">
                                        <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-600 font-[middle] block">
                                            Style Manufacturing Notes:
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={item.notes || ''}
                                            onChange={(e) => updateItem(item.id, { notes: e.target.value })}
                                            placeholder="Specify fabric weight (e.g. 450 GSM French Terry), print placement, zipper types, or special stitch details..."
                                            className="w-full bg-white/80 border border-black/10 rounded-xl px-3.5 py-2.5 text-xs font-[middle] focus:border-black outline-none transition-all resize-none"
                                        />
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Add More Styles Button */}
                        <div className="pt-2 flex justify-start">
                            <Link
                                href="/shop"
                                className="px-6 py-3 border border-black/20 hover:border-black bg-white/40 hover:bg-black hover:text-[#EDEEE7] rounded-full text-[10px] font-bold uppercase tracking-[0.25em] transition-all flex items-center gap-2"
                            >
                                <IoAddOutline className="text-sm" />
                                <span>Add Another Sportswear Style</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Buyer Company Details & RFQ Submission Card (5 Columns) */}
                    <div className="lg:col-span-5 sticky top-28">
                        <form
                            onSubmit={handleSubmitRFQ}
                            className="bg-white/70 border border-black/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg"
                        >
                            <div className="border-b border-black/10 pb-4">
                                <h3 className="font-[main] text-lg uppercase tracking-tight text-[#111111]">
                                    Wholesale RFQ Submission
                                </h3>
                                <p className="text-xs font-[middle] text-neutral-600 mt-1">
                                    Provide your company information to receive a formal quotation matrix within 24 hours.
                                </p>
                            </div>

                            {/* Summary Badge */}
                            <div className="bg-[#EDEEE7] rounded-2xl p-4 border border-black/5 space-y-2 text-xs font-[middle]">
                                <div className="flex justify-between items-center text-neutral-600">
                                    <span>Selected Styles:</span>
                                    <span className="font-bold text-black">{itemCount} Garments</span>
                                </div>
                                <div className="flex justify-between items-center text-neutral-600">
                                    <span>Total Production Run:</span>
                                    <span className="font-bold text-black tabular-nums">{totalQuantity} Pieces</span>
                                </div>
                                <div className="flex justify-between items-center text-neutral-600">
                                    <span>Sampling Lead Time:</span>
                                    <span className="font-bold text-black">7–14 Business Days</span>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-700 font-[middle] block mb-1">
                                        Company / Brand Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        required
                                        value={buyerDetails.company}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Apex Athletic Wear"
                                        className="w-full bg-white border border-black/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-[middle] focus:border-black outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-700 font-[middle] block mb-1">
                                        Contact Person Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={buyerDetails.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Sarah Jenkins"
                                        className="w-full bg-white border border-black/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-[middle] focus:border-black outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-700 font-[middle] block mb-1 flex items-center gap-1.5">
                                        Corporate Business Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            readOnly={true}
                                            name="email"
                                            required
                                            value={buyerDetails.email}
                                            onChange={handleInputChange}
                                            placeholder="sarah@apexathletic.com"
                                            className="w-full bg-neutral-50 border border-black/10 text-neutral-500 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm font-[middle] outline-none transition-all cursor-default select-text"
                                        />
                                        <IoLockClosedOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
                                    </div>
                                    <p className="text-[9px] text-neutral-400 mt-1 uppercase tracking-wider">Tied to authenticated account</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-700 font-[middle] block mb-1">
                                            Destination Country <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            required
                                            value={buyerDetails.country}
                                            onChange={handleInputChange}
                                            placeholder="e.g. United States"
                                            className="w-full bg-white border border-black/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-[middle] focus:border-black outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-700 font-[middle] block mb-1">
                                            Brand Website / Social
                                        </label>
                                        <input
                                            type="text"
                                            name="website"
                                            value={buyerDetails.website}
                                            onChange={handleInputChange}
                                            placeholder="www.brand.com"
                                            className="w-full bg-white border border-black/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-[middle] focus:border-black outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-700 font-[middle] block mb-1">
                                        Target In-Hand Date (Delivery Deadline)
                                    </label>
                                    <input
                                        type="date"
                                        name="deadline"
                                        value={buyerDetails.deadline}
                                        onChange={handleInputChange}
                                        className="w-full bg-white border border-black/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-[middle] focus:border-black outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-700 font-[middle] block mb-1">
                                        Overall Project Notes & Instructions
                                    </label>
                                    <textarea
                                        rows={3}
                                        name="overallNotes"
                                        value={buyerDetails.overallNotes}
                                        onChange={handleInputChange}
                                        placeholder="Include any instructions regarding tech pack links, Pantone codes, packaging requirements or sample approval timelines..."
                                        className="w-full bg-white border border-black/15 rounded-xl px-4 py-2.5 text-xs font-[middle] focus:border-black outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {/* Technical File Upload Dropzone */}
                            <div className="pt-2 border-t border-black/10">
                                <TechPackUploadZone
                                    files={uploadedFiles}
                                    onFilesChange={setUploadedFiles}
                                    title="Attach Tech Packs & CAD (Optional)"
                                    description="Upload your design mockups, AI/PDF vector patterns, or tech pack ZIP."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 bg-black text-[#EDEEE7] rounded-full text-xs font-bold uppercase tracking-[0.35em] hover:bg-neutral-900 transition-all hover:shadow-xl active:scale-[0.97] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span>Processing RFQ Submission...</span>
                                ) : (
                                    <>
                                        <span>Submit Manufacturing Inquiry</span>
                                        <span>→</span>
                                    </>
                                )}
                            </button>

                            <p className="text-[10px] text-center font-[middle] text-neutral-500 leading-normal">
                                Strict NDA & proprietary design protection guaranteed. By submitting, you request physical sample development and bulk quotation from Slots Sports Wear.
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}
