import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { ProductVariant } from "@/models/productVariant.model";
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
                { color: { $regex: globalFilter, $options: 'i' } },
                { size: { $regex: globalFilter, $options: 'i' } },
                { sku: { $regex: globalFilter, $options: 'i' } },
                { 'productData.name': { $regex: globalFilter, $options: 'i' } },
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
            if (filter.id === 'mrp' && filter.id === 'sellingPrice' && filter.id === 'discountPercentage') {
                matchQuery[filter.id] = Number(filter.value)
            } else if (filter.id === 'product') {
                matchQuery['productData.name'] = { $regex: filter.value, $options: 'i' }
            } else {
                matchQuery[filter.id] = { $regex: filter.value, $options: 'i' }
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
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'productData'
                }
            },
            {
                $unwind: {
                    path: '$productData',
                    preserveNullAndEmptyArrays: true
                }
            },
        ];

        let pipelineMatch = { ...matchQuery };
        if (globalFilter) {
            if (pipelineMatch['$or']) {
                pipelineMatch['$or'] = [
                    ...pipelineMatch['$or'],
                    { 'productData.name': { $regex: globalFilter, $options: 'i' } }
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
                product: '$productData.name',
                color: 1,
                size: 1,
                sku: 1,
                mrp: 1,
                sellingPrice: 1,
                discountPercentage: 1,
                createdAt: 1,
                updatedAt: 1,
                deletedAt: 1
            }
        });

        // Execute query
        const getVariant = await ProductVariant.aggregate(aggregatePipeline);

        const countQuery = { ...matchQuery };
        let totalRowCount = 0;
        const isSearchingCategory = globalFilter && getVariant.length > 0;

        if (globalFilter) {
            const countPipeline = [
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product',
                        foreignField: '_id',
                        as: 'productData'
                    }
                },
                {
                    $unwind: {
                        path: '$productData',
                        preserveNullAndEmptyArrays: true
                    }
                },
                { $match: pipelineMatch },
                { $count: 'total' }
            ];
            const countResult = await ProductVariant.aggregate(countPipeline);
            totalRowCount = countResult.length > 0 ? countResult[0].total : 0;
        } else {
            totalRowCount = await ProductVariant.countDocuments(matchQuery);
        }

        return NextResponse.json({
            success: true,
            data: getVariant,
            meta: { totalRowCount }
        });

    } catch (err: any) {
        return NextResponse.json({ success: false, statusCode: err?.code, message: err?.message });
    }
}