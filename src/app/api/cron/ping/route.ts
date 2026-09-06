import { NextResponse } from "next/server";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://2v5tfmzc.ap-southeast.insforge.app";
const INSFORGE_ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "";
const CRON_SECRET = process.env.CRON_SECRET || "alyora-cron-2024";

export async function GET(request: Request) {
  // Verify the request is from Vercel Cron (or our own caller)
  const { searchParams } = new URL(request.url);
  const secret = request.headers.get("x-cron-secret") || searchParams.get("secret");

  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const start = Date.now();
  const results: Record<string, unknown> = {};

  // 1. Ping InsForge DB
  try {
    const dbRes = await fetch(`${INSFORGE_URL}/rest/v1/site_content?limit=1`, {
      headers: { apikey: INSFORGE_ANON_KEY, Authorization: `Bearer ${INSFORGE_ANON_KEY}` },
      cache: "no-store",
    });
    results.db = { ok: dbRes.ok, status: dbRes.status, latencyMs: Date.now() - start };
  } catch (e) {
    results.db = { ok: false, error: String(e) };
  }

  // 2. Ping InsForge Edge Function health (if any)
  try {
    const fnRes = await fetch(`${INSFORGE_URL}/functions/v1/health`, {
      headers: { Authorization: `Bearer ${INSFORGE_ANON_KEY}` },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    results.functions = { ok: fnRes.ok, status: fnRes.status };
  } catch {
    results.functions = { ok: false, note: "No edge functions deployed or timed out" };
  }

  // 3. Ping storage
  try {
    const storageRes = await fetch(`${INSFORGE_URL}/storage/v1/bucket`, {
      headers: { apikey: INSFORGE_ANON_KEY, Authorization: `Bearer ${INSFORGE_ANON_KEY}` },
      cache: "no-store",
    });
    results.storage = { ok: storageRes.ok, status: storageRes.status };
  } catch {
    results.storage = { ok: false };
  }

  const totalLatency = Date.now() - start;
  const allOk = Object.values(results).every((r) => (r as { ok: boolean }).ok);

  console.log(`[48h-cron] Keep-alive ping at ${new Date().toISOString()} — ${allOk ? "ALL OK" : "DEGRADED"} (${totalLatency}ms)`);

  return NextResponse.json({
    status: allOk ? "alive" : "degraded",
    pingedAt: new Date().toISOString(),
    totalLatencyMs: totalLatency,
    services: results,
  });
}
