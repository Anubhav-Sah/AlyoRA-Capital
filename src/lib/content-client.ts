import { insforge } from "@/lib/insforge";

// ============================================================
// Content types
// ============================================================
export interface SiteContent {
  id: string;
  page: string;
  section: string;
  key: string;
  type: string;
  value: string | null;
  updated_at: string;
}

export interface PageCard {
  id: string;
  page: string;
  section: string;
  position: number;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  button_label: string;
  button_url: string;
  badge: string;
  visible: boolean;
  extra_data: Record<string, unknown>;
  updated_at: string;
}

export interface PageSection {
  id: string;
  page: string;
  section_id: string;
  title: string;
  visible: boolean;
  position: number;
}

export interface PdfFile {
  id: string;
  name: string;
  url: string;
  key: string;
  page: string;
  section: string;
  visible: boolean;
  file_size: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: "user" | "admin";
}

// ============================================================
// Auth helpers (client-side)
// ============================================================
const SESSION_KEY = "alyora_admin_profile";

export async function fetchUserProfile(userId?: string, userEmail?: string): Promise<UserProfile | null> {
  const cleanEmail = userEmail?.trim().toLowerCase();

  // 1. Fetch directly from user_details db table
  try {
    if (cleanEmail) {
      const res = await insforge.database
        .from("user_details")
        .select("*")
        .eq("email", cleanEmail);
      const items = (res.data as unknown as UserProfile[]) || [];
      if (items.length > 0) {
        if (typeof window !== "undefined") {
          localStorage.setItem(SESSION_KEY, JSON.stringify(items[0]));
        }
        return items[0];
      }
    }
    if (userId) {
      const res = await insforge.database
        .from("user_details")
        .select("*")
        .eq("id", userId);
      const items = (res.data as unknown as UserProfile[]) || [];
      if (items.length > 0) {
        if (typeof window !== "undefined") {
          localStorage.setItem(SESSION_KEY, JSON.stringify(items[0]));
        }
        return items[0];
      }
    }
  } catch (err) {
    console.warn("fetchUserProfile user_details db error:", err);
  }

  // 2. Fetch from user_profiles db table
  try {
    if (cleanEmail) {
      const res = await insforge.database
        .from("user_profiles")
        .select("*")
        .eq("email", cleanEmail);
      const items = (res.data as unknown as UserProfile[]) || [];
      if (items.length > 0) {
        if (typeof window !== "undefined") {
          localStorage.setItem(SESSION_KEY, JSON.stringify(items[0]));
        }
        return items[0];
      }
    }
    if (userId) {
      const res = await insforge.database
        .from("user_profiles")
        .select("*")
        .eq("id", userId);
      const items = (res.data as unknown as UserProfile[]) || [];
      if (items.length > 0) {
        if (typeof window !== "undefined") {
          localStorage.setItem(SESSION_KEY, JSON.stringify(items[0]));
        }
        return items[0];
      }
    }
  } catch (err) {
    console.warn("fetchUserProfile user_profiles db error:", err);
  }

  // 3. Fallback: Query Next.js /api/user-details route
  try {
    const param = cleanEmail ? `email=${encodeURIComponent(cleanEmail)}` : userId ? `id=${encodeURIComponent(userId)}` : "";
    if (param && typeof window !== "undefined") {
      const res = await fetch(`/api/user-details?${param}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
          return data.user as UserProfile;
        }
      }
    }
  } catch (err) {
    console.warn("fetchUserProfile api error:", err);
  }

  return null;
}

export async function signIn(email: string, password: string) {
  const cleanEmail = email.trim().toLowerCase();
  const result = await insforge.auth.signInWithPassword({ email: cleanEmail, password });
  
  // Directly query the user_details db table for fresh role
  const profile = await fetchUserProfile(result.data?.user?.id, cleanEmail);
  if (profile && typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
  }
  return result;
}

export async function signUp(email: string, password: string) {
  return insforge.auth.signUp({ email: email.trim().toLowerCase(), password });
}

export async function signOut() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
  return insforge.auth.signOut();
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  // 1. Check local storage
  let cachedUser: UserProfile | null = null;
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved) {
        cachedUser = JSON.parse(saved) as UserProfile;
      }
    } catch {
      // continue
    }
  }

  // 2. Always verify live role from user_details db table if cached user exists
  if (cachedUser?.email || cachedUser?.id) {
    const liveProfile = await fetchUserProfile(cachedUser.id, cachedUser.email);
    if (liveProfile) {
      return liveProfile;
    }
    if (cachedUser.role === "admin") {
      return cachedUser;
    }
  }

  // 3. Check InsForge auth session
  try {
    const { data } = await insforge.auth.getCurrentUser();
    if (data?.user) {
      const profile = await fetchUserProfile(data.user.id, data.user.email?.toLowerCase());
      if (profile) return profile;
    }
  } catch {
    // continue
  }

  return null;
}

export async function ensureUserProfile(id: string, email: string) {
  try {
    const existing = await fetchUserProfile(id, email);
    if (!existing) {
      await insforge.database.from("user_profiles").insert([{ id, email: email.trim().toLowerCase(), role: "user" }]);
    }
  } catch {
    // ignore
  }
}

// Helper to get current user id for audit fields
async function getCurrentUserId(): Promise<string | undefined> {
  try {
    const { data } = await insforge.auth.getCurrentUser();
    return data?.user?.id;
  } catch {
    return undefined;
  }
}

// ============================================================
// Site content CRUD
// ============================================================
export async function getSiteContent(page: string, section?: string): Promise<SiteContent[]> {
  try {
    let query = insforge.database.from("site_content").select("*").eq("page", page);
    if (section) query = query.eq("section", section);
    const { data, error } = await query;
    if (error) return [];
    return (data as unknown as SiteContent[]) || [];
  } catch {
    return [];
  }
}

export async function upsertSiteContent(item: {
  page: string;
  section: string;
  key: string;
  type?: string;
  value: string;
}) {
  try {
    const updatedBy = await getCurrentUserId();
    return insforge.database.from("site_content").upsert([
      {
        ...item,
        type: item.type || "text",
        updated_at: new Date().toISOString(),
        ...(updatedBy ? { updated_by: updatedBy } : {}),
      },
    ]);
  } catch {
    return { data: null, error: new Error("Failed to upsert content") };
  }
}

// ============================================================
// Page cards CRUD
// ============================================================
export async function getPageCards(page: string, section?: string): Promise<PageCard[]> {
  try {
    let query = insforge.database.from("page_cards").select("*").eq("page", page).order("position");
    if (section) query = query.eq("section", section);
    const { data, error } = await query;
    if (error) return [];
    return (data as unknown as PageCard[]) || [];
  } catch {
    return [];
  }
}

export async function insertPageCard(card: Partial<PageCard>) {
  try {
    const updatedBy = await getCurrentUserId();
    return insforge.database.from("page_cards").insert([
      { ...card, ...(updatedBy ? { updated_by: updatedBy } : {}) },
    ]);
  } catch {
    return { data: null, error: new Error("Failed to insert card") };
  }
}

export async function updatePageCard(id: string, updates: Partial<PageCard>) {
  try {
    const updatedBy = await getCurrentUserId();
    return insforge.database.from("page_cards").update({
      ...updates,
      updated_at: new Date().toISOString(),
      ...(updatedBy ? { updated_by: updatedBy } : {}),
    }).eq("id", id);
  } catch {
    return { data: null, error: new Error("Failed to update card") };
  }
}

export async function deletePageCard(id: string) {
  try {
    return insforge.database.from("page_cards").delete().eq("id", id);
  } catch {
    return { data: null, error: new Error("Failed to delete card") };
  }
}

export async function reorderPageCards(cards: { id: string; position: number }[]) {
  for (const card of cards) {
    try {
      await insforge.database.from("page_cards").update({ position: card.position }).eq("id", card.id);
    } catch {
      // continue
    }
  }
}

// ============================================================
// Page sections CRUD
// ============================================================
export async function getPageSections(page: string): Promise<PageSection[]> {
  try {
    const { data, error } = await insforge.database
      .from("page_sections")
      .select("*")
      .eq("page", page)
      .order("position");
    if (error) return [];
    return (data as unknown as PageSection[]) || [];
  } catch {
    return [];
  }
}

export async function upsertPageSection(section: Partial<PageSection>) {
  try {
    const updatedBy = await getCurrentUserId();
    return insforge.database.from("page_sections").upsert([
      {
        ...section,
        updated_at: new Date().toISOString(),
        ...(updatedBy ? { updated_by: updatedBy } : {}),
      },
    ]);
  } catch {
    return { data: null, error: new Error("Failed to upsert section") };
  }
}

// ============================================================
// PDF files CRUD
// ============================================================
export async function getPdfFiles(page?: string): Promise<PdfFile[]> {
  try {
    let query = insforge.database.from("pdf_files").select("*").order("created_at", { ascending: false });
    if (page) query = query.eq("page", page);
    const { data, error } = await query;
    if (error) return [];
    return (data as unknown as PdfFile[]) || [];
  } catch {
    return [];
  }
}

export async function uploadPdf(file: File, page: string, section: string = "main") {
  try {
    const updatedBy = await getCurrentUserId();
    const ext = file.name.split(".").pop();
    const storageKey = `pdfs/${page}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data: uploadData, error: uploadError } = await insforge.storage
      .from("pdfs")
      .upload(storageKey, file);

    if (uploadError || !uploadData) return { error: uploadError, data: null };

    const publicUrl = uploadData.url || "";

    await insforge.database.from("pdf_files").insert([{
      name: file.name,
      url: publicUrl,
      key: storageKey,
      page,
      section,
      visible: true,
      file_size: file.size,
      ...(updatedBy ? { updated_by: updatedBy } : {}),
    }]);

    return { data: { url: publicUrl, key: storageKey }, error: null };
  } catch (e) {
    return { error: e, data: null };
  }
}

export async function deletePdf(id: string, storageKey: string) {
  try {
    await insforge.storage.from("pdfs").remove([storageKey]);
    return insforge.database.from("pdf_files").delete().eq("id", id);
  } catch {
    return { data: null, error: new Error("Failed to delete PDF") };
  }
}

// ============================================================
// Image upload
// ============================================================
export async function uploadImage(file: File, folder: string = "images") {
  try {
    const ext = file.name.split(".").pop();
    const storageKey = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data: uploadData, error: uploadError } = await insforge.storage
      .from("site-images")
      .upload(storageKey, file);

    if (uploadError || !uploadData) return { error: uploadError, url: null, key: null };

    return { url: uploadData.url || null, key: storageKey, error: null };
  } catch (e) {
    return { url: null, key: null, error: e };
  }
}
