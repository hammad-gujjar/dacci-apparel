'use client';
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const token = new URLSearchParams(window.location.search).get("token");

  if(!token){
    toast.error("Invalid token");
    redirect("/auth/forget-password");
}

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if(newpassword !== confirmpassword){
        toast.error("Passwords do not match");
        return;
    }

    const { data, error } = await authClient.resetPassword({
      newPassword: newpassword,
      token,
    }, {
      onRequest: (ctx) => {
        //show loading
        setLoading(true);
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard
        setLoading(false);
        toast.success("Password changed successfully");
        console.log("password has been changed");
        redirect("/auth/signin");
      },
      onError: (ctx) => {
        // display the error message
        setLoading(false);
        toast.error(ctx.error.message);
      },
    });
    console.log(data, error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <img src="https://i.pinimg.com/1200x/a3/4e/ca/a34eca4b513511a5411c93b287a3cd0c.jpg" alt="background" className="absolute w-full h-full object-cover inset-0 z-[-1]" />
      <div className="ios-card w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-between p-10">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-white">
              Change Password
            </h2>
            <p className="mt-3 text-sm text-white">
              Please enter new passwords!
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 md:p-12 text-white">
          <h3 className="text-2xl font-semibold">Change Password</h3>
          <p className="text-sm text-gray-400 mt-1">
            Enter new passwords to continue.
          </p>

          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
                className="ios-input pr-10"
                required
              />
              <button
                disabled={loading || !token}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="ios-input pr-10"
                required
              />

            <button
              type="submit"
              disabled={loading || !token}
              className="w-full light-button text-black"
            >
              {loading ? "Changing..." : "Change"}
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