import { NextResponse } from "next/server";
import { insforge } from "@/lib/insforge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email")?.trim().toLowerCase();
    const id = searchParams.get("id");

    if (!email && !id) {
      return NextResponse.json({ error: "Email or ID is required" }, { status: 400 });
    }

    // 1. First try querying user_details table / view
    try {
      let query = insforge.database.from("user_details").select("*");
      if (email) {
        query = query.eq("email", email);
      } else if (id) {
        query = query.eq("id", id);
      }
      const { data, error } = await query;
      if (!error && Array.isArray(data) && data.length > 0) {
        return NextResponse.json({ user: data[0], source: "user_details" });
      }
    } catch (err) {
      console.warn("user_details query error:", err);
    }

    // 2. Try user_profiles table
    try {
      let query = insforge.database.from("user_profiles").select("*");
      if (email) {
        query = query.eq("email", email);
      } else if (id) {
        query = query.eq("id", id);
      }
      const { data, error } = await query;
      if (!error && Array.isArray(data) && data.length > 0) {
        return NextResponse.json({ user: data[0], source: "user_profiles" });
      }
    } catch (err) {
      console.warn("user_profiles query error:", err);
    }

    // 3. Fallback direct HTTP to InsForge database REST API
    try {
      const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://2v5tfmzc.ap-southeast.insforge.app";
      const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "ik_c074ab9ccf398203750003e97600ba84";
      
      const restRes = await fetch(`${baseUrl}/api/database/records/user_profiles`, {
        headers: {
          "Authorization": `Bearer ${anonKey}`,
          "apikey": anonKey,
        },
        cache: "no-store",
      });

      if (restRes.ok) {
        const records = await restRes.json();
        if (Array.isArray(records)) {
          const match = records.find(
            (r: { email?: string; id?: string }) =>
              (email && r.email?.toLowerCase() === email) || (id && r.id === id)
          );
          if (match) {
            return NextResponse.json({ user: match, source: "rest_api" });
          }
        }
      }
    } catch (err) {
      console.warn("Direct REST fallback error:", err);
    }

    return NextResponse.json({ user: null, message: "User not found in user details db table" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
