"use client";

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
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TaskCreationModal } from "@/components/dashboard/task-creation-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// No MOCK_TASKS array needed anymore

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchTasks = async (currentUserId: string | null) => {
    try {
      const url = currentUserId
        ? `/api/tasks?userId=${encodeURIComponent(currentUserId)}`
        : "/api/tasks";
      const res = await fetch(url);
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
    // Get userId from session storage
    const storedUserId = typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;
    setUserId(storedUserId);
    fetchTasks(storedUserId);

    const handler = () => {
      fetchTasks(storedUserId);
    };
    window.addEventListener("task:created", handler);
    return () => window.removeEventListener("task:created", handler);
  }, []);

  const updateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    try {
      const url = userId
        ? `/api/tasks/${taskId}?userId=${encodeURIComponent(userId)}`
        : `/api/tasks/${taskId}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedTask = await res.json();
        setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
      } else {
        console.error("Failed to update task status");
      }
    } catch (e) {
      console.error("Failed to update task status", e);
    }
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getTasksByStatus = (status: TaskStatus) =>
    filteredTasks.filter((t) => t.status === status);

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col font-sans text-foreground">
      {/* Notion-like Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-3 group">
          <div className="p-2 rounded hover:bg-muted/50 transition-colors cursor-pointer">
            <span className="text-4xl">☑️</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground cursor-text">
            Tasks
          </h1>
        </div>

        {/* Toolbar */}
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
            {/* Wrapped in a div to prevent the modal trigger button from stretching excessively if it was full-width */}
            <div className="w-auto">
              <TaskCreationModal />
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full gap-8 min-w-[800px]">
          {/* Column: Not Started */}
          <TaskColumn
            title="Not Started"
            count={getTasksByStatus("not-started").length}
            color="bg-muted-foreground/20"
            tasks={getTasksByStatus("not-started")}
            onStatusChange={updateTaskStatus}
          />

          {/* Column: In Progress */}
          <TaskColumn
            title="In Progress"
            count={getTasksByStatus("in-progress").length}
            color="bg-blue-500/20"
            textColor="text-blue-600"
            tasks={getTasksByStatus("in-progress")}
            onStatusChange={updateTaskStatus}
          />

          {/* Column: Done */}
          <TaskColumn
            title="Done"
            count={getTasksByStatus("done").length}
            color="bg-green-500/20"
            textColor="text-green-600"
            tasks={getTasksByStatus("done")}
            onStatusChange={updateTaskStatus}
          />

          {/* Add Group Placeholder */}
          <div className="w-[300px] opacity-0 hover:opacity-50 transition-opacity flex items-start pt-2">
            <Button variant="ghost" className="gap-2">
              <Plus className="w-4 h-4" /> Add Group
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskColumn({
  title,
  count,
  color,
  textColor = "text-muted-foreground",
  tasks,
  onStatusChange,
}: {
  title: string;
  count: number;
  color: string;
  textColor?: string;
  tasks: Task[];
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}) {
  return (
    <div className="w-[300px] flex flex-col h-full">
      {/* Column Header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${color} ${textColor}`}>
          {title}
        </span>
        <span className="text-muted-foreground text-xs font-medium">{count}</span>
        <div className="ml-auto flex gap-1 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 flex flex-col gap-2 pb-4 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
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
  onStatusChange,
}: {
  task: Task;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}) {
  const statusOptions: TaskStatus[] = ["not-started", "in-progress", "done"];

  return (
    <div className="bg-card hover:bg-accent/10 border border-transparent hover:border-border transition-all rounded-md shadow-sm p-3 group cursor-pointer flex flex-col gap-2 relative">
      {/* Title */}
      <span className="font-medium text-sm text-foreground/90">{task.title}</span>

      {/* Properties (only show if present) */}
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
              <div className="flex items-center gap-1.5" title={task.assigneeName}>
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

      {/* Status Change Dropdown */}
      <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs w-full justify-between"
            >
              <span className="capitalize">{task.status.replace("-", " ")}</span>
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {statusOptions.map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => {
                  if (task.id) {
                    onStatusChange(task.id, status);
                  }
                }}
                className="capitalize"
              >
                {status.replace("-", " ")}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
