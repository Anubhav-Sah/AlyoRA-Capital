"use client";

import React, { useState } from "react";
import { Check, Zap, Shield, Sparkles } from "lucide-react";

interface PricingSectionProps {
  onOpenConsultation: () => void;
}

export default function PricingSection({ onOpenConsultation }: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  const plans = [
    {
      name: "Starter Research",
      tagline: "Essential market insights & SIP picks for retail investors.",
      monthlyPrice: 1499,
      annualPrice: 1199,
      popular: false,
      features: [
        "Weekly Nifty 50 & Sectoral Outlook Reports",
        "Quarterly Top Mutual Fund & SIP Picks",
        "Access to Free Research PDFs",
        "Standard Email Support",
      ],
      ctaText: "Get Starter Pass",
    },
    {
      name: "Pro Advisory",
      tagline: "Direct stock calls, deep dives & model portfolios.",
      monthlyPrice: 3999,
      annualPrice: 3199,
      popular: true,
      features: [
        "All Starter Research features included",
        "Full access to Deep-Dive Equity Reports",
        "Real-time Buy/Hold/Sell Trade Alerts",
        "Model Stock Portfolio (15-20 High Growth Picks)",
        "Priority WhatsApp Analyst Support",
      ],
      ctaText: "Start Pro Plan",
    },
    {
      name: "HNI Wealth Advisory",
      tagline: "Custom portfolio strategy & 1-on-1 dedicated analyst.",
      monthlyPrice: 9999,
      annualPrice: 7999,
      popular: false,
      features: [
        "All Pro Advisory features included",
        "Bespoke Personal Portfolio Audit & Rebalancing",
        "One-on-One Monthly Strategy Video Call",
        "Tax-efficient Wealth Structuring",
        "Dedicated Senior Research Partner",
      ],
      ctaText: "Request HNI Onboarding",
    },
  ];

  return (
    <section id="pricing-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F7F8FA] border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
            Transparent Pricing
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0D1F3C]">
            Invest in Clarity & Performance
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto mt-1">
            Choose the advisory tier aligned with your capital size and research requirements.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white p-1 rounded-full border border-gray-200 shadow-sm mt-6">
            <button
              onClick={() => setIsAnnual(false)}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                !isAnnual ? "bg-[#0D1F3C] text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                isAnnual ? "bg-[#1E7A3A] text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[9px] bg-amber-400 text-black px-1.5 py-0.5 rounded-full font-bold uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-6 sm:p-7 border transition-all hover-lift flex flex-col justify-between relative ${
                  plan.popular
                    ? "border-[#1E7A3A] shadow-xl ring-2 ring-[#1E7A3A]/20"
                    : "border-gray-200 shadow-sm"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1E7A3A] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  <h3 className="font-serif-title text-xl font-bold text-[#0D1F3C] mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 min-h-[36px]">
                    {plan.tagline}
                  </p>

                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-gray-500">₹</span>
                      <span className="font-serif-title text-4xl font-bold text-[#0D1F3C]">
                        {price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">/ month</span>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">
                      {isAnnual ? "Billed annually" : "Billed monthly"}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0D1F3C]">
                      What&apos;s Included:
                    </div>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <Check className="w-4 h-4 text-[#27A84E] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenConsultation}
                  className={`w-full text-center text-xs font-semibold py-3 rounded-xl shadow cursor-pointer transition-colors ${
                    plan.popular
                      ? "bg-[#1E7A3A] hover:bg-[#27A84E] text-white"
                      : "bg-[#0D1F3C] hover:bg-[#112540] text-white"
                  }`}
                >
                  {plan.ctaText} →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
