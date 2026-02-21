'use client';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { FiSave, FiCamera, FiPhone, FiUser, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import axios from 'axios';
import useFetch from '@/hooks/editCallfunction';
import { zSchema } from '@/lib/zodSchema';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

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
    const containerRef = useRef<HTMLDivElement>(null);

    const { data: user } = useFetch<ProfileResponse>('/api/customers/get');

    const formSchema = zSchema.pick({ image: true, name: true, phone: true });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { image: "", name: "", phone: "" },
    });

    useEffect(() => {
        if (user?.success && user?.data) {
            form.reset({
                image: user.data.image || "",
                name: user.data.name || "",
                phone: user.data.phone?.toString() || "",
            });
        }
    }, [user]);

    // Entry animation
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(".edit-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
          .fromTo(".edit-field", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.4");
    }, { scope: containerRef });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) { toast.error('Please select an image file'); return; }
            setUploading(true);
            const url = URL.createObjectURL(file);
            form.setValue('image', url);
            setPreviewImage(url);
            toast.success('Image updated');
        } catch {
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            const { data: response } = await axios.put('/api/customers/update', values);
            if (!response.success) throw new Error();
            toast.success('Profile updated successfully');
            router.push('/dashboard');
            router.refresh();
        } catch {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const currentImage = previewImage || user?.data?.image || "https://i.pinimg.com/736x/4c/6f/12/4c6f1205a136d44eb22c4edfaa0603d2.jpg";

    return (
        <div ref={containerRef} className="min-h-screen bg-[#EDEEE7] flex flex-col">
            {/* Top nav */}
            <nav className="w-full px-6 md:px-12 py-5 flex items-center gap-4 border-b border-black/5">
                <Link href="/dashboard" className="p-2 hover:bg-black/5 transition-colors">
                    <FiArrowLeft size={18} className="text-black/50" />
                </Link>
                <h3 className="tracking-[0.3em] text-black/70">Edit Profile</h3>
            </nav>

            <div className="flex-1 flex items-start justify-center py-16 px-4">
                <div className="edit-card w-full max-w-2xl border border-black/8 bg-white/60">

                    {/* Avatar Section */}
                    <div className="edit-field relative bg-black p-8 flex flex-col items-center gap-5 overflow-hidden">
                        <div className="absolute inset-0 opacity-5" style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, #EDEEE7 0px, #EDEEE7 1px, transparent 1px, transparent 40px)',
                        }} />
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

                        <div
                            className="relative group cursor-pointer z-10"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#EDEEE7]/20">
                                <img src={currentImage} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className={`absolute inset-0 rounded-full bg-black/50 flex items-center justify-center transition-opacity ${uploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                {uploading
                                    ? <div className="w-5 h-5 border-2 border-[#EDEEE7]/30 border-t-[#EDEEE7] rounded-full animate-spin" />
                                    : <FiCamera size={20} className="text-[#EDEEE7]" />
                                }
                            </div>
                        </div>

                        <div className="z-10 text-center">
                            <p className="text-[#EDEEE7]/60 text-[10px] uppercase tracking-[0.4em]">Tap to change photo</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-8 md:p-10">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-7">

                            {/* Name */}
                            <div className="edit-field flex flex-col gap-2">
                                <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                        <FiUser className="text-black/20" size={15} />
                                    </div>
                                    <input
                                        type="text"
                                        {...form.register('name')}
                                        placeholder="Your full name"
                                        className="w-full pl-11 pr-5 py-4 bg-white/60 border border-black/10 text-black placeholder:text-black/20 focus:border-black/40 focus:bg-white transition-all outline-none text-sm tracking-wide"
                                    />
                                </div>
                                {form.formState.errors.name && (
                                    <p className="text-[10px] text-red-500 tracking-wide">{form.formState.errors.name.message}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="edit-field flex flex-col gap-2">
                                <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                        <FiPhone className="text-black/20" size={15} />
                                    </div>
                                    <input
                                        type="tel"
                                        {...form.register('phone')}
                                        placeholder="Your phone number"
                                        className="w-full pl-11 pr-5 py-4 bg-white/60 border border-black/10 text-black placeholder:text-black/20 focus:border-black/40 focus:bg-white transition-all outline-none text-sm tracking-wide"
                                    />
                                </div>
                                {form.formState.errors.phone && (
                                    <p className="text-[10px] text-red-500 tracking-wide">{form.formState.errors.phone.message}</p>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="edit-field w-full h-1px bg-black/5" />

                            {/* Submit */}
                            <div className="edit-field flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="dark-button flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.4em] uppercase font-bold disabled:opacity-50"
                                >
                                    {loading
                                        ? <><div className="w-4 h-4 border-2 border-[#EDEEE7]/30 border-t-[#EDEEE7] rounded-full animate-spin" /> Saving...</>
                                        : <><FiSave size={15} /> Save Changes</>
                                    }
                                </button>
                                <Link href="/dashboard">
                                    <button type="button" className="light-button px-8 py-4 text-[11px] tracking-[0.4em] uppercase font-bold">
                                        Cancel
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
