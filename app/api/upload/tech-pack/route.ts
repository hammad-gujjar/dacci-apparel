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

// IP Rate Limiting (In-memory sliding window for burst protection)
interface RateLimitRecord {
    count: number;
    resetAt: number;
}
const ipRateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_UPLOADS_PER_WINDOW = 20;

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = ipRateLimitMap.get(ip);

    // Periodic cleanup of stale entries if map grows large
    if (ipRateLimitMap.size > 1000) {
        for (const [key, val] of ipRateLimitMap.entries()) {
            if (val.resetAt < now) {
                ipRateLimitMap.delete(key);
            }
        }
    }

    if (!record || record.resetAt < now) {
        ipRateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return true;
    }

    if (record.count >= MAX_UPLOADS_PER_WINDOW) {
        return false;
    }

    record.count += 1;
    return true;
}

/**
 * Validate binary file signatures (magic bytes) to prevent extension-spoofing
 */
function validateMagicBytes(buffer: Buffer, extension: string): boolean {
    if (buffer.length < 4) return false;

    switch (extension) {
        case 'png':
            // 89 50 4E 47 0D 0A 1A 0A
            return (
                buffer.length >= 8 &&
                buffer[0] === 0x89 &&
                buffer[1] === 0x50 &&
                buffer[2] === 0x4E &&
                buffer[3] === 0x47 &&
                buffer[4] === 0x0D &&
                buffer[5] === 0x0A &&
                buffer[6] === 0x1A &&
                buffer[7] === 0x0A
            );

        case 'jpg':
        case 'jpeg':
            // FF D8 FF
            return (
                buffer.length >= 3 &&
                buffer[0] === 0xFF &&
                buffer[1] === 0xD8 &&
                buffer[2] === 0xFF
            );

        case 'pdf':
            // Standard PDF starts with %PDF- (within first 1024 bytes per spec)
            return buffer.subarray(0, Math.min(buffer.length, 1024)).toString('latin1').includes('%PDF-');

        case 'zip':
            // PK\x03\x04, PK\x05\x06 (empty), PK\x07\x08 (spanned)
            return (
                buffer.length >= 4 &&
                buffer[0] === 0x50 &&
                buffer[1] === 0x4B &&
                ((buffer[2] === 0x03 && buffer[3] === 0x04) ||
                 (buffer[2] === 0x05 && buffer[3] === 0x06) ||
                 (buffer[2] === 0x07 && buffer[3] === 0x08))
            );

        case 'psd':
            // 8BPS -> 38 42 50 53
            return (
                buffer.length >= 4 &&
                buffer[0] === 0x38 &&
                buffer[1] === 0x42 &&
                buffer[2] === 0x50 &&
                buffer[3] === 0x53
            );

        case 'ai':
            // AI files are modern PDF-based or PostScript-based
            const headerAi = buffer.subarray(0, Math.min(buffer.length, 1024)).toString('latin1');
            const isPdfBased = headerAi.includes('%PDF-');
            const isPsBased = headerAi.startsWith('%!') || headerAi.includes('%!PS-Adobe');
            const isEpsBinary = buffer[0] === 0xC5 && buffer[1] === 0xD0 && buffer[2] === 0xD3 && buffer[3] === 0xC6;
            return isPdfBased || isPsBased || isEpsBinary;

        case 'eps':
            // PostScript (%!) or binary EPS
            const isPs = buffer[0] === 0x25 && buffer[1] === 0x21; // '%!'
            const isBinaryEps = buffer[0] === 0xC5 && buffer[1] === 0xD0 && buffer[2] === 0xD3 && buffer[3] === 0xC6;
            return isPs || isBinaryEps;

        case 'dxf':
            // AutoCAD Binary or ASCII
            const headerDxf = buffer.subarray(0, Math.min(buffer.length, 256)).toString('latin1');
            const isBinaryDxf = headerDxf.startsWith('AutoCAD Binary DXF');
            const isAsciiDxf = /^\s*(0|999|SECTION)/m.test(headerDxf);
            return isBinaryDxf || isAsciiDxf;

        default:
            return false;
    }
}

/**
 * Sanitize filename preventing path traversal, null bytes, and malicious characters
 */
function sanitizeFilename(originalName: string): { sanitizedName: string; cleanBaseName: string; extension: string } {
    const baseClean = originalName.replace(/[\0\r\n]/g, '').split(/[/\\]/).pop() || 'file';
    const lastDotIndex = baseClean.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return { sanitizedName: 'unnamed_file', cleanBaseName: 'unnamed', extension: '' };
    }

    const rawExt = baseClean.substring(lastDotIndex + 1).toLowerCase();
    const rawBase = baseClean.substring(0, lastDotIndex);

    // Sanitize base: allow alphanumeric, underscore, hyphen
    const cleanBaseName = rawBase.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 60) || 'file';
    const sanitizedName = `${cleanBaseName}.${rawExt}`;

    return { sanitizedName, cleanBaseName, extension: rawExt };
}

export async function POST(req: Request) {
    try {
        // Extract client IP for sliding window rate limiting
        const forwardedFor = req.headers.get("x-forwarded-for");
        const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : req.headers.get("x-real-ip") || "127.0.0.1";

        if (!checkRateLimit(clientIp)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Upload rate limit exceeded. Please wait a few minutes before uploading additional files."
                },
                { status: 429 }
            );
        }

        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file provided in request." },
                { status: 400 }
            );
        }

        // Validate file size bounds
        if (file.size <= 0) {
            return NextResponse.json(
                { success: false, message: "Empty file cannot be uploaded." },
                { status: 400 }
            );
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
            return NextResponse.json(
                {
                    success: false,
                    message: `File size exceeds 25 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB). Please compress your file or upload vector PDF/ZIP.`
                },
                { status: 400 }
            );
        }

        // Extract and validate extension & clean filename
        const { sanitizedName, cleanBaseName, extension } = sanitizeFilename(file.name || 'unnamed_file');

        if (!ALLOWED_EXTENSIONS.includes(extension)) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Unsupported file type (.${extension || 'unknown'}). Allowed formats: PDF, AI, EPS, PSD, DXF, ZIP, PNG, JPG, JPEG.`
                },
                { status: 400 }
            );
        }

        // Convert file to buffer and validate magic bytes
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (!validateMagicBytes(buffer, extension)) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Security validation failed: The file content does not match the expected .${extension} format.`
                },
                { status: 400 }
            );
        }

        const uniquePublicId = `${Date.now()}_${cleanBaseName}`;

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
                fileName: sanitizedName,
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
