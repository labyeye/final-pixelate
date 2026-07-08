"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar as CalendarIcon,
  Link as LinkIcon,
  User,
  Briefcase,
  ExternalLink,
  MessageSquareText,
} from "lucide-react";
import { apiFetch } from "@/lib/api-fetch";
import { Task, TaskStatus, TaskUpdate } from "@/lib/task-models";

const STATUS_LABEL: Record<TaskStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  done: "Awaiting Review",
  issues: "Issues",
  completed: "Completed",
  archived: "Archived",
};

const STATUS_COLOR: Record<TaskStatus, string> = {
  "not-started": "bg-gray-200 text-gray-800",
  "in-progress": "bg-blue-200 text-blue-800",
  done: "bg-amber-200 text-amber-800",
  issues: "bg-red-200 text-red-800",
  completed: "bg-green-200 text-green-800",
  archived: "bg-gray-200 text-gray-800",
};

type Actor = { id: string; name: string; role: string };

function nextStatusOptions(
  current: TaskStatus,
  role: string,
): { value: TaskStatus; label: string }[] {
  const keep = { value: current, label: `Keep as ${STATUS_LABEL[current]}` };

  if (role === "admin") {
    if (current === "done") {
      return [
        keep,
        { value: "completed", label: "Mark Completed" },
        { value: "issues", label: "Send Back (Issues)" },
      ];
    }
    return [keep];
  }

  // staff / assignee
  if (current === "not-started") {
    return [keep, { value: "in-progress", label: "Start Working" }];
  }
  if (current === "in-progress") {
    return [keep, { value: "done", label: "Mark Done (for review)" }];
  }
  if (current === "issues") {
    return [keep, { value: "in-progress", label: "Restart Working" }];
  }
  return [keep];
}

export function TaskDetailModal({
  task,
  open,
  onOpenChange,
  actor,
  onUpdated,
}: {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actor: Actor | null;
  onUpdated: (updated: Task) => void;
}) {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | null>(
    null,
  );
  const [remark, setRemark] = useState("");
  const [completedLink, setCompletedLink] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (task) {
      setSelectedStatus(task.status);
      setRemark("");
      setCompletedLink(task.completedLink || "");
    }
  }, [task?.id, open]);

  const role = actor?.role || "staff";
  const options = useMemo(
    () => (task ? nextStatusOptions(task.status, role) : []),
    [task, role],
  );

  const requiresCompletedLink =
    selectedStatus === "done" && task?.status !== "done";

  if (!task) return null;

  const isSameStatus = selectedStatus === task.status;

  const handleSubmit = async () => {
    if (requiresCompletedLink && !completedLink.trim()) return;
    setSaving(true);
    try {
      const body: any = {
        status: selectedStatus,
        remark: remark.trim(),
        byId: actor?.id ?? null,
        byName: actor?.name ?? null,
        logUpdate: true,
      };
      if (completedLink.trim()) body.completedLink = completedLink.trim();

      const id = task.id ?? (task as any)._id;
      const res = await apiFetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const updated = await res.json();
        onUpdated(updated);
        onOpenChange(false);
      }
    } catch (e) {
      console.error("Failed to update task", e);
    } finally {
      setSaving(false);
    }
  };

  const updates: TaskUpdate[] = [...(task.updates || [])].sort(
    (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime(),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto p-0 gap-0 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
        <div className="px-8 py-6 border-b-4 border-black flex items-start justify-between gap-4">
          <div>
            <span
              className={`inline-block px-2 py-0.5 text-xs font-black uppercase tracking-wider mb-2 ${STATUS_COLOR[task.status]}`}
            >
              {STATUS_LABEL[task.status]}
            </span>
            <h2 className="text-2xl font-black tracking-tighter">
              {task.title}
            </h2>
          </div>
        </div>

        <div className="px-8 py-6 space-y-6">
          {task.description && (
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {task.description}
            </p>
          )}

          <div className="grid gap-3 sm:grid-cols-2 text-sm">
            {task.assigneeName && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <Avatar className="h-5 w-5">
                  <AvatarImage src={task.assigneeAvatar} />
                  <AvatarFallback className="text-[10px]">
                    {task.assigneeName[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="font-bold">{task.assigneeName}</span>
              </div>
            )}
            {task.projectTitle && (
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <span className="font-bold">{task.projectTitle}</span>
              </div>
            )}
            {task.dueDate && (
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                <span className="font-bold">
                  {format(new Date(task.dueDate), "MMM d, yyyy")}
                </span>
              </div>
            )}
            {task.assetLink && (
              <a
                href={task.assetLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-700 hover:underline"
              >
                <LinkIcon className="w-4 h-4" />
                <span className="font-bold">Asset Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {task.completedLink && (
              <a
                href={task.completedLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-green-700 hover:underline"
              >
                <LinkIcon className="w-4 h-4" />
                <span className="font-bold">Completed Work</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="border-t-2 border-black pt-4 space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Update Status
            </label>
            <div className="flex flex-wrap gap-2">
              {options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setSelectedStatus(o.value)}
                  className={`px-3 py-2 text-xs font-black uppercase tracking-wide border-2 border-black transition-colors ${
                    selectedStatus === o.value
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>

            {requiresCompletedLink && (
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                  <LinkIcon className="w-3.5 h-3.5" />
                  Completed Work Link (required)
                </label>
                <Input
                  value={completedLink}
                  onChange={(e) => setCompletedLink(e.target.value)}
                  placeholder="Link to the finished work"
                  className="border-2 border-black rounded-none h-10"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                <MessageSquareText className="w-3.5 h-3.5" />
                Remarks {isSameStatus ? "(progress update)" : ""}
              </label>
              <Textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="What did you do / what's the status..."
                className="min-h-[90px] border-2 border-black rounded-none resize-none"
              />
            </div>

            <div className="flex justify-end pt-1">
              <Button
                className="font-black border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                onClick={handleSubmit}
                disabled={
                  saving ||
                  (requiresCompletedLink && !completedLink.trim()) ||
                  (!remark.trim() && isSameStatus)
                }
              >
                {saving ? "Saving..." : "Submit Update"}
              </Button>
            </div>
          </div>

          {updates.length > 0 && (
            <div className="border-t-2 border-black pt-4 space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                Update History
              </label>
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {updates.map((u) => (
                  <div
                    key={u.id}
                    className="border-2 border-black p-3 text-sm space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${STATUS_COLOR[u.status]}`}
                      >
                        {STATUS_LABEL[u.status]}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-bold">
                        {format(new Date(u.at), "MMM d, yyyy h:mm a")}
                      </span>
                    </div>
                    {u.byName && (
                      <div className="text-xs font-bold">{u.byName}</div>
                    )}
                    {u.remark && (
                      <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                        {u.remark}
                      </p>
                    )}
                    {u.completedLink && (
                      <a
                        href={u.completedLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-green-700 hover:underline"
                      >
                        <LinkIcon className="w-3 h-3" /> Completed link
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
