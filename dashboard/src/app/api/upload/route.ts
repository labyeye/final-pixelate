import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import os from "os";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",

  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Cache-Control, X-Requested-With",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400, headers: corsHeaders },
      );
    }

    const allowedTypes = [
      "image/",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const isValidType = allowedTypes.some(
      (type) => file.type.startsWith(type) || file.type === type,
    );

    if (!isValidType) {
      return NextResponse.json(
        { error: "File must be an image, PDF, or document" },
        { status: 400, headers: corsHeaders },
      );
    }

    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 15MB" },
        { status: 400, headers: corsHeaders },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, "-").toLowerCase();
    const filename = `${timestamp}-${originalName}`;

    const candidates = [
      join(process.cwd(), "..", "website", "assets", "resumes"),

      join(process.cwd(), "website", "assets", "resumes"),

      join(process.cwd(), "public", "assets", "resumes"),

      join(os.tmpdir(), "pixelatenest", "resumes"),
    ];

    let uploadDir: string | null = null;

    for (const cand of candidates) {
      try {
        await mkdir(cand, { recursive: true });

        if (existsSync(cand)) {
          uploadDir = cand;
          break;
        }
      } catch (err) {
        console.warn(
          "Could not use upload candidate",
          cand,
          err && (err as Error).message,
        );
      }
    }

    if (!uploadDir) {
      const fallback = join(os.tmpdir(), filename);
      try {
        await writeFile(fallback, buffer);
        const url = `file://${fallback}`;
        return NextResponse.json(
          {
            success: true,
            url,
            filename,
            message: "File uploaded to temporary storage",
          },
          { headers: corsHeaders },
        );
      } catch (err) {
        console.error("Failed to write to fallback tmp file", err);
        return NextResponse.json(
          {
            error:
              "Server cannot store uploaded files. Please configure external storage.",
          },
          { status: 500, headers: corsHeaders },
        );
      }
    }

    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    let url: string;
    if (
      uploadDir.includes(join("public", "assets")) ||
      uploadDir.includes(join("website", "assets"))
    ) {
      url = `./assets/resumes/${filename}`;
    } else if (uploadDir.includes(os.tmpdir())) {
      url = `file://${filePath}`;
    } else {
      url = `./assets/resumes/${filename}`;
    }

    return NextResponse.json(
      {
        success: true,
        url,
        filename,
        message: "File uploaded successfully",
      },
      { headers: corsHeaders },
    );
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500, headers: corsHeaders },
    );
  }
}
