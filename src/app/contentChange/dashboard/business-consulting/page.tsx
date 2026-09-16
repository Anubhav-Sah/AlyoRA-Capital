"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase, Eye, Save, RefreshCw, CheckCircle2, AlertCircle,
  ExternalLink, Plus, Trash2, ChevronDown, ChevronUp, Check, Layers
} from "lucide-react";
import { getSiteContent, getPageCards, deletePageCard } from "@/lib/content-client";
import type { PageCard } from "@/lib/content-client";

const DEFAULT_TEXTS = {
  hero_heading: "Business Consulting & Growth Advisory",
  hero_description:
    "Practical, high-impact consulting services for SMEs, growth ventures, and corporate founders.",
  hero_subheading:
    "Partner with AlyoRA Capital Research to build, run, and scale your business with confidence — backed by institutional-grade financial research, structured strategy frameworks, and hands-on planning support.",
  hero_supporting:
    "From first-time founders to established businesses facing growth roadblocks, we help you turn financial data into clear, actionable decisions.",
  hero_cta_text: "Book a Free Strategy Call",

  who_item1: "First-time founders launching a new venture",
  who_item2: "Small business owners facing growth or cash-flow challenges",
  who_item3: "Businesses planning expansion but unsure of the numbers",
  who_item4: "Owners who want a financial second opinion before big decisions",

  cta_heading: "Not sure where your business stands? Let's find out together.",
  cta_subheading:
    "Book a free 20-minute strategy call and get a clear first step — no obligation, no jargon.",
  cta_button_text: "Book Your Free Strategy Call",
};

const DEFAULT_PACKAGES = [
  {
    id: "pkg-1",
    title: "Financial Planning & Budgeting",
    description:
      "Build realistic budgets, cash-flow forecasts, and financial models tailored to your business stage — so every rupee has a purpose.",
    tagline: "You always know how much runway you have and where money is leaking.",
    color: "#1E7A3A",
    deliverables: [
      "Monthly/annual budgeting frameworks built around your actual revenue cycle",
      "Cash-flow forecasting to help you spot shortfalls before they happen",
      "Cost structuring — fixed vs. variable, break-even analysis, margin tracking",
      "Simple financial models you (or your team) can actually update and use, not static one-time reports",
    ],
    visible: true,
  },
  {
    id: "pkg-2",
    title: "Business Strategy & Growth Planning",
    description:
      "Get a clear roadmap for scaling — market positioning, revenue strategy, and milestone-based growth plans built around your goals.",
    tagline: "A living growth plan with clear next steps, not a one-time PDF that gets forgotten.",
    color: "#C8963E",
    deliverables: [
      "Market and competitor positioning to sharpen what makes you different",
      "Revenue strategy — pricing, channels, and where growth will actually come from",
      "Quarter-by-quarter milestone roadmap instead of a vague long-term vision",
      "Regular strategy check-ins to adjust the plan as the business moves",
    ],
    visible: true,
  },
  {
    id: "pkg-3",
    title: "Startup Advisory",
    description:
      "End-to-end guidance for early-stage founders — business model validation, pricing strategy, and structuring your venture for sustainable growth.",
    tagline: "Fewer early-stage mistakes, and a foundation built to survive the first 12–18 months.",
    color: "#1E7A3A",
    deliverables: [
      "Business model validation — does the idea hold up financially before you scale it",
      "Pricing strategy rooted in unit economics, not guesswork",
      "Legal/financial structuring guidance (entity type, basic compliance checklist)",
      "Founder-to-founder style sounding board for early decisions that are hard to make alone",
    ],
    visible: true,
  },
  {
    id: "pkg-4",
    title: "Business Health Diagnostics",
    description:
      "Identify what's holding your business back — cost leakages, weak margins, or inefficient operations — through a structured diagnostic review.",
    tagline: "A clear, ranked picture of what's actually holding growth back — and what to fix first.",
    color: "#0D1F3C",
    deliverables: [
      "Full review of financial statements, margins, and expense patterns",
      "Operational efficiency check — where time/money is going that shouldn't be",
      "A prioritized fix list ranked by impact, not a generic audit report",
      "Benchmarking against industry norms where relevant",
    ],
    visible: true,
  },
  {
    id: "pkg-5",
    title: "Expansion & Scaling Support",
    description:
      "Planning to expand into a new city, product line, or market? We help you evaluate feasibility, funding needs, and execution risk before you commit.",
    tagline: "You expand with a plan and a number, not just a gut feeling.",
    color: "#1E7A3A",
    deliverables: [
      "Feasibility study for the new market, product line, or location",
      "Capital requirement estimate — how much expansion will actually cost",
      "Risk mapping — what could go wrong and how to de-risk the rollout",
      "Phased execution plan so expansion doesn't strain existing operations",
    ],
    visible: true,
  },
  {
    id: "pkg-6",
    title: "Investment & Capital Structuring",
    description:
      "Guidance on funding options, capital allocation, and investment readiness — helping you prepare for investors, loans, or reinvestment decisions.",
    tagline: "You raise or allocate capital with a clear plan, not reactive decision-making.",
    color: "#C8963E",
    deliverables: [
      "Funding options comparison — self-funding, loans, investors — fit for your stage",
      "Capital allocation planning — where new money should actually go",
      "Investor-readiness support — financials, pitch numbers, and story alignment",
      "Reinvestment strategy for profitable businesses looking to compound growth",
    ],
    visible: true,
  },
];

interface EditablePackage {
  id: string;
  title: string;
  description: string;
  tagline: string;
  color: string;
  deliverables: string[];
  visible: boolean;
}

export default function SimpleAdminBusinessConsultingPage() {
  const [form, setForm] = useState(DEFAULT_TEXTS);
  const [packages, setPackages] = useState<EditablePackage[]>(DEFAULT_PACKAGES);
  const [expandedPkgId, setExpandedPkgId] = useState<string | null>("pkg-1");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [textRows, cardRows] = await Promise.all([
          getSiteContent("business-consulting"),
          getPageCards("business-consulting"),
        ]);

        // Merge Site Content texts
        const mergedText: Partial<typeof DEFAULT_TEXTS> = {};
        textRows.forEach((r) => {
          if (!r.value) return;
          if (r.section === "hero") {
            if (r.key === "heading") mergedText.hero_heading = r.value;
            if (r.key === "description") mergedText.hero_description = r.value;
            if (r.key === "subheading") mergedText.hero_subheading = r.value;
            if (r.key === "supporting") mergedText.hero_supporting = r.value;
            if (r.key === "cta_text") mergedText.hero_cta_text = r.value;
          } else if (r.section === "who_for") {
            if (r.key === "item1") mergedText.who_item1 = r.value;
            if (r.key === "item2") mergedText.who_item2 = r.value;
            if (r.key === "item3") mergedText.who_item3 = r.value;
            if (r.key === "item4") mergedText.who_item4 = r.value;
          } else if (r.section === "cta_banner") {
            if (r.key === "heading") mergedText.cta_heading = r.value;
            if (r.key === "subheading") mergedText.cta_subheading = r.value;
            if (r.key === "button_text") mergedText.cta_button_text = r.value;
          }
        });
        setForm((prev) => ({ ...prev, ...mergedText }));

        // Merge Cards if DB has cards
        if (Array.isArray(cardRows) && cardRows.length > 0) {
          const loadedPkgs: EditablePackage[] = cardRows.map((c, i) => {
            const extra = (c.extra_data || {}) as Record<string, unknown>;
            const deliverables = Array.isArray(extra.deliverables)
              ? (extra.deliverables as string[])
              : [c.subtitle || "Institutional guidance & roadmap"];
            const tagline = typeof extra.tagline === "string" ? extra.tagline : "";
            const color =
              typeof extra.color === "string"
                ? extra.color
                : i % 2 === 0
                ? "#1E7A3A"
                : "#C8963E";

            return {
              id: c.id || `db-pkg-${i}`,
              title: c.title,
              description: c.description,
              tagline,
              color,
              deliverables,
              visible: c.visible !== false,
            };
          });
          setPackages(loadedPkgs);
          if (loadedPkgs.length > 0) setExpandedPkgId(loadedPkgs[0].id);
        }
      } catch (err) {
        console.error("Failed to load business consulting data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const updateText = (key: keyof typeof DEFAULT_TEXTS, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setSavedSuccess(false);
    setErrorMessage("");
  };

  const updatePackage = (id: string, field: keyof EditablePackage, val: unknown) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? ({ ...p, [field]: val } as EditablePackage) : p))
    );
    setSavedSuccess(false);
    setErrorMessage("");
  };

  const handleAddDeliverable = (pkgId: string) => {
    setPackages((prev) =>
      prev.map((p) => {
        if (p.id !== pkgId) return p;
        return {
          ...p,
          deliverables: [...p.deliverables, "New key deliverable point"],
        };
      })
    );
  };

  const handleUpdateDeliverable = (pkgId: string, index: number, val: string) => {
    setPackages((prev) =>
      prev.map((p) => {
        if (p.id !== pkgId) return p;
        const copy = [...p.deliverables];
        copy[index] = val;
        return { ...p, deliverables: copy };
      })
    );
  };

  const handleRemoveDeliverable = (pkgId: string, index: number) => {
    setPackages((prev) =>
      prev.map((p) => {
        if (p.id !== pkgId) return p;
        return {
          ...p,
          deliverables: p.deliverables.filter((_, i) => i !== index),
        };
      })
    );
  };

  const handleAddPackage = () => {
    const newId = `pkg-temp-${Date.now()}`;
    const newPkg: EditablePackage = {
      id: newId,
      title: "New Consulting Package",
      description: "Detailed description of the new advisory module.",
      tagline: "Clear milestone-based execution and results.",
      color: "#1E7A3A",
      deliverables: ["Key deliverable 1", "Key deliverable 2"],
      visible: true,
    };
    setPackages((prev) => [...prev, newPkg]);
    setExpandedPkgId(newId);
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this consulting package?")) return;
    if (!id.startsWith("pkg-temp-") && !id.startsWith("pkg-")) {
      try {
        await deletePageCard(id);
      } catch {
        // ignore
      }
    }
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setErrorMessage("");
    setSavedSuccess(false);

    try {
      // 1. Build text items for site_content
      const textItems = [
        { page: "business-consulting", section: "hero", key: "heading", value: form.hero_heading },
        { page: "business-consulting", section: "hero", key: "description", value: form.hero_description },
        { page: "business-consulting", section: "hero", key: "subheading", value: form.hero_subheading },
        { page: "business-consulting", section: "hero", key: "supporting", value: form.hero_supporting },
        { page: "business-consulting", section: "hero", key: "cta_text", value: form.hero_cta_text },

        { page: "business-consulting", section: "who_for", key: "item1", value: form.who_item1 },
        { page: "business-consulting", section: "who_for", key: "item2", value: form.who_item2 },
        { page: "business-consulting", section: "who_for", key: "item3", value: form.who_item3 },
        { page: "business-consulting", section: "who_for", key: "item4", value: form.who_item4 },

        { page: "business-consulting", section: "cta_banner", key: "heading", value: form.cta_heading },
        { page: "business-consulting", section: "cta_banner", key: "subheading", value: form.cta_subheading },
        { page: "business-consulting", section: "cta_banner", key: "button_text", value: form.cta_button_text },
      ];

      // Save text content
      const textRes = await fetch("/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: textItems }),
      });
      if (!textRes.ok) {
        const textData = await textRes.json();
        throw new Error(textData.error || "Failed to save text content.");
      }

      // 2. Build cards payload for page_cards
      const cardPayload = packages.map((p, i) => ({
        id: p.id.startsWith("pkg-") ? undefined : p.id,
        page: "business-consulting",
        section: "packages",
        title: p.title,
        subtitle: p.description,
        description: p.description,
        badge: "",
        button_label: "Book Strategy Call",
        button_url: "",
        visible: p.visible,
        position: i,
        extra_data: {
          tagline: p.tagline,
          color: p.color,
          deliverables: p.deliverables,
        },
      }));

      const cardRes = await fetch("/api/cards/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cards: cardPayload }),
      });

      if (!cardRes.ok) {
        const cardData = await cardRes.json();
        throw new Error(cardData.error || "Failed to save consulting package cards.");
      }

      const cardData = await cardRes.json();

      // Refresh IDs from server response to avoid duplicate inserts on subsequent saves
      if (Array.isArray(cardData.saved) && cardData.saved.length > 0) {
        const updatedPkgs = packages.map((p, i) => {
          const savedRecord = cardData.saved[i];
          if (savedRecord && savedRecord.id) {
            return { ...p, id: savedRecord.id };
          }
          return p;
        });
        setPackages(updatedPkgs);
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 5000);
    } catch (err) {
      console.error("Save error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Error saving changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-[#1E7A3A] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-500">Loading Business Consulting page data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24 font-sans">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#1E7A3A]" />
            Edit Business Consulting Page
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage hero headlines, consulting packages &amp; deliverables, client target profiles, and closing CTA banners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/business-consulting"
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
              ✓ Changes saved and published to the Business Consulting live website!
            </span>
          </div>
          <Link
            href="/business-consulting"
            target="_blank"
            className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1"
          >
            Open Live Page <ExternalLink className="w-3 h-3" />
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

      {/* Section 1: Hero Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h2 className="text-sm font-bold text-gray-900">1. Hero Banner Content</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Main Heading</label>
            <input
              type="text"
              value={form.hero_heading}
              onChange={(e) => updateText("hero_heading", e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">CTA Button Text</label>
            <input
              type="text"
              value={form.hero_cta_text}
              onChange={(e) => updateText("hero_cta_text", e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Hero Short Description</label>
          <input
            type="text"
            value={form.hero_description}
            onChange={(e) => updateText("hero_description", e.target.value)}
            className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Sub-Headline (Main Paragraph)</label>
          <textarea
            rows={2}
            value={form.hero_subheading}
            onChange={(e) => updateText("hero_subheading", e.target.value)}
            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Supporting Paragraph</label>
          <textarea
            rows={2}
            value={form.hero_supporting}
            onChange={(e) => updateText("hero_supporting", e.target.value)}
            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
          />
        </div>
      </div>

      {/* Section 2: Consulting Packages / Services Cards */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">2. Consulting Packages &amp; Deliverables</h2>
              <p className="text-[11px] text-gray-400">Edit package titles, descriptions, key deliverables, and summary taglines.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddPackage}
            className="inline-flex items-center gap-1.5 bg-[#1E7A3A] hover:bg-[#18632e] text-white text-xs font-bold px-3.5 py-2 rounded-xl cursor-pointer shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package</span>
          </button>
        </div>

        <div className="space-y-3 pt-2">
          {packages.map((pkg, idx) => {
            const isExpanded = expandedPkgId === pkg.id;
            return (
              <div
                key={pkg.id}
                className={`border rounded-xl transition-all overflow-hidden ${
                  isExpanded ? "border-[#1E7A3A] ring-1 ring-[#1E7A3A]/20 bg-white" : "border-gray-200 bg-gray-50/50"
                }`}
              >
                {/* Package Header Bar */}
                <div
                  onClick={() => setExpandedPkgId(isExpanded ? null : pkg.id)}
                  className="p-4 flex items-center justify-between cursor-pointer select-none hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: pkg.color || "#1E7A3A" }}
                    />
                    <span className="font-mono text-xs text-gray-400 font-bold">#{idx + 1}</span>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900">{pkg.title || "Untitled Package"}</h3>
                    {!pkg.visible && (
                      <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded">
                        Hidden
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePackage(pkg.id);
                      }}
                      className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                      title="Delete package"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                  </div>
                </div>

                {/* Expanded Fields */}
                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-gray-100 space-y-4 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Package Title</label>
                        <input
                          type="text"
                          value={pkg.title}
                          onChange={(e) => updatePackage(pkg.id, "title", e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Accent Color</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={pkg.color || "#1E7A3A"}
                            onChange={(e) => updatePackage(pkg.id, "color", e.target.value)}
                            className="w-8 h-8 rounded border cursor-pointer flex-shrink-0"
                          />
                          <input
                            type="text"
                            value={pkg.color || "#1E7A3A"}
                            onChange={(e) => updatePackage(pkg.id, "color", e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={pkg.description}
                        onChange={(e) => updatePackage(pkg.id, "description", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Key Summary Tagline (Quote)</label>
                      <input
                        type="text"
                        value={pkg.tagline}
                        onChange={(e) => updatePackage(pkg.id, "tagline", e.target.value)}
                        placeholder="e.g. You always know how much runway you have..."
                        className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white font-medium text-emerald-800"
                      />
                    </div>

                    {/* Key Deliverables Bullet Points */}
                    <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-gray-800">Key Deliverables Bullet Points</label>
                        <button
                          type="button"
                          onClick={() => handleAddDeliverable(pkg.id)}
                          className="text-[10px] font-bold text-[#1E7A3A] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Add Deliverable
                        </button>
                      </div>

                      <div className="space-y-2">
                        {pkg.deliverables.map((deliv, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#1E7A3A] flex-shrink-0" />
                            <input
                              type="text"
                              value={deliv}
                              onChange={(e) => handleUpdateDeliverable(pkg.id, dIdx, e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E7A3A]"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveDeliverable(pkg.id, dIdx)}
                              className="text-gray-400 hover:text-red-500 p-1 cursor-pointer flex-shrink-0"
                              title="Remove deliverable point"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 text-xs text-gray-700 font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pkg.visible}
                          onChange={(e) => updatePackage(pkg.id, "visible", e.target.checked)}
                          className="rounded text-[#1E7A3A] focus:ring-[#1E7A3A]"
                        />
                        <span>Visible on Business Consulting Page</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Ideal Client Profiles (Who This Is Built For) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h2 className="text-sm font-bold text-gray-900">3. Who This Is Built For (4 Target Profiles)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Target Profile 1</label>
            <input
              type="text"
              value={form.who_item1}
              onChange={(e) => updateText("who_item1", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Target Profile 2</label>
            <input
              type="text"
              value={form.who_item2}
              onChange={(e) => updateText("who_item2", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Target Profile 3</label>
            <input
              type="text"
              value={form.who_item3}
              onChange={(e) => updateText("who_item3", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Target Profile 4</label>
            <input
              type="text"
              value={form.who_item4}
              onChange={(e) => updateText("who_item4", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg font-medium"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Closing CTA Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
            4
          </div>
          <h2 className="text-sm font-bold text-gray-900">4. Bottom Call-To-Action Banner</h2>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Banner Heading</label>
          <input
            type="text"
            value={form.cta_heading}
            onChange={(e) => updateText("cta_heading", e.target.value)}
            className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">Banner Subheading</label>
            <input
              type="text"
              value={form.cta_subheading}
              onChange={(e) => updateText("cta_subheading", e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">CTA Button Text</label>
            <input
              type="text"
              value={form.cta_button_text}
              onChange={(e) => updateText("cta_button_text", e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl font-medium"
            />
          </div>
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-md flex items-center justify-between gap-4 sticky bottom-4 z-30">
        <span className="text-xs text-gray-500">
          Ready to update the Business Consulting page? Click Save Changes below.
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
