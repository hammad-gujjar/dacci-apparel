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
                if (type) {
                    query.$or = [
                        { category: foundCategory._id, productType: type },
                        { productCategoryAssignments: { $elemMatch: { category: foundCategory._id, subcategory: type, assignmentType: 'specific' } } },
                        { productCategoryAssignments: { $elemMatch: { subcategory: type, assignmentType: 'all' } } }
                    ];
                } else {
                    query.$or = [
                        { category: foundCategory._id },
                        { productCategoryAssignments: { $elemMatch: { category: foundCategory._id, assignmentType: 'specific' } } },
                        { productCategoryAssignments: { $elemMatch: { subcategory: { $in: foundCategory.types }, assignmentType: 'all' } } }
                    ];
                }
            } else {
                const catLower = category.toLowerCase();
                const b2bCategoryKeywords: Record<string, RegExp> = {
                    'teamwear': /team|polo|jersey|uniform|t-shirt|shirt|hoodie|shorts|cap/i,
                    'golfwear': /golf|glove|polo|sleeve|towel|skirt/i,
                    'fitness-apparel': /fitness|gym|tank|compression|short/i,
                    'activewear': /active|hoodie|short|tank|tee|shirt|running/i,
                    'running-wear': /running|run|tank|tee|short|compression/i,
                    'training-wear': /training|train|compression|gym|hoodie|short/i,
                };
                const regex = b2bCategoryKeywords[catLower] || new RegExp(category.replace(/-/g, ' '), 'i');
                if (type) {
                    query.$and = [
                        { $or: [{ name: { $regex: regex } }, { tags: { $regex: regex } }, { productType: { $regex: regex } }] },
                        { $or: [{ productType: type }, { productCategoryAssignments: { $elemMatch: { subcategory: type } } }] }
                    ];
                } else {
                    query.$or = [
                        { name: { $regex: regex } },
                        { tags: { $regex: regex } },
                        { productType: { $regex: regex } }
                    ];
                }
            }
        } else if (type) {
            query.$or = [
                { productType: type },
                { productCategoryAssignments: { $elemMatch: { subcategory: type } } }
            ];
        }

        if (onSale) {
            query.discountPercentage = { $gt: 0 };
        }

        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
            const tagConditions = tagArray.map(t => {
                const tLower = t.toLowerCase();
                if (tLower === 'sublimation') return { $or: [{ tags: { $regex: /sublima|print|color|pattern/i } }, { name: { $regex: /sublima|print/i } }] };
                if (tLower === 'embroidery') return { $or: [{ tags: { $regex: /embroider|stitch|cap/i } }, { name: { $regex: /embroider|cap/i } }] };
                if (tLower === 'screen printing') return { $or: [{ tags: { $regex: /print|screen/i } }, { name: { $regex: /print/i } }] };
                if (tLower === 'private label') return { $or: [{ tags: { $regex: /label|custom|oem|basic/i } }, { name: { $regex: /custom|oem/i } }] };
                return { tags: { $regex: new RegExp(t, 'i') } };
            });

            if (query.$or) {
                query.$and = [{ $or: query.$or }, { $or: tagConditions }];
                delete query.$or;
            } else {
                query.$or = tagConditions;
            }
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

        const response = NextResponse.json({
            success: true,
            data: products,
            meta: {
                totalProducts,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: page,
                limit
            }
        });
        response.headers.set(
            'Cache-Control',
            'public, s-maxage=300, stale-while-revalidate=600'
        );
        return response;

    } catch (err: any) {
        return NextResponse.json({ success: false, message: err?.message || "Failed to fetch products" }, { status: 500 });
    }
}
