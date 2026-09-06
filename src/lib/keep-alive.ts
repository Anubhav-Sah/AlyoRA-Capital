/**
 * Keep-alive utility — pings InsForge DB and backend services.
 * Can be called manually from the Admin Dashboard "System Status" panel.
 */

const INSFORGE_URL =
  process.env.NEXT_PUBLIC_INSFORGE_URL || "https://2v5tfmzc.ap-southeast.insforge.app";
const INSFORGE_ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "";

export interface KeepAliveResult {
  ok: boolean;
  status: "alive" | "degraded" | "unreachable";
  latencyMs: number;
  pingedAt: string;
  services: {
    db: { ok: boolean; latencyMs?: number };
    storage: { ok: boolean };
    functions: { ok: boolean; note?: string };
  };
}

export async function pingBackend(): Promise<KeepAliveResult> {
  const start = Date.now();
  const services: KeepAliveResult["services"] = {
    db: { ok: false },
    storage: { ok: false },
    functions: { ok: false },
  };

  // Ping via our own API route (avoids CORS on client-side direct calls)
  try {
    const res = await fetch("/api/ping", { cache: "no-store" });
    const data = await res.json();
    services.db = { ok: data.ok, latencyMs: data.latencyMs };
  } catch {
    services.db = { ok: false };
  }

  const latencyMs = Date.now() - start;
  const allOk = services.db.ok;

  return {
    ok: allOk,
    status: allOk ? "alive" : "degraded",
    latencyMs,
    pingedAt: new Date().toISOString(),
    services,
  };
}

/**
 * Schedule a keep-alive ping using InsForge's built-in scheduler.
 * This runs server-side and pings every 48 hours via Vercel cron.
 */
export const KEEP_ALIVE_SCHEDULE = "0 */48 * * *"; // Every 48 hours
export const KEEP_ALIVE_ENDPOINT = "/api/cron/ping";
