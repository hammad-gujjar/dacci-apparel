import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { databaseConnection } from "@/lib/database";
import { auth } from "@/lib/auth";
import { TechPack } from "@/models/TechPack.model";
import { Lead } from "@/models/Lead.model";
import { LeadActivity } from "@/models/LeadActivity.model";
import { sendBuyerConfirmationEmail, sendFactoryLeadNotificationEmail } from "@/lib/crmEmailService";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        await databaseConnection();

        // Check for authenticated buyer session
        let authenticatedUserId = '';
        let authenticatedUserEmail = '';
        try {
            const session = await auth.api.getSession({ headers: await headers() });
            if (session?.user?.id && session?.user?.email) {
                authenticatedUserId = session.user.id;
                authenticatedUserEmail = session.user.email;
            } else {
                return NextResponse.json({ success: false, message: 'Unauthorized: You must be signed in to submit an RFQ.' }, { status: 401 });
            }
        } catch (error) {
            return NextResponse.json({ success: false, message: 'Unauthorized: Authentication error.' }, { status: 401 });
        }

        // Force the email to be the authenticated user's email
        body.email = authenticatedUserEmail;
        
        // Safely parse numeric quantity if string like "50-100 pcs" is provided
        let numQuantity = typeof body.quantity === 'number' ? body.quantity : parseInt(String(body.quantity || '').replace(/[^\d]/g, ''), 10);
        if (isNaN(numQuantity) || numQuantity <= 0) {
            numQuantity = 50;
        }

        const targetDeadline = body.deadline ? new Date(body.deadline) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

        // 1. Store in legacy TechPack model for full backwards compatibility
        const newTechPack = await TechPack.create({
            name: body.name,
            email: body.email,
            company: body.company,
            country: body.country,
            website: body.website,
            productType: body.productType,
            productSlug: body.productSlug,
            quantity: numQuantity,
            estimatedQuantity: String(body.quantity || `${numQuantity} pcs`),
            deadline: targetDeadline,
            customizationOptions: Array.isArray(body.customizationOptions) ? body.customizationOptions : [],
            customizationDetails: body.customizationDetails,
            items: Array.isArray(body.items) ? body.items : [],
            files: Array.isArray(body.files) ? body.files : [],
            isNewStatus: true,
        });

        // 2. Synchronize directly into modern B2B CRM Lead pipeline
        let newLead = null;
        try {
            newLead = await Lead.create({
                name: body.name,
                email: body.email,
                userId: authenticatedUserId || body.userId || '',
                company: body.company || '',
                country: body.country || 'Global / Unspecified',
                website: body.website || '',
                phone: body.phone || '',
                productType: body.productType,
                productSlug: body.productSlug || '',
                quantity: numQuantity,
                estimatedQuantity: String(body.quantity || `${numQuantity} pcs`),
                deadline: targetDeadline,
                customizationOptions: Array.isArray(body.customizationOptions) ? body.customizationOptions : [],
                customizationDetails: body.customizationDetails || '',
                items: Array.isArray(body.items) ? body.items : [],
                files: Array.isArray(body.files) ? body.files : [],
                status: 'New',
                priority: numQuantity >= 500 ? 'High' : numQuantity >= 150 ? 'Medium' : 'Medium',
                leadSource: body.productSlug ? `Product: ${body.productSlug}` : 'Website RFQ',
                estimatedValue: numQuantity * 18, // Preliminary USD estimate ($18 avg unit)
                techPackRef: newTechPack._id,
            });

            // Log initial audit trail activity
            await LeadActivity.create({
                leadId: newLead._id,
                type: 'SYSTEM',
                title: 'Inquiry Submitted via Website RFQ',
                description: `Client requested ${numQuantity} units of ${body.productType}. ${Array.isArray(body.files) ? `${body.files.length} technical file(s) attached.` : ''}`,
                performedBy: body.name || 'Website Client',
                metadata: {
                    productType: body.productType,
                    quantity: numQuantity,
                    hasFiles: Array.isArray(body.files) && body.files.length > 0,
                },
            });
        } catch (leadErr) {
            console.error("Warning: Failed to create CRM Lead entry:", leadErr);
        }

        const hasMultipleItems = Array.isArray(body.items) && body.items.length > 0;
        const itemsTableHtml = hasMultipleItems ? `
            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 14px; text-transform: uppercase; margin-top: 0; color: #333;">Itemized Garment Specifications</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px;">
                    <thead>
                        <tr style="background: #f4f4f4; text-align: left; text-transform: uppercase; font-size: 10px; color: #666;">
                            <th style="padding: 8px; border: 1px solid #e0e0e0;">Style</th>
                            <th style="padding: 8px; border: 1px solid #e0e0e0;">Category</th>
                            <th style="padding: 8px; border: 1px solid #e0e0e0;">Color / Size Range</th>
                            <th style="padding: 8px; border: 1px solid #e0e0e0;">Qty</th>
                            <th style="padding: 8px; border: 1px solid #e0e0e0;">Customization</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${body.items.map((item: any) => `
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 8px; font-weight: bold; border: 1px solid #e0e0e0;">${item.name}</td>
                                <td style="padding: 8px; border: 1px solid #e0e0e0;">${item.category}</td>
                                <td style="padding: 8px; border: 1px solid #e0e0e0;">${item.color || 'Default'} / ${item.sizeRange || 'Full Range'}</td>
                                <td style="padding: 8px; font-weight: bold; border: 1px solid #e0e0e0;">${item.quantity} pcs</td>
                                <td style="padding: 8px; border: 1px solid #e0e0e0;">${Array.isArray(item.customizationOptions) ? item.customizationOptions.join(', ') : 'Standard'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        ` : '';

        const hasFiles = Array.isArray(body.files) && body.files.length > 0;
        const filesHtml = hasFiles ? `
            <div style="margin-bottom: 30px; background: #fafafa; border: 1px solid #e2e2e2; border-radius: 8px; padding: 20px;">
                <h3 style="font-size: 14px; text-transform: uppercase; margin-top: 0; color: #111; letter-spacing: 0.05em;">
                    Attached Tech Pack & CAD Files (${body.files.length})
                </h3>
                <p style="font-size: 12px; color: #666; margin-bottom: 15px;">
                    The client has attached direct manufacturing specifications / vector artwork:
                </p>
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                        <tr style="background: #ededed; text-align: left; text-transform: uppercase; font-size: 10px; color: #444;">
                            <th style="padding: 8px 10px; border: 1px solid #ddd;">File Name</th>
                            <th style="padding: 8px 10px; border: 1px solid #ddd;">Type</th>
                            <th style="padding: 8px 10px; border: 1px solid #ddd;">Size</th>
                            <th style="padding: 8px 10px; border: 1px solid #ddd; text-align: center;">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${body.files.map((file: any) => `
                            <tr style="border-bottom: 1px solid #e8e8e8; background: #fff;">
                                <td style="padding: 8px 10px; font-weight: bold; border: 1px solid #ddd; word-break: break-all;">${file.fileName}</td>
                                <td style="padding: 8px 10px; border: 1px solid #ddd; text-transform: uppercase; font-weight: bold; color: #444;">${file.fileType || 'N/A'}</td>
                                <td style="padding: 8px 10px; border: 1px solid #ddd; color: #666;">${file.fileSize ? `${(file.fileSize / (1024 * 1024)).toFixed(2)} MB` : 'N/A'}</td>
                                <td style="padding: 8px 10px; border: 1px solid #ddd; text-align: center;">
                                    <a href="${file.fileUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #111; color: #fff; text-decoration: none; padding: 5px 12px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">
                                        Download File
                                    </a>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        ` : '';

        // 3. Send enhanced notification to factory team with CRM direct deep link
        try {
            await sendFactoryLeadNotificationEmail({
                _id: newLead?._id,
                name: body.name,
                email: body.email,
                company: body.company,
                country: body.country,
                website: body.website,
                phone: body.phone,
                productType: body.productType,
                productSlug: body.productSlug,
                quantity: numQuantity,
                deadline: targetDeadline,
                customizationOptions: body.customizationOptions,
                customizationDetails: body.customizationDetails,
                items: body.items,
                files: body.files,
            });
        } catch (emailError) {
            console.error("Warning: Factory notification failed, but Tech Pack was stored successfully:", emailError);
        }

        // Send confirmation receipt to the buyer
        try {
            await sendBuyerConfirmationEmail({
                name: body.name,
                email: body.email,
                company: body.company,
                productType: body.productType,
                quantity: numQuantity,
                deadline: targetDeadline,
                files: body.files,
                items: body.items,
            });
        } catch (buyerEmailErr) {
            console.warn("Warning: Buyer confirmation email failed:", buyerEmailErr);
        }

        return NextResponse.json({ success: true, message: "Request submitted successfully" }, { status: 201 });
    } catch (error: any) {
        console.error("Error submitting tech pack:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to submit request" }, { status: 500 });
    }
}
