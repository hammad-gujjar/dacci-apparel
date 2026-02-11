import { adminAuth } from "@/lib/adminhelperfunction";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const isAdmin = await adminAuth()

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    if (session && session.user.emailVerified && isAdmin.role) {
        return redirect("/admin/dashboard");
    } else if (session && session.user.emailVerified) {
        return redirect("/dashboard");
    }

    return (
        <div>
            {children}
        </div>
    )
}
