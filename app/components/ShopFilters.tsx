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
}

const ShopFilters = ({ categories }: ShopFiltersProps) => {
    const [activeCategory, setActiveCategory] = useState<Category | null>(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCat = searchParams.get('category');
    const currentType = searchParams.get('type');
    const currentTags = searchParams.get('tags');

    useEffect(() => {
        if (currentCat) {
            const cat = categories.find(c => c.slug === currentCat);
            if (cat) setActiveCategory(cat);
        } else {
            setActiveCategory(null);
        }
    }, [currentCat, categories]);

    const handleCategoryClick = (cat: Category) => {
        const params = new URLSearchParams(searchParams.toString());
        if (activeCategory?._id === cat._id) {
            setActiveCategory(null);
            params.delete('category');
            params.delete('type');
        } else {
            setActiveCategory(cat);
            params.set('category', cat.slug);
            params.delete('type');
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

    const FilterContent = () => (
        <div className="flex flex-col gap-10">
            {/* Categories */}
            <div className="flex flex-col gap-6">
                <p className="text-black/40 uppercase font-bold tracking-[0.3em]">Collections</p>
                <div className="flex flex-col gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => handleCategoryClick(cat)}
                            className={`flex items-center justify-between group transition-all duration-300 text-left cursor-pointer`}
                        >
                            <h3 className={`uppercase tracking-widest ${activeCategory?._id === cat._id ? 'text-black font-bold' : 'text-black/50 hover:text-black'}`}>
                                {cat.name}
                            </h3>
                            <div className={`size-3 transition-transform duration-300 ${activeCategory?._id === cat._id ? 'rotate-90 opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                {/* <Icon name="ArrorRight" /> */}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Pop-up Style Types Panel (Visible when category selected) */}
            <div className={`flex flex-col gap-6 overflow-hidden transition-all duration-500 ${activeCategory ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-black/5 p-6 rounded-[1vw] border border-black/5 relative overflow-hidden">
                    <span className="text-black/30 text-[12px] uppercase font-bold tracking-[0.3em] mb-4 block">
                        Types in {activeCategory?.name}
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {activeCategory?.types.map((type) => (
                            <button
                                key={type}
                                onClick={() => handleTypeClick(type)}
                                className={`px-4 py-2 text-[12px] uppercase tracking-widest transition-all cursor-pointer rounded-full border ${currentType === type ? 'bg-black text-white border-black' : 'bg-white text-black border-black/10 hover:border-black'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trending Tags */}
            <div className="flex flex-col gap-6">
                <span className="text-black/30 text-[10px] uppercase font-bold tracking-[0.3em]">Brands & Tags</span>
                <div className="flex flex-wrap gap-2">
                    {['New Arrival', 'Sustainable', 'Streetwear', 'Formal'].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all rounded-full border ${currentTags === tag ? 'bg-black text-white border-black' : 'bg-transparent text-black/60 border-black/10 hover:border-black'}`}
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
            <aside className="hidden lg:block w-72 h-fit sticky top-24 pr-10 border-r border-black/5">
                <FilterContent />
            </aside>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden w-full mb-8">
                <button 
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="flex items-center gap-3 text-black uppercase tracking-widest text-sm font-bold group"
                >
                    <div className={`transition-transform duration-300 ${isMobileOpen ? 'rotate-180' : ''}`}>
                        <Icon name="chevron" className="rotate-90 size-4 text-black" />
                    </div>
                    {isMobileOpen ? 'Hide Filters' : 'Filter by Category'}
                </button>
            </div>

            {/* Mobile Drawer */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm lg:hidden">
                    <div className="absolute right-0 top-0 h-full w-[85%] bg-[#EDEEE7] px-8 py-20 overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-10 pb-6 border-b border-black/5">
                            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-black/40">Filters</span>
                            <button 
                                onClick={() => setIsMobileOpen(false)} 
                                className="size-10 flex items-center justify-center rounded-full bg-white border border-black/10 shadow-sm active:scale-95 transition-all"
                            >
                                <Icon name="close" className="size-5 text-black" />
                            </button>
                        </div>
                        <FilterContent />
                    </div>
                </div>
            )}
        </>
    );
};

export default ShopFilters;
