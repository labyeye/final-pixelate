import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const body = await request.json();

    console.log("Syncing WhatsApp messages from webhook...");

    const webhookUrl = "https://backend.pixelatenest.com/api/whatsapp-webhook";
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

    console.log("Webhook URL:", webhookUrl);
    console.log("Using access token for authorization");

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Access-Token": accessToken || "",
      },
    });

    console.log("Webhook response status:", webhookResponse.status);

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error("Webhook error response:", errorText);
      throw new Error(
        `Webhook fetch failed: ${webhookResponse.status} ${webhookResponse.statusText}. Response: ${errorText}`,
      );
    }

    const webhookData = await webhookResponse.json();
    console.log("Webhook data received:", webhookData);

    let syncedCount = 0;
    let messages = webhookData.messages || webhookData.data || [];

    if (!Array.isArray(messages)) {
      messages = [messages];
    }

    for (const msg of messages) {
      try {
        const existing = await db
          .collection("whatsapp_messages")
          .findOne({ messageId: msg.id || msg.messageId });

        if (!existing) {
          const document = {
            phone: msg.from || msg.phone || msg.sender,
            contactName: msg.contactName || msg.senderName || "Unknown",
            messageType: msg.type === "incoming" ? "received" : "sent",
            message: msg.body || msg.message || msg.text || "",
            templateName: msg.templateName,

            status:
              msg.status || (msg.type === "incoming" ? "received" : "sent"),
            messageId: msg.id || msg.messageId,
            timestamp: new Date(msg.timestamp || msg.createdAt || Date.now()),
            repliedAt: msg.repliedAt ? new Date(msg.repliedAt) : null,

            deliveryStatus:
              msg.status || (msg.type === "incoming" ? "received" : "sent"),

            failureReason: msg.error_data?.details || msg.error_reason || null,
            failureCode: msg.error_code || null,

            category: msg.templateName?.toLowerCase() || "marketing",
            metadata: msg.metadata,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          await db.collection("whatsapp_messages").insertOne(document as any);
          syncedCount++;
          console.log(
            `✅ Synced message from ${document.contactName} - Status: ${document.deliveryStatus}`,
          );
        } else {
          await db.collection("whatsapp_messages").updateOne(
            { messageId: msg.id || msg.messageId },
            {
              $set: {
                status: msg.status || existing.status,
                deliveryStatus: msg.status || existing.deliveryStatus,
                failureReason:
                  msg.error_data?.details ||
                  msg.error_reason ||
                  existing.failureReason,
                failureCode: msg.error_code || existing.failureCode,
                updatedAt: new Date(),
              },
            },
          );
          console.log(
            `✅ Updated message status - New Status: ${msg.status || existing.status}`,
          );
        }
      } catch (msgError: any) {
        console.error("Failed to sync individual message:", msgError);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Synced ${syncedCount} new messages from webhook`,
      totalProcessed: messages.length,
      synced: syncedCount,
    });
  } catch (error: any) {
    console.error("Webhook sync error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to sync messages from webhook",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const webhookUrl = "https://backend.pixelatenest.com/api/whatsapp-webhook";
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

    console.log("Checking webhook status...");

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Access-Token": accessToken || "",
      },
    });

    console.log("Webhook status check - response code:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Webhook status check error:", errorText);
      return NextResponse.json(
        {
          success: false,
          error: `Webhook unreachable: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: 502 },
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      webhookStatus: "connected",
      data: data,
    });
  } catch (error: any) {
    console.error("Webhook status check error:", error);
    return NextResponse.json(
      {
        success: false,
        webhookStatus: "disconnected",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
