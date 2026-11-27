"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("pomelo_admin_user", JSON.stringify(data.user));
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid login credentials. Please try again.");
      }
    } catch {
      setError("Network or server error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setIdentifier("9850607607");
    setPassword("pomelo2026");
    setError(null);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FAF8F3] px-4 py-8 sm:py-12 font-sans text-[#141715] selection:bg-[#E06354]/20">
      {/* Background soft ambient accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#7BA23F]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#E06354]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#56635A] hover:text-[#141715] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </Link>
        </div>

        {/* Clean Luxury Card */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-[rgba(139,130,88,0.22)] shadow-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FAF8F3] border border-[rgba(139,130,88,0.25)] p-2 shadow-xs flex items-center justify-center">
              <img
                src="/images/pomelo-garden-logo.svg"
                alt="Pomelo Garden Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#141715]">
                Owner Portal
              </h1>
              <p className="text-xs text-[#56635A] mt-1 font-normal">
                Sign in to manage bookings, rates, and guest ledger
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-[#E06354]/10 border border-[#E06354]/30 text-xs text-[#E06354] font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#56635A] mb-1.5"
              >
                Phone or Email
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 9850607607"
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-[#FAF8F3] text-sm text-[#141715] border border-[rgba(139,130,88,0.25)] focus:border-[#141715] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#56635A] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#FAF8F3] text-sm text-[#141715] border border-[rgba(139,130,88,0.25)] focus:border-[#141715] focus:bg-white focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-gray-400 hover:text-black absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 mt-2 rounded-xl bg-[#141715] hover:bg-[#28302b] text-[#FAF8F3] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 text-[#7BA23F]" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="pt-2 border-t border-[rgba(139,130,88,0.16)] text-center">
            <button
              type="button"
              onClick={handleQuickFill}
              className="inline-flex items-center gap-1.5 text-xs text-[#788E73] hover:text-[#141715] font-mono cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E06354]" />
              <span>Fill Demo Credentials (9850607607 / pomelo2026)</span>
            </button>
          </div>
        </div>

        {/* Sub-footer */}
        <p className="text-center text-[11px] font-mono text-[#56635A] mt-5">
          Pomelo Garden · Saphale, Palghar
        </p>
      </div>
    </div>
  );
}
