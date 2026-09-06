"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import {
  PhoneCall,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Rocket,
  Search,
  Plane,
  BarChart3,
} from "lucide-react";

import { usePageData } from "@/lib/usePageData";

export default function BusinessConsultingPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const { cards: dbCards, getContent } = usePageData("business-consulting");

  const icons = [DollarSign, TrendingUp, Rocket, Search, Plane, BarChart3];

  const displayCards =
    dbCards && dbCards.length > 0
      ? dbCards
          .filter((c) => c.visible)
          .map((c, i) => {
            const extra = (c.extra_data || {}) as Record<string, unknown>;
            const deliverables = Array.isArray(extra.deliverables)
              ? (extra.deliverables as string[])
              : [c.subtitle || "Institutional guidance & execution roadmap"];
            const tagline =
              typeof extra.tagline === "string"
                ? extra.tagline
                : "Clear milestone-based execution.";
            const color =
              typeof extra.color === "string"
                ? extra.color
                : i % 2 === 0
                ? "#1E7A3A"
                : "#C8963E";

            return {
              num: `Card ${i + 1}`,
              icon: icons[i % icons.length] || DollarSign,
              title: c.title,
              desc: c.description || c.subtitle,
              deliverables,
              tagline,
              color,
            };
          })
      : [
          {
            num: "Card 1",
            icon: DollarSign,
            title: "Financial Planning & Budgeting",
            desc: "Build realistic budgets, cash-flow forecasts, and financial models tailored to your business stage — so every rupee has a purpose.",
            deliverables: [
              "Monthly/annual budgeting frameworks built around your actual revenue cycle",
              "Cash-flow forecasting to help you spot shortfalls before they happen",
              "Cost structuring — fixed vs. variable, break-even analysis, margin tracking",
              "Simple financial models you (or your team) can actually update and use, not static one-time reports",
            ],
            tagline: "You always know how much runway you have and where money is leaking.",
            color: "#1E7A3A",
          },
          {
            num: "Card 2",
            icon: TrendingUp,
            title: "Business Strategy & Growth Planning",
            desc: "Get a clear roadmap for scaling — market positioning, revenue strategy, and milestone-based growth plans built around your goals.",
            deliverables: [
              "Market and competitor positioning to sharpen what makes you different",
              "Revenue strategy — pricing, channels, and where growth will actually come from",
              "Quarter-by-quarter milestone roadmap instead of a vague long-term \"vision\"",
              "Regular strategy check-ins to adjust the plan as the business moves",
            ],
            tagline: "A living growth plan with clear next steps, not a one-time PDF that gets forgotten.",
            color: "#C8963E",
          },
          {
            num: "Card 3",
            icon: Rocket,
            title: "Startup Advisory",
            desc: "End-to-end guidance for early-stage founders — business model validation, pricing strategy, and structuring your venture for sustainable growth.",
            deliverables: [
              "Business model validation — does the idea hold up financially before you scale it",
              "Pricing strategy rooted in unit economics, not guesswork",
              "Legal/financial structuring guidance (entity type, basic compliance checklist)",
              "Founder-to-founder style sounding board for early decisions that are hard to make alone",
            ],
            tagline: "Fewer early-stage mistakes, and a foundation built to survive the first 12–18 months.",
            color: "#1E7A3A",
          },
          {
            num: "Card 4",
            icon: Search,
            title: "Business Health Diagnostics",
            desc: "Identify what's holding your business back — cost leakages, weak margins, or inefficient operations — through a structured diagnostic review.",
            deliverables: [
              "Full review of financial statements, margins, and expense patterns",
              "Operational efficiency check — where time/money is going that shouldn't be",
              "A prioritized \"fix list\" ranked by impact, not a generic audit report",
              "Benchmarking against industry norms where relevant",
            ],
            tagline: "A clear, ranked picture of what's actually holding growth back — and what to fix first.",
            color: "#0D1F3C",
          },
          {
            num: "Card 5",
            icon: Plane,
            title: "Expansion & Scaling Support",
            desc: "Planning to expand into a new city, product line, or market? We help you evaluate feasibility, funding needs, and execution risk before you commit.",
            deliverables: [
              "Feasibility study for the new market, product line, or location",
              "Capital requirement estimate — how much expansion will actually cost",
              "Risk mapping — what could go wrong and how to de-risk the rollout",
              "Phased execution plan so expansion doesn't strain existing operations",
            ],
            tagline: "You expand with a plan and a number, not just a gut feeling.",
            color: "#1E7A3A",
          },
          {
            num: "Card 6",
            icon: BarChart3,
            title: "Investment & Capital Structuring",
            desc: "Guidance on funding options, capital allocation, and investment readiness — helping you prepare for investors, loans, or reinvestment decisions.",
            deliverables: [
              "Funding options comparison — self-funding, loans, investors — fit for your stage",
              "Capital allocation planning — where new money should actually go",
              "Investor-readiness support — financials, pitch numbers, and story alignment",
              "Reinvestment strategy for profitable businesses looking to compound growth",
            ],
            tagline: "You raise or allocate capital with a clear plan, not reactive decision-making.",
            color: "#C8963E",
          },
        ];

  const heroHeading = getContent("hero", "heading", "Business Consulting & Growth Advisory");
  const heroDescription = getContent(
    "hero",
    "description",
    "Practical, high-impact consulting services for SMEs, growth ventures, and corporate founders."
  );

  const whoItIsFor = [
    "First-time founders launching a new venture",
    "Small business owners facing growth or cash-flow challenges",
    "Businesses planning expansion but unsure of the numbers",
    "Owners who want a financial second opinion before big decisions",
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="flex-grow">
        {/* Breadcrumb & Hero */}
        <section className="bg-[#0D1F3C] text-white py-12 sm:py-14 px-3 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E7A3A]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-8">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs text-[#27A84E] mb-3">
                <Link href="/" className="hover:underline">Home</Link>
                <span>/</span>
                <span className="text-white/70">Business Consulting</span>
              </nav>

              {/* Headline */}
              <h1 className="font-serif-title text-2xl sm:text-5xl font-bold tracking-tight mb-3 leading-tight">
                {heroHeading.includes("&") ? (
                  <>
                    {heroHeading.split("&")[0]} <span className="text-[#27A84E]">& {heroHeading.split("&")[1]}</span>
                  </>
                ) : (
                  heroHeading
                )}
              </h1>

              {/* Sub-headline */}
              <p className="text-xs sm:text-base text-white/75 leading-relaxed mb-6 font-light max-w-2xl">
                {heroDescription}
              </p>

              {/* Sub-headline */}
              <p className="text-xs sm:text-base text-white/90 max-w-3xl leading-relaxed mb-2 font-medium">
                Partner with AlyoRA Capital Research to build, run, and scale your business with confidence — backed by institutional-grade financial research, structured strategy frameworks, and hands-on planning support.
              </p>

              {/* Supporting Line */}
              <p className="text-[11px] sm:text-sm text-white/70 max-w-2xl leading-relaxed mb-5 font-light">
                From first-time founders to established businesses facing growth roadblocks, we help you turn financial data into clear, actionable decisions.
              </p>

              {/* CTA Button */}
              <div>
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="text-xs sm:text-sm font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Book a Free Strategy Call</span>
                </button>
              </div>
            </div>

            {/* Banner Graphic */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="relative h-72 w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl group">
                <Image
                  src="/images/sub-broker.jpg"
                  alt="Business Consulting & Growth Advisory"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F3C] via-transparent to-transparent flex items-end p-4">
                  <div className="text-xs text-white/80 font-medium">
                    Structured Financial Frameworks & Strategy Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-12 sm:py-14 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
              CONSULTING ADVANTAGES
            </div>
            <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-[#0D1F3C] mb-2 sm:mb-3">
              Why Businesses Choose AlyoRA
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We equip founders and business owners with the financial clarity and strategic structure needed to move from uncertainty to a confident growth plan.
            </p>
          </div>

          {/* 2-Column Grid on Mobile! */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {displayCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 hover-lift flex flex-col justify-between shadow-sm border-t-4"
                  style={{ borderTopColor: card.color }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="p-2 sm:p-2.5 bg-[#E8F5EC] text-[#1E7A3A] rounded-lg sm:rounded-xl">
                        <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono text-gray-400 font-semibold uppercase">
                        {card.num}
                      </span>
                    </div>

                    <h3 className="font-serif-title text-sm sm:text-lg font-bold text-[#0D1F3C] mb-1.5 line-clamp-1">
                      {card.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 leading-snug sm:leading-relaxed mb-3 line-clamp-2 sm:line-clamp-none">
                      {card.desc}
                    </p>

                    <div className="space-y-1.5 mb-3 sm:mb-4 bg-[#F7F8FA] p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl border border-gray-100">
                      <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0D1F3C] mb-1">
                        Key Deliverables:
                      </div>
                      {card.deliverables.map((deliv, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[10px] sm:text-xs text-gray-700">
                          <CheckCircle2 className="w-3 h-3 text-[#27A84E] flex-shrink-0 mt-0.5" />
                          <span className="leading-snug line-clamp-2">{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 sm:pt-3 border-t border-gray-100">
                    <p className="text-[10px] sm:text-xs font-semibold text-[#1E7A3A] italic bg-[#E8F5EC]/60 p-2 sm:p-2.5 rounded-lg border border-[#1E7A3A]/20 line-clamp-2">
                      &quot;{card.tagline}&quot;
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2-Column Mobile Who This Is For Strip */}
        <section className="bg-[#112540] text-white py-10 sm:py-12 px-3 sm:px-6 lg:px-8 border-y border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase bg-[#1E7A3A] text-white px-2.5 py-1 rounded-full mb-1.5">
                Ideal Client Profiles
              </span>
              <h3 className="font-serif-title text-xl sm:text-3xl font-bold text-white">
                Who This Is Built For
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {whoItIsFor.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0D1F3C] border border-white/15 p-3 sm:p-4 rounded-xl flex items-start gap-2 sm:gap-3 hover:border-[#27A84E] transition-colors"
                >
                  <div className="p-1 bg-[#1E7A3A] text-white rounded mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-white/90 leading-snug sm:leading-relaxed font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA Band */}
        <section className="bg-white py-12 sm:py-14 px-3 sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="max-w-4xl mx-auto bg-[#E8F5EC] border-2 border-[#1E7A3A] rounded-2xl p-6 sm:p-8 text-center shadow-lg">
            <h3 className="font-serif-title text-xl sm:text-3xl font-bold text-[#0D1F3C] mb-2">
              Not sure where your business stands? Let&apos;s find out together.
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 mb-6 max-w-xl mx-auto">
              Book a free 20-minute strategy call and get a clear first step — no obligation, no jargon.
            </p>

            <button
              onClick={() => setIsConsultationOpen(true)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold bg-[#1E7A3A] text-white px-6 sm:px-8 py-3 rounded-xl shadow-lg cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Your Free Strategy Call</span>
            </button>
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
