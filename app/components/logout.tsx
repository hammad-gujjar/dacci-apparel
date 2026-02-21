'use client';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast'

const logout = ({ className }: { className?: string }) => {

    async function handleLogout() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logged out successfully");
                    redirect("/auth/signin");
                },
            },
        });
    }

    return (
        <>
            <button className={className || ''} onClick={handleLogout}>logout</button>
        </>
    )
}

export default logout