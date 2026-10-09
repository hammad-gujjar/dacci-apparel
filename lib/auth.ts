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
        process.env.NEXT_PUBLIC_SITE_URL,
        "https://slotssportswear.vercel.app",
        "http://localhost:3000",
    ].filter(Boolean) as string[],

    plugins: [myPlugin()],

    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            try {
                const VerifyemailHtml = getEmailVerifyHtml(user.email!, user.name, url);

                // send email using nodemailer
                await transporter.sendMail({
                    from: EMAIL_FROM,
                    to: user.email,
                    subject: 'Verify your email address - SLOTS SPORTSWEAR',
                    html: VerifyemailHtml,
                });
            } catch (error) {
                console.error('Email verification sending error:', error);
            }
            if (process.env.NODE_ENV === 'development') {
                console.log('Verification token URL:', url);
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
                    subject: 'Reset your password - SLOTS SPORTSWEAR',
                    html: ResetemailHtml,
                });

                console.log('Reset password email sent:', info.messageId);

                if (process.env.NODE_ENV === 'development') {
                    console.log("Reset password link:", url);
                }
            } catch (error) {
                console.error('Error in sendResetPassword:', error);
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
                                subject: 'New User Registered - SLOTS SPORTSWEAR',
                                html: `<p>A new user has registered on SLOTS SPORTSWEAR:</p><p>Name: ${user.name}</p><p>Email: ${user.email}</p>`,
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
                            const mongoose = require('mongoose');
                            const { getUsersConnection } = require('@/lib/database');
                            
                            let dbUser = null;
                            try {
                                const userDb = await getUsersConnection();
                                const User = userDb.models.User || userDb.model('User', new mongoose.Schema({}, { strict: false }), 'user');
                                dbUser = await User.findById(session.userId);
                                if (!dbUser) {
                                    dbUser = await User.findOne({ id: session.userId });
                                }
                            } catch (e) {
                                console.error('Error fetching user for login notification', e);
                            }
                            
                            const userEmail = dbUser?.email || 'Unknown Email';
                            const userName = dbUser?.name || 'Unknown User';

                            // Prevent duplicate emails or emails for missing users
                            if (!dbUser) {
                                console.warn(`Login notification skipped: could not resolve user for session userId ${session.userId}`);
                                return;
                            }

                            await transporter.sendMail({
                                from: EMAIL_FROM,
                                to: adminEmail,
                                subject: 'User Logged In - SLOTS SPORTSWEAR',
                                html: `<p>A user just logged in to SLOTS SPORTSWEAR.</p><p>Name: ${userName}</p><p>Email: ${userEmail}</p>`,
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