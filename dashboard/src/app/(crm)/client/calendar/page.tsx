"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ClientCalendarPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (!user || user.role !== "client") return;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        
        const [plannerRes, tasksRes] = await Promise.all([
          fetch("/api/social-media-planner", { headers }),
          fetch("/api/tasks", { headers }),
        ]);

        let allEvents: any[] = [];

        if (plannerRes.ok) {
          const posts = await plannerRes.json();
          const clientPosts = Array.isArray(posts)
            ? posts.filter((p) => p.clientId === user.clientId)
            : [];
          allEvents = [
            ...allEvents,
            ...clientPosts.map((p) => ({
              ...p,
              type: "post",
              date: p.scheduledDate,
            })),
          ];
        }

        if (tasksRes.ok) {
          const tasks = await tasksRes.json();
          const clientTasks = Array.isArray(tasks)
            ? tasks.filter((t) => t.clientId === user.clientId)
            : [];
          allEvents = [
            ...allEvents,
            ...clientTasks.map((t) => ({
              ...t,
              type: "task",
              date: t.dueDate,
            })),
          ];
        }

        setEvents(allEvents);
      } catch (err) {
        console.error("Failed to load calendar events", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user]);

  
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

  const upcomingEvents = events
    .filter((e) => {
      const eventDate = new Date(e.date);
      return eventDate >= monthStart && eventDate <= monthEnd;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const changeMonth = (offset: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
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
        <h1 className="text-4xl font-black tracking-tighter">Calendar</h1>
        <p className="text-muted-foreground mt-1">View your scheduled posts and tasks</p>
      </div>

      {}
      <Card className="border-2 border-black">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <button
            onClick={() => changeMonth(-1)}
            className="px-3 py-1 border-2 border-black rounded-md font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            ← Previous
          </button>
          <CardTitle className="text-xl">
            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </CardTitle>
          <button
            onClick={() => changeMonth(1)}
            className="px-3 py-1 border-2 border-black rounded-md font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Next →
          </button>
        </CardHeader>
      </Card>

      {}
      <div>
        {loading ? (
          <div className="text-center text-muted-foreground">Loading calendar...</div>
        ) : upcomingEvents.length === 0 ? (
          <Card className="border-2 border-black">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-2">📅</div>
              <p className="font-bold">No events scheduled for this month</p>
              <p className="text-sm text-muted-foreground">Check back soon for new posts and tasks</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Card
                key={`${event.type}-${event._id}`}
                className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-primary text-primary-foreground font-bold">
                          {event.type === "post" ? "📱 Post" : "✓ Task"}
                        </Badge>
                        {event.platform && (
                          <Badge variant="outline" className="border-black font-bold">
                            {event.platform}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-bold text-lg">{event.title || event.name || "Untitled"}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {event.description || event.caption || "-"}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {}
      <Card className="border-2 border-black bg-primary/5">
        <CardContent className="pt-6">
          <p className="text-sm">
            <span className="font-bold">💡 Note:</span> This calendar shows all your scheduled posts and tasks. Your team manages all scheduling.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
