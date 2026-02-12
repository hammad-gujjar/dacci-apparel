'use client';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiSave, FiArrowLeft, FiCamera, FiPhone, FiUser, FiLink } from 'react-icons/fi';
import Link from 'next/link';
import axios from 'axios';
import useFetch from '@/hooks/editCallfunction';
import { zSchema } from '@/lib/zodSchema';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface ProfileResponse {
    success: boolean;
    data: {
        _id: string;
        image?: string;
        name?: string;
        phone?: string | number;
    };
    message?: string;
}

const ProfileEdit = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const { data: user } = useFetch<ProfileResponse>('/api/customers/get');

    const formSchema = zSchema.pick({
        image: true,
        name: true,
        phone: true,
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: "",
            name: "",
            phone: "",
        },
    });

    useEffect(() => {
        if (user?.success && user?.data) {
            form.reset({
                image: user.data.image || "",
                name: user.data.name || "",
                phone: user.data.phone?.toString() || "",
            })
        }
    }, [user]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }

            setUploading(true);
            // Update form and preview
            form.setValue('image', URL.createObjectURL(file));
            setPreviewImage(URL.createObjectURL(file));
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);

        try {
            const { data: response } = await axios.put('/api/customers/update', values);

            if (!response.success) {
                throw new Error('Failed to update profile');
            }

            toast.success('Profile updated successfully');
            router.push('/dashboard');
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-zinc-950">
            <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 dark:border-zinc-800 flex items-center gap-4 bg-white dark:bg-zinc-900">
                    <Link href="/dashboard" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                        <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
                </div>

                <div className="p-8">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Image Preview & Input */}
                        <div className="flex flex-col items-center mb-8">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div
                                className="relative group cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 dark:border-zinc-800 shadow-md">
                                    <img
                                        src={previewImage || user?.data?.image || "https://i.pinimg.com/736x/4c/6f/12/4c6f1205a136d44eb22c4edfaa0603d2.jpg"}
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-zinc-900 transition-colors">
                                    {uploading ? (
                                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <FiCamera size={16} />
                                    )}
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                Click the camera icon to upload a new avatar
                            </p>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiUser className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        {...form.register('name')}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                                        placeholder="Your full name"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiPhone className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        {...form.register('phone')}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none"
                                        placeholder="0000000"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="light-button flex items-center justify-self-center gap-2"
                            >
                                {loading ? (
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <FiSave size={18} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
