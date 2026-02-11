import { adminAuth } from "@/lib/adminhelperfunction";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

type MatchQuery = Record<string, any>;
type SortQuery = Record<string, any>;

export async function GET(req: NextRequest) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' });
        }

        // Create dedicated connection to USERS database
        const userConnection = await mongoose.createConnection(
            process.env.MONGODB_URL!,
            { dbName: "USERS" }
        ).asPromise();

        // Import User model
        const { User } = await import("@/models/User.model");
        
        // Get User model bound to USERS database
        const UserModel = userConnection.model('User', User.schema, 'user');

        const searchParams = req.nextUrl.searchParams;

        // extract query parameters
        const start = parseInt(searchParams.get('start') ?? "0", 10);
        const size = parseInt(searchParams.get('size') ?? "10", 10);
        const filters = JSON.parse(searchParams.get('filters') || '[]');
        const globalFilter = searchParams.get('globalFilter') || '';
        const sorting = JSON.parse(searchParams.get('sorting') || '[]');

        // build match query
        let matchQuery: MatchQuery = {};

        // Global search
        if (globalFilter) {
            matchQuery['$or'] = [
                { name: { $regex: globalFilter, $options: 'i' } },
                { email: { $regex: globalFilter, $options: 'i' } },
                {
                    $expr: {
                        $regexMatch: {
                            input: { $toString: "$phone" },
                            regex: globalFilter,
                            options: 'i',
                        }
                    }
                }
            ];
        }

        // column filtration
        filters.forEach((filter: any) => {
            if (filter && filter.id && filter.value !== undefined) {
                if (filter.id === 'phone') {
                    matchQuery[filter.id] = parseInt(filter.value);
                } else {
                    matchQuery[filter.id] = { $regex: filter.value, $options: 'i' };
                }
            }
        });

        // sorting
        const sortQuery: SortQuery = {};
        sorting.forEach((sort: any) => {
            if (sort && sort.id) {
                sortQuery[sort.id] = sort.desc ? -1 : 1;
            }
        });

        // Default sort
        if (Object.keys(sortQuery).length === 0) {
            sortQuery['createdAt'] = -1;
        }

        // Execute query
        const getUsers = await UserModel.find(matchQuery)
            .sort(sortQuery)
            .skip(start)
            .limit(size)
            .lean();

        // get TotalRowCount
        const totalRowCount = await UserModel.countDocuments(matchQuery);

        // Close connection
        await userConnection.close();

        return NextResponse.json({
            success: true,
            data: getUsers,
            meta: { totalRowCount }
        });

    } catch (err: any) {
        console.error('Customers API error:', err);
        return NextResponse.json({ success: false, statusCode: 500, message: err?.message || 'Internal Server Error' });
    }
}
