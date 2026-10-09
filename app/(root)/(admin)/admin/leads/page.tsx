import React from 'react';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/lib/adminhelperfunction';
import LeadsClient from './LeadsClient';

export const metadata = {
    title: 'B2B CRM Leads Pipeline | Admin Dashboard | Slots Sports Wear',
    description: 'Enterprise B2B lead management, wholesale RFQ tracker, and buyer experience system.',
};

export default async function AdminLeadsPage() {
    const isAdmin = await adminAuth();

    if (!isAdmin || !isAdmin.role) {
        redirect('/');
    }

    return (
        <div className="w-full min-h-screen bg-[#EDEEE7] p-4 sm:p-6 md:p-8 pt-6">
            <LeadsClient />
        </div>
    );
}
