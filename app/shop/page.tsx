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
    const [categories, products, totalProducts] = await Promise.all([
        Category.find({ deletedAt: null }).lean(),
        Product.find({ deletedAt: null })
            .sort({ createdAt: -1 })
            .limit(20)
            .populate('media', 'secure_url')
            .populate('category', 'name slug')
            .lean(),
        Product.countDocuments({ deletedAt: null })
    ]);

    const serializedCategories = JSON.parse(JSON.stringify(categories));
    const serializedProducts = JSON.parse(JSON.stringify(products));
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
        />
    );
};

export default ShopPage;