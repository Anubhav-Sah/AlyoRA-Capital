"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Lightbulb,
  Building2,
  FileSpreadsheet,
  Users,
  Briefcase,
  ArrowRight,
  CheckCircle,
  X,
  PhoneCall,
} from "lucide-react";

interface ServicesSectionProps {
  onOpenConsultation: () => void;
  onOpenSubBrokerCalc?: () => void;
}

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
  image?: string;
  fullDesc: string;
  features: string[];
  idealFor: string;
  color: string;
}

const servicesData: ServiceDetail[] = [
  {
    id: "research",
    title: "Research Analysis",
    shortDesc: "In-depth equity & sector reports backed by research.",
    icon: TrendingUp,
    image: "/images/research-analysis.jpg",
    fullDesc:
      "Our Research Analysis division delivers institutional-grade reports on Indian equities, macroeconomic trends, and high-growth sectors. We combine rigorous DCF valuation, earnings momentum modeling, and technical entry points.",
    features: [
      "Weekly Nifty 50 & Bank Nifty Technical Outlook",
      "Quarterly Earnings Deep-Dives & Valuation Models",
      "Small-cap & Mid-cap Multi-bagger Discovery",
      "Sectoral Rotation & Macro Insight Bulletins",
    ],
    idealFor: "Active stock market investors, swing traders & portfolio managers",
    color: "#1E7A3A",
  },
  {
    id: "advisory",
    title: "Investment Advisory",
    shortDesc: "Personalised investment strategies aligned with risk.",
    icon: Lightbulb,
    image: "/images/investment-advisory.jpg",
    fullDesc:
      "Bespoke portfolio management and investment advisory tailored specifically to your financial risk appetite, capital allocation goals, and time horizon. Receive direct buy/hold/sell recommendations.",
    features: [
      "Customised Equity & Asset Allocation Strategy",
      "Direct Analyst Access & One-on-One Portfolio Reviews",
      "Risk Mitigation & Stop-loss Management",
      "Real-time Whatsapp/SMS Trade Alerts",
    ],
    idealFor: "HNI investors, busy professionals & wealth builders",
    color: "#C8963E",
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds",
    shortDesc: "Curated mutual fund portfolios across equity & debt.",
    icon: Building2,
    image: "/images/mutual-funds.jpg",
    fullDesc:
      "Avoid fund overlap and high-expense ratios. We curate optimal mutual fund portfolios across Large-Cap, Flexi-Cap, Mid-Cap, Small-Cap, and Debt schemes to maximize risk-adjusted CAGR returns.",
    features: [
      "SIP & Lumpsum Portfolio Structuring",
      "Rolling Return & Alpha/Beta Risk Analysis",
      "Tax-saving ELSS Mutual Fund Planning",
      "Automated Quarterly Portfolio Rebalancing",
    ],
    idealFor: "Long-term wealth accumulators & SIP investors",
    color: "#1E7A3A",
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    shortDesc: "Growth advisory & financial planning for founders.",
    icon: Briefcase,
    image: "/images/sub-broker.jpg",
    fullDesc:
      "Partner with AlyoRA Capital Research to build, run, and scale your business with confidence — backed by institutional-grade financial research, structured strategy frameworks, and hands-on planning support.",
    features: [
      "Financial Planning & Budgeting (Cash-flow forecasts & break-even analysis)",
      "Business Strategy & Growth Planning (Milestone roadmaps & revenue channels)",
      "Startup Advisory & Business Model Validation",
      "Business Health Diagnostics & Cost Leakage Audits",
    ],
    idealFor: "First-time founders, small business owners & expanding ventures",
    color: "#0D1F3C",
  },
  {
    id: "planning",
    title: "Financial Planning",
    shortDesc: "Goal-based planning for wealth creation & tax optimization.",
    icon: FileSpreadsheet,
    fullDesc:
      "A comprehensive financial roadmap covering emergency funds, insurance adequacy, retirement planning, child education funding, and legal estate structuring under SEBI framework compliance.",
    features: [
      "Retirement Corpus Projection & FIRE Strategy",
      "Tax Optimisation Under New & Old Tax Regimes",
      "Life & Health Insurance Coverage Audit",
      "Goal-based Asset-Liability Matching",
    ],
    idealFor: "Families, salaried professionals & business owners",
    color: "#1E7A3A",
  },
];

import { usePageData } from "@/lib/usePageData";

export default function ServicesSection({
  onOpenConsultation,
  onOpenSubBrokerCalc,
}: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const { cards, getContent } = usePageData("services");

  const icons = [TrendingUp, Lightbulb, Building2, Briefcase, FileSpreadsheet, Users];

  const displayServices: ServiceDetail[] =
    cards && cards.length > 0
      ? cards
          .filter((c) => c.visible)
          .map((c, i) => {
            const extra = (c.extra_data || {}) as Record<string, unknown>;
            const features = Array.isArray(extra.features)
              ? (extra.features as string[])
              : [];
            const idealFor =
              typeof extra.idealFor === "string"
                ? extra.idealFor
                : "Investors & business leaders";
            const color =
              typeof extra.color === "string" ? extra.color : "#1E7A3A";

            return {
              id: c.id || `srv-${i}`,
              title: c.title,
              shortDesc: c.subtitle || c.description,
              icon: icons[i % icons.length] || TrendingUp,
              image: c.image_url || undefined,
              fullDesc: c.description || c.subtitle,
              features,
              idealFor,
              color,
            };
          })
      : servicesData;

  const sectionHeading = getContent("main-cards", "heading", "Our Core Services");
  const sectionSubheading = getContent(
    "main-cards",
    "subheading",
    "From deep equity research to personalized investment advisory & business growth consulting."
  );

  return (
    <section id="services-section" className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 text-center sm:text-left">
          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
            What We Do
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0D1F3C]">
            {sectionHeading}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mt-1">
            {sectionSubheading}
          </p>
        </div>

        {/* 2-Column Grid on Mobile! */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {displayServices.map((svc) => {
            const IconComponent = svc.icon;
            return (
              <div
                key={svc.id}
                onClick={() => setSelectedService(svc)}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover-lift border-t-4 cursor-pointer flex flex-col justify-between group shadow-sm"
                style={{ borderTopColor: svc.color }}
              >
                <div>
                  {svc.image && (
                    <div className="relative h-28 sm:h-44 w-full overflow-hidden bg-gray-100 border-b border-gray-100">
                      <Image
                        src={svc.image}
                        alt={svc.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-3 sm:p-5">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#E8F5EC] flex items-center justify-center text-[#1E7A3A] flex-shrink-0">
                        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <h3 className="text-xs sm:text-base font-semibold text-[#0D1F3C] line-clamp-1">
                        {svc.title}
                      </h3>
                    </div>

                    <p className="text-[10px] sm:text-xs text-gray-600 leading-snug sm:leading-relaxed mb-2 line-clamp-2">
                      {svc.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="p-3 sm:p-5 pt-0 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-semibold text-[#1E7A3A] group-hover:underline flex items-center gap-1">
                    Learn <ArrowRight className="w-3 h-3" />
                  </span>

                  {svc.id === "business-consulting" && (
                    <Link
                      href="/business-consulting"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[9px] sm:text-[10px] bg-green-50 text-[#1E7A3A] border border-green-200 px-1.5 sm:px-2 py-0.5 rounded font-medium hover:bg-green-100"
                    >
                      Hub →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}

          {/* CTA Consultation Card */}
          <div className="bg-[#E8F5EC] border border-[#27A84E] rounded-xl p-3.5 sm:p-6 flex flex-col justify-between hover-lift">
            <div>
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center mb-2 sm:mb-4 text-[#1E7A3A] shadow-sm">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E7A3A]" />
              </div>
              <h3 className="text-xs sm:text-base font-semibold text-[#1E7A3A] mb-1">
                Not sure where to start?
              </h3>
              <p className="text-[10px] sm:text-xs text-[#1E7A3A]/80 leading-snug sm:leading-relaxed mb-3 line-clamp-3">
                Book a free 30-minute call to clarify your strategy.
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full text-center text-[10px] sm:text-xs font-semibold bg-[#0D1F3C] text-white py-2 sm:py-3 rounded-lg shadow flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#27A84E]" />
              <span>Book Call →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedService.image && (
              <div className="relative h-48 -mx-6 -mt-6 mb-4 bg-gray-100">
                <Image
                  src={selectedService.image}
                  alt={selectedService.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                  <div className="text-white">
                    <h3 className="font-serif-title text-xl font-bold">
                      {selectedService.title}
                    </h3>
                    <p className="text-[11px] text-white/80 font-medium">
                      {selectedService.idealFor}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!selectedService.image && (
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-[#E8F5EC] rounded-xl text-[#1E7A3A]">
                  {React.createElement(selectedService.icon, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h3 className="font-serif-title text-xl font-bold text-[#0D1F3C]">
                    {selectedService.title}
                  </h3>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {selectedService.idealFor}
                  </span>
                </div>
              </div>
            )}

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
              {selectedService.fullDesc}
            </p>

            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D1F3C] mb-2">
                Key Deliverables & Features
              </h4>
              <ul className="space-y-2">
                {selectedService.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#27A84E] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
              {selectedService.id === "business-consulting" ? (
                <Link
                  href="/business-consulting"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 text-center text-xs font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white py-2.5 rounded-lg shadow transition-colors"
                >
                  Visit Business Consulting Hub →
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onOpenConsultation();
                  }}
                  className="flex-1 text-center text-xs font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white py-2.5 rounded-lg shadow cursor-pointer transition-colors"
                >
                  Inquire About {selectedService.title}
                </button>
              )}
              <button
                onClick={() => setSelectedService(null)}
                className="text-xs font-medium text-gray-500 hover:text-gray-800 px-4 py-2.5 rounded-lg border border-gray-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
