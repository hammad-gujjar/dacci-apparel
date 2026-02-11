import { Media } from '@/models/Media.model';
import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' })
        }

        await databaseConnection()

        const searchParams = req.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '0', 10) || 0
        const limit = parseInt(searchParams.get('limit') || '0', 10) || 10
        const deleteType = searchParams.get('deleteType')

        // SD=> soft delete RSD=> restore soft delete PD=> permanent delete

        let filter = {}
        if (deleteType === 'SD') {
            filter = { deletedAt: null }
        } else if (deleteType === 'PD') {
            filter = { deletedAt: { $ne: null } }
        }


        const mediaData = await Media.find(filter).sort({ createdAt: -1 }).skip(page * limit).limit(limit).lean()
        const totalMedia = await Media.countDocuments(filter)

        return NextResponse.json({
            mediaData: mediaData,
            hasMore: ((page + 1) * limit) < totalMedia
        })

    } catch (error) {
        console.error(error)
    }
}