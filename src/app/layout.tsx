import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alyoracapital.in"),
  title: {
    default: "AlyoRA Capital Research — Where Research Meets Returns",
    template: "%s | AlyoRA Capital Research",
  },
  description:
    "Professional equity research, investment advisory, and mutual fund guidance for Indian investors who demand clarity, precision, and results.",
  keywords: [
    "AlyoRA Capital",
    "Equity Research India",
    "Investment Advisory",
    "Mutual Fund Portfolio Planning",
    "SEBI Research Analyst Framework",
    "Financial Planning",
    "Sub-Broker Program India",
  ],
  authors: [{ name: "AlyoRA Capital Research Team" }],
  creator: "AlyoRA Capital Research",
  publisher: "AlyoRA Capital Research",
  formatDetection: { telephone: true, email: true },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AlyoRA Capital Research — Where Research Meets Returns",
    description:
      "Institutional-grade equity research, bespoke advisory, and mutual fund planning for Indian investors.",
    url: "https://www.alyoracapital.in",
    siteName: "AlyoRA Capital Research",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "AlyoRA Capital Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlyoRA Capital Research — Where Research Meets Returns",
    description:
      "Institutional-grade equity research, bespoke advisory, and mutual fund planning for Indian investors.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google5fdb0541c1e25c87",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "AlyoRA Capital Research",
  url: "https://www.alyoracapital.in",
  logo: "https://www.alyoracapital.in/icon.png",
  image: "https://www.alyoracapital.in/icon.png",
  description:
    "Institutional-grade equity research, investment advisory, and mutual fund planning for Indian investors.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "India",
  },
  areaServed: "IN",
  currenciesAccepted: "INR",
  priceRange: "₹₹₹",
  sameAs: [
    "https://www.linkedin.com/company/alyoracapital",
    "https://twitter.com/alyoracapital",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#F7F8FA] text-[#0D1F3C] font-sans antialiased selection:bg-[#27A84E] selection:text-white">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}

