"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import LatestReportsSection from "@/components/LatestReportsSection";
import PricingSection from "@/components/PricingSection";
import CtaBanner from "@/components/CtaBanner";
import ConsultationModal from "@/components/ConsultationModal";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans">
      {/* Main Navigation Bar */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Main Page Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto my-0 sm:my-6 sm:px-4 lg:px-8">
          <div className="bg-white sm:rounded-2xl sm:shadow-xl sm:border sm:border-gray-200/80 overflow-hidden">
            {/* Hero Section */}
            <HeroSection
              tagline="Where Research Meets Returns"
              onExploreServices={() => router.push("/services")}
              onViewReports={() => router.push("/reports")}
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />

            
            
            {/* Stats Bar */}
            <StatsBar />
            {/* Brand Graphic Banner Below Hero Section
            <section className=" py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
              {/* <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-white p-2 sm:p-4 hover-lift"> */}
                {/* <div className="relative w-full h-44 sm:h-72 md:h-96 rounded-xl overflow-hidden bg-white"> */}
                  {/* <Image
                    src="/images/hero-banner.jpg"
                    alt="AlyoRA Capital Research Banner - Charging Bull & Growth Trend"
                    fill
                    className="object-contain"
                    priority
                  /> */}
                {/* </div> */}
              {/* </div> */}
            {/* </section> */} 


            {/* Core Services Overview */}
            <ServicesSection
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />

            {/* Why AlyoRA Trust Pillars */}
            <WhyUsSection />

            {/* Latest Published Reports Preview */}
            <LatestReportsSection
              onOpenPricing={() => router.push("/pricing")}
            />

            {/* Pricing & Packages Preview */}
            <PricingSection
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />

            {/* Call To Action Banner */}
            <CtaBanner
              onOpenPricing={() => router.push("/pricing")}
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Interactive Free Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Site Footer */}
      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />
    </div>
  );
}
