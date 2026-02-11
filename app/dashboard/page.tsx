import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast/headless';
import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import Link from 'next/link';

const Dashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        toast.error('You must loged in.')
        return redirect("/auth/signin");
    }

    const avatar = session?.user?.image || "https://i.pinimg.com/736x/4c/6f/12/4c6f1205a136d44eb22c4edfaa0603d2.jpg";
    const phone = (session.user as any).phone || "0000000";

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-zinc-950">
            {/* Main Card */}
            <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden">

                {/* Banner / Gradient Header */}
                <div className="h-48 w-full ios-card relative p-0!">
                    <img className='size-full object-cover' src="https://i.pinimg.com/1200x/b2/c4/d2/b2c4d211cd0d46aab8c42c93e1ccecd5.jpg" alt="" />
                </div>

                {/* Profile Section */}
                <div className="px-8 pb-8 relative">
                    <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-6 gap-6">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full p-1 bg-white dark:bg-zinc-900 shadow-xl">
                                <img
                                    className='w-full h-full rounded-full object-cover'
                                    src={avatar}
                                    alt={session.user.name}
                                />
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 pt-2 md:pt-0 pb-2">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                {session.user.name}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">
                                Software Engineer
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                <span>Los Angeles, California</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mb-2 w-full md:w-auto">
                            <Link href="/profile-edit" className="flex-1 md:flex-none">
                                <button className="w-full px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer!">
                                    <FiEdit2 size={16} />
                                    Edit Profile
                                </button>
                            </Link>
                            <button className="px-6 py-2.5 border-2 border-gray-200 dark:border-zinc-700 rounded-full font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer!">
                                Settings
                            </button>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {/* Contact Info */}
                        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</label>
                                    <p className="text-gray-900 dark:text-gray-200 font-medium">{session.user.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</label>
                                    <p className="text-gray-900 dark:text-gray-200 font-medium font-mono">{phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Skills / Stats (Placeholder for UI completeness) */}
                        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Admin Actions</h3>
                            <div className="flex flex-wrap gap-2">
                                <button className="bg-white dark:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow text-gray-700 dark:text-gray-200 cursor-pointer">
                                    Admin Dashboard
                                </button>
                                <button className="bg-white dark:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow text-gray-700 dark:text-gray-200 cursor-pointer">
                                    Orders
                                </button>
                                <button className="bg-white dark:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow text-gray-700 dark:text-gray-200 cursor-pointer">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard