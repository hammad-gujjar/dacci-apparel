import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD, // Add your Gmail App Password here in .env.local
    },
});

export const EMAIL_FROM = process.env.ADMIN_EMAIL || 'info@dacciapparel.com';

// Verify the connection configuration
transporter.verify(function (error: any, success: any) {
    if (error) {
        console.warn("⚠️ Nodemailer SMTP Error: Cannot connect to email server.");
        console.warn("If you are using Gmail, you MUST use a 'Google App Password', not your regular password.");
        console.warn("Please generate an App Password in your Google Account and set ADMIN_EMAIL_PASSWORD in your .env.local file.");
    } else {
        console.log("✅ Nodemailer SMTP ready successfully!");
    }
});
