import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import sharp from "sharp";
import { requireAuth } from "@/lib/require-auth";

// About-us team photos: always stored as WebP (resized to max 1200px) in this
// app's public/ dir. The returned URL is absolute because the separate
// website app renders these images from another origin.
export async function POST(request: Request) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be under 15MB" }, { status: 400 });
    }

    const webp = await sharp(Buffer.from(await file.arrayBuffer()))
      .rotate() // respect EXIF orientation from phone photos
      .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    const uploadDir = join(process.cwd(), "public", "uploads", "team");
    await mkdir(uploadDir, { recursive: true });

    const base = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "member";
    const filename = `${Date.now()}-${base}.webp`;
    await writeFile(join(uploadDir, filename), webp);

    // Behind the prod proxy request.url is internal, so prefer the public URL.
    const origin =
      (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_APP_URL) ||
      new URL(request.url).origin;
    return NextResponse.json({ success: true, url: `${origin}/uploads/team/${filename}` });
  } catch (error: any) {
    console.error("Team image upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 },
    );
  }
}
