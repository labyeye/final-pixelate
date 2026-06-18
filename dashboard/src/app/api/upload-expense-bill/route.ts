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

    // cwd() = dashboard folder, go up one level to reach project root, then into website
    const uploadDir = join(
      process.cwd(),
      "..",
      "website",
      "assets",
      "expense-bills",
    );

    await mkdir(uploadDir, { recursive: true });

    // Verify directory is accessible after creation
    await access(uploadDir);

    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // URL served from website root (pixelatenest.com/assets/expense-bills/...)
    const url = `/assets/expense-bills/${filename}`;

    return NextResponse.json({ success: true, url, filename, filePath });
  } catch (error: any) {
    console.error("Expense bill upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 },
    );
  }
}
