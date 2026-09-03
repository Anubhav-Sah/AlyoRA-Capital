"use client";

import React, { useState } from "react";
import { X, CheckCircle, PhoneCall, Send, ShieldCheck } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Investment Advisory");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-gray-200 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#E8F5EC] rounded-xl text-[#1E7A3A]">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#0D1F3C]">
                  Book Free 30-Min Call
                </h3>
                <p className="text-xs text-gray-500">
                  Connect directly with an AlyoRA research analyst to discuss your goals.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0D1F3C] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#F7F8FA] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 focus:border-[#1E7A3A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0D1F3C] mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rajesh@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#F7F8FA] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 focus:border-[#1E7A3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0D1F3C] mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#F7F8FA] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 focus:border-[#1E7A3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D1F3C] mb-1">
                  Service of Interest
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F8FA] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 focus:border-[#1E7A3A]"
                >
                  <option value="Research Analysis">Research Analysis (Equities & Sectors)</option>
                  <option value="Investment Advisory">Investment Advisory (Custom Portfolio)</option>
                  <option value="Mutual Funds">Mutual Fund SIP & Portfolio Structuring</option>
                  <option value="Financial Planning">Goal-based Financial Planning</option>
                  <option value="Sub-Broker Service">Sub-Broker Partnership Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D1F3C] mb-1">
                  Message / Investment Goals (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details about your investment horizon, portfolio size, or questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#F7F8FA] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E7A3A]/30 focus:border-[#1E7A3A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-gray-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1E7A3A]" /> 100% Privacy Guaranteed
                </span>
                <span>No spam policy</span>
              </div>

              <button
                type="submit"
                className="w-full text-center text-xs font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white py-3 rounded-lg shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm & Schedule Free Call</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 animate-fade-in">
            <div className="w-14 h-14 bg-[#E8F5EC] text-[#1E7A3A] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#27A84E]" />
            </div>

            <h3 className="font-serif-title text-2xl font-bold text-[#0D1F3C] mb-2">
              Consultation Scheduled!
            </h3>
            <p className="text-xs text-gray-600 max-w-sm mx-auto mb-6 leading-relaxed">
              Thank you, <span className="font-semibold text-[#0D1F3C]">{name}</span>. An AlyoRA research partner will reach out to you via <span className="font-semibold">{phone}</span> within 24 business hours to confirm your consultation slot.
            </p>

            <button
              onClick={handleReset}
              className="text-xs font-semibold bg-[#0D1F3C] hover:bg-[#112540] text-white px-6 py-2.5 rounded-lg shadow cursor-pointer transition-colors"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
