import { NextResponse } from "next/server";
import { transporter, EMAIL_FROM } from "@/lib/nodemailer";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
        }

        const mailOptions = {
            from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS || EMAIL_FROM,
            to: process.env.ADMIN_EMAIL,
            replyTo: email,
            subject: `New Newsletter Subscription — Slots Sports Wear`,
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #f0f0f0; border-radius: 12px; color: #111;">
                    <h2 style="font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; border-bottom: 2px solid #edeee7; padding-bottom: 20px; margin-bottom: 30px;">
                        New Subscriber Alert
                    </h2>
                    <p style="font-size: 14px; line-height: 1.6; color: #555; margin-bottom: 20px;">
                        A new customer has subscribed to the Slots Sports Wear newsletter.
                    </p>
                    <div style="background: #f9f9f9; padding: 25px; border-radius: 8px;">
                        <p style="margin: 0; font-size: 12px; text-transform: uppercase; font-weight: bold; color: #999; letter-spacing: 0.1em; margin-bottom: 5px;">Subscriber Email</p>
                        <p style="margin: 0; font-size: 16px; color: #111; font-weight: 500;">${email}</p>
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

        return NextResponse.json({ success: true, message: "Subscribed successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Error in newsletter subscription:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to process subscription" }, { status: 500 });
    }
}
