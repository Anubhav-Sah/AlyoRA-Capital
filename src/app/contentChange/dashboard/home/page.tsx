"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home, Save, RefreshCw, CheckCircle2, AlertCircle,
  ExternalLink, Eye, ShieldCheck, Sparkles, BarChart3,
  Check, ChevronDown, ChevronUp, Layers, ArrowRight
} from "lucide-react";
import { getSiteContent, getPageCards, type PageCard } from "@/lib/content-client";

interface PillarItem {
  id?: string;
  num: string;
  title: string;
  subtitle: string;
  details: string;
  features: string;
  color: string;
  visible: boolean;
}

const DEFAULT_PILLARS: PillarItem[] = [
  {
    num: "01",
    title: "Independent Research",
    subtitle: "No broker bias. Our analysis is purely data-driven.",
    color: "#1E7A3A",
    details: "AlyoRA is funded entirely by subscriptions — not by brokerage commissions, IPO mandates, or corporate advisory fees.\nThis independence means every stock pick, sector view, and advisory recommendation is based solely on data and analyst conviction.",
    features: "Zero conflict of interest from broker relationships\nProprietary 5-year DCF valuation models\nAll recommendations backed by documented rationale\nNo paid promotions or sponsored research reports\nSEBI-aligned research disclosure framework",
    visible: true,
  },
  {
    num: "02",
    title: "Transparent Pricing",
    subtitle: "Clear subscription plans with explicit deliverables.",
    color: "#C8963E",
    details: "Every plan publishes its exact deliverables, alert frequency, and analyst access level upfront — before you pay a single rupee.\nNo hidden renewal clauses, no surprise charges, and no buried terms. Your subscription is month-to-month with full clarity.",
    features: "5 clearly defined subscription tiers\nPublished deliverables for each plan\nNo hidden fees or lock-in clauses\nMonth-to-month and annual billing options\nPro-rated refund policy on cancellation",
    visible: true,
  },
  {
    num: "03",
    title: "Timely Insights",
    subtitle: "Market reports delivered before market opening hours.",
    color: "#1E7A3A",
    details: "Pre-market notes are delivered by 8:45 AM IST — before the opening bell. Intraday alerts are sent in real-time as setups develop.\nOur research team monitors global overnight cues, futures data, and FII flows to prepare every morning note.",
    features: "Pre-market note by 8:45 AM IST daily\nReal-time WhatsApp trade alerts\nWeekly Nifty & Bank Nifty outlook every Sunday\nQuarterly earnings coverage within 48 hours\nPost-market summary with key levels for next session",
    visible: true,
  },
  {
    num: "04",
    title: "For Every Investor",
    subtitle: "Custom advisory from mutual funds to HNI portfolios.",
    color: "#0D1F3C",
    details: "Whether you are a first-time SIP investor or an HNI managing a crore-plus portfolio, AlyoRA has a tier designed specifically for your scale and goals.\nOur research is written in plain language that does not require a finance degree to understand — institutional discipline, retail accessibility.",
    features: "Beginner-friendly mutual fund guidance (free)\nMid-tier equity advisory for active investors\nHNI dedicated research partner (Pinnacle)\nSub-broker program for financial professionals\nBusiness consulting for founders & SMEs",
    visible: true,
  },
];

const PRESET_COLORS = [
  { name: "AlyoRA Forest Green", value: "#1E7A3A" },
  { name: "Prestige Gold", value: "#C8963E" },
  { name: "Deep Navy", value: "#0D1F3C" },
  { name: "Emerald Accent", value: "#27A84E" },
  { name: "Corporate Blue", value: "#2563EB" },
];

export default function SimpleAdminHomePage() {
  // 1. Hero Section
  const [heroEyebrow, setHeroEyebrow] = useState("Insights · Strategy · Growth");
  const [heroHeading, setHeroHeading] = useState("AlyoRA Capital Research");
  const [heroTagline, setHeroTagline] = useState("Where Research Meets Returns");
  const [heroDesc, setHeroDesc] = useState(
    "SEBI-aligned institutional precision for active traders, high-net-worth individuals, and long-term portfolio builders in Indian capital markets."
  );
  const [heroPrimaryBtn, setHeroPrimaryBtn] = useState("Explore Services");
  const [heroSecondaryBtn, setHeroSecondaryBtn] = useState("View Reports");

  // 2. Why AlyoRA Pillars (The AlyoRA Difference)
  const [whyTagline, setWhyTagline] = useState("WHY ALYORA");
  const [whyHeading, setWhyHeading] = useState("The AlyoRA Difference");
  const [whySubheading, setWhySubheading] = useState(
    "Four core pillars that set our research desk apart from traditional commission-driven brokers."
  );
  const [pillars, setPillars] = useState<PillarItem[]>(DEFAULT_PILLARS);
  const [expandedPillar, setExpandedPillar] = useState<number | null>(0);

  // 3. Stats Bar
  const [stat1Val, setStat1Val] = useState("₹250Cr+");
  const [stat1Label, setStat1Label] = useState("Client Assets Monitored");
  const [stat2Val, setStat2Val] = useState("18.4%");
  const [stat2Label, setStat2Label] = useState("Historical 3-Yr CAGR");
  const [stat3Val, setStat3Val] = useState("3,200+");
  const [stat3Label, setStat3Label] = useState("Active Investors");
  const [stat4Val, setStat4Val] = useState("98.2%");
  const [stat4Label, setStat4Label] = useState("Client Retention Rate");

  // 4. CTA Banner
  const [ctaHeading, setCtaHeading] = useState("Ready to Upgrade Your Investment Strategy?");
  const [ctaSubheading, setCtaSubheading] = useState(
    "Schedule a complimentary 30-minute portfolio review with our lead research analysts today."
  );

  // States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load data from DB
  useEffect(() => {
    async function load() {
      try {
        const [contentRows, cardRows] = await Promise.all([
          getSiteContent("home"),
          getPageCards("home", "why-us"),
        ]);

        // Merge site content
        contentRows.forEach((r) => {
          if (!r.value) return;
          if (r.section === "hero") {
            if (r.key === "eyebrow") setHeroEyebrow(r.value);
            if (r.key === "heading") setHeroHeading(r.value);
            if (r.key === "tagline") setHeroTagline(r.value);
            if (r.key === "description") setHeroDesc(r.value);
            if (r.key === "cta_primary_label") setHeroPrimaryBtn(r.value);
            if (r.key === "cta_secondary_label") setHeroSecondaryBtn(r.value);
          } else if (r.section === "why-us") {
            if (r.key === "tagline") setWhyTagline(r.value);
            if (r.key === "heading") setWhyHeading(r.value);
            if (r.key === "subheading") setWhySubheading(r.value);
          } else if (r.section === "stats") {
            if (r.key === "stat1_val") setStat1Val(r.value);
            if (r.key === "stat1_label") setStat1Label(r.value);
            if (r.key === "stat2_val") setStat2Val(r.value);
            if (r.key === "stat2_label") setStat2Label(r.value);
            if (r.key === "stat3_val") setStat3Val(r.value);
            if (r.key === "stat3_label") setStat3Label(r.value);
            if (r.key === "stat4_val") setStat4Val(r.value);
            if (r.key === "stat4_label") setStat4Label(r.value);
          } else if (r.section === "cta") {
            if (r.key === "heading") setCtaHeading(r.value);
            if (r.key === "subheading") setCtaSubheading(r.value);
          }
        });

        // Merge cards
        if (cardRows && cardRows.length > 0) {
          const mappedPillars: PillarItem[] = DEFAULT_PILLARS.map((defPillar, idx) => {
            const found = cardRows.find((dbCard) => {
              const extra = (dbCard.extra_data || {}) as Record<string, unknown>;
              return (
                extra.num === defPillar.num ||
                dbCard.title.toLowerCase().trim() === defPillar.title.toLowerCase().trim()
              );
            }) || cardRows[idx];

            if (!found) return defPillar;

            const extra = (found.extra_data || {}) as Record<string, unknown>;
            const featList = Array.isArray(extra.features)
              ? (extra.features as string[]).join("\n")
              : typeof extra.features === "string"
              ? extra.features
              : defPillar.features;

            const detailsList = Array.isArray(extra.details)
              ? (extra.details as string[]).join("\n")
              : typeof extra.details === "string"
              ? extra.details
              : found.description || defPillar.details;

            return {
              id: found.id,
              num: (typeof extra.num === "string" && extra.num) || defPillar.num,
              title: found.title || defPillar.title,
              subtitle: found.subtitle || defPillar.subtitle,
              details: detailsList,
              features: featList,
              color: typeof extra.color === "string" ? extra.color : defPillar.color,
              visible: found.visible !== false,
            };
          });

          setPillars(mappedPillars);
        }
      } catch (err) {
        console.error("Failed to load home page data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const updatePillar = (index: number, field: keyof PillarItem, value: unknown) => {
    setPillars((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    setSavedSuccess(false);
    setErrorMessage("");
  };

  const handleSave = async () => {
    setSaving(true);
    setErrorMessage("");
    setSavedSuccess(false);

    try {
      // 1. Build site_content payload
      const contentItems = [
        // Hero
        { page: "home", section: "hero", key: "eyebrow", value: heroEyebrow },
        { page: "home", section: "hero", key: "heading", value: heroHeading },
        { page: "home", section: "hero", key: "tagline", value: heroTagline },
        { page: "home", section: "hero", key: "description", value: heroDesc },
        { page: "home", section: "hero", key: "cta_primary_label", value: heroPrimaryBtn },
        { page: "home", section: "hero", key: "cta_secondary_label", value: heroSecondaryBtn },

        // Why Us / The AlyoRA Difference
        { page: "home", section: "why-us", key: "tagline", value: whyTagline },
        { page: "home", section: "why-us", key: "heading", value: whyHeading },
        { page: "home", section: "why-us", key: "subheading", value: whySubheading },

        // Stats
        { page: "home", section: "stats", key: "stat1_val", value: stat1Val },
        { page: "home", section: "stats", key: "stat1_label", value: stat1Label },
        { page: "home", section: "stats", key: "stat2_val", value: stat2Val },
        { page: "home", section: "stats", key: "stat2_label", value: stat2Label },
        { page: "home", section: "stats", key: "stat3_val", value: stat3Val },
        { page: "home", section: "stats", key: "stat3_label", value: stat3Label },
        { page: "home", section: "stats", key: "stat4_val", value: stat4Val },
        { page: "home", section: "stats", key: "stat4_label", value: stat4Label },

        // CTA Banner
        { page: "home", section: "cta", key: "heading", value: ctaHeading },
        { page: "home", section: "cta", key: "subheading", value: ctaSubheading },
      ];

      // 2. Build cards payload for page_cards (Why Us pillars)
      const cardsPayload = pillars.map((p, i) => ({
        id: p.id,
        page: "home",
        section: "why-us",
        position: i,
        title: p.title,
        subtitle: p.subtitle,
        description: p.details,
        badge: p.num,
        button_label: "See details",
        button_url: "/services",
        visible: p.visible,
        extra_data: {
          num: p.num,
          color: p.color,
          details: p.details.split("\n").map((s) => s.trim()).filter(Boolean),
          features: p.features.split("\n").map((s) => s.trim()).filter(Boolean),
        },
      }));

      // Execute both saves concurrently
      const [contentRes, cardsRes] = await Promise.all([
        fetch("/api/content/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: contentItems }),
        }),
        fetch("/api/cards/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cards: cardsPayload }),
        }),
      ]);

      const contentJson = await contentRes.json();
      const cardsJson = await cardsRes.json();

      if (!contentRes.ok || contentJson.error) {
        throw new Error(contentJson.error || "Failed to save text content.");
      }
      if (!cardsRes.ok || cardsJson.error) {
        throw new Error(cardsJson.error || "Failed to save pillar cards.");
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 5000);
    } catch (err) {
      console.error("Save error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Error saving changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-[#1E7A3A] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-500">Loading home page data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 font-sans">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Home className="w-5 h-5 text-[#1E7A3A]" />
            Edit Home Page &amp; Why AlyoRA Pillars
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Easily update the home hero, &quot;The AlyoRA Difference&quot; 4 core pillars, key stats, and call to action banner. All changes reflect on the live website immediately.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-gray-500" />
            <span>View Live Site</span>
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

      {/* Success Notification Banner */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between gap-4 text-xs text-emerald-900 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">
              ✓ Changes saved and published to the live website successfully!
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1"
            >
              Open Home Page <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-300 rounded-2xl flex items-center gap-3 text-xs text-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Section 1: Hero & Brand Tagline */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-gray-900">1. Hero Section &amp; Tagline</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Eyebrow Badge Text
            </label>
            <input
              type="text"
              value={heroEyebrow}
              onChange={(e) => {
                setHeroEyebrow(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Insights · Strategy · Growth"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Main Headline
            </label>
            <input
              type="text"
              value={heroHeading}
              onChange={(e) => {
                setHeroHeading(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="AlyoRA Capital Research"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Brand Tagline / Slogan
            </label>
            <input
              type="text"
              value={heroTagline}
              onChange={(e) => {
                setHeroTagline(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Where Research Meets Returns"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold text-[#1E7A3A]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Hero Description Text
            </label>
            <textarea
              rows={2}
              value={heroDesc}
              onChange={(e) => {
                setHeroDesc(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="SEBI-aligned institutional precision for active traders..."
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Primary CTA Button Label
            </label>
            <input
              type="text"
              value={heroPrimaryBtn}
              onChange={(e) => {
                setHeroPrimaryBtn(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Explore Services"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Secondary CTA Button Label
            </label>
            <input
              type="text"
              value={heroSecondaryBtn}
              onChange={(e) => {
                setHeroSecondaryBtn(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="View Reports"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>
        </div>
      </div>

      {/* Section 2: The AlyoRA Difference (4 Core Pillars) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">2. Why AlyoRA — The AlyoRA Difference (4 Pillars)</h2>
            <p className="text-[11px] text-gray-500">Edit the heading, descriptions, commitments, and accent colors for the 4 core trust pillars.</p>
          </div>
        </div>

        {/* Section Header Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-gray-100">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Section Badge Tagline
            </label>
            <input
              type="text"
              value={whyTagline}
              onChange={(e) => {
                setWhyTagline(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="WHY ALYORA"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold text-[#1E7A3A]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={whyHeading}
              onChange={(e) => {
                setWhyHeading(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="The AlyoRA Difference"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Section Subtitle
            </label>
            <input
              type="text"
              value={whySubheading}
              onChange={(e) => {
                setWhySubheading(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Four core pillars that set our research desk apart..."
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>
        </div>

        {/* 4 Pillars Collapsible List */}
        <div className="space-y-3 pt-2">
          {pillars.map((pillar, index) => {
            const isExpanded = expandedPillar === index;
            return (
              <div
                key={pillar.num || index}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
                style={{ borderLeftWidth: "4px", borderLeftColor: pillar.color || "#1E7A3A" }}
              >
                {/* Collapsible Card Header */}
                <div
                  onClick={() => setExpandedPillar(isExpanded ? null : index)}
                  className="p-4 bg-gray-50 hover:bg-gray-100/70 transition-colors flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="font-serif-title text-xl font-black"
                      style={{ color: pillar.color || "#1E7A3A" }}
                    >
                      {pillar.num}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs sm:text-sm font-bold text-gray-900">{pillar.title}</h3>
                        {!pillar.visible && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 truncate max-w-md">{pillar.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-medium hidden sm:inline">
                      {isExpanded ? "Collapse" : "Edit"}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Expanded Fields */}
                {isExpanded && (
                  <div className="p-5 bg-white space-y-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      {/* Number */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Number (e.g. 01)
                        </label>
                        <input
                          type="text"
                          value={pillar.num}
                          onChange={(e) => updatePillar(index, "num", e.target.value)}
                          placeholder="01"
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-bold"
                        />
                      </div>

                      {/* Title */}
                      <div className="sm:col-span-3">
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Pillar Title *
                        </label>
                        <input
                          type="text"
                          value={pillar.title}
                          onChange={(e) => updatePillar(index, "title", e.target.value)}
                          placeholder="e.g. Independent Research"
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold"
                        />
                      </div>
                    </div>

                    {/* Subtitle / Short text */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Short Summary (Shown on the card face)
                      </label>
                      <input
                        type="text"
                        value={pillar.subtitle}
                        onChange={(e) => updatePillar(index, "subtitle", e.target.value)}
                        placeholder="No broker bias. Our analysis is purely data-driven."
                        className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                      />
                    </div>

                    {/* Accent Color & Visibility */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Accent Color
                        </label>
                        <div className="flex items-center gap-2 flex-wrap">
                          {PRESET_COLORS.map((pc) => (
                            <button
                              key={pc.value}
                              type="button"
                              onClick={() => updatePillar(index, "color", pc.value)}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                                pillar.color === pc.value ? "ring-2 ring-offset-2 ring-gray-600 scale-110" : "hover:opacity-80"
                              }`}
                              style={{ backgroundColor: pc.value }}
                              title={pc.name}
                            >
                              {pillar.color === pc.value && <Check className="w-3.5 h-3.5 text-white" />}
                            </button>
                          ))}
                          <input
                            type="text"
                            value={pillar.color}
                            onChange={(e) => updatePillar(index, "color", e.target.value)}
                            className="w-20 px-2 py-1 text-xs border border-gray-200 rounded-lg text-center font-mono"
                            placeholder="#1E7A3A"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Visibility on Website
                        </label>
                        <div className="flex items-center gap-3 pt-1">
                          <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                            <input
                              type="checkbox"
                              checked={pillar.visible}
                              onChange={(e) => updatePillar(index, "visible", e.target.checked)}
                              className="w-4 h-4 rounded text-[#1E7A3A] focus:ring-[#1E7A3A] accent-[#1E7A3A]"
                            />
                            <span>Show this pillar card on the home page</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Full Detail Explanation */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Detailed Explanation (Shown when user clicks &quot;See details&quot;)
                      </label>
                      <textarea
                        rows={3}
                        value={pillar.details}
                        onChange={(e) => updatePillar(index, "details", e.target.value)}
                        placeholder="Detailed narrative paragraphs explaining why this pillar matters..."
                        className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
                      />
                    </div>

                    {/* Key Commitments / Features */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-gray-700">
                          Key Commitments / Features (1 per line)
                        </label>
                        <span className="text-[10px] text-gray-400">Lines become checkmarked bullet points in the pop-up modal</span>
                      </div>
                      <textarea
                        rows={4}
                        value={pillar.features}
                        onChange={(e) => updatePillar(index, "features", e.target.value)}
                        placeholder="Zero conflict of interest from broker relationships&#10;Proprietary 5-year DCF valuation models&#10;SEBI-aligned research disclosure framework"
                        className="w-full px-3 py-2 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Key Performance Stats Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">3. Key Performance Statistics</h2>
            <p className="text-[11px] text-gray-500">The 4 key metrics displayed directly below the hero section.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Stat 1</span>
            <input
              type="text"
              value={stat1Val}
              onChange={(e) => {
                setStat1Val(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="₹250Cr+"
              className="w-full px-2.5 py-1.5 text-sm font-bold text-[#1E7A3A] bg-white border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              value={stat1Label}
              onChange={(e) => {
                setStat1Label(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Client Assets Monitored"
              className="w-full px-2.5 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
          </div>

          <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Stat 2</span>
            <input
              type="text"
              value={stat2Val}
              onChange={(e) => {
                setStat2Val(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="18.4%"
              className="w-full px-2.5 py-1.5 text-sm font-bold text-[#C8963E] bg-white border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              value={stat2Label}
              onChange={(e) => {
                setStat2Label(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Historical 3-Yr CAGR"
              className="w-full px-2.5 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
          </div>

          <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Stat 3</span>
            <input
              type="text"
              value={stat3Val}
              onChange={(e) => {
                setStat3Val(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="3,200+"
              className="w-full px-2.5 py-1.5 text-sm font-bold text-[#1E7A3A] bg-white border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              value={stat3Label}
              onChange={(e) => {
                setStat3Label(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Active Investors"
              className="w-full px-2.5 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
          </div>

          <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Stat 4</span>
            <input
              type="text"
              value={stat4Val}
              onChange={(e) => {
                setStat4Val(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="98.2%"
              className="w-full px-2.5 py-1.5 text-sm font-bold text-[#0D1F3C] bg-white border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              value={stat4Label}
              onChange={(e) => {
                setStat4Label(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Client Retention Rate"
              className="w-full px-2.5 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Call to Action Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
            <ArrowRight className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">4. Call to Action Banner</h2>
            <p className="text-[11px] text-gray-500">The bottom banner inviting visitors to schedule a portfolio review.</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Banner Headline
            </label>
            <input
              type="text"
              value={ctaHeading}
              onChange={(e) => {
                setCtaHeading(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Ready to Upgrade Your Investment Strategy?"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Banner Subheading
            </label>
            <textarea
              rows={2}
              value={ctaSubheading}
              onChange={(e) => {
                setCtaSubheading(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Schedule a complimentary 30-minute portfolio review with our lead research analysts today."
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Bottom Sticky Save Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-md flex items-center justify-between gap-4 sticky bottom-4 z-30">
        <span className="text-xs text-gray-500">
          Ready to publish your Home page updates to the website? Click Save Changes.
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
              <span>Saving to Website...</span>
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
