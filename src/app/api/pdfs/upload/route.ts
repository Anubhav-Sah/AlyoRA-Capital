import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
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

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const reportTitle = formData.get("title") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure public/sample-reports exists
    const uploadDir = path.join(process.cwd(), "public", "sample-reports");
    await mkdir(uploadDir, { recursive: true });

    // Clean filename
    const ext = path.extname(file.name) || ".pdf";
    const rawName = path.basename(file.name, ext).toLowerCase().replace(/[^a-z0-9_-]/g, "-");
    const uniqueFileName = `${Date.now()}-${rawName}${ext}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    await writeFile(filePath, buffer);
    const publicUrl = `/sample-reports/${uniqueFileName}`;

    // Also register in InsForge pdf_files database table
    try {
      const dbPayload = [
        {
          name: reportTitle || file.name,
          url: publicUrl,
          key: `sample-reports/${uniqueFileName}`,
          page: "reports",
          section: "main",
          visible: true,
          file_size: file.size,
          created_at: new Date().toISOString(),
        },
      ];

      await fetch(`${INSFORGE_URL}/api/database/records/pdf_files`, {
        method: "POST",
        headers: {
          apikey: INSFORGE_ANON_KEY,
          Authorization: `Bearer ${INSFORGE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(dbPayload),
      });
    } catch (dbErr) {
      console.warn("Failed to register PDF in InsForge database:", dbErr);
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      name: file.name,
      file_size: file.size,
    });
  } catch (err) {
    console.error("PDF upload error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "PDF upload failed" },
      { status: 500 }
    );
  }
}
