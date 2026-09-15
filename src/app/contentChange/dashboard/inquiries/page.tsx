"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Clock,
  RefreshCw,
  Search,
  ExternalLink,
  Users,
  Eye,
  CheckCircle,
  ArrowLeft,
  Filter,
} from "lucide-react";

interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at?: string;
}

export default function InquiriesDashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.phone && inq.phone.includes(searchTerm)) ||
      (inq.message && inq.message.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSubject =
      selectedSubject === "All" || inq.subject === selectedSubject;

    return matchesSearch && matchesSubject;
  });

  const getWhatsAppReplyLink = (inquiry: Inquiry) => {
    const targetPhone = inquiry.phone
      ? inquiry.phone.replace(/[^0-9]/g, "")
      : "916389570522";
    const msg = encodeURIComponent(
      `Hello ${inquiry.name}, thank you for contacting AlyoRA Capital Research regarding "${inquiry.subject}". We are following up on your message.`
    );
    return `https://wa.me/${targetPhone}?text=${msg}`;
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/contentChange/dashboard"
              className="text-xs text-gray-500 hover:text-[#1E7A3A] flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-xs font-semibold text-[#1E7A3A]">Inquiries</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Client Inquiries &amp; Leads</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Real-time messages submitted by clients through the website contact forms.
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          disabled={loading}
          className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#1E7A3A]" : ""}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 text-[#1E7A3A] flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Inquiries</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">{inquiries.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#25D366] flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Direct WhatsApp Line</p>
            <p className="text-xs font-bold text-[#1E7A3A] mt-0.5">+91 6389570522</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Visitor Status</p>
            <p className="text-xs font-bold text-gray-800 mt-0.5">Active &amp; Monitored</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F8FA] border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E7A3A]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="text-xs bg-[#F7F8FA] border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#1E7A3A]"
          >
            <option value="All">All Inquiries</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Research Subscription">Research Subscription</option>
            <option value="Investment Advisory">Investment Advisory</option>
            <option value="Sub-Broker Partnership">Sub-Broker Partnership</option>
          </select>
        </div>
      </div>

      {/* Inquiries List */}
      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <div className="w-8 h-8 border-2 border-[#1E7A3A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-500">Loading incoming client messages...</p>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-gray-800 mb-1">No Inquiries Found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {searchTerm || selectedSubject !== "All"
              ? "No messages match your search filter."
              : "When clients submit the contact or consultation form, their details appear here instantly with one-click WhatsApp reply."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredInquiries.map((inq, idx) => (
            <div
              key={inq.id || `inq-${idx}`}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:border-[#1E7A3A]/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E8F5EC] text-[#1E7A3A] font-bold text-sm flex items-center justify-center">
                    {inq.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-gray-900">{inq.name}</h4>
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {inq.subject}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-0.5">
                      <a href={`mailto:${inq.email}`} className="hover:text-[#1E7A3A] flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span>{inq.email}</span>
                      </a>
                      {inq.phone && (
                        <a href={`tel:${inq.phone.replace(/[^0-9]/g, "")}`} className="hover:text-[#1E7A3A] flex items-center gap-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span>{inq.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <a
                    href={getWhatsAppReplyLink(inq)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#25D366] hover:bg-[#20BA5A] text-white px-3 py-1.5 rounded-lg shadow-sm transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Reply on WhatsApp</span>
                  </a>
                </div>
              </div>

              {inq.message && (
                <div className="bg-[#F7F8FA] rounded-lg p-3 text-xs text-gray-700 leading-relaxed">
                  <p className="font-semibold text-gray-500 text-[10px] uppercase tracking-wider mb-1">Message:</p>
                  <p>{inq.message}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-[10px] text-gray-400 mt-3 pt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{inq.created_at ? new Date(inq.created_at).toLocaleString("en-IN") : "Recent"}</span>
                </span>
                <span className="text-[#1E7A3A] font-semibold">● Logged to Backend</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* WhatsApp Delivery Note (Addressing PDF page 5) */}
      <div className="mt-8 bg-[#0D1F3C] rounded-xl p-5 text-white/80 text-xs leading-relaxed border border-white/10">
        <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
          <span>📲 How Leads &amp; Messages Work (PDF Page 5)</span>
        </h4>
        <p className="text-white/70 mb-2">
          Whenever a visitor submits an inquiry on the website:
        </p>
        <ul className="list-disc list-inside space-y-1 text-white/60">
          <li>The inquiry is immediately logged right here in your Admin CMP inbox.</li>
          <li>Click <strong className="text-[#25D366]">Reply on WhatsApp</strong> to chat with the client instantly from your phone or desktop.</li>
          <li>The client also gets a one-click button on screen to send their query directly to your WhatsApp desk (<strong className="text-white">+91 6389570522</strong> / <strong className="text-white">+91 6363765564</strong>).</li>
        </ul>
      </div>
    </div>
  );
}
