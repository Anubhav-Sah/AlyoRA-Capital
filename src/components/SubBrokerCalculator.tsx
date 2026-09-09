"use client";

import React, { useState } from "react";
import { Users, DollarSign, Calculator, ArrowRight, CheckCircle2, X, PhoneCall } from "lucide-react";

interface SubBrokerCalculatorProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenConsultation?: () => void;
  inline?: boolean;
}

export default function SubBrokerCalculator({
  isOpen,
  onClose,
  onOpenConsultation,
  inline = false,
}: SubBrokerCalculatorProps) {
  const [clientCount, setClientCount] = useState<number>(25);
  const [avgPortfolioLakhs, setAvgPortfolioLakhs] = useState<number>(10);
  const [revenueSharePercent, setRevenueSharePercent] = useState<number>(60);

  // In modal mode, hide if not open
  if (!inline && !isOpen) return null;

  // Total Assets Under Advisory (AUM) in Lakhs & Crores
  const totalAumLakhs = clientCount * avgPortfolioLakhs;
  const totalAumCrores = (totalAumLakhs / 100).toFixed(2);

  // Annual Brokerage & Fee Yield estimated at 1.2% of AUM
  const totalAnnualYieldRupees = totalAumLakhs * 100000 * 0.012;
  const partnerAnnualEarnings = Math.round(totalAnnualYieldRupees * (revenueSharePercent / 100));
  const partnerMonthlyEarnings = Math.round(partnerAnnualEarnings / 12);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-gray-200 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#E8F5EC] rounded-xl text-[#1E7A3A]">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#0D1F3C]">
              Sub-Broker Revenue Potential Calculator
            </h3>
            <p className="text-xs text-gray-500">
              Estimate your monthly & annual commissions as an AlyoRA Sub-Broker partner.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Sliders & Inputs */}
          <div className="space-y-5 bg-[#F7F8FA] p-5 rounded-xl border border-gray-200">
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-[#0D1F3C] mb-1.5">
                <span>Active Clients Onboarded</span>
                <span className="text-[#1E7A3A] font-bold text-sm">{clientCount} Clients</span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={clientCount}
                onChange={(e) => setClientCount(Number(e.target.value))}
                className="w-full accent-[#1E7A3A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>5</span>
                <span>100</span>
                <span>200+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-[#0D1F3C] mb-1.5">
                <span>Average Client Portfolio (AUM)</span>
                <span className="text-[#1E7A3A] font-bold text-sm">₹{avgPortfolioLakhs} Lakhs</span>
              </div>
              <input
                type="range"
                min="2"
                max="50"
                step="1"
                value={avgPortfolioLakhs}
                onChange={(e) => setAvgPortfolioLakhs(Number(e.target.value))}
                className="w-full accent-[#1E7A3A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>₹2L</span>
                <span>₹25L</span>
                <span>₹50L+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-[#0D1F3C] mb-1.5">
                <span>Partner Commission Share</span>
                <span className="text-[#C8963E] font-bold text-sm">{revenueSharePercent}% Share</span>
              </div>
              <input
                type="range"
                min="50"
                max="80"
                step="5"
                value={revenueSharePercent}
                onChange={(e) => setRevenueSharePercent(Number(e.target.value))}
                className="w-full accent-[#C8963E] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>50%</span>
                <span>65%</span>
                <span>80%</span>
              </div>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-[#0D1F3C] text-white p-5 rounded-xl flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E7A3A]/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#27A84E] font-semibold mb-1">
                Total AUM Under Advisory
              </div>
              <div className="font-serif-title text-2xl font-bold text-white mb-4">
                ₹{totalAumCrores} Crores
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10">
                <div>
                  <div className="text-[10px] text-white/60 uppercase">Estimated Monthly Payout</div>
                  <div className="font-serif-title text-2xl font-bold text-[#27A84E]">
                    ₹{partnerMonthlyEarnings.toLocaleString("en-IN")} <span className="text-xs font-normal text-white/70">/ month</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-white/60 uppercase">Estimated Annual Earnings</div>
                  <div className="font-serif-title text-xl font-semibold text-[#C8963E]">
                    ₹{partnerAnnualEarnings.toLocaleString("en-IN")} <span className="text-xs font-normal text-white/70">/ year</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-[11px] text-white/70 mb-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#27A84E]" />
                <span>Includes research back-office & compliance support</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="w-full text-center text-xs font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white py-2.5 rounded-lg shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Apply for Sub-Broker Partnership →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
