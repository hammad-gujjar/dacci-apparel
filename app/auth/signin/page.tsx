'use client';
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from 'react-hot-toast';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await authClient.signIn.email({
      email: email,
      password: password,
      rememberMe: true,
    }, {
      onRequest: (ctx) => {
        //show loading
        setLoading(true);
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard
        setLoading(false);
        toast.success("Sign In successful");
        redirect("/");
      },
      onError: (ctx) => {
        // display the error message
        setLoading(false);
        if (ctx.error.status === 403) {
          toast.error("Please verify your email address");
        }
        toast.error(ctx.error.message);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <img src="/images/authbackground.png" alt="background" className="absolute w-full h-full object-cover inset-0 z-[-1]" />
      <div className="ios-card w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-between p-10">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-white">
              Welcome Back
            </h2>
            <p className="mt-3 text-sm text-white">
              Please login to your account.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 md:p-12 text-white">
          <h3 className="text-2xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-400 mt-1">
            Enter your credentials to continue.
          </p>

          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            <input type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ios-input"
              required />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ios-input pr-10"
                required
              />
              <button
                type="button"
                disabled={loading}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full light-button text-black"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <Link href="/auth/forget-password" className="underline">Forgot Password?</Link>
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