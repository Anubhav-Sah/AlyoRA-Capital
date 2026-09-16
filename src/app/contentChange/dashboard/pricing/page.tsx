"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  DollarSign, Save, RefreshCw, CheckCircle2, AlertCircle,
  Eye, Plus, Trash2, ChevronDown, ChevronUp, Star
} from "lucide-react";
import { getPageCards, getSiteContent, type PageCard } from "@/lib/content-client";

// ─── Types ────────────────────────────────────────────────────────────────────

type Period = "monthly" | "quarterly" | "halfyearly" | "yearly";

interface TierFeature {
  text: string;
  inherit: boolean;
}

interface TierAdminItem {
  id?: string;
  name: string;
  tag: string;
  badge: string;
  ctaText: string;
  features: TierFeature[];
  prices: Record<Period, number>;
}

interface StandaloneAdminItem {
  id?: string;
  title: string;
  price: string;
  description: string;
  badge: string;
  buttonLabel: string;
  visible: boolean;
}

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_TIERS: TierAdminItem[] = [
  {
    name: "Prime",
    tag: "Index options calls.",
    badge: "",
    ctaText: "Start with Prime",
    features: [
      { text: "Sensex, Nifty, Bank Nifty & Fin Nifty outlook (weekly)", inherit: false },
      { text: "Intraday index options calls", inherit: false },
      { text: "Stock options calls (buyer strategy only)", inherit: false },
      { text: "Real-time entry & exit alerts", inherit: false },
      { text: "Standard email & WhatsApp support", inherit: false },
    ],
    prices: { monthly: 17999, quarterly: 46999, halfyearly: 64999, yearly: 79999 },
  },
  {
    name: "Premium",
    tag: "Futures & commodities.",
    badge: "",
    ctaText: "Move to Premium",
    features: [
      { text: "Everything in Prime", inherit: true },
      { text: "Index & stock futures calls", inherit: false },
      { text: "Options buyer and seller strategies", inherit: false },
      { text: "Commodity calls (Gold, Silver, Crude & more)", inherit: false },
      { text: "Priority WhatsApp analyst access", inherit: false },
    ],
    prices: { monthly: 22999, quarterly: 58999, halfyearly: 79999, yearly: 99999 },
  },
  {
    name: "Elite",
    tag: "IPOs & swing wealth.",
    badge: "Most chosen",
    ctaText: "Go Elite",
    features: [
      { text: "Everything in Premium", inherit: true },
      { text: "IPO analysis & application guidance", inherit: false },
      { text: "Swing trading calls (2-15 day)", inherit: false },
      { text: "Monthly equity research report", inherit: false },
      { text: "Long-term stock picks for wealth building", inherit: false },
    ],
    prices: { monthly: 28999, quarterly: 73999, halfyearly: 99999, yearly: 124999 },
  },
  {
    name: "Apex",
    tag: "Primary market & metals.",
    badge: "",
    ctaText: "Reach Apex",
    features: [
      { text: "Everything in Elite", inherit: true },
      { text: "FPO & Offer-for-Sale guidance", inherit: false },
      { text: "Full primary market advisory", inherit: false },
      { text: "Gold & silver investment advisory", inherit: false },
      { text: "Weekly research report & recommendations", inherit: false },
    ],
    prices: { monthly: 35999, quarterly: 91999, halfyearly: 124999, yearly: 149999 },
  },
  {
    name: "Pinnacle",
    tag: "Complete portfolio.",
    badge: "Full Portfolio",
    ctaText: "Reach the Summit",
    features: [
      { text: "Everything in Apex", inherit: true },
      { text: "Tailor-made investment portfolio", inherit: false },
      { text: "G-Sec, bonds & debenture advisory", inherit: false },
      { text: "Complete gold & silver allocation planning", inherit: false },
      { text: "Dedicated senior research partner 1-on-1", inherit: false },
    ],
    prices: { monthly: 44999, quarterly: 113999, halfyearly: 154999, yearly: 174999 },
  },
];

const DEFAULT_STANDALONE: StandaloneAdminItem[] = [
  {
    title: "Financial Planning",
    price: "₹1,999 / slot",
    description: "Goal-based planning for retirement, tax efficiency and wealth creation.",
    badge: "",
    buttonLabel: "Book Slot →",
    visible: true,
  },
  {
    title: "Mutual Fund Planning",
    price: "Free",
    description: "Curated mutual fund and SIP guidance across equity and debt categories.",
    badge: "Free",
    buttonLabel: "Get Started →",
    visible: true,
  },
];

const PERIODS: { key: Period; label: string }[] = [
  { key: "monthly", label: "Monthly" },
  { key: "quarterly", label: "Quarterly" },
  { key: "halfyearly", label: "Half-Year" },
  { key: "yearly", label: "Yearly" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapDbCardToTier(c: PageCard, defaultIdx: number): TierAdminItem {
  const def = DEFAULT_TIERS[defaultIdx] || DEFAULT_TIERS[0];
  const extra = (c.extra_data || {}) as Record<string, unknown>;
  const prices = (extra.prices || def.prices) as Record<Period, number>;
  const features = Array.isArray(extra.features) ? (extra.features as TierFeature[]) : def.features;

  return {
    id: c.id,
    name: c.title || def.name,
    tag: c.subtitle || def.tag,
    badge: c.badge || (typeof extra.offer === "string" ? extra.offer : def.badge),
    ctaText: c.button_label || def.ctaText,
    features,
    prices: {
      monthly: prices.monthly ?? def.prices.monthly,
      quarterly: prices.quarterly ?? def.prices.quarterly,
      halfyearly: prices.halfyearly ?? def.prices.halfyearly,
      yearly: prices.yearly ?? def.prices.yearly,
    },
  };
}

function mapDbCardToStandalone(c: PageCard, defaultIdx: number): StandaloneAdminItem {
  const def = DEFAULT_STANDALONE[defaultIdx] || DEFAULT_STANDALONE[0];
  const extra = (c.extra_data || {}) as Record<string, unknown>;
  const price = c.subtitle || (typeof extra.price === "string" ? extra.price : def.price);

  return {
    id: c.id,
    title: c.title || def.title,
    price,
    description: c.description || def.description,
    badge: c.badge || (typeof extra.badge === "string" ? extra.badge : def.badge),
    buttonLabel: c.button_label || def.buttonLabel,
    visible: c.visible !== false,
  };
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminPricingPage() {
  const [tiers, setTiers] = useState<TierAdminItem[]>(DEFAULT_TIERS);
  const [standalone, setStandalone] = useState<StandaloneAdminItem[]>(DEFAULT_STANDALONE);
  const [noteMain, setNoteMain] = useState(
    "Retail and individual investor pricing shown above. Family offices & HNI custom quotes available upon request."
  );
  const [noteSub, setNoteSub] = useState(
    "Investments carry risk. Calls & reports shared under any plan are for informational purposes."
  );

  const [deletedStandaloneIds, setDeletedStandaloneIds] = useState<string[]>([]);
  const [expandedTier, setExpandedTier] = useState<number | null>(0);
  const [expandedStandalone, setExpandedStandalone] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load from DB
  useEffect(() => {
    async function load() {
      try {
        const [cardRows, contentRows] = await Promise.all([
          getPageCards("pricing"),
          getSiteContent("pricing"),
        ]);
        const tierCards = cardRows.filter((c) => c.section === "tiers");
        const standaloneCards = cardRows.filter((c) => c.section === "standalone");

        if (tierCards.length > 0) {
          setTiers(tierCards.map((c, i) => mapDbCardToTier(c, i)));
        }
        if (standaloneCards.length > 0) {
          setStandalone(standaloneCards.map((c, i) => mapDbCardToStandalone(c, i)));
        }

        contentRows.forEach((r) => {
          if (!r.value) return;
          if (r.section === "footnote") {
            if (r.key === "note_main") setNoteMain(r.value);
            if (r.key === "note_sub") setNoteSub(r.value);
          }
        });
      } catch (err) {
        console.error("Failed to load pricing data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ─── Tier helpers ──────────────────────────────────────────────────────────

  const updateTier = (idx: number, field: keyof TierAdminItem, value: unknown) => {
    setTiers((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
    setSavedSuccess(false);
  };

  const updateTierPrice = (idx: number, period: Period, value: number) => {
    setTiers((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], prices: { ...next[idx].prices, [period]: value } };
      return next;
    });
    setSavedSuccess(false);
  };

  const updateTierFeature = (tierIdx: number, featIdx: number, field: keyof TierFeature, value: unknown) => {
    setTiers((prev) => {
      const next = [...prev];
      const features = [...next[tierIdx].features];
      features[featIdx] = { ...features[featIdx], [field]: value };
      next[tierIdx] = { ...next[tierIdx], features };
      return next;
    });
    setSavedSuccess(false);
  };

  const addTierFeature = (tierIdx: number) => {
    setTiers((prev) => {
      const next = [...prev];
      next[tierIdx] = {
        ...next[tierIdx],
        features: [...next[tierIdx].features, { text: "New feature", inherit: false }],
      };
      return next;
    });
  };

  const removeTierFeature = (tierIdx: number, featIdx: number) => {
    setTiers((prev) => {
      const next = [...prev];
      next[tierIdx] = {
        ...next[tierIdx],
        features: next[tierIdx].features.filter((_, i) => i !== featIdx),
      };
      return next;
    });
  };

  // ─── Standalone helpers ───────────────────────────────────────────────────

  const updateStandalone = (idx: number, field: keyof StandaloneAdminItem, value: unknown) => {
    setStandalone((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
    setSavedSuccess(false);
  };

  const addStandalone = () => {
    setStandalone((prev) => [
      ...prev,
      { title: "New Service", price: "Custom", description: "Service description.", badge: "", buttonLabel: "Book Slot", visible: true },
    ]);
    setExpandedStandalone(standalone.length);
    setSavedSuccess(false);
  };

  const deleteStandalone = (idx: number) => {
    const item = standalone[idx];
    if (item?.id) setDeletedStandaloneIds((prev) => [...prev, item.id!]);
    setStandalone((prev) => prev.filter((_, i) => i !== idx));
    setExpandedStandalone(null);
    setSavedSuccess(false);
  };

  // ─── Save ──────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    setSaving(true);
    setErrorMessage("");
    setSavedSuccess(false);

    try {
      // 1. Delete removed standalone cards
      for (const id of deletedStandaloneIds) {
        await fetch("/api/cards/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, page: "pricing" }),
        });
      }
      setDeletedStandaloneIds([]);

      // 2. Build tier cards payload (section=tiers)
      const tierPayload = tiers.map((t, i) => ({
        id: t.id,
        page: "pricing",
        section: "tiers",
        position: i,
        title: t.name,
        subtitle: t.tag,
        badge: t.badge,
        button_label: t.ctaText,
        button_url: "/pricing",
        visible: true,
        description: t.tag,
        extra_data: {
          stage: i,
          prices: t.prices,
          features: t.features,
          offer: t.badge,
        },
      }));

      // 3. Build standalone payload (section=standalone)
      const standalonePayload = standalone.map((s, i) => ({
        id: s.id,
        page: "pricing",
        section: "standalone",
        position: i,
        title: s.title,
        subtitle: s.price,
        description: s.description,
        badge: s.badge,
        button_label: s.buttonLabel,
        button_url: "/pricing",
        visible: s.visible,
        extra_data: { price: s.price, badge: s.badge },
      }));

      const allCards = [...tierPayload, ...standalonePayload];

      const res = await fetch("/api/cards/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cards: allCards }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || "Failed to save pricing.");

      // Save footnote text to site_content
      const footnoteItems = [
        { page: "pricing", section: "footnote", key: "note_main", value: noteMain },
        { page: "pricing", section: "footnote", key: "note_sub", value: noteSub },
      ];

      await fetch("/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: footnoteItems }),
      });

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 5000);

      // Reload IDs from DB to avoid duplicate inserts on subsequent saves
      try {
        const fresh = await getPageCards("pricing");
        const freshTiers = fresh.filter((c) => c.section === "tiers");
        const freshStandalone = fresh.filter((c) => c.section === "standalone");
        setTiers((prev) => prev.map((t, i) => ({ ...t, id: t.id || freshTiers[i]?.id || t.id })));
        setStandalone((prev) => prev.map((s, i) => ({ ...s, id: s.id || freshStandalone[i]?.id || s.id })));
      } catch { /* non-critical */ }
    } catch (err) {
      console.error("Save error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Error saving. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ─── Loading ──────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-[#1E7A3A] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-500">Loading pricing data...</p>
        </div>
      </div>
    );
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 font-sans">

      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#1E7A3A]" />
            Edit Pricing &amp; Plans
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Update prices for all 4 billing periods, tier features, badges, and standalone services. Changes reflect live immediately after saving.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/pricing"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-gray-500" />
            <span>View Live Pricing</span>
          </Link>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-xl bg-[#1E7A3A] hover:bg-[#18632e] text-white shadow transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /><span>Saving...</span></>
            ) : (
              <><Save className="w-4 h-4" /><span>Save Changes</span></>
            )}
          </button>
        </div>
      </div>

      {/* Status Banners */}
      {savedSuccess && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-emerald-800 text-sm font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          Pricing saved successfully! Changes are now live on the website.
        </div>
      )}
      {errorMessage && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-800 text-sm">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          {errorMessage}
        </div>
      )}

      {/* ─── Section 1: 5 Tier Plans ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
            <Star className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">1. Advisory Tier Plans (5 Stages)</h2>
            <p className="text-[11px] text-gray-500">Edit prices, features, badges, and CTA text for each tier. Click a tier to expand.</p>
          </div>
        </div>

        <div className="space-y-3">
          {tiers.map((tier, idx) => {
            const isExpanded = expandedTier === idx;
            const tierColors = ["#185FA5", "#185FA5", "#1E7A3A", "#6B21A8", "#C8963E"];
            const borderColor = tierColors[idx] || "#185FA5";

            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                style={{ borderLeftWidth: "4px", borderLeftColor: borderColor }}
              >
                {/* Tier Header Row */}
                <div
                  onClick={() => setExpandedTier(isExpanded ? null : idx)}
                  className="p-4 bg-gray-50 hover:bg-gray-100/70 transition-colors flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-gray-900">{tier.name}</h3>
                        {tier.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                            {tier.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Rs.{tier.prices.monthly.toLocaleString("en-IN")}/mo &middot; {tier.features.length} features
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>

                {/* Tier Expanded Form */}
                {isExpanded && (
                  <div className="p-5 space-y-5 bg-white">
                    {/* Name, Tag, Badge, CTA */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Tier Name</label>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => updateTier(idx, "name", e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Tag Line (shown under name)</label>
                        <input
                          type="text"
                          value={tier.tag}
                          onChange={(e) => updateTier(idx, "tag", e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Badge Label <span className="text-gray-400 font-normal">(leave blank to hide)</span>
                        </label>
                        <input
                          type="text"
                          value={tier.badge}
                          onChange={(e) => updateTier(idx, "badge", e.target.value)}
                          placeholder="e.g. Most chosen"
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">CTA Button Text</label>
                        <input
                          type="text"
                          value={tier.ctaText}
                          onChange={(e) => updateTier(idx, "ctaText", e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                        />
                      </div>
                    </div>

                    {/* Prices */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        Prices (Rs.) &mdash; All 4 billing periods
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {PERIODS.map(({ key, label }) => (
                          <div key={key}>
                            <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                              {label}
                            </label>
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-semibold pointer-events-none">Rs.</span>
                              <input
                                type="number"
                                value={tier.prices[key]}
                                onChange={(e) => updateTierPrice(idx, key, Number(e.target.value))}
                                className="w-full pl-7 pr-2 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-mono"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-gray-700">Features List</label>
                        <button
                          type="button"
                          onClick={() => addTierFeature(idx)}
                          className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Add Feature
                        </button>
                      </div>
                      <div className="space-y-2">
                        {tier.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <label
                              className="flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                              title="Mark as inherited from previous tier (shows greyed-out)"
                            >
                              <input
                                type="checkbox"
                                checked={feat.inherit}
                                onChange={(e) => updateTierFeature(idx, fIdx, "inherit", e.target.checked)}
                                className="w-3.5 h-3.5 rounded accent-[#1E7A3A]"
                              />
                              <span className="text-[10px] text-gray-500 whitespace-nowrap">Inherited</span>
                            </label>
                            <input
                              type="text"
                              value={feat.text}
                              onChange={(e) => updateTierFeature(idx, fIdx, "text", e.target.value)}
                              className={`flex-1 px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 ${
                                feat.inherit
                                  ? "bg-gray-50 border-gray-200 text-gray-500 italic"
                                  : "bg-white border-gray-300 text-gray-800"
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => removeTierFeature(idx, fIdx)}
                              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded cursor-pointer flex-shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Section 2: Standalone Services ──────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">2. Standalone Services ({standalone.length})</h2>
              <p className="text-[11px] text-gray-500">Services not tied to a plan. Add, edit, or remove them.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={addStandalone}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg bg-[#1E7A3A] text-white hover:bg-[#18632e] transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service</span>
          </button>
        </div>

        <div className="space-y-3">
          {standalone.map((svc, idx) => {
            const isExpanded = expandedStandalone === idx;
            const borderColor = svc.badge === "Free" ? "#1E7A3A" : "#C8963E";
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                style={{ borderLeftWidth: "4px", borderLeftColor: borderColor }}
              >
                {/* Header */}
                <div
                  onClick={() => setExpandedStandalone(isExpanded ? null : idx)}
                  className="p-4 bg-gray-50 hover:bg-gray-100/70 transition-colors flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{svc.title}</h3>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {svc.price}
                        {!svc.visible && <span className="text-red-500 font-medium"> &middot; Hidden</span>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); deleteStandalone(idx); }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Standalone Expanded Form */}
                {isExpanded && (
                  <div className="p-5 space-y-4 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Service Name</label>
                        <input
                          type="text"
                          value={svc.title}
                          onChange={(e) => updateStandalone(idx, "title", e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Price Display</label>
                        <input
                          type="text"
                          value={svc.price}
                          onChange={(e) => updateStandalone(idx, "price", e.target.value)}
                          placeholder="e.g. Rs.1,999 / slot or Free"
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Badge Label <span className="text-gray-400 font-normal">(e.g. &ldquo;Free&rdquo;, leave blank to hide)</span>
                        </label>
                        <input
                          type="text"
                          value={svc.badge}
                          onChange={(e) => updateStandalone(idx, "badge", e.target.value)}
                          placeholder="Free"
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Button Text</label>
                        <input
                          type="text"
                          value={svc.buttonLabel}
                          onChange={(e) => updateStandalone(idx, "buttonLabel", e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={svc.description}
                        onChange={(e) => updateStandalone(idx, "description", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                        <input
                          type="checkbox"
                          checked={svc.visible}
                          onChange={(e) => updateStandalone(idx, "visible", e.target.checked)}
                          className="w-4 h-4 rounded accent-[#1E7A3A]"
                        />
                        <span>Show this service on the website</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => deleteStandalone(idx)}
                        className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Service</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {standalone.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-400 border border-dashed border-gray-200 rounded-xl">
              No standalone services. Click &ldquo;+ Add Service&rdquo; to create one.
            </div>
          )}
        </div>
      </div>

      {/* ─── Section 3: Footnote Notes & Disclaimers ──────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-[#0D1F3C] text-white flex items-center justify-center font-bold text-xs">
            3
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">3. Pricing Footnote &amp; Risk Disclaimer</h2>
            <p className="text-[11px] text-gray-400">Edit the note and disclaimer rendered at the bottom of the live pricing table.</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Main Pricing Note Line
          </label>
          <textarea
            rows={2}
            value={noteMain}
            onChange={(e) => {
              setNoteMain(e.target.value);
              setSavedSuccess(false);
            }}
            placeholder="Retail and individual investor pricing shown above..."
            className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white leading-relaxed font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Risk &amp; Information Disclaimer Line
          </label>
          <input
            type="text"
            value={noteSub}
            onChange={(e) => {
              setNoteSub(e.target.value);
              setSavedSuccess(false);
            }}
            placeholder="Investments carry risk..."
            className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white font-medium"
          />
        </div>
      </div>

      {/* ─── Sticky Save Bar ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-md flex items-center justify-between gap-4 sticky bottom-4 z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={addStandalone}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#1E7A3A]" />
            <span>+ Add Standalone Service</span>
          </button>
          <span className="text-xs text-gray-500 hidden sm:inline">
            Click Save Changes to publish pricing updates live.
          </span>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 text-xs font-bold px-6 py-3 rounded-xl bg-[#1E7A3A] hover:bg-[#18632e] text-white shadow transition-all cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <><RefreshCw className="w-4 h-4 animate-spin" /><span>Saving to Website...</span></>
          ) : (
            <><Save className="w-4 h-4" /><span>Save Changes</span></>
          )}
        </button>
      </div>
    </div>
  );
}
