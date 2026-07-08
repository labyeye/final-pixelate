import { NextResponse } from "next/server";
import { writeFile, mkdir, access } from "fs/promises";
import { join } from "path";
import { requireAuth } from "@/lib/require-auth";

export async function POST(request: Request) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 },
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, "-").toLowerCase();
    const filename = `${timestamp}-${originalName}`;

    // Save inside the dashboard app's own public/ dir so it's served from
    // the same origin (backend.pixelatenest.com) that generated it — the
    // separate `website` app does not share a filesystem in production.
    const uploadDir = join(
      process.cwd(),
      "public",
      "uploads",
      "expense-bills",
    );

    await mkdir(uploadDir, { recursive: true });

    // Verify directory is accessible after creation
    await access(uploadDir);

    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Served from this app's own origin (e.g. backend.pixelatenest.com/uploads/expense-bills/...)
    const url = `/uploads/expense-bills/${filename}`;

    return NextResponse.json({ success: true, url, filename, filePath });
  } catch (error: any) {
    console.error("Expense bill upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 },
    );
  }
}
