import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/mongodb";

interface WhatsAppMessage {
  _id?: string;
  phone: string;
  contactName: string;
  messageType: "sent" | "received";
  message: string;
  templateName?: string;
  status: "sent" | "delivered" | "read" | "failed";
  messageId?: string;
  timestamp: Date;
  reply?: string;
  replyTimestamp?: Date;
  campaignId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");
    const status = searchParams.get("status");

    let query: any = {};

    if (phone) {
      query.phone = phone;
    }

    if (status) {
      query.status = status;
    }

    const messages = await db
      .collection("whatsapp_messages")
      .find(query)
      .sort({ timestamp: -1 })
      .limit(100)
      .toArray();

    // Get conversation threads
    const conversations = await db
      .collection("whatsapp_messages")
      .aggregate([
        {
          $group: {
            _id: "$phone",
            phone: { $first: "$phone" },
            contactName: { $first: "$contactName" },
            lastMessage: { $first: "$message" },
            lastTimestamp: { $first: "$timestamp" },
            unreadCount: {
              $sum: {
                $cond: [
                  { $and: [{ $eq: ["$messageType", "received"] }, { $eq: ["$status", "unread"] }] },
                  1,
                  0,
                ],
              },
            },
            messageCount: { $sum: 1 },
          },
        },
        { $sort: { lastTimestamp: -1 } },
      ])
      .toArray();

    return NextResponse.json({
      success: true,
      messages,
      conversations,
    });
  } catch (error: any) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const body = await request.json();

    const message: WhatsAppMessage = {
      phone: body.phone,
      contactName: body.contactName,
      messageType: body.messageType || "sent",
      message: body.message,
      templateName: body.templateName,
      status: body.status || "sent",
      messageId: body.messageId,
      timestamp: new Date(body.timestamp) || new Date(),
      campaignId: body.campaignId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("whatsapp_messages").insertOne(message as any);

    return NextResponse.json({
      success: true,
      message: { ...message, _id: result.insertedId },
    });
  } catch (error: any) {
    console.error("Failed to save message:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
