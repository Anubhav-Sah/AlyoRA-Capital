"use client";

import React, { useState } from "react";
import { Download, Lock, Search, FileText, CheckCircle, X, Sparkles } from "lucide-react";

export interface ReportItem {
  id: string;
  title: string;
  category: "Equity" | "Mutual Funds" | "Deep Dive" | "Macro";
  date: string;
  tagClass: string;
  isLocked: boolean;
  pages: number;
  summary: string;
  highlights: string[];
}

const mockReports: ReportItem[] = [
  {
    id: "rep-1",
    title: "Nifty 50 Technical Outlook — June 2026",
    category: "Equity",
    date: "04 Jun 2026",
    tagClass: "bg-[#EBF2FA] text-[#185FA5]",
    isLocked: false,
    pages: 14,
    summary:
      "Comprehensive chart pattern analysis, support/resistance levels, and options chain sentiment for Nifty 50 ahead of RBI Policy meeting.",
    highlights: [
      "Key support zone established at 23,200 level",
      "Bullish continuation pattern on Weekly timeframe",
      "FII / DII institutional flow breakdown",
    ],
  },
  {
    id: "rep-2",
    title: "Top SIP Picks for FY 2026-27",
    category: "Mutual Funds",
    date: "01 Jun 2026",
    tagClass: "bg-[#E8F5EC] text-[#1E7A3A]",
    isLocked: false,
    pages: 22,
    summary:
      "Analyst-curated list of top performing Large-Cap, Flexi-Cap, and Hybrid mutual fund schemes with rolling return analysis.",
    highlights: [
      "10-year rolling return benchmark evaluation",
      "Expense ratio optimization & direct plan comparison",
      "Optimal asset allocation mix by age group",
    ],
  },
  {
    id: "rep-3",
    title: "IT Sector — Valuation & Rebound Analysis",
    category: "Deep Dive",
    date: "28 May 2026",
    tagClass: "bg-[#FFF3E0] text-[#854F0B]",
    isLocked: true,
    pages: 38,
    summary:
      "Institutional deep dive into Tier-1 IT services giants, Cloud migration deal wins, and margin expansion trajectories for FY27.",
    highlights: [
      "DCF valuation models for top 5 IT exporters",
      "US/Europe client discretionary spend outlook",
      "Generative AI deal monetization timelines",
    ],
  },
  {
    id: "rep-4",
    title: "Banking & Financials Credit Growth Report",
    category: "Equity",
    date: "20 May 2026",
    tagClass: "bg-[#EBF2FA] text-[#185FA5]",
    isLocked: false,
    pages: 18,
    summary:
      "NIM margin outlook, retail NPA trends, and deposit growth dynamics across PSU and Private sector banks.",
    highlights: [
      "Credit-to-deposit ratio risk assessment",
      "Top 3 private bank top picks",
      "NBFCS auto-finance recovery trends",
    ],
  },
  {
    id: "rep-5",
    title: "Global Macro Interest Rates & Inflation Outlook",
    category: "Macro",
    date: "12 May 2026",
    tagClass: "bg-[#F3E8FF] text-[#6B21A8]",
    isLocked: true,
    pages: 26,
    summary:
      "Federal Reserve rate cut projections, crude oil price volatility impact on INR exchange rate and bond yield curves.",
    highlights: [
      "10-Year Indian Government Bond yield forecast",
      "Impact of US rate cuts on Indian FII inflows",
      "Commodity price index sensitivity matrix",
    ],
  },
  {
    id: "rep-6",
    title: "Small Cap Multi-Bagger Screening Q1 2026",
    category: "Deep Dive",
    date: "05 May 2026",
    tagClass: "bg-[#FFF3E0] text-[#854F0B]",
    isLocked: true,
    pages: 42,
    summary:
      "Proprietary quantitative screen identifying high ROE, low debt small-caps poised for earnings acceleration.",
    highlights: [
      "12 screened small-cap stocks with >20% ROE",
      "Promoter holding increase analysis",
      "Clean balance sheet & order book verification",
    ],
  },
];

interface LatestReportsSectionProps {
  onOpenPricing: () => void;
}

import { usePageData } from "@/lib/usePageData";

export default function LatestReportsSection({ onOpenPricing }: LatestReportsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewingReport, setViewingReport] = useState<ReportItem | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const { cards, pdfs, getContent } = usePageData("reports");

  const displayReports: ReportItem[] =
    cards && cards.length > 0
      ? cards
          .filter((c) => c.visible)
          .map((c, i) => {
            const extra = (c.extra_data || {}) as Record<string, unknown>;
            const category = (c.badge ||
              (extra.category as string) ||
              "Equity") as ReportItem["category"];
            const date = (extra.date as string) || "Recent";
            const tagClass =
              (extra.tagClass as string) ||
              (category === "Mutual Funds"
                ? "bg-[#E8F5EC] text-[#1E7A3A]"
                : category === "Deep Dive"
                ? "bg-[#FFF3E0] text-[#854F0B]"
                : category === "Macro"
                ? "bg-[#F3E8FF] text-[#6B21A8]"
                : "bg-[#EBF2FA] text-[#185FA5]");
            const isLocked = Boolean(extra.isLocked);
            const pages = typeof extra.pages === "number" ? extra.pages : 16;
            const highlights = Array.isArray(extra.highlights)
              ? (extra.highlights as string[])
              : [c.subtitle || "Institutional deep dive analysis"];

            return {
              id: c.id || `rep-${i}`,
              title: c.title,
              category,
              date,
              tagClass,
              isLocked,
              pages,
              summary: c.description || c.subtitle || "",
              highlights,
            };
          })
      : mockReports;

  const categories = ["All", "Equity", "Mutual Funds", "Deep Dive", "Macro"];

  const filteredReports = displayReports.filter((rep) => {
    const matchesCategory = activeCategory === "All" || rep.category === activeCategory;
    const matchesSearch =
      rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (report: ReportItem) => {
    if (report.isLocked) {
      setViewingReport(report);
      return;
    }
    // Check if there is an uploaded PDF matching this report
    const matchingPdf = pdfs.find(
      (p) =>
        p.name.toLowerCase().includes(report.title.toLowerCase().slice(0, 15)) ||
        report.title.toLowerCase().includes(p.name.toLowerCase().slice(0, 15))
    );
    if (matchingPdf && matchingPdf.url) {
      window.open(matchingPdf.url, "_blank");
      return;
    }
    setDownloadSuccess(`Downloading "${report.title}.pdf"...`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <section id="reports-section" className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
              Our Research
            </div>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0D1F3C]">
              Latest Published Reports
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl mt-1">
              Actionable research across equities, mutual funds, and macro insights.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F8FA] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 focus:border-[#1E7A3A]"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#0D1F3C] text-white shadow-sm"
                  : "bg-[#F7F8FA] text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Download Success Alert */}
        {downloadSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-800 flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* 2-Column Grid on Mobile! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-[#F7F8FA] border border-gray-200 rounded-xl p-3.5 sm:p-5 hover-lift flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full ${report.tagClass}`}
                  >
                    {report.category}
                  </span>
                  <span className="text-[9px] text-gray-400 font-mono">
                    {report.pages}P
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-semibold text-[#0D1F3C] mb-1 leading-snug line-clamp-2">
                  {report.title}
                </h3>
                <div className="text-[9px] sm:text-[10px] text-gray-400 mb-2">{report.date}</div>
                <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2 mb-3 leading-snug sm:leading-relaxed">
                  {report.summary}
                </p>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-gray-200/60 flex items-center justify-between">
                <button
                  onClick={() => setViewingReport(report)}
                  className="text-[10px] sm:text-xs font-semibold text-[#1E7A3A] hover:underline flex items-center gap-0.5"
                >
                  <FileText className="w-3 h-3" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => handleDownload(report)}
                  className={`text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 rounded flex items-center gap-1 cursor-pointer transition-colors ${
                    report.isLocked
                      ? "bg-amber-50 text-amber-800 border border-amber-200"
                      : "bg-[#1E7A3A] text-white hover:bg-[#27A84E]"
                  }`}
                >
                  {report.isLocked ? (
                    <>
                      <Lock className="w-2.5 h-2.5 text-amber-700" />
                      <span>Subscriber only</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-2.5 h-2.5" />
                      <span>PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Modal */}
      {viewingReport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl border border-gray-200">
            <button
              onClick={() => setViewingReport(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${viewingReport.tagClass}`}>
                {viewingReport.category}
              </span>
              <h3 className="font-serif-title text-xl font-bold text-[#0D1F3C] mt-2 mb-1">
                {viewingReport.title}
              </h3>
              <div className="text-xs text-gray-400">Published on {viewingReport.date} · {viewingReport.pages} Pages</div>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
              {viewingReport.summary}
            </p>

            <div className="mb-6 bg-[#F7F8FA] p-4 rounded-xl border border-gray-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D1F3C] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1E7A3A]" />
                Key Analytical Highlights
              </h4>
              <ul className="space-y-2">
                {viewingReport.highlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#27A84E] flex-shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {viewingReport.isLocked ? (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-4 text-center">
                <Lock className="w-5 h-5 text-amber-700 mx-auto mb-1" />
                <h5 className="text-xs font-bold text-amber-900">Subscribers Only Content</h5>
                <p className="text-[11px] text-amber-700 mt-1 mb-3">
                  This report requires an active Pro Research or HNI Advisory plan.
                </p>
                <button
                  onClick={() => {
                    setViewingReport(null);
                    onOpenPricing();
                  }}
                  className="w-full text-center text-xs font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white py-2 rounded-lg shadow cursor-pointer transition-colors"
                >
                  View Plans & Unlock →
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setViewingReport(null);
                  handleDownload(viewingReport);
                }}
                className="w-full text-center text-xs font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white py-2.5 rounded-lg shadow cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Full PDF Report</span>
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
