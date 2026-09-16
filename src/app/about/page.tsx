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

  // Hero
  const heroHeading = getContent("hero", "heading", "About AlyoRA Capital Research");
  const heroDescription = getContent(
    "hero",
    "description",
    "We are an independent equity research and investment advisory firm dedicated to bringing institutional-grade market clarity to retail and high-net-worth investors."
  );

  // Pillars Header
  const pillarsSectionTag = getContent("pillars", "section_tag", "Our Foundation");
  const pillarsSectionTitle = getContent("pillars", "section_title", "Built on Data. Driven by Integrity.");

  // Vision
  const visionTitle = getContent("pillars", "vision_title", "Research for Every Indian Investor");
  const visionDesc = getContent(
    "pillars",
    "vision_desc",
    "To democratise institutional financial research and make it accessible to every Indian investor — from the salaried professional running their first SIP to the HNI building a multi-crore equity portfolio."
  );
  const visionPts = [
    getContent("pillars", "vision_pt1", "No investor left behind — scalable from ₹5,000 SIPs to crore-plus portfolios"),
    getContent("pillars", "vision_pt2", "Institutional research quality at retail subscription price points"),
    getContent("pillars", "vision_pt3", "Bridge the information asymmetry between retail and institutional market participants"),
  ];

  // Mission
  const missionTitle = getContent("pillars", "mission_title", "SEBI-Aligned, Data-Driven Research");
  const missionDesc = getContent(
    "pillars",
    "mission_desc",
    "To deliver SEBI-aligned, data-driven financial research with complete transparency and zero broker bias — ensuring every subscriber receives an unfiltered, unbiased view of the markets."
  );
  const missionPts = [
    getContent("pillars", "mission_pt1", "100% subscription-funded — zero dependency on broker or corporate advisory fees"),
    getContent("pillars", "mission_pt2", "SEBI Research Analyst framework compliance with full disclosure"),
    getContent("pillars", "mission_pt3", "Transparent pricing with explicit deliverables for every plan tier"),
  ];

  // About AlyoRA
  const aboutTitle = getContent("pillars", "about_title", "Founding Story & Core Principles");
  const aboutDesc = getContent(
    "pillars",
    "about_desc",
    "Founded in 2021, AlyoRA Capital Research was built to address a critical gap: unbiased, non-commission-driven financial analysis for retail and HNI investors. Unlike brokerage houses that profit from trading volume, our revenue comes solely from transparent subscriptions."
  );
  const aboutPts = [
    getContent("pillars", "about_pt1", "Institutional-grade DCF & earnings models behind every recommendation"),
    getContent("pillars", "about_pt2", "Plain-language research — no jargon, no false complexity"),
    getContent("pillars", "about_pt3", "Conviction over coverage — we go deep, not wide"),
  ];

  // Strengths
  const strengthsTag = getContent("strengths", "tag", "Our Strengths");
  const strengthsHeading = getContent("strengths", "heading", "Why AlyoRA Stands Apart");
  const s1Title = getContent("strengths", "s1_title", "Zero Broker Conflict");
  const s1Desc = getContent("strengths", "s1_desc", "No hidden kickbacks or churn recommendations.");
  const s2Title = getContent("strengths", "s2_title", "Institutional DCF Modeling");
  const s2Desc = getContent("strengths", "s2_desc", "Every stock recommendation backed by a 5-year cashflow model.");
  const s3Title = getContent("strengths", "s3_title", "SEBI Research Analyst Registered");
  const s3Desc = getContent("strengths", "s3_desc", "Operating under SEBI's Research Analyst framework with full compliance.");

  // Stats Card
  const statsTitle = getContent("stats", "title", "Research Expertise at a Glance");
  const s1Val = getContent("stats", "s1_val", "5+ Years");
  const s1Label = getContent("stats", "s1_label", "Market Track Record");
  const s1Sub = getContent("stats", "s1_sub", "Tested across bull & bear cycles");

  const s2Val = getContent("stats", "s2_val", "500+");
  const s2Label = getContent("stats", "s2_label", "Investors Advised");
  const s2Sub = getContent("stats", "s2_sub", "Across 18+ Indian states");

  const s3Val = getContent("stats", "s3_val", "100+");
  const s3Label = getContent("stats", "s3_label", "Deep-Dive Reports");
  const s3Sub = getContent("stats", "s3_sub", "Published for subscribers");

  const s4Val = getContent("stats", "s4_val", "100%");
  const s4Label = getContent("stats", "s4_label", "SEBI Aligned");
  const s4Sub = getContent("stats", "s4_sub", "Framework compliance");

  const ctaButtonText = getContent("stats", "cta_button_text", "Speak With Our Analytical Team");

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
              {heroHeading.includes("Capital Research") ? (
                <>
                  About AlyoRA <span className="text-[#27A84E]">Capital Research</span>
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

        {/* Vision, Mission & About AlyoRA — Three Pillars */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
              {pillarsSectionTag}
            </div>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0D1F3C]">
              {pillarsSectionTitle}
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
                {visionTitle}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {visionDesc}
              </p>
              <ul className="mt-4 space-y-2">
                {visionPts.map((pt, i) => (
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
                {missionTitle}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {missionDesc}
              </p>
              <ul className="mt-4 space-y-2">
                {missionPts.map((pt, i) => (
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
                {aboutTitle}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {aboutDesc}
              </p>
              <ul className="mt-4 space-y-2">
                {aboutPts.map((pt, i) => (
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
                {strengthsTag}
              </div>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0D1F3C] mb-4">
                {strengthsHeading}
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#E8F5EC] text-[#1E7A3A] rounded-md mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0D1F3C]">{s1Title}</h4>
                    <p className="text-xs text-gray-500">{s1Desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#E8F5EC] text-[#1E7A3A] rounded-md mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0D1F3C]">{s2Title}</h4>
                    <p className="text-xs text-gray-500">{s2Desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#E8F5EC] text-[#1E7A3A] rounded-md mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0D1F3C]">{s3Title}</h4>
                    <p className="text-xs text-gray-500">{s3Desc}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="font-serif-title text-xl font-bold text-[#0D1F3C] border-b pb-3">
                {statsTitle}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F7F8FA] p-4 rounded-xl border border-gray-100">
                  <div className="font-serif-title text-2xl font-bold text-[#1E7A3A]">{s1Val}</div>
                  <div className="text-xs font-medium text-[#0D1F3C] mt-1">{s1Label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{s1Sub}</div>
                </div>
                <div className="bg-[#F7F8FA] p-4 rounded-xl border border-gray-100">
                  <div className="font-serif-title text-2xl font-bold text-[#27A84E]">{s2Val}</div>
                  <div className="text-xs font-medium text-[#0D1F3C] mt-1">{s2Label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{s2Sub}</div>
                </div>
                <div className="bg-[#F7F8FA] p-4 rounded-xl border border-gray-100">
                  <div className="font-serif-title text-2xl font-bold text-[#C8963E]">{s3Val}</div>
                  <div className="text-xs font-medium text-[#0D1F3C] mt-1">{s3Label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{s3Sub}</div>
                </div>
                <div className="bg-[#F7F8FA] p-4 rounded-xl border border-gray-100">
                  <div className="font-serif-title text-2xl font-bold text-[#0D1F3C]">{s4Val}</div>
                  <div className="text-xs font-medium text-[#0D1F3C] mt-1">{s4Label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{s4Sub}</div>
                </div>
              </div>

              <button
                onClick={() => setIsConsultationOpen(true)}
                className="w-full text-center text-xs font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white py-3 rounded-xl shadow cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{ctaButtonText}</span>
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
