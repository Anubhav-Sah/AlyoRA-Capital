"use client";

import React from "react";
import { ArrowRight, FileText, CheckCircle2, ShieldCheck, Award } from "lucide-react";

interface HeroSectionProps {
  tagline: string;
  onExploreServices: () => void;
  onViewReports: () => void;
  onOpenConsultation: () => void;
}

export default function HeroSection({
  tagline,
  onExploreServices,
  onViewReports,
  onOpenConsultation,
}: HeroSectionProps) {
  // Format tagline into lines with accent highlight if tagline matches recommended
  const renderTagline = () => {
    if (tagline === "Where Research Meets Returns") {
      return (
        <>
          Where Research <br />
          Meets <span className="text-[#27A84E]">Returns</span>
        </>
      );
    }
    const words = tagline.split(" ");
    if (words.length > 2) {
      const lastWord = words.pop();
      return (
        <>
          {words.join(" ")} <span className="text-[#27A84E]">{lastWord}</span>
        </>
      );
    }
    return tagline;
  };

  return (
    <section className="relative bg-[#0D1F3C] text-white pt-12 pb-14 px-4 sm:px-6 lg:px-8 border-b border-[#112540] overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#1E7A3A]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#C8963E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112540] border border-[#1E7A3A]/40 text-[#27A84E] text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#27A84E] animate-ping" />
            <span>AlyoRA Capital Research — Insights · Strategy · Growth</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-white mb-5">
            {renderTagline()}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-7 max-w-2xl font-light">
            Professional equity research, investment advisory, and mutual fund guidance for
            investors who demand clarity, precision, and quantifiable results.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={onExploreServices}
              className="text-xs sm:text-sm font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-emerald-900/40 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onViewReports}
              className="text-xs sm:text-sm font-medium border border-white/30 hover:border-white/60 hover:bg-white/10 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#27A84E]" />
              <span>View Research Reports</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="text-xs font-medium text-[#C8963E] hover:text-amber-300 underline underline-offset-4 px-2 py-3 transition-colors cursor-pointer"
            >
              Book Free Consultation →
            </button>
          </div>

          {/* Divider */}
          <div className="h-0.5 bg-[#1E7A3A] w-14 mb-6 opacity-80" />

          {/* Key Trust Signals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-white/60 pt-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#27A84E] flex-shrink-0" />
              <span>100% Unbiased Fundamental Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#27A84E] flex-shrink-0" />
              <span>Transparent Fee Structures</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C8963E] flex-shrink-0" />
              <span>Dedicated Research Analysts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
