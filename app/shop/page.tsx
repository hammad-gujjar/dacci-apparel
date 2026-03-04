import { Category } from "@/models/category.model";
import { databaseConnection } from "@/lib/databseconnection";
import { Product } from "@/models/product.model";
import ShopClient from "../components/ShopClient";

export const metadata = {
    title: "Shop All - Dacci Apparel",
    description: "Explore the latest collections of premium clothing and accessories from Dacci Apparel.",
};

const ShopPage = async () => {
    await databaseConnection();
    
    // Fetch categories and initial products in parallel
    const [categories, products, latestForTags, totalProducts] = await Promise.all([
        Category.find({ deletedAt: null }).lean(),
        Product.find({ deletedAt: null })
            .sort({ createdAt: -1 })
            .limit(20)
            .populate('media', 'secure_url')
            .populate('category', 'name slug')
            .lean(),
        Product.find({ deletedAt: null, tags: { $exists: true, $not: { $size: 0 } } })
            .sort({ createdAt: -1 })
            .limit(4)
            .select('tags')
            .lean(),
        Product.countDocuments({ deletedAt: null })
    ]);

    // Extract one unique tag from each of the latest 4 products
    const brandingTags = Array.from(new Set(
        latestForTags
            .map((p: any) => p.tags?.[0])
            .filter(Boolean)
    ));

    const serializedCategories = JSON.parse(JSON.stringify(categories));
    const serializedProducts = JSON.parse(JSON.stringify(products));
    const serializedBrandingTags = JSON.parse(JSON.stringify(brandingTags));
    const initialMeta = {
        totalProducts,
        totalPages: Math.ceil(totalProducts / 20),
        currentPage: 1,
        limit: 20
    };

    return (
        <ShopClient 
            initialCategories={serializedCategories} 
            initialProducts={serializedProducts}
            initialMeta={initialMeta}
            brandingTags={serializedBrandingTags}
        />
    );
};

export default ShopPage;