'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import BreadCrumb from '../components/BreadCrumb';
import { 
    MdOutlineManageSearch, 
    MdOutlineArticle, 
    MdOutlineCheckCircle, 
    MdOutlineWarningAmber,
    MdAdd,
    MdArrowForward,
    MdRefresh,
    MdOutlinePublic
} from 'react-icons/md';
import { IoLayersOutline } from 'react-icons/io5';

const breadcrumbData = [
    { label: "Home", href: "/admin/dashboard" },
    { label: "SEO & Content CMS", href: "/admin/seo" },
];

export default function SEOOverviewClient() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/seo/stats');
            if (res.data.success) {
                setStats(res.data.data);
            }
        } catch (err: any) {
            console.error("Failed to fetch SEO stats:", err);
            toast.error("Failed to load SEO overview metrics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <BreadCrumb breadcrumbData={breadcrumbData} />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-black/10 shadow-2xs">
                <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-neutral-500 font-[middle]">
                        <MdOutlineManageSearch className="text-base text-neutral-700" />
                        <span>Organic Growth Engine</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-[main] uppercase tracking-tight text-[#111111] mt-1">
                        B2B SEO Content CMS
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-600 font-[middle] mt-1">
                        Manage programmatic landing pages, technical garment specifications, and internal linking authority.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchStats}
                        disabled={loading}
                        className="p-2.5 rounded-xl border border-black/10 bg-white hover:bg-neutral-50 text-neutral-700 transition flex items-center gap-1.5 text-xs font-bold font-[middle]"
                        title="Refresh metrics"
                    >
                        <MdRefresh className={`text-base ${loading ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </button>

                    <Link
                        href="/admin/seo/solutions/add"
                        className="px-4 py-2.5 rounded-xl bg-[#111111] text-white hover:bg-black transition flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-[middle] shadow-sm"
                    >
                        <MdAdd className="text-base" />
                        <span>New Solution</span>
                    </Link>

                    <Link
                        href="/admin/seo/knowledge/add"
                        className="px-4 py-2.5 rounded-xl bg-white border border-black/20 text-[#111111] hover:bg-neutral-100 transition flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-[middle]"
                    >
                        <MdAdd className="text-base" />
                        <span>New Guide</span>
                    </Link>
                </div>
            </div>

            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Published Pages */}
                <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-black/10 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between text-neutral-500">
                        <span className="text-[11px] font-bold uppercase tracking-wider font-[middle]">Published Organic Pages</span>
                        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                            <MdOutlineCheckCircle className="text-lg" />
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-[main] font-bold text-[#111111]">
                            {loading ? '...' : (stats?.overall?.totalPublished ?? 0)}
                        </div>
                        <p className="text-[11px] text-neutral-500 font-[middle] mt-1">
                            Live in sitemap & indexed by Google
                        </p>
                    </div>
                </div>

                {/* Drafts Pending Review */}
                <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-black/10 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between text-neutral-500">
                        <span className="text-[11px] font-bold uppercase tracking-wider font-[middle]">Drafts In Staging</span>
                        <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                            <MdOutlineWarningAmber className="text-lg" />
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-[main] font-bold text-[#111111]">
                            {loading ? '...' : (stats?.overall?.totalDrafts ?? 0)}
                        </div>
                        <p className="text-[11px] text-neutral-500 font-[middle] mt-1">
                            Excluded from search engines (noindex)
                        </p>
                    </div>
                </div>

                {/* Solutions Architecture */}
                <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-black/10 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between text-neutral-500">
                        <span className="text-[11px] font-bold uppercase tracking-wider font-[middle]">Solution Landing Pages</span>
                        <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                            <IoLayersOutline className="text-lg" />
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-[main] font-bold text-[#111111]">
                            {loading ? '...' : (stats?.solutions?.total ?? 0)}
                        </div>
                        <p className="text-[11px] text-neutral-500 font-[middle] mt-1">
                            {stats?.solutions?.published ?? 0} Published · {stats?.solutions?.drafts ?? 0} Drafts
                        </p>
                    </div>
                </div>

                {/* Technical Knowledge Articles */}
                <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-black/10 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between text-neutral-500">
                        <span className="text-[11px] font-bold uppercase tracking-wider font-[middle]">Knowledge Hub Guides</span>
                        <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
                            <MdOutlineArticle className="text-lg" />
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-[main] font-bold text-[#111111]">
                            {loading ? '...' : (stats?.knowledge?.total ?? 0)}
                        </div>
                        <p className="text-[11px] text-neutral-500 font-[middle] mt-1">
                            {stats?.knowledge?.published ?? 0} Published · {stats?.knowledge?.drafts ?? 0} Drafts
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Hub Navigation & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Solution Pages Card */}
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-black/10 shadow-2xs flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-[10px] uppercase tracking-wider font-bold font-[middle]">
                                Commercial Intent Landing Pages
                            </span>
                            <span className="text-xs text-neutral-500 font-[middle]">
                                /solutions/[slug]
                            </span>
                        </div>
                        <h2 className="text-xl font-[main] uppercase tracking-tight text-[#111111]">
                            B2B Solution Pages
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-600 font-[middle] leading-relaxed">
                            Target high-intent search queries like "custom sportswear manufacturer", "private label athletic apparel", and "wholesale gym wear OEM". Includes structured B2B benefits, fabric matrices, and direct RFQ conversion funnels.
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-black/5">
                        <Link
                            href="/solutions/custom-sportswear-manufacturer"
                            target="_blank"
                            className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black font-bold font-[middle]"
                        >
                            <MdOutlinePublic className="text-sm" />
                            <span>Preview Live Route</span>
                        </Link>
                        <Link
                            href="/admin/seo/solutions"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] text-white hover:bg-black transition text-xs font-bold uppercase tracking-wider font-[middle]"
                        >
                            <span>Manage All Solutions</span>
                            <MdArrowForward className="text-sm" />
                        </Link>
                    </div>
                </div>

                {/* Technical Knowledge Hub Card */}
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-black/10 shadow-2xs flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-[10px] uppercase tracking-wider font-bold font-[middle]">
                                E-E-A-T Authority & Specifications
                            </span>
                            <span className="text-xs text-neutral-500 font-[middle]">
                                /knowledge/[slug]
                            </span>
                        </div>
                        <h2 className="text-xl font-[main] uppercase tracking-tight text-[#111111]">
                            Technical Knowledge Hub
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-600 font-[middle] leading-relaxed">
                            Educational technical guides covering GSM fabric weights, seam construction, moisture-wicking technology, and sublimation chemistry. Cross-linked to commercial solutions to pass link equity and educate buyers.
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-black/5">
                        <Link
                            href="/knowledge"
                            target="_blank"
                            className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black font-bold font-[middle]"
                        >
                            <MdOutlinePublic className="text-sm" />
                            <span>Preview Live Hub</span>
                        </Link>
                        <Link
                            href="/admin/seo/knowledge"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] text-white hover:bg-black transition text-xs font-bold uppercase tracking-wider font-[middle]"
                        >
                            <span>Manage Knowledge Hub</span>
                            <MdArrowForward className="text-sm" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quality Controls & Sitemap Health */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-black/10 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-[main] uppercase tracking-tight text-[#111111]">
                            SEO Health & Indexability Audit
                        </h3>
                        <p className="text-xs text-neutral-500 font-[middle]">
                            Automated checks inspecting metadata lengths, schema blocks, and indexing status.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-[middle] text-neutral-600">Health Index:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold font-[middle] ${
                            (stats?.overall?.healthScore ?? 100) >= 90 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-amber-100 text-amber-800'
                        }`}>
                            {loading ? '...' : `${stats?.overall?.healthScore ?? 100}%`}
                        </span>
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                    {stats?.overall?.auditAlerts && stats.overall.auditAlerts.length > 0 ? (
                        stats.overall.auditAlerts.map((alert: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/60 border border-amber-200/50 text-amber-900 text-xs font-[middle]">
                                <MdOutlineWarningAmber className="text-base shrink-0 text-amber-600 mt-0.5" />
                                <span>{alert}</span>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/50 text-emerald-900 text-xs font-[middle]">
                            <MdOutlineCheckCircle className="text-base shrink-0 text-emerald-600" />
                            <span>All published solution pages and knowledge guides satisfy title length, meta description, and schema guidelines.</span>
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600 font-[middle]">
                    <div className="flex items-center gap-2">
                        <span>XML Sitemap:</span>
                        <a 
                            href="/sitemap.xml" 
                            target="_blank" 
                            className="font-bold underline text-[#111111] hover:text-neutral-700"
                        >
                            /sitemap.xml
                        </a>
                        <span className="text-neutral-400">·</span>
                        <span>Robots:</span>
                        <a 
                            href="/robots.txt" 
                            target="_blank" 
                            className="font-bold underline text-[#111111] hover:text-neutral-700"
                        >
                            /robots.txt
                        </a>
                    </div>
                    <span className="text-[11px] text-neutral-400">
                        Drafts and unindexed pages are automatically filtered out from live sitemaps.
                    </span>
                </div>
            </div>
        </div>
    );
}
