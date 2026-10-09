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
    MdDeleteOutline 
} from 'react-icons/md';

interface KnowledgeFormProps {
    initialData?: any;
    isEdit?: boolean;
    articleId?: string;
}

export default function KnowledgeForm({ initialData, isEdit = false, articleId }: KnowledgeFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [availableSolutions, setAvailableSolutions] = useState<any[]>([]);

    // Basic SEO
    const [title, setTitle] = useState(initialData?.title || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || '');
    const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || '');
    const [category, setCategory] = useState(initialData?.category || 'Fabric Engineering');
    const [readTime, setReadTime] = useState(initialData?.readTime || '8 min read');
    const [publishDate, setPublishDate] = useState(initialData?.publishDate || new Date().toISOString().split('T')[0]);
    const [targetKeyword, setTargetKeyword] = useState(initialData?.targetKeyword || '');
    const [status, setStatus] = useState<'Published' | 'Draft'>(initialData?.status || (initialData?.published === false ? 'Draft' : 'Published'));
    const [noIndex, setNoIndex] = useState(Boolean(initialData?.noIndex));
    const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl || '');

    // Author
    const [authorName, setAuthorName] = useState(initialData?.author?.name || 'Slots Sports Wear Engineering Team');
    const [authorRole, setAuthorRole] = useState(initialData?.author?.role || 'Technical Apparel Specialists');

    // Overview & Summary
    const [heroBadge, setHeroBadge] = useState(initialData?.heroBadge || 'Technical Manufacturing Guide');
    const [heroSummary, setHeroSummary] = useState(initialData?.heroSummary || '');
    const [introText, setIntroText] = useState<string[]>(
        initialData?.introText && initialData.introText.length > 0 ? initialData.introText : ['']
    );

    // Sections
    const [sections, setSections] = useState<Array<{ id: string; heading: string; content: string[]; keyTakeaways: string[] }>>(
        initialData?.sections && initialData.sections.length > 0
            ? initialData.sections
            : [{ id: 'sec-1', heading: 'Technical Foundation & Principles', content: [''], keyTakeaways: [''] }]
    );

    // Technical Specification Matrix
    const [matrixTitle, setMatrixTitle] = useState(initialData?.technicalSpecs?.title || 'Technical Garment Quality & Tolerance Matrix');
    const [matrixSubtitle, setMatrixSubtitle] = useState(initialData?.technicalSpecs?.subtitle || 'Standardized factory parameters and testing protocols.');
    const [matrixHeaders, setMatrixHeaders] = useState<string[]>(
        initialData?.technicalSpecs?.headers && initialData.technicalSpecs.headers.length > 0
            ? initialData.technicalSpecs.headers
            : ['Specification Metric', 'Factory Standard', 'Testing Protocol', 'Buyer Impact']
    );
    const [matrixRows, setMatrixRows] = useState<string[][]>(
        initialData?.technicalSpecs?.rows && initialData.technicalSpecs.rows.length > 0
            ? initialData.technicalSpecs.rows
            : [
                ['Tensile Seam Strength', '>= 180 N', 'ASTM D5034', 'Prevents seam blowouts under high stretch'],
                ['Colorfastness to Washing', 'Grade 4.5+ (ISO 105-C06)', 'AATCC 61', 'Zero color bleed across contrasted panels'],
            ]
    );

    // Buyer Considerations
    const [buyerConsiderations, setBuyerConsiderations] = useState<Array<{ title: string; description: string; advice: string }>>(
        initialData?.buyerConsiderations && initialData.buyerConsiderations.length > 0
            ? initialData.buyerConsiderations
            : [
                {
                    title: 'Moisture Vapor Transmission Rate (MVTR)',
                    description: 'Athletic wear requires breathable microfiber structures.',
                    advice: 'Request certified lab test reports showing MVTR > 8,000 g/m²/24h for premium marathon gear.',
                },
            ]
    );

    // FAQs
    const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>(
        initialData?.faqs && initialData.faqs.length > 0 ? initialData.faqs : []
    );

    // Cross-linking to commercial solutions
    const [relatedSolutions, setRelatedSolutions] = useState<Array<{ slug: string; title: string; category: string }>>(
        initialData?.relatedSolutions || []
    );

    // Auto-generate slug & meta title
    useEffect(() => {
        if (!isEdit && title) {
            const autoSlug = slugify(title, { lower: true, strict: true });
            setSlug(autoSlug);
            if (!metaTitle) {
                setMetaTitle(`${title} | Slots Sports Wear Guide`);
            }
        }
    }, [title, isEdit]);

    // Load available solutions for cross linking
    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                const res = await axios.get('/api/admin/seo/solutions?status=all');
                if (res.data.success) {
                    setAvailableSolutions(res.data.data);
                }
            } catch (err) {
                console.error("Failed to load solutions for cross-linking:", err);
            }
        };
        fetchSolutions();
    }, []);

    // Section handlers
    const addSection = () => {
        setSections([
            ...sections,
            {
                id: `sec-${sections.length + 1}`,
                heading: '',
                content: [''],
                keyTakeaways: [''],
            },
        ]);
    };

    const removeSection = (idx: number) => {
        setSections(sections.filter((_, i) => i !== idx));
    };

    // Matrix handlers
    const addMatrixRow = () => {
        setMatrixRows([...matrixRows, new Array(matrixHeaders.length).fill('')]);
    };

    const removeMatrixRow = (idx: number) => {
        setMatrixRows(matrixRows.filter((_, i) => i !== idx));
    };

    // Consideration handlers
    const addConsideration = () => {
        setBuyerConsiderations([...buyerConsiderations, { title: '', description: '', advice: '' }]);
    };
    const removeConsideration = (idx: number) => {
        setBuyerConsiderations(buyerConsiderations.filter((_, i) => i !== idx));
    };

    // FAQ handlers
    const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);
    const removeFaq = (idx: number) => setFaqs(faqs.filter((_, i) => i !== idx));

    const toggleSolutionLink = (sol: any) => {
        const exists = relatedSolutions.some(s => s.slug === sol.slug);
        if (exists) {
            setRelatedSolutions(relatedSolutions.filter(s => s.slug !== sol.slug));
        } else {
            setRelatedSolutions([
                ...relatedSolutions,
                {
                    slug: sol.slug,
                    title: sol.title,
                    category: sol.targetCategory || 'Manufacturing Solution',
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

        const payload = {
            title: title.trim(),
            slug: slug.trim(),
            metaTitle: metaTitle.trim() || title.trim(),
            metaDescription: metaDescription.trim() || heroSummary.trim(),
            category,
            readTime,
            publishDate,
            author: { name: authorName.trim(), role: authorRole.trim() },
            heroBadge: heroBadge.trim(),
            heroSummary: heroSummary.trim(),
            introText: introText.filter(t => t.trim().length > 0),
            sections: sections.filter(s => s.heading.trim().length > 0),
            technicalSpecs: {
                title: matrixTitle.trim(),
                subtitle: matrixSubtitle.trim(),
                headers: matrixHeaders,
                rows: matrixRows.filter(r => r.some(c => c.trim().length > 0)),
            },
            buyerConsiderations: buyerConsiderations.filter(c => c.title.trim().length > 0),
            faqs: faqs.filter(f => f.question.trim() && f.answer.trim()),
            relatedSolutions,
            targetKeyword: targetKeyword.trim() || title.trim(),
            searchIntent: 'Informational / Technical Garment Specification',
            status,
            published: status === 'Published',
            noIndex,
            canonicalUrl: canonicalUrl.trim(),
        };

        try {
            setLoading(true);
            if (isEdit && articleId) {
                const res = await axios.put(`/api/admin/seo/knowledge/${articleId}`, payload);
                if (res.data.success) {
                    toast.success("Knowledge guide updated successfully");
                    router.push('/admin/seo/knowledge');
                }
            } else {
                const res = await axios.post('/api/admin/seo/knowledge', payload);
                if (res.data.success) {
                    toast.success("Knowledge guide created successfully");
                    router.push('/admin/seo/knowledge');
                }
            }
        } catch (err: any) {
            console.error("Failed to save knowledge article:", err);
            toast.error(err.response?.data?.message || "Failed to save guide");
        } finally {
            setLoading(false);
        }
    };

    const metaTitleLen = metaTitle.length;
    const metaDescLen = metaDescription.length;

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-16">
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-black/10 shadow-2xs sticky top-4 z-20">
                <button
                    type="button"
                    onClick={() => router.push('/admin/seo/knowledge')}
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
                        <span>{loading ? 'Saving...' : isEdit ? 'Update Guide' : 'Publish Guide'}</span>
                    </button>
                </div>
            </div>

            {/* 1. SEO & Topic Authority */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-6">
                <div className="border-b border-black/10 pb-4">
                    <h2 className="text-lg font-[main] uppercase tracking-tight text-[#111111]">
                        1. Guide Metadata & E-E-A-T Authority
                    </h2>
                    <p className="text-xs text-neutral-500 font-[middle] mt-0.5">
                        Define high-authority technical garment titles, meta descriptions, and editorial credentials.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            Guide Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. GSM Fabric Weight Guide for Custom Sportswear"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            URL Slug (/knowledge/...) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="gsm-fabric-weight-guide"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs font-mono text-neutral-900 focus:outline-none focus:border-black"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs font-[middle] text-neutral-900 focus:outline-none focus:border-black"
                        >
                            <option value="Fabric Engineering">Fabric Engineering</option>
                            <option value="Manufacturing Quality">Manufacturing Quality</option>
                            <option value="Printing & Decoration">Printing & Decoration</option>
                            <option value="Production Planning">Production Planning</option>
                            <option value="Fit & Pattern Making">Fit & Pattern Making</option>
                            <option value="Compliance & Testing">Compliance & Testing</option>
                        </select>
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-neutral-800 font-[middle]">
                                Meta Title Tag (&lt;title&gt;)
                            </label>
                            <span className={`text-[10px] font-bold font-mono ${
                                metaTitleLen >= 50 && metaTitleLen <= 65 ? 'text-emerald-700' : 'text-amber-600'
                            }`}>
                                {metaTitleLen} / 60 chars
                            </span>
                        </div>
                        <input
                            type="text"
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-neutral-800 font-[middle]">
                                Meta Description Tag
                            </label>
                            <span className={`text-[10px] font-bold font-mono ${
                                metaDescLen >= 140 && metaDescLen <= 160 ? 'text-emerald-700' : 'text-amber-600'
                            }`}>
                                {metaDescLen} / 155 chars
                            </span>
                        </div>
                        <textarea
                            rows={3}
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            Estimated Read Time
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. 8 min read"
                            value={readTime}
                            onChange={(e) => setReadTime(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            Publish Date
                        </label>
                        <input
                            type="date"
                            value={publishDate}
                            onChange={(e) => setPublishDate(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>

                    {/* Author Info */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            Author / Engineering Team
                        </label>
                        <input
                            type="text"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            Author Credential / Role
                        </label>
                        <input
                            type="text"
                            value={authorRole}
                            onChange={(e) => setAuthorRole(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>
                </div>
            </div>

            {/* 2. Executive Summary & Overview */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-6">
                <div className="border-b border-black/10 pb-4">
                    <h2 className="text-lg font-[main] uppercase tracking-tight text-[#111111]">
                        2. Guide Summary & Introduction
                    </h2>
                </div>

                <div className="space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-800 font-[middle]">
                            Hero Badge
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
                            Hero Executive Summary <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={3}
                            required
                            placeholder="A comprehensive engineering overview of fabric GSM weights..."
                            value={heroSummary}
                            onChange={(e) => setHeroSummary(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>
                </div>
            </div>

            {/* 3. Deep-Dive Sections */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-6">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <div>
                        <h2 className="text-lg font-[main] uppercase tracking-tight text-[#111111]">
                            3. In-Depth Technical Sections
                        </h2>
                        <p className="text-xs text-neutral-500 font-[middle] mt-0.5">
                            Add structured headings, body paragraphs, and key takeaway bullet callouts.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={addSection}
                        className="px-3 py-1.5 rounded-xl border border-black/15 bg-white hover:bg-neutral-100 text-xs font-bold font-[middle] flex items-center gap-1"
                    >
                        <MdAdd className="text-sm" /> Add Section
                    </button>
                </div>

                <div className="space-y-6">
                    {sections.map((sec, idx) => (
                        <div key={idx} className="p-5 rounded-xl border border-black/10 bg-white/70 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold font-[main] uppercase text-neutral-700">
                                    Section #{idx + 1}
                                </span>
                                {sections.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeSection(idx)}
                                        className="text-neutral-400 hover:text-red-600 transition"
                                    >
                                        <MdDeleteOutline className="text-lg" />
                                    </button>
                                )}
                            </div>

                            <input
                                type="text"
                                placeholder="Section Heading (e.g. Understanding Grams Per Square Meter)"
                                value={sec.heading}
                                onChange={(e) => {
                                    const updated = [...sections];
                                    updated[idx].heading = e.target.value;
                                    setSections(updated);
                                }}
                                className="w-full px-3.5 py-2 rounded-lg border border-black/10 text-xs font-bold text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                            />

                            <textarea
                                rows={4}
                                placeholder="Body text paragraph for this section..."
                                value={sec.content?.[0] || ''}
                                onChange={(e) => {
                                    const updated = [...sections];
                                    updated[idx].content = [e.target.value];
                                    setSections(updated);
                                }}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-xs text-neutral-800 focus:outline-none focus:border-black font-[middle]"
                            />

                            <div>
                                <label className="text-[11px] font-bold text-neutral-600 font-[middle]">
                                    Key Takeaway Bullets (comma or newline separated):
                                </label>
                                <textarea
                                    rows={2}
                                    placeholder="Key bullet 1, Key bullet 2"
                                    value={Array.isArray(sec.keyTakeaways) ? sec.keyTakeaways.join('\n') : ''}
                                    onChange={(e) => {
                                        const updated = [...sections];
                                        updated[idx].keyTakeaways = e.target.value.split('\n').filter(Boolean);
                                        setSections(updated);
                                    }}
                                    className="w-full mt-1 px-3 py-2 rounded-lg border border-black/10 text-xs text-neutral-800 focus:outline-none focus:border-black font-[middle]"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Technical Specification Matrix */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-6">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <div>
                        <h2 className="text-lg font-[main] uppercase tracking-tight text-[#111111]">
                            4. Technical Specification Matrix
                        </h2>
                        <p className="text-xs text-neutral-500 font-[middle] mt-0.5">
                            Structured tabular dataset of testing methods, GSM ranges, and tolerances.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={addMatrixRow}
                        className="px-3 py-1.5 rounded-xl border border-black/15 bg-white hover:bg-neutral-100 text-xs font-bold font-[middle] flex items-center gap-1"
                    >
                        <MdAdd className="text-sm" /> Add Row
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Matrix Title"
                            value={matrixTitle}
                            onChange={(e) => setMatrixTitle(e.target.value)}
                            className="px-3.5 py-2 rounded-lg border border-black/10 text-xs font-bold text-neutral-900 focus:outline-none focus:border-black font-[middle]"
                        />
                        <input
                            type="text"
                            placeholder="Matrix Subtitle"
                            value={matrixSubtitle}
                            onChange={(e) => setMatrixSubtitle(e.target.value)}
                            className="px-3.5 py-2 rounded-lg border border-black/10 text-xs text-neutral-700 focus:outline-none focus:border-black font-[middle]"
                        />
                    </div>

                    <div className="space-y-3">
                        {matrixRows.map((row, rIdx) => (
                            <div key={rIdx} className="flex items-center gap-2 p-3 rounded-xl border border-black/10 bg-white">
                                {matrixHeaders.map((header, cIdx) => (
                                    <input
                                        key={cIdx}
                                        type="text"
                                        placeholder={header}
                                        value={row[cIdx] || ''}
                                        onChange={(e) => {
                                            const updated = [...matrixRows];
                                            const updatedRow = [...(updated[rIdx] || [])];
                                            updatedRow[cIdx] = e.target.value;
                                            updated[rIdx] = updatedRow;
                                            setMatrixRows(updated);
                                        }}
                                        className="w-1/4 px-2 py-1.5 rounded-lg border border-black/10 text-xs text-neutral-800 focus:outline-none focus:border-black font-[middle]"
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={() => removeMatrixRow(rIdx)}
                                    className="p-1.5 text-neutral-400 hover:text-red-600 transition"
                                >
                                    <MdDeleteOutline className="text-lg" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. Cross-Linking to OEM Solutions */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-6">
                <div className="border-b border-black/10 pb-4">
                    <h2 className="text-lg font-[main] uppercase tracking-tight text-[#111111]">
                        5. Commercial OEM / ODM Internal Links
                    </h2>
                    <p className="text-xs text-neutral-500 font-[middle] mt-0.5">
                        Convert readers by linking this educational guide to specific commercial manufacturing lines.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {availableSolutions.map((sol) => {
                        const isSelected = relatedSolutions.some(s => s.slug === sol.slug);
                        return (
                            <div
                                key={sol.slug}
                                onClick={() => toggleSolutionLink(sol)}
                                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                                    isSelected ? 'border-black bg-neutral-50' : 'border-black/10 bg-white hover:border-black/30'
                                }`}
                            >
                                <div className="space-y-1">
                                    <div className="text-xs font-bold font-[main] uppercase text-[#111111]">
                                        {sol.title}
                                    </div>
                                    <div className="text-[10px] text-neutral-500 font-mono">
                                        /solutions/{sol.slug}
                                    </div>
                                </div>

                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => {}}
                                    className="mt-1 rounded border-black/20 text-black focus:ring-black"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 6. Technical FAQs */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-6">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <div>
                        <h2 className="text-lg font-[main] uppercase tracking-tight text-[#111111]">
                            6. Technical FAQs
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={addFaq}
                        className="px-3 py-1.5 rounded-xl border border-black/15 bg-white hover:bg-neutral-100 text-xs font-bold font-[middle] flex items-center gap-1"
                    >
                        <MdAdd className="text-sm" /> Add FAQ
                    </button>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, idx) => (
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
                                placeholder="Question..."
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
                                placeholder="Answer..."
                                value={faq.answer}
                                onChange={(e) => {
                                    const updated = [...faqs];
                                    updated[idx].answer = e.target.value;
                                    setFaqs(updated);
                                }}
                                className="w-full px-3 py-2 rounded-lg border border-black/10 text-xs text-neutral-800 focus:outline-none focus:border-black font-[middle]"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={() => router.push('/admin/seo/knowledge')}
                    className="px-5 py-2.5 rounded-xl border border-black/15 bg-white text-neutral-700 hover:bg-neutral-50 text-xs font-bold font-[middle]"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-[#111111] text-white hover:bg-black transition text-xs font-bold uppercase tracking-wider font-[middle] shadow-sm disabled:opacity-50"
                >
                    {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Publish Technical Guide'}
                </button>
            </div>
        </form>
    );
}
