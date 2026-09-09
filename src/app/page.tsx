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
import { usePageData } from "@/lib/usePageData";

export default function HomePage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const router = useRouter();
  const { isSectionVisible } = usePageData("home");

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans">
      {/* Main Navigation Bar */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Main Page Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto my-0 sm:my-6 sm:px-4 lg:px-8">
          <div className="bg-white sm:rounded-2xl sm:shadow-xl sm:border sm:border-gray-200/80 overflow-hidden">
            {/* Top Brand Banner Image as requested */}
            <div className="w-full bg-white border-b border-gray-200 py-3 px-4 sm:py-5 sm:px-8 flex items-center justify-center">
              <div className="relative w-full max-w-4xl h-16 sm:h-24 md:h-28">
                <Image
                  src="/logo-horizontal.png"
                  alt="AlyoRA Capital Research — Insights | Strategy | Growth"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Hero Section */}
            {isSectionVisible("hero") && (
              <HeroSection
                tagline="Where Research Meets Returns"
                onExploreServices={() => router.push("/services")}
                onViewReports={() => router.push("/reports")}
                onOpenConsultation={() => setIsConsultationOpen(true)}
              />
            )}

            {/* Stats Bar */}
            {isSectionVisible("stats") && <StatsBar />}

            {/* Core Services Overview */}
            {isSectionVisible("services") && (
              <ServicesSection
                onOpenConsultation={() => setIsConsultationOpen(true)}
              />
            )}

            {/* Why AlyoRA Trust Pillars */}
            {isSectionVisible("why-us") && <WhyUsSection />}

            {/* Latest Published Reports Preview */}
            {isSectionVisible("reports-preview") && (
              <LatestReportsSection
                onOpenPricing={() => router.push("/pricing")}
              />
            )}

            {/* Pricing & Packages Preview */}
            {isSectionVisible("pricing-preview") && (
              <PricingSection
                onOpenConsultation={() => setIsConsultationOpen(true)}
              />
            )}

            {/* Call To Action Banner */}
            {isSectionVisible("cta") && (
              <CtaBanner
                onOpenPricing={() => router.push("/pricing")}
                onOpenConsultation={() => setIsConsultationOpen(true)}
              />
            )}
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
