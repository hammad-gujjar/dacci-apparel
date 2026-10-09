'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import BreadCrumb from '../../components/BreadCrumb';
import { 
    MdOutlineArticle, 
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
    { label: "Knowledge Hub", href: "/admin/seo/knowledge" },
];

export default function KnowledgeClient() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<'all' | 'Published' | 'Draft'>('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/seo/knowledge', {
                params: {
                    status: statusFilter,
                    category: categoryFilter,
                    search: searchQuery,
                },
            });
            if (res.data.success) {
                setArticles(res.data.data);
            }
        } catch (err: any) {
            console.error("Failed to fetch knowledge articles:", err);
            toast.error("Failed to load knowledge articles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [statusFilter, categoryFilter]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchArticles();
    };

    const handleDelete = async (id: string, title: string) => {
        if (id.startsWith('static_')) {
            toast.error("Static core guides cannot be deleted directly. You can edit them to save a database override draft.");
            return;
        }

        if (!confirm(`Are you sure you want to delete the technical guide "${title}"?`)) {
            return;
        }

        try {
            const res = await axios.delete(`/api/admin/seo/knowledge/${id}`);
            if (res.data.success) {
                toast.success(`Deleted "${title}"`);
                fetchArticles();
            }
        } catch (err: any) {
            console.error("Failed to delete article:", err);
            toast.error(err.response?.data?.message || "Failed to delete guide");
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <BreadCrumb breadcrumbData={breadcrumbData} />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-black/10 shadow-2xs">
                <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-neutral-500 font-[middle]">
                        <MdOutlineArticle className="text-base text-neutral-700" />
                        <span>Technical Manufacturing Library</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-[main] uppercase tracking-tight text-[#111111] mt-1">
                        Knowledge Hub Guides
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-600 font-[middle] mt-1">
                        Manage technical garment specifications, fabric matrices, buyer advice, and E-E-A-T search authority.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchArticles}
                        disabled={loading}
                        className="p-2.5 rounded-xl border border-black/10 bg-white hover:bg-neutral-50 text-neutral-700 transition flex items-center gap-1.5 text-xs font-bold font-[middle]"
                        title="Refresh list"
                    >
                        <MdRefresh className={`text-base ${loading ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </button>

                    <Link
                        href="/admin/seo/knowledge/add"
                        className="px-4 py-2.5 rounded-xl bg-[#111111] text-white hover:bg-black transition flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-[middle] shadow-sm"
                    >
                        <MdAdd className="text-base" />
                        <span>Create Guide</span>
                    </Link>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-black/10 shadow-2xs">
                {/* Status & Category Selectors */}
                <div className="flex flex-wrap items-center gap-2">
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
                                {tab === 'all' ? 'All Guides' : tab}
                            </button>
                        ))}
                    </div>

                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-black/10 bg-white text-xs font-bold font-[middle] text-neutral-700 focus:outline-none focus:border-black"
                    >
                        <option value="all">All Categories</option>
                        <option value="Fabric Engineering">Fabric Engineering</option>
                        <option value="Manufacturing Quality">Manufacturing Quality</option>
                        <option value="Printing & Decoration">Printing & Decoration</option>
                        <option value="Production Planning">Production Planning</option>
                        <option value="Fit & Pattern Making">Fit & Pattern Making</option>
                        <option value="Compliance & Testing">Compliance & Testing</option>
                    </select>
                </div>

                {/* Search Input */}
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full sm:w-80">
                    <div className="relative w-full">
                        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                        <input
                            type="text"
                            placeholder="Search by title, slug, topic..."
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

            {/* Knowledge Articles Table */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-black/10 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-black/10 bg-neutral-50/50 text-[10px] uppercase tracking-wider font-bold text-neutral-500 font-[middle]">
                                <th className="p-4">Technical Guide</th>
                                <th className="p-4">Category & Read Time</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Data Source</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5 text-xs font-[middle]">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-neutral-400">
                                        Loading technical guides...
                                    </td>
                                </tr>
                            ) : articles.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-neutral-500">
                                        No knowledge articles found matching criteria.
                                    </td>
                                </tr>
                            ) : (
                                articles.map((article) => {
                                    const isDraft = article.status === 'Draft' || article.published === false;
                                    const editId = article._id || article.slug;

                                    return (
                                        <tr key={article._id || article.slug} className="hover:bg-neutral-50/70 transition">
                                            <td className="p-4">
                                                <div className="font-bold text-[#111111] font-[main] text-sm">
                                                    {article.title}
                                                </div>
                                                <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                                                    /knowledge/{article.slug}
                                                </div>
                                            </td>

                                            <td className="p-4">
                                                <div className="font-semibold text-neutral-800">
                                                    {article.category || 'Fabric Engineering'}
                                                </div>
                                                <div className="text-[10px] text-neutral-400 mt-0.5">
                                                    {article.readTime || '8 min read'}
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
                                                {article.isStaticFallback ? (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-100 text-neutral-600 border border-neutral-200">
                                                        Static Fallback
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                                                        Live MongoDB
                                                    </span>
                                                )}
                                            </td>

                                            <td className="p-4 text-right">
                                                <div className="inline-flex items-center gap-1.5">
                                                    <Link
                                                        href={`/knowledge/${article.slug}`}
                                                        target="_blank"
                                                        className="p-1.5 rounded-lg border border-black/10 bg-white hover:bg-neutral-100 text-neutral-600 hover:text-black transition"
                                                        title="Preview Public Guide"
                                                    >
                                                        <MdOutlinePublic className="text-base" />
                                                    </Link>

                                                    <Link
                                                        href={`/admin/seo/knowledge/edit/${editId}`}
                                                        className="p-1.5 rounded-lg border border-black/10 bg-white hover:bg-neutral-100 text-neutral-800 hover:text-black transition"
                                                        title="Edit Guide"
                                                    >
                                                        <MdOutlineEdit className="text-base" />
                                                    </Link>

                                                    {!article.isStaticFallback && (
                                                        <button
                                                            onClick={() => handleDelete(article._id, article.title)}
                                                            className="p-1.5 rounded-lg border border-red-200 bg-white hover:bg-red-50 text-red-600 transition"
                                                            title="Delete Guide"
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
