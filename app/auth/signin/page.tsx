'use client';
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useRef } from "react";
import toast from 'react-hot-toast';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Entry animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(cardRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(leftRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, "-=0.5")
      .fromTo(rightRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, "-=0.7")
      .fromTo(".auth-field", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3");
  }, { scope: containerRef });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await authClient.signIn.email({ email, password, rememberMe: true }, {
      onRequest: () => setLoading(true),
      onSuccess: () => {
        setLoading(false);
        toast.success("Welcome back!");
        redirect("/");
      },
      onError: (ctx) => {
        setLoading(false);
        if (ctx.error.status === 403) toast.error("Please verify your email address");
        else toast.error(ctx.error.message);
      },
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#EDEEE7]">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 59px, black 59px, black 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, black 59px, black 60px)',
      }} />

      {/* Brand mark top-left */}
      <Link href="/" className="absolute top-8 left-8 z-10">
        <h3 className="text-black opacity-80 hover:opacity-100 transition-opacity tracking-[0.3em]">DACCI</h3>
      </Link>

      {/* Main Card */}
      <div
        ref={cardRef}
        className="w-full max-w-5xl mx-4 grid grid-cols-1 md:grid-cols-2 border border-black/10 overflow-hidden"
        style={{ background: 'rgba(237,238,231,0.6)', backdropFilter: 'blur(40px)' }}
      >
        {/* LEFT — Brand Panel */}
        <div
          ref={leftRef}
          className="hidden md:flex flex-col justify-between p-12 bg-black text-[#EDEEE7] relative overflow-hidden"
        >
          {/* Decorative diagonal lines */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #EDEEE7 0px, #EDEEE7 1px, transparent 1px, transparent 60px)',
          }} />

          <div className="relative z-10">
            <span className="text-[10px] uppercase tracking-[0.6em] text-[#EDEEE7]/40 font-bold">Welcome Back</span>
            <h1 className="text-[#EDEEE7]! mt-4 leading-none text-5xl">Sign<br />Into<br />Dacci.</h1>
            <p className="mt-6 text-[#EDEEE7]/50 max-w-xs">
              Premium clothing crafted with care. Access your account to continue your journey.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-3">
            {["Curated Premium Collection", "Seamless Checkout", "Full Order History"].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-[#EDEEE7]/40" />
                <p className="text-[#EDEEE7]/50 text-[11px] tracking-[0.2em] uppercase">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Form */}
        <div ref={rightRef} className="p-8 md:p-12 flex flex-col justify-center gap-8 bg-[#EDEEE7]">
          <div className="auth-field">
            <span className="text-[10px] uppercase tracking-[0.5em] text-black/30 font-bold">Account Access</span>
            <h2 className="mt-2">Sign In</h2>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="auth-field flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white/60 border border-black/10 text-black placeholder:text-black/20 focus:border-black/40 focus:bg-white transition-all outline-none text-sm tracking-wide"
              />
            </div>

            <div className="auth-field flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-4 pr-14 bg-white/60 border border-black/10 text-black placeholder:text-black/20 focus:border-black/40 focus:bg-white transition-all outline-none text-sm tracking-wide"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition-colors"
                >
                  {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                </button>
              </div>
            </div>

            <div className="auth-field flex items-center justify-between">
              <Link
                href="/auth/forget-password"
                className="text-[10px] uppercase tracking-[0.3em] text-black/40 hover:text-black transition-colors underline underline-offset-4"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-field dark-button w-full justify-center py-5 text-[11px] tracking-[0.5em] uppercase font-bold disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>

            <p className="auth-field text-center text-[10px] uppercase tracking-[0.3em] text-black/30">
              New here?{" "}
              <Link href="/auth/signup" className="text-black underline underline-offset-4 hover:opacity-60 transition-opacity">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}