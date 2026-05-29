import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import * as svc from "@/lib/services";
import { getUserPages } from "@/lib/meta-api";
import biharData from "@/lib/bihar-cities.json";

const KALAHANU_CLIENT_ID = "68e6b754d5f58f82267a82ae";
const CITY_KEYS = ["city", "location", "town", "district"];
const normalizeCity = (v: unknown) =>
  String(v ?? "")
    .trim()
    .toLowerCase();
const BIHAR_SET = new Set((biharData.cities as string[]).map(normalizeCity));
const isBiharCity = (v: string) => v != null && BIHAR_SET.has(normalizeCity(v));

function extractCityFromFields(f: Record<string, string>): string {
  for (const [k, v] of Object.entries(f)) {
    if (
      CITY_KEYS.includes(String(k).toLowerCase()) &&
      typeof v === "string" &&
      v.trim()
    ) {
      return v;
    }
  }
  return "";
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const GRAPH = "https://graph.facebook.com/v19.0";

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

async function getTokenPermissions(
  token: string,
): Promise<{ granted: string[]; declined: string[]; error?: any }> {
  try {
    const res = await fetch(`${GRAPH}/me/permissions?access_token=${token}`);
    const data = await res.json();
    if (data.error) {
      console.warn(
        "[LeadsSync] permissions error:",
        JSON.stringify(data.error),
      );
      return { granted: [], declined: [], error: data.error };
    }
    const granted: string[] = [];
    const declined: string[] = [];
    for (const p of data.data || []) {
      if (p.status === "granted") granted.push(p.permission);
      else declined.push(p.permission);
    }
    return { granted, declined };
  } catch (e: any) {
    return {
      granted: [],
      declined: [],
      error: { message: e?.message || String(e), type: "exception" },
    };
  }
}

async function getAdAccounts(
  token: string,
): Promise<{ accounts: { id: string; name: string }[]; error?: any }> {
  try {
    const res = await fetch(
      `${GRAPH}/me/adaccounts?fields=id,name&limit=50&access_token=${token}`,
    );
    const data = await res.json();
    if (data.error) {
      console.warn("[LeadsSync] adaccounts error:", JSON.stringify(data.error));
      return { accounts: [], error: data.error };
    }
    return { accounts: data.data || [] };
  } catch (e: any) {
    return {
      accounts: [],
      error: { message: e?.message || String(e), type: "exception" },
    };
  }
}

function todayUnixRange(): { since: number; until: number } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  return { since: Math.floor(start.getTime() / 1000), until: Math.floor(end.getTime() / 1000) };
}

async function fetchAdAccountLeads(
  adAccountId: string,
  token: string,
): Promise<{ leads: any[]; error?: any; httpStatus?: number }> {
  const { since, until } = todayUnixRange();
  const leads: any[] = [];
  let nextUrl: string | null =
    `${GRAPH}/${adAccountId}/leads?fields=id,created_time,ad_id,ad_name,adset_id,adset_name,campaign_id,campaign_name,field_data&filtering=[{"field":"time_created","operator":"IN_RANGE","value":[${since},${until}]}]&limit=100&access_token=${token}`;
  let firstError: any = undefined;
  let lastStatus: number | undefined = undefined;

  while (nextUrl) {
    try {
      const res = await fetch(nextUrl);
      lastStatus = res.status;
      const data = await res.json();
      if (data.error) {
        console.warn(
          `[LeadsSync] Ad account leads error [${adAccountId}] http=${res.status}:`,
          JSON.stringify(data.error),
        );
        if (!firstError) firstError = data.error;
        break;
      }
      leads.push(...(data.data || []));
      nextUrl = data.paging?.next || null;
    } catch (e: any) {
      console.warn(
        `[LeadsSync] Ad account leads fetch threw [${adAccountId}]:`,
        e?.message,
      );
      if (!firstError)
        firstError = { message: e?.message || String(e), type: "exception" };
      break;
    }
  }
  return { leads, error: firstError, httpStatus: lastStatus };
}

async function fetchPageFormLeads(
  pageId: string,
  pageToken: string,
): Promise<any[]> {
  const { since, until } = todayUnixRange();
  const leads: any[] = [];
  try {
    const formsRes = await fetch(
      `${GRAPH}/${pageId}/leadgen_forms?fields=id,name,status&limit=50&access_token=${pageToken}`,
    );
    const formsData = await formsRes.json();
    if (formsData.error) return leads;

    for (const form of formsData.data || []) {
      let nextUrl: string | null =
        `${GRAPH}/${form.id}/leads?fields=id,created_time,ad_id,ad_name,adset_id,adset_name,campaign_id,campaign_name,field_data&filtering=[{"field":"time_created","operator":"IN_RANGE","value":[${since},${until}]}]&limit=100&access_token=${pageToken}`;
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
    let filteredNonBihar = 0;

    const allRawLeads: any[] = [];
    const seenMetaIds = new Set<string>();

    const fbAdsCol = await svc.getCollection("fbAdsConnections");
    const fbConn = await fbAdsCol.findOne({ clientId });
    const fbToken = fbConn?.accessToken || token;
    const fbTokenSource = fbConn?.accessToken
      ? "fbAdsConnection.accessToken"
      : "client.metaAccessToken";
    console.log(`[LeadsSync] Using token from: ${fbTokenSource}`);

    const permInfo = await getTokenPermissions(fbToken);
    const hasAdsRead =
      permInfo.granted.includes("ads_read") ||
      permInfo.granted.includes("ads_management");
    const hasLeadsRetrieval = permInfo.granted.includes("leads_retrieval");
    console.log(
      `[LeadsSync] Token permissions — granted: [${permInfo.granted.join(", ")}], declined: [${permInfo.declined.join(", ")}]`,
    );
    console.log(
      `[LeadsSync] ads_read/ads_management present: ${hasAdsRead}; leads_retrieval present: ${hasLeadsRetrieval}`,
    );

    const adAccounts: { id: string; name: string }[] = [];
    let adAccountDiscoveryError: any = undefined;

    if (fbConn?.adAccountId) {
      const storedId = fbConn.adAccountId.startsWith("act_")
        ? fbConn.adAccountId
        : `act_${fbConn.adAccountId}`;
      adAccounts.push({ id: storedId, name: storedId });
      console.log(`[LeadsSync] Using stored ad account: ${storedId}`);
    } else {
      const { accounts, error } = await getAdAccounts(fbToken);
      adAccounts.push(...accounts);
      if (error) adAccountDiscoveryError = error;
      console.log(
        `[LeadsSync] Discovered ${accounts.length} ad accounts via token${error ? ` (error: ${JSON.stringify(error)})` : ""}`,
      );
    }

    const adAccountStats: Array<{
      id: string;
      name: string;
      leadCount: number;
      httpStatus?: number;
      error?: any;
    }> = [];

    for (const adAccount of adAccounts) {
      const { leads, error, httpStatus } = await fetchAdAccountLeads(
        adAccount.id,
        fbToken,
      );
      console.log(
        `[LeadsSync] Ad account ${adAccount.name} (${adAccount.id}): ${leads.length} leads, http=${httpStatus ?? "n/a"}${error ? `, error=${JSON.stringify(error)}` : ""}`,
      );
      adAccountStats.push({
        id: adAccount.id,
        name: adAccount.name,
        leadCount: leads.length,
        httpStatus,
        error,
      });
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
        const patch: Record<string, any> = {};
        if (!existingById.metaLeadId) patch.metaLeadId = ml.id;
        if (!existingById.campaignName && ml.campaign_name)
          patch.campaignName = ml.campaign_name;
        if (!existingById.campaignId && ml.campaign_id)
          patch.campaignId = ml.campaign_id;
        if (!existingById.adSetName && ml.adset_name)
          patch.adSetName = ml.adset_name;
        if (!existingById.adName && ml.ad_name) patch.adName = ml.ad_name;
        if (Object.keys(patch).length) {
          await leadsCol.updateOne({ _id: existingById._id }, { $set: patch });
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
          const patch: Record<string, any> = { metaLeadId: ml.id };
          if (!existingByContact.campaignName && ml.campaign_name)
            patch.campaignName = ml.campaign_name;
          if (!existingByContact.campaignId && ml.campaign_id)
            patch.campaignId = ml.campaign_id;
          if (!existingByContact.adSetName && ml.adset_name)
            patch.adSetName = ml.adset_name;
          if (!existingByContact.adName && ml.ad_name)
            patch.adName = ml.ad_name;
          await leadsCol.updateOne(
            { _id: existingByContact._id },
            { $set: patch },
          );
          skipped++;
          continue;
        }
      }

      if (clientId === KALAHANU_CLIENT_ID) {
        const cityValue = extractCityFromFields(f);
        if (!isBiharCity(cityValue)) {
          filteredNonBihar++;
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
        filteredNonBihar,
        total: allRawLeads.length,
        adAccounts: adAccounts.length,
        pages: pages.length,
        diagnostics: {
          tokenSource: fbTokenSource,
          tokenPermissions: {
            granted: permInfo.granted,
            declined: permInfo.declined,
            hasAdsRead,
            hasLeadsRetrieval,
            permissionsError: permInfo.error,
          },
          adAccountDiscoveryError,
          adAccountStats,
        },
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
