import { databaseConnection } from "@/lib/database";
import { Product } from "@/models/product.model";
import { Category } from "@/models/category.model";
import { Media } from "@/models/Media.model";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await databaseConnection();
        const { searchParams } = req.nextUrl;

        const category = searchParams.get('category'); // Slug
        const type = searchParams.get('type');
        const tags = searchParams.get('tags');
        const searchQuery = searchParams.get('searchQuery');
        const sort = searchParams.get('sort') || 'newest';
        const onSale = searchParams.get('onSale') === 'true';
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '20', 10);
        const skip = (page - 1) * limit;

        const query: any = { deletedAt: null };

        if (category) {
            const foundCategory = await Category.findOne({ slug: category });
            if (foundCategory) {
                query.category = foundCategory._id;
            }
        }

        if (onSale) {
            query.discountPercentage = { $gt: 0 };
        }

        if (type) {
            query.productType = type;
        }

        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim());
            query.tags = { $in: tagArray };
        }

        if (searchQuery) {
            query.name = { $regex: searchQuery, $options: 'i' };
        }

        // Sorting Logic
        let sortOption: any = { createdAt: -1 };
        if (sort === 'price-asc') sortOption = { sellingPrice: 1 };
        else if (sort === 'price-desc') sortOption = { sellingPrice: -1 };
        else if (sort === 'sale-desc') sortOption = { discountPercentage: -1 };

        const [products, totalProducts] = await Promise.all([
            Product.find(query)
                .sort(sortOption)
                .skip(skip)
                .limit(limit)
                .populate({ path: 'media', model: Media, select: 'secure_url' })
                .populate({ path: 'category', model: Category, select: 'name slug' })
                .lean(),
            Product.countDocuments(query)
        ]);

        return NextResponse.json({
            success: true,
            data: products,
            meta: {
                totalProducts,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: page,
                limit
            }
        });

    } catch (err: any) {
        return NextResponse.json({ success: false, message: err?.message || "Failed to fetch products" }, { status: 500 });
    }
}
