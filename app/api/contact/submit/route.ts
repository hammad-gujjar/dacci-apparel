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

        // Honeypot anti-spam check
        if (body.website_hp && typeof body.website_hp === 'string' && body.website_hp.trim() !== '') {
            return NextResponse.json(
                { success: false, message: 'Invalid submission detected.' },
                { status: 400 }
            );
        }

        // Check for authenticated buyer session (optional for guest RFQ submissions)
        let authenticatedUserId = '';
        let authenticatedUserEmail = '';
        try {
            const session = await auth.api.getSession({ headers: await headers() });
            if (session?.user?.id && session?.user?.email) {
                authenticatedUserId = session.user.id;
                authenticatedUserEmail = session.user.email;
            }
        } catch (error) {
            // Non-blocking: continue as guest if session check fails or visitor is unauthenticated
        }

        // Bind verified session email if authenticated; otherwise validate provided guest email
        if (authenticatedUserEmail) {
            body.email = authenticatedUserEmail;
        } else {
            const rawEmail = typeof body.email === 'string' ? body.email.trim() : '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!rawEmail || !emailRegex.test(rawEmail)) {
                return NextResponse.json(
                    { success: false, message: 'A valid business email address is required.' },
                    { status: 400 }
                );
            }
            body.email = rawEmail.toLowerCase();
        }

        // Validate contact person's name (minimum 2 characters)
        const rawName = typeof body.name === 'string' ? body.name.trim() : '';
        if (!rawName || rawName.length < 2) {
            return NextResponse.json(
                { success: false, message: "Contact person's name must be at least 2 characters." },
                { status: 400 }
            );
        }
        body.name = rawName;

        // Validate product category / type
        const rawProductType = typeof body.productType === 'string' ? body.productType.trim() : '';
        if (!rawProductType) {
            return NextResponse.json(
                { success: false, message: 'Product category is required.' },
                { status: 400 }
            );
        }
        body.productType = rawProductType;

        // Strict whole-number quantity validation (MOQ >= 30, reject missing, fractional, or below-30)
        if (body.quantity === undefined || body.quantity === null || String(body.quantity).trim() === '') {
            return NextResponse.json(
                { success: false, message: 'Quantity is required.' },
                { status: 400 }
            );
        }

        const rawQtyStr = String(body.quantity).trim();
        const numQuantity = Number(rawQtyStr);

        // Reject NaN, non-integer, fractional, or non-digit strings (e.g. '30.5', 'abc', '30e2')
        if (isNaN(numQuantity) || !Number.isInteger(numQuantity) || !/^\d+$/.test(rawQtyStr)) {
            return NextResponse.json(
                { success: false, message: 'Quantity must be a valid whole number (no fractions or decimals).' },
                { status: 400 }
            );
        }

        if (numQuantity < 30) {
            return NextResponse.json(
                { success: false, message: 'Minimum order quantity is 30 pieces per style.' },
                { status: 400 }
            );
        }

        // Target delivery deadline
        let targetDeadline = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
        if (body.deadline) {
            const parsedDeadline = new Date(body.deadline);
            if (!isNaN(parsedDeadline.getTime())) {
                targetDeadline = parsedDeadline;
            }
        }

        // Clean optional fields
        const safeCompany = typeof body.company === 'string' ? body.company.trim() : '';
        const safeCountry = typeof body.country === 'string' && body.country.trim() ? body.country.trim() : 'Global / Unspecified';
        const safeWebsite = typeof body.website === 'string' ? body.website.trim() : '';
        const safePhone = typeof body.phone === 'string' ? body.phone.trim() : '';
        const safeProductSlug = typeof body.productSlug === 'string' ? body.productSlug.trim() : '';
        const safeCustomizationOptions = Array.isArray(body.customizationOptions) ? body.customizationOptions : [];
        const safeCustomizationDetails = typeof body.customizationDetails === 'string' ? body.customizationDetails.trim() : '';
        const safeItems = Array.isArray(body.items) ? body.items : [];
        const safeFiles = Array.isArray(body.files) ? body.files : [];

        // 1. Store in TechPack model for full backwards compatibility
        const newTechPack = await TechPack.create({
            name: body.name,
            email: body.email,
            company: safeCompany,
            country: safeCountry,
            website: safeWebsite,
            productType: body.productType,
            productSlug: safeProductSlug,
            quantity: numQuantity,
            estimatedQuantity: `${numQuantity} pcs`,
            deadline: targetDeadline,
            customizationOptions: safeCustomizationOptions,
            customizationDetails: safeCustomizationDetails,
            items: safeItems,
            files: safeFiles,
            isNewStatus: true,
        });

        // 2. Synchronize directly into modern B2B CRM Lead pipeline
        let newLead = null;
        try {
            newLead = await Lead.create({
                name: body.name,
                email: body.email,
                userId: authenticatedUserId || '',
                company: safeCompany,
                country: safeCountry,
                website: safeWebsite,
                phone: safePhone,
                productType: body.productType,
                productSlug: safeProductSlug,
                quantity: numQuantity,
                estimatedQuantity: `${numQuantity} pcs`,
                deadline: targetDeadline,
                customizationOptions: safeCustomizationOptions,
                customizationDetails: safeCustomizationDetails,
                items: safeItems,
                files: safeFiles,
                status: 'New',
                priority: numQuantity >= 500 ? 'High' : numQuantity >= 150 ? 'Medium' : 'Medium',
                leadSource: safeProductSlug ? `Product: ${safeProductSlug}` : 'Website RFQ',
                estimatedValue: numQuantity * 18, // Preliminary USD estimate ($18 avg unit)
                techPackRef: newTechPack._id,
            });

            // Log initial audit trail activity
            await LeadActivity.create({
                leadId: newLead._id,
                type: 'SYSTEM',
                title: 'Inquiry Submitted via Website RFQ',
                description: `${authenticatedUserId ? 'Authenticated client' : 'Guest client'} requested ${numQuantity} units of ${body.productType}. ${safeFiles.length > 0 ? `${safeFiles.length} technical file(s) attached.` : ''}`,
                performedBy: body.name || 'Website Client',
                metadata: {
                    productType: body.productType,
                    quantity: numQuantity,
                    isGuest: !authenticatedUserId,
                    hasFiles: safeFiles.length > 0,
                },
            });
        } catch (leadErr) {
            console.error("Warning: Failed to create CRM Lead entry:", leadErr);
        }

        // 3. Send enhanced notification to factory team with CRM direct deep link
        try {
            await sendFactoryLeadNotificationEmail({
                _id: newLead?._id,
                name: body.name,
                email: body.email,
                company: safeCompany,
                country: safeCountry,
                website: safeWebsite,
                phone: safePhone,
                productType: body.productType,
                productSlug: safeProductSlug,
                quantity: numQuantity,
                deadline: targetDeadline,
                customizationOptions: safeCustomizationOptions,
                customizationDetails: safeCustomizationDetails,
                items: safeItems,
                files: safeFiles,
            });
        } catch (emailError) {
            console.error("Warning: Factory notification failed, but Tech Pack was stored successfully:", emailError);
        }

        // Send confirmation receipt to the buyer
        try {
            await sendBuyerConfirmationEmail({
                name: body.name,
                email: body.email,
                company: safeCompany,
                productType: body.productType,
                quantity: numQuantity,
                deadline: targetDeadline,
                files: safeFiles,
                items: safeItems,
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
