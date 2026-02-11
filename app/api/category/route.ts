import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { Category } from "@/models/category.model";
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
                { name: { $regex: globalFilter, $options: 'i' } },
                { slug: { $regex: globalFilter, $options: 'i' } },
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
                    types: 1,
                    name: 1,
                    slug: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    deletedAt: 1
                }
            }
        ];

        // Execute query
        const getCategory = await Category.aggregate(aggregatePipeline);

        // get TotalRowCount
        const totalRowCount = await Category.countDocuments(matchQuery);

        return NextResponse.json({
            success: true,
            data: getCategory,
            meta: { totalRowCount }
        });

    } catch (err: any) {
        return NextResponse.json({ success: false, statusCode: err?.code, message: err?.message });
    }
}