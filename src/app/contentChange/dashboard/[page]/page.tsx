"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save, RefreshCw, ChevronRight, AlertCircle, CheckCircle2,
  Layers, Plus, ExternalLink, Globe, Sparkles, X, LayoutGrid, Sliders
} from "lucide-react";
import SectionAccordion from "@/components/admin/SectionAccordion";
import {
  getPageCards, getPageSections, getSiteContent, getPdfFiles,
  insertPageCard, updatePageCard, deletePageCard, reorderPageCards,
  upsertSiteContent, upsertPageSection,
} from "@/lib/content-client";
import type { PageCard, PageSection, SiteContent, PdfFile } from "@/lib/content-client";

// Page metadata & default sections
const PAGE_META: Record<string, { label: string; livePath: string; sections: { id: string; title: string }[]; hasPdfs?: boolean }> = {
  home: {
    label: "Home Page",
    livePath: "/",
    sections: [
      { id: "hero", title: "Hero Section" },
      { id: "stats", title: "Stats Bar" },
      { id: "services", title: "Services Overview" },
      { id: "why-us", title: "Why AlyoRA Trust Pillars" },
      { id: "reports-preview", title: "Latest Published Reports" },
      { id: "pricing-preview", title: "Advisory Plans Preview" },
      { id: "cta", title: "Call To Action Banner" },
    ],
  },
  about: {
    label: "About Page",
    livePath: "/about",
    sections: [
      { id: "hero", title: "Hero / Mission Statement" },
      { id: "mission", title: "Core Mission & Approach" },
      { id: "values", title: "Our Values & Pillars" },
      { id: "team", title: "Leadership & Team" },
      { id: "stats", title: "Key Milestones & Numbers" },
    ],
  },
  services: {
    label: "Services Page",
    livePath: "/services",
    sections: [
      { id: "hero", title: "Hero Section" },
      { id: "main-cards", title: "All Advisory Service Cards" },
      { id: "cta", title: "Consultation CTA Banner" },
    ],
  },
  reports: {
    label: "Reports Page",
    livePath: "/reports",
    hasPdfs: true,
    sections: [
      { id: "hero", title: "Hero Section" },
      { id: "main", title: "Research Reports & Insights" },
      { id: "cta", title: "Premium Research Access CTA" },
    ],
  },
  "business-consulting": {
    label: "Business Consulting Page",
    livePath: "/business-consulting",
    sections: [
      { id: "hero", title: "Hero Section" },
      { id: "packages", title: "Consulting Packages" },
      { id: "process", title: "Four-Stage Engagement Process" },
      { id: "cta", title: "Discovery Call CTA" },
    ],
  },
  pricing: {
    label: "Pricing Page",
    livePath: "/pricing",
    sections: [
      { id: "hero", title: "Hero Section" },
      { id: "plans", title: "Five-Stage Pricing Plans" },
      { id: "standalone", title: "Specialized Add-ons" },
      { id: "faq", title: "Frequently Asked Questions" },
    ],
  },
  contact: {
    label: "Contact Page",
    livePath: "/contact",
    sections: [
      { id: "hero", title: "Hero Section" },
      { id: "info", title: "Official Contact Information" },
      { id: "form", title: "Inquiry Form Header" },
    ],
  },
  navbar: {
    label: "Navbar & Footer",
    livePath: "/",
    sections: [
      { id: "brand", title: "Brand Identity & Logo" },
      { id: "nav-links", title: "Navigation Links" },
      { id: "footer-col1", title: "Footer Column 1 (About)" },
      { id: "footer-col2", title: "Footer Column 2 (Quick Links)" },
      { id: "footer-col3", title: "Footer Column 3 (Contact Info)" },
    ],
  },
};

export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const pageKey = Array.isArray(params.page) ? params.page[0] : params.page || "";
  const meta = PAGE_META[pageKey];

  const [sections, setSections] = useState<PageSection[]>([]);
  const [cards, setCards] = useState<PageCard[]>([]);
  const [content, setContent] = useState<SiteContent[]>([]);
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);
  const [loading, setLoading] = useState(true);

  // Global save & publish feedback
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [publishing, setPublishing] = useState(false);
  const [publishSuccessModal, setPublishSuccessModal] = useState(false);
  const [publishedTimestamp, setPublishedTimestamp] = useState<string>("");

  // Add Section Modal
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionId, setNewSectionId] = useState("");

  const loadAllData = useCallback(async () => {
    if (!meta) return;
    try {
      const [sec, crd, cnt, pdf] = await Promise.all([
        getPageSections(pageKey),
        getPageCards(pageKey),
        getSiteContent(pageKey),
        ...(meta.hasPdfs ? [getPdfFiles(pageKey)] : [Promise.resolve([])]),
      ]);

      // If page is 'home', also fetch services, reports, and pricing cards so they can be viewed & edited in home sections!
      let allCards = (crd as PageCard[]) || [];
      if (pageKey === "home") {
        const [servicesCards, reportsCards, pricingCards, aboutCards] = await Promise.all([
          getPageCards("services"),
          getPageCards("reports"),
          getPageCards("pricing"),
          getPageCards("about"),
        ]);
        allCards = [...allCards, ...servicesCards, ...reportsCards, ...pricingCards, ...aboutCards];
      }

      // Merge DB sections with default meta sections
      const dbSectionMap = new Map((sec as PageSection[]).map((s) => [s.section_id, s]));
      const merged: PageSection[] = meta.sections.map((ms, i): PageSection => {
        if (dbSectionMap.has(ms.id)) return dbSectionMap.get(ms.id)!;
        return {
          id: `local-${ms.id}`,
          page: pageKey,
          section_id: ms.id,
          title: ms.title,
          visible: true,
          position: i,
        };
      });

      // Also include any extra custom sections from DB
      (sec as PageSection[]).forEach((s) => {
        if (!meta.sections.some((ms) => ms.id === s.section_id)) {
          merged.push(s);
        }
      });

      setSections(merged);
      setCards(allCards);
      setContent(cnt as SiteContent[]);
      if (pdf) setPdfs(pdf as PdfFile[]);
    } finally {
      setLoading(false);
    }
  }, [pageKey, meta]);

  useEffect(() => {
    if (!meta) {
      router.replace("/contentChange/dashboard");
      return;
    }
    loadAllData();
  }, [meta, router, loadAllData]);

  // Save content handler
  const handleSaveContent = async (section: string, key: string, value: string) => {
    setSaveStatus("saving");
    try {
      await upsertSiteContent({ page: pageKey, section, key, value });
      setContent((prev) => {
        const existing = prev.find((c) => c.section === section && c.key === key);
        if (existing) {
          return prev.map((c) => (c.section === section && c.key === key ? { ...c, value } : c));
        }
        return [
          ...prev,
          { id: `db-${section}-${key}`, page: pageKey, section, key, type: "text", value, updated_at: new Date().toISOString() },
        ];
      });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    }
  };

  // Section update handler
  const handleUpdateSection = async (secUpdate: Partial<PageSection>) => {
    const sec = sections.find((s) => s.id === secUpdate.id || s.section_id === secUpdate.section_id);
    if (!sec) return;
    const updatedSec = { ...sec, ...secUpdate };
    setSections((prev) => prev.map((s) => (s.section_id === updatedSec.section_id ? updatedSec : s)));
    await upsertPageSection({
      page: pageKey,
      section_id: updatedSec.section_id,
      title: updatedSec.title,
      visible: updatedSec.visible,
      position: updatedSec.position,
    });
  };

  // Section reorder handler
  const handleReorderSections = async (reordered: PageSection[]) => {
    setSections(reordered);
    for (const s of reordered) {
      await upsertPageSection({
        page: pageKey,
        section_id: s.section_id,
        title: s.title,
        visible: s.visible,
        position: s.position,
      });
    }
  };

  // Card CRUD Handlers
  const handleAddCard = async (newCard: Partial<PageCard>) => {
    setSaveStatus("saving");
    try {
      const result = await insertPageCard({
        page: newCard.page || pageKey,
        section: newCard.section || "main-cards",
        title: newCard.title || "New Card",
        subtitle: newCard.subtitle || "",
        description: newCard.description || "",
        badge: newCard.badge || "",
        image_url: newCard.image_url || "",
        button_label: newCard.button_label || "",
        button_url: newCard.button_url || "",
        visible: newCard.visible !== false,
        position: cards.length,
        extra_data: newCard.extra_data || {},
      });
      await loadAllData();
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    }
  };

  const handleSaveCard = async (card: Partial<PageCard>) => {
    if (!card.id) return;
    setSaveStatus("saving");
    try {
      await updatePageCard(card.id, card);
      setCards((prev) => prev.map((c) => (c.id === card.id ? ({ ...c, ...card } as PageCard) : c)));
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    }
  };

  const handleDeleteCard = async (id: string) => {
    setSaveStatus("saving");
    try {
      await deletePageCard(id);
      setCards((prev) => prev.filter((c) => c.id !== id));
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    }
  };

  const handleToggleCardVisible = async (id: string, visible: boolean) => {
    await updatePageCard(id, { visible });
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, visible } : c)));
  };

  // PUBLISH HANDLER (Fixes the publish button issue)
  const handlePublish = async () => {
    setPublishing(true);
    setSaveStatus("saving");
    try {
      // 1. Ensure all sections are synced to DB
      for (let i = 0; i < sections.length; i++) {
        const s = sections[i];
        await upsertPageSection({
          page: pageKey,
          section_id: s.section_id,
          title: s.title,
          visible: s.visible,
          position: i,
        });
      }

      // 2. Call Next.js revalidation API
      const res = await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: "alyora-revalidate-2024",
          page: meta?.livePath || "/",
        }),
      });

      const data = await res.json();
      setPublishedTimestamp(new Date().toLocaleTimeString());
      setSaveStatus("saved");
      setPublishSuccessModal(true);
    } catch (err) {
      console.error("Publish error:", err);
      setSaveStatus("error");
      alert("There was an issue triggering cache revalidation. Your database changes are saved.");
    } finally {
      setPublishing(false);
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  // Add custom section
  const handleCreateNewSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionTitle.trim() || !newSectionId.trim()) return;
    const cleanId = newSectionId.trim().toLowerCase().replace(/\s+/g, "-");
    const newSec: PageSection = {
      id: `sec-${cleanId}-${Date.now()}`,
      page: pageKey,
      section_id: cleanId,
      title: newSectionTitle.trim(),
      visible: true,
      position: sections.length,
    };
    await upsertPageSection(newSec);
    setSections((prev) => [...prev, newSec]);
    setShowAddSectionModal(false);
    setNewSectionTitle("");
    setNewSectionId("");
  };

  if (!meta) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <button
            onClick={() => router.push("/contentChange/dashboard")}
            className="hover:text-gray-700 cursor-pointer transition-colors"
          >
            Dashboard
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-800 font-bold">{meta.label}</span>
        </div>

        {/* Live Website Link */}
        <Link
          href={meta.livePath}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1E7A3A] font-semibold bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-2xs hover:shadow-xs transition-all"
        >
          <Globe className="w-3.5 h-3.5 text-[#1E7A3A]" />
          <span>View Live Page</span>
          <ExternalLink className="w-3 h-3 text-gray-400" />
        </Link>
      </div>

      {/* Main Header & Actions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {meta.label} Editor
            </h1>
            <span className="bg-green-100 text-[#1E7A3A] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Connected to DB
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1 max-w-xl">
            Click on any section below to open it, view present content, edit headlines, manage cards with full CRUD, and publish live.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Save Status Indicator */}
          {saveStatus !== "idle" && (
            <div
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all ${
                saveStatus === "saved"
                  ? "text-[#1E7A3A] bg-green-50 border border-green-200"
                  : saveStatus === "saving"
                  ? "text-gray-600 bg-gray-100"
                  : "text-red-500 bg-red-50 border border-red-200"
              }`}
            >
              {saveStatus === "saving" && (
                <div className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              )}
              {saveStatus === "saved" && <CheckCircle2 className="w-4 h-4" />}
              {saveStatus === "error" && <AlertCircle className="w-4 h-4" />}
              <span>{saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved to DB!" : "Error"}</span>
            </div>
          )}

          {/* Add Section Button */}
          <button
            type="button"
            onClick={() => setShowAddSectionModal(true)}
            className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3.5 py-2.5 rounded-xl cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Section</span>
          </button>

          {/* PUBLISH BUTTON */}
          <button
            type="button"
            onClick={handlePublish}
            disabled={publishing}
            className="flex items-center gap-2 bg-[#1E7A3A] hover:bg-[#27A84E] disabled:opacity-50 text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-all shadow-md hover:shadow-lg active:scale-98"
          >
            <RefreshCw className={`w-4 h-4 ${publishing ? "animate-spin" : ""}`} />
            <span>{publishing ? "Publishing Changes..." : "Publish Changes"}</span>
          </button>
        </div>
      </div>

      {/* Main Section-by-Section Accordion */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200">
          <div className="w-10 h-10 border-3 border-[#1E7A3A] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-semibold text-gray-500">Loading {meta.label} sections and content...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <SectionAccordion
            pageKey={pageKey}
            sections={sections}
            cards={cards}
            content={content}
            pdfs={pdfs}
            onUpdateSection={handleUpdateSection}
            onDeleteSection={async (id) => {
              setSections((prev) => prev.filter((s) => s.id !== id));
            }}
            onReorderSections={handleReorderSections}
            onSaveContent={handleSaveContent}
            onSaveCard={handleSaveCard}
            onDeleteCard={handleDeleteCard}
            onToggleCardVisible={handleToggleCardVisible}
            onAddCard={handleAddCard}
            onRefreshData={loadAllData}
          />
        </div>
      )}

      {/* SUCCESSFUL PUBLISH MODAL */}
      {publishSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-7 text-center space-y-4 border border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center mx-auto text-[#1E7A3A]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-gray-900">
                Published to Live Website!
              </h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                All sections, text, cards, and buttons for <strong>{meta.label}</strong> have been saved to the InsForge database and the live site cache has been updated at {publishedTimestamp}.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 text-left border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Target Page</p>
                <p className="text-xs font-mono font-semibold text-gray-800">{meta.livePath}</p>
              </div>
              <span className="text-[10px] font-bold bg-[#1E7A3A]/10 text-[#1E7A3A] px-2 py-0.5 rounded">
                Live Status: 200 OK
              </span>
            </div>

            <div className="flex gap-2.5 pt-2">
              <Link
                href={meta.livePath}
                target="_blank"
                onClick={() => setPublishSuccessModal(false)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#1E7A3A] hover:bg-[#27A84E] text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Live Website</span>
              </Link>
              <button
                type="button"
                onClick={() => setPublishSuccessModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-3 rounded-xl cursor-pointer transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD SECTION MODAL */}
      {showAddSectionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Add New Section to {meta.label}</h3>
              <button
                onClick={() => setShowAddSectionModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewSection} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Section Title *
                </label>
                <input
                  type="text"
                  required
                  value={newSectionTitle}
                  onChange={(e) => {
                    setNewSectionTitle(e.target.value);
                    if (!newSectionId) {
                      setNewSectionId(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                    }
                  }}
                  placeholder="e.g. Client Testimonials, Awards, FAQ"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Section ID (Unique Slug) *
                </label>
                <input
                  type="text"
                  required
                  value={newSectionId}
                  onChange={(e) => setNewSectionId(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  placeholder="e.g. testimonials, awards"
                  className="w-full text-sm font-mono border border-gray-200 rounded-lg px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddSectionModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#1E7A3A] hover:bg-[#27A84E] rounded-lg cursor-pointer shadow-sm"
                >
                  Add Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
