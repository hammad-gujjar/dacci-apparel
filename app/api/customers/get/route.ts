import { adminAuth } from "@/lib/adminhelperfunction";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' })
        }

        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ success: false, statusCode: 401, message: 'Unauthorized.' });
        }

        // Create dedicated connection to USERS database
        const userConnection = await mongoose.createConnection(
            process.env.MONGODB_URL!,
            { dbName: "USERS" }
        ).asPromise();

        const { User } = await import("@/models/User.model");
        const UserModel = userConnection.model('User', User.schema, 'user');

        const user = await UserModel.findById(session?.user?.id).lean();

        if (!user) {
            await userConnection.close();
            return NextResponse.json({ success: false, statusCode: 404, message: 'User not found.' });
        }

        await userConnection.close();
        return NextResponse.json({ success: true, data: user });

    } catch (error) {
        console.error('Get customer error:', error);
        return NextResponse.json({ success: false, statusCode: 500, message: 'Internal Server Error' });
    }
}