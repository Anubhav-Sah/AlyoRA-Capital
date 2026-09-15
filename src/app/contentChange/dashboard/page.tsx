"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Home, Info, Wrench, FileText, Briefcase, DollarSign, Phone,
  Navigation, ArrowRight, CheckCircle, AlertCircle, RefreshCw, Activity,
  BarChart3, Clock, MessageSquare,
} from "lucide-react";

const pages = [
  { key: "home",                label: "Home & Live Stats",   href: "/contentChange/dashboard/home",                icon: Home,          color: "#1E7A3A", desc: "Stats Bar (₹250Cr+, 18.4%), Why AlyoRA pillars & under-card details, Hero, CTA" },
  { key: "services",            label: "Services & Sub-Pages",href: "/contentChange/dashboard/services",            icon: Wrench,        color: "#1E7A3A", desc: "Core service cards (+ Add Extra Card), service features, plans & detail pages" },
  { key: "reports",             label: "Reports & PDF Uploads",href: "/contentChange/dashboard/reports",             icon: FileText,      color: "#C8963E", desc: "Published reports, PDF uploads for client downloads, headings, subscriber status" },
  { key: "pricing",             label: "Pricing & Standalone",href: "/contentChange/dashboard/pricing",             icon: DollarSign,    color: "#27A84E", desc: "5-stage pricing tiers, special offers, standalone cards (+ Add Financial/Mutual Fund cards)" },
  { key: "about",               label: "About Us",            href: "/contentChange/dashboard/about",               icon: Info,          color: "#0D1F3C", desc: "Vision, Mission, Core Principles, Story, and Team/Values cards" },
  { key: "navbar",              label: "Footer & Regulatory", href: "/contentChange/dashboard/navbar",              icon: Navigation,    color: "#C8963E", desc: "AMFI Reg. No., SEBI Reg. No., City/Location, Social Media links, Disclaimers" },
  { key: "contact",             label: "Contact & Desk Info", href: "/contentChange/dashboard/contact",             icon: Phone,         color: "#1E7A3A", desc: "Email addresses, Phone numbers, WhatsApp link, Support desk hours" },
  { key: "inquiries",           label: "Client Inquiries Inbox",href: "/contentChange/dashboard/inquiries",          icon: MessageSquare, color: "#25D366", desc: "View all messages submitted by visitors on the website with 1-click WhatsApp reply" },
  { key: "business-consulting", label: "Business Consulting", href: "/contentChange/dashboard/business-consulting", icon: Briefcase,     color: "#0D1F3C", desc: "Consulting packages, engagement process steps, case studies" },
];

interface PingStatus {
  ok: boolean;
  latency: number;
  pingedAt: string;
}

export default function DashboardOverview() {
  const [pingStatus, setPingStatus] = useState<PingStatus | null>(null);
  const [pinging, setPinging] = useState(false);

  const runPing = async () => {
    setPinging(true);
    const start = Date.now();
    try {
      const res = await fetch("/api/ping");
      const data = await res.json();
      setPingStatus({ ok: data.ok, latency: Date.now() - start, pingedAt: new Date().toISOString() });
    } catch {
      setPingStatus({ ok: false, latency: 0, pingedAt: new Date().toISOString() });
    } finally {
      setPinging(false);
    }
  };

  useEffect(() => { runPing(); }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Content Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Select a page to edit its content, cards, images, text, and sections.
        </p>
      </div>

      {/* Status Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* DB Ping */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 shadow-sm">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${pingStatus?.ok ? "bg-green-50" : "bg-red-50"}`}>
            <Activity className={`w-5 h-5 ${pingStatus?.ok ? "text-[#1E7A3A]" : "text-red-500"}`} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Database</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {pingStatus?.ok
                ? <CheckCircle className="w-3.5 h-3.5 text-[#1E7A3A]" />
                : <AlertCircle className="w-3.5 h-3.5 text-red-500" />
              }
              <span className={`text-xs font-bold ${pingStatus?.ok ? "text-[#1E7A3A]" : "text-red-500"}`}>
                {pingStatus ? (pingStatus.ok ? `Live · ${pingStatus.latency}ms` : "Unreachable") : "Checking..."}
              </span>
            </div>
          </div>
          <button onClick={runPing} disabled={pinging} className="ml-auto text-gray-400 hover:text-gray-700 cursor-pointer">
            <RefreshCw className={`w-3.5 h-3.5 ${pinging ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Pages */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 shadow-sm">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Editable Pages</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{pages.length}</p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 shadow-sm">
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Pinged</p>
            <p className="text-xs font-semibold text-gray-700 mt-0.5">
              {pingStatus ? new Date(pingStatus.pingedAt).toLocaleTimeString() : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Page Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.key}
              href={page.href}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all group flex flex-col"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${page.color}15` }}
              >
                <Icon className="w-5 h-5" style={{ color: page.color }} />
              </div>
              <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#1E7A3A] transition-colors mb-1">
                {page.label}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed flex-1">
                {page.desc}
              </p>
              <div className="flex items-center gap-1 mt-3 text-[#1E7A3A] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Edit Page</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-[#0D1F3C] rounded-xl p-5 text-white/80 text-xs leading-relaxed">
        <p className="font-bold text-white mb-2">💡 How to use this CMS</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Click any page above to open its content editor.</li>
          <li>Add, remove, or reorder cards by dragging them.</li>
          <li>Edit text inline — click any text field to modify it.</li>
          <li>Upload images and PDFs directly from the editor.</li>
          <li>Click <strong className="text-[#27A84E]">Publish</strong> to push changes live immediately.</li>
          <li>Changes auto-save to InsForge database in real-time.</li>
        </ul>
      </div>
    </div>
  );
}
