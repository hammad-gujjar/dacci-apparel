import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { databaseConnection } from "@/lib/database";
import { auth } from "@/lib/auth";
import { Lead } from "@/models/Lead.model";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) {
            return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
        }

        const userEmail = session.user.email?.toLowerCase() || '';
        const userId = session.user.id;

        if (!userEmail && !userId) {
            return NextResponse.json({ success: false, message: "Invalid user session identity" }, { status: 401 });
        }

        await databaseConnection();

        const { searchParams } = new URL(req.url);
        const statusFilter = searchParams.get('status') || 'all';

        // Strict ownership query: matches either registered userId or verified email
        const baseOwnershipQuery: any = {
            $or: [
                ...(userId ? [{ userId }] : []),
                ...(userEmail ? [{ email: userEmail }] : []),
            ],
            isArchived: false,
        };

        const query: any = { ...baseOwnershipQuery };

        if (statusFilter !== 'all') {
            if (statusFilter === 'In Review') {
                query.status = { $in: ['New', 'Contacted'] };
            } else if (statusFilter === 'Sampling') {
                query.status = 'Sample Requested';
            } else if (statusFilter === 'Production') {
                query.status = 'Production';
            } else if (statusFilter === 'Completed') {
                query.status = 'Completed';
            } else {
                query.status = statusFilter;
            }
        }

        // Fetch inquiries strictly projecting buyer-safe attributes
        const inquiries = await Lead.find(query)
            .sort({ createdAt: -1 })
            .select('_id name company productType productSlug quantity estimatedQuantity deadline status createdAt files items customizationOptions')
            .lean();

        // Calculate aggregate statistics for buyer's personal dashboard
        const allUserInquiries = await Lead.find(baseOwnershipQuery).select('status').lean();

        const stats = {
            total: allUserInquiries.length,
            inReview: allUserInquiries.filter((l: any) => l.status === 'New' || l.status === 'Contacted').length,
            sampling: allUserInquiries.filter((l: any) => l.status === 'Sample Requested').length,
            production: allUserInquiries.filter((l: any) => l.status === 'Production').length,
            completed: allUserInquiries.filter((l: any) => l.status === 'Completed').length,
            active: allUserInquiries.filter((l: any) => l.status !== 'Completed' && l.status !== 'Rejected').length,
        };

        // Format buyer-safe response
        const formattedInquiries = inquiries.map((inq: any) => ({
            id: String(inq._id),
            rfqNumber: `RFQ-${String(inq._id).slice(-6).toUpperCase()}`,
            productType: inq.productType,
            productSlug: inq.productSlug,
            company: inq.company || session.user.name,
            quantity: inq.quantity,
            estimatedQuantity: inq.estimatedQuantity || `${inq.quantity} pcs`,
            deadline: inq.deadline,
            status: inq.status,
            submissionDate: inq.createdAt,
            filesCount: Array.isArray(inq.files) ? inq.files.length : 0,
            itemsCount: Array.isArray(inq.items) ? inq.items.length : 0,
            customizationOptions: inq.customizationOptions || [],
        }));

        return NextResponse.json({
            success: true,
            data: formattedInquiries,
            stats,
        }, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            },
        });
    } catch (error: any) {
        console.error("Error fetching buyer account inquiries:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to load inquiries" }, { status: 500 });
    }
}
