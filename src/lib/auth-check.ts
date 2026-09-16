import { cookies } from "next/headers";

const ADMIN_SECRET = process.env.ADMIN_PASSCODE || process.env.ADMIN_SECRET || "alyora-admin-secure-2026";

/**
 * Server-side helper to verify if a request is authenticated as Admin.
 * Returns true if authenticated, false otherwise.
 */
export async function verifyAdminAuth(request: Request): Promise<boolean> {
  try {
    // 1. Check custom Authorization or x-admin-token headers
    const authHeader = request.headers.get("authorization");
    const adminHeader = request.headers.get("x-admin-token");

    if (adminHeader === ADMIN_SECRET || authHeader === `Bearer ${ADMIN_SECRET}`) {
      return true;
    }

    // 2. Check HTTP-only or session cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("alyora_admin_token")?.value;

    if (sessionCookie === ADMIN_SECRET) {
      return true;
    }
  } catch (err) {
    console.error("[verifyAdminAuth] Error checking admin auth:", err);
  }

  return false;
}
