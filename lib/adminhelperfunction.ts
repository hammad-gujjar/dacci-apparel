import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type AdminAuthResponse = {
    role: boolean;
    message?: string;
};

export const adminAuth = async (): Promise<AdminAuthResponse> => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // ❌ Not logged in
    if (!session || !session.user || !session.user.emailVerified) {
        return {
            role: false,
            message: "You must be logged in for this action.",
        };
    }

    // ❌ Not admin
    if (session.user.email !== process.env.ADMIN_EMAIL) {
        return {
            role: false,
            message: "You are not authorized to perform this action.",
        };
    }

    // ✅ Admin
    return {
        role: true,
    };
};