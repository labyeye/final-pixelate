import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth.error) return auth.error;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400, headers: CORS });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files allowed" }, { status: 400, headers: CORS });
    }
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "PDF must be under 50 MB" }, { status: 413, headers: CORS });
    }

    const uploadDir = join(process.cwd(), "public", "uploads", "brand-guides");
    await mkdir(uploadDir, { recursive: true });

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const filename = `${Date.now()}-${safeName}`;
    const filePath = join(uploadDir, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const url = `/uploads/brand-guides/${filename}`;
    return NextResponse.json({ success: true, url, filename }, { headers: CORS });
  } catch (err: any) {
    console.error("[upload-brand-guide-pdf]", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500, headers: CORS });
  }
}
