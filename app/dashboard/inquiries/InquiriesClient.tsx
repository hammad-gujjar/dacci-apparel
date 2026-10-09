'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
    IoLayersOutline, 
    IoDocumentAttachOutline, 
    IoArrowForwardOutline,
    IoTimeOutline,
    IoAddOutline,
    IoRefreshOutline,
    IoCheckmarkCircleOutline
} from 'react-icons/io5';
import { MdOutlinePrecisionManufacturing } from 'react-icons/md';

interface InquiriesClientProps {
    userName: string;
    userEmail: string;
}

interface InquirySummary {
    id: string;
    rfqNumber: string;
    productType: string;
    productSlug?: string;
    company: string;
    quantity: number;
    estimatedQuantity: string;
    deadline?: string;
    status: string;
    submissionDate: string;
    filesCount: number;
    itemsCount: number;
    customizationOptions: string[];
}

export default function InquiriesClient({ userName, userEmail }: InquiriesClientProps) {
    const [inquiries, setInquiries] = useState<InquirySummary[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'all' | 'In Review' | 'Sampling' | 'Production' | 'Completed'>('all');

    const fetchInquiries = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/account/inquiries', {
                params: { status: activeTab },
            });
            if (res.data.success) {
                setInquiries(res.data.data);
                if (res.data.stats) {
                    setStats(res.data.stats);
                }
            }
        } catch (err: any) {
            console.error("Failed to load inquiries:", err);
            toast.error("Unable to load inquiries. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, [activeTab]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'New':
                return {
                    label: 'Inquiry Received',
                    classes: 'bg-neutral-100 text-neutral-800 border-neutral-300',
                };
            case 'Contacted':
                return {
                    label: 'Review In Progress',
                    classes: 'bg-blue-50 text-blue-800 border-blue-200',
                };
            case 'Sample Requested':
                return {
                    label: 'Prototype Sampling',
                    classes: 'bg-purple-50 text-purple-800 border-purple-200',
                };
            case 'Production':
                return {
                    label: 'Bulk Production',
                    classes: 'bg-amber-50 text-amber-900 border-amber-300',
                };
            case 'Completed':
                return {
                    label: 'Order Completed',
                    classes: 'bg-emerald-50 text-emerald-900 border-emerald-300',
                };
            default:
                return {
                    label: status,
                    classes: 'bg-neutral-100 text-neutral-700 border-neutral-200',
                };
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-[middle] text-neutral-500">
                <Link href="/" className="hover:text-black transition">Home</Link>
                <span>/</span>
                <Link href="/dashboard" className="hover:text-black transition">Dashboard</Link>
                <span>/</span>
                <span className="text-[#111111] font-bold">My Inquiries</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs">
                <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-neutral-500 font-[middle]">
                        <MdOutlinePrecisionManufacturing className="text-base text-neutral-700" />
                        <span>B2B Production Portal</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-[main] uppercase tracking-tight text-[#111111] mt-1">
                        Manufacturing Inquiries & Projects
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-600 font-[middle] mt-1">
                        Track live Tech Pack reviews, prototype sampling, and bulk production stages for {userName || userEmail}.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchInquiries}
                        disabled={loading}
                        className="p-2.5 rounded-xl border border-black/10 bg-white hover:bg-neutral-50 text-neutral-700 transition flex items-center gap-1.5 text-xs font-bold font-[middle]"
                        title="Refresh"
                    >
                        <IoRefreshOutline className={`text-base ${loading ? 'animate-spin' : ''}`} />
                    </button>

                    <Link
                        href="/contact"
                        className="px-4 py-2.5 rounded-xl bg-[#111111] text-white hover:bg-black transition flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-[middle] shadow-sm"
                    >
                        <IoAddOutline className="text-base" />
                        <span>Submit New RFQ</span>
                    </Link>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-white/60 p-2 rounded-2xl border border-black/10 shadow-2xs">
                {(['all', 'In Review', 'Sampling', 'Production', 'Completed'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold font-[middle] transition capitalize ${
                            activeTab === tab
                                ? 'bg-[#111111] text-white shadow-xs'
                                : 'bg-transparent text-neutral-600 hover:text-black hover:bg-black/5'
                        }`}
                    >
                        {tab === 'all' ? `All Inquiries (${stats?.total ?? inquiries.length})` : tab}
                    </button>
                ))}
            </div>

            {/* Inquiries Content */}
            {loading ? (
                <div className="bg-white/80 rounded-2xl border border-black/10 p-12 text-center text-neutral-400 font-[middle] text-sm">
                    Loading project specifications...
                </div>
            ) : inquiries.length === 0 ? (
                <div className="bg-white/80 rounded-2xl border border-black/10 p-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mx-auto text-neutral-400">
                        <IoLayersOutline className="text-2xl" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-[main] text-base uppercase text-[#111111]">
                            No Inquiries Found
                        </h3>
                        <p className="text-xs text-neutral-500 font-[middle] max-w-md mx-auto">
                            {activeTab === 'all' 
                                ? "You haven't submitted any manufacturing inquiries or Tech Packs with this account yet."
                                : `No inquiries currently in stage "${activeTab}".`}
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] text-white hover:bg-black text-xs font-bold uppercase tracking-wider font-[middle]"
                    >
                        <span>Request Custom Quote & Tech Pack</span>
                        <IoArrowForwardOutline className="text-sm" />
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {inquiries.map((inq) => {
                        const badge = getStatusBadge(inq.status);
                        const formattedDate = new Date(inq.submissionDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        });

                        return (
                            <div
                                key={inq.id}
                                className="group bg-white/80 hover:bg-white border border-black/10 hover:border-black/30 rounded-2xl p-6 transition-all duration-200 shadow-2xs space-y-4"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs font-bold text-neutral-500">
                                            {inq.rfqNumber}
                                        </span>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badge.classes} font-[middle]`}>
                                            {badge.label}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-[middle]">
                                        <IoTimeOutline className="text-sm" />
                                        <span>Submitted {formattedDate}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <h3 className="font-[main] text-base sm:text-lg uppercase tracking-tight text-[#111111]">
                                            {inq.productType}
                                        </h3>
                                        <p className="text-xs text-neutral-500 font-[middle]">
                                            Client: <strong className="text-neutral-800">{inq.company}</strong> · Volume: <strong className="text-neutral-800">{inq.estimatedQuantity}</strong>
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {inq.filesCount > 0 && (
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-100 text-neutral-700 text-xs font-bold font-[middle]">
                                                <IoDocumentAttachOutline className="text-base text-neutral-500" />
                                                <span>{inq.filesCount} CAD / Tech Pack{inq.filesCount > 1 ? 's' : ''}</span>
                                            </div>
                                        )}

                                        <Link
                                            href={`/dashboard/inquiries/${inq.id}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] text-white hover:bg-black transition text-xs font-bold uppercase tracking-wider font-[middle] shadow-2xs"
                                        >
                                            <span>View Project</span>
                                            <IoArrowForwardOutline className="text-sm group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
