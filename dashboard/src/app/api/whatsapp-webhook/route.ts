/**
 * /api/whatsapp-webhook
 *
 * Meta WhatsApp Cloud API Webhook endpoint.
 *
 * GET  – Hub verification challenge (Meta calls this once when you register
 *         the webhook in the App Dashboard).
 * POST – Incoming status updates and inbound message events.
 *
 * Setup in Meta App Dashboard:
 *   1. Go to: App Dashboard → WhatsApp → Configuration → Webhook
 *   2. Callback URL:  https://<your-domain>/api/whatsapp-webhook
 *   3. Verify Token:  value of WHATSAPP_WEBHOOK_VERIFY_TOKEN in .env
 *   4. Subscribe to fields: messages, message_status_updates
 *
 * FIXES APPLIED:
 *  - Added HMAC-SHA256 signature verification (X-Hub-Signature-256 header).
 *    Without this, ANYONE can POST fake "delivered" events to your webhook.
 *    Set WHATSAPP_APP_SECRET in your env to your Meta App's "App Secret".
 *  - "failed" delivery events are logged with full error context
 *  - Returns 200 immediately (Meta retries if no 200 within 5 seconds)
 *
 * Environment variables required:
 *   WHATSAPP_WEBHOOK_VERIFY_TOKEN  – arbitrary secret you choose and paste
 *                                    into Meta's webhook config panel
 *   WHATSAPP_APP_SECRET            – Meta App Secret (from App Dashboard → Basic Settings)
 *                                    Used to verify X-Hub-Signature-256 header.
 *
 * Status events tracked:
 *   sent       – Meta accepted and queued to carrier network
 *   delivered  – message delivered to recipient device (confirmed)
 *   read       – recipient opened the message
 *   failed     – delivery FAILED — customer did NOT receive the message
 *                Check error.code for the reason. Common codes:
 *                  131030 = not a WhatsApp number
 *                  131026 = undeliverable (blocked, unreachable)
 *                  131047 = session/window issue
 */

import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { getCollection } from "@/lib/services";

// ── Types ─────────────────────────────────────────────────────────────────────

interface WAStatusError {
  code: number;
  title: string;
  message?: string;
  error_data?: { details?: string };
}

interface WAStatus {
  id: string;           // wamid
  status: "sent" | "delivered" | "read" | "failed";
  timestamp: string;
  recipient_id: string;
  conversation?: { id: string; origin?: { type: string } };
  errors?: WAStatusError[];
}

interface WAInboundMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: { body: string };
}

interface WAContact {
  profile: { name: string };
  wa_id: string;
}

interface WAChange {
  field: string;
  value: {
    messaging_product: string;
    metadata: { display_phone_number: string; phone_number_id: string };
    statuses?: WAStatus[];
    messages?: WAInboundMessage[];
    contacts?: WAContact[];
    errors?: WAStatusError[];
  };
}

interface WAWebhookBody {
  object: string;
  entry: Array<{
    id: string;
    changes: WAChange[];
  }>;
}

// ── GET – Webhook Verification ────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode      = searchParams.get("hub.mode");
  const token     = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

  if (!verifyToken) {
    console.error("[WA Webhook] WHATSAPP_WEBHOOK_VERIFY_TOKEN is not set.");
    return new NextResponse("Server misconfiguration", { status: 500 });
  }

  if (mode === "subscribe" && token === verifyToken) {
    console.info("[WA Webhook] Verification successful.");
    // Must return the challenge as plain text with 200
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn("[WA Webhook] Verification failed — token mismatch or wrong mode.");
  return new NextResponse("Forbidden", { status: 403 });
}

// ── POST – Event Handler ──────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // ── HMAC Signature Verification ───────────────────────────────────────────
  // Meta signs every POST with X-Hub-Signature-256: sha256=<hex>
  // Without this check, anyone can spoof delivery confirmations.
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (appSecret) {
    const sigHeader = req.headers.get("x-hub-signature-256");
    if (!sigHeader) {
      console.warn("[WA Webhook] Missing X-Hub-Signature-256 header.");
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Read raw body as text for HMAC (must match exactly what Meta signed)
    const rawBody = await req.text();
    const expectedSig =
      "sha256=" +
      createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");

    // Timing-safe comparison to prevent timing attacks
    const sigBuffer = Buffer.from(sigHeader);
    const expectedBuffer = Buffer.from(expectedSig);
    const signaturesMatch =
      sigBuffer.length === expectedBuffer.length &&
      timingSafeEqual(sigBuffer, expectedBuffer);

    if (!signaturesMatch) {
      console.warn("[WA Webhook] Signature mismatch — possible spoofed request.");
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Parse body from already-read text
    let body: WAWebhookBody;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return new NextResponse("Bad Request", { status: 400 });
    }
    return processWebhookBody(body);
  }

  // No app secret configured — parse normally (less secure, fine for dev)
  let body: WAWebhookBody;
  try {
    body = await req.json();
  } catch {
    return new NextResponse("Bad Request", { status: 400 });
  }
  return processWebhookBody(body);
}

function processWebhookBody(body: WAWebhookBody): NextResponse | Response {
  // Meta always sends object: "whatsapp_business_account"
  if (body.object !== "whatsapp_business_account") {
    return new NextResponse("Not WhatsApp", { status: 400 });
  }

  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== "messages") continue;

      const val = change.value;

      // ── Delivery / Read status updates ──────────────────────────────────
      for (const status of val.statuses ?? []) {
        handleStatusUpdate(status);
      }

      // ── Inbound messages (optional: auto-reply, logging) ────────────────
      for (const msg of val.messages ?? []) {
        // Fire-and-forget — do NOT await (webhook must return 200 within 5s)
        handleInboundMessage(msg, val.contacts ?? []).catch((e) =>
          console.error("[WA Webhook] handleInboundMessage error:", e),
        );
      }
    }
  }

  // Always return 200 OK immediately — Meta retries if it doesn't get 200
  // within 5 seconds. Do NOT do slow DB operations synchronously here.
  return new NextResponse("OK", { status: 200 });
}

// ── Handlers ──────────────────────────────────────────────────────────────────

function handleStatusUpdate(status: WAStatus) {
  const { id: wamid, status: state, recipient_id, timestamp, errors } = status;
  const ts = new Date(Number(timestamp) * 1000).toISOString();

  switch (state) {
    case "sent":
      console.info(`[WA Webhook] SENT      — wamid: ${wamid}, to: ${recipient_id}, at: ${ts}`);
      break;

    case "delivered":
      console.info(`[WA Webhook] DELIVERED — wamid: ${wamid}, to: ${recipient_id}, at: ${ts}`);
      // Update invoice delivery status in DB
      updateInvoiceWhatsAppStatus(wamid, "delivered", { whatsapp_delivered_at: ts }).catch(
        (e) => console.error("[WA Webhook] DB update failed for DELIVERED:", e),
      );
      break;

    case "read":
      console.info(`[WA Webhook] READ      — wamid: ${wamid}, to: ${recipient_id}, at: ${ts}`);
      // Update invoice read status in DB
      updateInvoiceWhatsAppStatus(wamid, "read", { whatsapp_read_at: ts }).catch(
        (e) => console.error("[WA Webhook] DB update failed for READ:", e),
      );
      break;

    case "failed":
      // This is the critical path for silent delivery failures.
      // error.code tells you WHY it failed (see Meta docs for full list).
      const errCode  = errors?.[0]?.code;
      const errTitle = errors?.[0]?.title;
      const errData  = errors?.[0]?.error_data?.details;
      console.error(
        `[WA Webhook] FAILED    — wamid: ${wamid}, to: ${recipient_id}, at: ${ts}\n` +
        `  Error code:  ${errCode ?? "unknown"}\n` +
        `  Error title: ${errTitle ?? "unknown"}\n` +
        `  Details:     ${errData ?? "none"}`,
      );
      // Update invoice failed status in DB
      updateInvoiceWhatsAppStatus(wamid, "failed", {
        whatsapp_failed_at: ts,
        whatsapp_fail_code: errCode,
        whatsapp_fail_reason: errTitle ?? errData ?? "unknown",
      }).catch((e) => console.error("[WA Webhook] DB update failed for FAILED:", e));
      break;
  }
}

/**
 * Updates the invoice document matching a wamid with a new WhatsApp delivery status.
 * Non-blocking — called with .catch() so webhook always returns 200.
 */
async function updateInvoiceWhatsAppStatus(
  wamid: string,
  status: string,
  extraFields: Record<string, any> = {},
) {
  try {
    const col = await getCollection("invoices");
    await col.updateOne(
      { whatsapp_message_id: wamid },
      { $set: { whatsapp_send_status: status, ...extraFields } },
    );
  } catch (e) {
    console.error("[WA Webhook] updateInvoiceWhatsAppStatus error:", e);
  }
}

async function handleInboundMessage(msg: WAInboundMessage, contacts: WAContact[]) {
  const senderName = contacts.find((c) => c.wa_id === msg.from)?.profile?.name ?? "Unknown";
  const messageText = (msg.text?.body ?? "").trim().toUpperCase();

  console.info(
    `[WA Webhook] INBOUND — from: ${msg.from} (${senderName}), type: ${msg.type}, ` +
    `text: ${msg.text?.body ?? "(non-text)"}`,
  );

  // Store incoming message in database for inbox view
  try {
    const db = await getDb();
    const incomingMsg = {
      phone: msg.from,
      contactName: senderName,
      messageType: "received" as const,
      message: msg.text?.body ?? "(non-text message)",
      status: "received",
      messageId: msg.id,
      timestamp: new Date(Number(msg.timestamp) * 1000),
      metadata: msg.type,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.collection("whatsapp_messages").insertOne(incomingMsg as any);
    console.info(`[WA Webhook] ✅ Stored incoming message from ${msg.from} (${senderName}) in inbox`);
  } catch (e) {
    console.error("[WA Webhook] Failed to store incoming message:", e);
  }

  // ── STOP / opt-out handling ──────────────────────────────────────────────
  // WhatsApp policy: if a user sends STOP (or common variants), you MUST
  // stop sending them messages immediately. We set whatsapp_opted_in = false
  // on their client record so the opt-in guard in send-invoice-whatsapp blocks future sends.
  const OPT_OUT_KEYWORDS = ["STOP", "UNSUBSCRIBE", "CANCEL", "OPT OUT", "OPTOUT", "QUIT", "END"];
  if (OPT_OUT_KEYWORDS.includes(messageText)) {
    console.warn(
      `[WA Webhook] OPT-OUT — ${msg.from} (${senderName}) sent "${msg.text?.body}". Revoking opt-in.`,
    );
    try {
      const clientsCol = await getCollection("clients");
      // Find the client by phone number (strip country code variants)
      const phoneVariants = [msg.from, msg.from.replace(/^91/, "")];
      await clientsCol.updateMany(
        {
          $or: [
            { phone: { $in: phoneVariants } },
            { whatsapp: { $in: phoneVariants } },
            { phone: msg.from.slice(-10) },   // last 10 digits
          ],
        },
        {
          $set: {
            whatsapp_opted_in: false,
            whatsapp_opt_out_time: new Date().toISOString(),
            whatsapp_opt_out_reason: `User replied: ${msg.text?.body}`,
          },
        },
      );
      console.info(`[WA Webhook] Opt-out saved for phone: ${msg.from}`);
    } catch (e) {
      console.error("[WA Webhook] Failed to save opt-out:", e);
    }
  }
}
