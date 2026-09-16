"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Navigation, Shield, Mail, Phone, MessageSquare, Share2,
  Save, RefreshCw, CheckCircle2, AlertCircle, ExternalLink, MapPin
} from "lucide-react";
import { getSiteContent } from "@/lib/content-client";

// Inlined Social SVGs
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

const DEFAULT_DATA = {
  // Brand
  brand_tagline: "Insights · Strategy · Growth",
  cta_button_text: "Get In Touch",

  // Contact Details
  email_primary: "info@alyoracapital.in",
  email_secondary: "sarfraj@alyoracapital.in",
  phone: "+91 6389570522",
  whatsapp_url: "https://wa.me/message/3DF25RTHCJG7O1",
  city_location: "Bengaluru / Mumbai, India",

  // Compliance
  amfi_reg_no: "ARN-369301",
  sebi_reg_no: "( Documentation in Process )",
  disclaimer:
    "Investment in securities market is subject to market risks. Please read all related documents carefully before investing. Past performance is not indicative of future results. This website is for informational and educational purposes only and does not constitute explicit investment advice or stock tips.",

  // Social Links
  social_whatsapp: "https://wa.me/message/3DF25RTHCJG7O1",
  social_linkedin: "https://linkedin.com/company/alyora-capital-research",
  social_twitter: "https://x.com/alyoracapital",
  social_instagram: "https://instagram.com/alyoracapital",
  social_telegram: "https://t.me/alyoracapital",
};

export default function SimpleAdminFooterPage() {
  const [form, setForm] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [navRows, contactRows] = await Promise.all([
          getSiteContent("navbar"),
          getSiteContent("contact"),
        ]);

        const merged: Partial<typeof DEFAULT_DATA> = {};

        // Load from navbar section footer-col3 and footer-col2
        navRows.forEach((r) => {
          if (!r.value) return;
          if (r.section === "footer-col3") {
            if (r.key === "email") merged.email_primary = r.value;
            if (r.key === "email_secondary") merged.email_secondary = r.value;
            if (r.key === "phone") merged.phone = r.value;
            if (r.key === "whatsapp_url") merged.whatsapp_url = r.value;
            if (r.key === "amfi_reg_no") merged.amfi_reg_no = r.value;
            if (r.key === "sebi_reg_no") merged.sebi_reg_no = r.value;
            if (r.key === "city_location") merged.city_location = r.value;
            if (r.key === "disclaimer") merged.disclaimer = r.value;
          } else if (r.section === "footer-col2") {
            if (r.key === "social_whatsapp") merged.social_whatsapp = r.value;
            if (r.key === "social_linkedin") merged.social_linkedin = r.value;
            if (r.key === "social_twitter") merged.social_twitter = r.value;
            if (r.key === "social_instagram") merged.social_instagram = r.value;
            if (r.key === "social_telegram") merged.social_telegram = r.value;
          } else if (r.section === "brand") {
            if (r.key === "tagline") merged.brand_tagline = r.value;
            if (r.key === "cta_button_text") merged.cta_button_text = r.value;
          }
        });

        // Also check contact table if missing
        contactRows.forEach((r) => {
          if (!r.value) return;
          if (r.section === "info") {
            if (!merged.phone && r.key === "phone") merged.phone = r.value;
            if (!merged.email_primary && r.key === "email") merged.email_primary = r.value;
            if (!merged.email_secondary && r.key === "email_secondary") merged.email_secondary = r.value;
            if (!merged.whatsapp_url && r.key === "whatsapp_url") merged.whatsapp_url = r.value;
            if (!merged.amfi_reg_no && r.key === "amfi_reg_no") merged.amfi_reg_no = r.value;
            if (!merged.sebi_reg_no && r.key === "sebi_reg_no") merged.sebi_reg_no = r.value;
            if (!merged.disclaimer && r.key === "disclaimer") merged.disclaimer = r.value;
          } else if (r.section === "social") {
            if (!merged.social_linkedin && r.key === "linkedin") merged.social_linkedin = r.value;
            if (!merged.social_twitter && r.key === "twitter") merged.social_twitter = r.value;
            if (!merged.social_instagram && r.key === "instagram") merged.social_instagram = r.value;
            if (!merged.social_telegram && r.key === "telegram") merged.social_telegram = r.value;
          }
        });

        setForm((prev) => ({ ...prev, ...merged }));
      } catch (err) {
        console.error("Failed to load footer data:", err);
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
        // Navbar DB (read by Footer.tsx)
        { page: "navbar", section: "footer-col3", key: "phone", value: form.phone },
        { page: "navbar", section: "footer-col3", key: "email", value: form.email_primary },
        { page: "navbar", section: "footer-col3", key: "email_secondary", value: form.email_secondary },
        { page: "navbar", section: "footer-col3", key: "whatsapp_url", value: form.whatsapp_url },
        { page: "navbar", section: "footer-col3", key: "amfi_reg_no", value: form.amfi_reg_no },
        { page: "navbar", section: "footer-col3", key: "sebi_reg_no", value: form.sebi_reg_no },
        { page: "navbar", section: "footer-col3", key: "city_location", value: form.city_location },
        { page: "navbar", section: "footer-col3", key: "disclaimer", value: form.disclaimer },
        { page: "navbar", section: "footer-col2", key: "social_whatsapp", value: form.whatsapp_url },
        { page: "navbar", section: "footer-col2", key: "social_linkedin", value: form.social_linkedin },
        { page: "navbar", section: "footer-col2", key: "social_twitter", value: form.social_twitter },
        { page: "navbar", section: "footer-col2", key: "social_instagram", value: form.social_instagram },
        { page: "navbar", section: "footer-col2", key: "social_telegram", value: form.social_telegram },
        { page: "navbar", section: "brand", key: "tagline", value: form.brand_tagline },
        { page: "navbar", section: "brand", key: "cta_button_text", value: form.cta_button_text },

        // Contact DB sync so contact page stays synced
        { page: "contact", section: "info", key: "phone", value: form.phone },
        { page: "contact", section: "info", key: "email", value: form.email_primary },
        { page: "contact", section: "info", key: "email_secondary", value: form.email_secondary },
        { page: "contact", section: "info", key: "whatsapp_url", value: form.whatsapp_url },
        { page: "contact", section: "info", key: "amfi_reg_no", value: form.amfi_reg_no },
        { page: "contact", section: "info", key: "sebi_reg_no", value: form.sebi_reg_no },
        { page: "contact", section: "info", key: "city_location", value: form.city_location },
        { page: "contact", section: "info", key: "disclaimer", value: form.disclaimer },
        { page: "contact", section: "social", key: "linkedin", value: form.social_linkedin },
        { page: "contact", section: "social", key: "twitter", value: form.social_twitter },
        { page: "contact", section: "social", key: "instagram", value: form.social_instagram },
        { page: "contact", section: "social", key: "telegram", value: form.social_telegram },
      ];

      const res = await fetch("/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to save footer settings.");
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
          <p className="text-xs text-gray-500">Loading Footer settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 font-sans">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Navigation className="w-5 h-5 text-[#1E7A3A]" />
            Edit Website Footer &amp; Compliance Details
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Update your website footer details, registration numbers (AMFI, SEBI), social channels, and disclaimers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
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

      {/* Success Notification */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between gap-4 text-xs text-emerald-900 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">
              ✓ Footer changes saved and updated on the live website!
            </span>
          </div>
          <Link
            href="/"
            target="_blank"
            className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1"
          >
            View Footer Live <ExternalLink className="w-3 h-3" />
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

      {/* Section 1: Footer Contact Details */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h2 className="text-sm font-bold text-gray-900">1. Footer Contact &amp; Location Details</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Primary Email Address</label>
            <input
              type="email"
              value={form.email_primary}
              onChange={(e) => update("email_primary", e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Secondary Email Address</label>
            <input
              type="email"
              value={form.email_secondary}
              onChange={(e) => update("email_secondary", e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Business Link</label>
            <input
              type="text"
              value={form.whatsapp_url}
              onChange={(e) => update("whatsapp_url", e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Office Location / City (Optional)</label>
          <input
            type="text"
            value={form.city_location}
            onChange={(e) => update("city_location", e.target.value)}
            placeholder="e.g. Bengaluru / Mumbai, India"
            className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white font-medium"
          />
        </div>
      </div>

      {/* Section 2: Regulatory & Compliance Info */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h2 className="text-sm font-bold text-gray-900">2. Regulatory &amp; Registration Numbers</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">AMFI Registration Number</label>
            <input
              type="text"
              value={form.amfi_reg_no}
              onChange={(e) => update("amfi_reg_no", e.target.value)}
              placeholder="ARN-369301"
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white font-bold text-emerald-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">SEBI Registration Status / Number</label>
            <input
              type="text"
              value={form.sebi_reg_no}
              onChange={(e) => update("sebi_reg_no", e.target.value)}
              placeholder="( Documentation in Process )"
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Footer Legal Disclaimer Text</label>
          <textarea
            rows={3}
            value={form.disclaimer}
            onChange={(e) => update("disclaimer", e.target.value)}
            className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white leading-relaxed"
          />
        </div>
      </div>

      {/* Section 3: Social Media Links */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h2 className="text-sm font-bold text-gray-900">3. Footer Social Media Handles</h2>
        </div>

        <div className="space-y-3">
          {/* LinkedIn */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center flex-shrink-0">
              <LinkedInIcon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-gray-700 mb-0.5">LinkedIn URL</label>
              <input
                type="url"
                value={form.social_linkedin}
                onChange={(e) => update("social_linkedin", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white"
              />
            </div>
          </div>

          {/* Twitter / X */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center flex-shrink-0">
              <TwitterXIcon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-gray-700 mb-0.5">Twitter / X URL</label>
              <input
                type="url"
                value={form.social_twitter}
                onChange={(e) => update("social_twitter", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white"
              />
            </div>
          </div>

          {/* Instagram */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center flex-shrink-0">
              <InstagramIcon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-gray-700 mb-0.5">Instagram URL</label>
              <input
                type="url"
                value={form.social_instagram}
                onChange={(e) => update("social_instagram", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white"
              />
            </div>
          </div>

          {/* Telegram */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#229ED9] text-white flex items-center justify-center flex-shrink-0">
              <TelegramIcon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-gray-700 mb-0.5">Telegram Channel URL</label>
              <input
                type="url"
                value={form.social_telegram}
                onChange={(e) => update("social_telegram", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-md flex items-center justify-between gap-4 sticky bottom-4 z-30">
        <span className="text-xs text-gray-500">
          Ready to update your footer &amp; compliance settings? Click Save Changes below.
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
