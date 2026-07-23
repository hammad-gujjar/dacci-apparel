'use client';
import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from './Icon';
import { Filter } from 'lucide-react';
import axios from 'axios';

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
    const [categoriesList, setCategoriesList] = useState<Category[]>(categories);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCat = searchParams.get('category');
    const currentType = searchParams.get('type');
    const currentTags = searchParams.get('tags');
    const currentSort = searchParams.get('sort') || 'newest';
    const currentOnSale = searchParams.get('onSale') === 'true';

    // Fetch fresh categories from backend API
    useEffect(() => {
        const fetchFreshCategories = async () => {
            try {
                const { data } = await axios.get('/api/public/categories');
                if (data.success && Array.isArray(data.data)) {
                    setCategoriesList(data.data);
                }
            } catch (err) {
                console.error("Failed to fetch fresh categories:", err);
            }
        };
        fetchFreshCategories();
    }, []);

    // Auto-expand current active category from URL
    useEffect(() => {
        if (currentCat && !expandedCategories.includes(currentCat)) {
            setExpandedCategories(prev => [...prev, currentCat]);
        }
    }, [currentCat]);

    // Toggle category dropdown without filtering products
    const handleCategoryClick = (catSlug: string) => {
        setExpandedCategories(prev =>
            prev.includes(catSlug)
                ? prev.filter(slug => slug !== catSlug)
                : [...prev, catSlug]
        );
    };

    // Filter by category (All option)
    const handleCategoryAllFilter = (catSlug: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentCat === catSlug && !currentType) {
            params.delete('category');
        } else {
            params.set('category', catSlug);
        }
        params.delete('type');
        params.delete('page');
        router.push(`/shop?${params.toString()}`, { scroll: false });
    };

    // Filter by type under category
    const handleTypeClick = (catSlug: string, type: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentCat === catSlug && currentType === type) {
            params.delete('type');
        } else {
            params.set('category', catSlug);
            params.set('type', type);
        }
        params.delete('page');
        router.push(`/shop?${params.toString()}`, { scroll: false });
    };

    const handleSaleClick = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentOnSale) {
            params.delete('onSale');
        } else {
            params.set('onSale', 'true');
        }
        params.delete('page');
        router.push(`/shop?${params.toString()}`, { scroll: false });
    };

    const handleSortClick = (sort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentSort === sort) {
            params.delete('sort');
        } else {
            params.set('sort', sort);
        }
        router.push(`/shop?${params.toString()}`, { scroll: false });
    };

    const handleTagClick = (tag: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentTags === tag) {
            params.delete('tags');
        } else {
            params.set('tags', tag);
        }
        params.delete('page');
        router.push(`/shop?${params.toString()}`, { scroll: false });
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
        <div className="flex flex-col gap-6 pb-8">
            {/* Categories & Accordion Types */}
            <div className="flex flex-col gap-4">
                <span className="text-black/30 text-[10px] uppercase font-bold tracking-[0.4em]">Categories</span>
                <div className="flex flex-col gap-3">
                    {categoriesList.map((cat) => {
                        const isExpanded = expandedCategories.includes(cat.slug);
                        const isCategoryActive = currentCat === cat.slug;

                        return (
                            <div key={cat._id} className="flex flex-col border-b border-black/5 pb-2">
                                {/* Category Header Button - Expanding types without filtering products */}
                                <button
                                    type="button"
                                    onClick={() => handleCategoryClick(cat.slug)}
                                    className="flex items-center justify-between group cursor-pointer text-left w-full py-1"
                                >
                                    <h3 className={`text-sm uppercase tracking-widest transition-all duration-300 ${isCategoryActive ? 'text-black font-black' : 'text-black/60 group-hover:text-black'}`}>
                                        {cat.name}
                                    </h3>
                                    <div className={`size-4 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
                                        <Icon name="chevron" className="size-full text-black/60 group-hover:text-black" />
                                    </div>
                                </button>

                                {/* Types under Category */}
                                {isExpanded && (
                                    <div className="flex flex-col gap-2 pl-3 pt-2 pb-1 my-1 border-l-2 border-black/10">
                                        {/* All Option for Category */}
                                        <button
                                            type="button"
                                            onClick={() => handleCategoryAllFilter(cat.slug)}
                                            className={`text-left text-[11px] uppercase tracking-wider py-1.5 px-3 rounded-md transition-all cursor-pointer w-fit ${isCategoryActive && !currentType ? 'bg-black text-white font-bold' : 'text-black/60 hover:text-black hover:bg-black/5'}`}
                                        >
                                            All {cat.name}
                                        </button>

                                        {/* Specific Types under Category */}
                                        {cat.types && cat.types.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-1">
                                                {cat.types.map((type) => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => handleTypeClick(cat.slug, type)}
                                                        className={`px-3 py-1.5 text-[10px] uppercase tracking-widest transition-all cursor-pointer rounded-full border ${isCategoryActive && currentType === type ? 'bg-black text-white border-black' : 'bg-transparent text-black/60 border-black/15 hover:border-black active:scale-95'}`}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Sale Filter */}
                    <button
                        type="button"
                        onClick={handleSaleClick}
                        className="flex items-center justify-between group pt-3"
                    >
                        <h3 className={`text-sm uppercase tracking-widest flex items-center gap-3 transition-colors ${currentOnSale ? 'text-[red] font-black' : 'text-[red]/60 group-hover:text-[red]'}`}>
                            Official Sales <span className="text-[9px] bg-[red] text-white px-2 py-0.5 rounded-sm font-bold tracking-normal">SALE</span>
                        </h3>
                        <div className={`size-4 flex items-center justify-center transition-all duration-300 ${currentOnSale ? 'rotate-90 scale-110' : 'opacity-0 group-hover:opacity-100'}`}>
                            <Icon name="chevron" className="size-full text-[red]" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Sort Trigger Button */}
            <div className="flex pt-2 border-t border-black/5">
                <h3 
                    onClick={() => setIsSortOpen(true)}
                    className="flex items-center justify-between uppercase tracking-[0.3em] gap-4 hover:gap-6 cursor-pointer group transition-all duration-500 font-[middle] text-sm"
                >
                    Sort By
                    <div className="size-8 flex items-center justify-center rounded-full bg-black/5 group-hover:bg-black/10 transition-colors">
                        <Icon name="menu" className="size-4 text-black" />
                    </div>
                </h3>
            </div>

            {/* Designer Taxonomy (Tags) */}
            <div className="flex flex-col gap-4 pt-2 border-t border-black/5">
                <span className="text-black/30 text-[10px] uppercase font-bold tracking-[0.4em]">Brand & tags</span>
                <div className="flex flex-wrap gap-2">
                    {brandingTags.map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagClick(tag)}
                            className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all rounded-full border ${currentTags === tag ? 'bg-black text-white border-black' : 'bg-transparent text-black/50 border-black/10 hover:border-black active:scale-95'}`}
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
            <aside className="hidden lg:block w-80 h-fit sticky top-[80px] pr-12 border-r border-black/5 max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide hover:scrollbar-default transition-all">
                <FilterContent />
            </aside>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden w-full mb-6">
                <button 
                    type="button"
                    onClick={() => setIsMobileOpen(true)}
                    className="flex items-center justify-between w-full px-5 py-3.5 bg-transparent border border-black/20 text-black hover:border-black active:scale-95 transition-all cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <Filter className="size-4 text-black" />
                        <span className="uppercase tracking-[0.2em] text-xs font-bold">Filter</span>
                    </div>
                    <Icon name="chevron" className="rotate-90 size-4 text-black" />
                </button>
            </div>

            {/* Mobile Drawer */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsMobileOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-[85%] bg-[#EDEEE7] px-8 py-15 overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-500">
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
                                    type="button"
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
                            type="button"
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