import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/mongodb";

interface BulkMessageRequest {
  contacts: Array<{
    name: string;
    phone: string;
    company?: string;
  }>;
  template_name?: string;
  language?: string;
  is_promotional?: boolean;
  campaignId?: string;
  services?: {
    service_one?: string;
    service_two?: string;
    service_three?: string;
  };
}

interface WhatsAppResponse {
  messages: Array<{
    id: string;
    message_status: string;
  }>;
}

const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION || "v21.0";
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

const DELAY_BETWEEN_MESSAGES = 1000;

async function sendPersonalizedMessage(
  phone: string,
  name: string,
  _company: string | undefined,
  templateName: string = "bni_outreach",
  services?: {
    service_one?: string;
    service_two?: string;
    service_three?: string;
  },
) {
  try {
    const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_ID}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phone,
      type: "template",
      template: {
        name: templateName,
        language: { code: "en" },
        components: [
          {
            type: "header",
            parameters: [
              {
                type: "text",
                parameter_name: "person_name",
                text: name,
              },
            ],
          },
          {
            type: "body",
            parameters: [
              {
                type: "text",
                parameter_name: "service_one",
                text: services?.service_one ?? "Website and App Development",
              },
              {
                type: "text",
                parameter_name: "service_two",
                text:
                  services?.service_two ??
                  "Software (ERP and CRM) Software Development",
              },
              {
                type: "text",
                parameter_name: "service_three",
                text: services?.service_three ?? "Digital Media Solutions",
              },
            ],
          },
        ],
      },
    };

    console.log(`📤 Sending to ${phone}:`, JSON.stringify(payload, null, 2));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`Failed to send message to ${phone}:`, error);
      return {
        success: false,
        phone,
        error: error.error?.message || "Failed to send message",
      };
    }

    const data: WhatsAppResponse = await response.json();
    return {
      success: true,
      phone,
      messageId: data.messages?.[0]?.id,
    };
  } catch (error: any) {
    console.error(`Error sending message to ${phone}:`, error);
    return { success: false, phone, error: error.message };
  }
}

function formatPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/[^\d+]/g, "");
  if (!cleaned.startsWith("+")) {
    if (cleaned.length === 10) cleaned = "+91" + cleaned;
    else if (cleaned.length === 12 && cleaned.startsWith("91"))
      cleaned = "+" + cleaned;
  }
  return cleaned;
}

export async function POST(request: NextRequest) {
  try {
    const body: BulkMessageRequest = await request.json();
    const { contacts, template_name = "bni_outreach", services } = body;

    if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
      return NextResponse.json(
        { error: "contacts array is required and must not be empty" },
        { status: 400 },
      );
    }

    if (!WHATSAPP_PHONE_ID || !WHATSAPP_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "WhatsApp API credentials not configured" },
        { status: 500 },
      );
    }

    if (contacts.length > 100) {
      return NextResponse.json(
        { error: "Maximum 100 contacts per request (use pagination)" },
        { status: 400 },
      );
    }

    const results = [];
    let successCount = 0;
    let failureCount = 0;

    console.log(
      `🚀 Starting bulk message send to ${contacts.length} contacts...`,
    );

    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];

      if (!contact.phone || !contact.name) {
        results.push({
          success: false,
          phone: contact.phone || "unknown",
          error: "Missing required fields: phone and name",
        });
        failureCount++;
        continue;
      }

      try {
        const formattedPhone = formatPhoneNumber(contact.phone);
        const result = await sendPersonalizedMessage(
          formattedPhone,
          contact.name,
          contact.company,
          template_name,
          services,
        );

        results.push(result);
        if (result.success) {
          successCount++;
          console.log(`✅ Message sent to ${contact.name} (${formattedPhone})`);

          try {
            const db = await getDb();
            await db.collection("whatsapp_messages").insertOne({
              phone: formattedPhone,
              contactName: contact.name,
              messageType: "sent",
              message: `Bulk WhatsApp message sent via template: ${template_name}`,
              templateName: template_name,
              status: "sent",
              messageId: result.messageId,
              timestamp: new Date(),
              campaignId: body.campaignId,
              createdAt: new Date(),
              updatedAt: new Date(),
            } as any);
          } catch (dbError) {
            console.error("Failed to save message to inbox:", dbError);
          }
        } else {
          failureCount++;
          console.log(`❌ Failed to send to ${contact.name}: ${result.error}`);
        }
      } catch (error: any) {
        results.push({
          success: false,
          phone: contact.phone,
          error: error.message,
        });
        failureCount++;
      }

      if (i < contacts.length - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, DELAY_BETWEEN_MESSAGES),
        );
      }
    }

    console.log(
      `📊 Bulk send complete: ${successCount} sent, ${failureCount} failed`,
    );

    try {
      const db = await getDb();
      const now = new Date();
      const campaign = {
        name: `WhatsApp Campaign - ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
        description: `Bulk messaging campaign for ${template_name}`,
        templateName: template_name,
        status: "completed",
        totalContacts: contacts.length,
        sent: successCount,
        delivered: successCount,
        read: 0,
        replied: 0,
        failed: failureCount,
        startDate: now,
        endDate: now,
        createdBy: "bulk-messaging",
        createdAt: now,
        updatedAt: now,
      };

      await db.collection("campaigns").insertOne(campaign as any);
    } catch (dbError: any) {
      console.error("Failed to save campaign:", dbError);
    }

    return NextResponse.json({
      summary: {
        total: contacts.length,
        successful: successCount,
        failed: failureCount,
        success_rate: `${((successCount / contacts.length) * 100).toFixed(2)}%`,
      },
      details: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Bulk messaging error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Bulk WhatsApp messaging endpoint",
    endpoint: "POST /api/whatsapp/bulk-send",
    documentation: "/api/whatsapp/bulk-send/docs",
  });
}
