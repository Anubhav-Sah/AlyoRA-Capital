"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard, Home, Info, Wrench, FileText, Briefcase,
  DollarSign, Phone, Menu, ChevronLeft, LogOut, Shield,
  Navigation, RefreshCw, Activity, Globe,
} from "lucide-react";
import { getCurrentUser, signOut } from "@/lib/content-client";

import type { UserProfile } from "@/lib/content-client";

const navItems = [
  { label: "Overview",         href: "/contentChange/dashboard",                   icon: LayoutDashboard },
  { label: "Home",             href: "/contentChange/dashboard/home",               icon: Home },
  { label: "About",            href: "/contentChange/dashboard/about",              icon: Info },
  { label: "Services",         href: "/contentChange/dashboard/services",           icon: Wrench },
  { label: "Reports",          href: "/contentChange/dashboard/reports",            icon: FileText },
  { label: "Business Consulting", href: "/contentChange/dashboard/business-consulting", icon: Briefcase },
  { label: "Pricing",          href: "/contentChange/dashboard/pricing",            icon: DollarSign },
  { label: "Contact",          href: "/contentChange/dashboard/contact",            icon: Phone },
  { label: "Navbar",           href: "/contentChange/dashboard/navbar",             icon: Navigation },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    getCurrentUser().then((profile) => {
      console.log("[Dashboard Layout] Verified profile:", profile);
      if (!profile || profile.role !== "admin") {
        router.replace("/contentChange/login");
        return;
      }
      setUser(profile);
      setLoading(false);
    });
  }, [router]);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/contentChange/login");
  };

  const handlePublishAll = useCallback(async () => {
    setPublishing(true);
    try {
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET || "alyora-revalidate-2024" }),
      });
      setTimeout(() => setPublishing(false), 1500);
    } catch {
      setPublishing(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1F3C] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#27A84E] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/50 text-sm">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-60" : "w-16"
        } bg-[#0D1F3C] flex-shrink-0 flex flex-col transition-all duration-300 min-h-screen sticky top-0 h-screen overflow-y-auto`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {sidebarOpen && (
            <Link href="/" target="_blank" className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-md overflow-hidden bg-white p-0.5">
                <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <span className="text-white text-sm font-bold">AlyoRA CMS</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white/40 hover:text-white transition-colors cursor-pointer p-1"
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 space-y-0.5 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={!sidebarOpen ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#1E7A3A] text-white shadow"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-white/10 space-y-2">
          {/* Publish All */}
          <button
            onClick={handlePublishAll}
            disabled={publishing}
            title={!sidebarOpen ? "Publish All" : undefined}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1E7A3A]/20 hover:bg-[#1E7A3A]/30 border border-[#1E7A3A]/30 text-[#27A84E] text-xs font-semibold transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 flex-shrink-0 ${publishing ? "animate-spin" : ""}`} />
            {sidebarOpen && <span>{publishing ? "Publishing..." : "Publish All"}</span>}
          </button>

          {/* View Live Site */}
          <Link
            href="/"
            target="_blank"
            title={!sidebarOpen ? "View Site" : undefined}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/8 text-xs transition-all"
          >
            <Globe className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>View Live Site</span>}
          </Link>

          {/* User info + logout */}
          {sidebarOpen && user && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <div className="w-6 h-6 rounded-full bg-[#27A84E]/20 border border-[#27A84E]/40 flex items-center justify-center flex-shrink-0">
                <Shield className="w-3 h-3 text-[#27A84E]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white text-[10px] font-semibold truncate">{user.email}</p>
                <p className="text-[#27A84E] text-[9px] uppercase tracking-wider">Admin</p>
              </div>
              <button onClick={handleSignOut} className="text-white/30 hover:text-red-400 cursor-pointer" title="Sign out">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {!sidebarOpen && (
            <button
              onClick={handleSignOut}
              title="Sign out"
              className="w-full flex justify-center px-3 py-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/8 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-[#1E7A3A]" />
            <span className="text-sm font-semibold text-gray-800">Content Management Dashboard</span>
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Live
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1.5 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Open Site</span>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
