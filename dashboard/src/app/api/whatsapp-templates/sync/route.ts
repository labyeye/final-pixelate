import { NextResponse } from "next/server";
import getDb from "@/lib/mongodb";

const COLLECTION = "whatsapp_templates";

// ── GET — fetch approved templates from Meta and upsert into local DB ──
export async function GET() {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const wabaId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v21.0";

  if (!accessToken || !wabaId) {
    return NextResponse.json(
      {
        error:
          "WHATSAPP_ACCESS_TOKEN and WHATSAPP_BUSINESS_ACCOUNT_ID must be set in .env to sync from Meta.",
      },
      { status: 500 },
    );
  }

  let metaTemplates: any[] = [];
  try {
    const url = `https://graph.facebook.com/${apiVersion}/${wabaId}/message_templates?limit=100&fields=name,status,category,language,components,id`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const json = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          error:
            (json?.error?.message ?? "Meta API error") +
            " — Check WHATSAPP_BUSINESS_ACCOUNT_ID and token permissions.",
        },
        { status: 422 },
      );
    }

    metaTemplates = json?.data ?? [];
  } catch (err: any) {
    return NextResponse.json(
      { error: "Network error contacting Meta API: " + err.message },
      { status: 502 },
    );
  }

  const db = await getDb();
  let upserted = 0;
  let skipped = 0;

  for (const t of metaTemplates) {
    const headerComp = (t.components ?? []).find((c: any) => c.type === "HEADER");
    const bodyComp = (t.components ?? []).find((c: any) => c.type === "BODY");
    const footerComp = (t.components ?? []).find((c: any) => c.type === "FOOTER");
    const buttonsComp = (t.components ?? []).find((c: any) => c.type === "BUTTONS");

    const update = {
      name: t.name,
      category: t.category ?? "UTILITY",
      language: t.language ?? "en_US",
      headerType: headerComp?.format ?? "NONE",
      headerText: headerComp?.text ?? null,
      body: bodyComp?.text ?? "",
      footer: footerComp?.text ?? null,
      buttons: buttonsComp?.buttons ?? [],
      status: t.status ?? "UNKNOWN",
      metaTemplateId: t.id ?? null,
      syncedFromMeta: true,
      updatedAt: new Date(),
    };

    const result = await db.collection(COLLECTION).updateOne(
      { name: t.name },
      {
        $set: update,
        $setOnInsert: {
          variables: [],
          notes: null,
          submittedAt: null,
          approvedAt: null,
          rejectedReason: null,
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );

    if (result.upsertedCount > 0 || result.modifiedCount > 0) upserted++;
    else skipped++;
  }

  return NextResponse.json({
    success: true,
    total: metaTemplates.length,
    upserted,
    skipped,
  });
}
