"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Lightbulb,
  Building2,
  FileSpreadsheet,
  Users,
  ArrowRight,
  CheckCircle,
  X,
  PhoneCall,
} from "lucide-react";

interface ServicesSectionProps {
  onOpenConsultation: () => void;
  onOpenSubBrokerCalc: () => void;
}

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
  fullDesc: string;
  features: string[];
  idealFor: string;
  color: string;
}

const servicesData: ServiceDetail[] = [
  {
    id: "research",
    title: "Research Analysis",
    shortDesc: "In-depth equity and sector reports backed by fundamental and technical research.",
    icon: TrendingUp,
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
    shortDesc: "Personalised investment strategies aligned with your risk profile and goals.",
    icon: Lightbulb,
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
    shortDesc: "Curated mutual fund portfolios with expert selection across equity and debt categories.",
    icon: Building2,
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
    id: "planning",
    title: "Financial Planning",
    shortDesc: "Goal-based financial planning for wealth creation, retirement, and tax optimisation.",
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
    color: "#0D1F3C",
  },
  {
    id: "sub-broker",
    title: "Sub-Broker Service",
    shortDesc: "Partner with us as a sub-broker and grow your own client base with our infrastructure.",
    icon: Users,
    fullDesc:
      "Leverage AlyoRA Capital's research brand, trading technology, and analytical reports to build a lucrative sub-broker advisory practice with lucrative revenue sharing and zero hassle.",
    features: [
      "High Commission & Revenue Share Models",
      "White-labeled Research Reports for your clients",
      "Dedicated Relationship Manager & Onboarding Support",
      "Marketing Collateral & Regulatory Compliance Guidance",
    ],
    idealFor: "Financial advisors, mutual fund distributors & entrepreneurs",
    color: "#1E7A3A",
  },
];

export default function ServicesSection({
  onOpenConsultation,
  onOpenSubBrokerCalc,
}: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <section id="services-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
            What We Do
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0D1F3C]">
            Our Core Services
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mt-1">
            From deep equity research to personalised investment advisory — built for every type of investor.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesData.map((svc) => {
            const IconComponent = svc.icon;
            return (
              <div
                key={svc.id}
                onClick={() => setSelectedService(svc)}
                className="bg-white border border-gray-200 rounded-xl p-5 hover-lift border-t-4 cursor-pointer flex flex-col justify-between"
                style={{ borderTopColor: svc.color }}
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#E8F5EC] flex items-center justify-center mb-3 text-[#1E7A3A]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0D1F3C] mb-1.5">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {svc.shortDesc}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1E7A3A] hover:underline flex items-center gap-1">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  {svc.id === "sub-broker" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenSubBrokerCalc();
                      }}
                      className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-medium hover:bg-amber-100"
                    >
                      Calculate Partner Earnings
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* CTA Consultation Card */}
          <div className="bg-[#E8F5EC] border border-[#27A84E] rounded-xl p-5 flex flex-col justify-between hover-lift">
            <div>
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-3 text-[#1E7A3A] shadow-sm">
                <ArrowRight className="w-5 h-5 text-[#1E7A3A]" />
              </div>
              <h3 className="text-base font-semibold text-[#1E7A3A] mb-1.5">
                Not sure where to start?
              </h3>
              <p className="text-xs text-[#1E7A3A]/80 leading-relaxed mb-4">
                Book a free 30-minute consultation call with our research team to clarify your asset allocation strategy.
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full text-center text-xs font-semibold bg-[#0D1F3C] hover:bg-[#112540] text-white py-2.5 rounded-lg shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#27A84E]" />
              <span>Book Free Call →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl border border-gray-200">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

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
              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenConsultation();
                }}
                className="flex-1 text-center text-xs font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white py-2.5 rounded-lg shadow cursor-pointer transition-colors"
              >
                Inquire About {selectedService.title}
              </button>
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
