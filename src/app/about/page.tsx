"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import WhyUsSection from "@/components/WhyUsSection";
import { ShieldCheck, Award, TrendingUp, Users, CheckCircle2, PhoneCall } from "lucide-react";
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
  const foundationHeading = getContent("hero", "subheading", "Built on Data. Driven by Integrity.");
  const missionDesc = getContent(
    "mission",
    "description",
    "Founded in 2021, AlyoRA Capital Research was established to address a critical market need: unbiased, non-commission-driven financial analysis for retail and HNI investors in India."
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

        {/* Mission & Vision Section */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
                Our Foundation
              </div>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0D1F3C] mb-4">
                Built on Data. Driven by Integrity.
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Founded in 2021, AlyoRA Capital Research was established to address a critical market need: unbiased, non-commission-driven financial analysis for retail and HNI investors in India.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                Unlike brokerage houses that profit from trading volume, our revenue is derived solely from transparent subscription models and advisory retainers. This ensures 100% alignment with our clients&apos; wealth accumulation goals.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#E8F5EC] text-[#1E7A3A] rounded-md mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#0D1F3C]">Zero Broker Conflict</h4>
                    <p className="text-[11px] text-gray-500">No hidden kickbacks or churn recommendations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#E8F5EC] text-[#1E7A3A] rounded-md mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#0D1F3C]">Institutional DCF Modeling</h4>
                    <p className="text-[11px] text-gray-500">Every stock recommendation is backed by a 5-year cashflow model.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Expertise Stats Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="font-serif-title text-xl font-bold text-[#0D1F3C] border-b pb-3">
                Research Expertise at a Glance
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F7F8FA] p-4 rounded-xl border border-gray-100">
                  <div className="font-serif-title text-2xl font-bold text-[#1E7A3A]">5+ Years</div>
                  <div className="text-xs font-medium text-[#0D1F3C] mt-1">Market Track Record</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Tested across bull & bear cycles</div>
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
