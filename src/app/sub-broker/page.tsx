"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import SubBrokerCalculator from "@/components/SubBrokerCalculator";
import { Users, Calculator, ShieldCheck, CheckCircle2, PhoneCall, TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";

export default function SubBrokerPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isSubBrokerCalcOpen, setIsSubBrokerCalcOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="flex-grow">
        {/* Page Hero */}
        <section className="bg-[#0D1F3C] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E7A3A]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center gap-2 text-xs text-[#27A84E] mb-3">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white/70">Sub-Broker Service</span>
            </div>

            <h1 className="font-serif-title text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Sub-Broker <span className="text-[#27A84E]">Partnership Network</span>
            </h1>
            <p className="text-xs sm:text-base text-white/75 max-w-2xl leading-relaxed">
              Partner with AlyoRA Capital Research and build a lucrative advisory practice backed by our institutional research, white-label reports, and technology.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setIsSubBrokerCalcOpen(true)}
                className="text-xs font-semibold bg-[#C8963E] hover:bg-amber-500 text-black px-5 py-3 rounded-lg shadow transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Launch Earnings Calculator</span>
              </button>

              <button
                onClick={() => setIsConsultationOpen(true)}
                className="text-xs font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white px-5 py-3 rounded-lg shadow transition-colors flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Apply for Partner License</span>
              </button>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1E7A3A] mb-1">
              Partner Advantages
            </div>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0D1F3C]">
              Why Sub-Brokers Choose AlyoRA
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto mt-1">
              We empower financial advisors with robust research infrastructure so you can focus on building client trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover-lift">
              <div className="w-10 h-10 bg-[#E8F5EC] text-[#1E7A3A] rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#0D1F3C] mb-2">
                Up to 80% Revenue Share
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Enjoy industry-leading commission splits on trading brokerage, advisory retainers, and mutual fund distribution.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover-lift">
              <div className="w-10 h-10 bg-[#E8F5EC] text-[#1E7A3A] rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#0D1F3C] mb-2">
                White-Labeled Research
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Deliver branded equity reports, pre-market notes, and model stock portfolios directly to your client database.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover-lift">
              <div className="w-10 h-10 bg-[#E8F5EC] text-[#1E7A3A] rounded-lg flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#0D1F3C] mb-2">
                Dedicated Relationship Manager
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct access to a senior desk analyst to assist you during HNI portfolio pitches and client Q&A sessions.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SubBrokerCalculator
        isOpen={isSubBrokerCalcOpen}
        onClose={() => setIsSubBrokerCalcOpen(false)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />
    </div>
  );
}
