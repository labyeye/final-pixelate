import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth.error) return auth.error;

  const accessToken = process.env.META_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v21.0";

  if (!accessToken || !phoneNumberId) {
    return NextResponse.json(
      { error: "Server misconfiguration: missing WhatsApp credentials." },
      { status: 500 },
    );
  }

  let incoming: FormData;
  try {
    incoming = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Could not parse form data." },
      { status: 400 },
    );
  }

  const file = incoming.get("file") as File | null;
  if (!file) {
    return NextResponse.json(
      { error: "No file provided. Send a `file` field." },
      { status: 400 },
    );
  }

  const fileName = file.name || "document.pdf";
  const fileType = file.type || "application/pdf";

  const metaForm = new FormData();
  metaForm.append("file", file, fileName);
  metaForm.append("type", fileType);
  metaForm.append("messaging_product", "whatsapp");

  try {
    const res = await fetch(
      `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/media`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: metaForm,
      },
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errMsg = (data as any)?.error?.message || "Meta media upload failed";
      console.error("[whatsapp/upload-media] API error:", JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: errMsg, detail: (data as any)?.error },
        { status: res.status >= 500 ? 502 : 422 },
      );
    }

    const mediaId: string | undefined = (data as any)?.id;
    if (!mediaId) {
      return NextResponse.json(
        { error: "Meta did not return a media ID." },
        { status: 502 },
      );
    }

    return NextResponse.json({ mediaId, fileName, fileType });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Network error" }, { status: 502 });
  }
}
