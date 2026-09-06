"use client";

import React from "react";
import { ShieldCheck, DollarSign, Clock, Users } from "lucide-react";

export default function WhyUsSection() {
  const pillars = [
    {
      num: "01",
      title: "Independent Research",
      text: "No broker bias. Our analysis is purely data-driven.",
      icon: ShieldCheck,
    },
    {
      num: "02",
      title: "Transparent Pricing",
      text: "Clear subscription plans with explicit deliverables.",
      icon: DollarSign,
    },
    {
      num: "03",
      title: "Timely Insights",
      text: "Market reports delivered before market opening hours.",
      icon: Clock,
    },
    {
      num: "04",
      title: "For Every Investor",
      text: "Custom advisory from mutual funds to HNI portfolios.",
      icon: Users,
    },
  ];

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
            We bridge the gap between complex institutional data and actionable personal investment decisions.
          </p>
        </div>

        {/* 2-Column Grid on Mobile! */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bg-white border border-gray-200/80 rounded-xl p-3.5 sm:p-5 shadow-sm hover-lift flex flex-col sm:flex-row gap-2 sm:gap-4 items-start"
              >
                <div className="font-serif-title text-xl sm:text-3xl font-bold text-[#1E7A3A]/30 flex-shrink-0 leading-none">
                  {item.num}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className="w-3.5 h-3.5 text-[#1E7A3A] flex-shrink-0" />
                    <h3 className="text-xs sm:text-sm font-semibold text-[#0D1F3C] line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-600 leading-snug sm:leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
