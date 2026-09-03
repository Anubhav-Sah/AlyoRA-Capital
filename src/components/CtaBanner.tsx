"use client";

import React from "react";
import { ArrowRight, Mail } from "lucide-react";

interface CtaBannerProps {
  onOpenPricing: () => void;
  onOpenConsultation: () => void;
}

export default function CtaBanner({ onOpenPricing, onOpenConsultation }: CtaBannerProps) {
  return (
    <section className="bg-[#0D1F3C] text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-[#1E7A3A]/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mb-2">
            Ready to invest with confidence?
          </h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl">
            Join 500+ investors who trust AlyoRA Capital Research for clear market insights, mutual fund selection, and disciplined advisory.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
          <button
            onClick={onOpenPricing}
            className="text-xs sm:text-sm font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white px-5 py-2.5 rounded-lg shadow transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>View Pricing Plans</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenConsultation}
            className="text-xs sm:text-sm font-medium border border-white/30 hover:bg-white/10 text-white px-5 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-[#27A84E]" />
            <span>Contact Us</span>
          </button>
        </div>
      </div>
    </section>
  );
}
