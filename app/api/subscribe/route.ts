import { NextResponse } from "next/server";
import { transporter } from "@/lib/nodemailer";

export async function POST(req: Request) {
    try {
        // Fail loudly instead of trying (and silently failing) to authenticate —
        // this is the #1 cause of "nothing arrives" with zero visible error.
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_EMAIL_PASSWORD) {
            console.error("Missing ADMIN_EMAIL or ADMIN_EMAIL_PASSWORD in environment.");
            return NextResponse.json(
                { success: false, message: "Server email configuration is missing." },
                { status: 500 }
            );
        }

        const { firstName, contact, inquiry } = await req.json();

        if (!firstName || !contact || !inquiry) {
            return NextResponse.json(
                { success: false, message: "First name, contact, and inquiry are all required." },
                { status: 400 }
            );
        }

        // If they left an email, replies can go straight to them.
        // A WhatsApp number isn't a valid reply-to address, so skip it in that case.
        const replyTo = contact.includes("@") ? contact : undefined;

        const mailOptions = {
            // Gmail's SMTP relay requires (or silently rewrites) the "from" address
            // to match the authenticated account. Sending "from" an unrelated domain
            // (like the old COMPANY_EMAIL fallback) while authenticating as
            // ADMIN_EMAIL is the most common reason these emails never landed.
            from: `"Slots Sports Wear" <${process.env.ADMIN_EMAIL}>`,
            to: process.env.ADMIN_EMAIL,
            replyTo,
            subject: `New Inquiry — Slots Sports Wear`,
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #f0f0f0; border-radius: 12px; color: #111;">
                    <h2 style="font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; border-bottom: 2px solid #edeee7; padding-bottom: 20px; margin-bottom: 30px;">
                        New Inquiry Received
                    </h2>
                    <p style="font-size: 14px; line-height: 1.6; color: #555; margin-bottom: 25px;">
                        A new inquiry has been submitted through the Slots Sports Wear website.
                    </p>
                    <div style="background: #f9f9f9; padding: 22px; border-radius: 8px; margin-bottom: 14px;">
                        <p style="margin: 0 0 5px; font-size: 12px; text-transform: uppercase; font-weight: bold; color: #999; letter-spacing: 0.1em;">First Name</p>
                        <p style="margin: 0; font-size: 16px; color: #111; font-weight: 500;">${firstName}</p>
                    </div>
                    <div style="background: #f9f9f9; padding: 22px; border-radius: 8px; margin-bottom: 14px;">
                        <p style="margin: 0 0 5px; font-size: 12px; text-transform: uppercase; font-weight: bold; color: #999; letter-spacing: 0.1em;">Email / WhatsApp</p>
                        <p style="margin: 0; font-size: 16px; color: #111; font-weight: 500;">${contact}</p>
                    </div>
                    <div style="background: #f9f9f9; padding: 22px; border-radius: 8px;">
                        <p style="margin: 0 0 5px; font-size: 12px; text-transform: uppercase; font-weight: bold; color: #999; letter-spacing: 0.1em;">Inquiry</p>
                        <p style="margin: 0; font-size: 15px; color: #111; line-height: 1.6; white-space: pre-wrap;">${inquiry}</p>
                    </div>
                    <div style="margin-top: 40px; border-top: 1px solid #f0f0f0; padding-top: 30px; text-align: center;">
                        <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.3em; color: #ccc; font-weight: bold;">
                            Slots Sports Wear · Manufacturing Excellence
                        </p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Inquiry sent successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Error sending inquiry email:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Failed to send inquiry" },
            { status: 500 }
        );
    }
}
