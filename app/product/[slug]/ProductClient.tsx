'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLoader } from '@/app/context/LoaderContext';
import Heading from '@/app/components/Heading';
import ProductItem from '@/app/components/ProductItem';
import Icon from '@/app/components/Icon';
import { cn } from '@/lib/utils';
import { IoStar, IoStarOutline, IoStarHalf } from "react-icons/io5";
import { authClient } from '@/lib/auth-client';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Modular Components
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ReviewCollective from './components/ReviewCollective';
import ReviewModal from './components/ReviewModal';
import GalleryMarquee from './components/GalleryMarquee';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProductClientProps {
    initialData: any;
}

const ProductClient = ({ initialData }: ProductClientProps) => {
    const { transitionTo } = useLoader();
    const { data: session } = authClient.useSession();
    const [product, setProduct] = useState(initialData);
    const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
    const [isMarqueeOpen, setIsMarqueeOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    
    // Review Modal State
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        rating: 5,
        title: '',
        review: ''
    });

    const containerRef = useRef<HTMLDivElement>(null);

    // Derived values
    const currentPrice = selectedVariant ? selectedVariant.sellingPrice : product.sellingPrice;
    const currentMrp = selectedVariant ? selectedVariant.mrp : product.mrp;
    const currentDiscount = selectedVariant ? selectedVariant.discountPercentage : product.discountPercentage;
    const currentMedia = (selectedVariant?.media?.length > 0 ? selectedVariant.media : product.media) || [];
    const mainImage = currentMedia?.[activeImageIndex]?.secure_url || currentMedia?.[0]?.secure_url || '/placeholder.png';
    const allImages = [...(product.media || []), ...(product.variants?.flatMap((v: any) => v.media) || [])]
        .filter((v, i, a) => a.findIndex(t => t.secure_url === v.secure_url) === i);

    // --- GSAP PRE-TRANSITION ANIMATIONS ---
    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Initial Load Animations
        tl.from(".product-image-section", {
            x: -80,
            opacity: 0,
            duration: 1.5,
            ease: "expo.out"
        })
        .from(".product-info-section > *", {
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out"
        }, "-=1.2");

        // Scroll Reveal Animations
        gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((el) => {
            gsap.from(el, {
                y: 60,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }, { scope: containerRef });

    const handleVariantSelect = (v: any) => {
        setSelectedVariant(v);
        setActiveImageIndex(0);
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            toast.error("Please login to submit a review");
            return;
        }

        setIsSubmitting(true);
        try {
            const { data } = await axios.post('/api/review/create', {
                product: product._id,
                ...reviewForm
            });

            if (data.success) {
                toast.success("Thank you for your review!");
                setProduct((prev: any) => ({
                    ...prev,
                    reviews: [data.data, ...prev.reviews],
                    averageRating: ((prev.averageRating * prev.reviews.length) + reviewForm.rating) / (prev.reviews.length + 1)
                }));
                setIsReviewOpen(false);
                setReviewForm({ rating: 5, title: '', review: '' });
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Rating helper
    const renderStars = (rating: number, size: string = "text-xl", interactive: boolean = false, onSelect?: (r: number) => void) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isFull = i <= Math.floor(rating);
            const isHalf = i === Math.ceil(rating) && rating % 1 !== 0;
            
            stars.push(
                <button
                    key={i}
                    type="button"
                    disabled={!interactive}
                    onClick={() => onSelect?.(i)}
                    className={cn(interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default")}
                >
                    {isFull ? (
                        <IoStar className={cn("text-black", size)} />
                    ) : isHalf ? (
                        <IoStarHalf className={cn("text-black", size)} />
                    ) : (
                        <IoStarOutline className={cn("text-black/10", size)} />
                    )}
                </button>
            );
        }
        return stars;
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#EDEEE7] pt-24 pb-20 px-4 md:px-12 selection:bg-black selection:text-white overflow-hidden">
            <div className="max-w-full mx-auto">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-15">
                    <ProductGallery 
                        productName={product.name}
                        mainImage={mainImage}
                        currentMedia={currentMedia}
                        activeImageIndex={activeImageIndex}
                        setActiveImageIndex={setActiveImageIndex}
                        currentDiscount={currentDiscount}
                        setIsMarqueeOpen={setIsMarqueeOpen}
                    />

                    <ProductInfo 
                        product={product}
                        selectedVariant={selectedVariant}
                        handleVariantSelect={handleVariantSelect}
                        currentPrice={currentPrice}
                        currentMrp={currentMrp}
                        renderStars={renderStars}
                    />
                </div>

                <ReviewCollective 
                    product={product}
                    renderStars={renderStars}
                    setIsReviewOpen={setIsReviewOpen}
                />

                {product.relatedProducts?.length > 0 && (
                    <div className="mt-48 flex flex-col gap-20 py-32 border-t border-black/5 scroll-reveal">
                        <div className="flex flex-col lg:flex-row justify-between items-end gap-10">
                            <div className="flex flex-col gap-4">
                                <span className="text-black/30 text-[10px] uppercase font-bold tracking-[0.5em]">Curated Affinity</span>
                                <Heading title="Matches with this" className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.9]" />
                            </div>
                            <button onClick={() => transitionTo('/shop')} className="hidden lg:flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold group">
                                <span>Explore More</span>
                                <div className="size-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                                    <Icon name="arrow" className="-rotate-45deg scale-75" />
                                </div>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-14">
                            {product.relatedProducts.map((p: any) => (
                                <div key={p._id} className="hover:scale-[1.02] transition-transform duration-1000">
                                    <ProductItem product={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <ReviewModal 
                isReviewOpen={isReviewOpen}
                setIsReviewOpen={setIsReviewOpen}
                reviewForm={reviewForm}
                setReviewForm={setReviewForm}
                handleReviewSubmit={handleReviewSubmit}
                isSubmitting={isSubmitting}
                renderStars={renderStars}
            />

            <GalleryMarquee 
                isMarqueeOpen={isMarqueeOpen}
                setIsMarqueeOpen={setIsMarqueeOpen}
                allImages={allImages}
            />
        </div>
    );
};

export default ProductClient;
