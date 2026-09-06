"use client";

import React, { useState } from "react";
import { Check, Sparkles, PhoneCall, ShieldAlert, ArrowRight } from "lucide-react";

interface PricingSectionProps {
  onOpenConsultation: () => void;
}

type Period = "monthly" | "quarterly" | "halfyearly" | "yearly";

interface PricingData {
  label: string;
  billed: string;
  prime: number;
  premium: number;
  elite: number;
  apex: number;
  pinnacle: number;
}

const pricingData: Record<Period, PricingData> = {
  monthly: {
    label: "/mo",
    billed: "Billed monthly",
    prime: 17999,
    premium: 22999,
    elite: 28999,
    apex: 35999,
    pinnacle: 44999,
  },
  quarterly: {
    label: "/qtr",
    billed: "Billed every 3 months",
    prime: 46999,
    premium: 58999,
    elite: 73999,
    apex: 91999,
    pinnacle: 113999,
  },
  halfyearly: {
    label: "/6mo",
    billed: "Billed every 6 months",
    prime: 64999,
    premium: 79999,
    elite: 99999,
    apex: 124999,
    pinnacle: 154999,
  },
  yearly: {
    label: "/yr",
    billed: "Billed once a year",
    prime: 79999,
    premium: 99999,
    elite: 124999,
    apex: 149999,
    pinnacle: 174999,
  },
};

export default function PricingSection({ onOpenConsultation }: PricingSectionProps) {
  const [period, setPeriod] = useState<Period>("monthly");

  const currentData = pricingData[period];

  const formatINR = (n: number) => {
    return "₹" + n.toLocaleString("en-IN");
  };

  const tiers = [
    {
      id: "prime",
      name: "Prime",
      tag: "Index options calls.",
      amount: currentData.prime,
      step: 0,
      badge: null,
      colorBar: [6, 6, 6, 6, 6],
      features: [
        { text: "Index outlook & options", inherit: false },
        { text: "Buyer strategy only", inherit: false },
        { text: "Real-time alerts", inherit: false },
        { text: "Standard support", inherit: false },
      ],
      ctaText: "Start Prime",
    },
    {
      id: "premium",
      name: "Premium",
      tag: "Futures & commodities.",
      amount: currentData.premium,
      step: 1,
      badge: null,
      colorBar: [6, 6, 6, 10, 10],
      features: [
        { text: "Everything in Prime", inherit: true },
        { text: "Futures & Options", inherit: false },
        { text: "Commodities (Gold/Crude)", inherit: false },
        { text: "Priority WhatsApp access", inherit: false },
      ],
      ctaText: "Go Premium",
    },
    {
      id: "elite",
      name: "Elite",
      tag: "IPOs & swing wealth.",
      amount: currentData.elite,
      step: 2,
      badge: "Most chosen",
      colorBar: [6, 6, 10, 14, 14],
      features: [
        { text: "Everything in Premium", inherit: true },
        { text: "IPO guidance", inherit: false },
        { text: "Swing trading (2-15d)", inherit: false },
        { text: "Long-term stock picks", inherit: false },
      ],
      ctaText: "Go Elite",
    },
    {
      id: "apex",
      name: "Apex",
      tag: "Primary market & metals.",
      amount: currentData.apex,
      step: 3,
      badge: null,
      colorBar: [6, 6, 10, 14, 18],
      features: [
        { text: "Everything in Elite", inherit: true },
        { text: "FPO & OFS advisory", inherit: false },
        { text: "Gold & silver advisory", inherit: false },
        { text: "Weekly research reports", inherit: false },
      ],
      ctaText: "Reach Apex",
    },
    {
      id: "pinnacle",
      name: "Pinnacle",
      tag: "Full tailored portfolio.",
      amount: currentData.pinnacle,
      step: 4,
      badge: "Full portfolio",
      colorBar: [6, 6, 10, 14, 22],
      features: [
        { text: "Everything in Apex", inherit: true },
        { text: "Tailored portfolio", inherit: false },
        { text: "Bonds & G-Sec advisory", inherit: false },
        { text: "1-on-1 research partner", inherit: false },
      ],
      ctaText: "Reach Summit",
    },
  ];

  return (
    <section id="pricing-section" className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 bg-[#F7F8FA] border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Header Hero */}
        <div className="mb-8 text-center sm:text-left">
          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
            Advisory Plans & Staircase Tiers
          </div>
          <h2 className="font-serif-title text-2xl sm:text-4xl lg:text-5xl font-bold text-[#0D1F3C] leading-tight mb-2">
            Five stages. One climb toward sharper investing.
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-3xl leading-relaxed">
            Every plan builds on the one before it. Pick the stage that matches where you are today.
          </p>
        </div>

        {/* Billing Period Selector */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="inline-flex bg-white p-1 rounded-full border border-gray-200 shadow-sm gap-0.5 sm:gap-1 max-w-full overflow-x-auto">
            {(["monthly", "quarterly", "halfyearly", "yearly"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-[10px] sm:text-xs font-semibold px-2.5 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer capitalize whitespace-nowrap ${
                  period === p
                    ? "bg-[#1E7A3A] text-white shadow"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {p === "halfyearly" ? "Half-Year" : p}
              </button>
            ))}
          </div>
          <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1.5 font-medium">
            {currentData.billed}
          </p>
        </div>

        {/* 2-Column Grid on Mobile! */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-4 items-end mb-10">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`bg-white rounded-xl p-3 sm:p-5 border flex flex-col justify-between relative transition-all duration-300 hover-lift shadow-sm ${
                tier.id === "elite"
                  ? "border-[#1E7A3A] ring-2 ring-[#1E7A3A]/20 shadow-md"
                  : tier.id === "pinnacle"
                  ? "border-[#C8963E] ring-2 ring-[#C8963E]/30 shadow-lg"
                  : "border-gray-200"
              }`}
            >
              {tier.badge && (
                <div
                  className={`absolute -top-2.5 left-2 sm:left-4 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow ${
                    tier.id === "elite"
                      ? "bg-[#1E7A3A] text-white"
                      : "bg-[#C8963E] text-black font-semibold"
                  }`}
                >
                  {tier.badge}
                </div>
              )}

              <div>
                {/* Indicator Bars */}
                <div className="flex items-end gap-0.5 sm:gap-1 h-4 sm:h-5 mb-2">
                  {tier.colorBar.map((height, i) => (
                    <span
                      key={i}
                      className="w-1.5 rounded-sm bg-[#C8963E]"
                      style={{ height: `${height}px`, opacity: i <= tier.step ? 1 : 0.25 }}
                    />
                  ))}
                </div>

                <h3 className="font-serif-title text-base sm:text-xl font-bold text-[#0D1F3C] mb-0.5">
                  {tier.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-gray-500 min-h-[28px] sm:min-h-[34px] leading-snug mb-2 sm:mb-4">
                  {tier.tag}
                </p>

                {/* Price Display */}
                <div className="mb-3 pb-3 border-b border-gray-100">
                  <div className="flex items-baseline gap-0.5 sm:gap-1 flex-wrap">
                    <span className="font-serif-title text-lg sm:text-2xl font-bold text-[#0D1F3C]">
                      {formatINR(tier.amount)}
                    </span>
                    <span className="text-[10px] sm:text-xs font-medium text-gray-500">
                      {currentData.label}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-1.5 mb-4">
                  {tier.features.map((feat, i) => (
                    <li
                      key={i}
                      className={`text-[10px] sm:text-xs flex items-start gap-1 sm:gap-1.5 ${
                        feat.inherit ? "text-gray-400 italic" : "text-gray-700 font-medium"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 flex-shrink-0 mt-0.5 ${
                          feat.inherit ? "text-gray-300" : "text-[#27A84E]"
                        }`}
                      />
                      <span className="line-clamp-2">{feat.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onOpenConsultation}
                className={`w-full text-center text-[10px] sm:text-xs font-semibold py-2 sm:py-2.5 rounded-lg shadow cursor-pointer transition-colors ${
                  tier.id === "pinnacle"
                    ? "bg-[#C8963E] text-black"
                    : tier.id === "elite"
                    ? "bg-[#1E7A3A] text-white"
                    : "bg-[#0D1F3C] text-white"
                }`}
              >
                {tier.ctaText} →
              </button>
            </div>
          ))}
        </div>

        {/* 2-Column Mobile Standalone Services */}
        <div className="mb-8 bg-white rounded-xl p-4 sm:p-8 border border-gray-200 shadow-sm">
          <div className="mb-4">
            <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#0D1F3C] mb-1">
              Standalone Services
            </h3>
            <p className="text-xs text-gray-600">
              Not tied to any advisory plan — available on their own.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {/* Financial Planning */}
            <div className="bg-[#F7F8FA] border border-gray-200 rounded-xl p-3.5 sm:p-5 hover-lift flex flex-col justify-between">
              <div>
                <h4 className="font-serif-title text-sm sm:text-xl font-bold text-[#0D1F3C] mb-1">
                  Financial Planning
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed mb-3 line-clamp-3">
                  Goal-based planning for retirement, tax efficiency and wealth creation.
                </p>
                <div className="font-serif-title text-base sm:text-2xl font-bold text-[#0D1F3C] mb-3">
                  ₹1,999 <span className="text-[10px] sm:text-xs font-sans text-gray-500 font-normal">/ slot</span>
                </div>
              </div>

              <button
                onClick={onOpenConsultation}
                className="w-full text-center text-[10px] sm:text-xs font-semibold bg-[#0D1F3C] text-white py-2 rounded-lg"
              >
                Book Slot →
              </button>
            </div>

            {/* Mutual Fund Planning */}
            <div className="bg-[#E8F5EC]/50 border-2 border-[#1E7A3A]/40 rounded-xl p-3.5 sm:p-5 hover-lift flex flex-col justify-between">
              <div>
                <div className="inline-block text-[8px] sm:text-[9px] font-bold uppercase bg-[#1E7A3A] text-white px-1.5 py-0.5 rounded mb-1">
                  Free
                </div>
                <h4 className="font-serif-title text-sm sm:text-xl font-bold text-[#1E7A3A] mb-1">
                  Mutual Fund Planning
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed mb-3 line-clamp-3">
                  Curated mutual fund and SIP guidance across equity and debt categories.
                </p>
                <div className="font-serif-title text-base sm:text-2xl font-bold text-[#1E7A3A] mb-3">
                  Free
                </div>
              </div>

              <button
                onClick={onOpenConsultation}
                className="w-full text-center text-[10px] sm:text-xs font-semibold bg-[#1E7A3A] text-white py-2 rounded-lg"
              >
                Get Started →
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Footnote Notes */}
        <div className="bg-[#112540] text-white p-4 sm:p-6 rounded-xl border border-white/10 text-[11px] sm:text-xs leading-relaxed space-y-2">
          <p>
            <strong className="text-[#C8963E] font-semibold">A note on pricing.</strong> Retail and individual investor pricing shown above. Family offices & HNI custom quotes available upon request.
          </p>
          <p className="text-white/60 text-[10px]">
            Investments carry risk. Calls & reports shared under any plan are for informational purposes.
          </p>
        </div>
      </div>
    </section>
  );
}
