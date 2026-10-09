import nodemailer from 'nodemailer';

/**
 * SLOTS SPORTSWEAR — Centralized SMTP Transporter & Outbound Mail Engine
 * Supports standard SMTP (Google Workspace, Hostinger, Custom Domain Mail, SES)
 * with backward-compatible fallbacks for existing Gmail credentials.
 */

// SMTP Connection Configuration
const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = parseInt(process.env.SMTP_PORT || '465', 10);
const secure = process.env.SMTP_SECURE !== undefined ? process.env.SMTP_SECURE === 'true' : port === 465;

// Authentication Credentials (strictly decoupled from notification inboxes)
const user = process.env.SMTP_USER || 'slotssportswear@gmail.com';
const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

// Create decoupled transporter (utilizes optimized Gmail service driver when targeting Gmail)
export const transporter = (host === 'smtp.gmail.com' || host === 'gmail')
    ? nodemailer.createTransport({
        service: 'gmail',
        auth: user && pass ? { user, pass } : undefined,
        tls: {
            rejectUnauthorized: false
        }
    })
    : nodemailer.createTransport({
        host,
        port,
        secure,
        auth: user && pass ? { user, pass } : undefined,
        tls: {
            rejectUnauthorized: false
        }
    });

// Standardized Sender Header
const fromName = process.env.SMTP_FROM_NAME || 'SLOTS SPORTSWEAR';
const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.NEXT_PUBLIC_EMAIL_ADDRESS || 'slotssportswear@gmail.com';
export const EMAIL_FROM = `"${fromName}" <${fromEmail}>`;

// Connection verification (Logs clean status without leaking credentials)
if (process.env.NODE_ENV !== 'production') {
    transporter.verify((error: any) => {
        if (error) {
            console.warn(`⚠️ Nodemailer SMTP Warning: Unable to connect to ${host}:${port} (${error.code || error.message})`);
            console.warn("  Ensure SMTP_USER and SMTP_PASS in .env.local are configured with an active App Password or mailbox credentials.");
        } else {
            console.log(`✅ Nodemailer SMTP Connected Successfully (${host}, User: ${user})`);
        }
    });
}
