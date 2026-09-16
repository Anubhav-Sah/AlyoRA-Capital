import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://2v5tfmzc.ap-southeast.insforge.app";
const INSFORGE_ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "ik_c074ab9ccf398203750003e97600ba84";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = Array.isArray(body.items) ? body.items : [];

    if (items.length === 0) {
      return NextResponse.json({ error: "No items provided." }, { status: 400 });
    }

    const payload = items.map((item: { page: string; section: string; key: string; value: string; type?: string }) => ({
      page: String(item.page).trim(),
      section: String(item.section).trim(),
      key: String(item.key).trim(),
      value: item.value ?? "",
      type: item.type || "text",
      updated_at: new Date().toISOString(),
    }));

    // Perform upsert with on_conflict=page,section,key
    const targetUrl = `${INSFORGE_URL}/api/database/records/site_content?on_conflict=page,section,key`;

    const res = await fetch(targetUrl, {
      method: "POST",
      headers: {
        apikey: INSFORGE_ANON_KEY,
        Authorization: `Bearer ${INSFORGE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[api/content/save] DB error:", res.status, errText);
      return NextResponse.json(
        { error: `Database failed (${res.status}): ${errText}` },
        { status: 500 }
      );
    }

    const savedData = await res.json();

    // Revalidate relevant pages
    try {
      revalidatePath("/contact");
      revalidatePath("/");
      revalidatePath("/about");
      revalidatePath("/pricing");
      revalidatePath("/reports");
      revalidatePath("/services");
      revalidatePath("/services/research-analysis");
      revalidatePath("/services/investment-advisory");
      revalidatePath("/services/mutual-funds");
      revalidatePath("/services/sub-broker");
      revalidatePath("/services/financial-planning");
      revalidatePath("/services/business-consulting");
      revalidatePath("/business-consulting");
    } catch {
      // ignore
    }

    return NextResponse.json({
      success: true,
      count: Array.isArray(savedData) ? savedData.length : payload.length,
      saved: savedData,
    });
  } catch (error) {
    console.error("[api/content/save] Server error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
