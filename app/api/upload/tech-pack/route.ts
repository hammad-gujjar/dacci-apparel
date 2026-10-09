import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// Allowed extensions for technical manufacturing files
const ALLOWED_EXTENSIONS = [
    'pdf',
    'ai',
    'eps',
    'psd',
    'dxf',
    'zip',
    'png',
    'jpg',
    'jpeg'
];

// 25 MB max file size threshold
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file provided in request." },
                { status: 400 }
            );
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE_BYTES) {
            return NextResponse.json(
                {
                    success: false,
                    message: `File size exceeds 25 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB). Please compress your file or upload vector PDF/ZIP.`
                },
                { status: 400 }
            );
        }

        // Extract and validate extension
        const originalName = file.name || 'unnamed_file';
        const fileParts = originalName.split('.');
        const extension = fileParts.length > 1 ? fileParts.pop()!.toLowerCase() : '';

        if (!ALLOWED_EXTENSIONS.includes(extension)) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Unsupported file type (.${extension || 'unknown'}). Allowed formats: PDF, AI, EPS, PSD, DXF, ZIP, PNG, JPG, JPEG.`
                },
                { status: 400 }
            );
        }

        // Sanitize clean base name
        const rawBaseName = fileParts.join('.');
        const sanitizedBaseName = rawBaseName.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 60);
        const uniquePublicId = `${Date.now()}_${sanitizedBaseName}`;

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary using upload_stream
        const uploadResult = await new Promise<any>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "tech_packs",
                    public_id: uniquePublicId,
                    resource_type: "auto",
                    use_filename: true,
                    unique_filename: true,
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            uploadStream.end(buffer);
        });

        return NextResponse.json({
            success: true,
            message: "File uploaded successfully",
            file: {
                fileName: originalName,
                fileUrl: uploadResult.secure_url,
                fileType: extension.toUpperCase(),
                fileSize: file.size,
                publicId: uploadResult.public_id,
            }
        }, { status: 200 });

    } catch (error: any) {
        console.error("Tech pack upload error:", error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Server encountered an error processing your technical file upload."
            },
            { status: 500 }
        );
    }
}
