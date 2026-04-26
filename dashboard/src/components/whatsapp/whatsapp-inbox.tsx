"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageCircle,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Phone,
  Calendar,
  RefreshCw,
} from "lucide-react";

interface Message {
  _id: string;
  phone: string;
  contactName: string;
  messageType: "sent" | "received";
  message: string;
  status: "sent" | "delivered" | "read" | "failed";
  timestamp: string;
  templateName?: string;
  messageId?: string;
}

interface Conversation {
  _id: string;
  phone: string;
  contactName: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messageCount: number;
}

export function WhatsAppInbox() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [syncMessage, setSyncMessage] = useState("");

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch("/api/whatsapp/messages");
      if (!response.ok) throw new Error("Failed to fetch conversations");

      const data = await response.json();
      setConversations(data.conversations || []);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const syncWebhookMessages = async () => {
    setSyncing(true);
    setSyncMessage("");
    try {
      const response = await fetch("/api/whatsapp/webhook-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Sync failed");
      }

      setSyncMessage(
        `✅ Synced ${data.synced} new messages from webhook (${data.totalProcessed} total processed)`
      );

      
      await fetchConversations();

      
      setTimeout(() => setSyncMessage(""), 5000);
    } catch (err: any) {
      setSyncMessage(`❌ Sync failed: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const fetchConversationMessages = async (phone: string) => {
    try {
      const response = await fetch(`/api/whatsapp/messages?phone=${encodeURIComponent(phone)}`);
      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      setMessages(data.messages || []);
      setSelectedPhone(phone);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.phone.includes(searchQuery)
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      case "read":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading inbox...</div>;
  }

  return (
    <div className="space-y-6">
      {}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">WhatsApp Inbox</h2>
          <p className="text-gray-600 mt-1">
            View all messages and conversations from your bulk messaging campaigns
          </p>
        </div>
        <Button
          onClick={syncWebhookMessages}
          disabled={syncing}
          className="gap-2"
          variant="outline"
        >
          <RefreshCw
            className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`}
          />
          {syncing ? "Syncing..." : "Sync Messages"}
        </Button>
      </div>

      {syncMessage && (
        <div
          className={`p-3 rounded-md text-sm ${
            syncMessage.includes("✅")
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {syncMessage}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Conversations ({conversations.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">
                    No conversations yet
                  </p>
                ) : (
                  filteredConversations.map((conv) => (
                    <button
                      key={conv._id}
                      onClick={() => fetchConversationMessages(conv.phone)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition ${
                        selectedPhone === conv.phone
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">
                            {conv.contactName}
                          </h3>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {conv.phone}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {conv.lastMessage}
                          </p>
                        </div>
                        {conv.unreadCount > 0 && (
                          <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(conv.lastTimestamp).toLocaleDateString()}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                {selectedPhone ? (
                  <div>
                    <div className="font-semibold">
                      {conversations.find((c) => c._id === selectedPhone)?.contactName || "Conversation"}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {conversations.find((c) => c._id === selectedPhone)?.phone}
                    </div>
                  </div>
                ) : (
                  <span>Select a conversation</span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!selectedPhone ? (
                <div className="text-center text-gray-500 py-12">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a conversation to view messages</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No messages in this conversation</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`flex ${
                        msg.messageType === "sent" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.messageType === "sent"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs opacity-70">
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          {msg.messageType === "sent" && getStatusIcon(msg.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {}
      {conversations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Conversations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Unread Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {conversations.reduce((sum, conv) => sum + conv.messageCount, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Conversations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {conversations.filter((c) => c.unreadCount > 0).length}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
