"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Clock, ExternalLink, ZoomIn, X } from "lucide-react";
import Link from "next/link";
import { usePageData } from "@/lib/usePageData";

export default function ContactPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState("");

  const { getContent } = usePageData("contact");

  const heroHeading = getContent("hero", "heading", "Get in Touch with Our Research Desk");
  const heroDescription = getContent(
    "hero",
    "description",
    "Have questions regarding our research reports, advisory plans, or sub-broker program? Reach out to our analytical team directly."
  );
  const contactEmail = getContent("info", "email", "info@alyoracapital.in");
  const contactEmail2 = getContent("info", "email_secondary", "sarfraj@alyoracapital.in");
  const contactPhone = getContent("info", "phone", "+91 6389570522");
  const contactPhone2 = getContent("info", "phone_secondary", "");
  const contactHours = getContent("info", "hours", "Mon - Fri: 9:00 AM - 6:00 PM IST");
  const whatsappUrl = getContent("info", "whatsapp_url", "https://wa.me/message/3DF25RTHCJG7O1");
  const whatsappQrUrl = getContent("info", "whatsapp_qr_url", "/images/whatsapp-qr.png");
  const preMarketHours = getContent("info", "pre_market_hours", "8:45 AM IST");
  const tradingDeskHours = getContent("info", "trading_desk_hours", "9:00 AM – 11:30 PM IST");

  // Social Links
  const linkedinUrl = getContent("social", "linkedin", "https://linkedin.com/company/alyora-capital-research");
  const twitterUrl = getContent("social", "twitter", "https://x.com/alyoracapital");
  const instagramUrl = getContent("social", "instagram", "https://instagram.com/alyoracapital");
  const telegramUrl = getContent("social", "telegram", "https://t.me/alyoracapital");
  const youtubeUrl = getContent("social", "youtube", "https://youtube.com/@alyoracapital");

  const whatsappPhone = getContent("info", "whatsapp_phone", "+91 6389570522");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // 1. Build prefilled WhatsApp message URL
    const cleanTargetPhone = (whatsappPhone || contactPhone).replace(/[^0-9]/g, "") || "916389570522";
    const waText = encodeURIComponent(
      `Hello AlyoRA Capital Research,\n\n` +
      `*New Website Inquiry*\n` +
      `👤 Name: ${formData.name}\n` +
      `📧 Email: ${formData.email}\n` +
      (formData.phone ? `📞 Phone: ${formData.phone}\n` : "") +
      `📌 Subject: ${formData.subject}\n` +
      (formData.message ? `💬 Message: ${formData.message}\n` : "")
    );
    const waUrl = `https://wa.me/${cleanTargetPhone}?text=${waText}`;
    setWhatsappRedirectUrl(waUrl);

    // 2. Open WhatsApp immediately on click to avoid browser popup blockers
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }

    setSubmitting(true);

    // 3. Simultaneously record the inquiry in the database
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, whatsappUrl: waUrl }),
      });
    } catch (err) {
      console.error("Submission log notice:", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="flex-grow">
        {/* Page Hero */}
        <section className="bg-[#0D1F3C] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E7A3A]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center gap-2 text-xs text-[#27A84E] mb-3">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white/70">Contact Us</span>
            </div>

            <h1 className="font-serif-title text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              {heroHeading.includes("Our Research Desk") ? (
                <>
                  Get in Touch with <span className="text-[#27A84E]">Our Research Desk</span>
                </>
              ) : (
                heroHeading
              )}
            </h1>
            <p className="text-xs sm:text-base text-white/75 max-w-2xl leading-relaxed">
              {heroDescription}
            </p>
          </div>
        </section>

        {/* Main Contact Grid */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Details Column */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="w-9 h-9 bg-[#E8F5EC] text-[#1E7A3A] rounded-lg flex items-center justify-center mb-3">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0D1F3C] mb-1">
                  Email Desk
                </h3>
                <p className="text-xs text-gray-500 mb-2">For report inquiries & support:</p>
                <a href={`mailto:${contactEmail}`} className="text-xs font-semibold text-[#1E7A3A] hover:underline block">
                  {contactEmail}
                </a>
                {contactEmail2 && (
                  <a href={`mailto:${contactEmail2}`} className="text-xs font-semibold text-[#1E7A3A] hover:underline block mt-1">
                    {contactEmail2}
                  </a>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="w-9 h-9 bg-[#E8F5EC] text-[#1E7A3A] rounded-lg flex items-center justify-center mb-3">
                  <Phone className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0D1F3C] mb-1">
                  Phone &amp; WhatsApp
                </h3>
                <p className="text-xs text-gray-500 mb-3">{contactHours}:</p>

                {/* Phone + QR side by side */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <a href={`tel:${contactPhone.replace(/\s+/g, "")}`} className="text-xs font-semibold text-[#1E7A3A] hover:underline block mb-1">
                      {contactPhone}
                    </a>
                    {contactPhone2 && (
                      <a href={`tel:${contactPhone2.replace(/\s+/g, "")}`} className="text-xs font-semibold text-gray-600 hover:underline block mb-2">
                        {contactPhone2}
                      </a>
                    )}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] font-semibold bg-[#25D366] text-white px-2.5 py-1.5 rounded-lg hover:bg-[#20BA5A] transition-colors mt-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      Chat on WhatsApp
                    </a>
                  </div>

                  {/* WhatsApp QR - Clickable to open pop-up menu */}
                  <button
                    type="button"
                    onClick={() => setIsQrModalOpen(true)}
                    title="Click to open QR Code in pop-up"
                    className="flex-shrink-0 bg-white border border-[#27A84E]/30 hover:border-[#27A84E] rounded-xl p-1.5 shadow-sm hover:shadow-md transition-all flex flex-col items-center cursor-pointer group hover:scale-105 active:scale-95"
                  >
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={whatsappQrUrl}
                        alt="WhatsApp QR Code"
                        width={68}
                        height={68}
                        className="w-16 h-16 object-contain rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-[8px] text-center text-[#1E7A3A] font-bold mt-1 group-hover:underline flex items-center gap-0.5">
                      <span>Scan to chat</span>
                    </p>
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="w-9 h-9 bg-[#E8F5EC] text-[#1E7A3A] rounded-lg flex items-center justify-center mb-3">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0D1F3C] mb-1">
                  Market Support Hours
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Pre-Market Note: <strong className="text-[#0D1F3C]">{preMarketHours}</strong><br />
                  Trading Hours Desk: <strong className="text-[#0D1F3C]">{tradingDeskHours}</strong>
                </p>
              </div>

              {/* Social Channels Link Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                  Connect on Social Channels
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-medium text-gray-600 hover:text-[#0A66C2] px-2.5 py-1 rounded-md bg-gray-50 hover:bg-blue-50 transition-colors border border-gray-100"
                    >
                      LinkedIn
                    </a>
                  )}
                  {telegramUrl && (
                    <a
                      href={telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-medium text-gray-600 hover:text-[#229ED9] px-2.5 py-1 rounded-md bg-gray-50 hover:bg-sky-50 transition-colors border border-gray-100"
                    >
                      Telegram
                    </a>
                  )}
                  {twitterUrl && (
                    <a
                      href={twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-medium text-gray-600 hover:text-black px-2.5 py-1 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100"
                    >
                      Twitter / X
                    </a>
                  )}
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-medium text-gray-600 hover:text-pink-600 px-2.5 py-1 rounded-md bg-gray-50 hover:bg-pink-50 transition-colors border border-gray-100"
                    >
                      Instagram
                    </a>
                  )}
                  {youtubeUrl && (
                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-medium text-gray-600 hover:text-red-600 px-2.5 py-1 rounded-md bg-gray-50 hover:bg-red-50 transition-colors border border-gray-100"
                    >
                      YouTube
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="md:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md">
              {!submitted ? (
                <div>
                  <h3 className="font-serif-title text-2xl font-bold text-[#0D1F3C] mb-2">
                    Send Us a Direct Message
                  </h3>
                  <p className="text-xs text-gray-500 mb-6">
                    Fill in your contact details and our team will get back to you within 1 business day.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0D1F3C] mb-1">
                          Your Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikram Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-[#F7F8FA] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 focus:border-[#1E7A3A]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0D1F3C] mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="vikram@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-[#F7F8FA] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 focus:border-[#1E7A3A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0D1F3C] mb-1">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-[#F7F8FA] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 focus:border-[#1E7A3A]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0D1F3C] mb-1">
                          Subject / Inquiry Type
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-3 py-2.5 text-xs bg-[#F7F8FA] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 focus:border-[#1E7A3A]"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Research Subscription">Research Subscription</option>
                          <option value="Investment Advisory">Investment Advisory</option>
                          <option value="Sub-Broker Partnership">Sub-Broker Partnership</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0D1F3C] mb-1">
                        Your Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Write your query or request details..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#F7F8FA] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 focus:border-[#1E7A3A]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full text-center text-xs font-bold bg-[#1E7A3A] hover:bg-[#18632e] active:scale-[0.99] disabled:opacity-50 text-white py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {submitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      )}
                      <span>{submitting ? "Opening WhatsApp..." : "Send Message via WhatsApp"}</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-12 h-12 text-[#27A84E] mx-auto mb-3" />
                  <h4 className="font-serif-title text-2xl font-bold text-[#0D1F3C] mb-2">
                    Inquiry Sent to WhatsApp!
                  </h4>
                  <p className="text-xs text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <span className="font-semibold text-[#0D1F3C]">{formData.name}</span>. We have opened WhatsApp with your prefilled inquiry. If WhatsApp did not open automatically, tap the button below:
                  </p>

                  {whatsappRedirectUrl && (
                    <div className="mb-6">
                      <a
                        href={whatsappRedirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Chat on WhatsApp Now</span>
                      </a>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
                    }}
                    className="text-xs font-semibold bg-[#0D1F3C] hover:bg-[#112540] text-white px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* WhatsApp QR Pop-Up Modal */}
      {isQrModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsQrModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center relative animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors cursor-pointer"
              aria-label="Close QR Modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1E7A3A] text-xs font-bold mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Direct Desk</span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Scan to Chat on WhatsApp
            </h3>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Scan this QR code with your phone camera or WhatsApp scanner to start chatting with our analytical desk.
            </p>

            {/* Large QR Display */}
            <div className="relative mx-auto w-64 h-64 bg-white rounded-2xl p-4 border-2 border-emerald-100 shadow-inner flex items-center justify-center mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={whatsappQrUrl}
                alt="Enlarged WhatsApp QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Hotline & Action */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-gray-700">
                Official Helpline: <strong className="text-[#1E7A3A] font-bold">{contactPhone}</strong>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp Chat Directly</span>
              </a>

              <button
                type="button"
                onClick={() => setIsQrModalOpen(false)}
                className="text-xs text-gray-400 hover:text-gray-600 font-medium cursor-pointer pt-1"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />
    </div>
  );
}
