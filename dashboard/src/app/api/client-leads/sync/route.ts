import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import * as svc from "@/lib/services";
import { getUserPages } from "@/lib/meta-api";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const GRAPH = "https://graph.facebook.com/v19.0";

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}


async function getAdAccounts(
  token: string,
): Promise<{ id: string; name: string }[]> {
  try {
    const res = await fetch(
      `${GRAPH}/me/adaccounts?fields=id,name&limit=50&access_token=${token}`,
    );
    const data = await res.json();
    if (data.error) {
      console.warn("adaccounts error:", data.error.message);
      return [];
    }
    return data.data || [];
  } catch {
    return [];
  }
}


async function fetchAdAccountLeads(
  adAccountId: string,
  token: string,
): Promise<any[]> {
  const leads: any[] = [];
  let nextUrl: string | null =
    `${GRAPH}/${adAccountId}/leads?fields=id,created_time,ad_id,ad_name,adset_id,adset_name,campaign_id,campaign_name,field_data&limit=100&access_token=${token}`;

  while (nextUrl) {
    try {
      const res = await fetch(nextUrl);
      const data = await res.json();
      if (data.error) {
        console.warn(
          `Ad account leads error [${adAccountId}]:`,
          data.error.message,
        );
        break;
      }
      leads.push(...(data.data || []));
      nextUrl = data.paging?.next || null;
    } catch {
      break;
    }
  }
  return leads;
}


async function fetchPageFormLeads(
  pageId: string,
  pageToken: string,
): Promise<any[]> {
  const leads: any[] = [];
  try {
    const formsRes = await fetch(
      `${GRAPH}/${pageId}/leadgen_forms?fields=id,name,status&limit=50&access_token=${pageToken}`,
    );
    const formsData = await formsRes.json();
    if (formsData.error) return leads;

    for (const form of formsData.data || []) {
      let nextUrl: string | null =
        `${GRAPH}/${form.id}/leads?fields=id,created_time,ad_id,field_data&limit=100&access_token=${pageToken}`;
      while (nextUrl) {
        try {
          const res = await fetch(nextUrl);
          const data = await res.json();
          if (data.error) break;
          for (const lead of data.data || []) {
            leads.push({ ...lead, _formName: form.name });
          }
          nextUrl = data.paging?.next || null;
        } catch {
          break;
        }
      }
    }
  } catch {}
  return leads;
}

function parseFields(fieldData: any[]): Record<string, string> {
  const f: Record<string, string> = {};
  for (const field of fieldData || []) {
    f[field.name] = field.values?.[0] || "";
  }
  return f;
}

function extractPhone(f: Record<string, string>): string {
  return (
    f["phone_number"] ||
    f["phone"] ||
    f["mobile_number"] ||
    f["contact_number"] ||
    f["mobile"] ||
    f["whatsapp_number"] ||
    f["Phone Number"] ||
    f["Phone"] ||
    ""
  );
}

function extractEmail(f: Record<string, string>): string {
  return f["email"] || f["email_address"] || f["Email"] || "";
}

function extractName(f: Record<string, string>): string {
  if (f["full_name"]) return f["full_name"];
  if (f["name"]) return f["name"];
  const first = f["first_name"] || "";
  const last = f["last_name"] || "";
  if (first || last) return `${first} ${last}`.trim();
  return "Meta Ads Lead";
}

export async function POST(request: Request) {
  try {
    const { clientId } = await request.json();
    if (!clientId) {
      return NextResponse.json(
        { error: "clientId is required" },
        { status: 400, headers: CORS },
      );
    }

    const clientsCol = await svc.getCollection("clients");
    let client: any;
    try {
      client = await clientsCol.findOne({ _id: new ObjectId(clientId) });
    } catch {
      return NextResponse.json(
        { error: "Invalid clientId" },
        { status: 400, headers: CORS },
      );
    }
    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404, headers: CORS },
      );
    }

    const token: string | null = client.metaAccessToken || null;
    if (!token) {
      return NextResponse.json(
        {
          error:
            "No Meta access token saved for this client. Go to Social Tokens tab and connect Facebook.",
        },
        { status: 400, headers: CORS },
      );
    }

    const leadsCol = await svc.getCollection("leads");
    let synced = 0;
    let skipped = 0;

    
    const allRawLeads: any[] = [];
    const seenMetaIds = new Set<string>();

    
    const fbAdsCol = await svc.getCollection("fbAdsConnections");
    const fbConn = await fbAdsCol.findOne({ clientId });
    const fbToken = fbConn?.accessToken || token;

    const adAccounts: { id: string; name: string }[] = [];

    if (fbConn?.adAccountId) {
      
      const storedId = fbConn.adAccountId.startsWith("act_")
        ? fbConn.adAccountId
        : `act_${fbConn.adAccountId}`;
      adAccounts.push({ id: storedId, name: storedId });
      console.log(`[LeadsSync] Using stored ad account: ${storedId}`);
    } else {
      
      const discovered = await getAdAccounts(fbToken);
      adAccounts.push(...discovered);
      console.log(
        `[LeadsSync] Discovered ${discovered.length} ad accounts via token`,
      );
    }

    for (const adAccount of adAccounts) {
      const leads = await fetchAdAccountLeads(adAccount.id, fbToken);
      console.log(
        `[LeadsSync] Ad account ${adAccount.name} (${adAccount.id}): ${leads.length} leads`,
      );
      for (const lead of leads) {
        if (!seenMetaIds.has(lead.id)) {
          seenMetaIds.add(lead.id);
          allRawLeads.push({ ...lead, _adAccountName: adAccount.name });
        }
      }
    }

    
    let pages: any[] = [];
    try {
      pages = await getUserPages(fbToken);
    } catch {}

    for (const page of pages) {
      const pageToken = page.access_token || token;
      const pageLeads = await fetchPageFormLeads(page.id, pageToken);
      console.log(
        `[LeadsSync] Page ${page.name}: ${pageLeads.length} leads from forms`,
      );
      for (const lead of pageLeads) {
        if (!seenMetaIds.has(lead.id)) {
          seenMetaIds.add(lead.id);
          allRawLeads.push({ ...lead, _pageName: page.name });
        }
      }
    }

    console.log(
      `[LeadsSync] Total unique leads to process: ${allRawLeads.length}`,
    );

    
    for (const ml of allRawLeads) {
      const f = parseFields(ml.field_data);
      const phone = extractPhone(f);
      const email = extractEmail(f);
      const name = extractName(f);

      
      const existingById = await leadsCol.findOne({
        clientId,
        $or: [{ metaLeadId: ml.id }, { fbLeadId: ml.id }],
      });
      if (existingById) {
        
        if (!existingById.metaLeadId) {
          await leadsCol.updateOne(
            { _id: existingById._id },
            {
              $set: {
                metaLeadId: ml.id,
                campaignName: ml.campaign_name || "",
                adName: ml.ad_name || "",
              },
            },
          );
        }
        skipped++;
        continue;
      }

      
      if (phone || email) {
        const orClauses: any[] = [];
        if (phone) orClauses.push({ phone });
        if (email) orClauses.push({ email });
        const existingByContact = await leadsCol.findOne({
          clientId,
          $or: orClauses,
        });
        if (existingByContact) {
          await leadsCol.updateOne(
            { _id: existingByContact._id },
            {
              $set: {
                metaLeadId: ml.id,
                campaignName: ml.campaign_name || "",
                adName: ml.ad_name || "",
              },
            },
          );
          skipped++;
          continue;
        }
      }

      await leadsCol.insertOne({
        clientId,
        metaLeadId: ml.id,
        name,
        phone,
        email,
        metaFields: f,
        source: "Meta Ads",
        campaignName: ml.campaign_name || "",
        campaignId: ml.campaign_id || "",
        adSetName: ml.adset_name || "",
        adName: ml.ad_name || ml._formName || "",
        formName: ml._formName || ml.ad_name || "",
        pageName: ml._pageName || "",
        adId: ml.ad_id || "",
        status: "not called",
        createdAt: new Date(ml.created_time),
        syncedAt: new Date(),
      });
      synced++;
    }

    return NextResponse.json(
      {
        synced,
        skipped,
        total: allRawLeads.length,
        adAccounts: adAccounts.length,
        pages: pages.length,
      },
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
