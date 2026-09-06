"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, ChevronRight } from "lucide-react";
import { usePageData } from "@/lib/usePageData";

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { getContent } = usePageData("navbar");

  const defaultNavLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Reports", href: "/reports" },
    { name: "Business Consulting", href: "/business-consulting" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  let navLinks = defaultNavLinks;
  const dbLinksJson = getContent("nav-links", "items", "");
  if (dbLinksJson) {
    try {
      const parsed = JSON.parse(dbLinksJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        navLinks = parsed;
      }
    } catch {
      // ignore
    }
  }

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0D1F3C] text-white shadow-lg border-b border-[#1E7A3A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Identity with Official Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <Image
              src="/images/logo.png"
              alt="AlyoRA Capital Research Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div>
            <div className="font-serif-title text-lg font-bold tracking-tight text-white flex items-center gap-0.5">
              Alyo<span className="text-[#27A84E]">RA</span>
            </div>
            <div className="text-[9px] text-white/50 tracking-wider uppercase -mt-1 font-medium">
              Capital Research
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-medium transition-colors ${
                isActive(link.href)
                  ? "text-[#27A84E] font-semibold border-b-2 border-[#27A84E] pb-0.5"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="text-xs font-medium bg-[#1E7A3A] hover:bg-[#27A84E] text-white px-4 py-2 rounded-md shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Get Started</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071325] border-b border-white/10 px-4 py-4 space-y-3 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left text-sm font-medium py-1.5 border-b border-white/5 ${
                isActive(link.href) ? "text-[#27A84E] font-semibold" : "text-white/90"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenConsultation) onOpenConsultation();
              }}
              className="w-full text-center text-xs font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white py-2.5 rounded-md shadow-md flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Get Started & Book Consultation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
