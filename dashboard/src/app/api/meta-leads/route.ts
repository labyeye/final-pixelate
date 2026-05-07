import { NextResponse } from "next/server";
import * as svc from "@/lib/services";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

async function getPageToken(userToken: string, pageId: string): Promise<string> {
  const res = await fetch(
    `https://graph.facebook.com/v19.0/me/accounts?access_token=${userToken}`,
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const page = (data.data || []).find((p: any) => String(p.id) === String(pageId));
  if (page?.access_token) return page.access_token;
  // If not found in accounts, try treating the token as a page token directly
  return userToken;
}

export async function GET() {
  const TOKEN = process.env.META_ACCESS_TOKEN;
  const PAGE_ID = process.env.META_PAGE_ID;

  if (!TOKEN || !PAGE_ID) {
    return NextResponse.json(
      { error: "META_ACCESS_TOKEN and META_PAGE_ID are not set in .env" },
      { status: 500, headers: CORS },
    );
  }

  try {
    // Exchange user token for page access token (leadgen_forms requires page token)
    const pageToken = await getPageToken(TOKEN, PAGE_ID);

    // Lead gen forms live on the Facebook Page, not the Ad Account
    const formsRes = await fetch(
      `https://graph.facebook.com/v19.0/${PAGE_ID}/leadgen_forms?access_token=${pageToken}`,
    );
    const formsData = await formsRes.json();

    if (formsData.error) {
      return NextResponse.json(
        { error: formsData.error.message },
        { status: 400, headers: CORS },
      );
    }

    const forms: any[] = formsData.data || [];
    const col = await svc.getCollection("leads");
    let synced = 0;

    for (const form of forms) {
      const leadsRes = await fetch(
        `https://graph.facebook.com/v19.0/${form.id}/leads?fields=field_data,created_time&access_token=${pageToken}`,
      );
      const leadsData = await leadsRes.json();
      const metaLeads: any[] = leadsData.data || [];

      for (const ml of metaLeads) {
        const f: Record<string, string> = {};
        for (const field of ml.field_data || []) {
          f[field.name] = field.values?.[0] || "";
        }

        const phone = f["phone_number"] || f["phone"] || "";
        const email = f["email"] || "";

        // skip if no contact info
        if (!phone && !email) continue;

        // dedup by phone or email
        const existing = await col.findOne({
          $or: [
            ...(phone ? [{ phone }] : []),
            ...(email ? [{ email }] : []),
          ],
        });
        if (existing) continue;

        await col.insertOne({
          name: f["full_name"] || f["name"] || "Meta Ads Lead",
          phone,
          email,
          source: "Meta Ads",
          status: "not called",
          createdAt: new Date(ml.created_time),
        });
        synced++;
      }
    }

    return NextResponse.json({ synced }, { headers: CORS });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500, headers: CORS },
    );
  }
}
