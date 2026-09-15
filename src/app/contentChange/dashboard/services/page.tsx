"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Wrench, Save, RefreshCw, CheckCircle2, AlertCircle,
  ExternalLink, Eye, Layers, Sparkles, HelpCircle,
  Check, ArrowRight, ShieldCheck, ChevronDown, ChevronUp
} from "lucide-react";
import { getSiteContent, getPageCards, type PageCard } from "@/lib/content-client";

interface ServiceCardItem {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  color: string;
  features: string;
  visible: boolean;
}

const DEFAULT_SERVICES: ServiceCardItem[] = [
  {
    slug: "research-analysis",
    title: "Research Analysis",
    subtitle: "In-depth equity & sector reports backed by research.",
    description: "Our Research Analysis division delivers institutional-grade reports on Indian equities, macroeconomic trends, and high-growth sectors. We combine rigorous DCF valuation, earnings momentum modeling, and technical entry points.",
    badge: "Flagship",
    color: "#1E7A3A",
    features: "Weekly Nifty 50 & Bank Nifty Technical Outlook\nQuarterly Earnings Deep-Dives & Valuation Models\nSmall-cap & Mid-cap Multi-bagger Discovery\nSectoral Rotation & Macro Insight Bulletins",
    visible: true,
  },
  {
    slug: "investment-advisory",
    title: "Investment Advisory",
    subtitle: "Personalised investment strategies aligned with risk.",
    description: "Receive tailored equity and debt allocation advice customized to your financial horizon and drawdown tolerance. We construct resilient portfolios designed to outperform the Nifty 50 across market cycles.",
    badge: "Advisory",
    color: "#C8963E",
    features: "Custom Portfolio Construction & Rebalancing\nReal-time Risk-adjusted Position Sizing\nDirect Access to Lead Analyst via WhatsApp Desk\nMonthly Performance & Drawdown Audits",
    visible: true,
  },
  {
    slug: "mutual-funds",
    title: "Mutual Funds",
    subtitle: "Curated mutual fund portfolios across equity & debt.",
    description: "Navigate 2,500+ mutual fund schemes with quantitative screening. We evaluate fund manager pedigree, rolling alpha, downside capture ratio, and portfolio overlap to assemble superior SIP and lumpsum baskets.",
    badge: "Wealth",
    color: "#1E7A3A",
    features: "Rolling Return & Alpha Benchmark Screening\nPortfolio Overlap Elimination Analysis\nGoal-mapped SIP Allocation (Retirement, Education)\nDirect Mutual Fund Conversion Guidance",
    visible: true,
  },
  {
    slug: "sub-broker",
    title: "Sub-Broker Program",
    subtitle: "Partner with us and earn from your financial network.",
    description: "Partner with AlyoRA Capital Research and empower your client base with institutional research, technical dashboards, and dedicated relationship manager support while enjoying industry-best revenue splits.",
    badge: "Partner",
    color: "#0D1F3C",
    features: "Up to 60% Lifetime Revenue Share On Subscriptions\nCo-branded Research Bulletins & Client Webinars\nDedicated Sub-Broker Support Desk & Portal Access\nZero Infrastructure Setup Cost — Turnkey Model",
    visible: true,
  },
  {
    slug: "financial-planning",
    title: "Financial Planning",
    subtitle: "Goal-based planning for wealth creation & tax optimisation.",
    description: "Comprehensive financial roadmap covering emergency funds, insurance adequacy, retirement planning, child education funding, and legal estate structuring under SEBI framework compliance.",
    badge: "Planning",
    color: "#1E7A3A",
    features: "Retirement Corpus Projection & FIRE Strategy Roadmap\nTax Optimisation Under New & Old Tax Regimes\nLife & Health Insurance Coverage Adequacy Audit\nGoal-based Asset-Liability Matching",
    visible: true,
  },
  {
    slug: "business-consulting",
    title: "Business Consulting",
    subtitle: "Growth advisory & financial planning for founders.",
    description: "Partner with AlyoRA Capital Research to build, run, and scale your business with confidence — backed by institutional-grade financial research, structured strategy frameworks, and hands-on planning support.",
    badge: "Consulting",
    color: "#0D1F3C",
    features: "Financial Planning & Budgeting with Cash-flow Forecasts\nBusiness Strategy & Growth Planning with Milestone Roadmaps\nStartup Advisory & Business Model Validation\nBusiness Health Diagnostics & Cost Leakage Audits",
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

export default function SimpleAdminServicesPage() {
  // 1. Hero Content
  const [heroTitle, setHeroTitle] = useState("Core Advisory & Research Services");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Explore our full suite of equity research, wealth advisory, mutual fund portfolio management, and sub-broker partnership programs."
  );

  // 2. Section Header
  const [sectionTagline, setSectionTagline] = useState("What We Do");
  const [sectionHeading, setSectionHeading] = useState("Our Core Services");
  const [sectionSubheading, setSectionSubheading] = useState(
    "From deep equity research to personalised investment advisory & business growth consulting."
  );

  // 3. Service Cards
  const [serviceCards, setServiceCards] = useState<ServiceCardItem[]>(DEFAULT_SERVICES);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(0);

  // 4. Sub-Broker Bottom Banner
  const [bannerBadge, setBannerBadge] = useState("Sub-Broker Partner Network");
  const [bannerHeading, setBannerHeading] = useState("Grow Your Wealth Practice With AlyoRA Infrastructure");
  const [bannerDesc, setBannerDesc] = useState(
    "Offer your clients institutional-grade equity reports and wealth models under a lucrative revenue-sharing model."
  );
  const [bannerBtn1, setBannerBtn1] = useState("Calculate Revenue Potential");
  const [bannerBtn2, setBannerBtn2] = useState("Partner Info");

  // 5. Consultation CTA Card
  const [ctaHeading, setCtaHeading] = useState("Not sure where to start?");
  const [ctaDesc, setCtaDesc] = useState("Book a free 30-minute call to clarify your strategy.");
  const [ctaBtn, setCtaBtn] = useState("Book Free Call →");

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
          getSiteContent("services"),
          getPageCards("services"),
        ]);

        // Merge text content
        contentRows.forEach((r) => {
          if (!r.value) return;
          if (r.section === "hero") {
            if (r.key === "title") setHeroTitle(r.value);
            if (r.key === "subtitle") setHeroSubtitle(r.value);
          } else if (r.section === "main-cards") {
            if (r.key === "tagline") setSectionTagline(r.value);
            if (r.key === "heading") setSectionHeading(r.value);
            if (r.key === "subheading") setSectionSubheading(r.value);
          } else if (r.section === "sub-broker-banner") {
            if (r.key === "badge") setBannerBadge(r.value);
            if (r.key === "heading") setBannerHeading(r.value);
            if (r.key === "description") setBannerDesc(r.value);
            if (r.key === "button1_text") setBannerBtn1(r.value);
            if (r.key === "button2_text") setBannerBtn2(r.value);
          } else if (r.section === "cta-card") {
            if (r.key === "heading") setCtaHeading(r.value);
            if (r.key === "description") setCtaDesc(r.value);
            if (r.key === "button_text") setCtaBtn(r.value);
          }
        });

        // Merge cards
        if (cardRows && cardRows.length > 0) {
          const mappedCards: ServiceCardItem[] = DEFAULT_SERVICES.map((defCard, idx) => {
            // Find existing DB card by matching slug or title or position
            const found = cardRows.find((dbCard) => {
              const extra = (dbCard.extra_data || {}) as Record<string, unknown>;
              const dbSlug =
                (typeof extra.slug === "string" && extra.slug) ||
                (dbCard.button_url && dbCard.button_url.startsWith("/services/")
                  ? dbCard.button_url.replace("/services/", "")
                  : null) ||
                dbCard.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
              return dbSlug === defCard.slug || dbCard.title.toLowerCase().includes(defCard.title.toLowerCase().split(" ")[0]);
            }) || cardRows[idx];

            if (!found) return defCard;

            const extra = (found.extra_data || {}) as Record<string, unknown>;
            const featList = Array.isArray(extra.features)
              ? (extra.features as string[]).join("\n")
              : typeof extra.features === "string"
              ? extra.features
              : defCard.features;

            const cardColor = typeof extra.color === "string" ? extra.color : defCard.color;
            const customSlug = (typeof extra.slug === "string" && extra.slug) || defCard.slug;

            return {
              id: found.id,
              slug: customSlug,
              title: found.title || defCard.title,
              subtitle: found.subtitle || found.description || defCard.subtitle,
              description: found.description || defCard.description,
              badge: found.badge || defCard.badge,
              color: cardColor,
              features: featList,
              visible: found.visible !== false,
            };
          });

          setServiceCards(mappedCards);
        }
      } catch (err) {
        console.error("Failed to load services data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const updateCard = (index: number, field: keyof ServiceCardItem, value: unknown) => {
    setServiceCards((prev) => {
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
      // 1. Build text items for site_content
      const contentItems = [
        { page: "services", section: "hero", key: "title", value: heroTitle },
        { page: "services", section: "hero", key: "subtitle", value: heroSubtitle },
        { page: "services", section: "main-cards", key: "tagline", value: sectionTagline },
        { page: "services", section: "main-cards", key: "heading", value: sectionHeading },
        { page: "services", section: "main-cards", key: "subheading", value: sectionSubheading },
        { page: "services", section: "sub-broker-banner", key: "badge", value: bannerBadge },
        { page: "services", section: "sub-broker-banner", key: "heading", value: bannerHeading },
        { page: "services", section: "sub-broker-banner", key: "description", value: bannerDesc },
        { page: "services", section: "sub-broker-banner", key: "button1_text", value: bannerBtn1 },
        { page: "services", section: "sub-broker-banner", key: "button2_text", value: bannerBtn2 },
        { page: "services", section: "cta-card", key: "heading", value: ctaHeading },
        { page: "services", section: "cta-card", key: "description", value: ctaDesc },
        { page: "services", section: "cta-card", key: "button_text", value: ctaBtn },
      ];

      // 2. Build cards payload for page_cards
      const cardsPayload = serviceCards.map((sc, i) => ({
        id: sc.id,
        page: "services",
        section: "main-cards",
        position: i,
        title: sc.title,
        subtitle: sc.subtitle,
        description: sc.description,
        badge: sc.badge,
        button_label: "Learn More",
        button_url: `/services/${sc.slug}`,
        visible: sc.visible,
        extra_data: {
          color: sc.color,
          slug: sc.slug,
          features: sc.features.split("\n").map((s) => s.trim()).filter(Boolean),
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
        throw new Error(cardsJson.error || "Failed to save service cards.");
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
          <p className="text-xs text-gray-500">Loading services information...</p>
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
            <Wrench className="w-5 h-5 text-[#1E7A3A]" />
            Edit Services Page &amp; Offerings
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Edit the page headline, core service cards, deliverables, and bottom partner banner. All changes reflect on the live website immediately.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/services"
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
              href="/services"
              target="_blank"
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1"
            >
              Open Services Page <ExternalLink className="w-3 h-3" />
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

      {/* Section 1: Hero & Overview Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-gray-900">1. Hero &amp; Page Header</h2>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Page Main Headline
            </label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => {
                setHeroTitle(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Core Advisory & Research Services"
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold text-gray-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Page Hero Subheading / Description
            </label>
            <textarea
              rows={2}
              value={heroSubtitle}
              onChange={(e) => {
                setHeroSubtitle(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Explore our full suite of equity research, wealth advisory..."
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Section Badge Tagline
            </label>
            <input
              type="text"
              value={sectionTagline}
              onChange={(e) => {
                setSectionTagline(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="What We Do"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={sectionHeading}
              onChange={(e) => {
                setSectionHeading(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Our Core Services"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Section Subtitle
            </label>
            <input
              type="text"
              value={sectionSubheading}
              onChange={(e) => {
                setSectionSubheading(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="From deep equity research to personalised investment advisory..."
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Service Cards (Direct Card Editors) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">2. Core Service Cards ({serviceCards.length})</h2>
              <p className="text-[11px] text-gray-500">Edit titles, summaries, accent colors, and deliverables for each service card.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {serviceCards.map((card, index) => {
            const isExpanded = expandedCardIndex === index;
            return (
              <div
                key={card.slug || index}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
                style={{ borderLeftWidth: "4px", borderLeftColor: card.color || "#1E7A3A" }}
              >
                {/* Collapsible Card Header */}
                <div
                  onClick={() => setExpandedCardIndex(isExpanded ? null : index)}
                  className="p-4 bg-gray-50 hover:bg-gray-100/70 transition-colors flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 flex items-center justify-center shadow-xs">
                      {index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs sm:text-sm font-bold text-gray-900">{card.title}</h3>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: card.color || "#1E7A3A" }}
                        >
                          {card.badge || "Service"}
                        </span>
                        {!card.visible && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 truncate max-w-md">{card.subtitle}</p>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Title */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Service Title *
                        </label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => updateCard(index, "title", e.target.value)}
                          placeholder="e.g. Research Analysis"
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold"
                        />
                      </div>

                      {/* Badge */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Badge / Tag Label
                        </label>
                        <input
                          type="text"
                          value={card.badge}
                          onChange={(e) => updateCard(index, "badge", e.target.value)}
                          placeholder="e.g. Flagship, Advisory, Wealth"
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                        />
                      </div>
                    </div>

                    {/* Subtitle / Short Description */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Card Summary / Tagline (Shown on card preview)
                      </label>
                      <input
                        type="text"
                        value={card.subtitle}
                        onChange={(e) => updateCard(index, "subtitle", e.target.value)}
                        placeholder="In-depth equity & sector reports backed by research."
                        className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                      />
                    </div>

                    {/* Detail Description */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Full Description (Shown on service details page)
                      </label>
                      <textarea
                        rows={3}
                        value={card.description}
                        onChange={(e) => updateCard(index, "description", e.target.value)}
                        placeholder="Our Research Analysis division delivers institutional-grade reports..."
                        className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
                      />
                    </div>

                    {/* Accent Color & Visibility */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Accent Color
                        </label>
                        <div className="flex items-center gap-2 flex-wrap">
                          {PRESET_COLORS.map((pc) => (
                            <button
                              key={pc.value}
                              type="button"
                              onClick={() => updateCard(index, "color", pc.value)}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                                card.color === pc.value ? "ring-2 ring-offset-2 ring-gray-600 scale-110" : "hover:opacity-80"
                              }`}
                              style={{ backgroundColor: pc.value }}
                              title={pc.name}
                            >
                              {card.color === pc.value && <Check className="w-3.5 h-3.5 text-white" />}
                            </button>
                          ))}
                          <input
                            type="text"
                            value={card.color}
                            onChange={(e) => updateCard(index, "color", e.target.value)}
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
                              checked={card.visible}
                              onChange={(e) => updateCard(index, "visible", e.target.checked)}
                              className="w-4 h-4 rounded text-[#1E7A3A] focus:ring-[#1E7A3A] accent-[#1E7A3A]"
                            />
                            <span>Show this card on the services page</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Features / Deliverables */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-gray-700">
                          Key Deliverables / Features (1 per line)
                        </label>
                        <span className="text-[10px] text-gray-400">Lines become bullet points</span>
                      </div>
                      <textarea
                        rows={4}
                        value={card.features}
                        onChange={(e) => updateCard(index, "features", e.target.value)}
                        placeholder="Weekly Nifty 50 & Bank Nifty Technical Outlook&#10;Quarterly Earnings Deep-Dives&#10;Multi-bagger Discovery"
                        className="w-full px-3 py-2 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
                      />
                    </div>

                    {/* URL Link Preview */}
                    <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between text-xs text-gray-500">
                      <span>
                        Detail Page Link:{" "}
                        <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-800 font-semibold">
                          /services/{card.slug}
                        </code>
                      </span>
                      <Link
                        href={`/services/${card.slug}`}
                        target="_blank"
                        className="text-[#1E7A3A] hover:underline flex items-center gap-1 font-semibold"
                      >
                        Preview Service Page <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Sub-Broker Bottom Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-[#C8963E] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">3. Sub-Broker Partner Network Banner</h2>
            <p className="text-[11px] text-gray-500">The dark banner at the bottom of the services page.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Banner Badge Text
            </label>
            <input
              type="text"
              value={bannerBadge}
              onChange={(e) => {
                setBannerBadge(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Sub-Broker Partner Network"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Banner Headline
            </label>
            <input
              type="text"
              value={bannerHeading}
              onChange={(e) => {
                setBannerHeading(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Grow Your Wealth Practice With AlyoRA Infrastructure"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Banner Description
            </label>
            <textarea
              rows={2}
              value={bannerDesc}
              onChange={(e) => {
                setBannerDesc(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Offer your clients institutional-grade equity reports and wealth models under a lucrative revenue-sharing model."
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Primary Button Text (Opens Calculator)
            </label>
            <input
              type="text"
              value={bannerBtn1}
              onChange={(e) => {
                setBannerBtn1(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Calculate Revenue Potential"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Secondary Button Text (Links to /sub-broker)
            </label>
            <input
              type="text"
              value={bannerBtn2}
              onChange={(e) => {
                setBannerBtn2(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Partner Info"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Consultation CTA Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">4. Consultation CTA Card (&quot;Not sure where to start?&quot;)</h2>
            <p className="text-[11px] text-gray-500">The green card rendered alongside the services grid.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              CTA Card Headline
            </label>
            <input
              type="text"
              value={ctaHeading}
              onChange={(e) => {
                setCtaHeading(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Not sure where to start?"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              CTA Card Description
            </label>
            <input
              type="text"
              value={ctaDesc}
              onChange={(e) => {
                setCtaDesc(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Book a free 30-minute call to clarify your strategy."
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              CTA Button Label
            </label>
            <input
              type="text"
              value={ctaBtn}
              onChange={(e) => {
                setCtaBtn(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Book Free Call →"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Bottom Sticky Save Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-md flex items-center justify-between gap-4 sticky bottom-4 z-30">
        <span className="text-xs text-gray-500">
          Ready to publish your services updates to the website? Click Save Changes.
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
