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
    const folder = (formData.get("folder") as string) || "banners";

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    // Clean filename
    const ext = path.extname(file.name) || ".png";
    const rawName = path.basename(file.name, ext).toLowerCase().replace(/[^a-z0-9_-]/g, "-");
    const uniqueFileName = `${Date.now()}-${rawName}${ext}`;
    const storageKey = `${folder}/${uniqueFileName}`;

    let publicUrl = "";

    // 1. Primary Upload: Upload directly to InsForge Storage bucket ("site-images")
    try {
      const { data: uploadData, error: uploadError } = await insforge.storage
        .from("site-images")
        .upload(storageKey, file);

      if (!uploadError && uploadData?.url) {
        publicUrl = uploadData.url;
      } else if (uploadError) {
        console.warn("[api/images/upload] InsForge Storage upload warning:", uploadError);
      }
    } catch (storageErr) {
      console.warn("[api/images/upload] InsForge Storage error:", storageErr);
    }

    // 2. Secondary Fallback: Save local file copy in public/images/${folder}/
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public", "images", folder);
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, uniqueFileName);
      await writeFile(filePath, buffer);

      if (!publicUrl) {
        publicUrl = `/images/${folder}/${uniqueFileName}`;
      }
    } catch (localErr) {
      console.warn("[api/images/upload] Local file write warning:", localErr);
    }

    if (!publicUrl) {
      publicUrl = `/images/${folder}/${uniqueFileName}`;
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      key: storageKey,
      name: file.name,
      file_size: file.size,
    });
  } catch (err) {
    console.error("Image upload server error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Image upload failed" },
      { status: 500 }
    );
  }
}

