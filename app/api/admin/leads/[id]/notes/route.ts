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

export async function POST(req: Request, { params }: Params) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const { note, author = 'Admin' } = body;

        if (!note || typeof note !== 'string' || !note.trim()) {
            return NextResponse.json({ success: false, message: "Note content is required" }, { status: 400 });
        }

        await databaseConnection();

        const lead = await Lead.findById(id);
        if (!lead) {
            return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
        }

        const newNote = {
            note: note.trim(),
            author: author.trim() || 'Admin',
            createdAt: new Date(),
        };

        lead.notes.push(newNote);
        await lead.save();

        // Log in immutable audit activity timeline
        await LeadActivity.create({
            leadId: lead._id,
            type: 'NOTE_ADDED',
            title: `Internal Note Added by ${newNote.author}`,
            description: newNote.note,
            performedBy: newNote.author,
        });

        return NextResponse.json({
            success: true,
            data: lead.notes,
            message: "Note added successfully.",
        }, { status: 201 });
    } catch (error: any) {
        console.error("Error adding lead note:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to add note" }, { status: 500 });
    }
}
