import { transporter, EMAIL_FROM } from "@/lib/nodemailer";

interface LeadEmailData {
    _id?: any;
    name: string;
    email: string;
    company?: string;
    country?: string;
    website?: string;
    phone?: string;
    productType: string;
    productSlug?: string;
    quantity: number | string;
    deadline?: Date | string;
    customizationOptions?: string[];
    customizationDetails?: string;
    items?: any[];
    files?: Array<{ fileName: string; fileUrl: string; fileType?: string; fileSize?: number }>;
    status?: string;
}

/**
 * 1. Send immediate confirmation receipt to the B2B buyer
 */
export async function sendBuyerConfirmationEmail(lead: LeadEmailData) {
    if (!lead.email) return;

    const formattedDeadline = lead.deadline 
        ? new Date(lead.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Flexible (Standard 7-14 Days Sampling)';

    const filesCount = lead.files && lead.files.length > 0 ? lead.files.length : 0;
    const hasItems = lead.items && lead.items.length > 0;

    const mailOptions = {
        from: EMAIL_FROM,
        to: lead.email,
        subject: `Inquiry Received: Custom ${lead.productType} Manufacturing | Slots Sports Wear`,
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 32px 24px; background-color: #ffffff; color: #111111; border: 1px solid #e5e5e5; border-radius: 16px;">
                <!-- Header -->
                <div style="text-align: center; padding-bottom: 24px; border-bottom: 2px solid #EDEEE7;">
                    <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: #666666;">
                        B2B OEM / ODM Sportswear Manufacturing
                    </span>
                    <h1 style="font-size: 24px; font-weight: 800; margin: 12px 0 6px 0; text-transform: uppercase; letter-spacing: 0.05em; color: #111111;">
                        SLOTS SPORTS WEAR
                    </h1>
                    <p style="font-size: 12px; color: #888888; margin: 0;">Sialkot, Pakistan • Worldwide Export Logistics</p>
                </div>

                <!-- Intro Greeting -->
                <div style="padding: 28px 0 20px 0;">
                    <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 12px; color: #111111;">
                        Dear ${lead.name || 'Partner'},
                    </h2>
                    <p style="font-size: 14px; line-height: 1.6; color: #444444; margin: 0 0 16px 0;">
                        We have successfully received your technical apparel inquiry and project specifications for <strong>${lead.productType}</strong>. Our Sialkot engineering division is reviewing your requirements to provide an accurate Bill of Materials (BOM) cost breakdown and sampling schedule.
                    </p>
                </div>

                <!-- Inquiry Summary Box -->
                <div style="background-color: #fafafa; border: 1px solid #ededed; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #777777; margin-bottom: 14px;">
                        Specification Summary
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                        <tr>
                            <td style="padding: 6px 0; color: #666666; width: 40%;">Product Category:</td>
                            <td style="padding: 6px 0; font-weight: 600; color: #111111; text-transform: uppercase;">${lead.productType}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #666666;">Requested Quantity:</td>
                            <td style="padding: 6px 0; font-weight: 600; color: #111111;">${lead.quantity} units (Low 30 MOQ eligible)</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #666666;">Target Delivery Date:</td>
                            <td style="padding: 6px 0; font-weight: 600; color: #111111;">${formattedDeadline}</td>
                        </tr>
                        ${lead.company ? `
                        <tr>
                            <td style="padding: 6px 0; color: #666666;">Company / Brand:</td>
                            <td style="padding: 6px 0; font-weight: 600; color: #111111;">${lead.company}</td>
                        </tr>` : ''}
                        ${filesCount > 0 ? `
                        <tr>
                            <td style="padding: 6px 0; color: #666666;">Attached Tech Packs:</td>
                            <td style="padding: 6px 0; font-weight: 600; color: #059669;">${filesCount} CAD / Vector file(s) attached</td>
                        </tr>` : ''}
                    </table>
                </div>

                <!-- Three Steps Protocol -->
                <div style="background-color: #EDEEE7; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
                    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: #111111; margin-bottom: 12px;">
                        Next Manufacturing Milestones
                    </div>
                    <div style="font-size: 13px; line-height: 1.6; color: #333333;">
                        <p style="margin: 0 0 8px 0;"><strong>1. 24-Hour CAD & BOM Audit:</strong> Our pattern makers evaluate sizing, seam structures, and fabric GSM.</p>
                        <p style="margin: 0 0 8px 0;"><strong>2. Official Quotation & Swatch Selection:</strong> We supply FOB/CIF unit pricing and Pantone color formulation sheets.</p>
                        <p style="margin: 0;"><strong>3. Physical Prototyping (7–14 Days):</strong> Your custom branded sample is created with full labels, tags, and express air freight.</p>
                    </div>
                </div>

                <!-- Direct WhatsApp / Concierge Contact -->
                <div style="text-align: center; padding: 12px 0 24px 0; border-bottom: 1px solid #eeeeee;">
                    <p style="font-size: 13px; color: #555555; margin-bottom: 16px;">
                        Need urgent consultation regarding your Tech Pack, fabric selection, or delivery deadlines?
                    </p>
                    <a href="https://wa.me/923086271018?text=Hello%20Slots%20Sports%20Wear,%20I%20have%20submitted%20an%20RFQ%20for%20${encodeURIComponent(lead.productType)}" 
                       target="_blank" 
                       style="display: inline-block; background-color: #111111; color: #EDEEE7; text-decoration: none; padding: 12px 24px; border-radius: 30px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em;">
                        Connect via WhatsApp Concierge
                    </a>
                </div>

                <!-- Footer -->
                <div style="text-align: center; padding-top: 20px; font-size: 11px; color: #999999; line-height: 1.5;">
                    <p style="margin: 0 0 4px 0;">SLOTS SPORTS WEAR · Precision Athletic Apparel OEM/ODM Manufacturer</p>
                    <p style="margin: 0;">Punjab, Pakistan • slotssportswear.vercel.app</p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.warn("⚠️ CRM Warning: Buyer confirmation email could not be delivered:", err);
    }
}

/**
 * 2. Send enhanced notification to factory team with CRM direct deep link
 */
export async function sendFactoryLeadNotificationEmail(lead: LeadEmailData) {
    const destinationEmail = process.env.COMPANY_EMAIL || process.env.ADMIN_EMAIL;
    if (!destinationEmail) return;

    const crmUrl = `${process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app'}/admin/leads${lead._id ? `?id=${lead._id}` : ''}`;
    const filesCount = lead.files?.length || 0;

    const filesTableHtml = filesCount > 0 ? `
        <div style="margin: 20px 0; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px;">
            <h4 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #111;">
                Attached Tech Packs (${filesCount}):
            </h4>
            <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #333;">
                ${lead.files?.map(f => `
                    <li style="margin-bottom: 6px;">
                        <a href="${f.fileUrl}" target="_blank" style="color: #059669; font-weight: bold; text-decoration: underline;">
                            ${f.fileName}
                        </a>
                        ${f.fileSize ? ` <span style="color: #777;">(${(f.fileSize / (1024 * 1024)).toFixed(2)} MB)</span>` : ''}
                    </li>
                `).join('')}
            </ul>
        </div>
    ` : '';

    const mailOptions = {
        from: EMAIL_FROM,
        to: destinationEmail,
        replyTo: lead.email,
        subject: `[CRM Lead Intake] ${lead.name} (${lead.company || lead.country || 'Global'}) - ${lead.productType} (${lead.quantity} pcs)`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; color: #111;">
                <div style="border-bottom: 2px solid #111; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="font-size: 18px; margin: 0; text-transform: uppercase; letter-spacing: 0.1em;">
                        New Wholesale B2B Lead Intake
                    </h2>
                </div>

                <div style="background-color: #f8f8f8; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 0 0 6px 0; font-size: 14px;"><strong>Buyer:</strong> ${lead.name} (${lead.email})</p>
                    <p style="margin: 0 0 6px 0; font-size: 14px;"><strong>Company:</strong> ${lead.company || 'Not Specified'}</p>
                    <p style="margin: 0 0 6px 0; font-size: 14px;"><strong>Country:</strong> ${lead.country || 'Not Specified'}</p>
                    <p style="margin: 0 0 6px 0; font-size: 14px;"><strong>Product Scope:</strong> ${lead.productType}</p>
                    <p style="margin: 0 0 6px 0; font-size: 14px;"><strong>Volume:</strong> ${lead.quantity} units</p>
                    <p style="margin: 0; font-size: 14px;"><strong>Deadline:</strong> ${lead.deadline ? new Date(lead.deadline).toLocaleDateString() : 'Flexible'}</p>
                </div>

                ${filesTableHtml}

                <div style="margin: 20px 0;">
                    <h4 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #666;">Customization Specifications:</h4>
                    <div style="background: #ffffff; border: 1px solid #e5e5e5; padding: 14px; border-radius: 6px; font-size: 13px; line-height: 1.5; color: #333; white-space: pre-wrap;">
                        ${lead.customizationDetails || 'No additional custom specs provided.'}
                    </div>
                </div>

                <div style="text-align: center; margin: 30px 0 10px 0;">
                    <a href="${crmUrl}" 
                       target="_blank" 
                       style="display: inline-block; background-color: #111111; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em;">
                        Manage Lead in CRM Pipeline →
                    </a>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.warn("⚠️ CRM Warning: Factory notification email error:", err);
    }
}

/**
 * 3. Send milestone status update to buyer when status is changed in CRM
 */
export async function sendBuyerStatusUpdateEmail(
    lead: LeadEmailData,
    previousStatus: string,
    newStatus: string,
    customNote?: string
) {
    if (!lead.email) return;

    const statusDescriptions: Record<string, string> = {
        'Contacted': 'Our technical manufacturing engineers have reviewed your Tech Pack specifications. We are preparing your formal unit cost quotation and fabric swatch options.',
        'Sample Requested': 'Your pre-production prototype has been approved for physical sample fabrication in our Sialkot facility. Sizing patterns, custom trims, and print profiles are now active.',
        'Production': 'Your order has officially entered bulk manufacturing. Cutting, 4-needle stitching, and embellishments are actively proceeding under ISO 9001 and AQL 2.5 factory inspection.',
        'Completed': 'Your apparel order has passed final quality audits, needle detection screening, and individual polybag packaging. It is staged for international air freight delivery.',
        'Rejected': 'Thank you for your interest. We are currently unable to proceed with this specific specification or MOQ requirement at this time.',
    };

    const statusNote = statusDescriptions[newStatus] || `Your order status has been updated to: ${newStatus}`;

    const mailOptions = {
        from: EMAIL_FROM,
        to: lead.email,
        subject: `Production Status Update: [${newStatus}] - ${lead.productType} | Slots Sports Wear`,
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 32px 24px; background-color: #ffffff; color: #111111; border: 1px solid #e5e5e5; border-radius: 16px;">
                <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #EDEEE7;">
                    <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: #666666;">
                        Manufacturing Progress Dispatch
                    </span>
                    <h1 style="font-size: 22px; font-weight: 800; margin: 10px 0 0 0; text-transform: uppercase; letter-spacing: 0.05em; color: #111111;">
                        SLOTS SPORTS WEAR
                    </h1>
                </div>

                <div style="padding: 24px 0 16px 0;">
                    <p style="font-size: 14px; color: #666666; margin: 0 0 8px 0;">Dear ${lead.name || 'Client'},</p>
                    <p style="font-size: 15px; color: #222222; margin: 0 0 20px 0; line-height: 1.6;">
                        This is an official milestone notification regarding your manufacturing inquiry for <strong>${lead.productType}</strong>.
                    </p>

                    <!-- Status Highlight Card -->
                    <div style="background-color: #111111; color: #EDEEE7; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 20px;">
                        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; opacity: 0.7;">Current Manufacturing Stage</span>
                        <div style="font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin: 8px 0 0 0; color: #10b981;">
                            ${newStatus}
                        </div>
                    </div>

                    <!-- Status Description -->
                    <div style="background-color: #fafafa; border: 1px solid #eaeaea; border-radius: 10px; padding: 16px; margin-bottom: 20px;">
                        <p style="font-size: 13px; line-height: 1.6; color: #444444; margin: 0;">
                            ${statusNote}
                        </p>
                    </div>

                    ${customNote ? `
                    <!-- Factory Engineering Note -->
                    <div style="background-color: #EDEEE7; border-left: 4px solid #111111; padding: 14px 16px; border-radius: 4px; margin-bottom: 20px;">
                        <span style="font-size: 10px; text-transform: uppercase; font-weight: 800; letter-spacing: 0.15em; color: #666;">Note From Production Director:</span>
                        <p style="font-size: 13px; color: #111; margin: 6px 0 0 0; line-height: 1.5; font-style: italic;">
                            "${customNote}"
                        </p>
                    </div>
                    ` : ''}
                </div>

                <div style="text-align: center; padding: 16px 0 20px 0; border-top: 1px solid #eeeeee;">
                    <p style="font-size: 12px; color: #777777; margin-bottom: 12px;">Questions about this update or need to revise CAD artwork?</p>
                    <a href="mailto:${process.env.COMPANY_EMAIL || process.env.ADMIN_EMAIL || 'slotssportswear@gmail.com'}" 
                       style="display: inline-block; background-color: #EDEEE7; color: #111111; border: 1px solid #d5d5d5; text-decoration: none; padding: 8px 20px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">
                        Reply to Factory Representative
                    </a>
                </div>

                <div style="text-align: center; padding-top: 16px; font-size: 10px; color: #aaaaaa; text-transform: uppercase; letter-spacing: 0.2em;">
                    Slots Sports Wear · Sialkot Manufacturing Division
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.warn("⚠️ CRM Warning: Status update email could not be delivered:", err);
    }
}
