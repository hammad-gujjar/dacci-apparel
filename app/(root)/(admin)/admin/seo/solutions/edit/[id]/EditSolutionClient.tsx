'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import BreadCrumb from '../../../../components/BreadCrumb';
import SolutionForm from '../../components/SolutionForm';

interface EditSolutionClientProps {
    id: string;
}

export default function EditSolutionClient({ id }: EditSolutionClientProps) {
    const [solution, setSolution] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const breadcrumbData = [
        { label: "Home", href: "/admin/dashboard" },
        { label: "SEO & Content CMS", href: "/admin/seo" },
        { label: "Solutions", href: "/admin/seo/solutions" },
        { label: "Edit Solution", href: "" },
    ];

    useEffect(() => {
        const fetchSolution = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/admin/seo/solutions/${id}`);
                if (res.data.success) {
                    setSolution(res.data.data);
                }
            } catch (err: any) {
                console.error("Failed to load solution:", err);
                toast.error("Failed to load solution data");
            } finally {
                setLoading(false);
            }
        };
        fetchSolution();
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto p-12 text-center text-neutral-400 font-[middle] text-sm">
                Loading solution details...
            </div>
        );
    }

    if (!solution) {
        return (
            <div className="max-w-5xl mx-auto p-12 text-center text-red-500 font-[middle] text-sm">
                Solution page not found or failed to load.
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
                            Edit Solution: {solution.title}
                        </h1>
                        <p className="text-xs sm:text-sm text-neutral-600 font-[middle] mt-1">
                            Modify content, specs, target keywords, or cross-link to technical knowledge articles.
                        </p>
                    </div>
                    {solution.isStaticFallback && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            Static Fallback (Saving will promote to live MongoDB record)
                        </span>
                    )}
                </div>
            </div>

            <SolutionForm 
                initialData={solution} 
                isEdit={true} 
                solutionId={solution._id || id} 
            />
        </div>
    );
}
