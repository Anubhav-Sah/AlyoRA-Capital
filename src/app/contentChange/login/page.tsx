"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, Eye, EyeOff, AlertCircle, Shield, X } from "lucide-react";
import { signIn, signUp, getCurrentUser, ensureUserProfile, fetchUserProfile, type UserProfile } from "@/lib/content-client";
import { insforge } from "@/lib/insforge";


export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        // Email verification is DISABLED — signup returns accessToken immediately
        const { error: signUpError, data: signUpData } = await signUp(email, password);
        if (signUpError) {
          const msg = (signUpError as { message?: string }).message || "";
          // If user already exists, just try to sign in
          if (msg.toLowerCase().includes("already")) {
            setMode("login");
            setError("Account already exists. Please sign in.");
            setLoading(false);
            return;
          }
          setError(msg || "Registration failed. Please try again.");
          setLoading(false);
          return;
        }

        // Email verification disabled — log in immediately after signup
        const { error: loginErr, data: loginData } = await signIn(email, password);
        if (loginErr || !loginData?.user) {
          setError("Account created! Please sign in with your credentials.");
          setMode("login");
          setLoading(false);
          return;
        }

        const profile = await fetchUserProfile(loginData.user.id, email.trim().toLowerCase());

        if (!profile || profile.role !== "admin") {
          setShowRequestModal(true);
          setLoading(false);
          return;
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("alyora_admin_profile", JSON.stringify(profile));
        }

        router.replace("/contentChange/dashboard");
        return;
      }

      // Login flow
      const { error: loginError, data } = await signIn(email, password);
      if (loginError || !data?.user) {
        const msg = (loginError as { message?: string })?.message || "";
        if (msg.toLowerCase().includes("verif")) {
          setError("Email not verified. Since verification is now disabled, please register a new account or contact the admin.");
        } else {
          setError(msg || "Invalid credentials. Please try again.");
        }
        setLoading(false);
        return;
      }

      await ensureUserProfile(data.user.id, email);
      const profile = await fetchUserProfile(data.user.id, email.trim().toLowerCase());
      console.log("[Admin Login] Fetched user profile:", profile);

      if (!profile || profile.role !== "admin") {
        setShowRequestModal(true);
        setLoading(false);
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("alyora_admin_profile", JSON.stringify(profile));
      }

      router.replace("/contentChange/dashboard");
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#0D1F3C] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E7A3A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#C8963E]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo + title */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white p-1 shadow-2xl mb-4 border-2 border-[#1E7A3A]/40">
            <Image src="/images/logo.png" alt="AlyoRA Logo" fill className="object-contain p-1" />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">AlyoRA Admin</h1>
          <p className="text-white/40 text-xs mt-1 tracking-widest uppercase">
            Content Management System
          </p>
        </div>

        {/* Glass Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex gap-1 mb-6 p-1 bg-white/5 rounded-lg">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 text-xs font-semibold py-2 rounded-md transition-all cursor-pointer ${
                  mode === m
                    ? "bg-[#1E7A3A] text-white shadow"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#1E7A3A]/60 focus:bg-white/8 transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                minLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#1E7A3A]/60 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              id="admin-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E7A3A] hover:bg-[#27A84E] disabled:opacity-50 text-white font-semibold py-3 rounded-lg text-sm transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Shield className="w-4 h-4" />
              )}
              {loading ? "Authenticating..." : mode === "login" ? "Sign In to Admin" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-2">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/20 text-xs">secured by InsForge Auth</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        </div>

        <p className="text-center text-white/20 text-xs mt-4">
          This page is not linked from the public website.
        </p>
      </div>

      {/* Request Admin Access Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D1F3C] border border-[#1E7A3A]/30 rounded-2xl p-8 max-w-sm w-full shadow-2xl relative">
            <button
              onClick={() => setShowRequestModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-amber-400" />
              </div>

              <h2 className="text-white text-lg font-bold mb-2">Access Restricted</h2>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Your account has been created but you have <span className="text-amber-400 font-semibold">user</span> role by default.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left w-full mb-5">
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2">How to get admin access</p>
                <p className="text-white/70 text-xs leading-relaxed">
                  Contact the site administrator and ask them to run the following in InsForge CLI:
                </p>
                <div className="mt-2 bg-black/40 rounded-lg px-3 py-2 font-mono text-[10px] text-[#27A84E] break-all">
                  {`npx @insforge/cli db query "UPDATE user_profiles SET role='admin' WHERE email='${email}'"` }
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <button
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const p = await fetchUserProfile(undefined, email.trim().toLowerCase());
                      if (p && p.role === "admin") {
                        if (typeof window !== "undefined") {
                          localStorage.setItem("alyora_admin_profile", JSON.stringify(p));
                        }
                        setShowRequestModal(false);
                        router.replace("/contentChange/dashboard");
                        return;
                      }
                      alert("Role is still 'user'. Please check with the administrator.");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="flex-1 bg-[#1E7A3A] hover:bg-[#27A84E] text-white font-semibold py-2.5 rounded-lg text-xs cursor-pointer transition-all shadow-md"
                >
                  Check Again & Enter
                </button>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 rounded-lg text-xs cursor-pointer transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
