'use client';
import { useState } from "react";

export default function Verifyemail() {
    const [token, settoken] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative">
            <img src="https://i.pinimg.com/1200x/a3/4e/ca/a34eca4b513511a5411c93b287a3cd0c.jpg" alt="background" className="absolute w-full h-full object-cover inset-0 z-[-1]" />
            <div className="ios-card max-w-5xl">
                <ul className="w-[50vw] flex flex-col items-center justify-center text-white py-5 px-3">
                    <h1 className="text-3xl font-semibold leading-tight">Verify Your Email</h1>
                    <p className="mt-3 text-md text-emerald-100 text-center">We've sent a verification link to your email address. Please check your inbox and click to verify your email.</p>
                    <p className="mt-3 text-md text-emerald-100">You will automatically redirect to the home page after verification.</p>
                </ul>
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