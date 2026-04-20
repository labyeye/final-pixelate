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

    // Fetch whatsapp messages to get REAL delivery status from webhook
    const messages = await db
      .collection("whatsapp_messages")
      .find({})
      .toArray();

    // Calculate insights
    const insights = campaigns.reduce(
      (acc: any, campaign: any) => ({
        totalInitiated: acc.totalInitiated + campaign.totalContacts,
        totalSent: acc.totalSent + campaign.sent,
        totalDelivered: acc.totalDelivered + campaign.delivered,
        totalRead: acc.totalRead + campaign.read,
        totalReplied: acc.totalReplied + campaign.replied,
        totalFailed: acc.totalFailed + campaign.failed,
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

    // =============== REAL DELIVERY STATUS FROM WEBHOOK ===============
    // Count actual delivery status from whatsapp_messages collection
    // This is the source of truth - what the webhook says actually happened
    const deliveredCount = messages.filter(
      (m) => m.deliveryStatus === "delivered" || m.status === "delivered"
    ).length;
    
    const failedCount = messages.filter(
      (m) => m.deliveryStatus === "failed" || m.status === "failed"
    ).length;
    
    const sentCount = messages.filter(
      (m) => m.messageType === "sent"
    ).length;
    
    const receivedCount = messages.filter(
      (m) => m.messageType === "received"
    ).length;

    // Count messages still pending (sent but not delivered yet)
    const pendingCount = messages.filter(
      (m) => m.messageType === "sent" && m.deliveryStatus !== "delivered" && m.deliveryStatus !== "failed"
    ).length;

    // =============== MESSAGE CATEGORIES FOR PRICING ===============
    const byCategory: Record<string, number> = {
      marketing: 0,
      "marketing-lite": 0,
      utility: 0,
      authentication: 0,
      "authentication-international": 0,
      "ai-provider": 0,
      service: 0,
      "customer-service": 0,
      "entry-point": 0,
    };

    messages.forEach((msg: any) => {
      const category = msg.category || msg.templateName?.toLowerCase() || "marketing";
      if (category in byCategory) {
        byCategory[category]++;
      }
    });

    // =============== DELIVERY STATUS BREAKDOWN ===============
    // Count by actual webhook status - this shows what REALLY happened
    const failedMessages = messages.filter(
      (m) => m.deliveryStatus === "failed" || m.status === "failed"
    );

    // Group failures by reason for diagnostics
    const failureReasons: Record<string, number> = {};
    failedMessages.forEach((msg: any) => {
      const reason = msg.failureReason || msg.error_reason || "Unknown";
      failureReasons[reason] = (failureReasons[reason] || 0) + 1;
    });

    // =============== PRICING CALCULATION ===============
    // Only count DELIVERED messages for charges (not just sent)
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

    // Calculate charges ONLY for delivered messages
    let estimatedCharges = 0;
    const deliveredByCategory: Record<string, number> = {};

    messages.forEach((msg: any) => {
      // Only charge for delivered messages
      if (msg.deliveryStatus === "delivered" || msg.status === "delivered") {
        const category = msg.category || msg.templateName?.toLowerCase() || "marketing";
        deliveredByCategory[category] = (deliveredByCategory[category] || 0) + 1;
        estimatedCharges += chargesPerCategory[category] || 0.25;
      }
    });

    return NextResponse.json({
      success: true,
      campaigns,
      insights: {
        ...insights,
        // Override with real webhook data
        totalDelivered: deliveredCount,
        totalFailed: failedCount,
        totalSent: sentCount,
        totalReplied: receivedCount,
        
        // Category breakdown
        byCategory,
        deliveredByCategory,
        
        // Delivery status breakdown from webhook
        deliveryStatus: {
          delivered: deliveredCount,
          failed: failedCount,
          pending: pendingCount,
          sent: sentCount,
        },
        
        // Failure diagnostics
        failureReasons,
        
        // Estimated charges (only for delivered)
        estimatedCharges: parseFloat(estimatedCharges.toFixed(2)),
        
        // Additional metrics for insights
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
      },
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
