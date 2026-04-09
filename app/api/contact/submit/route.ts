import { NextResponse } from "next/server";
import { databaseConnection } from "@/lib/database";
import { TechPack } from "@/models/TechPack.model";
import { transporter, EMAIL_FROM } from "@/lib/nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        await databaseConnection();
        
        const newTechPack = await TechPack.create({
            name: body.name,
            email: body.email,
            company: body.company,
            productType: body.productType,
            productSlug: body.productSlug,
            quantity: Number(body.quantity),
            deadline: new Date(body.deadline),
            customizationDetails: body.customizationDetails,
            isNewStatus: true,
        });

        const mailOptions = {
            from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS || EMAIL_FROM,
            to: process.env.ADMIN_EMAIL,
            replyTo: body.email,
            subject: `New Tech Pack / Order from ${body.name} (${body.company || 'No Company'})`,
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #f0f0f0; border-radius: 12px; color: #111;">
                    <h2 style="font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; border-bottom: 2px solid #edeee7; padding-bottom: 20px; margin-bottom: 30px;">
                        New Tech Pack Submission
                    </h2>
                    
                    <div style="margin-bottom: 30px;">
                        <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="text-transform: uppercase; font-size: 11px; color: #999;">Client Name:</strong><br />${body.name}</p>
                        <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="text-transform: uppercase; font-size: 11px; color: #999;">Email:</strong><br />${body.email}</p>
                        <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="text-transform: uppercase; font-size: 11px; color: #999;">Company:</strong><br />${body.company || 'N/A'}</p>
                    </div>

                    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                        <h3 style="font-size: 14px; text-transform: uppercase; margin-top: 0; color: #333;">Product Details</h3>
                        <p style="margin: 5px 0; font-size: 13px;"><strong>Type:</strong> ${body.productType}</p>
                        <p style="margin: 5px 0; font-size: 13px;"><strong>Slug:</strong> ${body.productSlug || 'N/A'}</p>
                        <p style="margin: 5px 0; font-size: 13px;"><strong>Quantity:</strong> ${body.quantity}</p>
                        <p style="margin: 5px 0; font-size: 13px;"><strong>Target Deadline:</strong> ${new Date(body.deadline).toLocaleDateString()}</p>
                    </div>

                    <div style="margin-bottom: 30px;">
                        <h3 style="font-size: 14px; text-transform: uppercase; color: #333;">Customization Specifications</h3>
                        <div style="font-size: 14px; line-height: 1.6; color: #555; background: #fff; border: 1px solid #eee; padding: 15px; border-radius: 4px;">
                            ${body.customizationDetails.replace(/\n/g, '<br />')}
                        </div>
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

        return NextResponse.json({ success: true, message: "Request submitted successfully" }, { status: 201 });
    } catch (error: any) {
        console.error("Error submitting tech pack:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to submit request" }, { status: 500 });
    }
}
