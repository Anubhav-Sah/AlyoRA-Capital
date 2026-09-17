import { NextResponse } from "next/server";
import { insforge } from "@/lib/insforge";

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status?: "pending" | "responded";
  created_at?: string;
}

// In-memory persistent cache for current server instance
const memoryInquiries: Inquiry[] = [];
const deletedKeys = new Set<string>();
const statusMap = new Map<string, "pending" | "responded">();

function getItemKey(item: { id?: string; email?: string; subject?: string; created_at?: string }) {
  const emailStr = (item.email || "").toLowerCase().trim();
  const subjStr = (item.subject || "").trim();
  const timeStr = (item.created_at || "").slice(0, 16);
  return `${emailStr}__${subjStr}__${timeStr}`;
}


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

    const inquiry: Inquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : "",
      subject: subject ? String(subject).trim() : "General Inquiry",
      message: message ? String(message).trim() : "",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    // 1. Save to in-memory cache
    memoryInquiries.unshift(inquiry);

    // 2. Try store in contact_inquiries DB table
    try {
      const res1 = await insforge.database.from("contact_inquiries").insert([{
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        subject: inquiry.subject,
        message: inquiry.message,
        created_at: inquiry.created_at,
      }]);
      if (res1.error) {
        console.warn("contact_inquiries insert note:", res1.error.message);
      }
    } catch (err) {
      console.warn("contact_inquiries insert catch:", err);
    }

    // 3. Try store in consultation_bookings if consultation call
    if (inquiry.subject.toLowerCase().includes("consultation")) {
      try {
        const res2 = await insforge.database.from("consultation_bookings").insert([{
          full_name: inquiry.name,
          email_address: inquiry.email,
          phone_number: inquiry.phone,
          service_interest: inquiry.subject.replace("Consultation: ", ""),
          message_details: inquiry.message,
          created_at: inquiry.created_at,
        }]);
        if (res2.error) {
          console.warn("consultation_bookings insert note:", res2.error.message);
        }
      } catch (err) {
        console.warn("consultation_bookings insert catch:", err);
      }
    }

    // 4. ALWAYS store in site_content table as fallback storage
    try {
      const key = `inquiry_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const res3 = await insforge.database.from("site_content").upsert([
        {
          page: "contact",
          section: "leads",
          key,
          value: JSON.stringify(inquiry),
          type: "text",
          updated_at: new Date().toISOString(),
        },
      ]);
      if (res3.error) {
        console.warn("site_content upsert note:", res3.error.message);
      }
    } catch (err) {
      console.warn("site_content upsert catch:", err);
    }

    // Build prefilled WhatsApp message link
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
    // Sync deleted keys and status map from site_content metadata
    try {
      const { data: metaData } = await insforge.database
        .from("site_content")
        .select("*")
        .eq("page", "contact")
        .eq("section", "meta");
      if (metaData && Array.isArray(metaData)) {
        metaData.forEach((item) => {
          if (item.key === "deleted_keys" && item.value) {
            try {
              const keysArray = JSON.parse(item.value);
              if (Array.isArray(keysArray)) {
                keysArray.forEach((k: string) => deletedKeys.add(k));
              }
            } catch {}
          }
          if (item.key === "status_map" && item.value) {
            try {
              const mapObj = JSON.parse(item.value);
              Object.entries(mapObj).forEach(([k, v]) => {
                if (v === "pending" || v === "responded") {
                  statusMap.set(k, v as "pending" | "responded");
                }
              });
            } catch {}
          }
        });
      }
    } catch {}

    const rawInquiries: Inquiry[] = [...memoryInquiries];

    // 1. Fetch from contact_inquiries table
    try {
      const { data: contactData } = await insforge.database
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (contactData && Array.isArray(contactData)) {
        rawInquiries.push(...(contactData as unknown as Inquiry[]));
      }
    } catch {}

    // 2. Fetch from consultation_bookings table
    try {
      const { data: bookingData } = await insforge.database
        .from("consultation_bookings")
        .select("*")
        .order("created_at", { ascending: false });
      if (bookingData && Array.isArray(bookingData)) {
        const mappedBookings = bookingData.map((b: { id?: string; full_name?: string; name?: string; email_address?: string; email?: string; phone_number?: string; phone?: string; service_interest?: string; message_details?: string; message?: string; created_at?: string }) => ({
          id: b.id,
          name: b.full_name || b.name || "Client",
          email: b.email_address || b.email || "",
          phone: b.phone_number || b.phone || "",
          subject: b.service_interest ? `Consultation: ${b.service_interest}` : "Book Advisory Consultation",
          message: b.message_details || b.message || "Booked 30-minute consultation call.",
          status: "pending" as const,
          created_at: b.created_at || new Date().toISOString(),
        }));
        rawInquiries.push(...mappedBookings);
      }
    } catch {}

    // 3. Fetch from site_content fallback
    try {
      const { data: fallbackData } = await insforge.database
        .from("site_content")
        .select("*")
        .eq("page", "contact")
        .eq("section", "leads")
        .order("updated_at", { ascending: false });

      if (fallbackData && Array.isArray(fallbackData)) {
        fallbackData.forEach((item: { value: string; updated_at?: string }) => {
          try {
            const parsed = JSON.parse(item.value);
            if (parsed && parsed.name) {
              rawInquiries.push({
                ...parsed,
                created_at: parsed.created_at || item.updated_at,
              });
            }
          } catch {}
        });
      }
    } catch {}

    // Deduplicate and filter out deleted keys
    const uniqueMap = new Map<string, Inquiry>();
    rawInquiries.forEach((item) => {
      const itemKey = getItemKey(item);
      const isDeleted =
        deletedKeys.has(itemKey) ||
        (item.id && deletedKeys.has(item.id)) ||
        deletedKeys.has(`${(item.email || "").toLowerCase()}_${item.subject}`);

      if (!isDeleted && !uniqueMap.has(itemKey)) {
        const savedStatus = statusMap.get(itemKey) || statusMap.get(item.id || "") || item.status || "pending";
        uniqueMap.set(itemKey, {
          ...item,
          status: savedStatus,
        });
      }
    });

    const uniqueInquiries = Array.from(uniqueMap.values());

    // Sort by created_at descending
    uniqueInquiries.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });

    return NextResponse.json({ inquiries: uniqueInquiries });
  } catch {
    return NextResponse.json({ inquiries: memoryInquiries });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, email, subject, created_at, status } = body;

    if (!status || (status !== "pending" && status !== "responded")) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const itemKey = getItemKey({ id, email, subject, created_at });
    statusMap.set(itemKey, status);
    if (id) statusMap.set(id, status);

    // Update memoryInquiries
    memoryInquiries.forEach((item) => {
      if (item.id === id || getItemKey(item) === itemKey) {
        item.status = status;
      }
    });

    // Save statusMap to site_content
    try {
      const objMap = Object.fromEntries(statusMap.entries());
      await insforge.database.from("site_content").upsert([
        {
          page: "contact",
          section: "meta",
          key: "status_map",
          value: JSON.stringify(objMap),
          type: "text",
          updated_at: new Date().toISOString(),
        },
      ]);
    } catch {}

    return NextResponse.json({ success: true, status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id, email, subject, created_at } = body;

    const itemKey = getItemKey({ id, email, subject, created_at });
    deletedKeys.add(itemKey);
    if (id) deletedKeys.add(id);
    if (email && subject) deletedKeys.add(`${email.toLowerCase()}_${subject}`);

    // Remove from memoryInquiries
    const index = memoryInquiries.findIndex(
      (m) => m.id === id || getItemKey(m) === itemKey
    );
    if (index !== -1) {
      memoryInquiries.splice(index, 1);
    }

    // Save deletedKeys array to site_content
    try {
      const keysArray = Array.from(deletedKeys);
      await insforge.database.from("site_content").upsert([
        {
          page: "contact",
          section: "meta",
          key: "deleted_keys",
          value: JSON.stringify(keysArray),
          type: "text",
          updated_at: new Date().toISOString(),
        },
      ]);

      // Try delete from DB tables directly
      if (id) {
        await insforge.database.from("contact_inquiries").delete().eq("id", id);
        await insforge.database.from("consultation_bookings").delete().eq("id", id);
      }
      if (email) {
        await insforge.database.from("contact_inquiries").delete().eq("email", email);
      }
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}


