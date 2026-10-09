export function getResetPasswordEmailHtml(email: string, name?: string, resetLink?: string): string {
    const displayName = name ? name.trim() : '';
    const targetLink = resetLink || '#';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset your password - SLOTS SPORTSWEAR</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f7f7; padding: 40px 15px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5;">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="background-color: #111111; padding: 28px 24px;">
                            <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: #888888; display: block; margin-bottom: 6px;">
                                Precision Athletic Apparel OEM/ODM
                            </span>
                            <span style="font-size: 22px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #ffffff;">
                                SLOTS SPORTSWEAR
                            </span>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 36px 32px; text-align: center;">
                            <h2 style="font-size: 20px; font-weight: 700; color: #111111; margin: 0 0 16px 0;">
                                Reset Your Password
                            </h2>
                            <p style="font-size: 15px; color: #555555; line-height: 1.6; margin: 0 0 16px 0;">
                                ${displayName ? `Hello <strong>${displayName}</strong>,` : 'Hello,'}
                            </p>
                            <p style="font-size: 14px; color: #666666; line-height: 1.6; margin: 0 0 28px 0;">
                                We received a request to reset the password for your account associated with <strong>${email}</strong>. Click below to securely choose a new password.
                            </p>
                            <!-- CTA Button -->
                            <div style="margin: 32px 0;">
                                <a href="${targetLink}" style="display: inline-block; background-color: #111111; color: #ffffff; text-decoration: none; padding: 14px 32px; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; border-radius: 6px;">
                                    Reset Password
                                </a>
                            </div>
                            <p style="font-size: 12px; color: #888888; line-height: 1.5; margin: 24px 0 0 0;">
                                If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
                            </p>
                            <p style="font-size: 11px; color: #aaaaaa; word-break: break-all; margin: 16px 0 0 0;">
                                If the button above does not work, copy and paste this link into your browser:<br/>
                                <a href="${targetLink}" style="color: #666666; text-decoration: underline;">${targetLink}</a>
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #fafafa; border-top: 1px solid #eeeeee; padding: 20px 24px; font-size: 11px; color: #999999; line-height: 1.5;">
                            SLOTS SPORTSWEAR · Sialkot, Pakistan • Worldwide Export Logistics<br/>
                            <a href="https://slotssportswear.vercel.app" style="color: #999999; text-decoration: none;">slotssportswear.vercel.app</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}