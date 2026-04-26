"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function ClientDevelopmentPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
  });
  useEffect(() => {
    if (!user || user.role !== "client") return;

    const fetchTasks = async () => {
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

        const res = await fetch("/api/tasks", { headers });
        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data = await res.json();
        const clientTasks = Array.isArray(data)
          ? data.filter((t) => t.clientId === user.clientId)
          : [];

        setTasks(clientTasks);

        
        const total = clientTasks.length;
        const completed = clientTasks.filter(
          (t) => t.status === "completed",
        ).length;
        const inProgress = clientTasks.filter(
          (t) => t.status === "in progress",
        ).length;
        const pending = clientTasks.filter(
          (t) => t.status === "pending",
        ).length;

        setStats({ total, completed, inProgress, pending });
      } catch (err) {
        console.error("Failed to load tasks", err);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in progress":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "in progress":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const progressPercentage =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

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
        <h1 className="text-4xl font-black tracking-tighter">
          Development Progress
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your project tasks and milestones
        </p>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest">
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold">
                  {stats.completed} of {stats.total} tasks
                </span>
                <span className="text-lg font-black text-primary">
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-muted border-2 border-black rounded-full h-4 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-2">
          <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-4">
              <div className="text-2xl font-black text-green-600">
                {stats.completed}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Completed
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-4">
              <div className="text-2xl font-black text-blue-600">
                {stats.inProgress}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                In Progress
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-4">
              <div className="text-2xl font-black text-yellow-600">
                {stats.pending}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Pending
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {}
      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle className="text-lg">Task List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center text-muted-foreground">
              Loading tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-2">✓</div>
              <p className="font-bold">No tasks available</p>
              <p className="text-sm text-muted-foreground">
                Your tasks will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="p-4 border-2 border-black rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(task.status)}
                        <h3 className="font-bold text-lg">
                          {task.title || "Untitled"}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {task.description || "-"}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          className={`${getStatusColor(task.status)} font-bold border-black`}
                        >
                          {task.status || "Pending"}
                        </Badge>
                        {task.priority && (
                          <Badge
                            variant="outline"
                            className="border-black font-bold"
                          >
                            {task.priority}
                          </Badge>
                        )}
                        {task.dueDate && (
                          <span className="text-xs text-muted-foreground">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    {task.assignee && (
                      <div className="text-right">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          Assigned to
                        </p>
                        <p className="text-sm font-bold">{task.assignee}</p>
                      </div>
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
            <span className="font-bold">💡 Note:</span> This is a read-only view
            of your development tasks. Your team manages all task creation and
            updates. Check back regularly for progress updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
