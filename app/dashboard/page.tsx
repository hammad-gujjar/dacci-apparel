import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { FiEdit2 } from 'react-icons/fi';
import { IoShirtOutline, IoStorefrontOutline } from 'react-icons/io5';
import TransitionButton from '../components/TransitionButton';
import Logout from '../components/Log-out';

const Dashboard = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return redirect("/auth/signin");

    const avatar = session?.user?.image || "https://i.pinimg.com/736x/4c/6f/12/4c6f1205a136d44eb22c4edfaa0603d2.jpg";
    const phone = (session.user as any).phone || "—";

    // Safety check for name to prevent crash
    const name = session.user.name || "";
    const initials = name
        ? name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
        : 'DA';

    const QUICK_LINKS = [
        { label: "Shop Collection", href: "/shop", Icon: <IoStorefrontOutline /> },
        { label: "Admin Dashboard", href: "/admin/dashboard", Icon: <IoShirtOutline /> },
        { label: "Edit Profile", href: "/profile-edit", Icon: <FiEdit2 /> },
    ];

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="w-full flex-1 flex flex-col items-center py-15 px-5">
                <div className="w-full flex flex-col gap-8">
                    {/* Profile Hero */}
                    <div className="relative overflow-hidden border border-black/8">

                        {/* Avatar & Info */}
                        <div className="px-5 md:px-10 py-5 flex justify-between">
                            <div className="flex flex-col md:flex-row items-start md:items-end gap-5">
                                {/* Avatar */}
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#EDEEE7] shadow-lg shrink-0 bg-black">
                                    <img src={avatar} alt={session.user.name} className="w-full h-full object-cover" />
                                </div>

                                {/* Name / email */}
                                <div className="flex-1 pb-2 pt-2 md:pt-0">
                                    <h2 className="leading-tight">{session.user.name}</h2>
                                    <p className="text-black/40 py-2">{session.user.email}</p>
                                    {/* Status badge */}
                                    <div className="pb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-black/60" />
                                        <span className="text-[10px] uppercase tracking-[0.4em] text-black/40 font-bold">Active Member</span>
                                    </div>
                                    <Logout className='light-button mt-2 md:mt-0 !rounded-none' />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Contact Info */}
                        <div className="border border-black/8 p-8 flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-black/30">Contact</span>
                                <div className="w-8 h-px bg-black/10" />
                            </div>

                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/30 block mb-1">Email</label>
                                    <p className="text-black font-medium">{session.user.email}</p>
                                </div>
                                <div>
                                    <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/30 block mb-1">Phone</label>
                                    <p className="text-black font-medium">{phone}</p>
                                </div>
                                <div>
                                    <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/30 block mb-1">Verified</label>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${session.user.emailVerified ? 'bg-black' : 'bg-black/20'}`} />
                                        <p className="text-black/60">{session.user.emailVerified ? 'Email Verified' : 'Pending Verification'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Navigation */}
                        <div className="flex flex-col gap-5">
                            {QUICK_LINKS.map(({ label, href, Icon }) => (
                                <TransitionButton className="light-button !rounded-none !w-full" key={href} text={label} url={href} icon={Icon} />
                            ))}

                            {/* Initials badge */}
                            <div className="flex-1 bg-black border border-black p-6 flex items-end justify-between">
                                <span className="text-[10px] uppercase tracking-[0.5em] text-[#EDEEE7]/30 font-bold">Your Mark</span>
                                <span className="text-6xl font-bold text-[#EDEEE7]/10 font-[main] select-none">{initials}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;