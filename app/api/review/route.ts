import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { Review } from "@/models/review.model";
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
            matchQuery['$or'] = [
                { 'productData.title': { $regex: globalFilter, $options: 'i' } },
                { 'userData.name': { $regex: globalFilter, $options: 'i' } },
                { rating: { $regex: globalFilter, $options: 'i' } },
                { title: { $regex: globalFilter, $options: 'i' } },
                { review: { $regex: globalFilter, $options: 'i' } },
            ];
        }

        // column filtration
        filters.forEach((filter: any) => {
            if (filter.id === 'product') {
                matchQuery['productData.name'] = { $regex: filter.value, $options: 'i' };
            } else if (filter.id === 'user') {
                matchQuery['userData.name'] = { $regex: filter.value, $options: 'i' };
            } else {
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
        const aggregatePipeline = [
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'productData'
                }
            },
            {
                $unwind: { path: '$productData', preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userData'
                }
            },
            {
                $unwind: { path: '$userData', preserveNullAndEmptyArrays: true }
            },
            { $match: matchQuery },
            { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
            { $skip: start },
            { $limit: size },
            {
                $project: {
                    _id: 1,
                    product: '$productData.name',
                    user: '$userData.name',
                    rating: 1,
                    title: 1,
                    review: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    deletedAt: 1
                }
            }
        ];

        // Execute query
        const getReview = await Review.aggregate(aggregatePipeline);

        // get TotalRowCount
        const totalRowCount = await Review.countDocuments(matchQuery);

        return NextResponse.json({
            success: true,
            data: getReview,
            meta: { totalRowCount }
        });

    } catch (err: any) {
        return NextResponse.json({ success: false, statusCode: err?.code, message: err?.message });
    }
}