import { NextResponse } from "next/server";
import { userdatabaseConnection } from "@/lib/database";
import { User } from "@/models/User.model";

export async function GET() {
    try {
        await userdatabaseConnection();

        // Get total user count AND first 3 user avatars in parallel
        const [totalCount, users] = await Promise.all([
            User.countDocuments(),
            User.find({}, 'name image')
                .sort({ createdAt: -1 })
                .limit(3)
                .lean()
        ]);

        return NextResponse.json({
            success: true,
            data: { users, totalCount }
        });
    } catch (err: any) {
        console.error('Public Users API error:', err);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}