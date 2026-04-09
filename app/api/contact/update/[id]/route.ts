import { NextResponse } from "next/server";
import { databaseConnection } from "@/lib/database";
import { TechPack } from "@/models/TechPack.model";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();

        await databaseConnection();
        
        const updatedTechPack = await TechPack.findByIdAndUpdate(
            id,
            { isNewStatus: body.isNewStatus },
            { new: true }
        );

        if (!updatedTechPack) {
            return NextResponse.json({ success: false, message: "Tech Pack not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedTechPack }, { status: 200 });
    } catch (error: any) {
        console.error("Error updating tech pack:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
