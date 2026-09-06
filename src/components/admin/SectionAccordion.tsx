"use client";

import React, { useState } from "react";
import {
  ChevronDown, ChevronUp, Eye, EyeOff, GripVertical, Plus, Trash2,
  Edit2, Save, X, Type, CreditCard, MousePointer, Image as ImageIcon,
  FileText, CheckCircle2, AlertCircle, Sparkles, ExternalLink, MoveUp, MoveDown
} from "lucide-react";
import type { PageSection, PageCard, SiteContent, PdfFile } from "@/lib/content-client";
import ImageUploader from "@/components/admin/ImageUploader";
import PdfUploader from "@/components/admin/PdfUploader";
import RichTextEditor from "@/components/admin/RichTextEditor";

interface SectionAccordionProps {
  pageKey: string;
  sections: PageSection[];
  cards: PageCard[];
  content: SiteContent[];
  pdfs: PdfFile[];
  onUpdateSection: (section: Partial<PageSection>) => Promise<void>;
  onDeleteSection: (id: string) => Promise<void>;
  onReorderSections: (sections: PageSection[]) => Promise<void>;
  onSaveContent: (section: string, key: string, value: string) => Promise<void>;
  onSaveCard: (card: Partial<PageCard>) => Promise<void>;
  onDeleteCard: (id: string) => Promise<void>;
  onToggleCardVisible: (id: string, visible: boolean) => Promise<void>;
  onAddCard: (card: Partial<PageCard>) => Promise<void>;
  onRefreshData?: () => Promise<void>;
}

// Common fields to suggest for known section types if not present in DB
const SECTION_SUGGESTED_FIELDS: Record<string, { key: string; label: string; isTextarea?: boolean }[]> = {
  hero: [
    { key: "eyebrow", label: "Eyebrow / Badge" },
    { key: "heading", label: "Main Headline" },
    { key: "tagline", label: "Tagline / Subheadline" },
    { key: "description", label: "Detailed Description", isTextarea: true },
    { key: "cta_primary_label", label: "Primary Button Label" },
    { key: "cta_primary_url", label: "Primary Button URL" },
    { key: "cta_secondary_label", label: "Secondary Button Label" },
    { key: "cta_secondary_url", label: "Secondary Button URL" },
  ],
  stats: [
    { key: "stat1_val", label: "Stat 1 Value (e.g. ₹250Cr+)" },
    { key: "stat1_label", label: "Stat 1 Label (e.g. Client Assets Monitored)" },
    { key: "stat2_val", label: "Stat 2 Value (e.g. 18.4%)" },
    { key: "stat2_label", label: "Stat 2 Label (e.g. Historical 3-Yr CAGR)" },
    { key: "stat3_val", label: "Stat 3 Value (e.g. 3,200+)" },
    { key: "stat3_label", label: "Stat 3 Label (e.g. Active Investors)" },
    { key: "stat4_val", label: "Stat 4 Value (e.g. 98.2%)" },
    { key: "stat4_label", label: "Stat 4 Label (e.g. Client Retention Rate)" },
  ],
  services: [
    { key: "heading", label: "Section Title" },
    { key: "subheading", label: "Subtitle / Tagline" },
    { key: "description", label: "Intro Description", isTextarea: true },
  ],
  "why-us": [
    { key: "heading", label: "Section Title" },
    { key: "subheading", label: "Subtitle / Tagline" },
    { key: "description", label: "Intro Description", isTextarea: true },
  ],
  "reports-preview": [
    { key: "heading", label: "Section Title" },
    { key: "subheading", label: "Subtitle / Tagline" },
    { key: "description", label: "Intro Description", isTextarea: true },
  ],
  "pricing-preview": [
    { key: "heading", label: "Section Title" },
    { key: "subheading", label: "Subtitle / Tagline" },
    { key: "description", label: "Intro Description", isTextarea: true },
  ],
  cta: [
    { key: "heading", label: "CTA Headline" },
    { key: "subheading", label: "CTA Subtitle / Offer" },
    { key: "button_label", label: "Button Label" },
    { key: "button_url", label: "Button URL" },
  ],
  "main-cards": [
    { key: "heading", label: "Section Title" },
    { key: "subheading", label: "Subtitle / Tagline" },
    { key: "description", label: "Intro Description", isTextarea: true },
  ],
  plans: [
    { key: "heading", label: "Section Title" },
    { key: "subheading", label: "Subtitle / Tagline" },
  ],
  packages: [
    { key: "heading", label: "Section Title" },
    { key: "subheading", label: "Subtitle / Tagline" },
    { key: "description", label: "Intro Description", isTextarea: true },
  ],
  values: [
    { key: "heading", label: "Section Title" },
    { key: "subheading", label: "Subtitle / Tagline" },
  ],
  info: [
    { key: "email", label: "Contact Email" },
    { key: "phone", label: "Contact Phone" },
    { key: "address", label: "Office Address" },
    { key: "hours", label: "Business Hours" },
  ],
};

export default function SectionAccordion({
  pageKey,
  sections,
  cards,
  content,
  pdfs,
  onUpdateSection,
  onDeleteSection,
  onReorderSections,
  onSaveContent,
  onSaveCard,
  onDeleteCard,
  onToggleCardVisible,
  onAddCard,
}: SectionAccordionProps) {
  // Track which sections are open (default first section open)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    [sections[0]?.section_id || "hero"]: true,
  });

  // Local draft states for text content
  const [contentDrafts, setContentDrafts] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<Record<string, "saved" | "saving" | "error">>({});

  // Active section tab: "content" | "cards" | "buttons" | "images" | "pdfs"
  const [activeSubTabs, setActiveSubTabs] = useState<Record<string, string>>({});

  // Card modal state for Add/Edit
  const [editingCard, setEditingCard] = useState<Partial<PageCard> | null>(null);
  const [isNewCard, setIsNewCard] = useState(false);
  const [targetSectionForCard, setTargetSectionForCard] = useState<string>("");

  // Custom field adder
  const [addingFieldFor, setAddingFieldFor] = useState<string | null>(null);
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    sections.forEach((s) => { all[s.section_id] = true; });
    setOpenSections(all);
  };

  const collapseAll = () => {
    setOpenSections({});
  };

  const moveSection = async (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === sections.length - 1)) {
      return;
    }
    const newIdx = direction === "up" ? index - 1 : index + 1;
    const reordered = [...sections];
    const temp = reordered[index];
    reordered[index] = reordered[newIdx];
    reordered[newIdx] = temp;
    const updated = reordered.map((s, i) => ({ ...s, position: i }));
    await onReorderSections(updated);
  };

  // Helper to read content value from drafts or current content
  const getValue = (sectionId: string, key: string): string => {
    const draftKey = `${sectionId}::${key}`;
    if (contentDrafts[draftKey] !== undefined) {
      return contentDrafts[draftKey];
    }
    const found = content.find((c) => c.section === sectionId && c.key === key);
    return found?.value || "";
  };

  const handleChange = (sectionId: string, key: string, value: string) => {
    const draftKey = `${sectionId}::${key}`;
    setContentDrafts((prev) => ({ ...prev, [draftKey]: value }));
  };

  const handleSaveField = async (sectionId: string, key: string) => {
    const draftKey = `${sectionId}::${key}`;
    const val = getValue(sectionId, key);
    setSaveStatus((prev) => ({ ...prev, [draftKey]: "saving" }));
    try {
      await onSaveContent(sectionId, key, val);
      setSaveStatus((prev) => ({ ...prev, [draftKey]: "saved" }));
      setTimeout(() => {
        setSaveStatus((prev) => {
          const next = { ...prev };
          delete next[draftKey];
          return next;
        });
      }, 2000);
    } catch {
      setSaveStatus((prev) => ({ ...prev, [draftKey]: "error" }));
    }
  };

  const handleSaveAllFieldsForSection = async (sectionId: string, fieldKeys: string[]) => {
    setSaveStatus((prev) => ({ ...prev, [sectionId]: "saving" }));
    try {
      for (const k of fieldKeys) {
        const val = getValue(sectionId, k);
        if (val !== undefined) {
          await onSaveContent(sectionId, k, val);
        }
      }
      setSaveStatus((prev) => ({ ...prev, [sectionId]: "saved" }));
      setTimeout(() => {
        setSaveStatus((prev) => {
          const next = { ...prev };
          delete next[sectionId];
          return next;
        });
      }, 2000);
    } catch {
      setSaveStatus((prev) => ({ ...prev, [sectionId]: "error" }));
    }
  };

  // Find cards matching a section
  const getCardsForSection = (sectionId: string): PageCard[] => {
    return cards.filter((c) => {
      if (c.section === sectionId) return true;
      // Cross mappings for convenience
      if (sectionId === "services" && (c.section === "main-cards" || c.section === "services")) return true;
      if (sectionId === "reports-preview" && (c.section === "main" || c.section === "reports-preview")) return true;
      if (sectionId === "pricing-preview" && (c.section === "plans" || c.section === "pricing-preview")) return true;
      if (sectionId === "why-us" && (c.section === "values" || c.section === "why-us")) return true;
      return false;
    });
  };

  // Open modal to add card
  const handleOpenAddCard = (sectionId: string) => {
    const targetSec = sectionId === "services" ? "main-cards" :
                      sectionId === "reports-preview" ? "main" :
                      sectionId === "pricing-preview" ? "plans" :
                      sectionId === "why-us" ? "values" : sectionId;
    setEditingCard({
      page: pageKey,
      section: targetSec,
      title: "",
      subtitle: "",
      description: "",
      badge: "",
      image_url: "",
      button_label: "",
      button_url: "",
      visible: true,
      position: cards.length,
      extra_data: {},
    });
    setIsNewCard(true);
    setTargetSectionForCard(targetSec);
  };

  const handleOpenEditCard = (card: PageCard) => {
    setEditingCard({ ...card });
    setIsNewCard(false);
    setTargetSectionForCard(card.section);
  };

  const handleSaveCardModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;

    if (isNewCard) {
      await onAddCard(editingCard);
    } else {
      await onSaveCard(editingCard);
    }
    setEditingCard(null);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Page Sections ({sections.length})
          </span>
          <span className="text-xs text-gray-400">· Click any section below to open & edit content</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-xs text-gray-600 hover:text-[#1E7A3A] font-semibold px-2.5 py-1 rounded hover:bg-gray-100 cursor-pointer transition-colors"
          >
            Expand All
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={collapseAll}
            className="text-xs text-gray-600 hover:text-[#1E7A3A] font-semibold px-2.5 py-1 rounded hover:bg-gray-100 cursor-pointer transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-3">
        {sections.map((section, index) => {
          const isOpen = !!openSections[section.section_id];
          const sectionCards = getCardsForSection(section.section_id);

          // Get existing content keys for this section
          const existingContent = content.filter((c) => c.section === section.section_id);
          const existingKeys = new Set(existingContent.map((c) => c.key));

          // Combine existing keys with suggested keys
          const suggested = SECTION_SUGGESTED_FIELDS[section.section_id] || [
            { key: "heading", label: "Headline / Title" },
            { key: "subheading", label: "Subtitle" },
            { key: "description", label: "Description", isTextarea: true },
          ];

          // Final list of fields to display
          const displayFields: { key: string; label: string; isTextarea?: boolean }[] = [];
          const addedKeys = new Set<string>();

          // Add suggested first
          suggested.forEach((s) => {
            displayFields.push(s);
            addedKeys.add(s.key);
          });

          // Add any custom existing fields not in suggested
          existingContent.forEach((c) => {
            if (!addedKeys.has(c.key)) {
              displayFields.push({
                key: c.key,
                label: c.key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
                isTextarea: (c.value && c.value.length > 80) || c.key.includes("desc"),
              });
              addedKeys.add(c.key);
            }
          });

          const activeTab = activeSubTabs[section.section_id] || "content";
          const isStats = section.section_id === "stats";
          const isHero = section.section_id === "hero";
          const isReports = section.section_id === "reports-preview" || section.section_id === "main" || pageKey === "reports";

          return (
            <div
              key={section.id || section.section_id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? "bg-white border-[#1E7A3A]/40 shadow-md ring-1 ring-[#1E7A3A]/20"
                  : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
              }`}
            >
              {/* Section Header Accordion Row */}
              <div
                onClick={() => toggleSection(section.section_id)}
                className={`flex items-center gap-3 px-5 py-4 cursor-pointer select-none transition-colors ${
                  isOpen ? "bg-gray-50/80 border-b border-gray-100" : "hover:bg-gray-50"
                }`}
              >
                {/* Reorder Up/Down */}
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    disabled={index === 0}
                    onClick={() => moveSection(index, "up")}
                    className="p-1 text-gray-300 hover:text-gray-600 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed rounded"
                    title="Move section up"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={index === sections.length - 1}
                    onClick={() => moveSection(index, "down")}
                    className="p-1 text-gray-300 hover:text-gray-600 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed rounded"
                    title="Move section down"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Section Title & Key Badge */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                      {section.title}
                    </h3>
                    <span className="font-mono text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                      {section.section_id}
                    </span>
                    {section.visible ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1E7A3A] bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A3A] animate-pulse" />
                        Visible
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        Hidden
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                    <span>{displayFields.length} text fields</span>
                    <span>·</span>
                    <span>{sectionCards.length} cards / items</span>
                  </div>
                </div>

                {/* Visibility Toggle & Chevron */}
                <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onUpdateSection({ id: section.id, visible: !section.visible })}
                    className={`p-2 rounded-lg cursor-pointer transition-colors ${
                      section.visible
                        ? "text-[#1E7A3A] hover:bg-green-50"
                        : "text-gray-400 hover:bg-gray-100"
                    }`}
                    title={section.visible ? "Hide section from website" : "Show section on website"}
                  >
                    {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 transition-transform">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#1E7A3A]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Opened Section Content Panel */}
              {isOpen && (
                <div className="p-5 sm:p-6 space-y-6">
                  {/* Sub-tabs Navigation for this section */}
                  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit max-w-full overflow-x-auto">
                    <button
                      onClick={() => setActiveSubTabs((p) => ({ ...p, [section.section_id]: "content" }))}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        activeTab === "content"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      <Type className="w-3.5 h-3.5" />
                      <span>Text & Headings</span>
                      <span className="text-[10px] bg-gray-200/80 px-1.5 py-0.2 rounded-full ml-0.5">
                        {displayFields.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveSubTabs((p) => ({ ...p, [section.section_id]: "cards" }))}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        activeTab === "cards"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Cards & Items</span>
                      <span className="text-[10px] bg-gray-200/80 px-1.5 py-0.2 rounded-full ml-0.5">
                        {sectionCards.length}
                      </span>
                    </button>

                    {isHero && (
                      <button
                        onClick={() => setActiveSubTabs((p) => ({ ...p, [section.section_id]: "buttons" }))}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                          activeTab === "buttons"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        <MousePointer className="w-3.5 h-3.5" />
                        <span>Buttons & CTAs</span>
                      </button>
                    )}

                    {(isHero || section.section_id === "cta") && (
                      <button
                        onClick={() => setActiveSubTabs((p) => ({ ...p, [section.section_id]: "images" }))}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                          activeTab === "images"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Images</span>
                      </button>
                    )}

                    {isReports && (
                      <button
                        onClick={() => setActiveSubTabs((p) => ({ ...p, [section.section_id]: "pdfs" }))}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                          activeTab === "pdfs"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>PDF Reports</span>
                        <span className="text-[10px] bg-gray-200/80 px-1.5 py-0.2 rounded-full ml-0.5">
                          {pdfs.length}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* SUBTAB 1: TEXT & HEADINGS */}
                  {activeTab === "content" && (
                    <div className="space-y-4 bg-gray-50/50 p-4 sm:p-5 rounded-2xl border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Content Fields for {section.title}
                          </h4>
                          <p className="text-xs text-gray-400">
                            Present database values are pre-filled below. Edit any field and save.
                          </p>
                        </div>
                        <button
                          onClick={() => handleSaveAllFieldsForSection(section.section_id, displayFields.map((f) => f.key))}
                          className="flex items-center gap-1.5 bg-[#1E7A3A] hover:bg-[#27A84E] text-white text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-all shadow-sm"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save All Fields</span>
                          {saveStatus[section.section_id] === "saved" && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {displayFields.map((field) => {
                          const val = getValue(section.section_id, field.key);
                          const fieldStatus = saveStatus[`${section.section_id}::${field.key}`];

                          return (
                            <div
                              key={field.key}
                              className={`bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs space-y-1.5 ${
                                field.isTextarea ? "md:col-span-2" : ""
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-gray-700">
                                  {field.label}
                                </label>
                                <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                                  {field.key}
                                </span>
                              </div>

                              {field.isTextarea ? (
                                <textarea
                                  rows={3}
                                  value={val}
                                  onChange={(e) => handleChange(section.section_id, field.key, e.target.value)}
                                  placeholder={`Enter ${field.label}...`}
                                  className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#1E7A3A] focus:ring-1 focus:ring-[#1E7A3A] transition-all bg-white"
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={val}
                                  onChange={(e) => handleChange(section.section_id, field.key, e.target.value)}
                                  placeholder={`Enter ${field.label}...`}
                                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1E7A3A] focus:ring-1 focus:ring-[#1E7A3A] transition-all bg-white"
                                />
                              )}

                              <div className="flex justify-end pt-1">
                                <button
                                  type="button"
                                  onClick={() => handleSaveField(section.section_id, field.key)}
                                  className="flex items-center gap-1 text-[11px] font-semibold text-[#1E7A3A] hover:text-[#27A84E] cursor-pointer"
                                >
                                  {fieldStatus === "saving" ? (
                                    <span className="text-gray-400">Saving...</span>
                                  ) : fieldStatus === "saved" ? (
                                    <span className="text-green-600 flex items-center gap-1 font-bold">
                                      <CheckCircle2 className="w-3 h-3" /> Saved!
                                    </span>
                                  ) : (
                                    <span>Save field</span>
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Add Custom Field row */}
                      {addingFieldFor === section.section_id ? (
                        <div className="bg-white p-4 rounded-xl border border-[#1E7A3A]/30 space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-gray-800">Add New Field to {section.title}</h5>
                            <button
                              onClick={() => { setAddingFieldFor(null); setNewFieldKey(""); setNewFieldValue(""); }}
                              className="text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={newFieldKey}
                              onChange={(e) => setNewFieldKey(e.target.value.toLowerCase().replace(/\s+/g, "_"))}
                              placeholder="Field Key (e.g. disclaimer, note)"
                              className="text-xs border border-gray-200 rounded-lg px-3 py-2"
                            />
                            <input
                              type="text"
                              value={newFieldValue}
                              onChange={(e) => setNewFieldValue(e.target.value)}
                              placeholder="Field Value"
                              className="text-xs border border-gray-200 rounded-lg px-3 py-2"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={async () => {
                                if (!newFieldKey.trim()) return;
                                await onSaveContent(section.section_id, newFieldKey.trim(), newFieldValue);
                                setAddingFieldFor(null);
                                setNewFieldKey("");
                                setNewFieldValue("");
                              }}
                              className="bg-[#1E7A3A] text-white text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[#27A84E]"
                            >
                              Add Field
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setAddingFieldFor(section.section_id)}
                          className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#1E7A3A] cursor-pointer pt-2"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add custom text field</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* SUBTAB 2: CARDS & ITEMS (CRUD) */}
                  {activeTab === "cards" && (
                    <div className="space-y-4 bg-gray-50/50 p-4 sm:p-5 rounded-2xl border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Cards / Items in {section.title} ({sectionCards.length})
                          </h4>
                          <p className="text-xs text-gray-400">
                            Perform CRUD operations on cards in this section: add new, edit fields, toggle visibility, or delete.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleOpenAddCard(section.section_id)}
                          className="flex items-center gap-1.5 bg-[#1E7A3A] hover:bg-[#27A84E] text-white text-xs font-semibold px-3.5 py-2 rounded-lg cursor-pointer transition-all shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add New Card</span>
                        </button>
                      </div>

                      {sectionCards.length === 0 ? (
                        <div className="text-center py-10 bg-white border border-dashed border-gray-300 rounded-xl space-y-2">
                          <CreditCard className="w-8 h-8 text-gray-300 mx-auto" />
                          <p className="text-sm font-semibold text-gray-600">No cards in this section yet</p>
                          <p className="text-xs text-gray-400 max-w-sm mx-auto">
                            Click &quot;Add New Card&quot; to create the first card for {section.title}.
                          </p>
                          <button
                            type="button"
                            onClick={() => handleOpenAddCard(section.section_id)}
                            className="mt-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-1.5 rounded-lg cursor-pointer"
                          >
                            + Add First Card
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                          {sectionCards.map((card) => (
                            <div
                              key={card.id}
                              className={`bg-white rounded-xl border p-4 flex flex-col justify-between transition-all hover:shadow-md ${
                                card.visible ? "border-gray-200" : "border-gray-100 bg-gray-50/70 opacity-60"
                              }`}
                            >
                              <div className="space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <h5 className="text-sm font-bold text-gray-900 line-clamp-1">
                                    {card.title || "(Untitled Card)"}
                                  </h5>
                                  {card.badge && (
                                    <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded flex-shrink-0">
                                      {card.badge}
                                    </span>
                                  )}
                                </div>

                                {card.subtitle && (
                                  <p className="text-xs text-gray-500 font-medium line-clamp-1">
                                    {card.subtitle}
                                  </p>
                                )}

                                {card.description && (
                                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                                    {card.description}
                                  </p>
                                )}

                                {card.image_url && (
                                  <div className="text-[10px] text-blue-600 flex items-center gap-1 truncate">
                                    <ImageIcon className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">{card.image_url}</span>
                                  </div>
                                )}

                                {card.button_label && (
                                  <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                    <MousePointer className="w-3 h-3 text-gray-400" />
                                    <span>Button: &quot;{card.button_label}&quot;</span>
                                  </div>
                                )}
                              </div>

                              {/* Card Actions (CRUD) */}
                              <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 text-xs">
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => onToggleCardVisible(card.id, !card.visible)}
                                    className={`p-1 rounded cursor-pointer ${
                                      card.visible ? "text-[#1E7A3A] hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"
                                    }`}
                                    title={card.visible ? "Hide card" : "Show card"}
                                  >
                                    {card.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                  </button>
                                  <span className="text-[10px] text-gray-400 font-medium">
                                    {card.visible ? "Visible" : "Hidden"}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditCard(card)}
                                    className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-50 rounded cursor-pointer transition-colors"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      if (confirm(`Are you sure you want to delete card "${card.title}"?`)) {
                                        await onDeleteCard(card.id);
                                      }
                                    }}
                                    className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded cursor-pointer transition-colors"
                                    title="Delete card"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUBTAB 3: BUTTONS & CTAS */}
                  {activeTab === "buttons" && isHero && (
                    <div className="space-y-4 bg-gray-50/50 p-4 sm:p-5 rounded-2xl border border-gray-100">
                      <div>
                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Call To Action Buttons
                        </h4>
                        <p className="text-xs text-gray-400">
                          Configure primary and secondary CTA buttons for {section.title}.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Primary Button */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                          <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#1E7A3A]" />
                            Primary Button
                          </span>
                          <div>
                            <label className="text-[11px] font-semibold text-gray-500">Label</label>
                            <input
                              type="text"
                              value={getValue("hero", "cta_primary_label")}
                              onChange={(e) => handleChange("hero", "cta_primary_label", e.target.value)}
                              placeholder="e.g. Explore Services"
                              className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-semibold text-gray-500">Link URL</label>
                            <input
                              type="text"
                              value={getValue("hero", "cta_primary_url")}
                              onChange={(e) => handleChange("hero", "cta_primary_url", e.target.value)}
                              placeholder="e.g. /services"
                              className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 mt-1"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={async () => {
                              await onSaveContent("hero", "cta_primary_label", getValue("hero", "cta_primary_label"));
                              await onSaveContent("hero", "cta_primary_url", getValue("hero", "cta_primary_url"));
                            }}
                            className="text-xs font-semibold text-white bg-[#1E7A3A] hover:bg-[#27A84E] px-3 py-1.5 rounded-lg cursor-pointer"
                          >
                            Save Primary Button
                          </button>
                        </div>

                        {/* Secondary Button */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                          <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            Secondary Button
                          </span>
                          <div>
                            <label className="text-[11px] font-semibold text-gray-500">Label</label>
                            <input
                              type="text"
                              value={getValue("hero", "cta_secondary_label")}
                              onChange={(e) => handleChange("hero", "cta_secondary_label", e.target.value)}
                              placeholder="e.g. View Reports"
                              className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-semibold text-gray-500">Link URL</label>
                            <input
                              type="text"
                              value={getValue("hero", "cta_secondary_url")}
                              onChange={(e) => handleChange("hero", "cta_secondary_url", e.target.value)}
                              placeholder="e.g. /reports"
                              className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 mt-1"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={async () => {
                              await onSaveContent("hero", "cta_secondary_label", getValue("hero", "cta_secondary_label"));
                              await onSaveContent("hero", "cta_secondary_url", getValue("hero", "cta_secondary_url"));
                            }}
                            className="text-xs font-semibold text-white bg-[#1E7A3A] hover:bg-[#27A84E] px-3 py-1.5 rounded-lg cursor-pointer"
                          >
                            Save Secondary Button
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 4: IMAGES */}
                  {activeTab === "images" && (
                    <div className="space-y-4 bg-gray-50/50 p-4 sm:p-5 rounded-2xl border border-gray-100">
                      <div>
                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Images for {section.title}
                        </h4>
                        <p className="text-xs text-gray-400">
                          Upload or link images used in this section.
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <ImageUploader
                          label={`${section.title} Banner / Graphic`}
                          currentUrl={getValue("images", `${section.section_id}-image`)}
                          folder={`pages/${pageKey}`}
                          onUploaded={async (url) => {
                            handleChange("images", `${section.section_id}-image`, url);
                            await onSaveContent("images", `${section.section_id}-image`, url);
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 5: PDF REPORTS */}
                  {activeTab === "pdfs" && isReports && (
                    <div className="space-y-4 bg-gray-50/50 p-4 sm:p-5 rounded-2xl border border-gray-100">
                      <div>
                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Downloadable Research Reports (PDFs)
                        </h4>
                        <p className="text-xs text-gray-400">
                          Upload downloadable research reports linked to this section.
                        </p>
                      </div>
                      <PdfUploader page={pageKey} initialFiles={pdfs} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CARD CREATE / EDIT MODAL */}
      {editingCard && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 my-8 space-y-4 border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">
                {isNewCard ? "Add New Card" : "Edit Card"}
              </h3>
              <button
                type="button"
                onClick={() => setEditingCard(null)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCardModal} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Card Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingCard.title || ""}
                  onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                  placeholder="e.g. Fundamental Equity Research"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1E7A3A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Subtitle / Category
                  </label>
                  <input
                    type="text"
                    value={editingCard.subtitle || ""}
                    onChange={(e) => setEditingCard({ ...editingCard, subtitle: e.target.value })}
                    placeholder="e.g. Equity Advisory"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1E7A3A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={editingCard.badge || ""}
                    onChange={(e) => setEditingCard({ ...editingCard, badge: e.target.value })}
                    placeholder="e.g. POPULAR, NEW, SEBI"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1E7A3A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingCard.description || ""}
                  onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                  placeholder="Detailed description of this card..."
                  className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#1E7A3A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={editingCard.button_label || ""}
                    onChange={(e) => setEditingCard({ ...editingCard, button_label: e.target.value })}
                    placeholder="e.g. Learn More, Book Call"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1E7A3A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Button URL
                  </label>
                  <input
                    type="text"
                    value={editingCard.button_url || ""}
                    onChange={(e) => setEditingCard({ ...editingCard, button_url: e.target.value })}
                    placeholder="e.g. /contact, /reports"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1E7A3A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={editingCard.image_url || ""}
                  onChange={(e) => setEditingCard({ ...editingCard, image_url: e.target.value })}
                  placeholder="e.g. /images/services/equity.jpg or https://..."
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1E7A3A]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="card-visible-toggle"
                  checked={editingCard.visible !== false}
                  onChange={(e) => setEditingCard({ ...editingCard, visible: e.target.checked })}
                  className="rounded border-gray-300 text-[#1E7A3A] focus:ring-[#1E7A3A]"
                />
                <label htmlFor="card-visible-toggle" className="text-xs font-semibold text-gray-700 cursor-pointer">
                  Visible on public website
                </label>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#1E7A3A] hover:bg-[#27A84E] rounded-lg cursor-pointer transition-colors shadow-sm"
                >
                  {isNewCard ? "Add Card to Database" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
