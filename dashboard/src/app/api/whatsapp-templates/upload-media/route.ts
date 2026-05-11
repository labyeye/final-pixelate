import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/whatsapp-templates/upload-media
 *
 * Accepts a multipart/form-data body with a single `file` field.
 * Uploads the file to Meta's Resumable Upload API and returns
 * the header_handle string needed for template submission.
 *
 * Flow:
 *  1. POST /{waba-id}/uploads  — create upload session → { id: "upload:{session}" }
 *  2. POST /{session-id}       — upload bytes           → { h: "4::..." }
 */
export async function POST(req: NextRequest) {
  const accessToken = process.env.META_ACCESS_TOKEN;
  const appId = process.env.WHATSAPP_APP_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v21.0";

  if (!accessToken || !appId) {
    return NextResponse.json(
      { error: "Missing META_ACCESS_TOKEN or WHATSAPP_APP_ID in .env" },
      { status: 500 },
    );
  }

  // ── Parse multipart form ───────────────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Could not parse form data." },
      { status: 400 },
    );
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json(
      { error: "No file provided. Send a `file` field." },
      { status: 400 },
    );
  }

  const fileType = file.type || "application/octet-stream";
  const fileName = file.name || "upload";
  const fileBytes = await file.arrayBuffer();
  const fileLength = fileBytes.byteLength;

  console.info(
    `[upload-media] file="${fileName}" type="${fileType}" size=${fileLength}`,
  );

  // ── Step 1: Create upload session ─────────────────────────────────────────
  const sessionUrl =
    `https://graph.facebook.com/${apiVersion}/${appId}/uploads` +
    `?file_name=${encodeURIComponent(fileName)}` +
    `&file_length=${fileLength}` +
    `&file_type=${encodeURIComponent(fileType)}`;

  let sessionRes: Response;
  try {
    sessionRes = await fetch(sessionUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Network error creating upload session: " + err.message },
      { status: 502 },
    );
  }

  const sessionJson = await sessionRes.json().catch(() => ({}));
  if (!sessionRes.ok) {
    const errDetail = (sessionJson as any)?.error ?? {};
    console.error(
      "[upload-media] Session creation failed:",
      JSON.stringify(sessionJson, null, 2),
    );
    return NextResponse.json(
      {
        error: `Meta session error: ${errDetail.message ?? JSON.stringify(sessionJson)}`,
      },
      { status: 422 },
    );
  }

  const sessionId: string = (sessionJson as any)?.id;
  if (!sessionId) {
    return NextResponse.json(
      { error: "Meta did not return an upload session ID." },
      { status: 502 },
    );
  }
  console.info(`[upload-media] session created: ${sessionId}`);

  // ── Step 2: Upload file bytes ──────────────────────────────────────────────
  let uploadRes: Response;
  try {
    uploadRes = await fetch(
      `https://graph.facebook.com/${apiVersion}/${sessionId}`,
      {
        method: "POST",
        headers: {
          Authorization: `OAuth ${accessToken}`,
          file_offset: "0",
          "Content-Type": fileType,
        },
        body: fileBytes,
      },
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Network error uploading file: " + err.message },
      { status: 502 },
    );
  }

  const uploadJson = await uploadRes.json().catch(() => ({}));
  if (!uploadRes.ok) {
    const errDetail = (uploadJson as any)?.error ?? {};
    console.error(
      "[upload-media] Upload failed:",
      JSON.stringify(uploadJson, null, 2),
    );
    return NextResponse.json(
      {
        error: `Meta upload error: ${errDetail.message ?? JSON.stringify(uploadJson)}`,
      },
      { status: 422 },
    );
  }

  // Meta returns { "h": "4::ABC..." } — this is the header_handle
  const handle: string = (uploadJson as any)?.h;
  if (!handle) {
    return NextResponse.json(
      {
        error:
          "Meta did not return a media handle. Response: " +
          JSON.stringify(uploadJson),
      },
      { status: 502 },
    );
  }

  console.info(`[upload-media] handle obtained: ${handle.slice(0, 30)}…`);
  return NextResponse.json({ handle, fileName, fileType });
}
