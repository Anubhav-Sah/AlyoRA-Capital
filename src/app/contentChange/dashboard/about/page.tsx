"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Info, Eye, Target, BookOpen, ShieldCheck, Award, PhoneCall,
  Save, RefreshCw, CheckCircle2, AlertCircle, ExternalLink
} from "lucide-react";
import { getSiteContent } from "@/lib/content-client";

const DEFAULT_DATA = {
  // Hero
  hero_heading: "About AlyoRA Capital Research",
  hero_description:
    "We are an independent equity research and investment advisory firm dedicated to bringing institutional-grade market clarity to retail and high-net-worth investors.",

  // Pillars Header
  pillars_section_tag: "Our Foundation",
  pillars_section_title: "Built on Data. Driven by Integrity.",

  // Vision Pillar
  vision_title: "Research for Every Indian Investor",
  vision_desc:
    "To democratise institutional financial research and make it accessible to every Indian investor — from the salaried professional running their first SIP to the HNI building a multi-crore equity portfolio.",
  vision_pt1: "No investor left behind — scalable from ₹5,000 SIPs to crore-plus portfolios",
  vision_pt2: "Institutional research quality at retail subscription price points",
  vision_pt3: "Bridge the information asymmetry between retail and institutional market participants",

  // Mission Pillar
  mission_title: "SEBI-Aligned, Data-Driven Research",
  mission_desc:
    "To deliver SEBI-aligned, data-driven financial research with complete transparency and zero broker bias — ensuring every subscriber receives an unfiltered, unbiased view of the markets.",
  mission_pt1: "100% subscription-funded — zero dependency on broker or corporate advisory fees",
  mission_pt2: "SEBI Research Analyst framework compliance with full disclosure",
  mission_pt3: "Transparent pricing with explicit deliverables for every plan tier",

  // About AlyoRA Pillar
  about_title: "Founding Story & Core Principles",
  about_desc:
    "Founded in 2021, AlyoRA Capital Research was built to address a critical gap: unbiased, non-commission-driven financial analysis for retail and HNI investors. Unlike brokerage houses that profit from trading volume, our revenue comes solely from transparent subscriptions.",
  about_pt1: "Institutional-grade DCF & earnings models behind every recommendation",
  about_pt2: "Plain-language research — no jargon, no false complexity",
  about_pt3: "Conviction over coverage — we go deep, not wide",

  // Strengths
  strengths_tag: "Our Strengths",
  strengths_heading: "Why AlyoRA Stands Apart",
  s1_title: "Zero Broker Conflict",
  s1_desc: "No hidden kickbacks or churn recommendations.",
  s2_title: "Institutional DCF Modeling",
  s2_desc: "Every stock recommendation backed by a 5-year cashflow model.",
  s3_title: "SEBI Research Analyst Registered",
  s3_desc: "Operating under SEBI's Research Analyst framework with full compliance.",

  // Stats Card
  stats_title: "Research Expertise at a Glance",
  s1_val: "5+ Years",
  s1_label: "Market Track Record",
  s1_sub: "Tested across bull & bear cycles",

  s2_val: "500+",
  s2_label: "Investors Advised",
  s2_sub: "Across 18+ Indian states",

  s3_val: "100+",
  s3_label: "Deep-Dive Reports",
  s3_sub: "Published for subscribers",

  s4_val: "100%",
  s4_label: "SEBI Aligned",
  s4_sub: "Framework compliance",

  cta_button_text: "Speak With Our Analytical Team",
};

export default function SimpleAdminAboutPage() {
  const [form, setForm] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const rows = await getSiteContent("about");
        const merged: Partial<typeof DEFAULT_DATA> = {};

        rows.forEach((r) => {
          if (!r.value) return;
          if (r.section === "hero") {
            if (r.key === "heading") merged.hero_heading = r.value;
            if (r.key === "description") merged.hero_description = r.value;
          } else if (r.section === "pillars") {
            if (r.key === "section_tag") merged.pillars_section_tag = r.value;
            if (r.key === "section_title") merged.pillars_section_title = r.value;
            if (r.key === "vision_title") merged.vision_title = r.value;
            if (r.key === "vision_desc") merged.vision_desc = r.value;
            if (r.key === "vision_pt1") merged.vision_pt1 = r.value;
            if (r.key === "vision_pt2") merged.vision_pt2 = r.value;
            if (r.key === "vision_pt3") merged.vision_pt3 = r.value;
            if (r.key === "mission_title") merged.mission_title = r.value;
            if (r.key === "mission_desc") merged.mission_desc = r.value;
            if (r.key === "mission_pt1") merged.mission_pt1 = r.value;
            if (r.key === "mission_pt2") merged.mission_pt2 = r.value;
            if (r.key === "mission_pt3") merged.mission_pt3 = r.value;
            if (r.key === "about_title") merged.about_title = r.value;
            if (r.key === "about_desc") merged.about_desc = r.value;
            if (r.key === "about_pt1") merged.about_pt1 = r.value;
            if (r.key === "about_pt2") merged.about_pt2 = r.value;
            if (r.key === "about_pt3") merged.about_pt3 = r.value;
          } else if (r.section === "strengths") {
            if (r.key === "tag") merged.strengths_tag = r.value;
            if (r.key === "heading") merged.strengths_heading = r.value;
            if (r.key === "s1_title") merged.s1_title = r.value;
            if (r.key === "s1_desc") merged.s1_desc = r.value;
            if (r.key === "s2_title") merged.s2_title = r.value;
            if (r.key === "s2_desc") merged.s2_desc = r.value;
            if (r.key === "s3_title") merged.s3_title = r.value;
            if (r.key === "s3_desc") merged.s3_desc = r.value;
          } else if (r.section === "stats") {
            if (r.key === "title") merged.stats_title = r.value;
            if (r.key === "s1_val") merged.s1_val = r.value;
            if (r.key === "s1_label") merged.s1_label = r.value;
            if (r.key === "s1_sub") merged.s1_sub = r.value;
            if (r.key === "s2_val") merged.s2_val = r.value;
            if (r.key === "s2_label") merged.s2_label = r.value;
            if (r.key === "s2_sub") merged.s2_sub = r.value;
            if (r.key === "s3_val") merged.s3_val = r.value;
            if (r.key === "s3_label") merged.s3_label = r.value;
            if (r.key === "s3_sub") merged.s3_sub = r.value;
            if (r.key === "s4_val") merged.s4_val = r.value;
            if (r.key === "s4_label") merged.s4_label = r.value;
            if (r.key === "s4_sub") merged.s4_sub = r.value;
            if (r.key === "cta_button_text") merged.cta_button_text = r.value;
          }
        });

        setForm((prev) => ({ ...prev, ...merged }));
      } catch (err) {
        console.error("Failed to load about page data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const update = (key: keyof typeof DEFAULT_DATA, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setSavedSuccess(false);
    setErrorMessage("");
  };

  const handleSave = async () => {
    setSaving(true);
    setErrorMessage("");
    setSavedSuccess(false);

    try {
      const items = [
        // Hero
        { page: "about", section: "hero", key: "heading", value: form.hero_heading },
        { page: "about", section: "hero", key: "description", value: form.hero_description },

        // Pillars Header
        { page: "about", section: "pillars", key: "section_tag", value: form.pillars_section_tag },
        { page: "about", section: "pillars", key: "section_title", value: form.pillars_section_title },

        // Vision
        { page: "about", section: "pillars", key: "vision_title", value: form.vision_title },
        { page: "about", section: "pillars", key: "vision_desc", value: form.vision_desc },
        { page: "about", section: "pillars", key: "vision_pt1", value: form.vision_pt1 },
        { page: "about", section: "pillars", key: "vision_pt2", value: form.vision_pt2 },
        { page: "about", section: "pillars", key: "vision_pt3", value: form.vision_pt3 },

        // Mission
        { page: "about", section: "pillars", key: "mission_title", value: form.mission_title },
        { page: "about", section: "pillars", key: "mission_desc", value: form.mission_desc },
        { page: "about", section: "pillars", key: "mission_pt1", value: form.mission_pt1 },
        { page: "about", section: "pillars", key: "mission_pt2", value: form.mission_pt2 },
        { page: "about", section: "pillars", key: "mission_pt3", value: form.mission_pt3 },

        // About AlyoRA
        { page: "about", section: "pillars", key: "about_title", value: form.about_title },
        { page: "about", section: "pillars", key: "about_desc", value: form.about_desc },
        { page: "about", section: "pillars", key: "about_pt1", value: form.about_pt1 },
        { page: "about", section: "pillars", key: "about_pt2", value: form.about_pt2 },
        { page: "about", section: "pillars", key: "about_pt3", value: form.about_pt3 },

        // Strengths
        { page: "about", section: "strengths", key: "tag", value: form.strengths_tag },
        { page: "about", section: "strengths", key: "heading", value: form.strengths_heading },
        { page: "about", section: "strengths", key: "s1_title", value: form.s1_title },
        { page: "about", section: "strengths", key: "s1_desc", value: form.s1_desc },
        { page: "about", section: "strengths", key: "s2_title", value: form.s2_title },
        { page: "about", section: "strengths", key: "s2_desc", value: form.s2_desc },
        { page: "about", section: "strengths", key: "s3_title", value: form.s3_title },
        { page: "about", section: "strengths", key: "s3_desc", value: form.s3_desc },

        // Stats Card
        { page: "about", section: "stats", key: "title", value: form.stats_title },
        { page: "about", section: "stats", key: "s1_val", value: form.s1_val },
        { page: "about", section: "stats", key: "s1_label", value: form.s1_label },
        { page: "about", section: "stats", key: "s1_sub", value: form.s1_sub },
        { page: "about", section: "stats", key: "s2_val", value: form.s2_val },
        { page: "about", section: "stats", key: "s2_label", value: form.s2_label },
        { page: "about", section: "stats", key: "s2_sub", value: form.s2_sub },
        { page: "about", section: "stats", key: "s3_val", value: form.s3_val },
        { page: "about", section: "stats", key: "s3_label", value: form.s3_label },
        { page: "about", section: "stats", key: "s3_sub", value: form.s3_sub },
        { page: "about", section: "stats", key: "s4_val", value: form.s4_val },
        { page: "about", section: "stats", key: "s4_label", value: form.s4_label },
        { page: "about", section: "stats", key: "s4_sub", value: form.s4_sub },
        { page: "about", section: "stats", key: "cta_button_text", value: form.cta_button_text },
      ];

      const res = await fetch("/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to save changes to database.");
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 5000);
    } catch (err) {
      console.error("Save error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-[#1E7A3A] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-500">Loading About page content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24 font-sans">
      {/* Top Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Info className="w-5 h-5 text-[#1E7A3A]" />
            Edit About Us Page
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Update your company story, vision, mission, strengths, and statistics below. Changes update on the live site immediately upon saving.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/about"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-gray-500" />
            <span>View Live Page</span>
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-xl bg-[#1E7A3A] hover:bg-[#18632e] text-white shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between gap-4 text-xs text-emerald-900 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">
              ✓ Changes saved and published to the About page live website!
            </span>
          </div>
          <Link
            href="/about"
            target="_blank"
            className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1"
          >
            Open About Page <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-300 rounded-2xl flex items-center gap-3 text-xs text-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Section 1: Hero Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h2 className="text-sm font-bold text-gray-900">1. Page Hero Banner</h2>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Main Heading
          </label>
          <input
            type="text"
            value={form.hero_heading}
            onChange={(e) => update("hero_heading", e.target.value)}
            className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Hero Description
          </label>
          <textarea
            rows={3}
            value={form.hero_description}
            onChange={(e) => update("hero_description", e.target.value)}
            className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
          />
        </div>
      </div>

      {/* Section 2: Foundation & Three Pillars */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h2 className="text-sm font-bold text-gray-900">2. Foundation &amp; Three Pillars</h2>
        </div>

        {/* Section Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Section Tagline
            </label>
            <input
              type="text"
              value={form.pillars_section_tag}
              onChange={(e) => update("pillars_section_tag", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Section Main Title
            </label>
            <input
              type="text"
              value={form.pillars_section_title}
              onChange={(e) => update("pillars_section_title", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
            />
          </div>
        </div>

        {/* Pillar 1: Vision */}
        <div className="border border-emerald-200 rounded-xl p-5 bg-emerald-50/30 space-y-3">
          <div className="flex items-center gap-2 text-[#1E7A3A]">
            <Eye className="w-4 h-4" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider">Pillar 1: Our Vision</h3>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">Vision Card Title</label>
            <input
              type="text"
              value={form.vision_title}
              onChange={(e) => update("vision_title", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">Vision Card Description</label>
            <textarea
              rows={2}
              value={form.vision_desc}
              onChange={(e) => update("vision_desc", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg leading-relaxed"
            />
          </div>

          <div className="space-y-2 pt-1">
            <label className="block text-[11px] font-bold text-gray-700">Vision Key Points (3 Items)</label>
            <input
              type="text"
              value={form.vision_pt1}
              onChange={(e) => update("vision_pt1", e.target.value)}
              placeholder="Point 1"
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              value={form.vision_pt2}
              onChange={(e) => update("vision_pt2", e.target.value)}
              placeholder="Point 2"
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              value={form.vision_pt3}
              onChange={(e) => update("vision_pt3", e.target.value)}
              placeholder="Point 3"
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
            />
          </div>
        </div>

        {/* Pillar 2: Mission */}
        <div className="border border-amber-200 rounded-xl p-5 bg-amber-50/30 space-y-3">
          <div className="flex items-center gap-2 text-[#C8963E]">
            <Target className="w-4 h-4" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider">Pillar 2: Our Mission</h3>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">Mission Card Title</label>
            <input
              type="text"
              value={form.mission_title}
              onChange={(e) => update("mission_title", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">Mission Card Description</label>
            <textarea
              rows={2}
              value={form.mission_desc}
              onChange={(e) => update("mission_desc", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg leading-relaxed"
            />
          </div>

          <div className="space-y-2 pt-1">
            <label className="block text-[11px] font-bold text-gray-700">Mission Key Points (3 Items)</label>
            <input
              type="text"
              value={form.mission_pt1}
              onChange={(e) => update("mission_pt1", e.target.value)}
              placeholder="Point 1"
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              value={form.mission_pt2}
              onChange={(e) => update("mission_pt2", e.target.value)}
              placeholder="Point 2"
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              value={form.mission_pt3}
              onChange={(e) => update("mission_pt3", e.target.value)}
              placeholder="Point 3"
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
            />
          </div>
        </div>

        {/* Pillar 3: About AlyoRA */}
        <div className="border border-blue-200 rounded-xl p-5 bg-blue-50/30 space-y-3">
          <div className="flex items-center gap-2 text-[#0D1F3C]">
            <BookOpen className="w-4 h-4" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider">Pillar 3: About AlyoRA</h3>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">About Card Title</label>
            <input
              type="text"
              value={form.about_title}
              onChange={(e) => update("about_title", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">About Card Description</label>
            <textarea
              rows={2}
              value={form.about_desc}
              onChange={(e) => update("about_desc", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg leading-relaxed"
            />
          </div>

          <div className="space-y-2 pt-1">
            <label className="block text-[11px] font-bold text-gray-700">About Key Points (3 Items)</label>
            <input
              type="text"
              value={form.about_pt1}
              onChange={(e) => update("about_pt1", e.target.value)}
              placeholder="Point 1"
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              value={form.about_pt2}
              onChange={(e) => update("about_pt2", e.target.value)}
              placeholder="Point 2"
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              value={form.about_pt3}
              onChange={(e) => update("about_pt3", e.target.value)}
              placeholder="Point 3"
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Core Strengths */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h2 className="text-sm font-bold text-gray-900">3. Core Strengths (Why AlyoRA Stands Apart)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Strengths Tagline</label>
            <input
              type="text"
              value={form.strengths_tag}
              onChange={(e) => update("strengths_tag", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Strengths Section Heading</label>
            <input
              type="text"
              value={form.strengths_heading}
              onChange={(e) => update("strengths_heading", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg font-medium"
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {/* Strength 1 */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-0.5">Strength 1 Title</label>
              <input
                type="text"
                value={form.s1_title}
                onChange={(e) => update("s1_title", e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-0.5">Strength 1 Description</label>
              <input
                type="text"
                value={form.s1_desc}
                onChange={(e) => update("s1_desc", e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {/* Strength 2 */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-0.5">Strength 2 Title</label>
              <input
                type="text"
                value={form.s2_title}
                onChange={(e) => update("s2_title", e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-0.5">Strength 2 Description</label>
              <input
                type="text"
                value={form.s2_desc}
                onChange={(e) => update("s2_desc", e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {/* Strength 3 */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-0.5">Strength 3 Title</label>
              <input
                type="text"
                value={form.s3_title}
                onChange={(e) => update("s3_title", e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-0.5">Strength 3 Description</label>
              <input
                type="text"
                value={form.s3_desc}
                onChange={(e) => update("s3_desc", e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Key Research & Performance Stats */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
            4
          </div>
          <h2 className="text-sm font-bold text-gray-900">4. Research Expertise &amp; Stats Card</h2>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Card Main Title</label>
          <input
            type="text"
            value={form.stats_title}
            onChange={(e) => update("stats_title", e.target.value)}
            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Stat 1 */}
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-2">
            <div className="text-[10px] font-extrabold uppercase text-[#1E7A3A]">Stat Box 1</div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500">Value (e.g. 5+ Years)</label>
              <input
                type="text"
                value={form.s1_val}
                onChange={(e) => update("s1_val", e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-white border border-gray-200 rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500">Label</label>
              <input
                type="text"
                value={form.s1_label}
                onChange={(e) => update("s1_label", e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-white border border-gray-200 rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500">Subtext</label>
              <input
                type="text"
                value={form.s1_sub}
                onChange={(e) => update("s1_sub", e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-white border border-gray-200 rounded"
              />
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-2">
            <div className="text-[10px] font-extrabold uppercase text-[#27A84E]">Stat Box 2</div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500">Value (e.g. 500+)</label>
              <input
                type="text"
                value={form.s2_val}
                onChange={(e) => update("s2_val", e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-white border border-gray-200 rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500">Label</label>
              <input
                type="text"
                value={form.s2_label}
                onChange={(e) => update("s2_label", e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-white border border-gray-200 rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500">Subtext</label>
              <input
                type="text"
                value={form.s2_sub}
                onChange={(e) => update("s2_sub", e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-white border border-gray-200 rounded"
              />
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-2">
            <div className="text-[10px] font-extrabold uppercase text-[#C8963E]">Stat Box 3</div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500">Value (e.g. 100+)</label>
              <input
                type="text"
                value={form.s3_val}
                onChange={(e) => update("s3_val", e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-white border border-gray-200 rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500">Label</label>
              <input
                type="text"
                value={form.s3_label}
                onChange={(e) => update("s3_label", e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-white border border-gray-200 rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500">Subtext</label>
              <input
                type="text"
                value={form.s3_sub}
                onChange={(e) => update("s3_sub", e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-white border border-gray-200 rounded"
              />
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-2">
            <div className="text-[10px] font-extrabold uppercase text-[#0D1F3C]">Stat Box 4</div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500">Value (e.g. 100%)</label>
              <input
                type="text"
                value={form.s4_val}
                onChange={(e) => update("s4_val", e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-white border border-gray-200 rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500">Label</label>
              <input
                type="text"
                value={form.s4_label}
                onChange={(e) => update("s4_label", e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-white border border-gray-200 rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500">Subtext</label>
              <input
                type="text"
                value={form.s4_sub}
                onChange={(e) => update("s4_sub", e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-white border border-gray-200 rounded"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Consultation CTA Button Label
          </label>
          <input
            type="text"
            value={form.cta_button_text}
            onChange={(e) => update("cta_button_text", e.target.value)}
            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg font-medium"
          />
        </div>
      </div>

      {/* Bottom Sticky Save Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-md flex items-center justify-between gap-4 sticky bottom-4 z-30">
        <span className="text-xs text-gray-500">
          Ready to update your About page? Click Save Changes below.
        </span>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 text-xs font-bold px-6 py-3 rounded-xl bg-[#1E7A3A] hover:bg-[#18632e] text-white shadow transition-all cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
