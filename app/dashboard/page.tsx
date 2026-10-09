import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FiEdit2 } from 'react-icons/fi';
import { 
    IoShirtOutline, 
    IoStorefrontOutline, 
    IoLayersOutline, 
    IoDocumentAttachOutline, 
    IoArrowForwardOutline,
    IoTimeOutline 
} from 'react-icons/io5';
import { MdOutlinePrecisionManufacturing } from 'react-icons/md';
import { databaseConnection } from '@/lib/database';
import { Lead } from '@/models/Lead.model';
import TransitionButton from '../components/TransitionButton';
import Logout from '../components/Log-out';

export const metadata = {
    title: 'Client Dashboard | Buyer Portal | Slots Sports Wear',
    description: 'B2B client overview, active manufacturing projects, and factory production milestones.',
    robots: {
        index: false,
        follow: false,
    },
};

import { adminAuth } from '@/lib/adminhelperfunction';

const Dashboard = async () => {
    const isAdmin = await adminAuth();
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return redirect("/auth/signin");

    const avatar = session?.user?.image || "https://i.pinimg.com/736x/4c/6f/12/4c6f1205a136d44eb22c4edfaa0603d2.jpg";
    const phone = (session.user as any).phone || "-";

    const name = session.user.name || "";
    const initials = name
        ? name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
        : 'DA';

    // Fetch buyer's real inquiries from MongoDB
    let inquiries: any[] = [];
    try {
        await databaseConnection();
        const userEmail = session.user.email?.toLowerCase();
        const userId = session.user.id;

        inquiries = await Lead.find({
            $or: [
                ...(userId ? [{ userId }] : []),
                ...(userEmail ? [{ email: userEmail }] : []),
            ],
            isArchived: false,
        })
            .sort({ createdAt: -1 })
            .select('_id name company productType productSlug quantity estimatedQuantity status createdAt files')
            .lean();
    } catch (err) {
        console.error("Dashboard DB fetch error:", err);
    }

    // Compute pipeline metrics
    const totalProjects = inquiries.length;
    const inReview = inquiries.filter((l: any) => l.status === 'New' || l.status === 'Contacted').length;
    const inSampling = inquiries.filter((l: any) => l.status === 'Sample Requested').length;
    const inProduction = inquiries.filter((l: any) => l.status === 'Production').length;
    const completed = inquiries.filter((l: any) => l.status === 'Completed').length;

    const recentInquiries = inquiries.slice(0, 4);

    const QUICK_LINKS = [
        { label: "My Inquiries & Tech Packs", href: "/dashboard/inquiries", Icon: <IoLayersOutline /> },
        { label: "Shop Collection", href: "/shop", Icon: <IoStorefrontOutline /> },
        ...(isAdmin.role ? [{ label: "Admin Dashboard", href: "/admin/dashboard", Icon: <IoShirtOutline /> }] : []),
        { label: "Edit Profile", href: "/profile-edit", Icon: <FiEdit2 /> },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'New':
                return { label: 'Inquiry Received', classes: 'bg-neutral-100 text-neutral-800 border-neutral-300' };
            case 'Contacted':
                return { label: 'Review In Progress', classes: 'bg-blue-50 text-blue-800 border-blue-200' };
            case 'Sample Requested':
                return { label: 'Prototype Sampling', classes: 'bg-purple-50 text-purple-800 border-purple-200' };
            case 'Production':
                return { label: 'Bulk Production', classes: 'bg-amber-50 text-amber-900 border-amber-300' };
            case 'Completed':
                return { label: 'Order Completed', classes: 'bg-emerald-50 text-emerald-900 border-emerald-300' };
            default:
                return { label: status, classes: 'bg-neutral-100 text-neutral-700 border-neutral-200' };
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col bg-[#EDEEE7]">
            <div className="w-full flex-1 flex flex-col items-center py-12 px-4 sm:px-6 md:px-10">
                <div className="w-full max-w-6xl flex flex-col gap-8">
                    {/* Profile Hero */}
                    <div className="relative overflow-hidden border border-black/8 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xs">
                        <div className="px-5 md:px-10 py-6 flex justify-between items-center">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
                                {/* Avatar */}
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-[#EDEEE7] shadow-md shrink-0 bg-black">
                                    <img src={avatar} alt={session.user.name} className="w-full h-full object-cover" />
                                </div>

                                {/* Name / Email */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl md:text-2xl font-[main] uppercase tracking-tight text-[#111111]">
                                            {session.user.name}
                                        </h2>
                                        <span className="text-xs text-neutral-400 font-[middle]">· Client Account</span>
                                    </div>
                                    <p className="text-black/50 text-xs font-[middle] mt-0.5">{session.user.email}</p>
                                    
                                    <div className="mt-2 flex items-center gap-3">
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-emerald-600" />
                                            <span className="text-[10px] uppercase tracking-[0.25em] text-black/60 font-bold font-[middle]">
                                                Active Manufacturing Partner
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Logout className='light-button shrink-0 text-xs font-bold' />
                        </div>
                    </div>

                    {/* B2B Manufacturing Production Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-black/10 shadow-2xs space-y-1">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 font-[middle]">
                                Total RFQs
                            </span>
                            <div className="text-2xl sm:text-3xl font-[main] font-bold text-[#111111]">
                                {totalProjects}
                            </div>
                            <p className="text-[10px] text-neutral-500 font-[middle]">All inquiries</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-black/10 shadow-2xs space-y-1">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 font-[middle]">
                                In Review
                            </span>
                            <div className="text-2xl sm:text-3xl font-[main] font-bold text-[#111111]">
                                {inReview}
                            </div>
                            <p className="text-[10px] text-neutral-500 font-[middle]">Engineering BOM</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-black/10 shadow-2xs space-y-1">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-purple-600 font-[middle]">
                                In Sampling
                            </span>
                            <div className="text-2xl sm:text-3xl font-[main] font-bold text-[#111111]">
                                {inSampling}
                            </div>
                            <p className="text-[10px] text-neutral-500 font-[middle]">Physical Prototype</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-black/10 shadow-2xs space-y-1">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-amber-600 font-[middle]">
                                Bulk Production
                            </span>
                            <div className="text-2xl sm:text-3xl font-[main] font-bold text-[#111111]">
                                {inProduction}
                            </div>
                            <p className="text-[10px] text-neutral-500 font-[middle]">Cutting / Sewing / QC</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-black/10 shadow-2xs space-y-1 col-span-2 sm:col-span-1">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 font-[middle]">
                                Completed
                            </span>
                            <div className="text-2xl sm:text-3xl font-[main] font-bold text-[#111111]">
                                {completed}
                            </div>
                            <p className="text-[10px] text-neutral-500 font-[middle]">Export Dispatched</p>
                        </div>
                    </div>

                    {/* Recent Inquiries & Projects Section */}
                    <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/10 shadow-2xs space-y-5">
                        <div className="flex items-center justify-between border-b border-black/5 pb-4">
                            <div>
                                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 font-[middle]">
                                    <MdOutlinePrecisionManufacturing className="text-base text-neutral-700" />
                                    <span>Active RFQs</span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-[main] uppercase tracking-tight text-[#111111] mt-0.5">
                                    Recent Manufacturing Projects
                                </h3>
                            </div>

                            <Link
                                href="/dashboard/inquiries"
                                className="inline-flex items-center gap-1 text-xs font-bold text-neutral-700 hover:text-black font-[middle]"
                            >
                                <span>View All Inquiries ({totalProjects})</span>
                                <IoArrowForwardOutline className="text-sm" />
                            </Link>
                        </div>

                        {recentInquiries.length === 0 ? (
                            <div className="text-center py-8 space-y-3">
                                <p className="text-xs text-neutral-500 font-[middle]">
                                    You have not submitted any manufacturing inquiries or Tech Packs with this account yet.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] text-white hover:bg-black text-xs font-bold uppercase tracking-wider font-[middle] shadow-2xs"
                                >
                                    <span>Submit Your First Tech Pack</span>
                                    <IoArrowForwardOutline className="text-sm" />
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentInquiries.map((inq: any) => {
                                    const badge = getStatusBadge(inq.status);
                                    const rfqRef = `RFQ-${String(inq._id).slice(-6).toUpperCase()}`;
                                    const hasFiles = Array.isArray(inq.files) && inq.files.length > 0;

                                    return (
                                        <div
                                            key={inq._id}
                                            className="p-4 rounded-xl border border-black/5 bg-neutral-50/70 hover:bg-neutral-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-xs font-bold text-neutral-500">
                                                        {rfqRef}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${badge.classes} font-[middle]`}>
                                                        {badge.label}
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-sm text-[#111111] font-[main] uppercase">
                                                    {inq.productType}
                                                </h4>
                                                <p className="text-xs text-neutral-500 font-[middle]">
                                                    Volume: <strong className="text-neutral-800">{inq.estimatedQuantity || `${inq.quantity} pcs`}</strong> · Submitted {new Date(inq.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {hasFiles && (
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-600 bg-white px-2.5 py-1 rounded-md border border-black/10 font-[middle]">
                                                        <IoDocumentAttachOutline className="text-sm" />
                                                        <span>{inq.files.length} CAD File{inq.files.length > 1 ? 's' : ''}</span>
                                                    </span>
                                                )}

                                                <Link
                                                    href={`/dashboard/inquiries/${inq._id}`}
                                                    className="px-3.5 py-1.5 rounded-xl bg-[#111111] text-white hover:bg-black transition text-xs font-bold uppercase tracking-wider font-[middle]"
                                                >
                                                    View Status
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Account Info & Navigation Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Contact Info */}
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-black/10 p-6 sm:p-8 flex flex-col gap-6 shadow-2xs">
                            <div className="flex items-center justify-between border-b border-black/5 pb-3">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 font-[middle]">
                                    Client Profile
                                </span>
                                <Link href="/profile-edit" className="text-xs font-bold text-neutral-600 hover:text-black font-[middle] flex items-center gap-1">
                                    <FiEdit2 className="text-xs" /> Edit
                                </Link>
                            </div>

                            <div className="flex flex-col gap-4 text-xs font-[middle]">
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-0.5">Corporate Email</label>
                                    <p className="text-neutral-900 font-semibold">{session.user.email}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-0.5">Direct Phone</label>
                                    <p className="text-neutral-900 font-semibold">{phone}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-0.5">Account Status</label>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className={`w-2 h-2 rounded-full ${session.user.emailVerified ? 'bg-emerald-600' : 'bg-amber-500'}`} />
                                        <p className="text-neutral-700 font-medium">
                                            {session.user.emailVerified ? 'Verified Enterprise Client' : 'Pending Verification'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Navigation & Mark */}
                        <div className="flex flex-col gap-4">
                            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-black/10 p-6 shadow-2xs space-y-3">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 font-[middle] block">
                                    Quick Actions
                                </span>
                                <div className="space-y-2">
                                    {QUICK_LINKS.map(({ label, href, Icon }) => (
                                        <TransitionButton 
                                            className="light-button !w-full !rounded-xl text-xs font-bold" 
                                            key={href} 
                                            text={label} 
                                            url={href} 
                                            icon={Icon} 
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Initials Mark */}
                            <div className="flex-1 bg-black rounded-2xl border border-black p-6 flex items-end justify-between shadow-2xs">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-[#EDEEE7]/40 font-bold font-[middle]">
                                    Client Seal
                                </span>
                                <span className="text-5xl font-bold text-[#EDEEE7]/15 font-[main] select-none">
                                    {initials}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
