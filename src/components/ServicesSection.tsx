"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Lightbulb,
  Building2,
  FileSpreadsheet,
  Users,
  Briefcase,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import { usePageData } from "@/lib/usePageData";

interface ServicesSectionProps {
  onOpenConsultation: () => void;
  onOpenSubBrokerCalc?: () => void;
}

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
  color: string;
  slug: string;
}

const servicesData: ServiceDetail[] = [
  {
    id: "research",
    title: "Research Analysis",
    shortDesc: "In-depth equity & sector reports backed by research.",
    icon: TrendingUp,
    color: "#1E7A3A",
    slug: "research-analysis",
  },
  {
    id: "advisory",
    title: "Investment Advisory",
    shortDesc: "Personalised investment strategies aligned with risk.",
    icon: Lightbulb,
    color: "#C8963E",
    slug: "investment-advisory",
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds",
    shortDesc: "Curated mutual fund portfolios across equity & debt.",
    icon: Building2,
    color: "#1E7A3A",
    slug: "mutual-funds",
  },
  {
    id: "sub-broker",
    title: "Sub-Broker Program",
    shortDesc: "Partner with us and earn from your financial network.",
    icon: Users,
    color: "#0D1F3C",
    slug: "sub-broker",
  },
  {
    id: "planning",
    title: "Financial Planning",
    shortDesc: "Goal-based planning for wealth creation & tax optimisation.",
    icon: FileSpreadsheet,
    color: "#1E7A3A",
    slug: "financial-planning",
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    shortDesc: "Growth advisory & financial planning for founders.",
    icon: Briefcase,
    color: "#0D1F3C",
    slug: "business-consulting",
  },
];

export default function ServicesSection({
  onOpenConsultation,
}: ServicesSectionProps) {
  const { cards, getContent } = usePageData("services");

  const icons = [TrendingUp, Lightbulb, Building2, Users, FileSpreadsheet, Briefcase];
  const slugMap = [
    "research-analysis",
    "investment-advisory",
    "mutual-funds",
    "sub-broker",
    "financial-planning",
    "business-consulting",
  ];

  const displayServices: ServiceDetail[] =
    cards && cards.length > 0
      ? cards
          .filter((c) => c.visible)
          .map((c, i) => {
            const extra = (c.extra_data || {}) as Record<string, unknown>;
            const color =
              typeof extra.color === "string" ? extra.color : "#1E7A3A";
            return {
              id: c.id || `srv-${i}`,
              title: c.title,
              shortDesc: c.subtitle || c.description,
              icon: icons[i % icons.length] || TrendingUp,
              color,
              slug: slugMap[i] || "research-analysis",
            };
          })
      : servicesData;

  const sectionHeading = getContent("main-cards", "heading", "Our Core Services");
  const sectionSubheading = getContent(
    "main-cards",
    "subheading",
    "From deep equity research to personalised investment advisory & business growth consulting."
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

        {/* Service Cards Grid — single col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {displayServices.map((svc) => {
            const IconComponent = svc.icon;
            return (
              <Link
                key={svc.id}
                href={`/services/${svc.slug}`}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover-lift border-t-4 flex flex-col justify-between group shadow-sm transition-all duration-200 hover:shadow-md"
                style={{ borderTopColor: svc.color }}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${svc.color}18` }}
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: svc.color }} />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-[#0D1F3C]">
                      {svc.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {svc.shortDesc}
                  </p>
                </div>

                <div className="px-4 sm:px-5 pb-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-xs font-semibold text-[#1E7A3A] group-hover:underline flex items-center gap-1">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}

          {/* CTA Consultation Card */}
          <div className="bg-[#E8F5EC] border border-[#27A84E] rounded-xl p-4 sm:p-6 flex flex-col justify-between hover-lift">
            <div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center mb-3 text-[#1E7A3A] shadow-sm">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E7A3A]" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-[#1E7A3A] mb-1">
                Not sure where to start?
              </h3>
              <p className="text-xs text-[#1E7A3A]/80 leading-relaxed mb-4">
                Book a free 30-minute call to clarify your strategy.
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full text-center text-xs font-semibold bg-[#0D1F3C] text-white py-2.5 sm:py-3 rounded-lg shadow flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#27A84E]" />
              <span>Book Free Call →</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
