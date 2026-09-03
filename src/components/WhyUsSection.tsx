"use client";

import React from "react";
import { ShieldCheck, DollarSign, Clock, Users } from "lucide-react";

export default function WhyUsSection() {
  const pillars = [
    {
      num: "01",
      title: "Independent Research",
      text: "No broker bias. Our analysis is purely data-driven, mathematically backtested, and executed solely in your best interest.",
      icon: ShieldCheck,
    },
    {
      num: "02",
      title: "Transparent Pricing",
      text: "Clear subscription plans with explicit deliverables. No hidden charges, commissions, or conflicts of interest.",
      icon: DollarSign,
    },
    {
      num: "03",
      title: "Timely Insights",
      text: "Market reports and actionable pre-market outlooks delivered before market opening hours. Be prepared, not reactive.",
      icon: Clock,
    },
    {
      num: "04",
      title: "For Every Investor",
      text: "Whether you are taking your first steps in mutual funds or managing an extensive HNI portfolio, we provide custom advisory.",
      icon: Users,
    },
  ];

  return (
    <section id="about-section" className="bg-[#F0F6F2] py-16 px-4 sm:px-6 lg:px-8 border-y border-[#1E7A3A]/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
            Why AlyoRA
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0D1F3C]">
            Research you can trust. Advice you can act on.
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mt-1">
            We bridge the gap between complex institutional data and actionable personal investment decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-sm hover-lift flex gap-4 items-start"
              >
                <div className="font-serif-title text-3xl font-bold text-[#1E7A3A]/30 flex-shrink-0 leading-none">
                  {item.num}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-[#1E7A3A]" />
                    <h3 className="text-sm font-semibold text-[#0D1F3C]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
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
