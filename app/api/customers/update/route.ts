import { adminAuth } from "@/lib/adminhelperfunction";
import { auth } from "@/lib/auth"; // server-side auth
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(req: Request) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' })
        }

        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
        }

        const body = await req.json();
        const { name, phone, image } = body;

        // Create dedicated connection to USERS database
        const userConnection = await mongoose.createConnection(
            process.env.MONGODB_URL!,
            { dbName: "USERS" }
        ).asPromise();

        const { User } = await import("@/models/User.model");
        const UserModel = userConnection.model('User', User.schema, 'user');

        // Update the user
        const updatedUser = await UserModel.findByIdAndUpdate(
            session.user.id,
            {
                name,
                phone,
                image
            },
            { new: true }
        );

        if (!updatedUser) {
            await userConnection.close();
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }

        await userConnection.close();
        return NextResponse.json({ message: "Profile updated successfully", user: updatedUser, success: true });

    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}
