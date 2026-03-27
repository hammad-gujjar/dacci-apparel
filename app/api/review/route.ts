import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection, userdatabaseConnection } from "@/lib/database";
import { Review } from "@/models/review.model";
import { User } from "@/models/User.model";
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
        await userdatabaseConnection();

        const searchParams = req.nextUrl.searchParams;

        // extract query parameters
        const start = parseInt(searchParams.get('start') ?? "0", 10);
        const size = parseInt(searchParams.get('size') ?? "10", 10);
        const filters = JSON.parse(searchParams.get('filters') || '[]');
        const globalFilter = searchParams.get('globalFilter') || '';
        const sorting = JSON.parse(searchParams.get('sorting') || '[]');
        const deleteType = searchParams.get('deleteType') || '';

        // Pre-fetch users if filtering by user name
        let matchingUserIds: any[] = [];
        const userFilter = filters.find((f: any) => f.id === 'user')?.value;
        if (globalFilter || userFilter) {
            const userQuery: any = { $or: [] };
            if (globalFilter) userQuery.$or.push({ name: { $regex: globalFilter, $options: 'i' } });
            if (userFilter) userQuery.$or.push({ name: { $regex: userFilter, $options: 'i' } });
            
            const matchedUsers = await User.find(userQuery, '_id').lean();
            matchingUserIds = matchedUsers.map((u: any) => u._id);
        }

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
                { title: { $regex: globalFilter, $options: 'i' } },
                { review: { $regex: globalFilter, $options: 'i' } }
            ];
            
            // If the global filter looks like a number, search ratings too
            if (!isNaN(Number(globalFilter))) {
                matchQuery['$or'].push({ rating: Number(globalFilter) });
            }

            if (matchingUserIds.length > 0) {
                matchQuery['$or'].push({ user: { $in: matchingUserIds } });
            }
        }

        // column filtration
        filters.forEach((filter: any) => {
            if (filter.id === 'product') {
                matchQuery['productData.name'] = { $regex: filter.value, $options: 'i' };
            } else if (filter.id === 'user') {
                if (matchingUserIds.length > 0) {
                    matchQuery['user'] = { $in: matchingUserIds };
                } else {
                    // Force no results if they searched a user that doesn't exist
                    matchQuery['user'] = null; 
                }
            } else {
                matchQuery[filter.id] = { $regex: filter.value, $options: 'i' };
            }
        });

        // sorting
        const sortQuery: SortQuery = {};
        sorting.forEach((sort: any) => {
            if (sort && sort.id) {
                // If sorting by user, we can only sort by user ID currently due to cross-db constraints
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
            { $match: matchQuery },
            { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
            { $skip: start },
            { $limit: size },
            {
                $project: {
                    _id: 1,
                    product: '$productData.name',
                    user: 1, // keeping raw user ID to map manually
                    rating: 1,
                    title: 1,
                    review: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    deletedAt: 1
                }
            }
        ];

        // Execute queries
        const rawReviews = await Review.aggregate(aggregatePipeline);
        
        // Accurate total count matching the pipeline exactly
        const countPipeline = [
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'productData'
                }
            },
            { $unwind: { path: '$productData', preserveNullAndEmptyArrays: true } },
            { $match: matchQuery },
            { $count: 'total' }
        ];
        const countResult = await Review.aggregate(countPipeline);
        const totalRowCount = countResult.length > 0 ? countResult[0].total : 0;

        // Manually attach user data
        const finalUserIds = rawReviews.map((r: any) => r.user).filter(Boolean);
        const finalUsers = await User.find({ _id: { $in: finalUserIds } }, 'name').lean();

        const getReview = rawReviews.map((rev: any) => {
            const u = finalUsers.find((user: any) => user._id.toString() === rev.user?.toString());
            return {
                ...rev,
                user: u ? u.name : 'Unknown User'
            };
        });

        return NextResponse.json({
            success: true,
            data: getReview,
            meta: { totalRowCount }
        });

    } catch (err: any) {
        console.error('Admin API Review error:', err);
        return NextResponse.json({ success: false, statusCode: err?.code || 500, message: err?.message || 'Internal Server Error' });
    }
}