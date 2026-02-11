'use client'
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from 'react-hot-toast';

export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Set both passwords same.");
      return;
    }
    
    const { data, error } = await authClient.signUp.email({
      email: email,
      password: password,
      name: name,
    }, {
      onRequest: (ctx) => {
        //show loading
        setLoading(true);
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
        setLoading(false);
        toast.success("Sign Up successful");
        console.log("User signed up:", ctx.data);
        redirect("/auth/verifyemail");
      },
      onError: (ctx) => {
        // display the error message
        setLoading(false);
        toast.error(ctx.error.message);
      },
    });
    console.log({ data, error });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <img src="/images/authbackground.png" alt="background" className="absolute w-full h-full object-cover inset-0 z-[-1]" />
      <div className="ios-card w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-between p-10 text-white">
          <div>
            <h2 className="text-3xl font-semibold leading-tight">
              Get Started <br /> with Us
            </h2>
            <p className="mt-3 text-sm text-emerald-100">
              Complete these easy steps to register your account.
            </p>
          </div>

          <div className="space-y-3">
            {["Sign up your account", "Set up your workspace", "Set up your profile"].map(
              (step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${i === 0 ? "bg-white text-black" : "bg-white/10"
                    }`}
                >
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-black/80 text-white text-xs">
                    {i + 1}
                  </span>
                  {step}
                </div>
              )
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 md:p-12 text-white">
          <h3 className="text-2xl font-semibold">Sign Up Account</h3>
          <p className="text-sm text-white mt-1">
            Enter your personal data to continue.
          </p>

          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <input type="text"
                placeholder="Name"
                className="ios-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
              <input type="email"
                placeholder="Email"
                className="ios-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="ios-input pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <input
              type="password"
              placeholder="Confirm Password"
              className="ios-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full light-button text-black"
            >
              {loading ? "Signing Up..." : "Sign Up"}
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