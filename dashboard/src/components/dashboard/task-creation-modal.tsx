import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Flag,
  Layout,
  Plus,
  User,
  Briefcase,
  Link as LinkIcon,
} from "lucide-react";
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
import { apiFetch } from "@/lib/api-fetch";

export function TaskCreationModal() {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("not-started");
  const [priority, setPriority] = useState("medium");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [assetLink, setAssetLink] = useState("");

  const [selectedProjectId, setSelectedProjectId] = useState<string>("none");
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<string>("none");

  const [projects, setProjects] = useState<any[]>([]);
  const [staffMembers, setStaffMembers] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      Promise.all([
        apiFetch("/api/projects").then((res) => res.json()),
        apiFetch("/api/users").then((res) => res.json()),
        apiFetch("/api/clients").then((res) => res.json()),
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
        assetLink: assetLink || null,
        tags: [],
      };

      const res = await apiFetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setOpen(false);

        setTitle("");
        setDescription("");
        setStatus("not-started");
        setPriority("medium");
        setSelectedProjectId("none");
        setSelectedAssigneeId("none");
        setDueDate(undefined);
        setAssetLink("");

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
          className="gap-2 border-2 border-black font-bold rounded-none hover:bg-black hover:text-white w-full"
        >
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0 gap-0 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
        <div className="px-8 py-6 border-b-4 border-black">
          <h2 className="text-2xl font-black tracking-tighter uppercase">
            New Task
          </h2>
        </div>

        <div className="px-8 py-6 space-y-6">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-black border-2 border-black rounded-none h-14 px-3 placeholder:text-muted-foreground/40"
            placeholder="Task title"
            autoFocus
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                <Layout className="w-3.5 h-3.5" />
                Status
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="border-2 border-black rounded-none h-10 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                <Flag className="w-3.5 h-3.5" />
                Priority
              </label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="border-2 border-black rounded-none h-10 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                <User className="w-3.5 h-3.5" />
                Assignee
              </label>
              <Select
                value={selectedAssigneeId}
                onValueChange={setSelectedAssigneeId}
              >
                <SelectTrigger className="border-2 border-black rounded-none h-10 font-bold">
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Unassigned</SelectItem>
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

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                <Briefcase className="w-3.5 h-3.5" />
                Project
              </label>
              <Select
                value={selectedProjectId}
                onValueChange={setSelectedProjectId}
              >
                <SelectTrigger className="border-2 border-black rounded-none h-10 font-bold">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {projects.map((p) => {
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

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                <CalendarIcon className="w-3.5 h-3.5" />
                Due Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-bold border-2 border-black rounded-none h-10",
                      !dueDate && "text-muted-foreground font-normal",
                    )}
                  >
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
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

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                <LinkIcon className="w-3.5 h-3.5" />
                Asset Link
              </label>
              <Input
                value={assetLink}
                onChange={(e) => setAssetLink(e.target.value)}
                placeholder="Drive / Figma / brief link"
                className="border-2 border-black rounded-none h-10 font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[140px] border-2 border-black rounded-none resize-none text-base leading-relaxed"
              placeholder="What needs to be done..."
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              className="font-black border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
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
