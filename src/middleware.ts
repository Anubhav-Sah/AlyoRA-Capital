import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple sliding window rate-limiter for API protection
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous";
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const limit = 30; // Max 30 requests per minute per IP for APIs

  if (request.nextUrl.pathname.startsWith("/api/")) {
    const userLimit = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - userLimit.lastReset > windowMs) {
      userLimit.count = 1;
      userLimit.lastReset = now;
    } else {
      userLimit.count++;
    }

    rateLimitMap.set(ip, userLimit);

    if (userLimit.count > limit) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
