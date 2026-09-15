import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://2v5tfmzc.ap-southeast.insforge.app";
const INSFORGE_ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "ik_c074ab9ccf398203750003e97600ba84";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cards = Array.isArray(body.cards) ? body.cards : [];

    if (cards.length === 0) {
      return NextResponse.json({ error: "No cards provided." }, { status: 400 });
    }

    const results = [];

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const now = new Date().toISOString();

      if (card.id && !card.id.startsWith("temp-") && !card.id.startsWith("srv-")) {
        // Update existing card
        const updatePayload = {
          title: card.title ?? "",
          subtitle: card.subtitle ?? "",
          description: card.description ?? "",
          badge: card.badge ?? "",
          button_label: card.button_label ?? "Learn More",
          button_url: card.button_url ?? "",
          visible: card.visible !== false,
          position: typeof card.position === "number" ? card.position : i,
          extra_data: card.extra_data || {},
          updated_at: now,
        };

        const patchUrl = `${INSFORGE_URL}/api/database/records/page_cards?id=eq.${card.id}`;
        const res = await fetch(patchUrl, {
          method: "PATCH",
          headers: {
            apikey: INSFORGE_ANON_KEY,
            Authorization: `Bearer ${INSFORGE_ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify(updatePayload),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error(`[api/cards/save] Failed to update card ${card.id}:`, errText);
        } else {
          const data = await res.json();
          results.push(data);
        }
      } else {
        // Insert new card
        const insertPayload = [
          {
            page: card.page || "services",
            section: card.section || "main-cards",
            title: card.title ?? "",
            subtitle: card.subtitle ?? "",
            description: card.description ?? "",
            badge: card.badge ?? "",
            image_url: card.image_url ?? "",
            button_label: card.button_label ?? "Learn More",
            button_url: card.button_url ?? "",
            visible: card.visible !== false,
            position: typeof card.position === "number" ? card.position : i,
            extra_data: card.extra_data || {},
            created_at: now,
            updated_at: now,
          },
        ];

        const postUrl = `${INSFORGE_URL}/api/database/records/page_cards`;
        const res = await fetch(postUrl, {
          method: "POST",
          headers: {
            apikey: INSFORGE_ANON_KEY,
            Authorization: `Bearer ${INSFORGE_ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify(insertPayload),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error(`[api/cards/save] Failed to insert card:`, errText);
        } else {
          const data = await res.json();
          results.push(data);
        }
      }
    }

    // Revalidate relevant pages
    try {
      revalidatePath("/services");
      revalidatePath("/");
    } catch {
      // ignore
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      saved: results,
    });
  } catch (error) {
    console.error("[api/cards/save] Server error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
