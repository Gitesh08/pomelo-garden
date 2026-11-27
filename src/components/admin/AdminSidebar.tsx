"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BadgeCheck,
  BedDouble,
  ExternalLink,
  LogOut,
  Bell,
  Search,
  User,
} from "lucide-react";

export function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Bookings & KYC",
      href: "/admin/bookings",
      icon: BadgeCheck,
    },
    {
      name: "Rates & Studio",
      href: "/admin/rates-media",
      icon: BedDouble,
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      localStorage.removeItem("pomelo_admin_user");
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F5F4] flex flex-col font-sans text-[#161D1A]">
      {/* =========================================================================
          1. PERSISTENT DESKTOP SIDEBAR: Deep Forest Charcoal (#101814)
         ========================================================================= */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#101814] text-[#ECF2ED] z-40 hidden md:flex flex-col justify-between select-none shadow-md">
        {/* Top: Logo & Title */}
        <div className="flex flex-col">
          <div className="p-5 flex items-center gap-3 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm">
              <img
                src="/images/pomelo-garden-logo.svg"
                alt="Pomelo Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-lg font-bold text-white truncate leading-none">
                Pomelo Garden
              </span>
              <span className="font-mono text-[10px] text-[#89D6B1] uppercase tracking-wider mt-1">
                Owner Ledger
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1 mt-2">
            <span className="px-3 text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-2">
              Management
            </span>
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-[#1E6F50] text-white shadow-sm"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#89D6B1] shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}

            <div className="pt-3 mt-3 border-t border-white/10">
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-[#89D6B1]" />
                  <span>Live Public Site</span>
                </span>
                <span className="font-mono text-[10px] text-[#89D6B1]">↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Profile & Signout */}
        <div className="p-3 border-t border-white/10 bg-[#0d1310]">
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#1E6F50] flex items-center justify-center text-white font-bold text-xs shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate">Resort Owner</span>
                <span className="text-[10px] font-mono text-[#89D6B1] truncate">
                  Owner Portal
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          2. MAIN CONTENT WRAPPER WITH TOP HEADER BAR
         ========================================================================= */}
      <div className="md:pl-64 flex flex-col flex-1">
        <header className="h-14 sm:h-16 bg-white border-b border-[#E2E7E4] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          {/* Left: Brand Pill & Campus Status */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Online Badge */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#F4FBF6] border border-[#1E6F50]/20 text-[11px] font-mono text-[#1E6F50]">
              <span className="w-2 h-2 rounded-full bg-[#1E6F50] animate-pulse"></span>
              <span className="font-semibold uppercase tracking-wider">Live Ledger</span>
              <span className="hidden sm:inline text-gray-400">·</span>
              <span className="hidden sm:inline text-gray-600">Saphale Campus</span>
            </div>
          </div>

          {/* Right: Search & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F3] hover:bg-[#E2E7E4] text-[#161D1A] text-xs font-semibold border border-[rgba(139,130,88,0.2)] transition-colors"
            >
              <span className="hidden sm:inline">View Website</span>
              <span className="sm:hidden">Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#1E6F50]" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-black hover:bg-[#F3F5F4] rounded-lg transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Content Viewport with generous bottom padding for mobile tab bar */}
        <main className="p-3.5 sm:p-6 lg:p-8 flex-1 pb-24 md:pb-8">{children}</main>

        {/* =========================================================================
            3. MOBILE BOTTOM NAVIGATION DOCK (md:hidden)
            Enables instant one-thumb navigation across all admin pages for the owner
           ========================================================================= */}
        <nav
          aria-label="Mobile Bottom Navigation"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E7E4] shadow-lg flex items-center justify-around px-2 py-2"
        >
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
                  isActive ? "text-[#1E6F50] font-bold" : "text-gray-500 hover:text-[#161D1A]"
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg ${
                    isActive ? "bg-[#1E6F50]/10 text-[#1E6F50]" : "text-gray-500"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider mt-0.5">
                  {item.name.split(" ")[0]}
                </span>
              </Link>
            );
          })}

          {/* Quick Menu / Live Site Toggle */}
          <Link
            href="/"
            target="_blank"
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-gray-500 hover:text-[#161D1A] transition-all cursor-pointer"
          >
            <div className="p-1.5 rounded-lg text-gray-500">
              <ExternalLink className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider mt-0.5">
              Live Site
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
