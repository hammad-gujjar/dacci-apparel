'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import slugify from 'slugify';
import { 
    MdSave, 
    MdArrowBack, 
    MdAdd, 
    MdDeleteOutline, 
    MdOutlineInfo, 
    MdOutlineCheckCircle, 
    MdOutlineWarningAmber 
} from 'react-icons/md';

interface SolutionFormProps {
    initialData?: any;
    isEdit?: boolean;
    solutionId?: string;
}

export default function SolutionForm({ initialData, isEdit = false, solutionId }: SolutionFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [availableKnowledge, setAvailableKnowledge] = useState<any[]>([]);

    // Form state
    const [title, setTitle] = useState(initialData?.title || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || '');
    const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || '');
    const [targetKeyword, setTargetKeyword] = useState(initialData?.targetKeyword || '');
    const [secondaryKeywords, setSecondaryKeywords] = useState<string>(
        Array.isArray(initialData?.secondaryKeywords) 
            ? initialData.secondaryKeywords.join(', ') 
            : Array.isArray(initialData?.keywords) 
                ? initialData.keywords.slice(1).join(', ') 
                : ''
    );
    const [searchIntent, setSearchIntent] = useState(initialData?.searchIntent || 'Commercial / B2B OEM Sourcing');
    const [status, setStatus] = useState<'Published' | 'Draft'>(initialData?.status || (initialData?.published === false ? 'Draft' : 'Published'));
    const [noIndex, setNoIndex] = useState(Boolean(initialData?.noIndex));
    const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl || '');

    // Hero & Content
    const [heroBadge, setHeroBadge] = useState(initialData?.heroBadge || 'OEM / ODM Manufacturing Excellence');
    const [heroDescription, setHeroDescription] = useState(initialData?.heroDescription || initialData?.subtitle || '');
    const [introHeading, setIntroHeading] = useState(initialData?.introHeading || 'Manufacturing Excellence');
    const [introText, setIntroText] = useState<string[]>(
        initialData?.introText && initialData.introText.length > 0 ? initialData.introText : ['']
    );

    // Stats
    const [stats, setStats] = useState<Array<{ value: string; label: string }>>(
        initialData?.stats && initialData.stats.length > 0 
            ? initialData.stats 
            : [
                { value: '30 PCS', label: 'Low MOQ Flexibility' },
                { value: '14 DAYS', label: 'Rapid Prototype Sampling' },
                { value: '99.2%', label: 'On-Time Export Delivery' },
                { value: 'ISO 9001', label: 'Certified Quality Control' },
            ]
    );

    // Fabrics
    const [fabrics, setFabrics] = useState<Array<{ name: string; weight: string; composition: string; bestFor: string }>>(
        initialData?.fabrics && initialData.fabrics.length > 0 ? initialData.fabrics : []
    );

    // FAQs
    const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>(
        initialData?.faqs && initialData.faqs.length > 0 ? initialData.faqs : []
    );

    // Internal Linking: Selected Knowledge Guides
    const [relatedKnowledgeGuides, setRelatedKnowledgeGuides] = useState<Array<{ slug: string; title: string; readTime: string; category: string }>>(
        initialData?.relatedKnowledgeGuides || []
    );

    // Auto-generate slug and meta title if adding new
    useEffect(() => {
        if (!isEdit && title) {
            const autoSlug = slugify(title, { lower: true, strict: true });
            setSlug(autoSlug);
            if (!metaTitle) {
                setMetaTitle(`${title} | Slots Sports Wear OEM`);
            }
        }
    }, [title, isEdit]);

    // Fetch available knowledge articles for cross-linking
    useEffect(() => {
        const fetchKnowledge = async () => {
            try {
                const res = await axios.get('/api/admin/seo/knowledge?status=all');
                if (res.data.success) {
                    setAvailableKnowledge(res.data.data);
                }
            } catch (err) {
                console.error("Failed to load knowledge articles for linking:", err);
            }
        };
        fetchKnowledge();
    }, []);

    // Add / remove helper handlers
    const addStat = () => setStats([...stats, { value: '', label: '' }]);
    const removeStat = (index: number) => setStats(stats.filter((_, i) => i !== index));

    const addFabric = () => setFabrics([...fabrics, { name: '', weight: '', composition: '', bestFor: '' }]);
    const removeFabric = (index: number) => setFabrics(fabrics.filter((_, i) => i !== index));

    const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);
    const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));

    const addIntroParagraph = () => setIntroText([...introText, '']);
    const removeIntroParagraph = (index: number) => setIntroText(introText.filter((_, i) => i !== index));

    const toggleKnowledgeLink = (guide: any) => {
        const exists = relatedKnowledgeGuides.some(g => g.slug === guide.slug);
        if (exists) {
            setRelatedKnowledgeGuides(relatedKnowledgeGuides.filter(g => g.slug !== guide.slug));
        } else {
            setRelatedKnowledgeGuides([
                ...relatedKnowledgeGuides,
                {
                    slug: guide.slug,
                    title: guide.title,
                    readTime: guide.readTime || '8 min read',
                    category: guide.category || 'Fabric Engineering',
                },
            ]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !slug.trim()) {
            toast.error("Title and slug are required");
            return;
        }

        const secKeywordsArray = secondaryKeywords
            .split(',')
            .map(k => k.trim())
            .filter(Boolean);

        const payload = {
            title: title.trim(),
            slug: slug.trim(),
            metaTitle: metaTitle.trim() || title.trim(),
            metaDescription: metaDescription.trim(),
            targetKeyword: targetKeyword.trim() || title.trim(),
            secondaryKeywords: secKeywordsArray,
            keywords: [targetKeyword.trim() || title.trim(), ...secKeywordsArray],
            searchIntent,
            status,
            published: status === 'Published',
            noIndex,
            canonicalUrl: canonicalUrl.trim(),
            heroBadge: heroBadge.trim(),
            heroDescription: heroDescription.trim(),
            introHeading: introHeading.trim(),
            introText: introText.filter(t => t.trim().length > 0),
            stats: stats.filter(s => s.value.trim() && s.label.trim()),
            fabrics: fabrics.filter(f => f.name.trim()),
            faqs: faqs.filter(f => f.question.trim() && f.answer.trim()),
            relatedKnowledgeGuides,
        };

        try {
            setLoading(true);
            if (isEdit && solutionId) {
                const res = await axios.put(`/api/admin/seo/solutions/${solutionId}`, payload);
                if (res.data.success) {
                    toast.success("Solution page updated successfully");
                    router.push('/admin/seo/solutions');
                }
            } else {
                const res = await axios.post('/api/admin/seo/solutions', payload);
                if (res.data.success) {
                    toast.success("Solution page created successfully");
                    router.push('/admin/seo/solutions');
                }
            }
        } catch (err: any) {
            console.error("Failed to save solution:", err);
            toast.error(err.response?.data?.message || "Failed to save solution");
        } finally {
            setLoading(false);
        }
    };

    // SEO length checks
    const metaTitleLen = metaTitle.length;
    const metaDescLen = metaDescription.length;

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-16">
            {/* Top Action Header */}
            <div className="flex items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-black/10 shadow-2xs sticky top-4 z-20">
                <button
                    type="button"
                    onClick={() => router.push('/admin/seo/solutions')}
                    className="p-2 rounded-xl border border-black/10 hover:bg-neutral-100 text-neutral-600 transition flex items-center gap-1.5 text-xs font-bold font-[middle]"
                >
                    <MdArrowBack className="text-base" />
                    <span>Back</span>
                </button>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-bold font-[middle] text-neutral-600">Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as any)}
                            className="px-3 py-1.5 rounded-xl border border-black/15 bg-white text-xs font-bold font-[middle] focus:outline-none focus:border-black"
                        >
                            <option value="Published">Published (Indexable)</option>
                            <option value="Draft">Draft (NoIndex)</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2.5 rounded-xl bg-[#111111] text-white hover:bg-black transition flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-[middle] shadow-sm disabled:opacity-50"
                    >
                        <MdSave className="text-base" />
                        <span>{loading ? 'Saving...' : isEdit ? 'Update Solution' : 'Publish Solution'}</span>
                    </button>
                </div>
            </div>

            {/* 1. SEO & Metadata Panel */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-6">
                <div className="border-b border-black/10 pb-4">
                    <h2 className="text-lg font-[main] uppercase tracking-tight text-[#111111]">
                        1. Organic Search Engine Optimization (SEO)
                    </h2>
                    <p className="text-xs text-neutral-500 font-[middle] mt-0.5">
                        Target commercial B2B procurement queries and enforce title/meta description length standards.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Page Title */}
                    <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            Public Solution Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Custom Sportswear Manufacturer For Global Brands"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>

                    {/* URL Slug */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            URL Slug (/solutions/...) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="custom-sportswear-manufacturer"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs font-mono text-neutral-900 focus:outline-none focus:border-black"
                        />
                    </div>

                    {/* Search Intent */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            Search Query Intent
                        </label>
                        <select
                            value={searchIntent}
                            onChange={(e) => setSearchIntent(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs font-[middle] text-neutral-900 focus:outline-none focus:border-black"
                        >
                            <option value="Commercial / B2B OEM Sourcing">Commercial / B2B OEM Sourcing</option>
                            <option value="Commercial / Wholesale Manufacturing">Commercial / Wholesale Manufacturing</option>
                            <option value="Informational / Technical Garment Specs">Informational / Technical Garment Specs</option>
                        </select>
                    </div>

                    {/* Meta Title Tag */}
                    <div className="space-y-1.5 sm:col-span-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-neutral-800 font-[middle]">
                                Meta Title Tag (&lt;title&gt;)
                            </label>
                            <span className={`text-[10px] font-bold font-mono ${
                                metaTitleLen >= 50 && metaTitleLen <= 65 
                                    ? 'text-emerald-700' 
                                    : 'text-amber-600'
                            }`}>
                                {metaTitleLen} / 60 chars (Recommended: 50-65)
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Custom Sportswear Manufacturer | OEM Private Label Factory"
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>

                    {/* Meta Description */}
                    <div className="space-y-1.5 sm:col-span-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-neutral-800 font-[middle]">
                                Meta Description Tag
                            </label>
                            <span className={`text-[10px] font-bold font-mono ${
                                metaDescLen >= 140 && metaDescLen <= 160 
                                    ? 'text-emerald-700' 
                                    : 'text-amber-600'
                            }`}>
                                {metaDescLen} / 155 chars (Recommended: 140-160)
                            </span>
                        </div>
                        <textarea
                            rows={3}
                            placeholder="Precision B2B sportswear and activewear manufacturer offering OEM/ODM production, technical fabrics, low MOQs, and worldwide delivery."
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>

                    {/* Target Keyword */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            Primary Target Keyword
                        </label>
                        <input
                            type="text"
                            placeholder="custom sportswear manufacturer"
                            value={targetKeyword}
                            onChange={(e) => setTargetKeyword(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>

                    {/* Secondary Keywords */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            Secondary Keywords (comma-separated)
                        </label>
                        <input
                            type="text"
                            placeholder="oem activewear, gym wear wholesale, private label fitness"
                            value={secondaryKeywords}
                            onChange={(e) => setSecondaryKeywords(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>

                    {/* Canonical URL & NoIndex */}
                    <div className="space-y-1.5 sm:col-span-2 pt-2 border-t border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="w-full sm:w-2/3">
                            <label className="text-xs font-bold text-neutral-800 font-[middle]">
                                Custom Canonical URL (Optional)
                            </label>
                            <input
                                type="text"
                                placeholder={`https://slotssportswear.vercel.app/solutions/${slug || 'your-slug'}`}
                                value={canonicalUrl}
                                onChange={(e) => setCanonicalUrl(e.target.value)}
                                className="w-full mt-1 px-3.5 py-2 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-mono"
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-4 sm:pt-0">
                            <input
                                type="checkbox"
                                id="noIndexCheck"
                                checked={noIndex}
                                onChange={(e) => setNoIndex(e.target.checked)}
                                className="rounded border-black/20 text-black focus:ring-black"
                            />
                            <label htmlFor="noIndexCheck" className="text-xs font-bold text-neutral-700 font-[middle] cursor-pointer">
                                Force NoIndex (Robots Block)
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Hero & Intro Content */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-6">
                <div className="border-b border-black/10 pb-4">
                    <h2 className="text-lg font-[main] uppercase tracking-tight text-[#111111]">
                        2. Hero Value Proposition & Manufacturing Overview
                    </h2>
                    <p className="text-xs text-neutral-500 font-[middle] mt-0.5">
                        Define high-impact B2B badges, factory introductory copy, and key verification statistics.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            Hero Badge Text
                        </label>
                        <input
                            type="text"
                            value={heroBadge}
                            onChange={(e) => setHeroBadge(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            Hero Subtitle / Description
                        </label>
                        <textarea
                            rows={3}
                            value={heroDescription}
                            onChange={(e) => setHeroDescription(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>

                    {/* Manufacturing Stats */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-neutral-800 font-[middle]">
                                Manufacturing Performance Stats (Hero Metrics)
                            </label>
                            <button
                                type="button"
                                onClick={addStat}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-black hover:underline font-[middle]"
                            >
                                <MdAdd className="text-sm" /> Add Stat
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-3 rounded-xl border border-black/10 bg-white">
                                    <input
                                        type="text"
                                        placeholder="Value (e.g. 30 PCS)"
                                        value={stat.value}
                                        onChange={(e) => {
                                            const updated = [...stats];
                                            updated[idx].value = e.target.value;
                                            setStats(updated);
                                        }}
                                        className="w-1/3 px-2 py-1.5 rounded-lg border border-black/10 text-xs font-bold text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Label (e.g. Minimum Order Qty)"
                                        value={stat.label}
                                        onChange={(e) => {
                                            const updated = [...stats];
                                            updated[idx].label = e.target.value;
                                            setStats(updated);
                                        }}
                                        className="w-2/3 px-2 py-1.5 rounded-lg border border-black/10 text-xs text-neutral-700 focus:outline-none focus:border-black font-[middle]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeStat(idx)}
                                        className="p-1.5 text-neutral-400 hover:text-red-600 transition"
                                        title="Remove stat"
                                    >
                                        <MdDeleteOutline className="text-lg" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Intro Heading & Paragraphs */}
                    <div className="space-y-3 pt-4 border-t border-black/5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-neutral-800 font-[middle]">
                                Intro Section Heading
                            </label>
                            <input
                                type="text"
                                value={introHeading}
                                onChange={(e) => setIntroHeading(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-neutral-800 font-[middle]">
                                    Introductory Paragraphs (E-E-A-T Manufacturing Content)
                                </label>
                                <button
                                    type="button"
                                    onClick={addIntroParagraph}
                                    className="inline-flex items-center gap-1 text-[11px] font-bold text-black hover:underline font-[middle]"
                                >
                                    <MdAdd className="text-sm" /> Add Paragraph
                                </button>
                            </div>

                            {introText.map((p, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                    <textarea
                                        rows={2}
                                        placeholder={`Paragraph ${idx + 1}...`}
                                        value={p}
                                        onChange={(e) => {
                                            const updated = [...introText];
                                            updated[idx] = e.target.value;
                                            setIntroText(updated);
                                        }}
                                        className="w-full px-3.5 py-2 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                                    />
                                    {introText.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeIntroParagraph(idx)}
                                            className="p-2 text-neutral-400 hover:text-red-600 transition"
                                        >
                                            <MdDeleteOutline className="text-lg" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Fabrics & Technical Specifications */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-6">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <div>
                        <h2 className="text-lg font-[main] uppercase tracking-tight text-[#111111]">
                            3. Fabric Engineering & Technical Specifications
                        </h2>
                        <p className="text-xs text-neutral-500 font-[middle] mt-0.5">
                            Showcase available textile compositions, GSM weights, and ideal sportswear use cases.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={addFabric}
                        className="px-3 py-1.5 rounded-xl border border-black/15 bg-white hover:bg-neutral-100 text-xs font-bold font-[middle] flex items-center gap-1"
                    >
                        <MdAdd className="text-sm" /> Add Fabric
                    </button>
                </div>

                <div className="space-y-4">
                    {fabrics.length === 0 ? (
                        <p className="text-xs text-neutral-400 font-[middle] italic py-2">
                            No fabric specifications added yet. Click "Add Fabric" to define textile compositions.
                        </p>
                    ) : (
                        fabrics.map((fabric, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-black/10 bg-white/70 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold font-[main] uppercase text-neutral-700">
                                        Fabric #{idx + 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeFabric(idx)}
                                        className="text-neutral-400 hover:text-red-600 transition"
                                    >
                                        <MdDeleteOutline className="text-lg" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Fabric Name (e.g. Pro-Dry Interlock)"
                                        value={fabric.name}
                                        onChange={(e) => {
                                            const updated = [...fabrics];
                                            updated[idx].name = e.target.value;
                                            setFabrics(updated);
                                        }}
                                        className="px-3 py-1.5 rounded-lg border border-black/10 text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Weight (e.g. 180-220 GSM)"
                                        value={fabric.weight}
                                        onChange={(e) => {
                                            const updated = [...fabrics];
                                            updated[idx].weight = e.target.value;
                                            setFabrics(updated);
                                        }}
                                        className="px-3 py-1.5 rounded-lg border border-black/10 text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Composition (e.g. 88% Poly / 12% Spandex)"
                                        value={fabric.composition}
                                        onChange={(e) => {
                                            const updated = [...fabrics];
                                            updated[idx].composition = e.target.value;
                                            setFabrics(updated);
                                        }}
                                        className="px-3 py-1.5 rounded-lg border border-black/10 text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Best For (e.g. Compression, Moisture Wicking)"
                                        value={fabric.bestFor}
                                        onChange={(e) => {
                                            const updated = [...fabrics];
                                            updated[idx].bestFor = e.target.value;
                                            setFabrics(updated);
                                        }}
                                        className="px-3 py-1.5 rounded-lg border border-black/10 text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* 4. Internal Linking Engine (Cross-Linking to Knowledge Guides) */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-6">
                <div className="border-b border-black/10 pb-4">
                    <h2 className="text-lg font-[main] uppercase tracking-tight text-[#111111]">
                        4. Bidirectional Internal Linking Engine
                    </h2>
                    <p className="text-xs text-neutral-500 font-[middle] mt-0.5">
                        Link this commercial solution page to authoritative Technical Knowledge Hub articles to build semantic topical clusters.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {availableKnowledge.map((guide) => {
                            const isSelected = relatedKnowledgeGuides.some(g => g.slug === guide.slug);
                            return (
                                <div
                                    key={guide.slug}
                                    onClick={() => toggleKnowledgeLink(guide)}
                                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                                        isSelected 
                                            ? 'border-black bg-neutral-50' 
                                            : 'border-black/10 bg-white hover:border-black/30'
                                    }`}
                                >
                                    <div className="space-y-1">
                                        <div className="text-xs font-bold font-[main] uppercase text-[#111111]">
                                            {guide.title}
                                        </div>
                                        <div className="text-[10px] text-neutral-500 font-[middle]">
                                            Category: {guide.category || 'Manufacturing'} · {guide.readTime || '8 min read'}
                                        </div>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => {}} // handled by parent div onClick
                                        className="mt-1 rounded border-black/20 text-black focus:ring-black"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 5. FAQs & Schema Generation */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-6">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <div>
                        <h2 className="text-lg font-[main] uppercase tracking-tight text-[#111111]">
                            5. B2B FAQ Accordion & FAQPage Schema
                        </h2>
                        <p className="text-xs text-neutral-500 font-[middle] mt-0.5">
                            Answer high-priority buyer questions (MOQs, lead times, tech packs) to rank for rich Google snippets.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={addFaq}
                        className="px-3 py-1.5 rounded-xl border border-black/15 bg-white hover:bg-neutral-100 text-xs font-bold font-[middle] flex items-center gap-1"
                    >
                        <MdAdd className="text-sm" /> Add FAQ
                    </button>
                </div>

                <div className="space-y-4">
                    {faqs.length === 0 ? (
                        <p className="text-xs text-neutral-400 font-[middle] italic py-2">
                            No FAQs added. FAQs are strongly recommended to capture question-based SERP features.
                        </p>
                    ) : (
                        faqs.map((faq, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-black/10 bg-white/70 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold font-[main] uppercase text-neutral-700">
                                        Question #{idx + 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeFaq(idx)}
                                        className="text-neutral-400 hover:text-red-600 transition"
                                    >
                                        <MdDeleteOutline className="text-lg" />
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    placeholder="e.g. What is your minimum order quantity for custom activewear?"
                                    value={faq.question}
                                    onChange={(e) => {
                                        const updated = [...faqs];
                                        updated[idx].question = e.target.value;
                                        setFaqs(updated);
                                    }}
                                    className="w-full px-3 py-2 rounded-lg border border-black/10 text-xs font-bold text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                                />
                                <textarea
                                    rows={2}
                                    placeholder="Our standard wholesale MOQ starts at 30 units per colorway..."
                                    value={faq.answer}
                                    onChange={(e) => {
                                        const updated = [...faqs];
                                        updated[idx].answer = e.target.value;
                                        setFaqs(updated);
                                    }}
                                    className="w-full px-3 py-2 rounded-lg border border-black/10 text-xs text-neutral-800 focus:outline-none focus:border-black font-[middle]"
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Bottom Floating Submit */}
            <div className="flex items-center justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={() => router.push('/admin/seo/solutions')}
                    className="px-5 py-2.5 rounded-xl border border-black/15 bg-white text-neutral-700 hover:bg-neutral-50 text-xs font-bold font-[middle]"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-[#111111] text-white hover:bg-black transition text-xs font-bold uppercase tracking-wider font-[middle] shadow-sm disabled:opacity-50"
                >
                    {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Publish Solution Page'}
                </button>
            </div>
        </form>
    );
}
