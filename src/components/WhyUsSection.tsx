"use client";

import React, { useState } from "react";
import { ShieldCheck, DollarSign, Clock, Users, X, CheckCircle2, ArrowRight } from "lucide-react";

interface Pillar {
  num: string;
  title: string;
  text: string;
  icon: React.ElementType;
  color: string;
  details: string[];
  features: string[];
}

const pillars: Pillar[] = [
  {
    num: "01",
    title: "Independent Research",
    text: "No broker bias. Our analysis is purely data-driven.",
    icon: ShieldCheck,
    color: "#1E7A3A",
    details: [
      "AlyoRA is funded entirely by subscriptions — not by brokerage commissions, IPO mandates, or corporate advisory fees.",
      "This independence means every stock pick, sector view, and advisory recommendation is based solely on data and analyst conviction.",
    ],
    features: [
      "Zero conflict of interest from broker relationships",
      "Proprietary 5-year DCF valuation models",
      "All recommendations backed by documented rationale",
      "No paid promotions or sponsored research reports",
      "SEBI-aligned research disclosure framework",
    ],
  },
  {
    num: "02",
    title: "Transparent Pricing",
    text: "Clear subscription plans with explicit deliverables.",
    icon: DollarSign,
    color: "#C8963E",
    details: [
      "Every plan publishes its exact deliverables, alert frequency, and analyst access level upfront — before you pay a single rupee.",
      "No hidden renewal clauses, no surprise charges, and no buried terms. Your subscription is month-to-month with full clarity.",
    ],
    features: [
      "5 clearly defined subscription tiers",
      "Published deliverables for each plan",
      "No hidden fees or lock-in clauses",
      "Month-to-month and annual billing options",
      "Pro-rated refund policy on cancellation",
    ],
  },
  {
    num: "03",
    title: "Timely Insights",
    text: "Market reports delivered before market opening hours.",
    icon: Clock,
    color: "#1E7A3A",
    details: [
      "Pre-market notes are delivered by 8:45 AM IST — before the opening bell. Intraday alerts are sent in real-time as setups develop.",
      "Our research team monitors global overnight cues, futures data, and FII flows to prepare every morning note.",
    ],
    features: [
      "Pre-market note by 8:45 AM IST daily",
      "Real-time WhatsApp trade alerts",
      "Weekly Nifty & Bank Nifty outlook every Sunday",
      "Quarterly earnings coverage within 48 hours",
      "Post-market summary with key levels for next session",
    ],
  },
  {
    num: "04",
    title: "For Every Investor",
    text: "Custom advisory from mutual funds to HNI portfolios.",
    icon: Users,
    color: "#0D1F3C",
    details: [
      "Whether you are a first-time SIP investor or an HNI managing a crore-plus portfolio, AlyoRA has a tier designed specifically for your scale and goals.",
      "Our research is written in plain language that does not require a finance degree to understand — institutional discipline, retail accessibility.",
    ],
    features: [
      "Beginner-friendly mutual fund guidance (free)",
      "Mid-tier equity advisory for active investors",
      "HNI dedicated research partner (Pinnacle)",
      "Sub-broker program for financial professionals",
      "Business consulting for founders & SMEs",
    ],
  },
];

export default function WhyUsSection() {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);

  return (
    <section id="about-section" className="bg-[#F0F6F2] py-12 sm:py-16 px-3 sm:px-6 lg:px-8 border-y border-[#1E7A3A]/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center sm:text-left">
          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
            Why AlyoRA
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0D1F3C]">
            Research you can trust. Advice you can act on.
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mt-1">
            Click any pillar to explore what sets AlyoRA apart from generic advisory firms.
          </p>
        </div>

        {/* Single col on mobile, 4-col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.num}
                onClick={() => setSelectedPillar(item)}
                className="bg-white border border-gray-200/80 rounded-xl p-4 sm:p-5 shadow-sm hover-lift flex flex-col gap-3 items-start text-left group cursor-pointer transition-all duration-200 hover:border-[#1E7A3A]/40 hover:shadow-md"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="font-serif-title text-2xl sm:text-3xl font-bold text-[#1E7A3A]/30 flex-shrink-0 leading-none">
                    {item.num}
                  </div>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}18` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0D1F3C] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-[#1E7A3A] mt-auto group-hover:underline">
                  See details <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pillar Detail Modal */}
      {selectedPillar && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 overflow-hidden">
            {/* Modal Header */}
            <div
              className="p-6 text-white relative"
              style={{ background: `linear-gradient(135deg, ${selectedPillar.color}, #0D1F3C)` }}
            >
              <button
                onClick={() => setSelectedPillar(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="font-serif-title text-4xl font-bold opacity-30">{selectedPillar.num}</div>
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  {React.createElement(selectedPillar.icon, { className: "w-5 h-5 text-white" })}
                </div>
              </div>
              <h3 className="font-serif-title text-2xl font-bold">{selectedPillar.title}</h3>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-3 mb-5">
                {selectedPillar.details.map((para, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">{para}</p>
                ))}
              </div>

              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D1F3C] mb-3">
                Key Commitments
              </h4>
              <ul className="space-y-2 mb-6">
                {selectedPillar.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#27A84E] flex-shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setSelectedPillar(null)}
                  className="flex-1 text-center text-xs font-semibold text-gray-500 hover:text-gray-800 px-4 py-2.5 rounded-lg border border-gray-200 cursor-pointer transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setSelectedPillar(null)}
                  className="flex-1 text-center text-xs font-semibold text-white py-2.5 rounded-lg shadow cursor-pointer transition-colors"
                  style={{ background: selectedPillar.color }}
                >
                  Explore Plans →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
