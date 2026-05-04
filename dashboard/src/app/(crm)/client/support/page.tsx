"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageSquare } from "lucide-react";

export default function ClientSupportPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("general");

  useEffect(() => {
    if (!user || user.role !== "client") return;

    const fetchTickets = async () => {
      try {
        setLoading(true);
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("auth_token")
            : null;
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch("/api/support-tickets", { headers });
        if (!res.ok) throw new Error("Failed to fetch tickets");

        const data = await res.json();
        const clientTickets = Array.isArray(data)
          ? data.filter((t) => t.clientId === user.clientId)
          : [];

        setTickets(
          clientTickets.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        );
      } catch (err) {
        console.error("Failed to load support tickets", err);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user]);

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("/api/support-tickets", {
        method: "POST",
        headers,
        body: JSON.stringify({
          subject,
          message,
          category,
          clientId: user?.clientId,
          status: "open",
        }),
      });

      if (!res.ok) throw new Error("Failed to create ticket");

      const newTicket = await res.json();
      setTickets([newTicket, ...tickets]);

      setSubject("");
      setMessage("");
      setCategory("general");

      toast({
        title: "Success",
        description: "Support ticket created. Our team will respond soon.",
      });
    } catch (err) {
      console.error("Failed to submit ticket", err);
      toast({
        title: "Error",
        description: "Failed to create support ticket",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-700";
      case "in progress":
        return "bg-blue-100 text-blue-700";
      case "open":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (!user || user.role !== "client") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This page is only accessible to clients.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-headline p-6 space-y-6">
      {}
      <div>
        <h1 className="text-4xl font-black tracking-tighter">Support</h1>
        <p className="text-muted-foreground mt-1">Get help from our team</p>
      </div>

      {}
      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Send className="w-5 h-5" />
            Create a Support Ticket
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black rounded-md bg-background font-bold"
              >
                <option value="general">General Inquiry</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing</option>
                <option value="bug">Report a Bug</option>
                <option value="feature">Feature Request</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Briefly describe your issue..."
                className="border-2 border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide details about your issue..."
                className="border-2 border-black min-h-32"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              {isSubmitting ? "Submitting..." : "Submit Ticket"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {}
      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Your Tickets ({tickets.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center text-muted-foreground">
              Loading tickets...
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-2">📨</div>
              <p className="font-bold">No tickets yet</p>
              <p className="text-sm text-muted-foreground">
                Create your first support ticket above
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="p-4 border-2 border-black rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-bold text-base">{ticket.subject}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(ticket.createdAt).toLocaleDateString()} at{" "}
                        {new Date(ticket.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <Badge
                      className={`${getStatusColor(ticket.status)} font-bold border-black`}
                    >
                      {ticket.status || "Open"}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {ticket.message}
                  </p>

                  <div className="flex items-center gap-2">
                    {ticket.category && (
                      <Badge
                        variant="outline"
                        className="border-black font-bold text-xs"
                      >
                        {ticket.category}
                      </Badge>
                    )}
                    {ticket.response && (
                      <span className="text-xs font-bold text-green-600">
                        ✓ Replied
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {}
      <Card className="border-2 border-black bg-primary/5">
        <CardContent className="pt-6">
          <p className="text-sm">
            <span className="font-bold">💡 Help:</span> Submit a support ticket
            and our team will respond within 24 hours. For urgent issues, please
            contact us directly via phone or email.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
