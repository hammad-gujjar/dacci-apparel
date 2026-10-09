'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiTrendingUp, FiUsers, FiStar, FiPackage, FiArrowUp } from 'react-icons/fi';
import axios from 'axios';

interface DashboardStats {
    totalProducts: number;
    totalUsers: number;
    totalReviews: number;
    recentUsers: number;
    avgRating: string;
}

interface UserActivity {
    _id: number;
    count: number;
}

interface RecentReview {
    _id: string;
    user: { name: string; image?: string };
    product: { name: string };
    rating: number;
    createdAt: string;
}

const AdminDashboard = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
    const [recentReviews, setRecentReviews] = useState<RecentReview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get('/api/dashboard/stats');
            if (data.success) {
                setStats(data.data.stats);
                setUserActivity(data.data.userActivity);
                setRecentReviews(data.data.recentReviews);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const chartData = dayNames.map((day, index) => {
        const activity = userActivity.find(a => a._id === index + 1);
        return {
            name: day,
            users: activity ? activity.count : 0
        };
    });

    const calculateGrowth = () => {
        if (!stats || stats.totalUsers === 0) return "0.0";
        const growth = (stats.recentUsers / stats.totalUsers) * 100;
        return growth.toFixed(1);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#111111] dark:border-[#EDEEE7]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#EDEEE7] dark:bg-[#111111] p-3">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-[main] tracking-wide text-[#111111] dark:text-[#EDEEE7] mb-2 uppercase">Dashboard</h1>
                    <p className="text-[#111111]/70 dark:text-[#EDEEE7]/70 font-[middle]">Welcome back! Here's what's happening.</p>
                </div>

                {/* Stats Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Total Users Card */}
                    <Card className="bg-white dark:bg-[#1A1A1A] border-[#111111]/10 dark:border-white/10 shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-500 rounded-xl">
                                    <FiUsers className="text-white text-xl" />
                                </div>
                                <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-200 dark:bg-green-900/50 px-2 py-1 rounded-full">
                                    +{calculateGrowth()}%
                                </span>
                            </div>
                            <h3 className="text-sm font-[middle] text-[#111111]/70 dark:text-[#EDEEE7]/70 uppercase tracking-widest mb-1">Total Users</h3>
                            <p className="text-3xl font-[AeonikBold] text-[#111111] dark:text-[#EDEEE7]">{stats?.totalUsers || 0}</p>
                            <div className="mt-2 flex items-center text-xs text-green-600 dark:text-green-400">
                                <FiArrowUp className="mr-1" />
                                <span>{stats?.recentUsers || 0} new this week</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Total Products Card */}
                    <Card className="bg-white dark:bg-[#1A1A1A] border-[#111111]/10 dark:border-white/10 shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-yellow-500 rounded-xl">
                                    <FiPackage className="text-white text-xl" />
                                </div>
                                <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 bg-yellow-200 dark:bg-yellow-900/50 px-2 py-1 rounded-full">
                                    Active
                                </span>
                            </div>
                            <h3 className="text-sm font-[middle] text-[#111111]/70 dark:text-[#EDEEE7]/70 uppercase tracking-widest mb-1">Products</h3>
                            <p className="text-3xl font-[AeonikBold] text-[#111111] dark:text-[#EDEEE7]">{stats?.totalProducts || 0}</p>
                            <div className="mt-2 flex items-center text-xs text-[#111111]/70 dark:text-[#EDEEE7]/70 font-[middle]">
                                <span>In catalog</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Average Rating Card */}
                    <Card className="bg-white dark:bg-[#1A1A1A] border-[#111111]/10 dark:border-white/10 shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-500 rounded-xl">
                                    <FiStar className="text-white text-xl" />
                                </div>
                                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-200 dark:bg-purple-900/50 px-2 py-1 rounded-full">
                                    Avg
                                </span>
                            </div>
                            <h3 className="text-sm font-[middle] text-[#111111]/70 dark:text-[#EDEEE7]/70 uppercase tracking-widest mb-1">Rating</h3>
                            <p className="text-3xl font-[AeonikBold] text-[#111111] dark:text-[#EDEEE7]">{stats?.avgRating || '0.0'}</p>
                            <div className="mt-2 flex items-center text-xs text-[#111111]/70 dark:text-[#EDEEE7]/70 font-[middle]">
                                <span>From {stats?.totalReviews || 0} reviews</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Monthly Progress Card */}
                    <Card className="bg-white dark:bg-[#1A1A1A] border-[#111111]/10 dark:border-white/10 shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-[#111111] dark:bg-[#EDEEE7] rounded-xl">
                                    <FiTrendingUp className="text-white text-xl" />
                                </div>
                            </div>
                            <h3 className="text-sm font-[middle] text-[#111111]/70 dark:text-[#EDEEE7]/70 uppercase tracking-widest mb-1">Growth</h3>
                            <p className="text-3xl font-[AeonikBold] text-[#111111] dark:text-[#EDEEE7]">{calculateGrowth()}%</p>
                            <div className="mt-2">
                                <div className="w-full bg-[#111111]/10 dark:bg-[#EDEEE7]/10 rounded-full h-2">
                                    <div 
                                        className="bg-[#111111] dark:bg-[#EDEEE7] h-2 rounded-full transition-all duration-500" 
                                        style={{ width: `${Math.min(parseFloat(calculateGrowth()), 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts and Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* User Activity Chart */}
                    <Card className="lg:col-span-2 bg-white dark:bg-[#1A1A1A] border-[#111111]/10 dark:border-white/10 shadow-sm">
                        <CardHeader className="border-b border-gray-200 dark:border-zinc-800 pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-[main] tracking-wider uppercase text-[#111111] dark:text-[#EDEEE7]">User Activity</h3>
                                    <p className="text-sm text-[#111111]/70 dark:text-[#EDEEE7]/70 font-[middle] mt-1">Last 7 days</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">+{calculateGrowth()}%</p>
                                    <p className="text-xs text-green-600 dark:text-green-400">Growth rate</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                    <XAxis 
                                        dataKey="name" 
                                        stroke="#9CA3AF"
                                        style={{ fontSize: '12px' }}
                                    />
                                    <YAxis 
                                        stroke="#9CA3AF"
                                        style={{ fontSize: '12px' }}
                                    />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: '#1F2937', 
                                            border: 'none', 
                                            borderRadius: '8px',
                                            color: '#fff'
                                        }}
                                    />
                                    <Bar 
                                        dataKey="users" 
                                        fill="#6366F1" 
                                        radius={[8, 8, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Recent Reviews */}
                    <Card className="bg-white dark:bg-[#1A1A1A] border-[#111111]/10 dark:border-white/10 shadow-sm">
                        <CardHeader className="border-b border-gray-200 dark:border-zinc-800 pb-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-[main] tracking-wider uppercase text-[#111111] dark:text-[#EDEEE7]">Recent Reviews</h3>
                                <button className="text-sm text-[#111111] dark:text-[#EDEEE7] font-[middle] underline hover:underline">
                                    See All
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="space-y-4">
                                {recentReviews.length > 0 ? (
                                    recentReviews.map((review) => (
                                        <div key={review._id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#111111]/5 dark:hover:bg-[#EDEEE7]/5 transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-[#111111] dark:bg-[#EDEEE7] text-white dark:text-[#111111] flex items-center justify-center text-white font-semibold flex-shrink-0">
                                                {review.user?.name?.charAt(0) || 'U'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-[middle] text-[#111111] dark:text-[#EDEEE7] truncate">
                                                    {review.user?.name || 'Anonymous'}
                                                </p>
                                                <p className="text-xs text-[#111111]/70 dark:text-[#EDEEE7]/70 font-[middle] truncate">
                                                    {review.product?.name || 'Product'}
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FiStar
                                                            key={i}
                                                            className={`w-3 h-3 ${
                                                                i < review.rating
                                                                    ? 'text-yellow-400 fill-yellow-400'
                                                                    : 'text-gray-300 dark:text-gray-600'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                                                {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-[#111111]/70 dark:text-[#EDEEE7]/70 font-[middle]">
                                        <FiStar className="mx-auto text-4xl mb-2 opacity-20" />
                                        <p className="text-sm">No reviews yet</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;