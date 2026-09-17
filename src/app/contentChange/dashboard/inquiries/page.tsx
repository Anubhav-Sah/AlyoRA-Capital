"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Mail,
  Phone,
  Clock,
  RefreshCw,
  Search,
  CheckCircle,
  ArrowLeft,
  Filter,
  Trash2,
  Check,
  AlertCircle,
} from "lucide-react";

interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status?: "pending" | "responded";
  created_at?: string;
}

export default function InquiriesDashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "responded">("all");
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [confirmDeleteKey, setConfirmDeleteKey] = useState<string | null>(null);

  const getInquiryKey = (inq: Inquiry) => {
    const emailStr = (inq.email || "").toLowerCase().trim();
    const subjStr = (inq.subject || "").trim();
    const timeStr = (inq.created_at || "").slice(0, 16);
    return `${emailStr}__${subjStr}__${timeStr}`;
  };

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

  const handleToggleStatus = async (inquiry: Inquiry) => {
    const targetKey = getInquiryKey(inquiry);
    const nextStatus = inquiry.status === "responded" ? "pending" : "responded";
    
    // Optimistic UI update
    setInquiries((prev) =>
      prev.map((item) =>
        getInquiryKey(item) === targetKey
          ? { ...item, status: nextStatus }
          : item
      )
    );

    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: inquiry.id,
          email: inquiry.email,
          subject: inquiry.subject,
          created_at: inquiry.created_at,
          status: nextStatus,
        }),
      });
      if (res.ok) {
        setActionNotice(
          nextStatus === "responded"
            ? `Marked inquiry from ${inquiry.name} as Responded.`
            : `Re-opened inquiry from ${inquiry.name} as Pending.`
        );
        setTimeout(() => setActionNotice(null), 4000);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (inquiry: Inquiry) => {
    const targetKey = getInquiryKey(inquiry);

    // Optimistic UI update
    setInquiries((prev) =>
      prev.filter((item) => getInquiryKey(item) !== targetKey)
    );
    setConfirmDeleteKey(null);

    setActionNotice(`Deleted inquiry from ${inquiry.name}.`);
    setTimeout(() => setActionNotice(null), 4000);

    try {
      await fetch("/api/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: inquiry.id,
          email: inquiry.email,
          subject: inquiry.subject,
          created_at: inquiry.created_at,
        }),
      });
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };


  const pendingCount = inquiries.filter((i) => i.status !== "responded").length;
  const respondedCount = inquiries.filter((i) => i.status === "responded").length;

  const filteredInquiries = inquiries.filter((inq) => {
    // Status tab filter
    if (statusFilter === "pending" && inq.status === "responded") return false;
    if (statusFilter === "responded" && inq.status !== "responded") return false;

    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.phone && inq.phone.includes(searchTerm)) ||
      (inq.message && inq.message.toLowerCase().includes(searchTerm.toLowerCase()));

    const subLower = (inq.subject || "").toLowerCase();
    const selLower = selectedSubject.toLowerCase();

    const matchesSubject =
      selectedSubject === "All" ||
      inq.subject === selectedSubject ||
      (selectedSubject === "Consultations" &&
        (subLower.includes("consultation") || subLower.includes("book") || subLower.includes("call"))) ||
      (selectedSubject === "Research Subscription" &&
        (subLower.includes("research") || subLower.includes("subscription"))) ||
      (selectedSubject === "Investment Advisory" &&
        (subLower.includes("investment") || subLower.includes("advisory") || subLower.includes("portfolio"))) ||
      (selectedSubject === "General Inquiry" &&
        (subLower.includes("general") || subLower.includes("inquiry"))) ||
      subLower.includes(selLower);

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
          <h1 className="text-2xl font-bold text-gray-900">Client Inquiries &amp; Leads Inbox</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Manage incoming consultation calls, research leads, and direct client inquiries.
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

      {/* Action Notification Banner */}
      {actionNotice && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium px-4 py-3 rounded-lg flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-xs font-bold text-emerald-700 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Inquiries</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">{inquiries.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pending Action</p>
            <p className="text-xl font-bold text-amber-600 mt-0.5">{pendingCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#1E7A3A] flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Responded Leads</p>
            <p className="text-xl font-bold text-[#1E7A3A] mt-0.5">{respondedCount}</p>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            statusFilter === "all"
              ? "bg-[#0D1F3C] text-white shadow-sm"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          All Inquiries ({inquiries.length})
        </button>

        <button
          onClick={() => setStatusFilter("pending")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            statusFilter === "pending"
              ? "bg-amber-600 text-white shadow-sm"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          Pending Leads ({pendingCount})
        </button>

        <button
          onClick={() => setStatusFilter("responded")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            statusFilter === "responded"
              ? "bg-[#1E7A3A] text-white shadow-sm"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          Responded ({respondedCount})
        </button>
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
            <option value="All">All Topics &amp; Services ({inquiries.length})</option>
            <option value="Consultations">Advisory Consultation Calls</option>
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
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-3">
            {searchTerm || selectedSubject !== "All" || statusFilter !== "all"
              ? `No messages match your active search / status filter.`
              : "When clients submit the contact or consultation form, their details appear here instantly with one-click WhatsApp reply."}
          </p>
          {(inquiries.length > 0 || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSelectedSubject("All");
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="px-4 py-2 bg-[#1E7A3A] hover:bg-[#165B2B] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Reset Filters &amp; Show All ({inquiries.length}) Inquiries
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredInquiries.map((inq, idx) => (
            <div
              key={inq.id || `inq-${idx}`}
              className={`bg-white rounded-xl border p-5 shadow-sm transition-all ${
                inq.status === "responded"
                  ? "border-gray-200 opacity-90"
                  : "border-amber-200/80 bg-amber-50/10 hover:border-[#1E7A3A]/40"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center ${
                      inq.status === "responded"
                        ? "bg-green-100 text-[#1E7A3A]"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {inq.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-gray-900">{inq.name}</h4>
                      
                      {/* Subject Badge */}
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {inq.subject}
                      </span>

                      {/* Status Tag */}
                      {inq.status === "responded" ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-600" /> Responded
                        </span>
                      ) : (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-600" /> Pending Lead
                        </span>
                      )}
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

                {/* Actions Row */}
                <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
                  {/* WhatsApp Link */}
                  <a
                    href={getWhatsAppReplyLink(inq)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#25D366] hover:bg-[#20BA5A] text-white px-3 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Reply on WhatsApp</span>
                  </a>

                  {/* Mark Responded Toggle Button */}
                  <button
                    onClick={() => handleToggleStatus(inq)}
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      inq.status === "responded"
                        ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
                        : "bg-emerald-50 hover:bg-emerald-100 text-[#1E7A3A] border-emerald-200"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{inq.status === "responded" ? "Mark Pending" : "Mark Responded"}</span>
                  </button>

                  {/* Delete Button */}
                  {confirmDeleteKey === getInquiryKey(inq) ? (
                    <div className="flex items-center gap-1 animate-fade-in">
                      <button
                        onClick={() => handleDelete(inq)}
                        className="text-xs font-semibold bg-red-600 hover:bg-red-700 text-white px-2.5 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setConfirmDeleteKey(null)}
                        className="text-xs text-gray-500 hover:text-gray-700 px-1.5 py-1 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteKey(getInquiryKey(inq))}
                      title="Delete Inquiry"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  )}

                </div>
              </div>

              {inq.message && (
                <div className="bg-[#F7F8FA] rounded-lg p-3 text-xs text-gray-700 leading-relaxed">
                  <p className="font-semibold text-gray-500 text-[10px] uppercase tracking-wider mb-1">Message:</p>
                  <p>{inq.message}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-[10px] text-gray-400 mt-3 pt-2 border-t border-gray-50">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{inq.created_at ? new Date(inq.created_at).toLocaleString("en-IN") : "Recent"}</span>
                </span>
                <span className="text-[#1E7A3A] font-semibold">● Logged &amp; Synced</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* WhatsApp Delivery Note */}
      <div className="mt-8 bg-[#0D1F3C] rounded-xl p-5 text-white/80 text-xs leading-relaxed border border-white/10">
        <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
          <span>📲 Managing Client Inquiries &amp; Bookings</span>
        </h4>
        <p className="text-white/70 mb-2">
          Use the action buttons next to each lead to maintain a clean workspace:
        </p>
        <ul className="list-disc list-inside space-y-1 text-white/60">
          <li><strong className="text-[#25D366]">Reply on WhatsApp</strong>: Open direct chat with the client to follow up.</li>
          <li><strong className="text-white">Mark Responded</strong>: Mark a lead as actioned so it highlights in green. Filter by "Pending Leads" to focus on new requests.</li>
          <li><strong className="text-red-400">Delete Inquiry</strong>: Permanently remove test or completed inquiries.</li>
        </ul>
      </div>
    </div>
  );
}
