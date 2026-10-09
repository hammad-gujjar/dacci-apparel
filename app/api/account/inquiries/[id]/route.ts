import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { databaseConnection } from "@/lib/database";
import { auth } from "@/lib/auth";
import { Lead } from "@/models/Lead.model";

interface Params {
    params: Promise<{
        id: string;
    }>;
}

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: Params) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) {
            return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
        }

        const { id } = await params;

        // Ensure valid MongoDB ObjectId format
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json({ success: false, message: "Inquiry not found" }, { status: 404 });
        }

        const userEmail = session.user.email?.toLowerCase() || '';
        const userId = session.user.id;

        await databaseConnection();

        // Strict Server-Side Anti-IDOR: only match record belonging to this authenticated user
        const inquiry: any = await Lead.findOne({
            _id: id,
            $or: [
                ...(userId ? [{ userId }] : []),
                ...(userEmail ? [{ email: userEmail }] : []),
            ],
            isArchived: false,
        }).lean();

        if (!inquiry) {
            return NextResponse.json({
                success: false,
                message: "Inquiry not found or access denied",
            }, { status: 404 });
        }

        // Map internal CRM status into 5-stage buyer-facing progress timeline
        const currentStatus = inquiry.status || 'New';

        // Stage progress index helper
        const getStageState = (stageKey: string) => {
            const order = ['New', 'Contacted', 'Sample Requested', 'Production', 'Completed'];
            const statusIdx = order.indexOf(currentStatus);

            switch (stageKey) {
                case 'inquiry_received':
                    return { isCurrent: currentStatus === 'New', isCompleted: statusIdx >= 0 };
                case 'review_in_progress':
                    return { isCurrent: currentStatus === 'Contacted', isCompleted: statusIdx >= 1 };
                case 'sampling':
                    return { isCurrent: currentStatus === 'Sample Requested', isCompleted: statusIdx >= 2 };
                case 'production':
                    return { isCurrent: currentStatus === 'Production', isCompleted: statusIdx >= 3 };
                case 'completed':
                    return { isCurrent: currentStatus === 'Completed', isCompleted: currentStatus === 'Completed' };
                default:
                    return { isCurrent: false, isCompleted: false };
            }
        };

        const timeline = [
            {
                id: 'inquiry_received',
                label: 'Inquiry Received',
                description: 'Project specifications received by Sialkot factory engineering.',
                date: inquiry.createdAt,
                ...getStageState('inquiry_received'),
            },
            {
                id: 'review_in_progress',
                label: 'Review In Progress',
                description: 'Engineering BOM calculation, technical pattern analysis & costing.',
                ...getStageState('review_in_progress'),
            },
            {
                id: 'sampling',
                label: 'Prototype Sampling',
                description: 'Pre-production physical sample fabrication and quality validation.',
                ...getStageState('sampling'),
            },
            {
                id: 'production',
                label: 'Bulk Production',
                description: 'Industrial cutting, sublimation printing/embroidery, stitching & AQL 2.5 inspection.',
                ...getStageState('production'),
            },
            {
                id: 'completed',
                label: 'Order Completed & Shipped',
                description: 'Factory packaging completed and export cargo dispatched with tracking.',
                ...getStageState('completed'),
            },
        ];

        // Format buyer-safe response (Strictly strips factory internal notes, margins, and priorities)
        const buyerSafeInquiry = {
            id: String(inquiry._id),
            rfqNumber: `RFQ-${String(inquiry._id).slice(-6).toUpperCase()}`,
            name: inquiry.name,
            email: inquiry.email,
            company: inquiry.company || 'Private Brand',
            country: inquiry.country || 'Global / Unspecified',
            website: inquiry.website || '',
            phone: inquiry.phone || '',
            productType: inquiry.productType,
            productSlug: inquiry.productSlug || '',
            quantity: inquiry.quantity,
            estimatedQuantity: inquiry.estimatedQuantity || `${inquiry.quantity} pcs`,
            deadline: inquiry.deadline,
            customizationOptions: Array.isArray(inquiry.customizationOptions) ? inquiry.customizationOptions : [],
            customizationDetails: inquiry.customizationDetails || '',
            items: Array.isArray(inquiry.items) ? inquiry.items : [],
            files: Array.isArray(inquiry.files) ? inquiry.files.map((f: any) => ({
                fileName: f.fileName,
                fileUrl: f.fileUrl,
                fileType: f.fileType || 'application/octet-stream',
                fileSize: f.fileSize || 0,
                uploadedAt: f.uploadedAt || inquiry.createdAt,
            })) : [],
            status: inquiry.status,
            submissionDate: inquiry.createdAt,
            updatedAt: inquiry.updatedAt,
            timeline,
        };

        return NextResponse.json({
            success: true,
            data: buyerSafeInquiry,
        }, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            },
        });
    } catch (error: any) {
        console.error("Error fetching inquiry detail:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to load inquiry" }, { status: 500 });
    }
}
