import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://2v5tfmzc.ap-southeast.insforge.app";
const INSFORGE_ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "ik_c074ab9ccf398203750003e97600ba84";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = body.id;
    const page = body.page || "reports";

    if (!id) {
      return NextResponse.json({ error: "Missing card ID" }, { status: 400 });
    }

    const deleteUrl = `${INSFORGE_URL}/api/database/records/page_cards?id=eq.${id}`;
    const res = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        apikey: INSFORGE_ANON_KEY,
        Authorization: `Bearer ${INSFORGE_ANON_KEY}`,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[api/cards/delete] DB error:", res.status, errText);
      return NextResponse.json(
        { error: `Failed to delete card: ${errText}` },
        { status: 500 }
      );
    }

    try {
      revalidatePath("/reports");
      revalidatePath("/");
      revalidatePath("/services");
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err) {
    console.error("[api/cards/delete] Server error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
