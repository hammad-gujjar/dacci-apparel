'use client';
import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from './Icon';

interface Category {
    _id: string;
    name: string;
    slug: string;
    types: string[];
}

interface ShopFiltersProps {
    categories: Category[];
    brandingTags: string[];
}

const ShopFilters = ({ categories, brandingTags }: ShopFiltersProps) => {
    const [activeCategory, setActiveCategory] = useState<Category | null>(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCat = searchParams.get('category');
    const currentType = searchParams.get('type');
    const currentTags = searchParams.get('tags');
    const currentSort = searchParams.get('sort') || 'newest';
    const currentOnSale = searchParams.get('onSale') === 'true';

    useEffect(() => {
        if (currentCat) {
            const cat = categories.find(c => c.slug === currentCat);
            if (cat) setActiveCategory(cat);
        } else {
            setActiveCategory(null);
        }
    }, [currentCat, categories]);

    const handleCategoryClick = (cat: Category | 'sale') => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (cat === 'sale') {
            if (currentOnSale) {
                params.delete('onSale');
            } else {
                params.set('onSale', 'true');
            }
            // Optional: reset category when sale is selected, or keep both
            // params.delete('category'); 
        } else {
            if (activeCategory?._id === cat._id) {
                setActiveCategory(null);
                params.delete('category');
                params.delete('type');
            } else {
                setActiveCategory(cat);
                params.set('category', cat.slug);
                params.delete('type');
                params.delete('onSale'); // Reset sale when choosing category
            }
        }
        params.delete('page'); // Reset to page 1 on filter
        router.push(`/shop?${params.toString()}`);
    };

    const handleSortClick = (sort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentSort === sort) {
            params.delete('sort');
        } else {
            params.set('sort', sort);
        }
        router.push(`/shop?${params.toString()}`);
    };

    const handleTypeClick = (type: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentType === type) {
            params.delete('type');
        } else {
            params.set('type', type);
        }
        router.push(`/shop?${params.toString()}`);
    };

    const handleTagClick = (tag: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentTags === tag) {
            params.delete('tags');
        } else {
            params.set('tags', tag);
        }
        router.push(`/shop?${params.toString()}`);
    };

    const SORT_OPTIONS = [
        { label: 'Newest Arrivals', value: 'newest' },
        { label: 'Price: Low to High', value: 'price-asc' },
        { label: 'Price: High to Low', value: 'price-desc' },
        { label: 'Sales: High to Low', value: 'sale-desc' },
    ];

    const [isSortOpen, setIsSortOpen] = useState(false);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    useGSAP(() => {
        if (isSortOpen) {
            gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
            gsap.fromTo(modalRef.current, 
                { scale: 0.8, opacity: 0, y: 20 }, 
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    }, [isSortOpen]);

    const FilterContent = () => (
        <div className="flex flex-col gap-5 pb-8">
            {/* Categories & Sale */}
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => handleCategoryClick(cat)}
                            className="flex items-center justify-between group cursor-pointer text-left"
                        >
                            <h3 className={`text-base uppercase tracking-widest transition-all duration-300 ${activeCategory?._id === cat._id ? 'text-black font-black' : 'text-black/40 group-hover:text-black'}`}>
                                {cat.name}
                            </h3>
                            <div className={`size-4 flex items-center justify-center transition-all duration-500 ${activeCategory?._id === cat._id ? 'rotate-90 scale-110' : 'opacity-0 group-hover:opacity-100'}`}>
                                <Icon name="chevron" className="size-full text-black" />
                            </div>
                        </button>
                    ))}
                    {/* Sale Filter */}
                    <button
                        onClick={() => handleCategoryClick('sale')}
                        className="flex items-center justify-between group pt-4 border-t border-black/5"
                    >
                        <h3 className={`text-base uppercase tracking-widest flex items-center gap-3 transition-colors ${currentOnSale ? 'text-[red] font-black' : 'text-[red]/40 group-hover:text-[red]'}`}>
                            Official Sales <span className="text-[9px] bg-[red] text-white px-2 py-0.5 rounded-sm font-bold tracking-normal">SALE</span>
                        </h3>
                        <div className={`size-4 flex items-center justify-center transition-all duration-500 ${currentOnSale ? 'rotate-90 scale-110' : 'opacity-0 group-hover:opacity-100'}`}>
                            <Icon name="chevron" className="size-full text-[red]" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Sort Trigger Button (Moved here after Sale as requested) */}
            <div className="flex">
                <button 
                    onClick={() => setIsSortOpen(true)}
                    className="flex items-center justify-between px-6 py-4 bg-black text-white rounded-2xl shadow-xl active:scale-95 transition-all text-xs uppercase tracking-[0.3em] font-black hover:bg-black/90 group"
                >
                    Sort By Logic
                    <div className="size-8 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                        <Icon name="menu" className="size-4 text-white" />
                    </div>
                </button>
            </div>

            {/* Contextual Architecture (Types) */}
            <div className={`flex flex-col gap-3 overflow-hidden transition-all duration-700 ${activeCategory ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <span className="text-black/30 text-[10px] uppercase font-bold tracking-[0.4em]">Architecture</span>
                <div className="flex flex-wrap gap-2.5">
                    {activeCategory?.types.map((type) => (
                        <button
                            key={type}
                            onClick={() => handleTypeClick(type)}
                            className={`px-5 py-2.5 text-[10px] uppercase tracking-widest transition-all cursor-pointer rounded-full border ${currentType === type ? 'bg-black text-white border-black' : 'bg-transparent text-black/50 border-black/10 hover:border-black active:scale-95'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Designer Taxonomy (Tags) */}
            <div className="flex flex-col gap-6">
                <span className="text-black/30 text-[10px] uppercase font-bold tracking-[0.4em]">Taxonomy</span>
                <div className="flex flex-wrap gap-2.5">
                    {brandingTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`px-5 py-2.5 text-[10px] uppercase tracking-widest transition-all rounded-full border ${currentTags === tag ? 'bg-black text-white border-black' : 'bg-transparent text-black/40 border-black/10 hover:border-black active:scale-95'}`}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar Container */}
            <aside className="hidden lg:block w-80 h-fit sticky top-[100px] pr-12 border-r border-black/5 max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide hover:scrollbar-default transition-all">
                <FilterContent />
            </aside>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden w-full mb-10">
                <button 
                    onClick={() => setIsMobileOpen(true)}
                    className="flex items-center justify-between w-full px-6 py-5 bg-black text-white rounded-2xl shadow-xl active:scale-95 transition-all"
                >
                    <div className="flex items-center gap-4">
                        <Icon name="menu" className="size-5 text-white/50" />
                        <span className="uppercase tracking-[0.3em] text-xs font-black">Refine Selection</span>
                    </div>
                    <Icon name="chevron" className="rotate-90 size-4 text-white" />
                </button>
            </div>

            {/* Mobile Drawer */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsMobileOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-[85%] bg-[#EDEEE7] p-8 overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-500">
                        <div className="flex justify-between items-center mb-10 pb-6 border-b border-black/5">
                            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-black">Control Suite</span>
                            <button onClick={() => setIsMobileOpen(false)} className="size-10 flex items-center justify-center rounded-xl bg-white border border-black/5">
                                <Icon name="close" className="size-5 text-black" />
                            </button>
                        </div>
                        <FilterContent />
                    </div>
                </div>
            )}

            {/* iOS Style Sorting Modal */}
            {isSortOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                    <div 
                        ref={overlayRef}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsSortOpen(false)}
                    />
                    <div 
                        ref={modalRef}
                        className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-10 shadow-3xl text-center"
                    >
                        <div className="flex flex-col gap-1 mb-8">
                            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-black/30">Order Logic</span>
                            <h4 className="text-xl font-black uppercase tracking-tight text-black">Sort Results</h4>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            {SORT_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => {
                                        handleSortClick(opt.value);
                                        setIsSortOpen(false);
                                    }}
                                    className={`w-full py-5 rounded-2xl text-[11px] uppercase tracking-[0.3em] font-black transition-all active:scale-[0.98] ${currentSort === opt.value ? 'bg-black text-white shadow-xl translate-y-[-2px]' : 'bg-black/5 text-black/40 hover:bg-black/10'}`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={() => setIsSortOpen(false)}
                            className="mt-10 text-[10px] uppercase font-bold tracking-widest text-black/30 hover:text-black transition-colors underline underline-offset-8"
                        >
                            Cancel Selection
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShopFilters;