import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getResetPasswordEmailHtml } from "./email-reset";
import { EMAIL_FROM, transporter } from "./nodemailer";
import { getEmailVerifyHtml } from "./email-verify";
import { myPlugin } from "./plugins";

const client = new MongoClient(process.env.MONGODB_URL!);
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    trustedOrigins: [
        process.env.BETTER_AUTH_URL,
        "http://localhost:3000",
    ].filter(Boolean) as string[],

    plugins: [myPlugin()],

    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            try {
                const VerifyemailHtml = getEmailVerifyHtml(user.email!, user.name, url,);

                // send email using nodemailer
                await transporter.sendMail({
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

                // send email using nodemailer
                const info = await transporter.sendMail({
                    from: EMAIL_FROM,
                    to: user.email!,
                    subject: 'Reset your password',
                    html: ResetemailHtml,
                });

                console.log('Reset password email sent:', info.messageId);

                if (process.env.NODE_ENV === 'development') {
                    console.log("Reset password link for", url);
                }


            } catch (error) {
                console.log('Error in sendResetPassword:', error);
            }
        },
    },

    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    try {
                        const adminEmail = process.env.ADMIN_EMAIL;
                        if (adminEmail) {
                            await transporter.sendMail({
                                from: EMAIL_FROM,
                                to: adminEmail,
                                subject: 'New User Registered - Dacci Apparel',
                                html: `<p>A new user has registered on Dacci Apparel:</p><p>Name: ${user.name}</p><p>Email: ${user.email}</p>`,
                            });
                        }
                    } catch (err) {
                        console.error('Failed to send registration admin email', err);
                    }
                }
            }
        },
        session: {
            create: {
                after: async (session) => {
                    try {
                        const adminEmail = process.env.ADMIN_EMAIL;
                        if (adminEmail) {
                            // Fetch user details to send in login notification
                            const dbUser = await db.collection('user').findOne({ id: session.userId });
                            const userEmail = dbUser?.email || 'Unknown Email';
                            const userName = dbUser?.name || 'Unknown User';
                            
                            await transporter.sendMail({
                                from: EMAIL_FROM,
                                to: adminEmail,
                                subject: 'User Logged In - Dacci Apparel',
                                html: `<p>A user just logged in.</p><p>Name: ${userName}</p><p>Email: ${userEmail}</p>`,
                            });
                        }
                    } catch (err) {
                        console.error('Failed to send login admin email', err);
                    }
                }
            }
        }
    }
});