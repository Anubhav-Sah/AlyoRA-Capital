-- ============================================================
-- AlyoRA Capital Research — Comprehensive Content Seed
-- ============================================================

-- 1. PAGE SECTIONS
INSERT INTO public.page_sections (page, section_id, title, visible, position) VALUES
-- Home
('home', 'hero', 'Hero Section', true, 0),
('home', 'stats', 'Stats Bar', true, 1),
('home', 'services', 'Services Overview', true, 2),
('home', 'why-us', 'Why AlyoRA Trust Pillars', true, 3),
('home', 'reports-preview', 'Latest Published Reports', true, 4),
('home', 'pricing-preview', 'Advisory Plans Preview', true, 5),
('home', 'cta', 'Call To Action Banner', true, 6),

-- About
('about', 'hero', 'Hero / Mission Statement', true, 0),
('about', 'mission', 'Mission & Vision', true, 1),
('about', 'values', 'Core Values & Pillars', true, 2),
('about', 'team', 'Leadership & Analysts', true, 3),
('about', 'stats', 'Stats & Achievements', true, 4),

-- Services
('services', 'hero', 'Services Hero', true, 0),
('services', 'main-cards', 'All Advisory Services', true, 1),
('services', 'sub-broker', 'Sub-Broker Partner Network', true, 2),
('services', 'cta', 'Services CTA Banner', true, 3),

-- Reports
('reports', 'hero', 'Reports Hero', true, 0),
('reports', 'main', 'Published Research Reports', true, 1),
('reports', 'cta', 'Reports CTA Banner', true, 2),

-- Business Consulting
('business-consulting', 'hero', 'Business Consulting Hero', true, 0),
('business-consulting', 'packages', 'Strategic Consulting Packages', true, 1),
('business-consulting', 'process', 'How We Work Together', true, 2),
('business-consulting', 'cta', 'Consulting CTA Banner', true, 3),

-- Pricing
('pricing', 'hero', 'Pricing Hero', true, 0),
('pricing', 'plans', '5-Stage Staircase Pricing', true, 1),
('pricing', 'standalone', 'Standalone Services', true, 2),
('pricing', 'faq', 'Frequently Asked Questions', true, 3),

-- Contact
('contact', 'hero', 'Contact Hero', true, 0),
('contact', 'info', 'Contact Info Cards', true, 1),
('contact', 'form', 'Consultation Request Form', true, 2),

-- Navbar & Footer
('navbar', 'nav-links', 'Navigation Links', true, 0),
('navbar', 'footer-col1', 'Footer Services Column', true, 1),
('navbar', 'footer-col2', 'Footer Company Column', true, 2),
('navbar', 'footer-col3', 'Footer Contact Column', true, 3)
ON CONFLICT (page, section_id) DO UPDATE SET
  title = EXCLUDED.title,
  visible = EXCLUDED.visible,
  position = EXCLUDED.position;

-- 2. SITE CONTENT (Key-Value Content Store)
INSERT INTO public.site_content (page, section, key, type, value) VALUES
-- Branding & Navbar
('navbar', 'brand', 'name', 'text', 'AlyoRA Capital Research'),
('navbar', 'brand', 'tagline', 'text', 'Insights · Strategy · Growth'),
('navbar', 'nav-links', 'items', 'text', '[{"name":"Home","href":"/"},{"name":"About","href":"/about"},{"name":"Services","href":"/services"},{"name":"Reports","href":"/reports"},{"name":"Business Consulting","href":"/business-consulting"},{"name":"Pricing","href":"/pricing"},{"name":"Contact","href":"/contact"}]'),

-- Home Hero
('home', 'hero', 'eyebrow', 'text', 'Insights · Strategy · Growth'),
('home', 'hero', 'heading', 'text', 'AlyoRA Capital Research'),
('home', 'hero', 'tagline', 'text', 'Where Research Meets Returns'),
('home', 'hero', 'description', 'text', 'SEBI-aligned institutional precision for active traders, high-net-worth individuals, and long-term portfolio builders in Indian capital markets.'),
('home', 'hero', 'cta_primary_label', 'text', 'Explore Services'),
('home', 'hero', 'cta_primary_url', 'text', '/services'),
('home', 'hero', 'cta_secondary_label', 'text', 'View Reports'),
('home', 'hero', 'cta_secondary_url', 'text', '/reports'),
('home', 'hero', 'cta_tertiary_label', 'text', 'Book Consultation'),

-- Home Stats
('home', 'stats', 'stat1_val', 'text', '₹250Cr+'),
('home', 'stats', 'stat1_label', 'text', 'Client Assets Monitored'),
('home', 'stats', 'stat2_val', 'text', '18.4%'),
('home', 'stats', 'stat2_label', 'text', 'Historical 3-Yr CAGR'),
('home', 'stats', 'stat3_val', 'text', '3,200+'),
('home', 'stats', 'stat3_label', 'text', 'Active Investors'),
('home', 'stats', 'stat4_val', 'text', '98.2%'),
('home', 'stats', 'stat4_label', 'text', 'Client Retention Rate'),

-- Home Services Overview
('home', 'services', 'heading', 'text', 'Institutional Research & Advisory Solutions'),
('home', 'services', 'subheading', 'text', 'Tailored strategies engineered to protect capital and accelerate wealth in Indian equities.'),

-- Home Why Us
('home', 'why-us', 'heading', 'text', 'The AlyoRA Difference'),
('home', 'why-us', 'subheading', 'text', 'Four core pillars that set our research desk apart from traditional commission-driven brokers.'),

-- Home CTA Banner
('home', 'cta', 'heading', 'text', 'Ready to Upgrade Your Investment Strategy?'),
('home', 'cta', 'subheading', 'text', 'Schedule a complimentary 30-minute portfolio review with our lead research analysts today.'),

-- About Page
('about', 'hero', 'heading', 'text', 'About AlyoRA Capital Research'),
('about', 'hero', 'subheading', 'text', 'Built on Data. Driven by Integrity.'),
('about', 'hero', 'description', 'text', 'We are an independent equity research and investment advisory firm dedicated to bringing institutional-grade market clarity to retail and high-net-worth investors.'),
('about', 'mission', 'heading', 'text', 'Our Mission & Commitment'),
('about', 'mission', 'description', 'text', 'Founded in 2021, AlyoRA Capital Research was established to address a critical market need: unbiased, non-commission-driven financial analysis for retail and HNI investors in India.'),

-- Services Page
('services', 'hero', 'heading', 'text', 'Core Advisory & Research Services'),
('services', 'hero', 'subheading', 'text', 'Comprehensive wealth, equity research, and advisory services.'),
('services', 'hero', 'description', 'text', 'Explore our full suite of equity research, wealth advisory, mutual fund portfolio management, and sub-broker partnership programs.'),

-- Reports Page
('reports', 'hero', 'heading', 'text', 'Research Reports & Deep Dives'),
('reports', 'hero', 'subheading', 'text', 'Institutional market intelligence delivered weekly.'),
('reports', 'hero', 'description', 'text', 'Access our library of technical outlooks, mutual fund SIP screeners, and institutional-grade equity valuation reports.'),

-- Business Consulting Page
('business-consulting', 'hero', 'heading', 'text', 'Business Consulting & Strategic Growth'),
('business-consulting', 'hero', 'subheading', 'text', 'Practical, high-impact consulting for SMEs, growth ventures, and corporate founders.'),
('business-consulting', 'hero', 'description', 'text', 'We partner with ambitious businesses to build robust financial models, optimize cost structures, and navigate strategic milestones.'),

-- Pricing Page
('pricing', 'hero', 'heading', 'text', 'Advisory Plans & Staircase Tiers'),
('pricing', 'hero', 'subheading', 'text', 'Transparent, milestone-based tiers for every investor.'),
('pricing', 'hero', 'description', 'text', 'Five stages. One climb toward sharper trading and investing. Pick the stage that matches where you are today.'),

-- Contact Page
('contact', 'hero', 'heading', 'text', 'Get in Touch with Our Research Desk'),
('contact', 'hero', 'subheading', 'text', 'Direct analytical access for investors and business partners.'),
('contact', 'hero', 'description', 'text', 'Have questions regarding our research reports, advisory plans, or sub-broker program? Reach out to our analytical team directly.'),
('contact', 'info', 'email', 'text', 'info@alyoracapital.com'),
('contact', 'info', 'phone', 'text', '+91 98765 43210'),
('contact', 'info', 'address', 'text', 'Financial District, Bandra-Kurla Complex, Mumbai, MH - 400051'),
('contact', 'info', 'hours', 'text', 'Mon - Fri: 9:00 AM - 6:00 PM IST')
ON CONFLICT (page, section, key) DO UPDATE SET
  type = EXCLUDED.type,
  value = EXCLUDED.value;

-- 3. PAGE CARDS (Structured Components)
-- Clean existing default cards if re-seeding
DELETE FROM public.page_cards WHERE page IN ('services', 'reports', 'business-consulting', 'pricing', 'about', 'contact');

INSERT INTO public.page_cards (page, section, position, title, subtitle, description, image_url, button_label, button_url, badge, visible, extra_data) VALUES
-- Services Cards
('services', 'main-cards', 0, 'Research Analysis', 'In-depth equity & sector reports backed by research.', 'Our Research Analysis division delivers institutional-grade reports on Indian equities, macroeconomic trends, and high-growth sectors. We combine rigorous DCF valuation, earnings momentum modeling, and technical entry points.', '/images/research-analysis.jpg', 'View Sample Reports', '/reports', 'Flagship', true, '{"features":["Weekly Nifty 50 & Bank Nifty Technical Outlook","Quarterly Earnings Deep-Dives & Valuation Models","Small-cap & Mid-cap Multi-bagger Discovery","Sectoral Rotation & Macro Insight Bulletins"],"idealFor":"Active stock market investors, swing traders & portfolio managers","color":"#1E7A3A"}'),
('services', 'main-cards', 1, 'Investment Advisory', 'Personalised investment strategies aligned with risk.', 'Receive tailored equity and debt allocation advice customized to your financial horizon and drawdown tolerance. We construct resilient portfolios designed to outperform the Nifty 50 across market cycles.', '/images/investment-advisory.jpg', 'Book Advisory Call', '/contact', 'Advisory', true, '{"features":["Custom Portfolio Construction & Rebalancing","Real-time Risk-adjusted Position Sizing","Direct Access to Lead Analyst via WhatsApp Desk","Monthly Performance & Drawdown Audits"],"idealFor":"High-Net-Worth Individuals (HNIs) & Busy Professionals","color":"#C8963E"}'),
('services', 'main-cards', 2, 'Mutual Funds & Wealth', 'Goal-oriented mutual fund selection & SIP planning.', 'Navigate 2,500+ mutual fund schemes with quantitative screening. We evaluate fund manager pedigree, rolling alpha, downside capture ratio, and portfolio overlap to assemble superior SIP and lumpsum baskets.', '/images/mutual-funds.jpg', 'Review My Portfolio', '/contact', 'Wealth', true, '{"features":["Rolling Return & Alpha Benchmark Screening","Portfolio Overlap Elimination Analysis","Goal-mapped SIP Allocation (Retirement, Education)","Direct Mutual Fund Conversion Guidance"],"idealFor":"Salaried professionals, first-time investors & family offices","color":"#1E7A3A"}'),
('services', 'main-cards', 3, 'Sub-Broker Partnership', 'Lucrative partnership program with research backing.', 'Partner with AlyoRA Capital Research and empower your client base with institutional research, technical dashboards, and dedicated relationship manager support while enjoying industry-best revenue splits.', '/images/sub-broker.jpg', 'Calculate Earnings', '/services', 'Partner', true, '{"features":["Up to 60% Lifetime Revenue Share On Subscriptions","Co-branded Research Bulletins & Client Webinars","Dedicated Sub-Broker Support Desk & Portal Access","Zero Infrastructure Setup Cost — Turnkey Model"],"idealFor":"Independent Financial Advisors (IFAs), Sub-brokers & CFPs","color":"#0D1F3C"}'),
('services', 'main-cards', 4, 'Financial Planning', 'Goal-based financial planning & wealth creation.', 'Comprehensive financial roadmap covering retirement planning, tax optimisation, insurance adequacy, and goal-based wealth creation for individuals and families.', '', 'Explore Planning', '/services/financial-planning', 'Wealth', true, '{"features":["Retirement Corpus Planning","Tax Optimisation Strategy","Insurance Adequacy Audit"],"color":"#1E7A3A"}'),
('services', 'main-cards', 5, 'Risk Management & Hedging', 'Derivative hedging and tail-risk protection.', 'Deploy systematic options strategies and futures overlays to safeguard equity portfolios during major volatility events.', '', 'Protect Portfolio', '/contact', 'Hedging', true, '{"features":["Options Collar & Put Spread Overlays","Beta Neutralization Strategies","Volatility Event Playbooks"],"color":"#C8963E"}'),

-- Reports Cards
('reports', 'main', 0, 'Nifty 50 Technical Outlook — June 2026', 'Comprehensive technical outlook and options chain sentiment.', 'Chart pattern analysis, critical support/resistance zones, and options chain sentiment ahead of the RBI Monetary Policy meeting.', '', 'Download PDF', '/reports', 'Equity', true, '{"date":"04 Jun 2026","pages":14,"isLocked":false,"tagClass":"bg-[#EBF2FA] text-[#185FA5]","highlights":["Key support zone established at 23,200 level","Bullish continuation pattern on Weekly timeframe","FII / DII institutional flow breakdown"]}'),
('reports', 'main', 1, 'Top SIP Picks for FY 2026-27', 'Analyst-curated list of top-performing schemes.', 'Comprehensive evaluation of Large-Cap, Flexi-Cap, and Hybrid mutual fund schemes based on 10-year rolling returns and downside capture.', '', 'Download PDF', '/reports', 'Mutual Funds', true, '{"date":"01 Jun 2026","pages":22,"isLocked":false,"tagClass":"bg-[#E8F5EC] text-[#1E7A3A]","highlights":["10-year rolling return benchmark evaluation","Expense ratio optimization & direct plan comparison","Optimal asset allocation mix by age group"]}'),
('reports', 'main', 2, 'IT Sector — Valuation & Rebound Analysis', 'Institutional deep dive into Tier-1 IT services giants.', 'Detailed review of Tier-1 Indian IT services firms, Cloud and AI transformation deal wins, and margin expansion trajectories for FY27.', '', 'Download PDF', '/reports', 'Deep Dive', true, '{"date":"28 May 2026","pages":38,"isLocked":true,"tagClass":"bg-[#FFF3E0] text-[#854F0B]","highlights":["Deal pipeline and TCV conversion velocity","Wage hike impact vs margin levers","Valuation comparison: TCS, Infosys, HCLTech"]}'),
('reports', 'main', 3, 'Banking & NBFC Credit Growth Preview', 'Credit growth trends, asset quality, and NIM trajectory.', 'A granular study of credit growth trends, asset quality, and Net Interest Margin trajectory across PSU and private lenders.', '', 'Download PDF', '/reports', 'Macro', true, '{"date":"20 May 2026","pages":28,"isLocked":true,"tagClass":"bg-[#F3E8FF] text-[#6B21A8]","highlights":["Retail vs corporate loan growth divergence","Deposit re-pricing headwinds analysis","Top analyst picks for H2 FY27"]}'),
('reports', 'main', 4, 'Small-Cap Multi-bagger Ideas 2026', 'High-growth small-caps with clean balance sheets.', 'Screening high-growth small-cap opportunities with ROCE > 20%, low debt-to-equity, and strong promoter integrity.', '', 'Download PDF', '/reports', 'Equity', true, '{"date":"12 May 2026","pages":18,"isLocked":true,"tagClass":"bg-[#EBF2FA] text-[#185FA5]","highlights":["3 high-conviction small-cap picks","Order book and CAPEX execution checks","Institutional holding changes"]}'),
('reports', 'main', 5, 'Macro Economic Blueprint — India 2030', 'Long-term macroeconomic outlook and capex cycles.', 'Comprehensive forecast of India GDP trajectory, demographic dividend, infrastructure spending, and manufacturing expansion.', '', 'Download PDF', '/reports', 'Macro', true, '{"date":"05 May 2026","pages":45,"isLocked":false,"tagClass":"bg-[#F3E8FF] text-[#6B21A8]","highlights":["Manufacturing & PLI scheme impacts","Current Account Deficit projections","Strategic equity sectors for the next decade"]}'),

-- Business Consulting Cards
('business-consulting', 'packages', 0, 'Financial Planning & Budgeting', 'Card 1', 'Build realistic budgets, cash-flow forecasts, and financial models tailored to your business stage — so every rupee has a purpose.', '', 'Explore Service', '/contact', 'Core', true, '{"deliverables":["Monthly/annual budgeting frameworks built around your actual revenue cycle","Cash-flow forecasting to help you spot shortfalls before they happen","Cost structuring — fixed vs. variable, break-even analysis, margin tracking","Simple financial models you (or your team) can actually update and use"],"tagline":"You always know how much runway you have and where money is leaking.","color":"#1E7A3A"}'),
('business-consulting', 'packages', 1, 'Business Strategy & Growth Planning', 'Card 2', 'Get a clear roadmap for scaling — market positioning, revenue strategy, and milestone-based growth plans built around your goals.', '', 'Explore Service', '/contact', 'Growth', true, '{"deliverables":["Market and competitor positioning to sharpen what makes you different","Revenue strategy — pricing, channels, and where growth will actually come from","Quarter-by-quarter milestone roadmap instead of a vague long-term vision","Regular strategy check-ins to adjust the plan as the business moves"],"tagline":"A living growth plan with clear next steps, not a one-time PDF that gets forgotten.","color":"#C8963E"}'),
('business-consulting', 'packages', 2, 'Startup Advisory', 'Card 3', 'End-to-end guidance for early-stage founders — business model validation, pricing strategy, and structuring your venture for sustainable growth.', '', 'Explore Service', '/contact', 'Startup', true, '{"deliverables":["Business model validation — does the idea hold up financially before you scale it","Pricing strategy rooted in unit economics, not guesswork","Legal/financial structuring guidance (entity type, basic compliance checklist)","Founder-focused advisory sessions — think of us as your external sounding board"],"tagline":"Save months of trial-and-error by making key decisions with clarity upfront.","color":"#1E7A3A"}'),
('business-consulting', 'packages', 3, 'Process Optimization & Operations', 'Card 4', 'Eliminate bottlenecks, reduce operating costs, and design streamlined workflows so your business runs efficiently as you scale.', '', 'Explore Service', '/contact', 'Operations', true, '{"deliverables":["End-to-end workflow mapping to identify operational chokepoints","Cost reduction audit targeting vendor, software, and process overheads","Standard Operating Procedures (SOPs) designed for easy team adoption","KPI dashboards for real-time visibility into operational health"],"tagline":"A leaner, faster operation that scales without proportional cost increases.","color":"#0D1F3C"}'),
('business-consulting', 'packages', 4, 'Market Expansion & Go-To-Market', 'Card 5', 'Structured frameworks to enter new geographies, launch new product lines, or pivot into higher-margin customer segments.', '', 'Explore Service', '/contact', 'Expansion', true, '{"deliverables":["Addressable market sizing (TAM / SAM / SOM) and competitor landscape","Go-to-market strategy: channel selection, partner ecosystem, early-adopter acquisition","Customer persona definition and value proposition messaging","Post-launch tracking framework to iterate fast based on market signal"],"tagline":"Enter new markets with data-backed confidence instead of expensive trial and error.","color":"#1E7A3A"}'),
('business-consulting', 'packages', 5, 'Corporate Structuring & Compliance', 'Card 6', 'Financial governance, shareholder agreement guidance, and compliance frameworks to keep your business investor-ready.', '', 'Explore Service', '/contact', 'Governance', true, '{"deliverables":["Corporate entity structuring and holding company design for tax efficiency","Cap table hygiene and advisory on shareholder / partner agreements","Statutory compliance audit covering ROC, GST, labor laws, and direct taxes","Internal financial controls to prevent leakage and prepare for due diligence"],"tagline":"Peace of mind that your foundation is solid, compliant, and ready for scrutiny.","color":"#C8963E"}'),

-- Pricing Cards (5 Staircase Tiers)
('pricing', 'plans', 0, 'Stage 1 — Prime', 'Foundation', 'Ideal for individuals starting their systematic investment journey with curated research.', '', 'Get Started with Prime', '/contact', 'Essential', true, '{"stage":1,"prices":{"monthly":17999,"quarterly":46999,"halfyearly":64999,"yearly":79999},"features":["Bi-weekly Nifty & Bank Nifty Outlook","Quarterly Top Mutual Fund SIP Picks","Access to Standard Equity Reports","Email Support within 24 hours"],"color":"#1E7A3A"}'),
('pricing', 'plans', 1, 'Stage 2 — Premium', 'Active Trading', 'Designed for active traders seeking actionable swing setups and entry/exit levels.', '', 'Upgrade to Premium', '/contact', 'Popular', true, '{"stage":2,"prices":{"monthly":22999,"quarterly":58999,"halfyearly":79999,"yearly":99999},"features":["Everything in Prime, plus:","Daily Morning Pre-Market Bulletins","3-5 Swing Trading Calls per week via WhatsApp","Options Strategy Guidance (Nifty/Bank Nifty)","Direct Analyst WhatsApp Support (Market Hours)"],"color":"#27A84E"}'),
('pricing', 'plans', 2, 'Stage 3 — Elite', 'Full Spectrum', 'Comprehensive wealth creation covering small-caps, sectoral rotations, and personal review.', '', 'Choose Elite Tier', '/contact', 'Recommended', true, '{"stage":3,"prices":{"monthly":28999,"quarterly":73999,"halfyearly":99999,"yearly":124999},"features":["Everything in Premium, plus:","Small-Cap & Mid-Cap Multibagger Reports","Monthly Portfolio Drawdown & Health Audit","Sectoral Rotation Deep Dives","Priority Analyst Calls (1-on-1 monthly)"],"color":"#C8963E"}'),
('pricing', 'plans', 3, 'Stage 4 — Apex', 'HNI Strategy', 'Advanced institutional strategy for high-net-worth portfolios and derivative hedging.', '', 'Inquire for Apex', '/contact', 'HNI', true, '{"stage":4,"prices":{"monthly":35999,"quarterly":91999,"halfyearly":124999,"yearly":149999},"features":["Everything in Elite, plus:","Derivative Portfolio Hedging Strategies","Tail-Risk Protection Overlay Recommendations","Direct Mobile Line to Lead Research Strategist","Custom Financial Modeling & Valuation on Request"],"color":"#0D1F3C"}'),
('pricing', 'plans', 4, 'Stage 5 — Pinnacle', 'Family Office', 'Full-service bespoke advisory for family offices, founders, and large portfolios.', '', 'Contact Private Desk', '/contact', 'Private Desk', true, '{"stage":5,"prices":{"monthly":44999,"quarterly":113999,"halfyearly":154999,"yearly":174999},"features":["Everything in Apex, plus:","Dedicated Senior Portfolio Strategist","Bespoke Asset Allocation (PE, Pre-IPO, Equities, Debt)","Unlimited 1-on-1 Consultation Sessions","Quarterly In-Person Strategy Board Meetings"],"color":"#1E7A3A"}'),

-- About Values Cards
('about', 'values', 0, '100% Fee-Only Research', 'Zero Broker Commissions', 'We do not earn commissions from brokers, mutual fund AMCs, or insurance providers. Our sole revenue is client subscriptions, keeping us completely unbiased.', '', '', '', 'Integrity', true, '{"icon":"ShieldCheck","color":"#1E7A3A"}'),
('about', 'values', 1, 'Institutional Rigour', 'DCF & Mathematical Models', 'Every recommendation is backed by discounted cash flow (DCF) models, scenario analyses, and quantitative screening rather than market rumors.', '', '', '', 'Precision', true, '{"icon":"Award","color":"#C8963E"}'),
('about', 'values', 2, 'Audited Track Record', 'Every Call Documented', 'We publish transparent retrospective audits of our swing calls and equity picks, acknowledging both winners and stops with equal honesty.', '', '', '', 'Transparency', true, '{"icon":"TrendingUp","color":"#1E7A3A"}'),
('about', 'values', 3, 'Capital Protection First', 'Disciplined Risk Management', 'Our primary objective is preventing catastrophic drawdowns. Capital preservation is the bedrock of compound wealth creation.', '', '', '', 'Risk First', true, '{"icon":"CheckCircle2","color":"#0D1F3C"}'),

-- Contact Info Cards
('contact', 'info', 0, 'Email Desk', 'For report inquiries & support', 'info@alyoracapital.com', '', 'Send Email', 'mailto:info@alyoracapital.com', 'Support', true, '{"icon":"Mail","color":"#1E7A3A"}'),
('contact', 'info', 1, 'Direct Hotline', 'Mon-Fri 9:00 AM - 6:00 PM IST', '+91 98765 43210', '', 'Call Now', 'tel:+919876543210', 'Phone', true, '{"icon":"Phone","color":"#C8963E"}'),
('contact', 'info', 2, 'Main Office', 'Bandra-Kurla Complex (BKC)', 'Financial District, Bandra-Kurla Complex, Mumbai, MH - 400051', '', 'Get Directions', 'https://maps.google.com', 'HQ', true, '{"icon":"MapPin","color":"#0D1F3C"}'),
('contact', 'info', 3, 'Trading Desk Hours', 'Research Desk Availability', 'Equities: 9:00 AM - 3:30 PM | Support: 9:00 AM - 6:00 PM', '', 'Book Session', '/contact', 'Hours', true, '{"icon":"Clock","color":"#1E7A3A"}');

-- 4. PDF FILES (Downloadable Reports)
INSERT INTO public.pdf_files (name, url, key, page, section, visible, file_size) VALUES
('Nifty 50 Technical Outlook — June 2026.pdf', '/sample-reports/nifty-50-june-2026.pdf', 'reports/nifty-50-june-2026.pdf', 'reports', 'main', true, 2450000),
('Top SIP Picks for FY 2026-27.pdf', '/sample-reports/top-sip-picks-2026-27.pdf', 'reports/top-sip-picks-2026-27.pdf', 'reports', 'main', true, 3800000),
('IT Sector Valuation & Rebound Analysis.pdf', '/sample-reports/it-sector-analysis.pdf', 'reports/it-sector-analysis.pdf', 'reports', 'main', true, 5100000),
('Banking and NBFC Credit Growth Preview.pdf', '/sample-reports/banking-nbfc-preview.pdf', 'reports/banking-nbfc-preview.pdf', 'reports', 'main', true, 4200000),
('Small-Cap Multi-bagger Ideas 2026.pdf', '/sample-reports/small-cap-ideas-2026.pdf', 'reports/small-cap-ideas-2026.pdf', 'reports', 'main', true, 2900000),
('Macro Economic Blueprint — India 2030.pdf', '/sample-reports/macro-blueprint-india-2030.pdf', 'reports/macro-blueprint-india-2030.pdf', 'reports', 'main', true, 6300000)
ON CONFLICT (id) DO NOTHING;
