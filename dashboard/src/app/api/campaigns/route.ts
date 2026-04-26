import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/mongodb";

interface Campaign {
  _id?: string;
  name: string;
  description?: string;
  templateName: string;
  status: "draft" | "active" | "completed" | "paused";
  totalContacts: number;
  sent: number;
  delivered: number;
  read: number;
  replied: number;
  failed: number;
  startDate: Date;
  endDate?: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    
    const campaigns = await db
      .collection("campaigns")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    
    const messages = await db
      .collection("whatsapp_messages")
      .find({})
      .toArray();

    console.log(`[Campaign Insights] Total messages in webhook: ${messages.length}`);
    
    
    const messagesByStatus = {
      sent: messages.filter((m: any) => m.deliveryStatus === "sent" || (m.status === "sent" && !m.deliveryStatus)).length,
      delivered: messages.filter((m: any) => m.deliveryStatus === "delivered" || m.status === "delivered").length,
      read: messages.filter((m: any) => m.deliveryStatus === "read" || m.status === "read").length,
      failed: messages.filter((m: any) => m.deliveryStatus === "failed" || m.status === "failed").length,
    };
    
    console.log(`[Campaign Insights] Messages by status:`, messagesByStatus);
    console.log(`[Campaign Insights] Sample messages:`, messages.slice(0, 3));

    
    const campaignInsights = campaigns.reduce(
      (acc: any, campaign: any) => ({
        totalInitiated: acc.totalInitiated + (campaign.totalContacts || 0),
        totalSent: acc.totalSent + (campaign.sent || 0),
        totalDelivered: acc.totalDelivered + (campaign.delivered || 0),
        totalRead: acc.totalRead + (campaign.read || 0),
        totalReplied: acc.totalReplied + (campaign.replied || 0),
        totalFailed: acc.totalFailed + (campaign.failed || 0),
      }),
      {
        totalInitiated: 0,
        totalSent: 0,
        totalDelivered: 0,
        totalRead: 0,
        totalReplied: 0,
        totalFailed: 0,
      }
    );

    
    
    const deliveredCount = messagesByStatus.delivered;
    const failedCount = messagesByStatus.failed;
    const sentCount = messagesByStatus.sent + messagesByStatus.delivered + messagesByStatus.read + messagesByStatus.failed;
    const readCount = messagesByStatus.read;
    const pendingCount = messagesByStatus.sent;

    
    const byCategory: Record<string, number> = {};

    messages.forEach((msg: any) => {
      const category = msg.category || msg.templateName?.toLowerCase() || "marketing";
      byCategory[category] = (byCategory[category] || 0) + 1;
    });

    
    const deliveredMessages = messages.filter(
      (m: any) => m.deliveryStatus === "delivered" || m.status === "delivered"
    );

    const failedMessages = messages.filter(
      (m: any) => m.deliveryStatus === "failed" || m.status === "failed"
    );

    
    const failureReasons: Record<string, number> = {};
    failedMessages.forEach((msg: any) => {
      const reason = msg.failureReason || msg.error_reason || msg.errorCode || "Unknown";
      failureReasons[reason] = (failureReasons[reason] || 0) + 1;
    });

    
    const chargesPerCategory: Record<string, number> = {
      marketing: 0.25,
      "marketing-lite": 0.15,
      utility: 0.06,
      authentication: 0.001,
      "authentication-international": 0.002,
      "ai-provider": 0.12,
      service: 0.06,
      "customer-service": 0.12,
      "entry-point": 0.001,
    };

    let estimatedCharges = 0;
    const deliveredByCategory: Record<string, number> = {};

    deliveredMessages.forEach((msg: any) => {
      const category = msg.category || msg.templateName?.toLowerCase() || "marketing";
      deliveredByCategory[category] = (deliveredByCategory[category] || 0) + 1;
      estimatedCharges += chargesPerCategory[category] || 0.25;
    });

    const insights = {
      
      totalInitiated: sentCount + pendingCount,
      totalSent: sentCount,
      totalDelivered: deliveredCount,
      totalRead: readCount,
      totalReplied: readCount, 
      totalFailed: failedCount,
      
      
      byCategory,
      deliveredByCategory,
      
      
      deliveryStatus: {
        delivered: deliveredCount,
        failed: failedCount,
        pending: pendingCount,
        read: readCount,
      },
      
      
      failureReasons,
      
      
      estimatedCharges: parseFloat(estimatedCharges.toFixed(2)),
      
      
      metrics: {
        deliveryRate: sentCount > 0 
          ? ((deliveredCount / sentCount) * 100).toFixed(1) 
          : "0",
        failureRate: sentCount > 0 
          ? ((failedCount / sentCount) * 100).toFixed(1) 
          : "0",
        pendingRate: sentCount > 0 
          ? ((pendingCount / sentCount) * 100).toFixed(1) 
          : "0",
      },
    };

    return NextResponse.json({
      success: true,
      campaigns,
      insights,
      debug: {
        messagesByStatus,
        totalMessages: messages.length,
        deliveredMessages: deliveredCount,
        failedMessages: failedCount,
        sentMessages: sentCount,
      }
    });
  } catch (error: any) {
    console.error("Failed to fetch campaigns:", error);
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

    const campaign: Campaign = {
      name: body.name,
      description: body.description,
      templateName: body.templateName,
      status: "active",
      totalContacts: body.totalContacts,
      sent: body.sent || 0,
      delivered: body.delivered || 0,
      read: body.read || 0,
      replied: body.replied || 0,
      failed: body.failed || 0,
      startDate: new Date(),
      createdBy: body.createdBy || "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("campaigns").insertOne(campaign as any);

    return NextResponse.json({
      success: true,
      campaign: { ...campaign, _id: result.insertedId },
    });
  } catch (error: any) {
    console.error("Failed to create campaign:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
