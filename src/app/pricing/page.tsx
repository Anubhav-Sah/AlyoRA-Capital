"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import PricingSection from "@/components/PricingSection";
import Link from "next/link";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function PricingPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Can I move up or upgrade my advisory plan mid-cycle?",
      a: "Yes. You can upgrade from Prime to Premium, Elite, Apex, or Pinnacle at any time. Your unused credit from your current tier will be credited toward your new tier automatically.",
    },
    {
      q: "How are trading calls and research reports delivered?",
      a: "Subscribers receive instant real-time WhatsApp & SMS broadcast alerts for entry/exit calls, along with email summaries and web portal access to download full research reports.",
    },
    {
      q: "Are family offices and HNI clients covered under these plans?",
      a: "These plans are structured for retail and individual traders. Family offices and enterprise partners receive custom portfolio scope and quotes — reach out to our desk for a tailored proposal.",
    },
    {
      q: "What payment modes do you support?",
      a: "We accept all major Indian payment methods including UPI (GPay, PhonePe, Paytm), Credit Cards, Debit Cards, Net Banking, and NEFT/RTGS for enterprise retainers.",
    },
  ];

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
              <span className="text-white/70">Pricing & Packages</span>
            </div>

            <h1 className="font-serif-title text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Advisory Plans <span className="text-[#27A84E]">& Staircase Tiers</span>
            </h1>
            <p className="text-xs sm:text-base text-white/75 max-w-2xl leading-relaxed">
              Five stages. One climb toward sharper trading and investing. Pick the stage that matches where you are today.
            </p>
          </div>
        </section>

        {/* 5-Stage Staircase Pricing Section */}
        <PricingSection onOpenConsultation={() => setIsConsultationOpen(true)} />

        {/* FAQ Section */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
              Got Questions?
            </div>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0D1F3C]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-xs sm:text-sm text-[#0D1F3C] cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#1E7A3A] flex-shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-gray-600 border-t border-gray-100 bg-[#F7F8FA] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
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
