'use client';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import ProductItem from './ProductItem';
import ShopHero from './ShopHero';
import ShopFilters from './ShopFilters';
import ShopBreadcrumb from './ShopBreadcrumb';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ShopClient = ({ 
    initialCategories, 
    initialProducts, 
    initialMeta 
}: { 
    initialCategories: any[],
    initialProducts: any[],
    initialMeta: any
}) => {
    const [products, setProducts] = useState<any[]>(initialProducts);
    const [loading, setLoading] = useState(false); // Start as false since we have initial data
    const [meta, setMeta] = useState<any>(initialMeta);
    const searchParams = useSearchParams();
    const router = useRouter();
    const gridRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);

    const category = searchParams.get('category') || '';
    const type = searchParams.get('type') || '';
    const tags = searchParams.get('tags') || '';
    const page = searchParams.get('page') || '1';

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/public/products', {
                params: { category, type, tags, page, limit: 20 }
            });
            if (data.success) {
                setProducts(data.data);
                setMeta(data.meta);
            }
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Skip fetch on first render if no filters are present
        if (isFirstRender.current) {
            isFirstRender.current = false;
            if (!category && !type && !tags && page === '1') {
                return;
            }
        }
        fetchProducts();
    }, [category, type, tags, page]);

    useGSAP(() => {
        if (!loading && products.length > 0) {
            gsap.fromTo('.shop-product-card', 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power2.out" }
            );
        }
    }, { dependencies: [loading, products] });

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`/shop?${params.toString()}`);
    };

    return (
        <div className="w-full min-h-screen bg-[#EDEEE7] flex flex-col text-black">
            <ShopHero />
            
            <div className="px-5 md:px-10">
                <ShopBreadcrumb />
                
                <div className="flex flex-col lg:flex-row gap-10 py-10">
                    {/* Sidebar Filters */}
                    <ShopFilters categories={initialCategories} />

                    {/* Main Content Area */}
                    <main className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                            <div className="flex flex-col gap-1">
                                <p className="text-black/40 uppercase tracking-widest font-bold">
                                    Displaying {products.length} of {meta.totalProducts || 0} Products
                                </p>
                                <h2 className="text-black text-4xl md:text-5xl font-[main] uppercase tracking-tighter">
                                    {category ? category.replace('-', ' ') : 'All Collections'}
                                </h2>
                            </div>
                        </div>

                        {loading ? (
                            <div className="w-full h-[50vh] flex items-center justify-center">
                                <div className="text-black/20 animate-pulse uppercase tracking-[0.5em] text-[10px] font-bold">Scanning Catalog...</div>
                            </div>
                        ) : products.length > 0 ? (
                            <>
                                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                                    {products.map((product) => (
                                        <div key={product._id} className="shop-product-card">
                                            <ProductItem product={product} />
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {meta.totalPages > 1 && (
                                    <div className="mt-24 flex justify-center items-center gap-3">
                                        {[...Array(meta.totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handlePageChange(i + 1)}
                                                className={`size-12 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                                                    meta.currentPage === i + 1
                                                    ? 'bg-black text-white border-black'
                                                    : 'text-black/40 border-black/10 hover:border-black'
                                                }`}
                                            >
                                                {String(i + 1).padStart(2, '0')}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="w-full h-[50vh] flex items-center justify-center flex-col gap-6 bg-black/5 rounded-[2vw]">
                                <p className="text-black/40 uppercase tracking-widest text-[10px] font-bold">No items match your criteria.</p>
                                <button 
                                    onClick={() => router.push('/shop')}
                                    className="px-8 py-3 bg-black text-white text-[10px] uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
                                >
                                    View All Products
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Informative Section - KEEP DARK */}
            <section className="bg-black py-32 px-5 md:px-10 border-t border-[#EDEEE7]/10 mt-24">
                <div className="max-w-5xl mx-auto flex flex-col gap-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                        <div className="flex flex-col gap-6 max-w-2xl">
                             <span className="text-[#EDEEE7]/30 text-[10px] uppercase font-bold tracking-[0.5em]">Vision of Excellence</span>
                             <h3 className="text-[#EDEEE7] text-4xl md:text-7xl font-[main] uppercase tracking-tighter leading-none">
                                Uncompromising <br /> Quality Control.
                             </h3>
                        </div>
                        <p className="text-[#EDEEE7]/50 text-base font-light leading-relaxed max-w-sm">
                            Behind every Dacci garment lies a rigorous process of selection and refinement. We don't just follow trends; we set the standard for durability and aesthetic longevity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-[#EDEEE7]/10 border border-[#EDEEE7]/10 rounded-[1.5vw] overflow-hidden mt-10">
                        {[
                            { title: "Sourcing", desc: "Italian silks and Egyptian cottons selected for their tactile superiority." },
                            { title: "Technique", desc: "Bespoke tailoring methods infused with modern precision technology." },
                            { title: "Service", desc: "A lifetime commitment to the maintenance of your Dacci collection." }
                        ].map((item, i) => (
                            <div key={i} className="bg-black p-10 flex flex-col gap-4 group hover:bg-[#EDEEE7]/5 transition-colors duration-500">
                                <span className="text-[#EDEEE7] text-2xl font-[main] uppercase tracking-tight">{item.title}</span>
                                <p className="text-[#EDEEE7]/40 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShopClient;
