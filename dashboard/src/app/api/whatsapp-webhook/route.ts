import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { getCollection } from "@/lib/services";

interface WAStatusError {
  code: number;
  title: string;
  message?: string;
  error_data?: { details?: string };
}

interface WAStatus {
  id: string;
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

  if (!verifyToken) {
    console.error("[WA Webhook] WHATSAPP_WEBHOOK_VERIFY_TOKEN is not set.");
    return new NextResponse("Server misconfiguration", { status: 500 });
  }

  if (mode === "subscribe" && token === verifyToken) {
    console.info("[WA Webhook] Verification successful.");

    return new NextResponse(challenge, { status: 200 });
  }

  console.warn(
    "[WA Webhook] Verification failed — token mismatch or wrong mode.",
  );
  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (appSecret) {
    const sigHeader = req.headers.get("x-hub-signature-256");
    if (!sigHeader) {
      console.warn("[WA Webhook] Missing X-Hub-Signature-256 header.");
      return new NextResponse("Forbidden", { status: 403 });
    }

    const rawBody = await req.text();
    const expectedSig =
      "sha256=" +
      createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");

    const sigBuffer = Buffer.from(sigHeader);
    const expectedBuffer = Buffer.from(expectedSig);
    const signaturesMatch =
      sigBuffer.length === expectedBuffer.length &&
      timingSafeEqual(sigBuffer, expectedBuffer);

    if (!signaturesMatch) {
      console.warn(
        "[WA Webhook] Signature mismatch — possible spoofed request.",
      );
      return new NextResponse("Forbidden", { status: 403 });
    }

    let body: WAWebhookBody;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return new NextResponse("Bad Request", { status: 400 });
    }
    return processWebhookBody(body);
  }

  let body: WAWebhookBody;
  try {
    body = await req.json();
  } catch {
    return new NextResponse("Bad Request", { status: 400 });
  }
  return processWebhookBody(body);
}

function processWebhookBody(body: WAWebhookBody): NextResponse | Response {
  if (body.object !== "whatsapp_business_account") {
    return new NextResponse("Not WhatsApp", { status: 400 });
  }

  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== "messages") continue;

      const val = change.value;

      for (const status of val.statuses ?? []) {
        handleStatusUpdate(status);
      }

      for (const msg of val.messages ?? []) {
        handleInboundMessage(msg, val.contacts ?? []).catch((e) =>
          console.error("[WA Webhook] handleInboundMessage error:", e),
        );
      }
    }
  }

  return new NextResponse("OK", { status: 200 });
}

function handleStatusUpdate(status: WAStatus) {
  const { id: wamid, status: state, recipient_id, timestamp, errors } = status;
  const ts = new Date(Number(timestamp) * 1000).toISOString();

  switch (state) {
    case "sent":
      console.info(
        `[WA Webhook] SENT      — wamid: ${wamid}, to: ${recipient_id}, at: ${ts}`,
      );

      logSentMessage(wamid, recipient_id, ts).catch((e) =>
        console.error("[WA Webhook] DB insert failed for SENT:", e),
      );
      break;

    case "delivered":
      console.info(
        `[WA Webhook] DELIVERED — wamid: ${wamid}, to: ${recipient_id}, at: ${ts}`,
      );

      updateInvoiceWhatsAppStatus(wamid, "delivered", {
        whatsapp_delivered_at: ts,
      }).catch((e) =>
        console.error("[WA Webhook] DB update failed for DELIVERED:", e),
      );
      break;

    case "read":
      console.info(
        `[WA Webhook] READ      — wamid: ${wamid}, to: ${recipient_id}, at: ${ts}`,
      );

      updateInvoiceWhatsAppStatus(wamid, "read", {
        whatsapp_read_at: ts,
      }).catch((e) =>
        console.error("[WA Webhook] DB update failed for READ:", e),
      );
      break;

    case "failed":
      const errCode = errors?.[0]?.code;
      const errTitle = errors?.[0]?.title;
      const errData = errors?.[0]?.error_data?.details;
      console.error(
        `[WA Webhook] FAILED    — wamid: ${wamid}, to: ${recipient_id}, at: ${ts}\n` +
          `  Error code:  ${errCode ?? "unknown"}\n` +
          `  Error title: ${errTitle ?? "unknown"}\n` +
          `  Details:     ${errData ?? "none"}`,
      );

      updateInvoiceWhatsAppStatus(wamid, "failed", {
        whatsapp_failed_at: ts,
        whatsapp_fail_code: errCode,
        whatsapp_fail_reason: errTitle ?? errData ?? "unknown",
      }).catch((e) =>
        console.error("[WA Webhook] DB update failed for FAILED:", e),
      );
      break;
  }
}

async function logSentMessage(wamid: string, recipientId: string, ts: string) {
  const col = await getCollection("whatsapp_messages");
  await col.updateOne(
    { messageId: wamid },
    {
      $setOnInsert: {
        phone: recipientId,
        messageType: "sent",
        message: "WhatsApp message sent",
        status: "sent",
        messageId: wamid,
        timestamp: new Date(ts),
        createdAt: new Date(),
      },
      $set: { updatedAt: new Date() },
    },
    { upsert: true },
  );
}

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

async function handleInboundMessage(
  msg: WAInboundMessage,
  contacts: WAContact[],
) {
  const senderName =
    contacts.find((c) => c.wa_id === msg.from)?.profile?.name ?? "Unknown";
  const messageText = (msg.text?.body ?? "").trim().toUpperCase();

  console.info(
    `[WA Webhook] INBOUND — from: ${msg.from} (${senderName}), type: ${msg.type}, ` +
      `text: ${msg.text?.body ?? "(non-text)"}`,
  );

  try {
    const col = await getCollection("whatsapp_messages");
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
    await col.insertOne(incomingMsg as any);
    console.info(
      `[WA Webhook] ✅ Stored incoming message from ${msg.from} (${senderName}) in inbox`,
    );
  } catch (e) {
    console.error("[WA Webhook] Failed to store incoming message:", e);
  }

  const OPT_OUT_KEYWORDS = [
    "STOP",
    "UNSUBSCRIBE",
    "CANCEL",
    "OPT OUT",
    "OPTOUT",
    "QUIT",
    "END",
  ];
  if (OPT_OUT_KEYWORDS.includes(messageText)) {
    console.warn(
      `[WA Webhook] OPT-OUT — ${msg.from} (${senderName}) sent "${msg.text?.body}". Revoking opt-in.`,
    );
    try {
      const clientsCol = await getCollection("clients");

      const phoneVariants = [msg.from, msg.from.replace(/^91/, "")];
      await clientsCol.updateMany(
        {
          $or: [
            { phone: { $in: phoneVariants } },
            { whatsapp: { $in: phoneVariants } },
            { phone: msg.from.slice(-10) },
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
