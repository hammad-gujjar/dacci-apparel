'use client';

import Heading from '@/app/components/Heading';
import Icon from '@/app/components/Icon';

interface ProductInfoProps {
    product: any;
    selectedVariant: any;
    handleVariantSelect: (v: any) => void;
    currentPrice: number;
    currentMrp: number;
    renderStars: (rating: number, size?: string) => React.ReactNode[];
}

const ProductInfo = ({
    product,
    selectedVariant,
    handleVariantSelect,
    currentPrice,
    currentMrp,
    renderStars
}: ProductInfoProps) => {
    return (
        <div className="w-full lg:w-[40%] flex flex-col gap-5 lg:sticky h-fit product-info-section">
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                    <p className="text-black/40 uppercase font-bold">{product.category?.name || 'Collection'}</p>
                    <span className="size-1 rounded-full bg-black/20" />
                    <p className="text-black/40 uppercase font-bold italic">{product.productType}</p>
                </div>
                <Heading title={product.name} className="text-left" />
                
                {/* Short Rating */}
                <div className="flex items-center gap-6 py-2 border-b border-black/5 pb-8">
                    <div className="flex items-center gap-1">
                        {renderStars(product.averageRating || 0, "text-lg")}
                    </div>
                    <p className="uppercase font-bold opacity-30 hover:opacity-100 transition-opacity cursor-pointer underline underline-offset-4">
                        {product.reviews?.length || 0} Verified Reviews
                    </p>
                </div>
            </div>

            {/* Price & Shipping */}
            <div className="flex flex-col gap-2">
                <div className="flex items-end gap-5">
                    <span className="text-5xl font-bold tracking-tighter">₹{currentPrice.toLocaleString()}</span>
                    {currentMrp > currentPrice && (
                        <span className="text-2xl text-black/20 line-through mb-1 font-medium italic">₹{currentMrp.toLocaleString()}</span>
                    )}
                </div>
                <p className="uppercase font-bold text-green-600/60">Taxes Included • Express Delivery Available</p>
            </div>

            {/* Variants Selection */}
            <div className="flex flex-col gap-10">
                {/* Colors */}
                {[...new Set(product.variants?.map((v: any) => v.color))].length > 0 && (
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase font-bold tracking-[0.4em] opacity-40">Choose Color</span>
                            <span className="text-[10px] font-bold opacity-20">{selectedVariant?.color}</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {[...new Set(product.variants.map((v: any) => v.color))].map((color: any) => {
                                const v = product.variants.find((v: any) => v.color === color);
                                return (
                                    <button 
                                        key={color}
                                        onClick={() => handleVariantSelect(v)}
                                        className={`px-7 py-4 text-[10px] uppercase tracking-[0.3em] border transition-all rounded-full font-bold relative overflow-hidden group ${
                                            selectedVariant?.color === color 
                                                ? "bg-black text-white border-black shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] scale-105" 
                                                : "bg-white/40 text-black border-black/5 hover:border-black backdrop-blur-md"
                                        }`}
                                    >
                                        <span className="relative z-10">{color}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Sizes */}
                {product.variants?.filter((v: any) => v.color === selectedVariant?.color).length > 0 && (
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase font-bold tracking-[0.4em] opacity-40">Select Size</span>
                            <span className="text-[10px] font-bold opacity-20 underline cursor-pointer">Size Guide</span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {product.variants
                                .filter((v: any) => v.color === selectedVariant?.color)
                                .sort((a: any, b: any) => a.size.localeCompare(b.size))
                                .map((v: any) => (
                                    <button 
                                        key={v.size}
                                        onClick={() => handleVariantSelect(v)}
                                        className={`size-16 flex items-center justify-center text-[11px] font-bold border transition-all rounded-full tracking-widest ${
                                            selectedVariant?.size === v.size 
                                                ? "bg-black text-white border-black shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)] scale-110" 
                                                : "bg-white/40 text-black border-black/5 hover:border-black backdrop-blur-md"
                                        }`}
                                    >
                                        {v.size}
                                    </button>
                                ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-5 mt-4">
                <h3 className="uppercase font-bold tracking-[0.4em] opacity-40">Story behind the craft</h3>
                <p className="text-base leading-relaxed text-black/60 font-medium">
                    {product.description}
                </p>
            </div>

            {/* Final CTA Area */}
            <div className="flex flex-col gap-6 mt-8">
                <button className="w-full bg-black text-[#EDEEE7] py-8 rounded-full text-[11px] uppercase tracking-[0.6em] font-bold hover:opacity-90 transition-all hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] active:scale-[0.97] flex items-center justify-center gap-4 cursor-pointer">
                    <span>Add to Wardrobe</span>
                    <Icon name="arrow" className="-rotate-45deg scale-75" />
                </button>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/30 rounded-2xl backdrop-blur-sm border border-black/5 flex flex-col gap-1">
                        <span className="text-[9px] uppercase tracking-widest font-bold opacity-30">Authenticity</span>
                        <span className="text-[10px] font-bold italic">100% Genuine</span>
                    </div>
                    <div className="p-4 bg-white/30 rounded-2xl backdrop-blur-sm border border-black/5 flex flex-col gap-1">
                        <span className="text-[9px] uppercase tracking-widest font-bold opacity-30">Returns</span>
                        <span className="text-[10px] font-bold italic">7-Day Exchange</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
