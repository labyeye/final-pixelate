import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Flag,
  Layout,
  Plus,
  Smile,
  User,
  Briefcase,
  Check,
} from "lucide-react"; // Renamed Calendar to CalendarIcon to avoid conflict
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TaskCreationModal() {
  const [open, setOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("not-started");
  const [priority, setPriority] = useState("medium");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  // Selection State
  const [selectedProjectId, setSelectedProjectId] = useState<string>("none");
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<string>("none");

  // Data Options
  const [projects, setProjects] = useState<any[]>([]);
  const [staffMembers, setStaffMembers] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      // Fetch options when modal opens
      Promise.all([
        fetch("/api/projects").then((res) => res.json()),
        fetch("/api/users").then((res) => res.json()),
        fetch("/api/clients").then((res) => res.json()),
      ])
        .then(([projectsData, usersData, clientsData]) => {
          setProjects(Array.isArray(projectsData) ? projectsData : []);
          const staff = Array.isArray(usersData)
            ? usersData.filter(
                (u: any) => u.role === "staff" || u.role === "admin",
              )
            : [];
          setStaffMembers(staff);
          setClients(Array.isArray(clientsData) ? clientsData : []);
        })
        .catch((err) => console.error("Failed to load options", err));
    }
  }, [open]);

  const handleSave = async () => {
    if (!title) return;
    setLoading(true);

    try {
      // Find full objects for denormalization if needed
      const project = projects.find(
        (p) => (p.id || p._id) === selectedProjectId,
      );
      const assignee = staffMembers.find(
        (u) => (u.id || u._id) === selectedAssigneeId,
      );

      const payload = {
        title,
        description,
        status,
        priority,
        dueDate,
        projectId: selectedProjectId !== "none" ? selectedProjectId : null,
        projectTitle: project?.title || null,
        assigneeId: selectedAssigneeId !== "none" ? selectedAssigneeId : null,
        assigneeName: assignee?.name || null,
        assigneeAvatar: assignee?.avatar || null,
        tags: [],
      };

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setOpen(false);
        // Reset form
        setTitle("");
        setDescription("");
        setStatus("not-started");
        setPriority("medium");
        setSelectedProjectId("none");
        setSelectedAssigneeId("none");
        setDueDate(undefined);

        // Dispatch event to refresh list
        window.dispatchEvent(new Event("task:created"));
      }
    } catch (e) {
      console.error("Failed to save task", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 border-dashed border-2 hover:border-solid w-full"
        >
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </DialogTrigger>
      {/* Notion-style minimal modal */}
      <DialogContent className="sm:max-w-[700px] p-0 gap-0 overflow-hidden shadow-2xl border-none">
        {/* Cover Image Placeholder (Optional visual flair) */}
        <div className="h-32 bg-gradient-to-r from-pink-100 to-blue-100 w-full opacity-30" />

        <div className="px-8 pb-8 -mt-8 relative z-10 bg-background pt-6 rounded-t-3xl">
          {/* Icon Picker Placeholder */}
          <div className="mb-6 group cursor-pointer inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Smile className="w-6 h-6" />
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Add Icon
            </span>
          </div>

          {/* Title Input */}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl font-bold border-none shadow-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/40 h-auto py-2"
            placeholder="Untitled"
            autoFocus
          />

          {/* Properties Grid */}
          <div className="grid gap-3 mt-6 mb-8 text-sm">
            {/* Status Property */}
            <div className="flex items-center gap-4 group">
              <div className="w-32 flex items-center gap-2 text-muted-foreground">
                <Layout className="w-4 h-4" />
                <span>Status</span>
              </div>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[200px] h-8 border-none shadow-none hover:bg-muted/50 focus:ring-0 px-2 rounded font-medium text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">
                    <span className="inline-block w-2 h-2 rounded-full bg-slate-300 mr-2" />
                    Not Started
                  </SelectItem>
                  <SelectItem value="in-progress">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2" />
                    In Progress
                  </SelectItem>
                  <SelectItem value="done">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2" />
                    Done
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority Property */}
            <div className="flex items-center gap-4 group">
              <div className="w-32 flex items-center gap-2 text-muted-foreground">
                <Flag className="w-4 h-4" />
                <span>Priority</span>
              </div>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-[200px] h-8 border-none shadow-none hover:bg-muted/50 focus:ring-0 px-2 rounded font-medium text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assignee Property */}
            <div className="flex items-center gap-4 group">
              <div className="w-32 flex items-center gap-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Assignee</span>
              </div>
              <Select
                value={selectedAssigneeId}
                onValueChange={setSelectedAssigneeId}
              >
                <SelectTrigger className="w-[200px] h-8 border-none shadow-none hover:bg-muted/50 focus:ring-0 px-2 rounded font-medium text-foreground">
                  <SelectValue placeholder="Empty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Empty</SelectItem>
                  {staffMembers.map((user) => (
                    <SelectItem
                      key={user.id || user._id}
                      value={user.id || user._id}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="text-[10px]">
                            {user.name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        {user.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Project Property */}
            <div className="flex items-center gap-4 group">
              <div className="w-32 flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-4 h-4" />
                <span>Project</span>
              </div>
              <Select
                value={selectedProjectId}
                onValueChange={setSelectedProjectId}
              >
                <SelectTrigger className="w-[200px] h-8 border-none shadow-none hover:bg-muted/50 focus:ring-0 px-2 rounded font-medium text-foreground">
                  <SelectValue placeholder="Empty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Empty</SelectItem>
                  {projects.map((p) => {
                    // Find the client name.
                    // The project object has a `clientId`.
                    // The clients have `id` or `_id`.
                    const client = clients.find(
                      (c) =>
                        String(c.id || c._id) ===
                        String(p.clientId || p.client),
                    );
                    const clientName = client?.name || p.clientName || "";

                    return (
                      <SelectItem key={p.id || p._id} value={p.id || p._id}>
                        {p.title} {clientName ? `(${clientName})` : ""}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Date Property */}
            <div className="flex items-center gap-4 group">
              <div className="w-32 flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="w-4 h-4" />
                <span>Due Date</span>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "w-[200px] justify-start text-left font-normal h-8 px-2 hover:bg-muted/50",
                      !dueDate && "text-muted-foreground",
                    )}
                  >
                    {dueDate ? format(dueDate, "PPP") : <span>Empty</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="h-[1px] bg-border w-full mb-6" />

          {/* Description / Content Body */}
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[200px] border-none shadow-none resize-none focus-visible:ring-0 p-0 text-lg leading-relaxed text-muted-foreground"
            placeholder="Press space for commands..."
          />

          <div className="flex justify-end pt-4">
            <Button
              className="font-bold"
              onClick={handleSave}
              disabled={loading || !title}
            >
              {loading ? "Saving..." : "Save Task"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
