"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  CheckCircle2,
  MessageCircle,
  Phone,
  Send,
  TrendingUp,
  XCircle,
  Eye,
  Trash2,
} from "lucide-react";

interface CampaignInsights {
  totalInitiated: number;
  totalSent: number;
  totalDelivered: number;
  totalRead: number;
  totalReplied: number;
  totalFailed: number;
  byCategory?: Record<string, number>;
  deliveredByCategory?: Record<string, number>;
  deliveryStatus?: Record<string, number>;
  failureReasons?: Record<string, string | number>;
  estimatedCharges?: number;
  metrics?: {
    deliveryRate: string | number;
    failureRate: string | number;
    pendingRate: string | number;
  };
}

interface Campaign {
  _id: string;
  name: string;
  templateName: string;
  status: "draft" | "active" | "completed" | "paused";
  totalContacts: number;
  sent: number;
  delivered: number;
  read: number;
  replied: number;
  failed: number;
  startDate: string;
  createdAt: string;
}

export function CampaignInsights() {
  const [insights, setInsights] = useState<CampaignInsights | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await apiFetch("/api/campaigns");
      if (!response.ok) throw new Error("Failed to fetch campaigns");

      const data = await response.json();
      setInsights(data.insights);
      setCampaigns(data.campaigns || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCampaign = async (campaignId: string) => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) {
      return;
    }

    try {
      console.log("Deleting campaign with ID:", campaignId);
      const response = await apiFetch(`/api/campaigns/${campaignId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log("Delete response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete campaign");
      }

      await fetchCampaigns();
      alert("Campaign deleted successfully!");
    } catch (err: any) {
      console.error("Error:", err);
      alert(`Error deleting campaign: ${err.message}`);
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-500">Loading campaigns...</div>
    );
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;
  if (!insights)
    return <div className="text-center text-gray-500">No campaigns found</div>;

  const sentRate =
    insights.totalSent > 0
      ? ((insights.totalSent / insights.totalInitiated) * 100).toFixed(0)
      : "0";
  const deliveredRate =
    insights.totalDelivered > 0
      ? ((insights.totalDelivered / insights.totalSent) * 100).toFixed(0)
      : "0";
  const readRate =
    insights.totalRead > 0
      ? ((insights.totalRead / insights.totalDelivered) * 100).toFixed(0)
      : "0";
  const failureRate =
    insights.totalFailed > 0
      ? ((insights.totalFailed / insights.totalInitiated) * 100).toFixed(0)
      : "0";

  return (
    <div className="space-y-6">
      {}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Campaign Insights
          </h2>
          <p className="text-gray-600 mt-1">
            Track and analyze your campaign performance in real-time
          </p>
        </div>
        <Button variant="outline" onClick={fetchCampaigns}>
          <TrendingUp className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </div>
              Initiated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {insights.totalInitiated.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-2">100% baseline</div>
            <div className="w-full bg-gray-200 h-1 rounded-full mt-3">
              <div
                className="bg-blue-500 h-1 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Send className="h-4 w-4 text-amber-600" />
              </div>
              Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {insights.totalSent.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-2">{sentRate}%</div>
            <div className="w-full bg-gray-200 h-1 rounded-full mt-3">
              <div
                className="bg-amber-500 h-1 rounded-full"
                style={{ width: `${sentRate}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <div className="bg-teal-100 p-2 rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-teal-600" />
              </div>
              Delivered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {insights.totalDelivered.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-2">{deliveredRate}%</div>
            <div className="w-full bg-gray-200 h-1 rounded-full mt-3">
              <div
                className="bg-teal-500 h-1 rounded-full"
                style={{ width: `${deliveredRate}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <div className="bg-red-100 p-2 rounded-lg">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
              Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {insights.totalFailed.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-2">{failureRate}%</div>
            <div className="w-full bg-gray-200 h-1 rounded-full mt-3">
              <div
                className="bg-red-500 h-1 rounded-full"
                style={{ width: `${failureRate}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Eye className="h-4 w-4 text-blue-600" />
              </div>
              Read
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {insights.totalRead.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-2">{readRate}%</div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <MessageCircle className="h-4 w-4 text-green-600" />
              </div>
              Replied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {insights.totalReplied.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {insights.totalRead > 0
                ? ((insights.totalReplied / insights.totalRead) * 100).toFixed(
                    0,
                  )
                : "0"}
              %
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {insights.totalInitiated > 0
                ? (
                    ((insights.totalInitiated - insights.totalFailed) /
                      insights.totalInitiated) *
                    100
                  ).toFixed(1)
                : "0"}
              %
            </div>
            <div className="text-xs text-gray-500 mt-2">overall success</div>
          </CardContent>
        </Card>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">All Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Messages sent</span>
                <span className="font-semibold">
                  {insights.totalSent.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Messages delivered</span>
                <span className="font-semibold">
                  {insights.totalDelivered.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Messages received</span>
                <span className="font-semibold">
                  {insights.totalReplied.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Messages Sent by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              {insights.byCategory &&
                Object.entries(insights.byCategory).map(
                  ([category, count]) =>
                    count > 0 && (
                      <div key={category} className="flex justify-between">
                        <span className="text-gray-600 capitalize">
                          {category.replace(/-/g, " ")}:
                        </span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ),
                )}
              {(!insights.byCategory ||
                Object.values(insights.byCategory).every((v) => v === 0)) && (
                <p className="text-gray-400 text-xs">No messages sent yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              💰 Charges (Delivered Only)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivered (Charged)</span>
                <span className="font-semibold text-green-600">
                  {insights.deliveryStatus?.delivered || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Failed (No Charge)</span>
                <span className="font-semibold text-red-600">
                  {insights.deliveryStatus?.failed || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Pending (No Charge Yet)</span>
                <span className="font-semibold text-yellow-600">
                  {insights.deliveryStatus?.pending || 0}
                </span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>Total Charges:</span>
                <span className="text-orange-600">
                  ₹{(insights.estimatedCharges || 0).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500 pt-1">
                💡 Charges calculated only for successfully delivered messages
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              📊 Delivery Status from Webhook
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">✅ Delivered</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-green-600">
                    {insights.deliveryStatus?.delivered || 0}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({insights.metrics?.deliveryRate || 0}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">❌ Failed</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-red-600">
                    {insights.deliveryStatus?.failed || 0}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({insights.metrics?.failureRate || 0}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">⏳ Pending</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-yellow-600">
                    {insights.deliveryStatus?.pending || 0}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({insights.metrics?.pendingRate || 0}%)
                  </span>
                </div>
              </div>
              <div className="bg-blue-50 p-2 rounded mt-3 text-xs text-blue-800 border border-blue-200">
                💡 <strong>Real Data:</strong> These numbers come directly from
                WhatsApp webhook events, not just API responses.
              </div>
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              🔍 Why Messages Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            {insights.failureReasons &&
            Object.keys(insights.failureReasons).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(insights.failureReasons).map(
                  ([reason, count]) => (
                    <div
                      key={reason}
                      className="flex items-start justify-between text-sm"
                    >
                      <span className="text-gray-600 flex-1 break-words">
                        {reason}
                      </span>
                      <span className="font-semibold text-red-600 ml-2">
                        {count}
                      </span>
                    </div>
                  ),
                )}
                <div className="bg-red-50 p-2 rounded mt-3 text-xs text-red-800 border border-red-200">
                  ⚠️ <strong>Issue:</strong> Check why messages are failing.
                  Common reasons: Invalid number, not on WhatsApp, or recipient
                  blocked.
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p className="text-sm">
                  ✅ No failures! All messages delivered successfully.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          {campaigns.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No campaigns yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">
                      Campaign
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Template
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 font-semibold">
                      Sent/Total
                    </th>
                    <th className="text-right py-3 px-4 font-semibold">
                      Delivered
                    </th>
                    <th className="text-right py-3 px-4 font-semibold">Read</th>
                    <th className="text-right py-3 px-4 font-semibold">
                      Replied
                    </th>
                    <th className="text-center py-3 px-4 font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr
                      key={campaign._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 font-medium">{campaign.name}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {campaign.templateName}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            campaign.status === "active"
                              ? "bg-green-100 text-green-800"
                              : campaign.status === "completed"
                                ? "bg-blue-100 text-blue-800"
                                : campaign.status === "paused"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {campaign.status.charAt(0).toUpperCase() +
                            campaign.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {campaign.sent}/{campaign.totalContacts}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {campaign.delivered}
                      </td>
                      <td className="py-3 px-4 text-right">{campaign.read}</td>
                      <td className="py-3 px-4 text-right">
                        {campaign.replied}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => deleteCampaign(campaign._id)}
                          className="text-red-500 hover:text-red-700 inline-flex items-center gap-1"
                          title="Delete campaign"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
