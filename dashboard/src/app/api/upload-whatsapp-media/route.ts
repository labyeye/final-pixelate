/**
 * POST /api/upload-whatsapp-media
 *
 * Accepts a multipart/form-data upload with a PDF file, uploads it to the
 * WhatsApp Cloud API /media endpoint, and returns the WhatsApp media_id.
 *
 * This route runs entirely server-side – the browser never sees the access token.
 *
 * FIXES APPLIED:
 *  - API version defaults to v21.0 (matches send route)
 *  - Explicit MIME type enforcement on the FormData blob sent to WhatsApp
 *  - Full error logging including fbtrace_id for Meta support
 *  - File size logged for debugging oversized PDF issues
 *
 * Form fields expected:
 *   file  – the PDF file (Blob / File)
 *
 * Environment variables required (same as send-invoice-whatsapp):
 *   WHATSAPP_ACCESS_TOKEN
 *   WHATSAPP_PHONE_NUMBER_ID
 *   WHATSAPP_API_VERSION        (default: "v21.0")
 *   INTERNAL_API_SECRET         (optional, same as send route)
 *
 * IMPORTANT: WhatsApp media_id is tied to the WABA (phone number ID) that
 * uploaded it. Always use the SAME WHATSAPP_PHONE_NUMBER_ID in both routes.
 * Media IDs expire after 30 days (much less in practice — use immediately).
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // ── Auth ───────────────────────────────────────────────────────────────────
  const internalSecret = process.env.INTERNAL_API_SECRET;
  if (internalSecret) {
    const header = req.headers.get("x-internal-secret");
    if (header !== internalSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // ── Env ────────────────────────────────────────────────────────────────────
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  // FIX: must match the API version in send-invoice-whatsapp route
  const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v21.0";

  if (!accessToken || !phoneNumberId) {
    console.error("[WhatsApp Media] Missing WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID");
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  // ── Parse form data ────────────────────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid multipart form data." }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: 'Form field "file" is required.' }, { status: 400 });
  }

  // Validate MIME type – WhatsApp accepts application/pdf for documents
  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { error: `Invalid file type "${file.type}". Only application/pdf is accepted.` },
      { status: 400 },
    );
  }

  // Max file size: WhatsApp allows up to 100 MB for documents
  const MAX_BYTES = 100 * 1024 * 1024;
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 100 MB." },
      { status: 400 },
    );
  }

  // ── Build multipart upload for WhatsApp /media ─────────────────────────────
  // FIX: explicitly construct a new Blob with type "application/pdf" to
  // guarantee the MIME type is set correctly regardless of how the browser
  // sent the file. Some environments send "application/octet-stream" which
  // WhatsApp rejects with a cryptic error.
  const fileBuffer = await file.arrayBuffer();
  const pdfBlob = new Blob([fileBuffer], { type: "application/pdf" });
  const safeFilename = (file.name || "invoice.pdf").replace(/[^a-zA-Z0-9.\-_]/g, "_");

  console.info(
    `[WhatsApp Media] Uploading: ${safeFilename}, size: ${(file.size / 1024).toFixed(1)} KB`,
  );

  const waForm = new FormData();
  waForm.append("file", pdfBlob, safeFilename);
  waForm.append("type", "application/pdf");
  waForm.append("messaging_product", "whatsapp");

  const endpoint = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/media`;

  let waResponse: Response;
  try {
    waResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // Do NOT set Content-Type here – fetch sets multipart boundary automatically
      },
      body: waForm,
    });
  } catch (networkErr: any) {
    console.error("[WhatsApp Media] Network error:", networkErr);
    return NextResponse.json(
      { error: "Network error while uploading to WhatsApp. Try again." },
      { status: 502 },
    );
  }

  const waJson = await waResponse.json().catch(() => ({}));

  if (!waResponse.ok) {
    const errDetail = (waJson as any)?.error ?? {};
    console.error(
      `[WhatsApp Media] Upload failed — HTTP ${waResponse.status}, ` +
      `code: ${errDetail?.code}, fbtrace_id: ${errDetail?.fbtrace_id}:`,
      JSON.stringify(waJson, null, 2),
    );
    return NextResponse.json(
      {
        error: errDetail?.message ?? "WhatsApp media upload failed.",
        code: errDetail?.code,
        fbtrace_id: errDetail?.fbtrace_id,
        detail: errDetail,
      },
      { status: waResponse.status >= 500 ? 502 : 422 },
    );
  }

  const mediaId = (waJson as any)?.id;
  if (!mediaId) {
    console.error("[WhatsApp Media] No media id in response:", waJson);
    return NextResponse.json(
      { error: "WhatsApp returned no media_id. Inspect the full response." },
      { status: 502 },
    );
  }

  console.info(`[WhatsApp Media] Uploaded OK — mediaId: ${mediaId}, filename: ${safeFilename}`);

  return NextResponse.json({ mediaId });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
