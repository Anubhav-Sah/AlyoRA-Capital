import { NextResponse } from "next/server";
import { insforge } from "@/lib/insforge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required." },
        { status: 400 }
      );
    }

    const inquiry = {
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : "",
      subject: subject ? String(subject).trim() : "General Inquiry",
      message: message ? String(message).trim() : "",
      created_at: new Date().toISOString(),
    };

    // Attempt to store in database if table exists, or site_content log
    try {
      await insforge.database.from("contact_inquiries").insert([inquiry]);
    } catch {
      // Fallback: log to site_content as json array if table doesn't exist
      try {
        const key = `inquiry_${Date.now()}`;
        await insforge.database.from("site_content").upsert([
          {
            page: "contact",
            section: "leads",
            key,
            value: JSON.stringify(inquiry),
            type: "text",
            updated_at: new Date().toISOString(),
          },
        ]);
      } catch {
        // Continue gracefully
      }
    }

    // Build prefilled WhatsApp message link
    const cleanPhone = phone ? phone.replace(/[^0-9]/g, "") : "";
    const waText = encodeURIComponent(
      `Hello AlyoRA Capital,\nNew Inquiry from Website:\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone}\nSubject: ${inquiry.subject}\nMessage: ${inquiry.message}`
    );
    const whatsappUrl = `https://wa.me/916389570522?text=${waText}`;

    return NextResponse.json({
      success: true,
      inquiry,
      whatsappUrl,
    });
  } catch (error) {
    console.error("Error saving inquiry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // 1. Try to fetch from contact_inquiries table
    try {
      const { data, error } = await insforge.database
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        return NextResponse.json({ inquiries: data });
      }
    } catch {
      // ignore
    }

    // 2. Fetch from site_content fallback
    const { data } = await insforge.database
      .from("site_content")
      .select("*")
      .eq("page", "contact")
      .eq("section", "leads")
      .order("updated_at", { ascending: false });

    const inquiries = (data || [])
      .map((item: { value: string; updated_at: string }) => {
        try {
          return JSON.parse(item.value);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    return NextResponse.json({ inquiries });
  } catch {
    return NextResponse.json({ inquiries: [] });
  }
}
