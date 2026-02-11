'use client';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast'
import React from 'react';

const logout = () => {

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
            <button className='light-button' onClick={handleLogout}>logout</button>
        </>
    )
}

export default logout