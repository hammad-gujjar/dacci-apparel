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
        if (!stats) return 0;
        const growth = (stats.recentUsers / stats.totalUsers) * 100;
        return growth.toFixed(1);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-3">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening.</p>
                </div>

                {/* Stats Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Total Users Card */}
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-500 rounded-xl">
                                    <FiUsers className="text-white text-xl" />
                                </div>
                                <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-200 dark:bg-green-900/50 px-2 py-1 rounded-full">
                                    +{calculateGrowth()}%
                                </span>
                            </div>
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Users</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalUsers || 0}</p>
                            <div className="mt-2 flex items-center text-xs text-green-600 dark:text-green-400">
                                <FiArrowUp className="mr-1" />
                                <span>{stats?.recentUsers || 0} new this week</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Total Products Card */}
                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-yellow-500 rounded-xl">
                                    <FiPackage className="text-white text-xl" />
                                </div>
                                <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 bg-yellow-200 dark:bg-yellow-900/50 px-2 py-1 rounded-full">
                                    Active
                                </span>
                            </div>
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Products</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalProducts || 0}</p>
                            <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <span>In catalog</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Average Rating Card */}
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-500 rounded-xl">
                                    <FiStar className="text-white text-xl" />
                                </div>
                                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-200 dark:bg-purple-900/50 px-2 py-1 rounded-full">
                                    Avg
                                </span>
                            </div>
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Rating</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.avgRating || '0.0'}</p>
                            <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <span>From {stats?.totalReviews || 0} reviews</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Monthly Progress Card */}
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500 rounded-xl">
                                    <FiTrendingUp className="text-white text-xl" />
                                </div>
                            </div>
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Growth</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{calculateGrowth()}%</p>
                            <div className="mt-2">
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div 
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
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
                    <Card className="lg:col-span-2 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
                        <CardHeader className="border-b border-gray-200 dark:border-zinc-800 pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Activity</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last 7 days</p>
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
                    <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
                        <CardHeader className="border-b border-gray-200 dark:border-zinc-800 pb-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Reviews</h3>
                                <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                    See All
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="space-y-4">
                                {recentReviews.length > 0 ? (
                                    recentReviews.map((review) => (
                                        <div key={review._id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                                                {review.user?.name?.charAt(0) || 'U'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {review.user?.name || 'Anonymous'}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
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
                                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
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