'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import BreadCrumb from '../../components/BreadCrumb';
import { 
    MdOutlineManageSearch, 
    MdAdd, 
    MdSearch, 
    MdOutlinePublic, 
    MdOutlineEdit, 
    MdOutlineDelete,
    MdRefresh
} from 'react-icons/md';

const breadcrumbData = [
    { label: "Home", href: "/admin/dashboard" },
    { label: "SEO & Content CMS", href: "/admin/seo" },
    { label: "Solutions", href: "/admin/seo/solutions" },
];

export default function SolutionsClient() {
    const [solutions, setSolutions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<'all' | 'Published' | 'Draft'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchSolutions = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/seo/solutions', {
                params: {
                    status: statusFilter,
                    search: searchQuery,
                },
            });
            if (res.data.success) {
                setSolutions(res.data.data);
            }
        } catch (err: any) {
            console.error("Failed to fetch solutions:", err);
            toast.error("Failed to load solutions list");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSolutions();
    }, [statusFilter]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchSolutions();
    };

    const handleDelete = async (id: string, title: string) => {
        if (id.startsWith('static_')) {
            toast.error("Static core pages cannot be deleted directly. You can edit them to save a database override draft.");
            return;
        }

        if (!confirm(`Are you sure you want to delete the solution page "${title}"?`)) {
            return;
        }

        try {
            const res = await axios.delete(`/api/admin/seo/solutions/${id}`);
            if (res.data.success) {
                toast.success(`Deleted "${title}"`);
                fetchSolutions();
            }
        } catch (err: any) {
            console.error("Failed to delete solution:", err);
            toast.error(err.response?.data?.message || "Failed to delete solution");
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <BreadCrumb breadcrumbData={breadcrumbData} />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-black/10 shadow-2xs">
                <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-neutral-500 font-[middle]">
                        <MdOutlineManageSearch className="text-base text-neutral-700" />
                        <span>Commercial Landing Pages</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-[main] uppercase tracking-tight text-[#111111] mt-1">
                        B2B Solution Pages
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-600 font-[middle] mt-1">
                        Manage programmatic activewear manufacturing landing pages, keywords, fabrics, and internal linking.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchSolutions}
                        disabled={loading}
                        className="p-2.5 rounded-xl border border-black/10 bg-white hover:bg-neutral-50 text-neutral-700 transition flex items-center gap-1.5 text-xs font-bold font-[middle]"
                        title="Refresh list"
                    >
                        <MdRefresh className={`text-base ${loading ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </button>

                    <Link
                        href="/admin/seo/solutions/add"
                        className="px-4 py-2.5 rounded-xl bg-[#111111] text-white hover:bg-black transition flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-[middle] shadow-sm"
                    >
                        <MdAdd className="text-base" />
                        <span>Create Solution</span>
                    </Link>
                </div>
            </div>

            {/* Controls Bar: Search & Filter Tabs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-black/10 shadow-2xs">
                {/* Status Tabs */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-black/5 border border-black/5">
                    {(['all', 'Published', 'Draft'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setStatusFilter(tab)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-[middle] transition capitalize ${
                                statusFilter === tab
                                    ? 'bg-white text-black shadow-2xs'
                                    : 'text-neutral-500 hover:text-black'
                            }`}
                        >
                            {tab === 'all' ? 'All Pages' : tab}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full sm:w-80">
                    <div className="relative w-full">
                        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                        <input
                            type="text"
                            placeholder="Search by title, slug, keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-black/10 bg-white text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-3 py-2 rounded-xl bg-[#111111] text-white hover:bg-black transition text-xs font-bold font-[middle]"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Solutions Table */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-black/10 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-black/10 bg-neutral-50/50 text-[10px] uppercase tracking-wider font-bold text-neutral-500 font-[middle]">
                                <th className="p-4">Solution Page</th>
                                <th className="p-4">Target Keyword & Intent</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Data Source</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5 text-xs font-[middle]">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-neutral-400">
                                        Loading solutions...
                                    </td>
                                </tr>
                            ) : solutions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-neutral-500">
                                        No solution pages found matching criteria.
                                    </td>
                                </tr>
                            ) : (
                                solutions.map((sol) => {
                                    const isDraft = sol.status === 'Draft' || sol.published === false;
                                    const editId = sol._id || sol.slug;

                                    return (
                                        <tr key={sol._id || sol.slug} className="hover:bg-neutral-50/70 transition">
                                            <td className="p-4">
                                                <div className="font-bold text-[#111111] font-[main] text-sm">
                                                    {sol.title}
                                                </div>
                                                <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                                                    /solutions/{sol.slug}
                                                </div>
                                            </td>

                                            <td className="p-4">
                                                <div className="font-semibold text-neutral-800">
                                                    {sol.targetKeyword || 'OEM Sportswear'}
                                                </div>
                                                <div className="text-[10px] text-neutral-400 mt-0.5">
                                                    {sol.searchIntent || 'Commercial / B2B OEM Sourcing'}
                                                </div>
                                            </td>

                                            <td className="p-4">
                                                {isDraft ? (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                                                        Draft (NoIndex)
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                                                        Published
                                                    </span>
                                                )}
                                            </td>

                                            <td className="p-4">
                                                {sol.isStaticFallback ? (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-100 text-neutral-600 border border-neutral-200">
                                                        Static Fallback
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                                        Live MongoDB
                                                    </span>
                                                )}
                                            </td>

                                            <td className="p-4 text-right">
                                                <div className="inline-flex items-center gap-1.5">
                                                    <Link
                                                        href={`/solutions/${sol.slug}`}
                                                        target="_blank"
                                                        className="p-1.5 rounded-lg border border-black/10 bg-white hover:bg-neutral-100 text-neutral-600 hover:text-black transition"
                                                        title="Preview Public Page"
                                                    >
                                                        <MdOutlinePublic className="text-base" />
                                                    </Link>

                                                    <Link
                                                        href={`/admin/seo/solutions/edit/${editId}`}
                                                        className="p-1.5 rounded-lg border border-black/10 bg-white hover:bg-neutral-100 text-neutral-800 hover:text-black transition"
                                                        title="Edit Solution"
                                                    >
                                                        <MdOutlineEdit className="text-base" />
                                                    </Link>

                                                    {!sol.isStaticFallback && (
                                                        <button
                                                            onClick={() => handleDelete(sol._id, sol.title)}
                                                            className="p-1.5 rounded-lg border border-red-200 bg-white hover:bg-red-50 text-red-600 transition"
                                                            title="Delete Solution"
                                                        >
                                                            <MdOutlineDelete className="text-base" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
