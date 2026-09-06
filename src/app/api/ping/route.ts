import { NextResponse } from "next/server";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://2v5tfmzc.ap-southeast.insforge.app";
const INSFORGE_ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "";

export async function GET() {
  const start = Date.now();

  try {
    // Ping InsForge DB via REST
    const response = await fetch(`${INSFORGE_URL}/rest/v1/site_content?limit=1`, {
      headers: {
        apikey: INSFORGE_ANON_KEY,
        Authorization: `Bearer ${INSFORGE_ANON_KEY}`,
      },
      cache: "no-store",
    });

    const latencyMs = Date.now() - start;
    const ok = response.ok;

    return NextResponse.json({
      ok,
      status: ok ? "alive" : "degraded",
      latencyMs,
      pingedAt: new Date().toISOString(),
      dbUrl: INSFORGE_URL,
    });
  } catch (error) {
    const latencyMs = Date.now() - start;
    return NextResponse.json(
      {
        ok: false,
        status: "unreachable",
        latencyMs,
        pingedAt: new Date().toISOString(),
        error: String(error),
      },
      { status: 503 }
    );
  }
}
