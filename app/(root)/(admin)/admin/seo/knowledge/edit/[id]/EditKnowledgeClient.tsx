'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import BreadCrumb from '../../../../components/BreadCrumb';
import KnowledgeForm from '../../components/KnowledgeForm';

interface EditKnowledgeClientProps {
    id: string;
}

export default function EditKnowledgeClient({ id }: EditKnowledgeClientProps) {
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const breadcrumbData = [
        { label: "Home", href: "/admin/dashboard" },
        { label: "SEO & Content CMS", href: "/admin/seo" },
        { label: "Knowledge Hub", href: "/admin/seo/knowledge" },
        { label: "Edit Guide", href: "" },
    ];

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/admin/seo/knowledge/${id}`);
                if (res.data.success) {
                    setArticle(res.data.data);
                }
            } catch (err: any) {
                console.error("Failed to load article:", err);
                toast.error("Failed to load technical guide data");
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto p-12 text-center text-neutral-400 font-[middle] text-sm">
                Loading guide details...
            </div>
        );
    }

    if (!article) {
        return (
            <div className="max-w-5xl mx-auto p-12 text-center text-red-500 font-[middle] text-sm">
                Knowledge guide not found or failed to load.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="max-w-5xl mx-auto">
                <BreadCrumb breadcrumbData={breadcrumbData} />
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-[main] uppercase tracking-tight text-[#111111]">
                            Edit Guide: {article.title}
                        </h1>
                        <p className="text-xs sm:text-sm text-neutral-600 font-[middle] mt-1">
                            Update technical specifications, testing protocols, or commercial cross-links.
                        </p>
                    </div>
                    {article.isStaticFallback && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            Static Fallback (Saving will promote to live MongoDB record)
                        </span>
                    )}
                </div>
            </div>

            <KnowledgeForm 
                initialData={article} 
                isEdit={true} 
                articleId={article._id || id} 
            />
        </div>
    );
}
