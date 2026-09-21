"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FileText, Save, RefreshCw, CheckCircle2, AlertCircle,
  ExternalLink, Eye, Plus, Trash2, Upload, Lock, Unlock,
  ChevronDown, ChevronUp, File, X, Download, Sparkles
} from "lucide-react";
import { getSiteContent, getPageCards } from "@/lib/content-client";

interface ReportAdminItem {
  id?: string;
  title: string;
  category: "Equity" | "Mutual Funds" | "Deep Dive" | "Macro";
  date: string;
  pages: number;
  isLocked: boolean;
  summary: string;
  highlights: string;
  pdfUrl: string;
  pdfName: string;
  visible: boolean;
}

const DEFAULT_REPORTS: ReportAdminItem[] = [
  {
    title: "Nifty 50 Technical Outlook — June 2026",
    category: "Equity",
    date: "04 Jun 2026",
    pages: 14,
    isLocked: false,
    summary: "Comprehensive chart pattern analysis, critical support/resistance zones, and options chain sentiment ahead of the RBI Monetary Policy meeting.",
    highlights: "Key support zone established at 23,200 level\nBullish continuation pattern on Weekly timeframe\nFII / DII institutional flow breakdown",
    pdfUrl: "/sample-reports/nifty-50-june-2026.pdf",
    pdfName: "nifty-50-june-2026.pdf",
    visible: true,
  },
  {
    title: "Top SIP Picks for FY 2026-27",
    category: "Mutual Funds",
    date: "01 Jun 2026",
    pages: 22,
    isLocked: false,
    summary: "Comprehensive evaluation of Large-Cap, Flexi-Cap, and Hybrid mutual fund schemes based on 10-year rolling returns and downside capture.",
    highlights: "10-year rolling return benchmark evaluation\nExpense ratio optimization & direct plan comparison\nOptimal asset allocation mix by age group",
    pdfUrl: "/sample-reports/top-sip-picks-2026-27.pdf",
    pdfName: "top-sip-picks-2026-27.pdf",
    visible: true,
  },
  {
    title: "IT Sector — Valuation & Rebound Analysis",
    category: "Deep Dive",
    date: "28 May 2026",
    pages: 38,
    isLocked: true,
    summary: "Detailed review of Tier-1 Indian IT services firms, Cloud and AI transformation deal wins, and margin expansion trajectories for FY27.",
    highlights: "DCF valuation models for top 5 IT exporters\nUS/Europe client discretionary spend outlook\nGenerative AI deal monetization timelines",
    pdfUrl: "/sample-reports/it-sector-analysis.pdf",
    pdfName: "it-sector-analysis.pdf",
    visible: true,
  },
  {
    title: "Banking & NBFC Credit Growth Preview",
    category: "Macro",
    date: "20 May 2026",
    pages: 28,
    isLocked: true,
    summary: "A granular study of credit growth trends, asset quality, and Net Interest Margin trajectory across PSU and private lenders.",
    highlights: "Credit-to-deposit ratio risk assessment\nTop 3 private bank top picks\nNBFCS auto-finance recovery trends",
    pdfUrl: "/sample-reports/banking-nbfc-preview.pdf",
    pdfName: "banking-nbfc-preview.pdf",
    visible: true,
  },
  {
    title: "Small-Cap Multi-bagger Ideas 2026",
    category: "Equity",
    date: "12 May 2026",
    pages: 18,
    isLocked: true,
    summary: "Screening high-growth small-cap opportunities with ROCE > 20%, low debt-to-equity, and strong promoter integrity.",
    highlights: "12 screened small-cap stocks with >20% ROE\nPromoter holding increase analysis\nClean balance sheet & order book verification",
    pdfUrl: "/sample-reports/small-cap-ideas-2026.pdf",
    pdfName: "small-cap-ideas-2026.pdf",
    visible: true,
  },
  {
    title: "Macro Economic Blueprint — India 2030",
    category: "Macro",
    date: "05 May 2026",
    pages: 45,
    isLocked: false,
    summary: "Comprehensive forecast of India GDP trajectory, demographic dividend, infrastructure spending, and manufacturing expansion.",
    highlights: "10-Year Indian Government Bond yield forecast\nImpact of US rate cuts on Indian FII inflows\nCommodity price index sensitivity matrix",
    pdfUrl: "/sample-reports/macro-blueprint-india-2030.pdf",
    pdfName: "macro-blueprint-india-2030.pdf",
    visible: true,
  },
];

const CATEGORIES: ("Equity" | "Mutual Funds" | "Deep Dive" | "Macro")[] = [
  "Equity",
  "Mutual Funds",
  "Deep Dive",
  "Macro",
];

const getTodayFormattedDate = () => {
  return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const createBlankReportForm = (): ReportAdminItem => ({
  title: "",
  category: "Equity",
  date: getTodayFormattedDate(),
  pages: 16,
  isLocked: false,
  summary: "",
  highlights: "",
  pdfUrl: "",
  pdfName: "",
  visible: true,
});

export default function SimpleAdminReportsPage() {
  // 1. Header Section Content
  const [tagline, setTagline] = useState("Our Research");
  const [heading, setHeading] = useState("Latest Published Reports");
  const [subheading, setSubheading] = useState(
    "Actionable research across equities, mutual funds, and macro insights."
  );

  // 2. Reports State
  const [reports, setReports] = useState<ReportAdminItem[]>(DEFAULT_REPORTS);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  // Modal State for Adding New Report in Popup
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState<ReportAdminItem>(createBlankReportForm());
  const [isModalUploading, setIsModalUploading] = useState(false);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  // Inline List PDF Upload Target
  const listFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingListIndex, setUploadingListIndex] = useState<number | null>(null);
  const [currentUploadTargetIndex, setCurrentUploadTargetIndex] = useState<number | null>(null);

  // Status States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load from DB
  useEffect(() => {
    async function load() {
      try {
        const [contentRows, cardRows] = await Promise.all([
          getSiteContent("reports"),
          getPageCards("reports", "main"),
        ]);

        contentRows.forEach((r) => {
          if (!r.value) return;
          if (r.section === "main") {
            if (r.key === "tagline") setTagline(r.value);
            if (r.key === "heading") setHeading(r.value);
            if (r.key === "subheading") setSubheading(r.value);
          }
        });

        if (cardRows && cardRows.length > 0) {
          const mapped: ReportAdminItem[] = cardRows.map((dbCard, idx) => {
            const extra = (dbCard.extra_data || {}) as Record<string, unknown>;
            const cat = (dbCard.badge || extra.category || "Equity") as ReportAdminItem["category"];
            const highlightsStr = Array.isArray(extra.highlights)
              ? (extra.highlights as string[]).join("\n")
              : typeof extra.highlights === "string"
              ? extra.highlights
              : "";

            return {
              id: dbCard.id,
              title: dbCard.title || `Report ${idx + 1}`,
              category: cat,
              date: (extra.date as string) || "Recent",
              pages: typeof extra.pages === "number" ? extra.pages : 16,
              isLocked: Boolean(extra.isLocked),
              summary: dbCard.description || dbCard.subtitle || "",
              highlights: highlightsStr,
              pdfUrl: (extra.pdf_url as string) || (dbCard.button_url && dbCard.button_url.endsWith(".pdf") ? dbCard.button_url : ""),
              pdfName: (extra.pdf_name as string) || "",
              visible: dbCard.visible !== false,
            };
          });

          setReports(mapped);
        }
      } catch (err) {
        console.error("Failed to load reports data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const openAddReportModal = () => {
    setModalForm(createBlankReportForm());
    setIsAddModalOpen(true);
  };

  const handleModalPdfUpload = async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please select a valid PDF document (.pdf).");
      return;
    }

    setIsModalUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", modalForm.title || file.name);

      const res = await fetch("/api/pdfs/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Upload failed");
      }

      setModalForm((prev) => ({
        ...prev,
        pdfUrl: data.url,
        pdfName: data.name || file.name,
      }));
    } catch (err) {
      console.error("Modal PDF upload error:", err);
      alert(err instanceof Error ? err.message : "Failed to upload PDF.");
    } finally {
      setIsModalUploading(false);
    }
  };

  const handleSaveModalReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalForm.title.trim()) {
      alert("Please enter a Report Title.");
      return;
    }

    const newReport: ReportAdminItem = {
      ...modalForm,
      title: modalForm.title.trim(),
      summary: modalForm.summary.trim() || "In-depth research report and analysis.",
    };

    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    setIsAddModalOpen(false);

    // Save changes immediately
    await saveAllReports(updatedReports);
  };

  const updateReportInList = (index: number, field: keyof ReportAdminItem, value: unknown) => {
    setReports((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    setSavedSuccess(false);
    setErrorMessage("");
  };

  const handleDeleteReport = (index: number) => {
    const reportToDelete = reports[index];
    if (!reportToDelete) return;

    if (!window.confirm(`Are you sure you want to delete "${reportToDelete.title}"?`)) {
      return;
    }

    if (reportToDelete.id) {
      setDeletedIds((prev) => [...prev, reportToDelete.id!]);
    }

    setReports((prev) => prev.filter((_, i) => i !== index));
    setExpandedIndex(null);
    setSavedSuccess(false);
  };

  const handleListPdfUpload = async (file: File, index: number) => {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please select a valid PDF document (.pdf).");
      return;
    }

    setUploadingListIndex(index);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", reports[index].title);

      const res = await fetch("/api/pdfs/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Upload failed");
      }

      updateReportInList(index, "pdfUrl", data.url);
      updateReportInList(index, "pdfName", data.name);
    } catch (err) {
      console.error("PDF upload error:", err);
      alert(err instanceof Error ? err.message : "Failed to upload PDF.");
    } finally {
      setUploadingListIndex(null);
    }
  };

  const saveAllReports = async (reportsToSave = reports) => {
    setSaving(true);
    setErrorMessage("");
    setSavedSuccess(false);

    const ADMIN_HEADERS = {
      "Content-Type": "application/json",
      "x-admin-token": "alyora-admin-secure-2026",
      Authorization: "Bearer alyora-admin-secure-2026",
    };

    try {
      // 1. Process deletions
      for (const id of deletedIds) {
        await fetch("/api/cards/delete", {
          method: "POST",
          headers: ADMIN_HEADERS,
          body: JSON.stringify({ id, page: "reports" }),
        });
      }
      setDeletedIds([]);

      // 2. Save text content
      const contentItems = [
        { page: "reports", section: "main", key: "tagline", value: tagline },
        { page: "reports", section: "main", key: "heading", value: heading },
        { page: "reports", section: "main", key: "subheading", value: subheading },
      ];

      // 3. Save report cards
      const cardsPayload = reportsToSave.map((r, i) => ({
        id: r.id,
        page: "reports",
        section: "main",
        position: i,
        title: r.title,
        subtitle: r.summary.slice(0, 100),
        description: r.summary,
        badge: r.category,
        button_label: r.isLocked ? "Subscribe" : "Download PDF",
        button_url: r.pdfUrl || "/sample-reports/sample-report.pdf",
        visible: r.visible,
        extra_data: {
          category: r.category,
          date: r.date,
          pages: Number(r.pages) || 10,
          isLocked: Boolean(r.isLocked),
          pdf_url: r.pdfUrl || "/sample-reports/sample-report.pdf",
          pdf_name: r.pdfName || "",
          highlights: r.highlights.split("\n").map((s) => s.trim()).filter(Boolean),
          tagClass:
            r.category === "Mutual Funds"
              ? "bg-[#E8F5EC] text-[#1E7A3A]"
              : r.category === "Deep Dive"
              ? "bg-[#FFF3E0] text-[#854F0B]"
              : r.category === "Macro"
              ? "bg-[#F3E8FF] text-[#6B21A8]"
              : "bg-[#EBF2FA] text-[#185FA5]",
        },
      }));

      const [contentRes, cardsRes] = await Promise.all([
        fetch("/api/content/save", {
          method: "POST",
          headers: ADMIN_HEADERS,
          body: JSON.stringify({ items: contentItems }),
        }),
        fetch("/api/cards/save", {
          method: "POST",
          headers: ADMIN_HEADERS,
          body: JSON.stringify({ cards: cardsPayload }),
        }),
      ]);

      const contentJson = await contentRes.json();
      const cardsJson = await cardsRes.json();

      if (!contentRes.ok || contentJson.error) {
        throw new Error(contentJson.error || "Failed to save header text.");
      }
      if (!cardsRes.ok || cardsJson.error) {
        throw new Error(cardsJson.error || "Failed to save reports.");
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 5000);

      // Reload fresh cards from DB
      try {
        const freshCards = await getPageCards("reports", "main");
        if (freshCards && freshCards.length > 0) {
          const mapped: ReportAdminItem[] = freshCards.map((dbCard, idx) => {
            const extra = (dbCard.extra_data || {}) as Record<string, unknown>;
            const cat = (dbCard.badge || extra.category || "Equity") as ReportAdminItem["category"];
            const highlightsStr = Array.isArray(extra.highlights)
              ? (extra.highlights as string[]).join("\n")
              : typeof extra.highlights === "string"
              ? extra.highlights
              : "";

            return {
              id: dbCard.id,
              title: dbCard.title || `Report ${idx + 1}`,
              category: cat,
              date: (extra.date as string) || "Recent",
              pages: typeof extra.pages === "number" ? extra.pages : 16,
              isLocked: Boolean(extra.isLocked),
              summary: dbCard.description || dbCard.subtitle || "",
              highlights: highlightsStr,
              pdfUrl: (extra.pdf_url as string) || (dbCard.button_url && dbCard.button_url.endsWith(".pdf") ? dbCard.button_url : ""),
              pdfName: (extra.pdf_name as string) || "",
              visible: dbCard.visible !== false,
            };
          });
          setReports(mapped);
        }
      } catch {
        // Non-critical
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("alyora_page_data_updated"));
      }
    } catch (err) {
      console.error("Save error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Error saving reports. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-[#1E7A3A] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-500">Loading research reports catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 font-sans">
      {/* Hidden File Input for List PDF Upload */}
      <input
        ref={listFileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && currentUploadTargetIndex !== null) {
            handleListPdfUpload(file, currentUploadTargetIndex);
          }
          if (listFileInputRef.current) listFileInputRef.current.value = "";
        }}
      />

      {/* Header Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#1E7A3A]" />
            Manage Research Reports &amp; PDFs
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Click <strong>"+ Add New Report"</strong> to upload a PDF in a popup window. Changes publish to live site immediately.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/reports"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-gray-500" />
            <span>View Live Reports</span>
          </Link>

          <button
            type="button"
            onClick={openAddReportModal}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#1E7A3A]" />
            <span>+ Add New Report</span>
          </button>

          <button
            type="button"
            onClick={() => saveAllReports(reports)}
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
              href="/reports"
              target="_blank"
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1"
            >
              Open Live Reports Page <ExternalLink className="w-3 h-3" />
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

      {/* Section 1: Header Text Settings */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-gray-900">1. Section Header Texts</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Badge Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => {
                setTagline(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Our Research"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold text-[#1E7A3A]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Main Section Headline
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => {
                setHeading(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Latest Published Reports"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Section Subtitle
            </label>
            <input
              type="text"
              value={subheading}
              onChange={(e) => {
                setSubheading(e.target.value);
                setSavedSuccess(false);
              }}
              placeholder="Actionable research across equities, mutual funds, and macro insights."
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Published Reports List */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">2. Published Reports ({reports.length})</h2>
              <p className="text-[11px] text-gray-500">Click "+ Add New Report" to upload a report via popup modal.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={openAddReportModal}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg bg-[#1E7A3A] text-white hover:bg-[#18632e] transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add New Report</span>
          </button>
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {reports.map((report, index) => {
            const isExpanded = expandedIndex === index;
            const isUploadingThis = uploadingListIndex === index;

            return (
              <div
                key={report.id ? `admin-rep-${report.id}-${index}` : `admin-rep-${index}`}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 shadow-2xs"

                style={{
                  borderLeftWidth: "4px",
                  borderLeftColor:
                    report.category === "Mutual Funds"
                      ? "#1E7A3A"
                      : report.category === "Deep Dive"
                      ? "#C8963E"
                      : report.category === "Macro"
                      ? "#6B21A8"
                      : "#185FA5",
                }}
              >
                {/* Accordion Row Header */}
                <div
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="p-4 bg-gray-50 hover:bg-gray-100/70 transition-colors flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1 pr-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 flex items-center justify-center flex-shrink-0 shadow-xs">
                      {index + 1}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                          {report.title}
                        </h3>

                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            report.category === "Mutual Funds"
                              ? "bg-emerald-100 text-emerald-800"
                              : report.category === "Deep Dive"
                              ? "bg-amber-100 text-amber-800"
                              : report.category === "Macro"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {report.category}
                        </span>

                        <span className="text-[10px] font-mono text-gray-400">
                          {report.pages}P
                        </span>

                        {report.isLocked ? (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                            <Lock className="w-2.5 h-2.5" />
                            Subscriber Only
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
                            <Download className="w-2.5 h-2.5" />
                            Free PDF
                          </span>
                        )}

                        {!report.visible && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                            Hidden
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-gray-500 truncate mt-0.5 flex items-center gap-2">
                        <span>Published: {report.date}</span>
                        {report.pdfUrl ? (
                          <span className="text-emerald-700 font-mono flex items-center gap-0.5">
                            ✓ PDF Attached
                          </span>
                        ) : (
                          <span className="text-amber-600 font-mono">
                            ⚠ PDF Missing
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteReport(index);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete this report"
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

                {/* Expanded Item Form */}
                {isExpanded && (
                  <div className="p-5 bg-white space-y-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      {/* Report Title */}
                      <div className="sm:col-span-8">
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Report Title *
                        </label>
                        <input
                          type="text"
                          value={report.title}
                          onChange={(e) => updateReportInList(index, "title", e.target.value)}
                          placeholder="e.g. Nifty 50 Technical Outlook — June 2026"
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold"
                        />
                      </div>

                      {/* Category */}
                      <div className="sm:col-span-4">
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          value={report.category}
                          onChange={(e) =>
                            updateReportInList(
                              index,
                              "category",
                              e.target.value as ReportAdminItem["category"]
                            )
                          }
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Date */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Publication Date
                        </label>
                        <input
                          type="text"
                          value={report.date}
                          onChange={(e) => updateReportInList(index, "date", e.target.value)}
                          placeholder="e.g. 04 Jun 2026"
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                        />
                      </div>

                      {/* Pages */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Number of Pages
                        </label>
                        <input
                          type="number"
                          value={report.pages}
                          onChange={(e) => updateReportInList(index, "pages", Number(e.target.value))}
                          placeholder="14"
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-mono"
                        />
                      </div>

                      {/* Access Lock */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Access Control
                        </label>
                        <button
                          type="button"
                          onClick={() => updateReportInList(index, "isLocked", !report.isLocked)}
                          className={`w-full px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                            report.isLocked
                              ? "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100"
                              : "bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100"
                          }`}
                        >
                          {report.isLocked ? (
                            <>
                              <Lock className="w-3.5 h-3.5 text-amber-700" />
                              <span>Subscriber Only</span>
                            </>
                          ) : (
                            <>
                              <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Free PDF Download</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* PDF Attachment Box */}
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                          <File className="w-3.5 h-3.5 text-[#1E7A3A]" />
                          <span>PDF Document Attachment</span>
                        </label>

                        {report.pdfUrl && (
                          <a
                            href={report.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#1E7A3A] font-semibold hover:underline flex items-center gap-1"
                          >
                            <span>Open Attached PDF</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentUploadTargetIndex(index);
                            listFileInputRef.current?.click();
                          }}
                          disabled={isUploadingThis}
                          className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 text-xs font-bold rounded-lg shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50 flex-shrink-0"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#1E7A3A]" />
                          <span>
                            {isUploadingThis ? "Uploading PDF..." : "Upload New PDF File"}
                          </span>
                        </button>

                        <div className="flex-1 w-full">
                          <input
                            type="text"
                            value={report.pdfUrl}
                            onChange={(e) => updateReportInList(index, "pdfUrl", e.target.value)}
                            placeholder="Or paste /sample-reports/your-report.pdf"
                            className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Summary Description */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Summary Description (Shown on report card)
                      </label>
                      <textarea
                        rows={2}
                        value={report.summary}
                        onChange={(e) => updateReportInList(index, "summary", e.target.value)}
                        placeholder="Comprehensive chart pattern analysis, support/resistance levels..."
                        className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
                      />
                    </div>

                    {/* Key Highlights */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-gray-700">
                          Key Analytical Highlights (1 bullet per line)
                        </label>
                        <span className="text-[10px] text-gray-400">1 bullet per line</span>
                      </div>
                      <textarea
                        rows={3}
                        value={report.highlights}
                        onChange={(e) => updateReportInList(index, "highlights", e.target.value)}
                        placeholder="Key support zone established at 23,200 level&#10;Bullish continuation pattern on Weekly timeframe"
                        className="w-full px-3 py-2 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
                      />
                    </div>

                    {/* Visibility & Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                        <input
                          type="checkbox"
                          checked={report.visible}
                          onChange={(e) => updateReportInList(index, "visible", e.target.checked)}
                          className="w-4 h-4 rounded text-[#1E7A3A] focus:ring-[#1E7A3A] accent-[#1E7A3A]"
                        />
                        <span>Show this report on the website</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => handleDeleteReport(index)}
                        className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Report</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Save Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-md flex items-center justify-between gap-4 sticky bottom-4 z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openAddReportModal}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#1E7A3A]" />
            <span>+ Add New Report</span>
          </button>
          <span className="text-xs text-gray-500 hidden sm:inline">
            Click Save Changes to publish all PDF &amp; report updates.
          </span>
        </div>

        <button
          type="button"
          onClick={() => saveAllReports(reports)}
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

      {/* ======================================================== */}
      {/* POPUP MODAL DIALOG: ADD NEW REPORT FORM */}
      {/* ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          {/* Modal Hidden File Input */}
          <input
            ref={modalFileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleModalPdfUpload(file);
              if (modalFileInputRef.current) modalFileInputRef.current.value = "";
            }}
          />

          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-title text-xl font-bold text-[#0D1F3C]">
                    Add New Research Report
                  </h3>
                  <p className="text-xs text-gray-500">
                    Fill in the report details and attach a PDF document.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveModalReport} className="space-y-4">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Report Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nifty 50 Technical Outlook — June 2026"
                    value={modalForm.title}
                    onChange={(e) =>
                      setModalForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-semibold"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={modalForm.category}
                    onChange={(e) =>
                      setModalForm((prev) => ({
                        ...prev,
                        category: e.target.value as ReportAdminItem["category"],
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Publication Date, Pages, Lock Access */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Publication Date
                  </label>
                  <input
                    type="text"
                    value={modalForm.date}
                    onChange={(e) =>
                      setModalForm((prev) => ({ ...prev, date: e.target.value }))
                    }
                    placeholder="e.g. 21 Sep 2026"
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Number of Pages
                  </label>
                  <input
                    type="number"
                    value={modalForm.pages}
                    onChange={(e) =>
                      setModalForm((prev) => ({
                        ...prev,
                        pages: Number(e.target.value) || 10,
                      }))
                    }
                    placeholder="16"
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Access Control
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setModalForm((prev) => ({ ...prev, isLocked: !prev.isLocked }))
                    }
                    className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                      modalForm.isLocked
                        ? "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100"
                        : "bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100"
                    }`}
                  >
                    {modalForm.isLocked ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-amber-700" />
                        <span>Subscriber Only</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Free PDF Download</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* PDF Document Upload Area */}
              <div className="p-4 bg-emerald-50/40 border border-emerald-200 rounded-2xl space-y-2">
                <label className="text-xs font-bold text-gray-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <File className="w-4 h-4 text-[#1E7A3A]" />
                    <span>Upload PDF File</span>
                  </span>
                  {modalForm.pdfUrl && (
                    <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> PDF Attached!
                    </span>
                  )}
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => modalFileInputRef.current?.click()}
                    disabled={isModalUploading}
                    className="w-full sm:w-auto px-4 py-2.5 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-900 text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4 text-[#1E7A3A]" />
                    <span>
                      {isModalUploading ? "Uploading PDF..." : "Choose & Upload PDF File"}
                    </span>
                  </button>

                  <input
                    type="text"
                    value={modalForm.pdfUrl}
                    onChange={(e) =>
                      setModalForm((prev) => ({ ...prev, pdfUrl: e.target.value }))
                    }
                    placeholder="Or paste /sample-reports/your-file.pdf"
                    className="w-full text-xs px-3 py-2 bg-white border border-gray-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
                  />
                </div>
              </div>

              {/* Summary Description */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Summary Description (Shown on report card)
                </label>
                <textarea
                  rows={2}
                  value={modalForm.summary}
                  onChange={(e) =>
                    setModalForm((prev) => ({ ...prev, summary: e.target.value }))
                  }
                  placeholder="e.g. In-depth analysis of market sector trends and portfolio recommendations..."
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
                />
              </div>

              {/* Key Analytical Highlights */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-gray-800">
                    Key Highlights (Shown in modal preview window, 1 per line)
                  </label>
                  <span className="text-[10px] text-gray-400">1 bullet point per line</span>
                </div>
                <textarea
                  rows={3}
                  value={modalForm.highlights}
                  onChange={(e) =>
                    setModalForm((prev) => ({ ...prev, highlights: e.target.value }))
                  }
                  placeholder="Key support zone established at 23,200 level&#10;Bullish continuation pattern on Weekly timeframe"
                  className="w-full px-3.5 py-2 text-xs font-mono bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
                />
              </div>

              {/* Visibility Checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-800">
                  <input
                    type="checkbox"
                    checked={modalForm.visible}
                    onChange={(e) =>
                      setModalForm((prev) => ({ ...prev, visible: e.target.checked }))
                    }
                    className="w-4 h-4 rounded text-[#1E7A3A] focus:ring-[#1E7A3A] accent-[#1E7A3A]"
                  />
                  <span>Show this report on the public website</span>
                </label>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || isModalUploading}
                  className="px-6 py-2.5 rounded-xl bg-[#1E7A3A] hover:bg-[#18632e] text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add &amp; Publish Report</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
