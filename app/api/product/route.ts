import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { Product } from "@/models/product.model";
import { NextResponse, NextRequest } from "next/server";

type MatchQuery = Record<string, any>;
type SortQuery = Record<string, any>;

export async function GET(req: NextRequest) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' });
        }

        await databaseConnection();
        const searchParams = req.nextUrl.searchParams;

        // extract query parameters
        const start = parseInt(searchParams.get('start') ?? "0", 10);
        const size = parseInt(searchParams.get('size') ?? "10", 10);
        const filters = JSON.parse(searchParams.get('filters') || '[]');
        const globalFilter = searchParams.get('globalFilter') || '';
        const sorting = JSON.parse(searchParams.get('sorting') || '[]');
        const deleteType = searchParams.get('deleteType') || '';

        // build match query
        let matchQuery: MatchQuery = {};

        if (deleteType === 'SD') {
            matchQuery = { deletedAt: null };
        } else if (deleteType === 'PD') {
            matchQuery = { deletedAt: { $ne: null } };
        }

        // Global search
        if (globalFilter) {
            const orConditions: any[] = [
                { name: { $regex: globalFilter, $options: 'i' } },
                { slug: { $regex: globalFilter, $options: 'i' } },
            ];

            // Check if globalFilter is a valid number
            const numFilter = parseFloat(globalFilter);
            if (!isNaN(numFilter)) {
                orConditions.push({ mrp: numFilter });
                orConditions.push({ sellingPrice: numFilter });
                orConditions.push({ discountPercentage: numFilter });
            }

            matchQuery['$or'] = orConditions;
        }

        // column filtration
        filters.forEach((filter: any) => {
            if (filter && filter.id && filter.value !== undefined) {
                matchQuery[filter.id] = { $regex: filter.value, $options: 'i' };
            }
        });

        // sorting
        const sortQuery: SortQuery = {};
        sorting.forEach((sort: any) => {
            if (sort && sort.id) {
                sortQuery[sort.id] = sort.desc ? -1 : 1;
            }
        });

        // aggregate pipeline
        const aggregatePipeline: any[] = [
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryData'
                }
            },
            {
                $unwind: {
                    path: '$categoryData',
                    preserveNullAndEmptyArrays: true
                }
            },
        ];

        // Handle global search for category name specifically in aggregation
        // We need to separate this because 'categoryData.name' doesn't exist for countDocuments()
        let pipelineMatch = { ...matchQuery };
        if (globalFilter) {
            // If we want to search category name, we must do it inside the pipeline match, 
            // but we CANNOT do it in the matchQuery used for countDocuments.
            // So we'll extend the $or array for the pipeline specifically.
            if (pipelineMatch['$or']) {
                pipelineMatch['$or'] = [
                    ...pipelineMatch['$or'],
                    { 'categoryData.name': { $regex: globalFilter, $options: 'i' } }
                ];
            }
        }

        aggregatePipeline.push({ $match: pipelineMatch });
        aggregatePipeline.push({ $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } });
        aggregatePipeline.push({ $skip: start });
        aggregatePipeline.push({ $limit: size });
        aggregatePipeline.push({
            $project: {
                _id: 1,
                name: 1,
                slug: 1,
                mrp: 1,
                sellingPrice: 1,
                discountPercentage: 1,
                category: '$categoryData.name',
                createdAt: 1,
                updatedAt: 1,
                deletedAt: 1
            }
        });

        // Execute query
        const getProducts = await Product.aggregate(aggregatePipeline);

        // get TotalRowCount - NOTE: This simple countDocuments CANNOT handle filters on 'categoryData.name'
        // If strict accuracy on category name search count is needed, we must use a second aggregation for counting.
        // For now, removing look-up fields from matchQuery to prevent errors.
        const countQuery = { ...matchQuery };
        // We haven't added categoryData.name to matchQuery directly, so it should be safe provided
        // the user hasn't added a column filter for it. If they have, we'd need to clean it.

        // If we really want to support counting with category search, we need this:
        /*
        const countPipeline = [
            { $lookup: ... }, { $unwind: ... }, { $match: pipelineMatch }, { $count: 'total' }
        ];
        */
        // Using simpler count for performance unless category search is active?
        // Let's stick to standard countDocuments but accept that category-name search won't narrow the count accurately without aggregation count.
        // However, to avoid "0" total when searching category, usually one should use aggregation count.

        let totalRowCount = 0;
        // Check if we are searching on a lookup field via global filter
        const isSearchingCategory = globalFilter && getProducts.length > 0; // heuristic check

        if (globalFilter) {
            // Use aggregation to count if global search is on, to cover categoryData.name
            const countPipeline = [
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'categoryData'
                    }
                },
                {
                    $unwind: {
                        path: '$categoryData',
                        preserveNullAndEmptyArrays: true
                    }
                },
                { $match: pipelineMatch },
                { $count: 'total' }
            ];
            const countResult = await Product.aggregate(countPipeline);
            totalRowCount = countResult.length > 0 ? countResult[0].total : 0;
        } else {
            totalRowCount = await Product.countDocuments(matchQuery);
        }

        return NextResponse.json({
            success: true,
            data: getProducts,
            meta: { totalRowCount }
        });

    } catch (err: any) {
        return NextResponse.json({ success: false, statusCode: err?.code, message: err?.message });
    }
}