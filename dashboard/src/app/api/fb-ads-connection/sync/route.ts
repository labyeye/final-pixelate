import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { verifyToken } from "@/lib/auth";
import { getFormLeads, hashForMeta, sendConversionEvents } from "@/lib/meta-api";
import type { FbLead } from "@/lib/meta-api";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

/** Map a Facebook Lead Ad submission to our leads collection schema */
function mapFbLeadToLead(fbLead: FbLead, clientId: string) {
  const fields: Record<string, string> = {};
  for (const f of fbLead.field_data || []) {
    fields[f.name.toLowerCase()] = (f.values || [])[0] || "";
  }

  const firstName = fields.first_name || "";
  const lastName = fields.last_name || "";
  const name =
    fields.full_name ||
    [firstName, lastName].filter(Boolean).join(" ") ||
    "Unknown";

  const phone =
    fields.phone_number || fields.phone || fields.mobile_number || fields.mobile || "";
  const email = fields.email || fields.email_address || "";
  const city = fields.city || fields.location || "";
  const subject =
    fields.project_type ||
    fields.interest ||
    fields.service ||
    fields.services ||
    fields.message ||
    fields.comment ||
    "";

  return {
    name: name.trim(),
    email,
    phone,
    city,
    subject,
    source: "Facebook Lead Ads",
    status: "not called",
    clientId,
    fbLeadId: fbLead.id,
    fbRawFields: fields,
    createdAt: new Date(fbLead.created_time),
  };
}

/**
 * POST /api/fb-ads-connection/sync
 * Admin or client: trigger a sync of FB leads into the CRM leads collection.
 * Body: { clientId }  (admin can pass any clientId; client uses their own from token)
 *
 * Behaviour:
 * - Fetches leads from all selectedFormIds since lastSyncAt
 * - Deduplicates by fbLeadId
 * - Imports new leads with source "Facebook Lead Ads" and correct clientId
 * - If datasetId is configured, sends a "Lead" conversion event to Meta for each import
 * - Updates lastSyncAt and totalImported counters
 */
export async function POST(request: NextRequest) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace("Bearer ", "");
  const decoded: any = verifyToken(token);
  if (!decoded) return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: CORS });

  const body = await request.json().catch(() => ({}));
  let clientId: string = body.clientId || "";
  if (decoded.role === "client") clientId = decoded.clientId;
  if (!clientId) return NextResponse.json({ error: "clientId required" }, { status: 400, headers: CORS });

  const connCol = await svc.getCollection("fbAdsConnections");
  const conn = await connCol.findOne({ clientId });
  if (!conn?.accessToken) {
    return NextResponse.json(
      { error: "No FB Ads connection found. Please configure it first." },
      { status: 404, headers: CORS },
    );
  }

  const selectedFormIds: string[] = conn.selectedFormIds || [];
  if (selectedFormIds.length === 0) {
    return NextResponse.json(
      { error: "No Lead Ad forms selected. Select at least one form in the FB Ads settings." },
      { status: 400, headers: CORS },
    );
  }

  const since = conn.lastSyncAt
    ? Math.floor(new Date(conn.lastSyncAt).getTime() / 1000)
    : undefined;

  const leadsCol = await svc.getCollection("leads");
  let imported = 0;
  let skipped = 0;
  const conversionEvents: any[] = [];

  for (const formId of selectedFormIds) {
    try {
      const fbLeads = await getFormLeads(formId, conn.accessToken, since);

      for (const fbLead of fbLeads) {
        const existing = await leadsCol.findOne({ fbLeadId: fbLead.id });
        if (existing) { skipped++; continue; }

        const lead = mapFbLeadToLead(fbLead, clientId);
        await leadsCol.insertOne(lead);
        imported++;

        // Prepare conversion event for Meta (if datasetId configured)
        if (conn.datasetId) {
          conversionEvents.push({
            event_name: "Lead",
            event_time: Math.floor(new Date(fbLead.created_time).getTime() / 1000),
            hashed_email: lead.email ? hashForMeta(lead.email) : undefined,
            hashed_phone: lead.phone ? hashForMeta(lead.phone) : undefined,
            lead_id: fbLead.id,
          });
        }
      }
    } catch (e: any) {
      console.error(`Sync error for form ${formId}:`, e.message);
    }
  }

  // Fire-and-forget: send conversion events to Meta
  if (conversionEvents.length > 0 && conn.datasetId) {
    sendConversionEvents(conn.datasetId, conn.accessToken, conversionEvents).catch((e) =>
      console.error("Conversions API error:", e.message),
    );
  }

  // Update sync metadata
  await connCol.updateOne(
    { clientId },
    {
      $set: { lastSyncAt: new Date() },
      $inc: { totalImported: imported },
    },
  );

  return NextResponse.json({ imported, skipped, total: imported + skipped }, { headers: CORS });
}
