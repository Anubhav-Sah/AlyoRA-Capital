"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Phone, Mail, MessageSquare, QrCode, Clock, Shield,
  Save, RefreshCw, CheckCircle2, AlertCircle, ExternalLink,
  Upload, Undo2, MapPin, Share2, Eye
} from "lucide-react";
import { getSiteContent, uploadImage } from "@/lib/content-client";

// Brand icons inlined
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

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const DEFAULT_DATA = {
  phone: "+91 6389570522",
  phone_secondary: "",
  whatsapp_phone: "+91 6389570522",
  whatsapp_url: "https://wa.me/message/3DF25RTHCJG7O1",
  whatsapp_qr_url: "/images/whatsapp-qr.png",
  email: "info@alyoracapital.in",
  email_secondary: "sarfraj@alyoracapital.in",
  hours: "Mon - Fri: 9:00 AM - 6:00 PM IST",
  pre_market_hours: "8:45 AM IST",
  trading_desk_hours: "9:00 AM – 11:30 PM IST",
  social_linkedin: "https://linkedin.com/company/alyora-capital-research",
  social_twitter: "https://x.com/alyoracapital",
  social_instagram: "https://instagram.com/alyoracapital",
  social_telegram: "https://t.me/alyoracapital",
  social_youtube: "https://youtube.com/@alyoracapital",
  city_location: "Bengaluru / Mumbai, India",
  amfi_reg_no: "ARN-369301",
  sebi_reg_no: "( Documentation in Process )",
  disclaimer:
    "Investment in securities market is subject to market risks. Please read all related documents carefully before investing. Past performance is not indicative of future results. This website is for informational and educational purposes only and does not constitute explicit investment advice or stock tips.",
};

export default function SimpleAdminContactPage() {
  const [form, setForm] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadingQr, setUploadingQr] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load current values from database
  useEffect(() => {
    async function load() {
      try {
        const [contactRows, navbarRows] = await Promise.all([
          getSiteContent("contact"),
          getSiteContent("navbar"),
        ]);

        const merged: Partial<typeof DEFAULT_DATA> = {};

        contactRows.forEach((r) => {
          if (!r.value) return;
          if (r.section === "info") {
            if (r.key === "phone") merged.phone = r.value;
            if (r.key === "phone_secondary") merged.phone_secondary = r.value;
            if (r.key === "whatsapp_phone") merged.whatsapp_phone = r.value;
            if (r.key === "whatsapp_url") merged.whatsapp_url = r.value;
            if (r.key === "whatsapp_qr_url") merged.whatsapp_qr_url = r.value;
            if (r.key === "email") merged.email = r.value;
            if (r.key === "email_secondary") merged.email_secondary = r.value;
            if (r.key === "hours") merged.hours = r.value;
            if (r.key === "pre_market_hours") merged.pre_market_hours = r.value;
            if (r.key === "trading_desk_hours") merged.trading_desk_hours = r.value;
            if (r.key === "city_location") merged.city_location = r.value;
            if (r.key === "amfi_reg_no") merged.amfi_reg_no = r.value;
            if (r.key === "sebi_reg_no") merged.sebi_reg_no = r.value;
            if (r.key === "disclaimer") merged.disclaimer = r.value;
          } else if (r.section === "social") {
            if (r.key === "linkedin") merged.social_linkedin = r.value;
            if (r.key === "twitter") merged.social_twitter = r.value;
            if (r.key === "instagram") merged.social_instagram = r.value;
            if (r.key === "telegram") merged.social_telegram = r.value;
            if (r.key === "youtube") merged.social_youtube = r.value;
          }
        });

        // Also check navbar rows as backup
        navbarRows.forEach((r) => {
          if (!r.value) return;
          if (r.section === "footer-col3") {
            if (!merged.phone && r.key === "phone") merged.phone = r.value;
            if (!merged.email && r.key === "email") merged.email = r.value;
            if (!merged.email_secondary && r.key === "email_secondary") merged.email_secondary = r.value;
            if (!merged.whatsapp_url && r.key === "whatsapp_url") merged.whatsapp_url = r.value;
            if (!merged.amfi_reg_no && r.key === "amfi_reg_no") merged.amfi_reg_no = r.value;
            if (!merged.sebi_reg_no && r.key === "sebi_reg_no") merged.sebi_reg_no = r.value;
            if (!merged.city_location && r.key === "city_location") merged.city_location = r.value;
            if (!merged.disclaimer && r.key === "disclaimer") merged.disclaimer = r.value;
          } else if (r.section === "footer-col2") {
            if (!merged.social_linkedin && r.key === "social_linkedin") merged.social_linkedin = r.value;
            if (!merged.social_twitter && r.key === "social_twitter") merged.social_twitter = r.value;
            if (!merged.social_instagram && r.key === "social_instagram") merged.social_instagram = r.value;
            if (!merged.social_telegram && r.key === "social_telegram") merged.social_telegram = r.value;
            if (!merged.social_youtube && r.key === "social_youtube") merged.social_youtube = r.value;
          }
        });

        setForm((prev) => ({ ...prev, ...merged }));
      } catch (err) {
        console.error("Failed to load contact data:", err);
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

  const handleQrUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (PNG, JPG, SVG, WebP).");
      return;
    }
    setUploadingQr(true);
    try {
      const res = await uploadImage(file, "qr");
      if (res.url) {
        update("whatsapp_qr_url", res.url);
      } else {
        alert("Upload error. You can also paste an image path directly.");
      }
    } catch (e) {
      console.error("QR upload error:", e);
      alert("Upload failed. Please check network connection.");
    } finally {
      setUploadingQr(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setErrorMessage("");
    setSavedSuccess(false);

    try {
      // Build items to save for Contact page AND Footer
      const items = [
        // Contact Page
        { page: "contact", section: "info", key: "phone", value: form.phone },
        { page: "contact", section: "info", key: "phone_secondary", value: form.phone_secondary },
        { page: "contact", section: "info", key: "whatsapp_phone", value: form.whatsapp_phone },
        { page: "contact", section: "info", key: "whatsapp_url", value: form.whatsapp_url },
        { page: "contact", section: "info", key: "whatsapp_qr_url", value: form.whatsapp_qr_url },
        { page: "contact", section: "info", key: "email", value: form.email },
        { page: "contact", section: "info", key: "email_secondary", value: form.email_secondary },
        { page: "contact", section: "info", key: "hours", value: form.hours },
        { page: "contact", section: "info", key: "pre_market_hours", value: form.pre_market_hours },
        { page: "contact", section: "info", key: "trading_desk_hours", value: form.trading_desk_hours },
        { page: "contact", section: "info", key: "city_location", value: form.city_location },
        { page: "contact", section: "info", key: "amfi_reg_no", value: form.amfi_reg_no },
        { page: "contact", section: "info", key: "sebi_reg_no", value: form.sebi_reg_no },
        { page: "contact", section: "info", key: "disclaimer", value: form.disclaimer },
        { page: "contact", section: "social", key: "linkedin", value: form.social_linkedin },
        { page: "contact", section: "social", key: "twitter", value: form.social_twitter },
        { page: "contact", section: "social", key: "instagram", value: form.social_instagram },
        { page: "contact", section: "social", key: "telegram", value: form.social_telegram },
        { page: "contact", section: "social", key: "youtube", value: form.social_youtube },

        // Site-wide Footer
        { page: "navbar", section: "footer-col3", key: "phone", value: form.phone },
        { page: "navbar", section: "footer-col3", key: "email", value: form.email },
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
        { page: "navbar", section: "footer-col2", key: "social_youtube", value: form.social_youtube },
      ];

      const res = await fetch("/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to save to database");
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
          <p className="text-xs text-gray-500">Loading your contact information...</p>
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
            <Phone className="w-5 h-5 text-[#1E7A3A]" />
            Edit Contact &amp; Social Information
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Simply change any detail below and click <strong>Save Changes</strong>. All changes update on the contact page and website footer immediately.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
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
              href="/contact"
              target="_blank"
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1"
            >
              Open Contact Page <ExternalLink className="w-3 h-3" />
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

      {/* Section 1: Phone Numbers & WhatsApp */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-gray-900">1. Phone &amp; WhatsApp Information</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Primary Phone Number
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+91 6389570522"
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
            />
            <p className="text-[10px] text-gray-400 mt-1">Main phone shown on header, footer &amp; contact card</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Secondary Phone Number (Optional)
            </label>
            <input
              type="text"
              value={form.phone_secondary}
              onChange={(e) => update("phone_secondary", e.target.value)}
              placeholder="+91 ..."
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              WhatsApp Phone Number
            </label>
            <input
              type="text"
              value={form.whatsapp_phone}
              onChange={(e) => update("whatsapp_phone", e.target.value)}
              placeholder="+91 6389570522"
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Direct WhatsApp Chat Link
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={form.whatsapp_url}
                onChange={(e) => update("whatsapp_url", e.target.value)}
                placeholder="https://wa.me/message/3DF25RTHCJG7O1"
                className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
              />
              {form.whatsapp_url && (
                <a
                  href={form.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold hover:bg-emerald-100 flex-shrink-0"
                  title="Test Link"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* WhatsApp QR Code section */}
        <div className="pt-3 border-t border-gray-100">
          <label className="block text-xs font-bold text-gray-700 mb-1">
            WhatsApp QR Code
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
            {/* QR Image Preview */}
            <div className="w-24 h-24 bg-white rounded-lg p-1 border border-emerald-200 flex items-center justify-center flex-shrink-0 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.whatsapp_qr_url || "/images/whatsapp-qr.png"}
                alt="Current QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-xs text-gray-600">
                This QR image is displayed beside the phone number on the contact page.
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleQrUpload(file);
                  }}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingQr}
                  className="px-3.5 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-100 flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5 text-[#1E7A3A]" />
                  <span>{uploadingQr ? "Uploading..." : "Upload New QR Image"}</span>
                </button>

                {form.whatsapp_qr_url !== "/images/whatsapp-qr.png" && (
                  <button
                    type="button"
                    onClick={() => update("whatsapp_qr_url", "/images/whatsapp-qr.png")}
                    className="px-3 py-2 text-gray-500 hover:text-gray-800 text-xs font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Undo2 className="w-3.5 h-3.5" />
                    Reset to Default QR
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Email Addresses */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-gray-900">2. Official Email Addresses</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Primary Official Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="info@alyoracapital.in"
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
            />
            <p className="text-[10px] text-gray-400 mt-1">Main address shown across footer &amp; contact desk</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Secondary / Inquiries Email
            </label>
            <input
              type="email"
              value={form.email_secondary}
              onChange={(e) => update("email_secondary", e.target.value)}
              placeholder="sarfraj@alyoracapital.in"
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-medium"
            />
            <p className="text-[10px] text-gray-400 mt-1">Direct analyst / founder email</p>
          </div>
        </div>
      </div>

      {/* Section 3: Social Media Handles */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-gray-900">3. Social Media Handles</h2>
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
                placeholder="https://linkedin.com/company/alyora-capital-research"
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/30"
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
                placeholder="https://x.com/alyoracapital"
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
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
                placeholder="https://instagram.com/alyoracapital"
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500/30"
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
                placeholder="https://t.me/alyoracapital"
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#229ED9]/30"
              />
            </div>
          </div>

          {/* YouTube */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF0000] text-white flex items-center justify-center flex-shrink-0">
              <YouTubeIcon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-gray-700 mb-0.5">YouTube Channel URL</label>
              <input
                type="url"
                value={form.social_youtube}
                onChange={(e) => update("social_youtube", e.target.value)}
                placeholder="https://youtube.com/@alyoracapital"
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Operating Hours & Market Timings */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-gray-900">4. Operating Hours &amp; Timings</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Support Desk Hours
            </label>
            <input
              type="text"
              value={form.hours}
              onChange={(e) => update("hours", e.target.value)}
              placeholder="Mon - Fri: 9:00 AM - 6:00 PM IST"
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Pre-Market Note Time
            </label>
            <input
              type="text"
              value={form.pre_market_hours}
              onChange={(e) => update("pre_market_hours", e.target.value)}
              placeholder="8:45 AM IST"
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Trading Desk Hours
            </label>
            <input
              type="text"
              value={form.trading_desk_hours}
              onChange={(e) => update("trading_desk_hours", e.target.value)}
              placeholder="9:00 AM – 11:30 PM IST"
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>
        </div>
      </div>

      {/* Section 5: Office Location & Regulatory Details */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-gray-900">5. Office Location &amp; Compliance Registrations</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Office Location / City
            </label>
            <input
              type="text"
              value={form.city_location}
              onChange={(e) => update("city_location", e.target.value)}
              placeholder="Bengaluru / Mumbai, India"
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              AMFI Registration Number
            </label>
            <input
              type="text"
              value={form.amfi_reg_no}
              onChange={(e) => update("amfi_reg_no", e.target.value)}
              placeholder="ARN-369301"
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 font-bold text-emerald-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              SEBI Registration Status
            </label>
            <input
              type="text"
              value={form.sebi_reg_no}
              onChange={(e) => update("sebi_reg_no", e.target.value)}
              placeholder="( Documentation in Process )"
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Footer Legal Disclaimer
          </label>
          <textarea
            rows={3}
            value={form.disclaimer}
            onChange={(e) => update("disclaimer", e.target.value)}
            placeholder="Investment in securities market is subject to market risks..."
            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 leading-relaxed"
          />
        </div>
      </div>

      {/* Bottom Sticky Save Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-md flex items-center justify-between gap-4 sticky bottom-4 z-30">
        <span className="text-xs text-gray-500">
          Ready to update your website? Click Save below.
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
