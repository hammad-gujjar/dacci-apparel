'use client';
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from 'react-hot-toast';

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const request = await authClient.requestPasswordReset({
            email: email,
            redirectTo: '/auth/reset-password',
        }, {
            onRequest: (ctx) => {
                //show loading
                setLoading(true);
            },
            onSuccess: (ctx) => {
                //redirect to the dashboard
                setLoading(false);
                toast.success('Password reset link sent to your email');
            },
            onError: (ctx) => {
                // display the error message
                setLoading(false);
                toast.error(ctx.error.message);
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative">
            <img src="https://i.pinimg.com/1200x/a3/4e/ca/a34eca4b513511a5411c93b287a3cd0c.jpg" alt="background" className="absolute w-full h-full object-cover inset-0 z-[-1]" />
            <div className="ios-card w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">

                {/* LEFT PANEL */}
                <div className="hidden md:flex flex-col justify-between p-10">
                    <div>
                        <h2 className="text-3xl font-semibold leading-tight text-white">
                            Reset password
                        </h2>
                        <p className="mt-3 text-sm text-white">
                            Please enter your email to reset your password.
                        </p>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="p-8 md:p-12 text-white">
                    <h3 className="text-2xl font-semibold">Reset Password</h3>
                    <p className="text-sm text-gray-400 mt-1">
                        Enter your email to get reset password link.
                    </p>

                    <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
                        <input type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="ios-input"
                            required />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full text-black light-button"
                        >
                            {loading ? "Sending link..." : "Send"}
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{`
        .ios-input {
          width: 100%;
          background: #111;
          border: 1px solid #333;
          border-radius: 0.5rem;
          padding: 0.6rem 0.75rem;
          font-size: 0.875rem;
          color: white;
        }
        .ios-input:focus {
          border-color: #10b981;
          outline: none;
        }
      `}</style>
        </div>
    );
}