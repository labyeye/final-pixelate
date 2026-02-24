import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";

export async function POST(req: NextRequest) {
  let body: { clientId?: string; invoiceNo?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { clientId, invoiceNo, source } = body;

  if (!clientId) {
    return NextResponse.json(
      { error: "clientId is required." },
      { status: 400 },
    );
  }

  try {
    const updated = await svc.updateById("clients", clientId, {
      whatsapp_opted_in: true,
      whatsapp_opt_in_time: new Date().toISOString(),
      whatsapp_opt_in_source: source ?? "invoice_creation",
      whatsapp_opt_in_invoice_no: invoiceNo ?? "",
    });

    console.info(
      `[WhatsApp Opt-In] Client ${clientId} opted in via ${source ?? "invoice_creation"} for invoice ${invoiceNo ?? "N/A"}`,
    );

    return NextResponse.json({ ok: true, clientId, updated });
  } catch (e: any) {
    console.error("[WhatsApp Opt-In] Failed to save opt-in:", e);
    return NextResponse.json(
      { error: e.message || "Failed to save opt-in." },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/whatsapp-optin
 *
 * Opt-out a client (e.g. when they reply STOP on WhatsApp).
 * Body: { clientId }
 */
export async function DELETE(req: NextRequest) {
  let body: { clientId?: string; reason?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { clientId, reason } = body;

  if (!clientId) {
    return NextResponse.json(
      { error: "clientId is required." },
      { status: 400 },
    );
  }

  try {
    await svc.updateById("clients", clientId, {
      whatsapp_opted_in: false,
      whatsapp_opt_out_time: new Date().toISOString(),
      whatsapp_opt_out_reason: reason ?? "manual",
    });

    console.info(
      `[WhatsApp Opt-Out] Client ${clientId} opted out. Reason: ${reason ?? "manual"}`,
    );

    return NextResponse.json({ ok: true, clientId });
  } catch (e: any) {
    console.error("[WhatsApp Opt-Out] Failed to save opt-out:", e);
    return NextResponse.json(
      { error: e.message || "Failed to save opt-out." },
      { status: 500 },
    );
  }
}
