'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { IoCloseOutline } from "react-icons/io5";

interface ReviewModalProps {
    isReviewOpen: boolean;
    setIsReviewOpen: (open: boolean) => void;
    reviewForm: any;
    setReviewForm: (form: any) => void;
    handleReviewSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
    renderStars: (rating: number, size?: string, interactive?: boolean, onSelect?: (r: number) => void) => React.ReactNode[];
}

const ReviewModal = ({
    isReviewOpen,
    setIsReviewOpen,
    reviewForm,
    setReviewForm,
    handleReviewSubmit,
    isSubmitting,
    renderStars
}: ReviewModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Review Modal Animation
    useGSAP(() => {
        if (isReviewOpen && modalRef.current) {
            gsap.fromTo(modalRef.current, 
                { scale: 0.8, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" }
            );
        }
    }, [isReviewOpen]);

    if (!isReviewOpen) return null;

    return (
        <div className="fixed inset-0 z-300 flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl">
            <div 
                ref={modalRef}
                className="w-full max-w-xl bg-[#EDEEE7] rounded-[2.5vw] p-10 md:p-16 relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-black/5"
            >
                <button 
                    onClick={() => setIsReviewOpen(false)}
                    className="absolute top-8 right-8 p-3 hover:bg-black/5 rounded-full transition-colors"
                >
                    <IoCloseOutline size={28} />
                </button>

                <form onSubmit={handleReviewSubmit} className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <span className="text-black/30 text-[10px] uppercase font-bold tracking-[0.5em]">Share Your Voice</span>
                        <h2 className="text-4xl font-bold tracking-tighter">Write a Thought</h2>
                    </div>

                    <div className="flex flex-col gap-8">
                        {/* Rating Input */}
                        <div className="flex flex-col gap-3">
                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Your Rating</span>
                            <div className="flex gap-2">
                                {renderStars(reviewForm.rating, "text-3xl", true, (r) => setReviewForm({ ...reviewForm, rating: r }))}
                            </div>
                        </div>

                        {/* Title Input */}
                        <div className="flex flex-col gap-3">
                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Headline</span>
                            <input 
                                required
                                type="text"
                                placeholder="Summarize your experience"
                                className="bg-white border border-black/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-black/20 transition-all font-medium"
                                value={reviewForm.title}
                                onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                            />
                        </div>

                        {/* Content Input */}
                        <div className="flex flex-col gap-3">
                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Review</span>
                            <textarea 
                                required
                                rows={4}
                                placeholder="What did you love about this piece?"
                                className="bg-white border border-black/5 rounded-3xl px-6 py-5 text-sm focus:outline-none focus:border-black/20 transition-all font-medium resize-none"
                                value={reviewForm.review}
                                onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-[#EDEEE7] py-6 rounded-full text-[11px] uppercase tracking-[0.5em] font-bold hover:opacity-90 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                    >
                        {isSubmitting ? "Submitting..." : "Voice Content"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
