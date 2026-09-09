"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import {
  TrendingUp,
  Lightbulb,
  Building2,
  FileSpreadsheet,
  Users,
  Briefcase,
  CheckCircle2,
  PhoneCall,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Calculator,
} from "lucide-react";
import { notFound, useParams } from "next/navigation";

interface FAQ {
  q: string;
  a: string;
}

interface ServicePageData {
  id: string;
  title: string;
  tagline: string;
  shortDesc: string;
  icon: React.ElementType;
  color: string;
  fullDesc: string[];
  deliverables: string[];
  idealFor: string[];
  methodology: string[];
  faqs: FAQ[];
  ctaText: string;
}

const servicesMap: Record<string, ServicePageData> = {
  "research-analysis": {
    id: "research-analysis",
    title: "Research Analysis",
    tagline: "Institutional-grade equity & sector research for every investor.",
    shortDesc: "In-depth equity & sector reports backed by rigorous analysis.",
    icon: TrendingUp,
    color: "#1E7A3A",
    fullDesc: [
      "Our Research Analysis division delivers institutional-grade reports on Indian equities, macroeconomic trends, and high-growth sectors. We combine rigorous DCF valuation, earnings momentum modeling, and technical entry points to give you a complete picture.",
      "Every report is built from first-principles analysis — no broker-influenced recommendations, no third-party data reselling. You receive our actual proprietary models, not summaries of someone else's research.",
    ],
    deliverables: [
      "Weekly Nifty 50 & Bank Nifty Technical Outlook",
      "Quarterly Earnings Deep-Dives & Valuation Models",
      "Small-cap & Mid-cap Multi-bagger Discovery Reports",
      "Sectoral Rotation & Macro Insight Bulletins",
      "Real-time Entry & Exit Alerts on WhatsApp",
      "Monthly Equity Research Summary Report",
    ],
    idealFor: [
      "Active stock market investors & swing traders",
      "Portfolio managers seeking independent validation",
      "High-net-worth investors building long-term portfolios",
      "Professionals who want actionable weekly market views",
    ],
    methodology: [
      "5-year DCF & Earnings Momentum Valuation",
      "Technical Analysis — Elliot Wave, Fibonacci, and Volume Profile",
      "FII / DII Institutional Flow Analysis",
      "Options Chain Sentiment & Put-Call Ratio Tracking",
      "Quarterly Earnings Transcript & Concall Analysis",
    ],
    faqs: [
      {
        q: "How are your research reports different from broker research?",
        a: "Broker research is often influenced by distribution incentives and IPO mandates. Our research is 100% subscription-funded — we have zero incentive to push any stock for non-analytical reasons.",
      },
      {
        q: "How frequently are reports delivered?",
        a: "Weekly technical outlook reports are delivered every Sunday by 8:00 PM IST. Earnings deep-dives are released within 48 hours of results. Real-time alerts go out via WhatsApp.",
      },
      {
        q: "Can I access all reports across tiers?",
        a: "Deep-dive stock reports are gated by plan tier. Elite and above plans receive comprehensive monthly equity research reports. All subscribers get weekly Nifty/Bank Nifty outlooks.",
      },
    ],
    ctaText: "Inquire About Research Plans",
  },
  "investment-advisory": {
    id: "investment-advisory",
    title: "Investment Advisory",
    tagline: "Personalised strategies aligned with your risk profile and goals.",
    shortDesc: "Bespoke portfolio management and investment advisory.",
    icon: Lightbulb,
    color: "#C8963E",
    fullDesc: [
      "Bespoke portfolio management and investment advisory tailored specifically to your financial risk appetite, capital allocation goals, and time horizon. Receive direct buy/hold/sell recommendations from our senior analysts.",
      "Unlike generic robo-advisors, our advisory begins with a structured risk assessment and goal-mapping session. Every recommendation is backed by a documented rationale tied to your specific financial situation.",
    ],
    deliverables: [
      "Customised Equity & Asset Allocation Strategy",
      "Direct Analyst Access & One-on-One Portfolio Reviews",
      "Risk Mitigation & Stop-loss Management Framework",
      "Real-time WhatsApp Trade Alerts with Entry/Exit/SL",
      "Quarterly Portfolio Performance Review Reports",
      "Tax Efficiency Planning on Equity Gains",
    ],
    idealFor: [
      "HNI investors with ₹25L+ in market capital",
      "Busy professionals who lack time for active management",
      "Investors who want a structured second opinion",
      "Wealth builders planning for retirement corpus",
    ],
    methodology: [
      "Risk Profiling & Financial Goal Mapping",
      "Core-Satellite Portfolio Construction",
      "Factor-based Stock Selection (Quality + Value + Momentum)",
      "Trailing Stop-loss & Risk-Reward Discipline",
      "Regular Rebalancing Based on Market Conditions",
    ],
    faqs: [
      {
        q: "What is the minimum portfolio size you advise on?",
        a: "We work with portfolios starting at ₹5 lakhs for standard advisory. For dedicated 1-on-1 senior analyst access (Pinnacle plan), we recommend ₹25 lakhs and above for optimal strategy impact.",
      },
      {
        q: "Do you have SEBI registration for investment advisory?",
        a: "AlyoRA Capital Research operates under SEBI's research analyst framework. Our advisory is research-backed with full disclosure of our methodology and conflict-of-interest policies.",
      },
      {
        q: "How quickly do I receive alerts?",
        a: "All alerts are delivered in real-time via WhatsApp Business. Pre-market alerts are sent by 8:45 AM IST and intraday calls go out as conditions develop.",
      },
    ],
    ctaText: "Book Advisory Consultation",
  },
  "mutual-funds": {
    id: "mutual-funds",
    title: "Mutual Funds",
    tagline: "Curated fund portfolios optimised for risk-adjusted CAGR.",
    shortDesc: "Curated mutual fund portfolios across equity & debt.",
    icon: Building2,
    color: "#1E7A3A",
    fullDesc: [
      "Avoid fund overlap and high-expense ratios. We curate optimal mutual fund portfolios across Large-Cap, Flexi-Cap, Mid-Cap, Small-Cap, and Debt schemes to maximise risk-adjusted CAGR returns.",
      "Our fund selection process screens across 1,200+ schemes using rolling return consistency, manager track record, alpha generation, and expense ratio benchmarking. We don't recommend funds based on AUM or distributor commissions.",
    ],
    deliverables: [
      "SIP & Lumpsum Portfolio Structuring by Goal",
      "Rolling Return & Alpha/Beta Risk Analysis",
      "Tax-saving ELSS Mutual Fund Planning",
      "Automated Quarterly Portfolio Rebalancing Advisory",
      "Debt vs. Equity Allocation Based on Market Cycles",
      "Fund Overlap Analysis & Consolidation Advice",
    ],
    idealFor: [
      "Long-term wealth accumulators running SIPs",
      "Investors who want equity exposure with managed risk",
      "Tax-savers looking for ELSS-efficient portfolios",
      "Retirees seeking hybrid debt-equity income strategies",
    ],
    methodology: [
      "10-Year Rolling Return Consistency Screening",
      "Sharpe Ratio & Sortino Ratio Risk-Adjusted Performance",
      "Fund Manager Track Record & AUM Stability Analysis",
      "Expense Ratio Benchmarking (Direct vs Regular)",
      "Portfolio Overlap Check Across All Recommended Funds",
    ],
    faqs: [
      {
        q: "Should I invest in Direct or Regular plans?",
        a: "We always recommend Direct plans to avoid the distributor commission drag of 0.5%–1% on returns. Over a 20-year SIP, this difference compounds to lakhs in additional wealth.",
      },
      {
        q: "How many funds should my portfolio have?",
        a: "We typically recommend 4–6 funds for most investors. Over-diversification beyond this creates overlap without additional risk reduction. Quality beats quantity in fund selection.",
      },
      {
        q: "Is this service free?",
        a: "Our Mutual Fund Planning service is available as a standalone free consultation. Ongoing portfolio tracking and quarterly rebalancing advisory is included in our subscription plans.",
      },
    ],
    ctaText: "Get Fund Portfolio Review",
  },
  "sub-broker": {
    id: "sub-broker",
    title: "Sub-Broker Program",
    tagline: "Build your own financial advisory practice backed by AlyoRA research.",
    shortDesc: "Partner with AlyoRA and earn from your network.",
    icon: Users,
    color: "#0D1F3C",
    fullDesc: [
      "AlyoRA Capital Research's Sub-Broker Program empowers financial professionals, retired bankers, CA students, and motivated individuals to build a sustainable income stream by distributing our research subscriptions and advisory services.",
      "You focus on client relationships and referrals — we provide the backend research, compliance framework, marketing collateral, and a structured commission structure that grows with your network.",
    ],
    deliverables: [
      "Tiered commission structure on every subscription sold",
      "Dedicated sub-broker onboarding & training program",
      "Branded marketing collateral & pitch decks",
      "Real-time commission dashboard & tracking portal",
      "Monthly performance bonus for top sub-brokers",
      "Co-branded client newsletters & research samples",
    ],
    idealFor: [
      "Financial professionals & relationship managers",
      "Retired bankers and insurance agents",
      "CA / CFA students looking for practice income",
      "Motivated individuals with strong financial networks",
    ],
    methodology: [
      "Transparent Commission Structure (No Hidden Deductions)",
      "Monthly Payout Cycle with Detailed Statements",
      "Client Retention Tracking & Renewal Incentives",
      "Performance Tiers — Bronze, Silver, Gold, Platinum",
      "Digital Referral Links with Conversion Attribution",
    ],
    faqs: [
      {
        q: "What is the commission structure?",
        a: "Sub-brokers earn 20%–35% commission on each subscription plan they successfully onboard. Higher tiers (Gold, Platinum) unlock additional performance bonuses and renewal incentives.",
      },
      {
        q: "Is there a registration fee to join?",
        a: "There is no upfront registration fee. We charge zero cost to become a sub-broker. You earn from Day 1 of your first successful referral conversion.",
      },
      {
        q: "How are clients managed after I refer them?",
        a: "Once a client is onboarded under your referral, we handle all research delivery, support, and renewals. You continue earning renewal commissions as long as the client remains subscribed.",
      },
    ],
    ctaText: "Join Sub-Broker Program",
  },
  "financial-planning": {
    id: "financial-planning",
    title: "Financial Planning",
    tagline: "Goal-based planning for wealth creation & tax optimisation.",
    shortDesc: "A comprehensive financial roadmap for your life goals.",
    icon: FileSpreadsheet,
    color: "#1E7A3A",
    fullDesc: [
      "A comprehensive financial roadmap covering emergency funds, insurance adequacy, retirement planning, child education funding, and legal estate structuring under SEBI framework compliance.",
      "Financial planning is not a one-time event — it is an ongoing discipline. Our approach provides you with a living plan that adapts to life changes, market conditions, and evolving financial goals.",
    ],
    deliverables: [
      "Retirement Corpus Projection & FIRE Strategy Roadmap",
      "Tax Optimisation Under New & Old Tax Regimes",
      "Life & Health Insurance Coverage Adequacy Audit",
      "Goal-based Asset-Liability Matching",
      "Child Education & Marriage Fund Planning",
      "Emergency Fund Sizing & Liquidity Strategy",
    ],
    idealFor: [
      "Families planning for multiple financial goals",
      "Salaried professionals approaching retirement",
      "Business owners seeking structured personal finance",
      "Couples planning for child education funding",
    ],
    methodology: [
      "Net Worth & Cash-flow Assessment",
      "Goal Prioritisation Matrix (Urgency vs Impact)",
      "Monte Carlo Retirement Simulation",
      "Tax-efficient Instrument Selection",
      "Insurance Gap Analysis (Term, Health, Critical Illness)",
    ],
    faqs: [
      {
        q: "How is financial planning billed?",
        a: "Financial Planning sessions are available as standalone ₹1,999/slot engagements. Comprehensive annual planning with quarterly reviews is included in Elite and above subscription plans.",
      },
      {
        q: "Will you tell me which specific instruments to buy?",
        a: "Yes. We provide specific fund names, plan types, and instrument categories as part of every planning session — not vague generic advice.",
      },
      {
        q: "Do you handle tax filing?",
        a: "We provide tax planning guidance and optimisation strategy. Actual filing is recommended through a qualified CA — we can refer you to our network of chartered accountants.",
      },
    ],
    ctaText: "Book Planning Session",
  },
  "business-consulting": {
    id: "business-consulting",
    title: "Business Consulting",
    tagline: "Growth advisory & financial planning for founders and SMEs.",
    shortDesc: "Institutional-grade strategy frameworks for your business.",
    icon: Briefcase,
    color: "#0D1F3C",
    fullDesc: [
      "Partner with AlyoRA Capital Research to build, run, and scale your business with confidence — backed by institutional-grade financial research, structured strategy frameworks, and hands-on planning support.",
      "From first-time founders to established businesses facing growth roadblocks, we help you turn financial data into clear, actionable decisions. Our consulting is practical — not theoretical frameworks that gather dust.",
    ],
    deliverables: [
      "Financial Planning & Budgeting with Cash-flow Forecasts",
      "Business Strategy & Growth Planning with Milestone Roadmaps",
      "Startup Advisory & Business Model Validation",
      "Business Health Diagnostics & Cost Leakage Audits",
      "Expansion & Scaling Feasibility Studies",
      "Investment & Capital Structuring Guidance",
    ],
    idealFor: [
      "First-time founders launching a new venture",
      "Small business owners facing growth challenges",
      "Businesses planning expansion into new markets",
      "Owners wanting a financial second opinion",
    ],
    methodology: [
      "Financial Statement Analysis & Margin Review",
      "DCF-based Business Valuation",
      "Competitor Positioning & Market Sizing",
      "Unit Economics & Break-even Modeling",
      "Risk Mapping & Mitigation Planning",
    ],
    faqs: [
      {
        q: "Is there a minimum engagement size?",
        a: "We work with businesses of all sizes. Our entry-point is a free 20-minute strategy call to assess fit. Engagements are structured per project or on a monthly retainer basis.",
      },
      {
        q: "How long does a typical consulting engagement last?",
        a: "Initial diagnostic engagements typically take 2–3 weeks. Ongoing strategy retainers are monthly with regular check-ins. Project-based work (e.g., expansion planning) is scoped individually.",
      },
      {
        q: "Do you work with funded startups?",
        a: "Yes. We work with bootstrapped and funded ventures. For funded startups, we provide investor-readiness support, pitch financial modeling, and post-funding capital allocation planning.",
      },
    ],
    ctaText: "Book Free Strategy Call",
  },
};

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-white hover:bg-[#F7F8FA] transition-colors cursor-pointer"
      >
        <span className="text-sm font-semibold text-[#0D1F3C] pr-4">{faq.q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#1E7A3A] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 sm:px-5 pb-4 bg-[#F7F8FA] text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
          <div className="pt-3">{faq.a}</div>
        </div>
      )}
    </div>
  );
}

export default function ServiceSlugPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug as string;
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [showCalc, setShowCalc] = useState(false);

  const service = servicesMap[slug];
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="flex-grow">
        {/* Hero */}
        <section
          className="text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, #0D1F3C 60%, ${service.color}33 100%)` }}
        >
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20" style={{ background: service.color }} />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-[#27A84E] mb-4">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:underline">Services</Link>
              <span>/</span>
              <span className="text-white/70">{service.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: service.color }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#27A84E]">
                    AlyoRA Capital Research
                  </div>
                </div>

                <h1 className="font-serif-title text-3xl sm:text-5xl font-bold tracking-tight mb-3 leading-tight">
                  {service.title}
                </h1>
                <p className="text-sm sm:text-lg text-white/80 mb-2 font-light italic">
                  "{service.tagline}"
                </p>
                <p className="text-xs sm:text-base text-white/70 max-w-2xl leading-relaxed mb-6">
                  {service.fullDesc[0]}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsConsultationOpen(true)}
                    className="flex items-center gap-2 text-xs sm:text-sm font-semibold bg-[#1E7A3A] hover:bg-[#27A84E] text-white px-5 py-2.5 rounded-lg shadow-lg cursor-pointer transition-colors"
                  >
                    <PhoneCall className="w-4 h-4" />
                    {service.ctaText}
                  </button>
                  {service.id === "sub-broker" && (
                    <button
                      onClick={() => setShowCalc(true)}
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg border border-white/30 cursor-pointer transition-colors"
                    >
                      Revenue Calculator →
                    </button>
                  )}
                  {service.id === "business-consulting" && (
                    <Link
                      href="/business-consulting"
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg border border-white/30 cursor-pointer transition-colors"
                    >
                      Full Consulting Hub →
                    </Link>
                  )}
                </div>
              </div>

              {/* Stats Card */}
              <div className="lg:col-span-4 hidden lg:flex flex-col gap-3">
                {service.idealFor.slice(0, 3).map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-3.5 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#27A84E] flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left — Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Full Description */}
              {service.fullDesc.length > 1 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif-title text-xl font-bold text-[#0D1F3C] mb-3">About This Service</h2>
                  <div className="space-y-3">
                    {service.fullDesc.map((para, i) => (
                      <p key={i} className="text-sm text-gray-600 leading-relaxed">{para}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Deliverables */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="font-serif-title text-xl font-bold text-[#0D1F3C] mb-4">
                  Key Deliverables & Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.deliverables.map((d, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-[#F7F8FA] border border-gray-100 rounded-lg p-3">
                      <CheckCircle2 className="w-4 h-4 text-[#27A84E] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700 leading-snug">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Methodology */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="font-serif-title text-xl font-bold text-[#0D1F3C] mb-4">
                  Our Methodology
                </h2>
                <ol className="space-y-3">
                  {service.methodology.map((m, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5"
                        style={{ background: service.color }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-sm text-gray-700 leading-snug pt-0.5">{m}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Sub-broker Calculator */}
              {service.id === "sub-broker" && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif-title text-xl font-bold text-[#0D1F3C] mb-4">
                    Revenue Potential Calculator
                  </h2>
                  <p className="text-xs text-gray-500 mb-4">Estimate your monthly earnings as an AlyoRA Sub-Broker based on your network size and conversion rate.</p>
                  <SubBrokerCalculator />
                </div>
              )}

              {/* FAQs */}
              <div>
                <h2 className="font-serif-title text-xl font-bold text-[#0D1F3C] mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, i) => (
                    <FAQItem key={i} faq={faq} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-5">
              {/* Ideal For */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-serif-title text-base font-bold text-[#0D1F3C] mb-3">
                  Ideal For
                </h3>
                <ul className="space-y-2">
                  {service.idealFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#27A84E] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Card */}
              <div
                className="rounded-2xl p-5 text-white shadow-lg"
                style={{ background: `linear-gradient(135deg, ${service.color}, #0D1F3C)` }}
              >
                <h3 className="font-serif-title text-base font-bold mb-2">
                  Ready to get started?
                </h3>
                <p className="text-xs text-white/80 mb-4 leading-relaxed">
                  Book a free consultation and our team will guide you through the right plan for your goals.
                </p>
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="w-full text-center text-xs font-semibold bg-white text-[#0D1F3C] py-2.5 rounded-lg shadow cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  {service.ctaText}
                </button>
              </div>

              {/* Back to Services */}
              <Link
                href="/services"
                className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-[#1E7A3A] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to all services
              </Link>

              {/* Other Services */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-serif-title text-sm font-bold text-[#0D1F3C] mb-3">
                  Explore Other Services
                </h3>
                <ul className="space-y-2">
                  {Object.values(servicesMap)
                    .filter((s) => s.id !== service.id)
                    .map((s) => (
                      <li key={s.id}>
                        <Link
                          href={`/services/${s.id}`}
                          className="text-xs text-[#1E7A3A] hover:underline flex items-center gap-1.5"
                        >
                          <span>→</span>
                          {s.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />
    </div>
  );
}
