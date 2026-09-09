"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import WhyUsSection from "@/components/WhyUsSection";
import {
  ShieldCheck,
  Award,
  Eye,
  Target,
  BookOpen,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { usePageData } from "@/lib/usePageData";

export default function AboutPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const { getContent } = usePageData("about");

  const heading = getContent("hero", "heading", "About AlyoRA Capital Research");
  const description = getContent(
    "hero",
    "description",
    "We are an independent equity research and investment advisory firm dedicated to bringing institutional-grade market clarity to retail and high-net-worth investors."
  );

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
              <span className="text-white/70">About Us</span>
            </div>

            <h1 className="font-serif-title text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              {heading.includes("Capital Research") ? (
                <>
                  About AlyoRA <span className="text-[#27A84E]">Capital Research</span>
                </>
              ) : (
                heading
              )}
            </h1>
            <p className="text-xs sm:text-base text-white/75 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </section>

        {/* Vision, Mission & About AlyoRA — Three Pillars */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
              Our Foundation
            </div>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0D1F3C]">
              Built on Data. Driven by Integrity.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {/* Our Vision */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm border-t-4 border-t-[#1E7A3A] hover-lift">
              <div className="w-12 h-12 bg-[#E8F5EC] text-[#1E7A3A] rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
                Our Vision
              </div>
              <h3 className="font-serif-title text-xl font-bold text-[#0D1F3C] mb-3">
                Research for Every Indian Investor
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To democratise institutional financial research and make it accessible to every Indian investor — from the salaried professional running their first SIP to the HNI building a multi-crore equity portfolio.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "No investor left behind — scalable from ₹5,000 SIPs to crore-plus portfolios",
                  "Institutional research quality at retail subscription price points",
                  "Bridge the information asymmetry between retail and institutional market participants",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#27A84E] flex-shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Mission */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm border-t-4 border-t-[#C8963E] hover-lift">
              <div className="w-12 h-12 bg-[#FDF5E8] text-[#C8963E] rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#C8963E] mb-1">
                Our Mission
              </div>
              <h3 className="font-serif-title text-xl font-bold text-[#0D1F3C] mb-3">
                SEBI-Aligned, Data-Driven Research
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To deliver SEBI-aligned, data-driven financial research with complete transparency and zero broker bias — ensuring every subscriber receives an unfiltered, unbiased view of the markets.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "100% subscription-funded — zero dependency on broker or corporate advisory fees",
                  "SEBI Research Analyst framework compliance with full disclosure",
                  "Transparent pricing with explicit deliverables for every plan tier",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C8963E] flex-shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* About AlyoRA */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm border-t-4 border-t-[#0D1F3C] hover-lift">
              <div className="w-12 h-12 bg-[#E8EEF6] text-[#0D1F3C] rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#0D1F3C] mb-1">
                About AlyoRA
              </div>
              <h3 className="font-serif-title text-xl font-bold text-[#0D1F3C] mb-3">
                Founding Story &amp; Core Principles
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Founded in 2021, AlyoRA Capital Research was built to address a critical gap: unbiased, non-commission-driven financial analysis for retail and HNI investors. Unlike brokerage houses that profit from trading volume, our revenue comes solely from transparent subscriptions.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Institutional-grade DCF & earnings models behind every recommendation",
                  "Plain-language research — no jargon, no false complexity",
                  "Conviction over coverage — we go deep, not wide",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D1F3C] flex-shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Research Expertise Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-14">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
                Our Strengths
              </div>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0D1F3C] mb-4">
                Why AlyoRA Stands Apart
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#E8F5EC] text-[#1E7A3A] rounded-md mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0D1F3C]">Zero Broker Conflict</h4>
                    <p className="text-xs text-gray-500">No hidden kickbacks or churn recommendations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#E8F5EC] text-[#1E7A3A] rounded-md mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0D1F3C]">Institutional DCF Modeling</h4>
                    <p className="text-xs text-gray-500">Every stock recommendation backed by a 5-year cashflow model.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#E8F5EC] text-[#1E7A3A] rounded-md mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0D1F3C]">SEBI Research Analyst Registered</h4>
                    <p className="text-xs text-gray-500">Operating under SEBI's Research Analyst framework with full compliance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="font-serif-title text-xl font-bold text-[#0D1F3C] border-b pb-3">
                Research Expertise at a Glance
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F7F8FA] p-4 rounded-xl border border-gray-100">
                  <div className="font-serif-title text-2xl font-bold text-[#1E7A3A]">5+ Years</div>
                  <div className="text-xs font-medium text-[#0D1F3C] mt-1">Market Track Record</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Tested across bull &amp; bear cycles</div>
                </div>
                <div className="bg-[#F7F8FA] p-4 rounded-xl border border-gray-100">
                  <div className="font-serif-title text-2xl font-bold text-[#27A84E]">500+</div>
                  <div className="text-xs font-medium text-[#0D1F3C] mt-1">Investors Advised</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Across 18+ Indian states</div>
                </div>
                <div className="bg-[#F7F8FA] p-4 rounded-xl border border-gray-100">
                  <div className="font-serif-title text-2xl font-bold text-[#C8963E]">100+</div>
                  <div className="text-xs font-medium text-[#0D1F3C] mt-1">Deep-Dive Reports</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Published for subscribers</div>
                </div>
                <div className="bg-[#F7F8FA] p-4 rounded-xl border border-gray-100">
                  <div className="font-serif-title text-2xl font-bold text-[#0D1F3C]">100%</div>
                  <div className="text-xs font-medium text-[#0D1F3C] mt-1">SEBI Aligned</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Framework compliance</div>
                </div>
              </div>

              <button
                onClick={() => setIsConsultationOpen(true)}
                className="w-full text-center text-xs font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white py-3 rounded-xl shadow cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Speak With Our Analytical Team</span>
              </button>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <WhyUsSection />
      </main>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />
    </div>
  );
}
