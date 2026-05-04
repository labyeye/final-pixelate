"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CalendarDays,
  FileText,
  Link2,
  MessageSquare,
  Paperclip,
  PlusCircle,
  Shield,
  UserCheck,
  Wallet,
  Briefcase,
  Loader2,
  MapPin,
  ChevronDown,
} from "lucide-react";

export type JourneyEventType =
  | "meeting"
  | "quotation"
  | "nda"
  | "onboarding"
  | "project_update"
  | "payment"
  | "note";

export type JourneyEventStatus =
  | "Sent"
  | "Approved"
  | "Completed"
  | "Pending"
  | "Rejected"
  | "Paid"
  | "Signed";

export interface JourneyEvent {
  _id?: string;
  clientId: string;
  clientName?: string;
  projectId?: string | null;
  projectName?: string | null;
  type: JourneyEventType;
  title: string;
  description?: string;
  performedBy?: string;
  status?: JourneyEventStatus | null;
  fileUrl?: string | null;
  linkUrl?: string | null;
  occurredAt: string | Date;
  metadata?: Record<string, unknown>;
  createdAt?: string | Date;
}

const EVENT_TYPE_CONFIG: Record<
  JourneyEventType,
  {
    label: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
  }
> = {
  meeting: {
    label: "Meeting",
    icon: CalendarDays,
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  quotation: {
    label: "Quotation",
    icon: FileText,
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  nda: {
    label: "NDA",
    icon: Shield,
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  onboarding: {
    label: "Onboarding",
    icon: UserCheck,
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  project_update: {
    label: "Project Update",
    icon: Briefcase,
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
  },
  payment: {
    label: "Payment",
    icon: Wallet,
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  note: {
    label: "Note",
    icon: MessageSquare,
    color: "text-gray-700",
    bg: "bg-gray-50",
    border: "border-gray-200",
  },
};

const STATUS_VARIANT: Record<string, string> = {
  Sent: "bg-blue-100 text-blue-800 border-blue-200",
  Approved: "bg-green-100 text-green-800 border-green-200",
  Completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
  Paid: "bg-teal-100 text-teal-800 border-teal-200",
  Signed: "bg-purple-100 text-purple-800 border-purple-200",
};

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatFullDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getDateLabel(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const eventDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  if (eventDay.getTime() === today.getTime()) return "Today";
  if (eventDay.getTime() === yesterday.getTime()) return "Yesterday";

  const diffDays = Math.floor(
    (today.getTime() - eventDay.getTime()) / 86400000,
  );
  if (diffDays < 7) {
    return date.toLocaleDateString("en-IN", { weekday: "long" });
  }
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function groupByDate(events: JourneyEvent[]) {
  const groups: { label: string; date: Date; events: JourneyEvent[] }[] = [];
  const seen = new Map<string, number>();

  for (const ev of events) {
    const d = new Date(ev.occurredAt);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const label = getDateLabel(d);

    if (seen.has(key)) {
      groups[seen.get(key)!].events.push(ev);
    } else {
      seen.set(key, groups.length);
      groups.push({ label, date: d, events: [ev] });
    }
  }

  return groups;
}

interface AddEventDialogProps {
  open: boolean;
  onClose: () => void;
  clientId: string;
  clientName: string;
  onAdded: (event: JourneyEvent) => void;
}

const EMPTY_FORM = {
  type: "note" as JourneyEventType,
  title: "",
  description: "",
  performedBy: "",
  status: "" as JourneyEventStatus | "",
  projectName: "",
  fileUrl: "",
  linkUrl: "",
  occurredAt: new Date().toISOString().slice(0, 16),
};

function AddEventDialog({
  open,
  onClose,
  clientId,
  clientName,
  onAdded,
}: AddEventDialogProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof EMPTY_FORM, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload: Partial<JourneyEvent> = {
        clientId,
        clientName,
        type: form.type,
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        performedBy: form.performedBy.trim() || "Admin",
        status: (form.status as JourneyEventStatus) || undefined,
        projectName: form.projectName.trim() || undefined,
        fileUrl: form.fileUrl.trim() || undefined,
        linkUrl: form.linkUrl.trim() || undefined,
        occurredAt: form.occurredAt
          ? new Date(form.occurredAt).toISOString()
          : new Date().toISOString(),
      };

      const res = await fetch("/api/journey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save event");
      const created = await res.json();
      onAdded(created as JourneyEvent);
      setForm(EMPTY_FORM);
      onClose();
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader>
          <DialogTitle className="font-black text-xl tracking-tight">
            Add Journey Event
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="font-bold">Event Type *</Label>
              <Select
                value={form.type}
                onValueChange={(v) => set("type", v as JourneyEventType)}
              >
                <SelectTrigger className="border-2 border-black font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(EVENT_TYPE_CONFIG) as JourneyEventType[]).map(
                    (t) => (
                      <SelectItem key={t} value={t} className="font-bold">
                        {EVENT_TYPE_CONFIG[t].label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="font-bold">Status Badge</Label>
              <Select
                value={form.status}
                onValueChange={(v) => set("status", v)}
              >
                <SelectTrigger className="border-2 border-black font-bold">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" " className="font-bold">
                    None
                  </SelectItem>
                  {Object.keys(STATUS_VARIANT).map((s) => (
                    <SelectItem key={s} value={s} className="font-bold">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {}
          <div className="space-y-1.5">
            <Label className="font-bold">Title *</Label>
            <Input
              className="border-2 border-black font-bold"
              placeholder="e.g. Client Meeting, Quotation Sent…"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>

          {}
          <div className="space-y-1.5">
            <Label className="font-bold">Description</Label>
            <Textarea
              className="border-2 border-black font-semibold resize-none"
              rows={3}
              placeholder="Short description of what happened…"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>

          {}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="font-bold">Performed By</Label>
              <Input
                className="border-2 border-black font-bold"
                placeholder="Name or role"
                value={form.performedBy}
                onChange={(e) => set("performedBy", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-bold">Date & Time</Label>
              <Input
                type="datetime-local"
                className="border-2 border-black font-bold"
                value={form.occurredAt}
                onChange={(e) => set("occurredAt", e.target.value)}
              />
            </div>
          </div>

          {}
          <div className="space-y-1.5">
            <Label className="font-bold">Project (optional)</Label>
            <Input
              className="border-2 border-black font-bold"
              placeholder="Project name"
              value={form.projectName}
              onChange={(e) => set("projectName", e.target.value)}
            />
          </div>

          {}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="font-bold">File URL (PDF etc.)</Label>
              <Input
                className="border-2 border-black font-bold"
                placeholder="https://…"
                value={form.fileUrl}
                onChange={(e) => set("fileUrl", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-bold">Reference Link</Label>
              <Input
                className="border-2 border-black font-bold"
                placeholder="https://…"
                value={form.linkUrl}
                onChange={(e) => set("linkUrl", e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm font-bold text-red-600 border border-red-300 bg-red-50 rounded-md px-3 py-2">
              {error}
            </p>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            className="border-2 border-black font-bold"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function JourneyCard({ event }: { event: JourneyEvent }) {
  const config = EVENT_TYPE_CONFIG[event.type] ?? EVENT_TYPE_CONFIG.note;
  const Icon = config.icon;
  const date = new Date(event.occurredAt);
  const [expanded, setExpanded] = useState(false);

  const hasDetails =
    !!event.description ||
    !!event.fileUrl ||
    !!event.linkUrl ||
    !!event.projectName;

  return (
    <div className="flex gap-3 group">
      {}
      <div className="flex-shrink-0 mt-1">
        <div
          className={cn(
            "w-9 h-9 rounded-xl border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
            config.bg,
          )}
        >
          <Icon className={cn("w-4 h-4", config.color)} />
        </div>
      </div>

      {}
      <div
        className={cn(
          "flex-1 rounded-xl border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-shadow group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        )}
      >
        {}
        <div
          className={cn(
            "flex items-center justify-between gap-2 px-4 py-3",
            expanded && "border-b-2 border-dashed border-gray-200",
          )}
        >
          {}
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span
              className={cn(
                "text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-md border flex-shrink-0",
                config.bg,
                config.border,
                config.color,
              )}
            >
              {config.label}
            </span>
            {event.status && event.status.trim() && (
              <span
                className={cn(
                  "text-xs font-black px-2 py-0.5 rounded-full border flex-shrink-0",
                  STATUS_VARIANT[event.status] ??
                    "bg-gray-100 text-gray-700 border-gray-200",
                )}
              >
                {event.status}
              </span>
            )}
            <h3 className="font-black text-sm tracking-tight truncate">
              {event.title}
            </h3>
          </div>

          {}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">
              {formatTime(date)}
            </span>
            {hasDetails && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className={cn(
                  "w-6 h-6 rounded-md border-2 border-black flex items-center justify-center transition-all shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-px hover:translate-y-px",
                  expanded ? config.bg : "bg-gray-50 hover:bg-gray-100",
                )}
                aria-label={expanded ? "Collapse" : "Expand details"}
              >
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    config.color,
                    expanded && "rotate-180",
                  )}
                />
              </button>
            )}
          </div>
        </div>

        {}
        {expanded && (
          <div className="px-4 pb-4 pt-3 space-y-3">
            {}
            {event.projectName && (
              <p className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {event.projectName}
              </p>
            )}

            {}
            {event.description && (
              <div className="text-sm text-muted-foreground font-medium space-y-1">
                {event.description.split("\n\n").map((block, i) => (
                  <div key={i}>
                    {block.split("\n").map((line, j) => (
                      <p
                        key={j}
                        className={
                          line.startsWith("  •")
                            ? "ml-3 leading-relaxed"
                            : "leading-relaxed"
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {}
            {(event.fileUrl || event.linkUrl) && (
              <div className="flex flex-wrap gap-2">
                {event.fileUrl && (
                  <a
                    href={event.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border-2 border-black bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Paperclip className="w-3 h-3" />
                    File / PDF
                  </a>
                )}
                {event.linkUrl && (
                  <a
                    href={event.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border-2 border-black bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Link2 className="w-3 h-3" />
                    Reference Link
                  </a>
                )}
              </div>
            )}

            {}
            <div className="flex items-center gap-1.5 pt-2 border-t border-dashed border-gray-200">
              <div className="w-5 h-5 rounded-full bg-primary/10 border border-black flex items-center justify-center text-[10px] font-black text-primary">
                {(event.performedBy ?? "S").charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-bold text-muted-foreground">
                {event.performedBy ?? "System"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DateSeparator({ label, date }: { label: string; date: Date }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-border" />
      <div className="flex items-center gap-1.5 bg-muted border-2 border-black rounded-full px-4 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <CalendarDays className="w-3 h-3 text-muted-foreground" />
        <span className="text-xs font-black tracking-wide">{label}</span>
        {label !== "Today" && label !== "Yesterday" && (
          <span className="text-[10px] text-muted-foreground font-bold ml-1">
            {formatFullDate(date)}
          </span>
        )}
      </div>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function EmptyFeed({ clientSelected }: { clientSelected: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="w-20 h-20 rounded-2xl border-2 border-black bg-muted flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <MapPin className="w-10 h-10 text-muted-foreground" />
      </div>
      <div>
        <p className="font-black text-xl tracking-tight">
          {clientSelected ? "No events yet" : "Select a client"}
        </p>
        <p className="text-muted-foreground font-medium mt-1 text-sm">
          {clientSelected
            ? "Add the first event to start this client's journey."
            : "Choose a client above to view their journey history."}
        </p>
      </div>
    </div>
  );
}

export default function JourneyPage() {
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedClientName, setSelectedClientName] = useState("");
  const [events, setEvents] = useState<JourneyEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const feedEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/clients")
      .then((r) => r.json())
      .then((data: any[]) => {
        setClients(
          data.map((c) => ({
            id: String(c._id ?? c.id),
            name: c.name,
          })),
        );
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedClientId) {
      setEvents([]);
      return;
    }
    setLoading(true);
    fetch(`/api/journey?clientId=${encodeURIComponent(selectedClientId)}`)
      .then((r) => r.json())
      .then((data: JourneyEvent[]) => setEvents(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedClientId]);

  useEffect(() => {
    if (events.length > 0) {
      feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [events]);

  const handleClientChange = (id: string) => {
    const client = clients.find((c) => c.id === id);
    setSelectedClientId(id);
    setSelectedClientName(client?.name ?? "");
  };

  const handleEventAdded = (event: JourneyEvent) => {
    setEvents((prev) => {
      const updated = [...prev, event].sort(
        (a, b) =>
          new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime(),
      );
      return updated;
    });
  };

  const groups = groupByDate(events);

  return (
    <div className="flex flex-col h-full min-h-screen bg-background font-headline">
      {}
      <div className="sticky top-0 z-20 bg-background border-b-2 border-black">
        <div className="px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <MapPin className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-black tracking-tighter">Journey</h1>
            </div>
            <p className="text-sm text-muted-foreground font-bold mt-0.5 ml-10">
              Complete chronological history of every client interaction.
            </p>
          </div>

          {}
          <div className="flex flex-wrap items-center gap-3">
            {}
            <Select value={selectedClientId} onValueChange={handleClientChange}>
              <SelectTrigger className="w-56 border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white">
                <SelectValue placeholder="Select a client…" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((c) => (
                  <SelectItem key={c.id} value={c.id} className="font-bold">
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {}
            <Button
              disabled={!selectedClientId}
              onClick={() => setAddOpen(true)}
              className="font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        {}
        {selectedClientId && events.length > 0 && (
          <div className="px-6 pb-3 flex flex-wrap gap-3">
            {(Object.keys(EVENT_TYPE_CONFIG) as JourneyEventType[]).map((t) => {
              const count = events.filter((e) => e.type === t).length;
              if (count === 0) return null;
              const cfg = EVENT_TYPE_CONFIG[t];
              const Icon = cfg.icon;
              return (
                <div
                  key={t}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-black text-xs font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",
                    cfg.bg,
                    cfg.color,
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {cfg.label} · {count}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="font-bold text-muted-foreground">
                Loading journey…
              </p>
            </div>
          ) : groups.length === 0 ? (
            <EmptyFeed clientSelected={!!selectedClientId} />
          ) : (
            <div className="space-y-2">
              {groups.map((group) => (
                <div
                  key={group.label + group.date.toISOString()}
                  className="space-y-3"
                >
                  <DateSeparator label={group.label} date={group.date} />
                  <div className="space-y-3">
                    {group.events.map((ev) => (
                      <JourneyCard
                        key={String(ev._id ?? ev.occurredAt)}
                        event={ev}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {}
              <div ref={feedEndRef} className="h-8" />
            </div>
          )}
        </div>
      </div>

      {}
      {addOpen && (
        <AddEventDialog
          open={addOpen}
          onClose={() => setAddOpen(false)}
          clientId={selectedClientId}
          clientName={selectedClientName}
          onAdded={handleEventAdded}
        />
      )}
    </div>
  );
}
