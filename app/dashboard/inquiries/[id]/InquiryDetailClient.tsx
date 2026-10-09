'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { 
    IoArrowBackOutline, 
    IoDocumentAttachOutline, 
    IoDownloadOutline, 
    IoCheckmarkCircle, 
    IoRadioButtonOn, 
    IoEllipseOutline,
    IoTimeOutline,
    IoCallOutline,
    IoChatbubbleEllipsesOutline,
    IoShieldCheckmarkOutline
} from 'react-icons/io5';
import { MdOutlinePrecisionManufacturing, MdOutlineCalendarToday } from 'react-icons/md';

interface InquiryDetailClientProps {
    id: string;
}

export default function InquiryDetailClient({ id }: InquiryDetailClientProps) {
    const [inquiry, setInquiry] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await axios.get(`/api/account/inquiries/${id}`);
                if (res.data.success) {
                    setInquiry(res.data.data);
                }
            } catch (err: any) {
                console.error("Failed to load inquiry detail:", err);
                setError(err.response?.data?.message || "Inquiry not found or access denied.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const formatFileSize = (bytes?: number) => {
        if (!bytes || bytes === 0) return 'CAD Document';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto py-20 text-center text-neutral-400 font-[middle] text-sm">
                Loading project specifications & factory timeline...
            </div>
        );
    }

    if (error || !inquiry) {
        return (
            <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-10 rounded-2xl border border-black/10 text-center space-y-4 shadow-2xs">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                    <IoShieldCheckmarkOutline className="text-2xl" />
                </div>
                <h2 className="font-[main] text-xl uppercase text-[#111111]">
                    Access Restricted
                </h2>
                <p className="text-xs text-neutral-600 font-[middle] max-w-md mx-auto">
                    {error || "This manufacturing inquiry does not exist or belongs to another registered client."}
                </p>
                <div className="pt-2">
                    <Link
                        href="/dashboard/inquiries"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] text-white hover:bg-black text-xs font-bold uppercase tracking-wider font-[middle]"
                    >
                        <IoArrowBackOutline className="text-sm" />
                        <span>Return to My Inquiries</span>
                    </Link>
                </div>
            </div>
        );
    }

    const whatsappMessage = encodeURIComponent(
        `Hello Slots Sports Wear Production Team, I am checking the status of our project ${inquiry.rfqNumber} (${inquiry.productType}) for ${inquiry.company}.`
    );

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Navigation & Breadcrumb */}
            <div className="flex items-center justify-between">
                <nav className="flex items-center gap-2 text-xs font-[middle] text-neutral-500">
                    <Link href="/" className="hover:text-black transition">Home</Link>
                    <span>/</span>
                    <Link href="/dashboard" className="hover:text-black transition">Dashboard</Link>
                    <span>/</span>
                    <Link href="/dashboard/inquiries" className="hover:text-black transition">My Inquiries</Link>
                    <span>/</span>
                    <span className="text-[#111111] font-bold font-mono">{inquiry.rfqNumber}</span>
                </nav>

                <Link
                    href="/dashboard/inquiries"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-black font-[middle]"
                >
                    <IoArrowBackOutline className="text-sm" />
                    <span>Back to Inquiries</span>
                </Link>
            </div>

            {/* Top Project Header Card */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-4">
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold px-3 py-1 rounded-lg bg-black/5 text-[#111111]">
                            {inquiry.rfqNumber}
                        </span>
                        <span className="text-xs text-neutral-500 font-[middle]">
                            Submitted on {new Date(inquiry.submissionDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>

                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white font-[middle] self-start sm:self-auto">
                        Stage: {inquiry.status}
                    </span>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 font-[middle]">
                        <MdOutlinePrecisionManufacturing className="text-base text-neutral-700" />
                        <span>{inquiry.company} · {inquiry.country}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-[main] uppercase tracking-tight text-[#111111]">
                        {inquiry.productType}
                    </h1>
                </div>
            </div>

            {/* Visual 5-Stage Production Progress Timeline */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-6">
                <div>
                    <h2 className="text-base sm:text-lg font-[main] uppercase tracking-tight text-[#111111]">
                        Factory Production Progress Timeline
                    </h2>
                    <p className="text-xs text-neutral-500 font-[middle] mt-0.5">
                        Real-time status milestones tracked by our Sialkot manufacturing plant.
                    </p>
                </div>

                <div className="space-y-4 pt-2">
                    {inquiry.timeline.map((step: any, idx: number) => {
                        const isCompleted = step.isCompleted;
                        const isCurrent = step.isCurrent;

                        return (
                            <div key={step.id} className="relative flex items-start gap-4">
                                {/* Vertical Connector Line */}
                                {idx < inquiry.timeline.length - 1 && (
                                    <div 
                                        className={`absolute left-[13px] top-6 bottom-0 w-0.5 ${
                                            isCompleted && !isCurrent ? 'bg-black' : 'bg-black/10'
                                        }`} 
                                    />
                                )}

                                {/* Status Icon */}
                                <div className="relative z-10 shrink-0 mt-0.5">
                                    {isCompleted && !isCurrent ? (
                                        <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shadow-xs">
                                            <IoCheckmarkCircle className="text-lg text-[#EDEEE7]" />
                                        </div>
                                    ) : isCurrent ? (
                                        <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center ring-4 ring-black/15 shadow-sm">
                                            <IoRadioButtonOn className="text-sm text-[#EDEEE7] animate-pulse" />
                                        </div>
                                    ) : (
                                        <div className="w-7 h-7 rounded-full bg-neutral-100 border border-black/15 text-neutral-300 flex items-center justify-center">
                                            <IoEllipseOutline className="text-sm" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-6">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className={`text-xs sm:text-sm font-bold font-[main] uppercase ${
                                            isCurrent ? 'text-black' : isCompleted ? 'text-neutral-900' : 'text-neutral-400'
                                        }`}>
                                            {step.label}
                                        </h3>
                                        {isCurrent && (
                                            <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-black text-white font-[middle]">
                                                Active Stage
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-xs font-[middle] mt-1 ${
                                        isCurrent ? 'text-neutral-700 font-medium' : isCompleted ? 'text-neutral-600' : 'text-neutral-400'
                                    }`}>
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Project Specifications & Volume Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Card: Key Order Parameters */}
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-black/10 shadow-2xs space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 font-[middle]">
                        Order Specifications
                    </span>

                    <div className="space-y-3 pt-2 text-xs font-[middle]">
                        <div className="flex items-center justify-between py-1.5 border-b border-black/5">
                            <span className="text-neutral-500">Total Production Volume</span>
                            <span className="font-bold text-neutral-900">{inquiry.estimatedQuantity}</span>
                        </div>

                        <div className="flex items-center justify-between py-1.5 border-b border-black/5">
                            <span className="text-neutral-500">Target Delivery / Deadline</span>
                            <span className="font-bold text-neutral-900">
                                {inquiry.deadline ? new Date(inquiry.deadline).toLocaleDateString() : 'Standard 14 Days'}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-1.5 border-b border-black/5">
                            <span className="text-neutral-500">Registered Contact</span>
                            <span className="font-bold text-neutral-900">{inquiry.name}</span>
                        </div>

                        <div className="flex items-center justify-between py-1.5 border-b border-black/5">
                            <span className="text-neutral-500">Business Email</span>
                            <span className="font-mono text-neutral-800">{inquiry.email}</span>
                        </div>

                        {inquiry.phone && (
                            <div className="flex items-center justify-between py-1.5 border-b border-black/5">
                                <span className="text-neutral-500">Direct Phone</span>
                                <span className="font-medium text-neutral-800">{inquiry.phone}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Card: Customization Options */}
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-black/10 shadow-2xs space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 font-[middle]">
                            Applied Customization Options
                        </span>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {inquiry.customizationOptions.length > 0 ? (
                                inquiry.customizationOptions.map((opt: string, i: number) => (
                                    <span key={i} className="px-3 py-1 rounded-lg bg-black/5 border border-black/10 text-xs font-bold text-neutral-800 font-[middle]">
                                        {opt}
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs text-neutral-400 font-[middle] italic">Standard OEM Construction</span>
                            )}
                        </div>
                    </div>

                    {/* Direct WhatsApp Concierge Trigger */}
                    <div className="pt-4 border-t border-black/5">
                        <a
                            href={`https://wa.me/923000000000?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition text-xs font-bold uppercase tracking-wider font-[middle] shadow-2xs"
                        >
                            <IoChatbubbleEllipsesOutline className="text-base" />
                            <span>WhatsApp Production Concierge</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Buyer-Provided Customization & Specs */}
            {inquiry.customizationDetails && (
                <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 font-[middle]">
                        Production Instructions & Fabric Specifications
                    </span>
                    <div className="p-4 rounded-xl bg-neutral-50/70 border border-black/5 text-xs font-[middle] text-neutral-800 whitespace-pre-line leading-relaxed">
                        {inquiry.customizationDetails}
                    </div>
                </div>
            )}

            {/* Itemized Garment Styles Table (if multiple items) */}
            {inquiry.items && inquiry.items.length > 0 && (
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-black/10 shadow-2xs overflow-hidden">
                    <div className="p-5 border-b border-black/10">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 font-[middle]">
                            Itemized Garment Breakdown ({inquiry.items.length})
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs font-[middle]">
                            <thead>
                                <tr className="border-b border-black/10 bg-neutral-50/50 text-[10px] uppercase tracking-wider font-bold text-neutral-500">
                                    <th className="p-4">Style Name</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Color / Size Range</th>
                                    <th className="p-4">Quantity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5">
                                {inquiry.items.map((item: any, idx: number) => (
                                    <tr key={idx} className="hover:bg-neutral-50/70 transition">
                                        <td className="p-4 font-bold text-neutral-900 font-[main]">
                                            {item.name}
                                        </td>
                                        <td className="p-4 text-neutral-600">
                                            {item.category}
                                        </td>
                                        <td className="p-4 text-neutral-600">
                                            {item.color || 'Default'} / {item.sizeRange || 'Full Range'}
                                        </td>
                                        <td className="p-4 font-bold text-neutral-900">
                                            {item.quantity} pcs
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Attached Tech Pack CAD / Vector Files */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <div>
                        <h2 className="text-base sm:text-lg font-[main] uppercase tracking-tight text-[#111111]">
                            Attached Tech Pack & CAD Files ({inquiry.files.length})
                        </h2>
                        <p className="text-xs text-neutral-500 font-[middle] mt-0.5">
                            Original technical drawings and CAD documents associated with this RFQ.
                        </p>
                    </div>
                </div>

                {inquiry.files.length === 0 ? (
                    <p className="text-xs text-neutral-400 font-[middle] italic py-2">
                        No technical CAD or PDF files were attached during this submission.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {inquiry.files.map((file: any, idx: number) => (
                            <div
                                key={idx}
                                className="p-4 rounded-xl border border-black/10 bg-white/70 flex items-center justify-between gap-3 shadow-2xs hover:border-black/30 transition"
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-700">
                                        <IoDocumentAttachOutline className="text-xl" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-bold text-neutral-900 truncate font-[middle]">
                                            {file.fileName}
                                        </p>
                                        <p className="text-[10px] text-neutral-400 font-mono">
                                            {formatFileSize(file.fileSize)}
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={file.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg border border-black/15 bg-white hover:bg-black hover:text-white text-neutral-700 transition shrink-0"
                                    title="Download CAD File"
                                >
                                    <IoDownloadOutline className="text-base" />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
