"use client";

import React from "react";
import { Users, Calendar, FileCheck, Layers } from "lucide-react";

export default function StatsBar() {
  const stats = [
    { value: "500+", label: "Clients Served", icon: Users, desc: "Satisfied retail & HNI investors" },
    { value: "5+", label: "Years of Research", icon: Calendar, desc: "Proven track record in equities" },
    { value: "100+", label: "Reports Published", icon: FileCheck, desc: "In-depth sector & stock deep-dives" },
    { value: "5", label: "Core Services", icon: Layers, desc: "End-to-end wealth & research solutions" },
  ];

  return (
    <section className="bg-[#112540] border-b border-white/10 py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="py-3 px-4 text-center group hover:bg-white/5 transition-colors rounded-lg"
            >
              <div className="inline-flex items-center justify-center p-2 rounded-lg bg-[#0D1F3C] text-[#27A84E] mb-2 group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <div className="font-serif-title text-2xl sm:text-3xl font-bold text-[#27A84E] mb-0.5">
                {item.value}
              </div>
              <div className="text-xs font-semibold text-white/90">
                {item.label}
              </div>
              <div className="text-[10px] text-white/50 mt-0.5 hidden sm:block">
                {item.desc}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
