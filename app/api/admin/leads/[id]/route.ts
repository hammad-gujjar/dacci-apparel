import { NextResponse } from "next/server";
import { databaseConnection } from "@/lib/database";
import { adminAuth } from "@/lib/adminhelperfunction";
import { Lead } from "@/models/Lead.model";
import { LeadActivity } from "@/models/LeadActivity.model";

interface Params {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(req: Request, { params }: Params) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        const { id } = await params;
        await databaseConnection();

        const [lead, activities] = await Promise.all([
            Lead.findById(id).lean(),
            LeadActivity.find({ leadId: id }).sort({ createdAt: -1 }).lean(),
        ]);

        if (!lead) {
            return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                ...lead,
                activities: activities || [],
            },
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching single CRM lead:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to fetch lead" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: Params) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();

        await databaseConnection();

        const lead = await Lead.findById(id);
        if (!lead) {
            return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
        }

        // Track changes for activity logging
        const changes: string[] = [];
        if (body.priority && body.priority !== lead.priority) {
            changes.push(`Priority changed from ${lead.priority} to ${body.priority}`);
            lead.priority = body.priority;
        }
        if (body.estimatedValue !== undefined && body.estimatedValue !== lead.estimatedValue) {
            changes.push(`Estimated value updated to $${body.estimatedValue}`);
            lead.estimatedValue = body.estimatedValue;
        }
        if (body.company !== undefined) lead.company = body.company;
        if (body.country !== undefined) lead.country = body.country;
        if (body.website !== undefined) lead.website = body.website;
        if (body.phone !== undefined) lead.phone = body.phone;
        if (body.deadline) lead.deadline = new Date(body.deadline);

        await lead.save();

        if (changes.length > 0) {
            await LeadActivity.create({
                leadId: lead._id,
                type: 'STAGE_UPDATE',
                title: 'Lead Details Updated',
                description: changes.join('; '),
                performedBy: 'Admin',
            });
        }

        return NextResponse.json({ success: true, data: lead, message: "Lead updated successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Error updating CRM lead:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to update lead" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        const { id } = await params;
        await databaseConnection();

        const lead = await Lead.findByIdAndUpdate(id, { isArchived: true }, { new: true });
        if (!lead) {
            return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
        }

        await LeadActivity.create({
            leadId: lead._id,
            type: 'SYSTEM',
            title: 'Lead Archived',
            description: 'Lead was moved to archive by Admin.',
            performedBy: 'Admin',
        });

        return NextResponse.json({ success: true, message: "Lead archived successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Error archiving CRM lead:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to archive lead" }, { status: 500 });
    }
}
