'use client';

import Image from 'next/image';
import Heading from '@/app/components/Heading';
import { IoCheckmarkCircle, IoStarOutline, IoStar } from "react-icons/io5";
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

interface ReviewCollectiveProps {
    product: any;
    renderStars: (rating: number, size?: string) => React.ReactNode[];
    setIsReviewOpen: (open: boolean) => void;
}

const ReviewCollective = ({
    product,
    renderStars,
    setIsReviewOpen
}: ReviewCollectiveProps) => {
    const listRef = useRef<HTMLDivElement>(null);

    // Initial Scroll to Top when reviews change (ensures new review is seen)
    useGSAP(() => {
        if (listRef.current) {
            listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [product.reviews]);

    return (
        <div className="mt-48 flex flex-col gap-24 py-10 border-t border-black/5 scroll-reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:max-h-screen">
                <div className="col-span-2 flex flex-col gap-6">
                    <span className="text-black/30 text-[10px] uppercase font-bold tracking-[0.5em]">The Feedback</span>
                    <Heading title="Customer Collective" className="text-5xl lg:text-6xl font-medium leading-[0.9]" />
                </div>
                {/* Rating Summary Card */}
                <div className="lg:w-1/3 flex flex-col gap-12 sticky top-32 h-fit">
                    <div className="flex flex-col gap-10 p-12 bg-white rounded-[2.5vw] border border-black/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-8xl font-bold tracking-tighter leading-none">{(product.averageRating || 0).toFixed(1)}</span>
                            <div className="flex items-center gap-2">
                                {renderStars(product.averageRating || 0, "text-2xl")}
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30 mt-2">Based on {product.reviews?.length || 0} Reviews</span>
                        </div>

                        {/* Rating Bars */}
                        <div className="flex flex-col gap-4">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = product.reviews?.filter((r: any) => r.rating === star).length || 0;
                                const total = product.reviews?.length || 1;
                                const percentage = (count / total) * 100;
                                return (
                                    <div key={star} className="flex items-center gap-6">
                                        <span className="text-[10px] font-bold opacity-30 w-3">{star}</span>
                                        <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-black rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }} />
                                        </div>
                                        <span className="text-[10px] font-bold opacity-30 w-8 text-right">{count}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setIsReviewOpen(true)}
                            className="w-full border border-black py-5 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-black hover:text-white transition-all active:scale-[0.98]"
                        >
                            Write a Thought
                        </button>
                    </div>
                </div>

                {/* Individual Reviews List */}
                <div
                    ref={listRef}
                    className="lg:w-2/3 relative group/list flex max-h-[80vh] md:max-h-[700px] overflow-y-scroll flex-col gap-10 scrollbar-hide scroll-smooth pr-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {product.reviews?.length > 0 ? (
                        <div className="flex flex-col gap-10">
                            {[...product.reviews]
                                .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                .map((rev: any, i: number) => (
                                    <div
                                        key={rev._id || i}
                                        className="group p-10 bg-white/40 backdrop-blur-md rounded-[2vw] border border-white/20 hover:border-black/10 transition-all flex flex-col gap-8 opacity-0 translate-y-10 animate-reveal"
                                        style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-5">
                                                <div className="size-14 rounded-full bg-black/5 flex items-center justify-center overflow-hidden border border-black/5 relative">
                                                    {rev.user?.image ? (
                                                        <Image src={rev.user.image} alt={rev.user.name ?? 'user'} fill className="object-cover" />
                                                    ) : (
                                                        <span className="text-lg font-bold opacity-20">{rev.user?.name?.[0] || 'U'}</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm font-bold tracking-tight">{rev.user?.name}</span>
                                                        <IoCheckmarkCircle className="text-black/20" />
                                                        <span className="text-[9px] uppercase tracking-widest font-bold opacity-30 px-2 py-0.5 bg-black/5 rounded-full">Verified Buyer</span>
                                                    </div>
                                                    <span className="text-[10px] opacity-30 italic">{new Date(rev.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-0.5">
                                                {renderStars(rev.rating, "text-sm")}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <h4 className="text-lg font-bold tracking-tight leading-tight">— {rev.title}</h4>
                                            <p className="text-base text-black/60 leading-relaxed max-w-2xl italic">
                                                "{rev.review}"
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center gap-6 bg-white/20 border border-black/5 rounded-[3vw] p-20 text-center">
                            <div className="size-24 rounded-full bg-black/5 flex items-center justify-center opacity-30">
                                <IoStarOutline size={40} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-xl font-bold tracking-tight">Silent Elegance</span>
                                <p className="text-sm opacity-40 max-w-xs leading-relaxed">No thoughts have been shared for this piece yet. Be the first to define its story.</p>
                            </div>
                        </div>
                    )}

                    {/* Scroll Button */}
                    {product.reviews?.length > 3 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (listRef.current) {
                                    listRef.current.scrollBy({ top: 300, behavior: 'smooth' });
                                }
                            }}
                            className="fixed bottom-15 right-10 size-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-20 group-hover/list:translate-y-[-20px] opacity-0 group-hover/list:opacity-100"
                        >
                            <IoStar size={20} className="animate-bounce" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewCollective;
