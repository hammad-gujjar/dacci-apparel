import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getResetPasswordEmailHtml } from "./email-reset";
import { EMAIL_FROM, resend } from "./resend";
import { getEmailVerifyHtml } from "./email-verify";
import { myPlugin } from "./plugins";

const client = new MongoClient(process.env.MONGODB_URL!);
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    baseURL: process.env.BETTER_AUTH_URL,

    plugins: [myPlugin()],

    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            try {
                const VerifyemailHtml = getEmailVerifyHtml(user.email!, user.name, url,);

                // send email using resend
                await resend.emails.send({
                    from: EMAIL_FROM,
                    to: user.email!,
                    subject: 'Verify your email address',
                    html: VerifyemailHtml,
                });
            } catch (error) {
                console.log('email sending error:', error);
            }
            if (process.env.NODE_ENV === 'development') {
                console.log('Verification token:', url);
            }
        },
    },

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            try {
                const ResetemailHtml = getResetPasswordEmailHtml(user.email!, user.name, url);

                // send email using resend
                const { data, error } = await resend.emails.send({
                    from: EMAIL_FROM,
                    to: user.email!,
                    subject: 'Reset your password',
                    html: ResetemailHtml,
                });

                if (error) {
                    console.log('Error sending reset password email:', error);
                    throw new Error('Failed to send reset password email');
                }
                console.log('Reset password email sent:', data?.id);

                if (process.env.NODE_ENV === 'development') {
                    console.log("Reset password link for", url);
                }


            } catch (error) {
                console.log('Error in sendResetPassword:', error);
            }
        },
    },
});