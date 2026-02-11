import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import SideBar from "./components/SideBar";
import Topbar from "./components/Topbar";
import ThemeProvider from "./components/ThemeProvider";
import { adminAuth } from "@/lib/adminhelperfunction";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const isAdmin = await adminAuth();

    if (!isAdmin || !isAdmin.role) {
        // Optionally, redirect or handle unauthorized access here
        redirect("/");
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider className='mt-14'>
                <SideBar />
                <main className="w-full md:w-[calc(100%-16rem)] min-h-screen relative">
                    <div className="p-5 min-h-[calc(100vh-96px)] w-full">
                        <Topbar />
                        {children}
                    </div>

                    <div className='border-t h-10 flex items-center justify-center'>
                        @2026 Dacci Apparel Admin Panel
                    </div>

                </main>
            </SidebarProvider>
        </ThemeProvider>
    )
}