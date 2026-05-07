import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import * as svc from "@/lib/services";
import { getUserPages, getLeadAdForms, getFormLeads } from "@/lib/meta-api";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

export async function POST(request: Request) {
  try {
    const { clientId } = await request.json();
    if (!clientId) {
      return NextResponse.json({ error: "clientId is required" }, { status: 400, headers: CORS });
    }

    const clientsCol = await svc.getCollection("clients");
    let client: any;
    try {
      client = await clientsCol.findOne({ _id: new ObjectId(clientId) });
    } catch {
      return NextResponse.json({ error: "Invalid clientId" }, { status: 400, headers: CORS });
    }
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404, headers: CORS });
    }

    const token: string | null = client.metaAccessToken || null;
    if (!token) {
      return NextResponse.json(
        { error: "No Meta access token saved for this client. Go to Social Tokens tab and connect Facebook." },
        { status: 400, headers: CORS },
      );
    }

    // Fetch all pages for this token to get page-level tokens
    let pages: any[] = [];
    try {
      pages = await getUserPages(token);
    } catch (e: any) {
      return NextResponse.json(
        { error: `Could not fetch Facebook Pages: ${e.message}` },
        { status: 400, headers: CORS },
      );
    }

    if (pages.length === 0) {
      return NextResponse.json(
        { error: "No Facebook Pages found for this token." },
        { status: 400, headers: CORS },
      );
    }

    const leadsCol = await svc.getCollection("leads");
    let synced = 0;
    let skipped = 0;
    const formsSynced: string[] = [];

    for (const page of pages) {
      const pageToken = page.access_token || token;

      // Fetch lead gen forms for this page
      let forms: any[] = [];
      try {
        const formsRes = await fetch(
          `https://graph.facebook.com/v19.0/${page.id}/leadgen_forms?fields=id,name,status,leads_count&access_token=${pageToken}`,
        );
        const formsData = await formsRes.json();
        if (!formsData.error) forms = formsData.data || [];
      } catch {}

      for (const form of forms) {
        formsSynced.push(form.name);

        // Fetch leads from this form
        let formLeads: any[] = [];
        try {
          formLeads = await getFormLeads(form.id, pageToken);
        } catch {}

        for (const ml of formLeads) {
          const f: Record<string, string> = {};
          for (const field of ml.field_data || []) {
            f[field.name] = field.values?.[0] || "";
          }

          const phone = f["phone_number"] || f["phone"] || "";
          const email = f["email"] || "";
          const name = f["full_name"] || f["name"] || "Meta Ads Lead";

          if (!phone && !email) continue;

          // Dedup by phone or email within this client's leads
          const query: any = { clientId };
          if (phone && email) query.$or = [{ phone }, { email }];
          else if (phone) query.phone = phone;
          else query.email = email;

          const existing = await leadsCol.findOne(query);
          if (existing) { skipped++; continue; }

          await leadsCol.insertOne({
            clientId,
            name,
            phone,
            email,
            source: `Meta Ads — ${page.name}`,
            formName: form.name,
            status: "not called",
            createdAt: new Date(ml.created_time),
            syncedAt: new Date(),
          });
          synced++;
        }
      }
    }

    return NextResponse.json(
      { synced, skipped, pages: pages.length, forms: formsSynced.length },
      { headers: CORS },
    );
  } catch (e: any) {
    console.error("Client leads sync error:", e);
    return NextResponse.json(
      { error: e.message || "Sync failed" },
      { status: 500, headers: CORS },
    );
  }
}
