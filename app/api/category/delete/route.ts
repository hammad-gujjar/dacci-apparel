import { adminAuth } from "@/lib/adminhelperfunction";
import { databaseConnection } from "@/lib/databseconnection";
import { NextResponse } from "next/server";
import { Category } from '@/models/category.model'

export async function PUT(req: Request) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' })
        }
        await databaseConnection()
        const payload = await req.json()
        const ids = payload.ids || []
        const deleteType = payload.deleteType

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ success: false, statusCode: 400, message: 'Empty Sellection.' })
        }

        const category = await Category.find({ _id: { $in: ids } }).lean()
        if (!category.length) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'Data not found.' })
        }

        if (!['SD', 'RSD'].includes(deleteType)) {
            return NextResponse.json({ success: false, statusCode: 404, message: 'Invalid delete operation.' })
        }

        if (deleteType === 'SD') {
            await Category.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: new Date().toISOString() } })
        } else {
            await Category.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: null } })
        }

        return NextResponse.json({ success: true, statusCode: 200, message: deleteType === 'SD' ? 'Data moved to trash' : 'Data restored.' })

    } catch (error: any) {
        return NextResponse.json({ success: false, statusCode: error.code, message: (`api error ${error.message}`) })
    }
}

export async function DELETE(req: Request) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({
                success: false,
                statusCode: 403,
                message: 'Unauthorized.',
            });
        }

        await databaseConnection();

        const payload = await req.json();
        const ids: string[] = payload.ids || [];
        const deleteType = payload.deleteType;

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({
                success: false,
                statusCode: 400,
                message: 'Empty selection.',
            });
        }

        if (deleteType !== 'PD') {
            return NextResponse.json({
                success: false,
                statusCode: 400,
                message: 'Invalid delete operation.',
            });
        }

        // 1️⃣ Get Category first
        const category = await Category.find({ _id: { $in: ids } }).lean();
        if (!category.length) {
            return NextResponse.json({
                success: false,
                statusCode: 404,
                message: 'Data not found.',
            });
        }

        // 4️⃣ Only now delete from database
        await Category.deleteMany({ _id: { $in: ids } });

        return NextResponse.json({
            success: true,
            statusCode: 200,
            message: 'Data deleted permanently.',
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            statusCode: error.code || 500,
            message: `api error ${error.message}`,
        });
    }
}