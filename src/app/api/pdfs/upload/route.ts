import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { verifyAdminAuth } from "@/lib/auth-check";
import { insforge } from "@/lib/insforge";

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

    // Clean filename
    const ext = path.extname(file.name) || ".pdf";
    const rawName = path.basename(file.name, ext).toLowerCase().replace(/[^a-z0-9_-]/g, "-");
    const uniqueFileName = `${Date.now()}-${rawName}${ext}`;
    const storageKey = `pdfs/reports/${uniqueFileName}`;

    let publicUrl = "";
    let insforgeStorageKey = storageKey;

    // 1. Primary Upload: Upload to InsForge Storage bucket ("pdfs")
    try {
      const { data: uploadData, error: uploadError } = await insforge.storage
        .from("pdfs")
        .upload(storageKey, file);

      if (!uploadError && uploadData?.url) {
        publicUrl = uploadData.url;
      } else if (uploadError) {
        console.warn("[api/pdfs/upload] InsForge Storage error:", uploadError);
      }
    } catch (storageErr) {
      console.warn("[api/pdfs/upload] InsForge Storage upload warning:", storageErr);
    }

    // 2. Secondary Fallback: Save copy to public/sample-reports/
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public", "sample-reports");
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, uniqueFileName);
      await writeFile(filePath, buffer);

      if (!publicUrl) {
        publicUrl = `/sample-reports/${uniqueFileName}`;
        insforgeStorageKey = `sample-reports/${uniqueFileName}`;
      }
    } catch (localErr) {
      console.warn("[api/pdfs/upload] Local file write warning:", localErr);
    }

    if (!publicUrl) {
      publicUrl = `/sample-reports/${uniqueFileName}`;
    }

    // 3. Register PDF in InsForge pdf_files database table
    try {
      await insforge.database.from("pdf_files").insert([
        {
          name: reportTitle || file.name,
          url: publicUrl,
          key: insforgeStorageKey,
          page: "reports",
          section: "main",
          visible: true,
          file_size: file.size,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (dbErr) {
      console.warn("Failed to register PDF in InsForge database:", dbErr);
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      name: file.name,
      file_size: file.size,
      key: insforgeStorageKey,
    });
  } catch (err) {
    console.error("PDF upload error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "PDF upload failed" },
      { status: 500 }
    );
  }
}
