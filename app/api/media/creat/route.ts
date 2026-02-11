import { adminAuth } from "@/lib/adminhelperfunction";
import cloudinary from "@/lib/cloudinary";
import { databaseConnection } from "@/lib/databseconnection";
import { Media } from "@/models/Media.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const payload = await req.json()

    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, statusCode: 403, message: 'Unauthorized.' })
        }

        await databaseConnection();

        const newMedia = await Media.insertMany(payload);        return NextResponse.json({ success: true, statusCode: 200, message: 'media upload successfully' });

    } catch (error) {
        if (payload && payload.length > 0){
            const publicIds = payload.map((data: any) => data.public_id)

            try {
                await cloudinary.api.delete_resources(publicIds)
            } catch (deleteerror) {
                (error as any).cloudinary = deleteerror
            }

        }
            const errorCode = error instanceof Error && 'code' in error ? (error as any).code : 500
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            return NextResponse.json({success:false, statusCode:errorCode, message:`route catch error: ${errorMessage}`})
    }
}