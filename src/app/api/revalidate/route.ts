import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const PAGES = ["/", "/about", "/services", "/reports", "/business-consulting", "/pricing", "/contact"];
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || "alyora-revalidate-2024";

export async function POST(request: NextRequest) {
  try {
    let body: { secret?: string; page?: string } = {};
    try {
      body = await request.json();
    } catch {
      // Empty body
    }

    const providedSecret = body.secret || request.headers.get("x-revalidate-secret");
    if (providedSecret && providedSecret !== REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
    }

    const page = body.page;
    if (page) {
      revalidatePath(page);
      revalidatePath(page, "page");
    }

    // Invalidate root layout so all pages, navbar, and cached server data refresh
    revalidatePath("/", "layout");
    for (const p of PAGES) {
      revalidatePath(p);
    }

    return NextResponse.json({
      ok: true,
      message: "Revalidation successful",
      revalidated: page ? [page, ...PAGES] : PAGES,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[revalidate] Error:", error);
    return NextResponse.json({ ok: false, error: "Failed to revalidate" }, { status: 500 });
  }
}

export async function GET() {
  try {
    revalidatePath("/", "layout");
    for (const p of PAGES) {
      revalidatePath(p);
    }
    return NextResponse.json({
      ok: true,
      message: "All pages revalidated",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
