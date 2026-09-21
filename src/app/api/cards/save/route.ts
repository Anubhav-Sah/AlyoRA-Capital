import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifyAdminAuth } from "@/lib/auth-check";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://2v5tfmzc.ap-southeast.insforge.app";
const INSFORGE_ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "ik_c074ab9ccf398203750003e97600ba84";

export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized access. Valid admin credentials required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const cards = Array.isArray(body.cards) ? body.cards : [];

    if (cards.length === 0) {
      return NextResponse.json({ error: "No cards provided." }, { status: 400 });
    }

    const results = [];

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const now = new Date().toISOString();

      const page = card.page || "services";
      const section = card.section || "main-cards";

      // If id is missing, check if card already exists in DB with same page, section, and exact title
      let targetId = card.id && !card.id.startsWith("temp-") && !card.id.startsWith("srv-") ? card.id : null;

      if (!targetId && card.title) {
        try {
          const matchQuery = `${INSFORGE_URL}/api/database/records/page_cards?page=eq.${page}&section=eq.${section}&title=eq.${encodeURIComponent(card.title)}`;
          const checkRes = await fetch(matchQuery, {
            headers: {
              apikey: INSFORGE_ANON_KEY,
              Authorization: `Bearer ${INSFORGE_ANON_KEY}`,
            },
          });
          if (checkRes.ok) {
            const checkData = await checkRes.json();
            if (Array.isArray(checkData) && checkData.length > 0 && checkData[0].id) {
              targetId = checkData[0].id;
            }
          }
        } catch {
          // continue
        }
      }


      if (targetId) {
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

        const patchUrl = `${INSFORGE_URL}/api/database/records/page_cards?id=eq.${targetId}`;
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
          console.error(`[api/cards/save] Failed to update card ${targetId}:`, errText);
        } else {
          const data = await res.json();
          results.push(data);
        }
      } else {
        // Insert new card
        const insertPayload = [
          {
            page,
            section,
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
      revalidatePath("/services/research-analysis");
      revalidatePath("/services/investment-advisory");
      revalidatePath("/services/mutual-funds");
      revalidatePath("/services/sub-broker");
      revalidatePath("/services/financial-planning");
      revalidatePath("/services/business-consulting");
      revalidatePath("/reports");
      revalidatePath("/pricing");
      revalidatePath("/business-consulting");
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
