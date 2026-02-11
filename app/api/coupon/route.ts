import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { Coupon } from "@/models/Coupon.model";
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
                { code: { $regex: globalFilter, $options: 'i' } },
                { validity: { $regex: globalFilter, $options: 'i' } },
                {
                    $expr: {
                        $regexMatch: {
                            input: { $toString: "$minShoppingAmount" },
                            $regex: globalFilter,
                            $options: 'i',
                        }
                    }
                },
                {
                    $expr: {
                        $regexMatch: {
                            input: { $toString: "$discountPercentage" },
                            $regex: globalFilter,
                            $options: 'i',
                        }
                    }
                }
            ];
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
        const aggregatePipeline = [
            { $match: matchQuery },
            { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
            { $skip: start },
            { $limit: size },
            {
                $project: {
                    _id: 1,
                    code: 1,
                    discountPercentage: 1,
                    minShoppingAmount: 1,
                    validity: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    deletedAt: 1
                }
            }
        ];

        // Execute query
        const getCoupon = await Coupon.aggregate(aggregatePipeline);

        // get TotalRowCount
        const totalRowCount = await Coupon.countDocuments(matchQuery);

        return NextResponse.json({
            success: true,
            data: getCoupon,
            meta: { totalRowCount }
        });

    } catch (err: any) {
        return NextResponse.json({ success: false, statusCode: err?.code, message: err?.message });
    }
}