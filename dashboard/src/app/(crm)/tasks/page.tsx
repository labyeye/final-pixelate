"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Task, TaskStatus } from "@/lib/task-models";
import {
  Plus,
  MoreHorizontal,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  ListTodo,
  CheckCircle2,
  Activity,
  Clock,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TaskCreationModal } from "@/components/dashboard/task-creation-modal";
import { TaskDetailModal } from "@/components/dashboard/task-detail-modal";
import { useAuth } from "@/hooks/use-auth";

export default function TasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const fetchTasks = async (currentUserId: string | null) => {
    try {
      const url = currentUserId
        ? `/api/tasks?userId=${encodeURIComponent(currentUserId)}`
        : "/api/tasks";
      const res = await apiFetch(url);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (e) {
      console.error("Failed to fetch tasks", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    const isAdmin = user.role === "admin";
    const storedUserId = isAdmin
      ? null
      : String(user.id ?? (user as any)._id ?? "") || null;
    setUserId(storedUserId);
    fetchTasks(storedUserId);

    const handler = () => {
      fetchTasks(storedUserId);
    };
    window.addEventListener("task:created", handler);
    return () => window.removeEventListener("task:created", handler);
  }, [user]);

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getTasksByStatus = (status: TaskStatus) =>
    filteredTasks.filter((t) => t.status === status);

  const openTask = (task: Task) => {
    setSelectedTask(task);
    setDetailOpen(true);
  };

  const handleTaskUpdated = (updated: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === (updated.id ?? (updated as any)._id) ? { ...t, ...updated } : t)),
    );
    setSelectedTask(updated);
  };

  const actor = user
    ? {
        id: String(user.id ?? (user as any)._id ?? ""),
        name: user.name ?? "",
        role: user.role ?? "staff",
      }
    : null;

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col font-sans text-foreground">
      {}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-3 group">
          <div className="p-2 rounded hover:bg-muted/50 transition-colors cursor-pointer">
            <span className="text-4xl">☑️</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground cursor-text">
            Tasks
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={ListTodo} label="TOTAL TASKS" value={tasks.length} sub={`${filteredTasks.length} matching`} iconVariant="primary" />
          <StatCard icon={CheckCircle2} label="DONE" value={getTasksByStatus("done").length} sub="completed" iconVariant="secondary" />
          <StatCard icon={Activity} label="IN PROGRESS" value={getTasksByStatus("in-progress").length} sub="active" iconVariant="primary" />
          <StatCard icon={Clock} label="NOT STARTED" value={getTasksByStatus("not-started").length} sub="pending" iconVariant="secondary" />
        </div>

        {}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 bg-transparent border-none shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="h-4 w-[1px] bg-border mx-2" />
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-2 text-muted-foreground hover:text-foreground"
            >
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {}
            <div className="w-auto">
              <TaskCreationModal />
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full gap-8 min-w-[800px]">
          {}
          <TaskColumn
            title="Not Started"
            count={getTasksByStatus("not-started").length}
            color="bg-muted-foreground/20"
            tasks={getTasksByStatus("not-started")}
            onOpenTask={openTask}
          />

          {}
          <TaskColumn
            title="In Progress"
            count={getTasksByStatus("in-progress").length}
            color="bg-blue-500/20"
            textColor="text-blue-600"
            tasks={getTasksByStatus("in-progress")}
            onOpenTask={openTask}
          />

          {}
          <TaskColumn
            title="Done (Review)"
            count={getTasksByStatus("done").length}
            color="bg-amber-500/20"
            textColor="text-amber-600"
            tasks={getTasksByStatus("done")}
            onOpenTask={openTask}
          />

          {}
          <TaskColumn
            title="Issues"
            count={getTasksByStatus("issues").length}
            color="bg-red-500/20"
            textColor="text-red-600"
            tasks={getTasksByStatus("issues")}
            onOpenTask={openTask}
          />

          {}
          <TaskColumn
            title="Completed"
            count={getTasksByStatus("completed").length}
            color="bg-green-500/20"
            textColor="text-green-600"
            tasks={getTasksByStatus("completed")}
            onOpenTask={openTask}
          />

          {}
          <div className="w-[300px] opacity-0 hover:opacity-50 transition-opacity flex items-start pt-2">
            <Button variant="ghost" className="gap-2">
              <Plus className="w-4 h-4" /> Add Group
            </Button>
          </div>
        </div>
      </div>

      <TaskDetailModal
        task={selectedTask}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        actor={actor}
        onUpdated={handleTaskUpdated}
      />
    </div>
  );
}

function TaskColumn({
  title,
  count,
  color,
  textColor = "text-muted-foreground",
  tasks,
  onOpenTask,
}: {
  title: string;
  count: number;
  color: string;
  textColor?: string;
  tasks: Task[];
  onOpenTask: (task: Task) => void;
}) {
  return (
    <div className="w-[300px] flex flex-col h-full">
      {}
      <div className="flex items-center gap-2 mb-3 px-1">
        <span
          className={`px-2 py-0.5 rounded text-xs font-bold ${color} ${textColor}`}
        >
          {title}
        </span>
        <span className="text-muted-foreground text-xs font-medium">
          {count}
        </span>
        <div className="ml-auto flex gap-1 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {}
      <div className="flex-1 flex flex-col gap-2 pb-4 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onOpenTask={onOpenTask} />
        ))}

        <Button
          variant="ghost"
          className="justify-start text-muted-foreground hover:text-foreground h-9 px-2"
        >
          <Plus className="w-4 h-4 mr-2" /> New
        </Button>
      </div>
    </div>
  );
}

function TaskCard({
  task,
  onOpenTask,
}: {
  task: Task;
  onOpenTask: (task: Task) => void;
}) {
  return (
    <div
      onClick={() => onOpenTask(task)}
      className="bg-card hover:bg-accent/10 border border-transparent hover:border-border transition-all rounded-md shadow-sm p-3 group cursor-pointer flex flex-col gap-2 relative"
    >
      {}
      <span className="font-medium text-sm text-foreground/90">
        {task.title}
      </span>

      {}
      <div className="flex flex-wrap gap-2 mt-1">
        {task.projectTitle && (
          <span className="px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-700 text-[10px] font-medium border border-blue-200 truncate max-w-[100px]">
            {task.projectTitle}
          </span>
        )}

        {task.tags?.map((tag) => (
          <span
            key={tag}
            className="px-1.5 py-0.5 rounded-sm bg-purple-100 text-purple-700 text-[10px] font-medium border border-purple-200"
          >
            {tag}
          </span>
        ))}

        {task.priority === "high" && (
          <span className="px-1.5 py-0.5 rounded-sm bg-red-100 text-red-700 text-[10px] font-medium border border-red-200">
            High
          </span>
        )}
      </div>

      {(task.assigneeName || task.dueDate) && (
        <div className="flex items-center justify-between mt-1 pt-2 border-t border-border/40">
          <div className="flex items-center gap-2">
            {task.assigneeName && (
              <div
                className="flex items-center gap-1.5"
                title={task.assigneeName}
              >
                <Avatar className="h-4 w-4">
                  <AvatarImage src={task.assigneeAvatar} />
                  <AvatarFallback className="text-[8px] bg-orange-200 text-orange-800">
                    {task.assigneeName[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
            {task.dueDate && (
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(task.dueDate), "MMM d")}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {}
      <div className="mt-2">
        <span className="inline-block h-7 leading-7 px-2 text-xs font-bold border rounded-md capitalize text-muted-foreground">
          {task.status.replace("-", " ")}
        </span>
      </div>
    </div>
  );
}
