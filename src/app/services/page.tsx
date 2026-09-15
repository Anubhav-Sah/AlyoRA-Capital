"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import SubBrokerCalculator from "@/components/SubBrokerCalculator";
import ServicesSection from "@/components/ServicesSection";
import Link from "next/link";
import { ArrowRight, PhoneCall, Calculator } from "lucide-react";

import { usePageData } from "@/lib/usePageData";

export default function ServicesPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isSubBrokerCalcOpen, setIsSubBrokerCalcOpen] = useState(false);
  const { getContent } = usePageData("services");

  const heroTitle = getContent("hero", "title", "Core Advisory & Research Services");
  const heroSubtitle = getContent(
    "hero",
    "subtitle",
    "Explore our full suite of equity research, wealth advisory, mutual fund portfolio management, and sub-broker partnership programs."
  );

  const bannerBadge = getContent("sub-broker-banner", "badge", "Sub-Broker Partner Network");
  const bannerHeading = getContent("sub-broker-banner", "heading", "Grow Your Wealth Practice With AlyoRA Infrastructure");
  const bannerDescription = getContent(
    "sub-broker-banner",
    "description",
    "Offer your clients institutional-grade equity reports and wealth models under a lucrative revenue-sharing model."
  );
  const bannerBtn1 = getContent("sub-broker-banner", "button1_text", "Calculate Revenue Potential");
  const bannerBtn2 = getContent("sub-broker-banner", "button2_text", "Partner Info");

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
              <span className="text-white/70">Services</span>
            </div>

            <h1 className="font-serif-title text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              {heroTitle}
            </h1>
            <p className="text-xs sm:text-base text-white/75 max-w-2xl leading-relaxed">
              {heroSubtitle}
            </p>
          </div>
        </section>

        {/* Services Component */}
        <ServicesSection
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onOpenSubBrokerCalc={() => setIsSubBrokerCalcOpen(true)}
        />

        {/* Sub Broker Quick Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[#112540] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-xl">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase bg-[#1E7A3A] text-white px-2.5 py-0.5 rounded-full mb-2">
                {bannerBadge}
              </span>
              <h3 className="font-serif-title text-2xl font-bold text-white mb-2">
                {bannerHeading}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-xl">
                {bannerDescription}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setIsSubBrokerCalcOpen(true)}
                className="text-xs font-semibold bg-[#C8963E] hover:bg-amber-500 text-black px-4 py-2.5 rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>{bannerBtn1}</span>
              </button>

              <Link
                href="/sub-broker"
                className="text-xs font-medium border border-white/30 hover:bg-white/10 text-white px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>{bannerBtn2}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SubBrokerCalculator
        isOpen={isSubBrokerCalcOpen}
        onClose={() => setIsSubBrokerCalcOpen(false)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />
    </div>
  );
}
