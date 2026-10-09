import { NextResponse } from "next/server";
import { databaseConnection } from "@/lib/database";
import { adminAuth } from "@/lib/adminhelperfunction";
import { Lead } from "@/models/Lead.model";
import { TechPack } from "@/models/TechPack.model";
import { LeadActivity } from "@/models/LeadActivity.model";
import { sendBuyerStatusUpdateEmail } from "@/lib/crmEmailService";

const VALID_STATUSES = ['New', 'Contacted', 'Sample Requested', 'Production', 'Completed', 'Rejected'] as const;

interface Params {
    params: Promise<{
        id: string;
    }>;
}

export async function PUT(req: Request, { params }: Params) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const { status, notifyBuyer, customNote } = body;

        if (!status || !VALID_STATUSES.includes(status)) {
            return NextResponse.json({
                success: false,
                message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
            }, { status: 400 });
        }

        await databaseConnection();

        const lead = await Lead.findById(id);
        if (!lead) {
            return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
        }

        const previousStatus = lead.status;
        lead.status = status;

        if (status === 'Contacted' && !lead.lastContactedAt) {
            lead.lastContactedAt = new Date();
        }

        await lead.save();

        // Sync legacy TechPack record if referenced
        if (lead.techPackRef) {
            try {
                await TechPack.findByIdAndUpdate(lead.techPackRef, {
                    isNewStatus: status === 'New',
                });
            } catch (tpErr) {
                console.warn("Legacy TechPack sync warning:", tpErr);
            }
        }

        // 1. Record status transition in immutable audit activity log
        await LeadActivity.create({
            leadId: lead._id,
            type: 'STATUS_CHANGE',
            title: `Pipeline Stage Updated to "${status}"`,
            description: customNote ? `Note: ${customNote}` : `Moved from ${previousStatus} to ${status}.`,
            performedBy: 'Admin',
            metadata: {
                previousStatus,
                newStatus: status,
                buyerNotified: Boolean(notifyBuyer),
            },
        });

        // 2. Dispatch status update email if requested
        if (notifyBuyer && lead.email) {
            try {
                await sendBuyerStatusUpdateEmail(lead, previousStatus, status, customNote);
                await LeadActivity.create({
                    leadId: lead._id,
                    type: 'EMAIL_SENT',
                    title: `Status Dispatch Email Sent to Buyer (${lead.email})`,
                    description: `Notified buyer regarding stage progress to "${status}".`,
                    performedBy: 'System Email Relay',
                });
            } catch (emailErr) {
                console.warn("CRM Warning: Failed to send status email to buyer:", emailErr);
            }
        }

        return NextResponse.json({
            success: true,
            data: lead,
            message: `Lead status updated to ${status} successfully.`,
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error updating lead status:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to update status" }, { status: 500 });
    }
}
