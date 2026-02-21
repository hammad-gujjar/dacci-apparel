import { databaseConnection } from "@/lib/databseconnection";
import { Product } from "@/models/product.model";
import { Category } from "@/models/category.model";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await databaseConnection();
        const { searchParams } = req.nextUrl;

        const category = searchParams.get('category'); // Slug
        const type = searchParams.get('type');
        const tags = searchParams.get('tags');
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

        if (type) {
            query.productType = type;
        }

        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim());
            query.tags = { $in: tagArray };
        }

        const [products, totalProducts] = await Promise.all([
            Product.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('media', 'secure_url')
                .populate('category', 'name slug')
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
