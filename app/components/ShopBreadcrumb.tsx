'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ShopBreadcrumb = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const type = searchParams.get('type');

    return (
        <nav className="w-full py-8 text-black/40 text-[10px] uppercase font-bold tracking-[0.3em] flex items-center gap-2">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className={`hover:text-black transition-colors ${!category ? 'text-black' : ''}`}>Shop</Link>
            
            {category && (
                <>
                    <span>/</span>
                    <Link href={`/shop?category=${category}`} className={`hover:text-black transition-colors ${!type ? 'text-black' : ''}`}>
                        {category.replace('-', ' ')}
                    </Link>
                </>
            )}

            {type && (
                <>
                    <span>/</span>
                    <span className="text-black">{type}</span>
                </>
            )}
        </nav>
    );
};

export default ShopBreadcrumb;
