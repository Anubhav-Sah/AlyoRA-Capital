"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageSquare, ShieldAlert } from "lucide-react";

interface FooterProps {
  onOpenConsultation?: () => void;
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  return (
    <footer className="bg-[#071325] text-white pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-t border-[#112540]">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 mb-8 border-b border-white/10 gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white p-1 shadow-md">
              <Image
                src="/images/logo.png"
                alt="AlyoRA Capital Research Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <Link href="/" className="font-serif-title text-2xl font-bold tracking-tight text-white flex items-center gap-0.5">
                Alyo<span className="text-[#27A84E]">RA</span> Capital Research
              </Link>
              <div className="text-xs text-white/40 mt-0.5 font-light">
                Insights · Strategy · Growth
              </div>
            </div>
          </div>

          <button
            onClick={onOpenConsultation}
            className="text-xs font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white px-4 py-2 rounded-md shadow transition-colors cursor-pointer"
          >
            Get In Touch
          </button>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-3">
              Services
            </div>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Research Analysis
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Investment Advisory
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Mutual Funds
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Financial Planning
                </Link>
              </li>
              <li>
                <Link href="/business-consulting" className="hover:text-[#27A84E] transition-colors">
                  Business Consulting & Growth Advisory
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-3">
              Company
            </div>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-white transition-colors">
                  Our Research Reports
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing & Packages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-3">
              Contact & Support
            </div>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#27A84E]" />
                <a href="mailto:info@alyoracapital.com" className="hover:text-white transition-colors">
                  info@alyoracapital.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#27A84E]" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 XXXXX XXXXX
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#27A84E]" />
                <Link href="/contact" className="hover:text-white transition-colors">
                  WhatsApp Business
                </Link>
              </li>
              <li className="pt-2 text-[10px] text-white/30 leading-relaxed">
                Registration details will appear here after SEBI registration process.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom & Legal Disclaimer */}
        <div className="pt-6 border-t border-white/10 text-[11px] text-white/40 space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-white/50">
            <span>© 2026 AlyoRA Capital Research. All rights reserved.</span>
            <div className="flex items-center gap-4 text-[10px]">
              <Link href="/contact" className="hover:underline">Privacy Policy</Link>
              <Link href="/contact" className="hover:underline">Terms of Service</Link>
              <Link href="/about" className="hover:underline">SEBI Compliance Notes</Link>
            </div>
          </div>

          <div className="bg-[#0B1B33] p-3 rounded-lg border border-white/5 text-[10px] text-white/30 leading-relaxed flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white/40 font-semibold">Disclaimer:</strong> Investment in securities market is subject to market risks. Please read all related documents carefully before investing. Past performance is not indicative of future results. This website is for informational and educational purposes only and does not constitute explicit investment advice or stock tips.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
