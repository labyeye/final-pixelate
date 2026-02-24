"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import {
  Plus,
  Search,
  Filter,
  Clock,
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  User,
  Calendar,
  Tag,
  Send,
  Headphones,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type TicketStatus = "new" | "in_progress" | "resolved";
type TicketPriority = "low" | "medium" | "high" | "urgent";

interface Ticket {
  _id?: string;
  id?: string;
  ticketNumber?: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  client: string;
  clientId?: string;
  assignedTo?: string;
  category?: string;
  createdAt: Date;
  updatedAt?: Date;
  dueDate?: string;
  tags?: string[];
  activity?: Activity[];
}

interface Activity {
  type: "comment" | "status_change" | "assignment" | "priority_change";
  user: string;
  message: string;
  timestamp: Date;
  oldValue?: string;
  newValue?: string;
}

export default function SupportPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const isClient = user?.role === "client";
  const myClientId = (user as any)?.clientId ?? null;
  const myClientName = (user as any)?.name ?? (user as any)?.email ?? "Client";

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [newComment, setNewComment] = useState("");

  const buildInitialForm = (): Ticket => ({
    title: "",
    description: "",
    status: "new",
    priority: "medium",
    client: isClient ? myClientName : "",
    clientId: isClient ? myClientId : undefined,
    assignedTo: "",
    category: "General",
    createdAt: new Date(),
    tags: [],
  });

  const [form, setForm] = useState<Ticket>(buildInitialForm());
  const update = (k: keyof Ticket, v: any) =>
    setForm((s) => ({ ...s, [k]: v }));

  const fetchTickets = async () => {
    try {
      const url =
        isClient && myClientId
          ? `/api/support-tickets?clientId=${myClientId}`
          : "/api/support-tickets";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    }
  };

  useEffect(() => {
    fetchTickets();
    if (!isClient) {
      fetch("/api/clients")
        .then((r) => r.json())
        .then(setClients)
        .catch(console.error);
      fetch("/api/users")
        .then((r) => r.json())
        .then(setUsers)
        .catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, myClientId]);

  const createTicket = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast({
        title: "Missing fields",
        description: "Title and description are required.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        clientId: isClient ? myClientId : form.clientId,
        client: isClient ? myClientName : form.client,
        activity: [
          {
            type: "status_change",
            user: isClient ? myClientName : "Admin",
            message: "Ticket created",
            timestamp: new Date(),
            newValue: "new",
          },
        ],
      };
      const res = await fetch("/api/support-tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({
          title: isClient ? "Ticket Submitted!" : "Ticket Created!",
          description: isClient
            ? "We'll get back to you soon."
            : "Ticket has been created.",
        });
        await fetchTickets();
        setIsCreateModalOpen(false);
        setForm(buildInitialForm());
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to submit ticket.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (
    ticketId: string,
    newStatus: TicketStatus
  ) => {
    try {
      const res = await fetch(`/api/support-tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          activity: {
            type: "status_change",
            user: "Admin",
            message: `Status changed to ${newStatus.replace("_", " ")}`,
            timestamp: new Date(),
            oldValue: selectedTicket?.status,
            newValue: newStatus,
          },
        }),
      });
      if (res.ok) {
        toast({ title: "Updated", description: "Ticket status updated." });
        const updated = await res.json();
        setSelectedTicket(updated);
        await fetchTickets();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    }
  };

  const addComment = async () => {
    if (!newComment.trim() || !selectedTicket) return;
    try {
      const ticketId = selectedTicket._id || selectedTicket.id;
      const commenterName = isClient
        ? myClientName
        : (user as any)?.name ?? "Staff";
      const res = await fetch(`/api/support-tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity: {
            type: "comment",
            user: commenterName,
            message: newComment,
            timestamp: new Date(),
          },
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setSelectedTicket(updated);
        setNewComment("");
        await fetchTickets();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "in_progress":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "resolved":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "new":
        return "New";
      case "in_progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
      default:
        return status;
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.client?.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && ticket.status === activeTab;
  });

  const getTicketsByStatus = (status: TicketStatus) =>
    filteredTickets.filter((t) => t.status === status);

  const ticketStats = {
    all: filteredTickets.length,
    new: getTicketsByStatus("new").length,
    in_progress: getTicketsByStatus("in_progress").length,
    resolved: getTicketsByStatus("resolved").length,
  };

  // ─── Shared Detail Modal (role-aware) ──────────────────────────────────────
  const TicketDetailModal = () => (
    <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {selectedTicket && (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <DialogTitle className="text-2xl">
                    {selectedTicket.title}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedTicket.ticketNumber ||
                      `#${selectedTicket._id?.slice(-6)}`}
                  </p>
                </div>
                <div className="flex gap-2 items-center shrink-0">
                  <Badge
                    variant="outline"
                    className={getPriorityColor(selectedTicket.priority)}
                  >
                    {selectedTicket.priority}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={getStatusColor(selectedTicket.status)}
                  >
                    {getStatusLabel(selectedTicket.status)}
                  </Badge>
                </div>
              </div>
            </DialogHeader>

            <Tabs defaultValue="details" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="activity">Activity & Comments</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Description
                    </label>
                    <p className="mt-1">{selectedTicket.description}</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <User className="h-4 w-4" /> Client
                      </label>
                      <p className="mt-1">{selectedTicket.client}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <User className="h-4 w-4" /> Assigned To
                      </label>
                      <p className="mt-1">
                        {selectedTicket.assignedTo || "Unassigned"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Tag className="h-4 w-4" /> Category
                      </label>
                      <p className="mt-1">
                        {selectedTicket.category || "General"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Created
                      </label>
                      <p className="mt-1">
                        {selectedTicket.createdAt
                          ? format(new Date(selectedTicket.createdAt), "PPp")
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Status
                    </label>
                    {isClient ? (
                      /* Clients see read-only status badge */
                      <div className="mt-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-sm px-3 py-1",
                            getStatusColor(selectedTicket.status)
                          )}
                        >
                          {getStatusLabel(selectedTicket.status)}
                        </Badge>
                      </div>
                    ) : (
                      /* Admins/staff can change status */
                      <Select
                        value={selectedTicket.status}
                        onValueChange={(v) =>
                          updateTicketStatus(
                            selectedTicket._id || selectedTicket.id || "",
                            v as TicketStatus
                          )
                        }
                      >
                        <SelectTrigger className="mt-1 w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                  {selectedTicket.activity &&
                  selectedTicket.activity.length > 0 ? (
                    selectedTicket.activity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex gap-3 pb-4 border-b last:border-0"
                      >
                        <div className="mt-1">
                          {activity.type === "comment" ? (
                            <MessageSquare className="h-5 w-5 text-blue-500" />
                          ) : (
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{activity.user}</span>
                            <span className="text-xs text-muted-foreground">
                              {activity.timestamp
                                ? format(
                                    new Date(activity.timestamp),
                                    "PPp"
                                  )
                                : ""}
                            </span>
                          </div>
                          <p className="mt-1 text-sm">{activity.message}</p>
                          {activity.oldValue && activity.newValue && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {activity.oldValue} → {activity.newValue}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No activity yet
                    </p>
                  )}
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addComment()}
                  />
                  <Button
                    onClick={addComment}
                    size="icon"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  );

  // ─── CLIENT VIEW ───────────────────────────────────────────────────────────
  if (isClient) {
    return (
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
              <Headphones className="h-9 w-9 text-purple-600" />
              Support
            </h1>
            <p className="text-muted-foreground mt-1">
              Raise a ticket and track the status of your requests.
            </p>
          </div>
          <Button
            onClick={() => {
              setForm(buildInitialForm());
              setIsCreateModalOpen(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 font-bold"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Raise a Ticket
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {(["new", "in_progress", "resolved"] as const).map((s) => (
            <Card
              key={s}
              className={cn(
                "border-2 cursor-pointer transition-all",
                activeTab === s
                  ? "border-purple-500 shadow-md"
                  : "border-gray-200 hover:border-purple-300"
              )}
              onClick={() => setActiveTab(activeTab === s ? "all" : s)}
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    s === "new"
                      ? "bg-blue-100"
                      : s === "in_progress"
                      ? "bg-purple-100"
                      : "bg-green-100"
                  )}
                >
                  {s === "new" ? (
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                  ) : s === "in_progress" ? (
                    <Clock className="h-5 w-5 text-purple-600" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <div>
                  <p className="text-2xl font-black">
                    {getTicketsByStatus(s).length}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {getStatusLabel(s)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search + filter */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search your tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ({ticketStats.all})</SelectItem>
              <SelectItem value="new">New ({ticketStats.new})</SelectItem>
              <SelectItem value="in_progress">
                In Progress ({ticketStats.in_progress})
              </SelectItem>
              <SelectItem value="resolved">
                Resolved ({ticketStats.resolved})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Ticket list */}
        <div className="space-y-3">
          {filteredTickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 rounded-xl">
              <Headphones className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No tickets found</p>
              <p className="text-sm text-gray-400 mt-1">
                {activeTab === "all"
                  ? "Click 'Raise a Ticket' to get help from our team."
                  : `No ${getStatusLabel(activeTab)} tickets.`}
              </p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div
                key={ticket._id || ticket.id}
                className="bg-white border-2 border-gray-100 rounded-xl p-5 cursor-pointer hover:border-purple-200 hover:shadow-sm transition-all"
                onClick={() => {
                  setSelectedTicket(ticket);
                  setIsDetailModalOpen(true);
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground font-mono">
                        {ticket.ticketNumber ||
                          `#${String(ticket._id).slice(-6)}`}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn("text-xs", getStatusColor(ticket.status))}
                      >
                        {getStatusLabel(ticket.status)}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-gray-900 truncate">
                      {ticket.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                      {ticket.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <Badge
                      variant="outline"
                      className={cn("text-xs", getPriorityColor(ticket.priority))}
                    >
                      {ticket.priority}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {ticket.category || "General"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {ticket.createdAt
                      ? format(
                          new Date(ticket.createdAt),
                          "dd MMM yyyy, h:mm a"
                        )
                      : ""}
                  </span>
                  {ticket.assignedTo && (
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Assigned to {ticket.assignedTo}
                    </span>
                  )}
                  {ticket.activity &&
                    ticket.activity.filter((a) => a.type === "comment").length >
                      0 && (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {
                          ticket.activity.filter((a) => a.type === "comment")
                            .length
                        }{" "}
                        comment(s)
                      </span>
                    )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Client — Create Ticket Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <Headphones className="h-5 w-5 text-purple-600" />
                Raise a Support Ticket
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Subject <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Brief summary of your issue"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Please describe your issue in detail..."
                  rows={5}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select
                    value={form.priority}
                    onValueChange={(v) =>
                      update("priority", v as TicketPriority)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => update("category", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Billing">Billing</SelectItem>
                      <SelectItem value="Feature Request">
                        Feature Request
                      </SelectItem>
                      <SelectItem value="Bug Report">Bug Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={createTicket}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? "Submitting..." : "Submit Ticket"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <TicketDetailModal />
      </div>
    );
  }

  // ─── ADMIN / STAFF KANBAN VIEW ─────────────────────────────────────────────
  const TicketCard = ({ ticket }: { ticket: Ticket }) => (
    <div
      className="bg-white rounded-lg border border-gray-200 p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => {
        setSelectedTicket(ticket);
        setIsDetailModalOpen(true);
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-sm text-gray-900 flex-1">
          {ticket.title}
        </h3>
        <Badge
          variant="outline"
          className={cn("text-xs ml-2", getPriorityColor(ticket.priority))}
        >
          {ticket.priority}
        </Badge>
      </div>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
        {ticket.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
              {ticket.assignedTo ? getInitials(ticket.assignedTo) : "?"}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-600">{ticket.client}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock className="h-3 w-3" />
          <span>
            {ticket.createdAt
              ? format(new Date(ticket.createdAt), "MMM dd")
              : ""}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 shrink-0">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900">Support Tickets</h2>
        </div>
        <nav className="space-y-1">
          {(["all", "new", "in_progress", "resolved"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                activeTab === tab
                  ? "bg-purple-50 text-purple-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              {tab === "all" && <Tag className="h-4 w-4" />}
              {tab === "new" && <AlertCircle className="h-4 w-4" />}
              {tab === "in_progress" && <Clock className="h-4 w-4" />}
              {tab === "resolved" && <CheckCircle2 className="h-4 w-4" />}
              {tab === "all" ? "All Tickets" : getStatusLabel(tab)}
              <span className="ml-auto text-xs">
                {tab === "all"
                  ? ticketStats.all
                  : tab === "new"
                  ? ticketStats.new
                  : tab === "in_progress"
                  ? ticketStats.in_progress
                  : ticketStats.resolved}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">
                {activeTab === "all"
                  ? "All Tickets"
                  : getStatusLabel(activeTab)}
              </h1>
              <span className="text-sm text-gray-500">
                {activeTab === "all"
                  ? ticketStats.all
                  : activeTab === "new"
                  ? ticketStats.new
                  : activeTab === "in_progress"
                  ? ticketStats.in_progress
                  : ticketStats.resolved}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                onClick={() => {
                  setForm(buildInitialForm());
                  setIsCreateModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="p-6 overflow-auto flex-1">
          <div className="grid grid-cols-3 gap-6">
            {(["new", "in_progress", "resolved"] as const).map((status) => (
              <div key={status}>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      status === "new"
                        ? "bg-blue-500"
                        : status === "in_progress"
                        ? "bg-purple-500"
                        : "bg-green-500"
                    )}
                  />
                  <h3 className="font-semibold text-gray-900">
                    {getStatusLabel(status)}
                  </h3>
                  <span className="text-sm text-gray-500">
                    ({getTicketsByStatus(status).length})
                  </span>
                </div>
                <div className="space-y-3">
                  {getTicketsByStatus(status).map((ticket) => (
                    <TicketCard
                      key={ticket._id || ticket.id}
                      ticket={ticket}
                    />
                  ))}
                  {getTicketsByStatus(status).length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      No {getStatusLabel(status).toLowerCase()} tickets
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin — Create Ticket Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Support Ticket</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
clear            <div className="grid gap-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Brief description of the issue"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Detailed description of the issue"
                rows={4}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Client</label>
                <Select
                  value={form.client || undefined}
                  onValueChange={(v) => {
                    const c = clients.find((cl) => cl.name === v);
                    update("client", v);
                    if (c) update("clientId", String(c._id || c.id));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem
                        key={client._id || client.id}
                        value={client.name || "Unknown Client"}
                      >
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Priority</label>
                <Select
                  value={form.priority}
                  onValueChange={(v) =>
                    update("priority", v as TicketPriority)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={form.category}
                  onValueChange={(v) => update("category", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Billing">Billing</SelectItem>
                    <SelectItem value="Feature Request">
                      Feature Request
                    </SelectItem>
                    <SelectItem value="Bug Report">Bug Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Assign To</label>
                <Select
                  value={form.assignedTo || "unassigned"}
                  onValueChange={(v) =>
                    update("assignedTo", v === "unassigned" ? "" : v)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {users.map((u) => (
                      <SelectItem
                        key={u._id || u.id}
                        value={u.name || u.email || "Unknown User"}
                      >
                        {u.name || u.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={createTicket}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {loading ? "Creating..." : "Create Ticket"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <TicketDetailModal />
    </div>
  );
}
