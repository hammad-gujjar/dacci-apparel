'use client';

import Heading from '@/app/components/Heading';
import TransitionButton from '@/app/components/TransitionButton';
import { useTechPack } from '@/app/context/TechPackContext';
import toast from 'react-hot-toast';
import { trackEvent } from '@/lib/analytics';

interface ProductInfoProps {
    product: any;
    selectedVariant: any;
    handleVariantSelect: (v: any | null) => void;
    currentPrice?: number;
    currentMrp?: number;
    renderStars: (rating: number, size?: string) => React.ReactNode[];
}

const ProductInfo = ({
    product,
    selectedVariant,
    handleVariantSelect,
    renderStars
}: ProductInfoProps) => {
    const hasVariants = product.variants?.length > 0;
    const uniqueColors = [...new Set(product.variants?.map((v: any) => v.color))] as string[];

    // Sizes for the currently selected color, only if they have a size value
    const sizesForColor = selectedVariant?.color
        ? product.variants
            .filter((v: any) => v.color === selectedVariant.color && v.size)
            .sort((a: any, b: any) => a.size.localeCompare(b.size))
        : [];

    const categoryType = product.category?.slug || product.productType || 'sportswear';
    const quoteUrl = `/contact?type=${encodeURIComponent(categoryType)}&slug=${encodeURIComponent(product.slug)}#teckpack`;
    const discussUrl = `/contact?type=${encodeURIComponent(categoryType)}&slug=${encodeURIComponent(product.slug)}#contact-form`;

    const { addItem } = useTechPack();

    const handleRequestQuote = () => {
        const imageUrl = selectedVariant?.media?.[0]?.secure_url || product.media?.[0]?.secure_url || '/placeholder.png';
        
        trackEvent('add_to_techpack', { 
            productSlug: product.slug, 
            productName: product.name,
            category: product.category?.name || product.productType || 'Custom Sportswear'
        });

        addItem({
            slug: product.slug,
            name: product.name,
            category: product.category?.name || product.productType || 'Custom Sportswear',
            image: imageUrl,
            quantity: 30,
            color: selectedVariant?.color || 'Default',
            sizeRange: selectedVariant?.size ? `Sample Size: ${selectedVariant.size} (Full Grading Available)` : 'Full Size Range (XS–5XL)',
            customizationOptions: ['Sublimation', 'Private Label'],
        });
        toast.success(`Added ${product.name} to Tech Pack Request (30 Pcs MOQ)`);
    };

    return (
        <div className="w-full lg:w-[40%] flex flex-col gap-5 lg:sticky h-fit product-info-section">
            <div className="flex flex-col gap-4">
                {/* Manufacturing Category Label */}
                <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 bg-black text-[#EDEEE7] text-[9px] uppercase tracking-[0.3em] font-bold rounded-sm shadow-sm">
                        Manufacturing Category
                    </span>
                    <span className="px-3 py-1 bg-black/5 text-black/80 text-[9px] uppercase tracking-[0.25em] font-bold rounded-sm border border-black/10">
                        {product.category?.name || 'Custom Sportswear'}
                    </span>
                    {product.productType && (
                        <span className="text-black/40 text-[10px] uppercase font-bold tracking-widest italic">
                            • {product.productType}
                        </span>
                    )}
                </div>

                {/* Dynamic Product Title */}
                <Heading as="h1" title={product.name} className="text-left" />

                {/* Short Description */}
                <p className="text-black/75 text-sm md:text-[15px] leading-relaxed font-normal">
                    Premium OEM sportswear manufacturing solution for brands, teams and wholesalers with custom fabrics, designs and private label options.
                </p>

                {/* Short Rating */}
                <div className="flex items-center gap-6 py-2 border-b border-black/10 pb-5">
                    <div className="flex items-center gap-1">
                        {renderStars(product.averageRating || 0, "text-lg")}
                    </div>
                    <a href='#review' className="uppercase font-bold opacity-40 hover:opacity-100 transition-opacity cursor-pointer underline underline-offset-4 text-xs tracking-wider">
                        {product.reviews?.length || 0} Verified Reviews
                    </a>
                </div>
            </div>

            {/* B2B Manufacturing Specifications Highlights (Replaces Retail Pricing) */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 py-4 px-4 bg-white/40 rounded-xl border border-black/10 backdrop-blur-xs">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-black/40">Minimum Order</span>
                    <span className="text-sm md:text-base font-bold text-black tracking-tight">30 Pcs / Style</span>
                </div>
                <div className="flex flex-col gap-1 border-x border-black/10 px-2 md:px-3">
                    <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-black/40">Sample Lead Time</span>
                    <span className="text-sm md:text-base font-bold text-black tracking-tight">7–14 Days</span>
                </div>
                <div className="flex flex-col gap-1 pl-1 md:pl-2">
                    <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-black/40">Production Time</span>
                    <span className="text-sm md:text-base font-bold text-black tracking-tight flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-black/80 animate-pulse inline-block" /> 3–4 Weeks
                    </span>
                </div>
            </div>

            {/* Variants Selection (Sample Colors & Sizing) */}
            {hasVariants && (
                <div className="flex flex-col gap-7 pt-2">
                    {/* Colors + Default */}
                    {uniqueColors.length > 0 && (
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] uppercase font-bold tracking-[0.4em] opacity-50">Sample Colorway</span>
                                <span className="text-[10px] font-bold opacity-30">
                                    {selectedVariant ? selectedVariant.color : 'Default Specification'}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {/* Default button */}
                                <button
                                    onClick={() => handleVariantSelect(null)}
                                    className={`px-6 py-3.5 text-[10px] uppercase tracking-[0.25em] border transition-all rounded-full font-bold relative overflow-hidden group active:scale-[0.97] ${!selectedVariant
                                            ? 'bg-black text-white border-black shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] scale-105'
                                            : 'bg-white/50 text-black border-black/10 hover:border-black backdrop-blur-md'
                                        }`}
                                >
                                    <span className="relative z-10">Default</span>
                                </button>

                                {uniqueColors.map((color) => {
                                    const v = product.variants.find((v: any) => v.color === color);
                                    return (
                                        <button
                                            key={color}
                                            onClick={() => handleVariantSelect(v)}
                                            className={`px-6 py-3.5 text-[10px] uppercase tracking-[0.25em] border transition-all rounded-full font-bold relative overflow-hidden group active:scale-[0.97] ${selectedVariant?.color === color
                                                    ? 'bg-black text-white border-black shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] scale-105'
                                                    : 'bg-white/50 text-black border-black/10 hover:border-black backdrop-blur-md'
                                                }`}
                                        >
                                            <span className="relative z-10">{color}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Sizes - only show if selected variant's color has sizes */}
                    {sizesForColor.length > 0 && (
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] uppercase font-bold tracking-[0.4em] opacity-50">Sample Sizing (Grading Available)</span>
                                <span className="text-[10px] font-bold opacity-30 tracking-wider">XS - 5XL Available</span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {sizesForColor.map((v: any) => (
                                    <button
                                        key={v.size}
                                        onClick={() => handleVariantSelect(v)}
                                        className={`size-14 flex items-center justify-center text-[11px] font-bold border transition-all rounded-full tracking-widest active:scale-[0.97] ${selectedVariant?._id === v._id
                                                ? 'bg-black text-white border-black shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)] scale-105'
                                                : 'bg-white/50 text-black border-black/10 hover:border-black backdrop-blur-md'
                                            }`}
                                    >
                                        {v.size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Manufacturing Overview / Craft description */}
            <div className="flex flex-col gap-3 mt-2">
                <h3 className="uppercase font-bold tracking-[0.4em] opacity-40 text-xs">Production Overview</h3>
                <p className="text-black/80 text-sm leading-relaxed">
                    {product.description}
                </p>
            </div>

            {/* B2B Call-to-Action Buttons */}
            <div className="flex flex-col gap-3.5 mt-4 bg-white/40 border border-black/10 p-5 rounded-3xl backdrop-blur-sm">
                <div className="flex flex-col mb-1 text-[11px] text-black/60 leading-relaxed font-semibold">
                    <p>Submitting an RFQ places this style into your Tech Pack. You will receive dedicated consultation, customized sampling, and bulk pricing details with no upfront commitment.</p>
                </div>

                {/* Primary Button: REQUEST QUOTE & TECH PACK */}
                <TransitionButton
                    text="ADD TO TECH PACK QUOTE"
                    onClick={handleRequestQuote}
                    className="w-full bg-black text-[#EDEEE7] py-5 md:py-6 rounded-full text-[11px] uppercase tracking-[0.35em] md:tracking-[0.45em] font-bold hover:opacity-90 transition-all hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.4)] active:scale-[0.97] flex items-center justify-center gap-3 cursor-pointer"
                    arrow
                    rollingText
                />

                {/* Secondary Button: DISCUSS YOUR PROJECT */}
                <TransitionButton
                    text="CONTACT SALES TEAM"
                    url={discussUrl}
                    onClick={() => trackEvent('contact_sales_team', { productSlug: product.slug, productName: product.name })}
                    className="w-full bg-transparent hover:bg-black text-black hover:text-[#EDEEE7] border border-black/20 hover:border-black py-4 md:py-5 rounded-full text-[11px] uppercase tracking-[0.35em] md:tracking-[0.5em] font-bold transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-3 cursor-pointer"
                    arrow
                    rollingText
                />

                {/* B2B Credibility Badges */}
                <div className="grid grid-cols-2 gap-3 mt-1">
                    <div className="flex items-center gap-2 px-1">
                        <div className="size-5 rounded-full bg-black/5 flex items-center justify-center">
                            <span className="text-[10px]">✓</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">OEM & ODM</span>
                    </div>
                    <div className="flex items-center gap-2 px-1">
                        <div className="size-5 rounded-full bg-black/5 flex items-center justify-center">
                            <span className="text-[10px]">✓</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Full Customization</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
