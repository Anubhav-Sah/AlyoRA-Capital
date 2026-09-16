import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: blob: https://2v5tfmzc.ap-southeast.insforge.app https://*.unsplash.com;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://2v5tfmzc.ap-southeast.insforge.app https://vitals.vercel-insights.com;
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, " ").trim(),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      { protocol: "https", hostname: "2v5tfmzc.ap-southeast.insforge.app" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

