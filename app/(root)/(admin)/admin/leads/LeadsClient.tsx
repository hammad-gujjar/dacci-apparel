'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
} from 'recharts';
import {
    IoSearchOutline,
    IoFilterOutline,
    IoDocumentAttachOutline,
    IoTimeOutline,
    IoBusinessOutline,
    IoMailOutline,
    IoGlobeOutline,
    IoPersonOutline,
    IoCheckmarkCircleOutline,
    IoAlertCircleOutline,
    IoArrowForwardOutline,
    IoChatbubbleEllipsesOutline,
    IoStatsChartOutline,
    IoListOutline,
    IoAddOutline,
    IoCloseOutline,
    IoRefreshOutline,
    IoSendOutline,
} from 'react-icons/io5';

type LeadStatus = 'New' | 'Contacted' | 'Sample Requested' | 'Production' | 'Completed' | 'Rejected';

interface Lead {
    _id: string;
    name: string;
    email: string;
    company?: string;
    country?: string;
    website?: string;
    phone?: string;
    productType: string;
    productSlug?: string;
    quantity: number;
    estimatedQuantity?: string;
    deadline?: string;
    customizationOptions?: string[];
    customizationDetails?: string;
    items?: any[];
    files?: Array<{
        fileName: string;
        fileUrl: string;
        fileType?: string;
        fileSize?: number;
    }>;
    status: LeadStatus;
    priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
    leadSource?: string;
    estimatedValue?: number;
    notes?: Array<{
        note: string;
        author: string;
        createdAt: string;
    }>;
    activities?: Array<{
        _id: string;
        type: string;
        title: string;
        description: string;
        performedBy: string;
        createdAt: string;
    }>;
    createdAt: string;
}

interface AnalyticsData {
    summary: {
        totalInquiries: number;
        activePipeline: number;
        completed: number;
        sampleRequested: number;
        conversionRate: string;
        totalEstimatedValue: number;
        totalUnitsRequested: number;
    };
    monthlyRFQs: Array<{ name: string; rfqs: number; units: number }>;
    countries: Array<{ country: string; count: number; units: number }>;
    popularProducts: Array<{ product: string; count: number; units: number }>;
    leadSources: Array<{ source: string; count: number }>;
    funnel: Array<{ stage: string; count: number; color: string }>;
}

const STATUS_CONFIG: Record<LeadStatus, { label: string; bg: string; text: string; dot: string }> = {
    'New': { label: 'New', bg: 'bg-purple-100 dark:bg-purple-950/60', text: 'text-purple-800 dark:text-purple-300', dot: 'bg-purple-500' },
    'Contacted': { label: 'Contacted', bg: 'bg-blue-100 dark:bg-blue-950/60', text: 'text-blue-800 dark:text-blue-300', dot: 'bg-blue-500' },
    'Sample Requested': { label: 'Sample Requested', bg: 'bg-amber-100 dark:bg-amber-950/60', text: 'text-amber-800 dark:text-amber-300', dot: 'bg-amber-500' },
    'Production': { label: 'Production', bg: 'bg-emerald-100 dark:bg-emerald-950/60', text: 'text-emerald-800 dark:text-emerald-300', dot: 'bg-emerald-500' },
    'Completed': { label: 'Completed', bg: 'bg-green-100 dark:bg-green-950/60', text: 'text-green-800 dark:text-green-300', dot: 'bg-green-600' },
    'Rejected': { label: 'Rejected', bg: 'bg-red-100 dark:bg-red-950/60', text: 'text-red-800 dark:text-red-300', dot: 'bg-red-500' },
};

export default function LeadsClient() {
    // Tab & View States
    const [viewMode, setViewMode] = useState<'pipeline' | 'analytics'>('pipeline');
    const [activeStatus, setActiveStatus] = useState<string>('All');
    const [search, setSearch] = useState<string>('');

    // Data States
    const [leads, setLeads] = useState<Lead[]>([]);
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [isLoadingAnalytics, setIsLoadingAnalytics] = useState<boolean>(false);

    // Selected Lead Drawer State
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isLoadingLeadDetails, setIsLoadingLeadDetails] = useState<boolean>(false);

    // Lead Status Transition Form
    const [updatingStatus, setUpdatingStatus] = useState<boolean>(false);
    const [targetStatus, setTargetStatus] = useState<LeadStatus>('New');
    const [notifyBuyer, setNotifyBuyer] = useState<boolean>(true);
    const [statusCustomNote, setStatusCustomNote] = useState<string>('');

    // Note Form
    const [noteInput, setNoteInput] = useState<string>('');
    const [addingNote, setAddingNote] = useState<boolean>(false);

    // Manual New Lead Modal State
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [newLeadForm, setNewLeadForm] = useState({
        name: '',
        email: '',
        company: '',
        country: '',
        productType: 'Custom Sportswear',
        quantity: 100,
        initialNote: '',
    });

    // Fetch leads list
    const fetchLeads = useCallback(async () => {
        setIsLoading(true);
        try {
            const params: Record<string, string> = {};
            if (activeStatus !== 'All') params.status = activeStatus;
            if (search) params.search = search;

            const res = await axios.get('/api/admin/leads', { params });
            if (res.data.success) {
                setLeads(res.data.data);
                setCounts(res.data.counts || {});
            }
        } catch (err: any) {
            console.error('Failed to load CRM leads:', err);
            toast.error('Failed to load leads from database.');
        } finally {
            setIsLoading(false);
        }
    }, [activeStatus, search]);

    // Fetch analytics data
    const fetchAnalytics = useCallback(async () => {
        setIsLoadingAnalytics(true);
        try {
            const res = await axios.get('/api/admin/leads/analytics');
            if (res.data.success) {
                setAnalytics(res.data.data);
            }
        } catch (err: any) {
            console.error('Failed to fetch CRM analytics:', err);
        } finally {
            setIsLoadingAnalytics(false);
        }
    }, []);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    useEffect(() => {
        if (viewMode === 'analytics') {
            fetchAnalytics();
        }
    }, [viewMode, fetchAnalytics]);

    // Open single lead in detail drawer
    const openLead = async (lead: Lead) => {
        setSelectedLead(lead);
        setTargetStatus(lead.status);
        setStatusCustomNote('');
        setNotifyBuyer(true);
        setIsLoadingLeadDetails(true);

        try {
            const res = await axios.get(`/api/admin/leads/${lead._id}`);
            if (res.data.success) {
                setSelectedLead(res.data.data);
                setTargetStatus(res.data.data.status);
            }
        } catch {
            // Keep preview lead
        } finally {
            setIsLoadingLeadDetails(false);
        }
    };

    // Update Status Action
    const handleStatusUpdate = async () => {
        if (!selectedLead) return;
        setUpdatingStatus(true);

        try {
            const res = await axios.put(`/api/admin/leads/${selectedLead._id}/status`, {
                status: targetStatus,
                notifyBuyer,
                customNote: statusCustomNote,
            });

            if (res.data.success) {
                toast.success(`Pipeline status updated to ${targetStatus}`);
                setSelectedLead(prev => prev ? { ...prev, status: targetStatus } : null);
                // Refresh list and counts
                fetchLeads();
                // Refresh detail
                openLead({ ...selectedLead, status: targetStatus });
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to update status');
        } finally {
            setUpdatingStatus(false);
        }
    };

    // Add Internal Note Action
    const handleAddNote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedLead || !noteInput.trim()) return;
        setAddingNote(true);

        try {
            const res = await axios.post(`/api/admin/leads/${selectedLead._id}/notes`, {
                note: noteInput.trim(),
                author: 'Factory Admin',
            });

            if (res.data.success) {
                toast.success('Internal note added');
                setNoteInput('');
                // Refresh lead details
                openLead(selectedLead);
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to add note');
        } finally {
            setAddingNote(false);
        }
    };

    // Create Manual Lead Action
    const handleCreateLead = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/admin/leads', newLeadForm);
            if (res.data.success) {
                toast.success('B2B Lead created successfully');
                setIsCreateOpen(false);
                setNewLeadForm({
                    name: '',
                    email: '',
                    company: '',
                    country: '',
                    productType: 'Custom Sportswear',
                    quantity: 100,
                    initialNote: '',
                });
                fetchLeads();
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to create lead');
        }
    };

    const tabs: Array<{ id: string; label: string; countKey?: string }> = [
        { id: 'All', label: 'All Inquiries', countKey: 'all' },
        { id: 'New', label: 'New / Unreviewed', countKey: 'new' },
        { id: 'Contacted', label: 'Contacted', countKey: 'contacted' },
        { id: 'Sample Requested', label: 'In Sampling', countKey: 'sampleRequested' },
        { id: 'Production', label: 'In Production', countKey: 'production' },
        { id: 'Completed', label: 'Completed', countKey: 'completed' },
        { id: 'Rejected', label: 'Archived', countKey: 'rejected' },
    ];

    return (
        <div className="w-full max-w-[1500px] mx-auto space-y-8">
            {/* Header with View Toggle & Action Buttons */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/10 pb-6">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 font-[middle]">
                        Wholesale Client Relationship Management
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-[main] uppercase tracking-tight text-[#111111]">
                        B2B CRM & Lead Pipeline
                    </h1>
                    <p className="text-xs sm:text-sm font-[middle] text-neutral-600 mt-1">
                        Track incoming Tech Pack RFQs, manage buyer sampling requests, and coordinate factory production milestones.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* View Switcher */}
                    <div className="bg-white/80 border border-black/10 rounded-xl p-1 flex items-center shadow-2xs">
                        <button
                            type="button"
                            onClick={() => setViewMode('pipeline')}
                            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-[middle] font-semibold transition-all cursor-pointer ${
                                viewMode === 'pipeline'
                                    ? 'bg-[#111111] text-[#EDEEE7] shadow-xs'
                                    : 'text-neutral-600 hover:text-black'
                            }`}
                        >
                            <IoListOutline className="text-sm" />
                            <span>Pipeline View</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('analytics')}
                            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-[middle] font-semibold transition-all cursor-pointer ${
                                viewMode === 'analytics'
                                    ? 'bg-[#111111] text-[#EDEEE7] shadow-xs'
                                    : 'text-neutral-600 hover:text-black'
                            }`}
                        >
                            <IoStatsChartOutline className="text-sm" />
                            <span>Analytics & KPIs</span>
                        </button>
                    </div>

                    {/* Refresh */}
                    <button
                        type="button"
                        onClick={() => { fetchLeads(); if (viewMode === 'analytics') fetchAnalytics(); toast.success('Data refreshed'); }}
                        title="Refresh data"
                        className="p-2.5 rounded-xl bg-white/80 border border-black/10 text-neutral-700 hover:bg-black hover:text-white transition-all shadow-2xs cursor-pointer"
                    >
                        <IoRefreshOutline className="text-base" />
                    </button>

                    {/* Manual New Lead Entry */}
                    <button
                        type="button"
                        onClick={() => setIsCreateOpen(true)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111111] text-[#EDEEE7] hover:bg-neutral-800 text-xs font-[main] font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                        <IoAddOutline className="text-base" />
                        <span>Manual Lead</span>
                    </button>
                </div>
            </div>

            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white/80 border border-black/10 rounded-2xl p-5 shadow-2xs space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 font-[middle]">Total RFQs Intake</span>
                    <p className="text-2xl sm:text-3xl font-[main] text-[#111111]">{counts.all ?? 0}</p>
                    <span className="text-[11px] text-neutral-500 font-[middle]">All-time website inquiries</span>
                </div>
                <div className="bg-white/80 border border-black/10 rounded-2xl p-5 shadow-2xs space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-purple-600 font-[middle]">Pending Review</span>
                    <p className="text-2xl sm:text-3xl font-[main] text-purple-700">{counts.new ?? 0}</p>
                    <span className="text-[11px] text-neutral-500 font-[middle]">Awaiting 24h engineering audit</span>
                </div>
                <div className="bg-white/80 border border-black/10 rounded-2xl p-5 shadow-2xs space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 font-[middle]">Sampling Stage</span>
                    <p className="text-2xl sm:text-3xl font-[main] text-amber-700">{counts.sampleRequested ?? 0}</p>
                    <span className="text-[11px] text-neutral-500 font-[middle]">Prototypes in physical fabrication</span>
                </div>
                <div className="bg-white/80 border border-black/10 rounded-2xl p-5 shadow-2xs space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 font-[middle]">In Production</span>
                    <p className="text-2xl sm:text-3xl font-[main] text-emerald-700">{counts.production ?? 0}</p>
                    <span className="text-[11px] text-neutral-500 font-[middle]">Cutting, sewing & sublimation lines</span>
                </div>
                <div className="col-span-2 lg:col-span-1 bg-white/80 border border-black/10 rounded-2xl p-5 shadow-2xs space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-green-700 font-[middle]">Completed Orders</span>
                    <p className="text-2xl sm:text-3xl font-[main] text-green-800">{counts.completed ?? 0}</p>
                    <span className="text-[11px] text-neutral-500 font-[middle]">Passed QA & air cargo dispatched</span>
                </div>
            </div>

            {/* View Mode: PIPELINE TABLE */}
            {viewMode === 'pipeline' && (
                <div className="space-y-6">
                    {/* Pipeline Stage Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {tabs.map((tab) => {
                            const isSelected = activeStatus === tab.id;
                            const count = tab.countKey ? counts[tab.countKey] ?? 0 : null;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveStatus(tab.id)}
                                    className={`px-4 py-2.5 rounded-full text-xs font-[middle] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                                        isSelected
                                            ? 'bg-[#111111] text-[#EDEEE7] shadow-sm'
                                            : 'bg-white/70 hover:bg-white text-neutral-700 border border-black/10'
                                    }`}
                                >
                                    <span>{tab.label}</span>
                                    {count !== null && (
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                            isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-neutral-600'
                                        }`}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search & Quick Filter Controls */}
                    <div className="bg-white/80 border border-black/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full sm:w-96">
                            <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by buyer name, email, company, or product..."
                                className="w-full pl-9 pr-4 py-2 bg-black/[0.03] border border-black/10 rounded-xl text-xs font-[middle] focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-end text-xs text-neutral-500 font-[middle]">
                            <span>Showing {leads.length} leads</span>
                        </div>
                    </div>

                    {/* Leads Table Container */}
                    <div className="bg-white/90 border border-black/10 rounded-2xl overflow-hidden shadow-xs">
                        {isLoading ? (
                            <div className="p-16 text-center space-y-3">
                                <div className="size-8 rounded-full border-2 border-black border-t-transparent animate-spin mx-auto" />
                                <p className="text-xs text-neutral-500 font-[middle]">Loading CRM Pipeline records...</p>
                            </div>
                        ) : leads.length === 0 ? (
                            <div className="p-16 text-center space-y-3">
                                <IoAlertCircleOutline className="text-3xl text-neutral-400 mx-auto" />
                                <p className="font-[main] text-sm uppercase tracking-wider text-neutral-700">No leads found</p>
                                <p className="text-xs text-neutral-500 font-[middle] max-w-sm mx-auto">
                                    No inquiries match your current status filter or search parameters.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[900px]">
                                    <thead>
                                        <tr className="bg-black/5 border-b border-black/10 text-[10px] font-bold uppercase tracking-wider font-[main] text-neutral-600">
                                            <th className="py-3.5 px-4">Stage</th>
                                            <th className="py-3.5 px-4">Buyer / Company</th>
                                            <th className="py-3.5 px-4">Product Directive</th>
                                            <th className="py-3.5 px-4">Volume</th>
                                            <th className="py-3.5 px-4">Country</th>
                                            <th className="py-3.5 px-4">Tech Pack CAD</th>
                                            <th className="py-3.5 px-4">Submitted</th>
                                            <th className="py-3.5 px-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black/5 text-xs font-[middle] text-neutral-800">
                                        {leads.map((lead) => {
                                            const statusCfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG['New'];
                                            const hasFiles = lead.files && lead.files.length > 0;
                                            return (
                                                <tr
                                                    key={lead._id}
                                                    onClick={() => openLead(lead)}
                                                    className="hover:bg-black/[0.02] transition-colors cursor-pointer"
                                                >
                                                    {/* Status Badge */}
                                                    <td className="py-4 px-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusCfg.bg} ${statusCfg.text}`}>
                                                            <span className={`size-1.5 rounded-full ${statusCfg.dot} animate-pulse`} />
                                                            <span>{statusCfg.label}</span>
                                                        </span>
                                                    </td>

                                                    {/* Buyer / Company */}
                                                    <td className="py-4 px-4">
                                                        <div className="font-bold text-[#111111]">{lead.name}</div>
                                                        <div className="text-[11px] text-neutral-500 truncate max-w-[180px]">
                                                            {lead.company || lead.email}
                                                        </div>
                                                    </td>

                                                    {/* Product Scope */}
                                                    <td className="py-4 px-4">
                                                        <div className="font-semibold text-neutral-800 uppercase text-[11px] font-[main] truncate max-w-[180px]">
                                                            {lead.productType}
                                                        </div>
                                                        {lead.items && lead.items.length > 1 && (
                                                            <span className="text-[10px] text-neutral-500">
                                                                +{lead.items.length} styles bundle
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Volume */}
                                                    <td className="py-4 px-4">
                                                        <span className="font-bold text-[#111111] tabular-nums">
                                                            {lead.quantity} pcs
                                                        </span>
                                                    </td>

                                                    {/* Country */}
                                                    <td className="py-4 px-4 text-neutral-600">
                                                        <span className="truncate max-w-[120px] inline-block">
                                                            {lead.country || 'Global'}
                                                        </span>
                                                    </td>

                                                    {/* Attached Files */}
                                                    <td className="py-4 px-4">
                                                        {hasFiles ? (
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                                                <IoDocumentAttachOutline />
                                                                <span>{lead.files?.length} File(s)</span>
                                                            </span>
                                                        ) : (
                                                            <span className="text-neutral-400 text-[11px]">None</span>
                                                        )}
                                                    </td>

                                                    {/* Submitted Date */}
                                                    <td className="py-4 px-4 text-neutral-500 tabular-nums text-[11px]">
                                                        {new Date(lead.createdAt).toLocaleDateString()}
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="py-4 px-4 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => { e.stopPropagation(); openLead(lead); }}
                                                            className="px-3 py-1 bg-black/5 hover:bg-black hover:text-white rounded-lg text-[10px] uppercase font-bold tracking-wider font-[main] transition-all cursor-pointer"
                                                        >
                                                            Inspect
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* View Mode: VISUAL ANALYTICS */}
            {viewMode === 'analytics' && (
                <div className="space-y-8">
                    {isLoadingAnalytics || !analytics ? (
                        <div className="p-16 text-center space-y-3 bg-white/80 border border-black/10 rounded-2xl">
                            <div className="size-8 rounded-full border-2 border-black border-t-transparent animate-spin mx-auto" />
                            <p className="text-xs text-neutral-500 font-[middle]">Crunching CRM funnel & RFQ analytics...</p>
                        </div>
                    ) : (
                        <>
                            {/* Analytics KPI Highlights */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white/80 border border-black/10 rounded-2xl p-5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 font-[middle]">Pipeline Win Rate</span>
                                    <p className="text-3xl font-[main] text-[#111111]">{analytics.summary.conversionRate}%</p>
                                    <span className="text-[11px] text-neutral-500 font-[middle]">Inquiry-to-completion conversion</span>
                                </div>
                                <div className="bg-white/80 border border-black/10 rounded-2xl p-5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 font-[middle]">Pipeline Estimated Value</span>
                                    <p className="text-3xl font-[main] text-emerald-700">
                                        ${analytics.summary.totalEstimatedValue.toLocaleString()}
                                    </p>
                                    <span className="text-[11px] text-neutral-500 font-[middle]">Estimated FOB manufacturing volume</span>
                                </div>
                                <div className="bg-white/80 border border-black/10 rounded-2xl p-5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 font-[middle]">Total Garments Requested</span>
                                    <p className="text-3xl font-[main] text-[#111111]">
                                        {analytics.summary.totalUnitsRequested.toLocaleString()}
                                    </p>
                                    <span className="text-[11px] text-neutral-500 font-[middle]">Aggregate production units in inquiry</span>
                                </div>
                                <div className="bg-white/80 border border-black/10 rounded-2xl p-5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 font-[middle]">Active Pipeline Cases</span>
                                    <p className="text-3xl font-[main] text-blue-700">{analytics.summary.activePipeline}</p>
                                    <span className="text-[11px] text-neutral-500 font-[middle]">Active sampling and bulk orders</span>
                                </div>
                            </div>

                            {/* Charts Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Monthly RFQs Trend */}
                                <div className="bg-white/80 border border-black/10 rounded-2xl p-6 space-y-4 shadow-2xs">
                                    <div className="space-y-1">
                                        <h3 className="font-[main] text-base uppercase tracking-tight text-[#111111]">
                                            Monthly RFQ Intake Volume
                                        </h3>
                                        <p className="text-xs text-neutral-500 font-[middle]">Wholesale quote submissions over recent months</p>
                                    </div>
                                    <div className="h-64 w-full pt-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={analytics.monthlyRFQs}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                <XAxis dataKey="name" stroke="#888" fontSize={11} tickLine={false} />
                                                <YAxis stroke="#888" fontSize={11} tickLine={false} />
                                                <RechartsTooltip />
                                                <Bar dataKey="rfqs" fill="#111111" radius={[4, 4, 0, 0]} name="Inquiries" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Pipeline Funnel Breakdown */}
                                <div className="bg-white/80 border border-black/10 rounded-2xl p-6 space-y-4 shadow-2xs">
                                    <div className="space-y-1">
                                        <h3 className="font-[main] text-base uppercase tracking-tight text-[#111111]">
                                            Pipeline Stage Funnel
                                        </h3>
                                        <p className="text-xs text-neutral-500 font-[middle]">Distribution of leads across workflow milestones</p>
                                    </div>
                                    <div className="space-y-3 pt-2">
                                        {analytics.funnel.map((item) => {
                                            const total = analytics.summary.totalInquiries || 1;
                                            const pct = Math.round((item.count / total) * 100);
                                            return (
                                                <div key={item.stage} className="space-y-1">
                                                    <div className="flex justify-between text-xs font-[middle]">
                                                        <span className="font-semibold text-neutral-800">{item.stage}</span>
                                                        <span className="text-neutral-500 font-bold">{item.count} ({pct}%)</span>
                                                    </div>
                                                    <div className="w-full bg-black/5 rounded-full h-2 overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full transition-all duration-500"
                                                            style={{ width: `${Math.max(5, pct)}%`, backgroundColor: item.color }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Top Buyer Geographic Distribution */}
                                <div className="bg-white/80 border border-black/10 rounded-2xl p-6 space-y-4 shadow-2xs">
                                    <div className="space-y-1">
                                        <h3 className="font-[main] text-base uppercase tracking-tight text-[#111111]">
                                            Top Buyer Countries
                                        </h3>
                                        <p className="text-xs text-neutral-500 font-[middle]">Geographic origin of wholesale sourcing inquiries</p>
                                    </div>
                                    <div className="divide-y divide-black/5">
                                        {analytics.countries.map((c, idx) => (
                                            <div key={idx} className="py-2.5 flex items-center justify-between text-xs font-[middle]">
                                                <span className="font-semibold text-neutral-800">{c.country}</span>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-neutral-500">{c.units.toLocaleString()} units</span>
                                                    <span className="px-2 py-0.5 bg-black/5 rounded-md font-bold text-neutral-800">
                                                        {c.count} leads
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Popular Product Categories */}
                                <div className="bg-white/80 border border-black/10 rounded-2xl p-6 space-y-4 shadow-2xs">
                                    <div className="space-y-1">
                                        <h3 className="font-[main] text-base uppercase tracking-tight text-[#111111]">
                                            In-Demand Product Directives
                                        </h3>
                                        <p className="text-xs text-neutral-500 font-[middle]">Most requested apparel manufacturing categories</p>
                                    </div>
                                    <div className="divide-y divide-black/5">
                                        {analytics.popularProducts.map((p, idx) => (
                                            <div key={idx} className="py-2.5 flex items-center justify-between text-xs font-[middle]">
                                                <span className="font-semibold uppercase text-neutral-800 font-[main] text-[11px] truncate max-w-[220px]">
                                                    {p.product}
                                                </span>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-neutral-500">{p.units.toLocaleString()} units</span>
                                                    <span className="px-2 py-0.5 bg-black/5 rounded-md font-bold text-neutral-800">
                                                        {p.count} RFQs
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* DETAIL & AUDIT DRAWER MODAL */}
            <Dialog open={Boolean(selectedLead)} onOpenChange={(open) => { if (!open) setSelectedLead(null); }}>
                <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto bg-[#EDEEE7] text-neutral-900 border-black/15 p-6 sm:p-8">
                    {selectedLead && (
                        <div className="space-y-8">
                            {/* Drawer Header */}
                            <div className="border-b border-black/10 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 font-[middle]">
                                            B2B Lead Intel
                                        </span>
                                        <span className="text-neutral-300">•</span>
                                        <span className="text-[10px] font-mono text-neutral-500">
                                            ID: {selectedLead._id.slice(-6)}
                                        </span>
                                    </div>
                                    <DialogTitle className="text-2xl sm:text-3xl font-[main] uppercase tracking-tight text-[#111111]">
                                        {selectedLead.name}
                                    </DialogTitle>
                                    <p className="text-xs font-[middle] text-neutral-600">
                                        {selectedLead.company ? `${selectedLead.company} • ` : ''}{selectedLead.country || 'Global'}
                                    </p>
                                </div>

                                {/* Status Badge */}
                                <div>
                                    {(() => {
                                        const cfg = STATUS_CONFIG[selectedLead.status] || STATUS_CONFIG['New'];
                                        return (
                                            <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${cfg.bg} ${cfg.text}`}>
                                                <span className={`size-2 rounded-full ${cfg.dot} animate-pulse`} />
                                                <span>{cfg.label}</span>
                                            </span>
                                        );
                                    })()}
                                </div>
                            </div>

                            {/* 2-Column Body: Left (Intel & Specs) | Right (Pipeline Action & Timeline) */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Left: Intel, Specs & CAD Downloads (7 cols) */}
                                <div className="lg:col-span-7 space-y-6">
                                    {/* Client Information */}
                                    <div className="bg-white/80 border border-black/10 rounded-2xl p-5 space-y-3">
                                        <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-500 font-[middle]">
                                            Client Credentials
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3 text-xs font-[middle]">
                                            <div>
                                                <span className="text-neutral-400 block text-[10px] uppercase">Business Email</span>
                                                <a href={`mailto:${selectedLead.email}`} className="font-semibold text-black underline">
                                                    {selectedLead.email}
                                                </a>
                                            </div>
                                            <div>
                                                <span className="text-neutral-400 block text-[10px] uppercase">Country</span>
                                                <span className="font-semibold text-neutral-800">{selectedLead.country || 'Unspecified'}</span>
                                            </div>
                                            <div>
                                                <span className="text-neutral-400 block text-[10px] uppercase">Company / Brand</span>
                                                <span className="font-semibold text-neutral-800">{selectedLead.company || 'N/A'}</span>
                                            </div>
                                            <div>
                                                <span className="text-neutral-400 block text-[10px] uppercase">Website</span>
                                                {selectedLead.website ? (
                                                    <a href={selectedLead.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-black underline truncate block">
                                                        {selectedLead.website}
                                                    </a>
                                                ) : <span className="text-neutral-400">N/A</span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Production Scope & Specs */}
                                    <div className="bg-white/80 border border-black/10 rounded-2xl p-5 space-y-3">
                                        <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-500 font-[middle]">
                                            Production Directive
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3 text-xs font-[middle]">
                                            <div>
                                                <span className="text-neutral-400 block text-[10px] uppercase">Product Scope</span>
                                                <span className="font-bold text-[#111111] uppercase font-[main] text-[11px]">{selectedLead.productType}</span>
                                            </div>
                                            <div>
                                                <span className="text-neutral-400 block text-[10px] uppercase">Target Volume</span>
                                                <span className="font-bold text-[#111111] tabular-nums">{selectedLead.quantity} units</span>
                                            </div>
                                            <div>
                                                <span className="text-neutral-400 block text-[10px] uppercase">Target Delivery</span>
                                                <span className="font-semibold text-neutral-800">
                                                    {selectedLead.deadline ? new Date(selectedLead.deadline).toLocaleDateString() : 'Flexible'}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-neutral-400 block text-[10px] uppercase">Estimated Value</span>
                                                <span className="font-bold text-emerald-700">
                                                    ${(selectedLead.estimatedValue || selectedLead.quantity * 18).toLocaleString()} USD
                                                </span>
                                            </div>
                                        </div>

                                        {selectedLead.customizationOptions && selectedLead.customizationOptions.length > 0 && (
                                            <div className="pt-2 border-t border-black/5">
                                                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1.5 font-[middle]">Selected Customizations:</span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {selectedLead.customizationOptions.map((opt, i) => (
                                                        <span key={i} className="px-2 py-0.5 rounded bg-black/5 text-[10px] font-semibold text-neutral-700 font-[middle]">
                                                            {opt}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {selectedLead.customizationDetails && (
                                            <div className="pt-2 border-t border-black/5">
                                                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1 font-[middle]">Custom Specifications:</span>
                                                <p className="text-xs font-[middle] text-neutral-700 leading-relaxed whitespace-pre-wrap bg-black/[0.02] p-3 rounded-lg border border-black/5">
                                                    {selectedLead.customizationDetails}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Multi-Item Specifications (if multiple styles) */}
                                    {selectedLead.items && selectedLead.items.length > 0 && (
                                        <div className="bg-white/80 border border-black/10 rounded-2xl p-5 space-y-3">
                                            <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-500 font-[middle]">
                                                Itemized Styles Breakdown ({selectedLead.items.length})
                                            </h4>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-xs text-left">
                                                    <thead>
                                                        <tr className="border-b border-black/10 text-[10px] uppercase font-bold text-neutral-400">
                                                            <th className="pb-2">Style</th>
                                                            <th className="pb-2">Color/Size</th>
                                                            <th className="pb-2">Qty</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-black/5 font-[middle]">
                                                        {selectedLead.items.map((it, idx) => (
                                                            <tr key={idx}>
                                                                <td className="py-2 font-semibold text-neutral-900">{it.name}</td>
                                                                <td className="py-2 text-neutral-600">{it.color || 'Standard'} / {it.sizeRange || 'Full'}</td>
                                                                <td className="py-2 font-bold text-neutral-900">{it.quantity} pcs</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}

                                    {/* Attached CAD / Tech Pack Files */}
                                    <div className="bg-white/80 border border-black/10 rounded-2xl p-5 space-y-3">
                                        <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-500 font-[middle] flex items-center gap-1.5">
                                            <IoDocumentAttachOutline />
                                            <span>Attached CAD & Tech Pack Files ({selectedLead.files?.length || 0})</span>
                                        </h4>
                                        {selectedLead.files && selectedLead.files.length > 0 ? (
                                            <div className="space-y-2">
                                                {selectedLead.files.map((file, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center justify-between p-3 bg-black/[0.02] border border-black/10 rounded-xl"
                                                    >
                                                        <div className="min-w-0 pr-3">
                                                            <p className="text-xs font-bold text-neutral-900 truncate">{file.fileName}</p>
                                                            <p className="text-[10px] text-neutral-400 uppercase">
                                                                {file.fileType || 'File'} • {file.fileSize ? `${(file.fileSize / (1024 * 1024)).toFixed(2)} MB` : 'Size N/A'}
                                                            </p>
                                                        </div>
                                                        <a
                                                            href={file.fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-3 py-1.5 bg-[#111111] text-white hover:bg-neutral-800 rounded-lg text-[10px] font-bold uppercase tracking-wider font-[main] transition-colors shrink-0"
                                                        >
                                                            Download
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-neutral-400 font-[middle]">No technical CAD files attached to this inquiry.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Right: Stage Updates, Internal Notes & Activity Timeline (5 cols) */}
                                <div className="lg:col-span-5 space-y-6">
                                    {/* Pipeline Stage Transition Card */}
                                    <div className="bg-white/90 border border-black/15 rounded-2xl p-5 space-y-4 shadow-sm">
                                        <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-500 font-[middle]">
                                            Update Pipeline Stage
                                        </h4>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1 font-[middle]">New Stage</label>
                                                <select
                                                    value={targetStatus}
                                                    onChange={(e) => setTargetStatus(e.target.value as LeadStatus)}
                                                    className="w-full p-2.5 bg-black/[0.03] border border-black/15 rounded-xl text-xs font-[middle] font-semibold focus:outline-none focus:border-black"
                                                >
                                                    <option value="New">New / Unreviewed</option>
                                                    <option value="Contacted">Contacted / Quoting</option>
                                                    <option value="Sample Requested">In Sampling (Sialkot Lab)</option>
                                                    <option value="Production">In Bulk Production</option>
                                                    <option value="Completed">Completed & Dispatched</option>
                                                    <option value="Rejected">Archived / Rejected</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1 font-[middle]">
                                                    Milestone Note (Optional)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={statusCustomNote}
                                                    onChange={(e) => setStatusCustomNote(e.target.value)}
                                                    placeholder="e.g. Sample patterns sent to laser cutting table..."
                                                    className="w-full p-2.5 bg-black/[0.03] border border-black/15 rounded-xl text-xs font-[middle] focus:outline-none focus:border-black"
                                                />
                                            </div>

                                            <div className="flex items-center gap-2 pt-1">
                                                <input
                                                    type="checkbox"
                                                    id="notifyBuyer"
                                                    checked={notifyBuyer}
                                                    onChange={(e) => setNotifyBuyer(e.target.checked)}
                                                    className="size-4 rounded accent-black"
                                                />
                                                <label htmlFor="notifyBuyer" className="text-xs font-[middle] text-neutral-700 cursor-pointer select-none">
                                                    Dispatch email update to buyer ({selectedLead.email})
                                                </label>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={handleStatusUpdate}
                                                disabled={updatingStatus}
                                                className="w-full py-2.5 bg-[#111111] text-[#EDEEE7] hover:bg-neutral-800 rounded-xl text-xs font-bold uppercase tracking-wider font-[main] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                                            >
                                                {updatingStatus ? (
                                                    <span className="size-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                                ) : (
                                                    <>
                                                        <IoCheckmarkCircleOutline className="text-sm" />
                                                        <span>Save Stage & Notify</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Internal Factory Notes Feed */}
                                    <div className="bg-white/80 border border-black/10 rounded-2xl p-5 space-y-4">
                                        <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-500 font-[middle]">
                                            Internal Engineering Notes
                                        </h4>

                                        <form onSubmit={handleAddNote} className="space-y-2">
                                            <textarea
                                                value={noteInput}
                                                onChange={(e) => setNoteInput(e.target.value)}
                                                rows={2}
                                                placeholder="Add internal note on fabric availability, pricing, or pattern checks..."
                                                className="w-full p-2.5 bg-black/[0.03] border border-black/10 rounded-xl text-xs font-[middle] focus:outline-none focus:border-black resize-none"
                                            />
                                            <button
                                                type="submit"
                                                disabled={addingNote || !noteInput.trim()}
                                                className="px-3 py-1.5 bg-[#111111] text-white hover:bg-neutral-800 rounded-lg text-[10px] uppercase font-bold tracking-wider font-[main] disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1.5 ml-auto"
                                            >
                                                {addingNote ? 'Adding...' : 'Post Note'}
                                            </button>
                                        </form>

                                        {/* Notes List */}
                                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                            {selectedLead.notes && selectedLead.notes.length > 0 ? (
                                                selectedLead.notes.map((n, i) => (
                                                    <div key={i} className="p-3 bg-black/[0.02] border border-black/5 rounded-xl text-xs font-[middle]">
                                                        <p className="text-neutral-800 leading-relaxed">{n.note}</p>
                                                        <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-1.5">
                                                            <span className="font-semibold text-neutral-600">{n.author}</span>
                                                            <span>{new Date(n.createdAt).toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-xs text-neutral-400 font-[middle]">No internal notes posted yet.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Audit Activity Timeline */}
                                    <div className="bg-white/80 border border-black/10 rounded-2xl p-5 space-y-3">
                                        <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-500 font-[middle]">
                                            Audit Timeline & History
                                        </h4>
                                        <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                                            {selectedLead.activities && selectedLead.activities.length > 0 ? (
                                                selectedLead.activities.map((act) => (
                                                    <div key={act._id} className="relative pl-4 border-l-2 border-black/10 space-y-0.5 text-xs font-[middle]">
                                                        <div className="size-1.5 rounded-full bg-black absolute -left-[4px] top-1.5" />
                                                        <p className="font-bold text-neutral-900">{act.title}</p>
                                                        {act.description && (
                                                            <p className="text-neutral-600 text-[11px] leading-relaxed">{act.description}</p>
                                                        )}
                                                        <p className="text-[10px] text-neutral-400 tabular-nums">
                                                            {act.performedBy} • {new Date(act.createdAt).toLocaleString()}
                                                        </p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-xs text-neutral-400 font-[middle]">No audit activities logged yet.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* MANUAL LEAD CREATION MODAL */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-md bg-[#EDEEE7] text-neutral-900 border-black/15 p-6 sm:p-8">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-[main] uppercase tracking-tight text-[#111111]">
                            Create B2B Lead Manually
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleCreateLead} className="space-y-4 pt-3 text-xs font-[middle]">
                        <div>
                            <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Buyer Name *</label>
                            <input
                                type="text"
                                required
                                value={newLeadForm.name}
                                onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                                placeholder="e.g. Marcus Vance"
                                className="w-full p-2.5 bg-white border border-black/15 rounded-xl focus:outline-none focus:border-black"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Business Email *</label>
                            <input
                                type="email"
                                required
                                value={newLeadForm.email}
                                onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                                placeholder="e.g. buyer@athleticclub.com"
                                className="w-full p-2.5 bg-white border border-black/15 rounded-xl focus:outline-none focus:border-black"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Company / Brand</label>
                                <input
                                    type="text"
                                    value={newLeadForm.company}
                                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                                    placeholder="e.g. Apex Sportswear"
                                    className="w-full p-2.5 bg-white border border-black/15 rounded-xl focus:outline-none focus:border-black"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Country</label>
                                <input
                                    type="text"
                                    value={newLeadForm.country}
                                    onChange={(e) => setNewLeadForm({ ...newLeadForm, country: e.target.value })}
                                    placeholder="e.g. United Kingdom"
                                    className="w-full p-2.5 bg-white border border-black/15 rounded-xl focus:outline-none focus:border-black"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Product Scope *</label>
                                <input
                                    type="text"
                                    required
                                    value={newLeadForm.productType}
                                    onChange={(e) => setNewLeadForm({ ...newLeadForm, productType: e.target.value })}
                                    placeholder="e.g. Football Jerseys"
                                    className="w-full p-2.5 bg-white border border-black/15 rounded-xl focus:outline-none focus:border-black"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Estimated Units</label>
                                <input
                                    type="number"
                                    min={50}
                                    value={newLeadForm.quantity}
                                    onChange={(e) => setNewLeadForm({ ...newLeadForm, quantity: parseInt(e.target.value, 10) || 50 })}
                                    className="w-full p-2.5 bg-white border border-black/15 rounded-xl focus:outline-none focus:border-black"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Initial Note / Context</label>
                            <textarea
                                rows={2}
                                value={newLeadForm.initialNote}
                                onChange={(e) => setNewLeadForm({ ...newLeadForm, initialNote: e.target.value })}
                                placeholder="e.g. Met at ISPO Munich trade fair, requested sample of moisture wicking soccer kit."
                                className="w-full p-2.5 bg-white border border-black/15 rounded-xl focus:outline-none focus:border-black resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-3">
                            <button
                                type="button"
                                onClick={() => setIsCreateOpen(false)}
                                className="px-4 py-2 border border-black/20 rounded-xl hover:bg-black/5"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 bg-[#111111] text-[#EDEEE7] hover:bg-neutral-800 rounded-xl font-[main] uppercase font-bold tracking-wider"
                            >
                                Create Lead
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
