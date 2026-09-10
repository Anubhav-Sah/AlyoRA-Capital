"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePageData } from "@/lib/usePageData";

export default function ContactPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const { getContent } = usePageData("contact");

  const heroHeading = getContent("hero", "heading", "Get in Touch with Our Research Desk");
  const heroDescription = getContent(
    "hero",
    "description",
    "Have questions regarding our research reports, advisory plans, or sub-broker program? Reach out to our analytical team directly."
  );
  const contactEmail = getContent("info", "email", "info@alyoracapital.com");
  const contactPhone = getContent("info", "phone", "+91 98765 43210");
  const contactHours = getContent("info", "hours", "Mon - Fri: 9:00 AM - 6:00 PM IST");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
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
                <a href={`mailto:${contactEmail}`} className="text-xs font-semibold text-[#1E7A3A] hover:underline">
                  {contactEmail}
                </a>
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
                    <a href={`tel:${contactPhone.replace(/\s+/g, "")}`} className="text-xs font-semibold text-[#1E7A3A] hover:underline block mb-2">
                      {contactPhone}
                    </a>
                    <a
                      href="https://wa.me/919876543210?text=Hello%20AlyoRA%20Capital%20Research%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] font-semibold bg-[#25D366] text-white px-2.5 py-1.5 rounded-lg hover:bg-[#20BA5A] transition-colors"
                    >
                      <MessageSquare className="w-3 h-3" />
                      Chat on WhatsApp
                    </a>
                  </div>

                  {/* Compact QR */}
                  <div className="flex-shrink-0 bg-[#F7F8FA] border border-[#27A84E]/30 rounded-xl p-1.5">
                    <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
                      <rect x="5" y="5" width="30" height="30" fill="none" stroke="#0D1F3C" strokeWidth="3" />
                      <rect x="11" y="11" width="18" height="18" fill="#0D1F3C" />
                      <rect x="65" y="5" width="30" height="30" fill="none" stroke="#0D1F3C" strokeWidth="3" />
                      <rect x="71" y="11" width="18" height="18" fill="#0D1F3C" />
                      <rect x="5" y="65" width="30" height="30" fill="none" stroke="#0D1F3C" strokeWidth="3" />
                      <rect x="11" y="71" width="18" height="18" fill="#0D1F3C" />
                      <rect x="45" y="5" width="6" height="6" fill="#0D1F3C" />
                      <rect x="53" y="5" width="6" height="6" fill="#0D1F3C" />
                      <rect x="45" y="13" width="6" height="6" fill="#0D1F3C" />
                      <rect x="45" y="45" width="6" height="6" fill="#0D1F3C" />
                      <rect x="55" y="45" width="6" height="6" fill="#0D1F3C" />
                      <rect x="65" y="45" width="6" height="6" fill="#0D1F3C" />
                      <rect x="75" y="45" width="6" height="6" fill="#0D1F3C" />
                      <rect x="45" y="55" width="6" height="6" fill="#0D1F3C" />
                      <rect x="65" y="55" width="6" height="6" fill="#0D1F3C" />
                      <rect x="45" y="65" width="6" height="6" fill="#0D1F3C" />
                      <rect x="55" y="65" width="6" height="6" fill="#0D1F3C" />
                      <rect x="75" y="65" width="6" height="6" fill="#0D1F3C" />
                      <rect x="45" y="75" width="6" height="6" fill="#0D1F3C" />
                      <rect x="65" y="75" width="6" height="6" fill="#0D1F3C" />
                      <rect x="75" y="75" width="6" height="6" fill="#0D1F3C" />
                      <rect x="55" y="85" width="6" height="6" fill="#0D1F3C" />
                    </svg>
                    <p className="text-[8px] text-center text-[#1E7A3A] font-semibold mt-0.5">Scan to chat</p>
                  </div>
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
                  Pre-Market Note: <strong className="text-[#0D1F3C]">8:45 AM IST</strong><br />
                  Trading Hours Desk: <strong className="text-[#0D1F3C]">9:00 AM – 11:30 PM IST</strong>
                </p>
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
                      className="w-full text-center text-xs font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white py-3 rounded-lg shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Direct Message</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-12 h-12 text-[#27A84E] mx-auto mb-3" />
                  <h4 className="font-serif-title text-2xl font-bold text-[#0D1F3C] mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-gray-600 max-w-md mx-auto mb-6">
                    Thank you, <span className="font-semibold text-[#0D1F3C]">{formData.name}</span>. We have received your inquiry and will respond to <span className="font-semibold">{formData.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                    }}
                    className="text-xs font-semibold bg-[#0D1F3C] text-white px-5 py-2 rounded-lg"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />
    </div>
  );
}
