"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageSquare, ShieldAlert } from "lucide-react";

interface FooterProps {
  onOpenConsultation?: () => void;
}

// Social icon SVGs inlined for zero-dependency
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  const socialLinks = [
    {
      label: "WhatsApp",
      href: "https://wa.me/919876543210",
      Icon: WhatsAppIcon,
      hoverColor: "#25D366",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/alyora-capital-research",
      Icon: LinkedInIcon,
      hoverColor: "#0A66C2",
    },
    {
      label: "Twitter / X",
      href: "https://x.com/alyoracapital",
      Icon: TwitterXIcon,
      hoverColor: "#ffffff",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/alyoracapital",
      Icon: InstagramIcon,
      hoverColor: "#E1306C",
    },
    {
      label: "Telegram",
      href: "https://t.me/alyoracapital",
      Icon: TelegramIcon,
      hoverColor: "#229ED9",
    },
  ];

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
                <Link href="/services/research-analysis" className="hover:text-white transition-colors">
                  Research Analysis
                </Link>
              </li>
              <li>
                <Link href="/services/investment-advisory" className="hover:text-white transition-colors">
                  Investment Advisory
                </Link>
              </li>
              <li>
                <Link href="/services/mutual-funds" className="hover:text-white transition-colors">
                  Mutual Funds
                </Link>
              </li>
              <li>
                <Link href="/services/financial-planning" className="hover:text-white transition-colors">
                  Financial Planning
                </Link>
              </li>
              <li>
                <Link href="/services/sub-broker" className="hover:text-[#27A84E] transition-colors">
                  Sub-Broker Program
                </Link>
              </li>
              <li>
                <Link href="/business-consulting" className="hover:text-[#27A84E] transition-colors">
                  Business Consulting &amp; Growth Advisory
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
                  Pricing &amp; Packages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-3">
                Follow Us
              </div>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ label, href, Icon, hoverColor }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white/50 transition-all duration-200 hover:scale-110"
                    style={{ "--hover-color": hoverColor } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = hoverColor;
                      (e.currentTarget as HTMLElement).style.background = `${hoverColor}22`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "";
                      (e.currentTarget as HTMLElement).style.background = "";
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-3">
              Contact &amp; Support
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
              <li className="pt-2 text-[10px] text-white/30 leading-relaxed border-t border-white/5">
                <span className="text-white/40 font-semibold block mb-0.5">SEBI Reg. No.</span>
                INH000000000 (Research Analyst)
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
              <strong className="text-white/40 font-semibold">Disclaimer:</strong> Investment in securities market is subject to market risks. Please read all related documents carefully before investing. Past performance is not indicative of future results. This website is for informational and educational purposes only and does not constitute explicit investment advice or stock tips. SEBI Reg. No. INH000000000.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
