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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Search,
  Filter,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  MessageSquare,
  User,
  Calendar,
  Tag,
  Send,
  MoreVertical,
  ChevronDown,
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

  const initialFormState: Ticket = {
    title: "",
    description: "",
    status: "new",
    priority: "medium",
    client: "",
    assignedTo: "",
    category: "General",
    createdAt: new Date(),
    tags: [],
  };

  const [form, setForm] = useState<Ticket>(initialFormState);

  const update = (k: keyof Ticket, v: any) =>
    setForm((s) => ({ ...s, [k]: v }));

  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/support-tickets");
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients");
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    } catch (error) {
      console.error("Failed to fetch clients", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchClients();
    fetchUsers();
  }, []);

  const createTicket = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/support-tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          activity: [
            {
              type: "status_change",
              user: "System",
              message: "Ticket created",
              timestamp: new Date(),
              newValue: form.status,
            },
          ],
        }),
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Ticket created successfully.",
        });
        await fetchTickets();
        setIsCreateModalOpen(false);
        setForm(initialFormState);
      } else {
        throw new Error("Failed to create ticket");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create ticket.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (
    ticketId: string,
    newStatus: TicketStatus,
  ) => {
    try {
      const res = await fetch(`/api/support-tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          activity: {
            type: "status_change",
            user: "Current User",
            message: `Status changed to ${newStatus}`,
            timestamp: new Date(),
            oldValue: selectedTicket?.status,
            newValue: newStatus,
          },
        }),
      });

      if (res.ok) {
        toast({ title: "Success", description: "Ticket status updated." });
        await fetchTickets();
        if (selectedTicket) {
          const updated = await res.json();
          setSelectedTicket(updated);
        }
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
      const res = await fetch(`/api/support-tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity: {
            type: "comment",
            user: "Current User",
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.client?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && ticket.status === activeTab;
  });

  const getTicketsByStatus = (status: TicketStatus) => {
    return filteredTickets.filter((t) => t.status === status);
  };

  const ticketStats = {
    all: filteredTickets.length,
    new: getTicketsByStatus("new").length,
    in_progress: getTicketsByStatus("in_progress").length,
    resolved: getTicketsByStatus("resolved").length,
  };

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
          className={cn("text-xs", getPriorityColor(ticket.priority))}
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

      {ticket.tags && ticket.tags.length > 0 && (
        <div className="flex gap-1 mt-2">
          {ticket.tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900">Support Tickets</h2>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
              activeTab === "all"
                ? "bg-purple-50 text-purple-700 font-medium"
                : "text-gray-700 hover:bg-gray-50",
            )}
          >
            <Tag className="h-4 w-4" />
            All Tickets
            <span className="ml-auto text-xs">{ticketStats.all}</span>
          </button>

          <button
            onClick={() => setActiveTab("new")}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
              activeTab === "new"
                ? "bg-purple-50 text-purple-700 font-medium"
                : "text-gray-700 hover:bg-gray-50",
            )}
          >
            <AlertCircle className="h-4 w-4" />
            New
            <span className="ml-auto text-xs">{ticketStats.new}</span>
          </button>

          <button
            onClick={() => setActiveTab("in_progress")}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
              activeTab === "in_progress"
                ? "bg-purple-50 text-purple-700 font-medium"
                : "text-gray-700 hover:bg-gray-50",
            )}
          >
            <Clock className="h-4 w-4" />
            In Progress
            <span className="ml-auto text-xs">{ticketStats.in_progress}</span>
          </button>

          <button
            onClick={() => setActiveTab("resolved")}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
              activeTab === "resolved"
                ? "bg-purple-50 text-purple-700 font-medium"
                : "text-gray-700 hover:bg-gray-50",
            )}
          >
            <CheckCircle2 className="h-4 w-4" />
            Resolved
            <span className="ml-auto text-xs">{ticketStats.resolved}</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">
                {activeTab === "all"
                  ? "All Tickets"
                  : activeTab === "new"
                    ? "New"
                    : activeTab === "in_progress"
                      ? "In Progress"
                      : "Resolved"}
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
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="p-6 overflow-auto h-[calc(100vh-80px)]">
          <div className="grid grid-cols-3 gap-6">
            {/* New Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h3 className="font-semibold text-gray-900">New</h3>
                  <span className="text-sm text-gray-500">
                    ({getTicketsByStatus("new").length})
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {getTicketsByStatus("new").map((ticket) => (
                  <TicketCard key={ticket._id || ticket.id} ticket={ticket} />
                ))}

                {getTicketsByStatus("new").length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No new tickets
                  </div>
                )}
              </div>
            </div>

            {/* In Progress Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <h3 className="font-semibold text-gray-900">In Progress</h3>
                  <span className="text-sm text-gray-500">
                    ({getTicketsByStatus("in_progress").length})
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {getTicketsByStatus("in_progress").map((ticket) => (
                  <TicketCard key={ticket._id || ticket.id} ticket={ticket} />
                ))}

                {getTicketsByStatus("in_progress").length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No tickets in progress
                  </div>
                )}
              </div>
            </div>

            {/* Resolved Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h3 className="font-semibold text-gray-900">Resolved</h3>
                  <span className="text-sm text-gray-500">
                    ({getTicketsByStatus("resolved").length})
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {getTicketsByStatus("resolved").map((ticket) => (
                  <TicketCard key={ticket._id || ticket.id} ticket={ticket} />
                ))}

                {getTicketsByStatus("resolved").length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No resolved tickets
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Ticket Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Support Ticket</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
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
                  onValueChange={(v) => update("client", v)}
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
                  onValueChange={(v) => update("priority", v as TicketPriority)}
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
                    {users.map((user) => (
                      <SelectItem
                        key={user._id || user.id}
                        value={user.name || user.email || "Unknown User"}
                      >
                        {user.name || user.email}
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

      {/* Ticket Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTicket && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl">
                      {selectedTicket.title}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedTicket.ticketNumber ||
                        `#${selectedTicket._id?.slice(-6)}`}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={getPriorityColor(selectedTicket.priority)}
                  >
                    {selectedTicket.priority}
                  </Badge>
                </div>
              </DialogHeader>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
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
                      <Select
                        value={selectedTicket.status}
                        onValueChange={(v) =>
                          updateTicketStatus(
                            selectedTicket._id || selectedTicket.id || "",
                            v as TicketStatus,
                          )
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in_progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <div className="space-y-4">
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
                              <span className="font-medium">
                                {activity.user}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {activity.timestamp
                                  ? format(new Date(activity.timestamp), "PPp")
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
                      onKeyPress={(e) => e.key === "Enter" && addComment()}
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
    </div>
  );
}
