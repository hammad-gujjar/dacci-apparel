import { NextResponse } from "next/server";
import { databaseConnection } from "@/lib/database";
import { TechPack } from "@/models/TechPack.model";

export async function GET() {
    try {
        await databaseConnection();
        const techPacks = await TechPack.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: techPacks }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching tech packs:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
