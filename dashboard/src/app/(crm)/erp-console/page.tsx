"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

export default function ErpConsolePage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
    const t = setInterval(fetchEvents, 5000);
    return () => clearInterval(t);
  }, []);

  async function fetchEvents() {
    try {
      const res = await fetch("/api/erp-events");
      const json = await res.json();
      if (Array.isArray(json)) setEvents(json);
    } catch (e) {
      console.error("Failed to load erp events", e);
    } finally {
      setLoading(false);
    }
  }

  const typeColors: Record<string, string> = {
    login: "bg-green-700 text-white",
    logout: "bg-slate-600 text-white",
    permission_change: "bg-amber-600 text-white",
    data_update: "bg-cyan-600 text-white",
    error: "bg-red-600 text-white",
    event: "bg-blue-600 text-white",
    post_created: "bg-emerald-600 text-white",
    post_updated: "bg-blue-500 text-white",
    post_deleted: "bg-rose-600 text-white",
  };

  return (
    <div className="p-6 min-h-screen bg-white text-slate-900">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-mono font-bold">erp-console</h2>
          <p className="text-sm text-slate-600 font-mono">
            Live audit trail — tracks logins, permissions, social media posts
            (create/edit/delete), and system events.
          </p>
        </div>
        <Zap className="w-6 h-6 text-slate-600" />
      </div>

      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="font-mono text-slate-900">
            Recent Events
          </CardTitle>
          <CardDescription className="font-mono text-slate-600">
            Raw event stream (newest first)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[60vh] overflow-auto font-mono text-sm bg-white text-slate-900 p-4">
            {loading && <div className="text-slate-400">Loading...</div>}
            {!loading && events.length === 0 && (
              <div className="text-slate-500">No events yet.</div>
            )}

            {events.map((ev) => {
              const t = new Date(ev.createdAt).toLocaleString();
              const typeClass = typeColors[ev.type] || typeColors.event;
              const adminName =
                ev.email?.split("@")[0] || ev.adminName || "Unknown Admin";
              const targetName = ev.targetName || "Unknown";

              let actionMsg = "";
              let details = "";

              if (ev.type === "login") {
                actionMsg = `${adminName} logged in`;
              } else if (ev.type === "logout") {
                actionMsg = `${adminName} logged out`;
              } else if (ev.type === "permission_change") {
                actionMsg = `${adminName} changed permissions of ${targetName}`;

                const pagePerms = ev.details?.pagePermissions || {};
                const pagesList = Object.entries(pagePerms).map(
                  ([page, perms]: [string, any]) => {
                    const permissions = Object.entries(perms)
                      .filter(([_, val]) => val === true)
                      .map(([perm, _]) => perm)
                      .join(", ");
                    return `${page}: ${permissions || "none"}`;
                  },
                );

                details =
                  pagesList.length > 0
                    ? `Pages changed:\n${pagesList.join("\n")}`
                    : "No permissions changed";
              } else if (ev.type === "post_created") {
                const postTitle = ev.details?.postTitle || "Untitled";
                const platform = ev.details?.platform || "Unknown Platform";
                const accountCount =
                  (ev.details?.socialAccountIds?.length || 0) +
                  (ev.details?.socialAccountId ? 1 : 0);
                actionMsg = `${adminName} created post "${postTitle}"`;
                details = `Platform: ${platform}\nAccounts: ${accountCount}\nStatus: ${ev.details?.status || "Draft"}`;
                if (ev.details?.scheduledDate) {
                  details += `\nScheduled: ${ev.details.scheduledDate}`;
                }
              } else if (ev.type === "post_updated") {
                const postTitle = ev.details?.postTitle || "Untitled";
                const changedFields =
                  ev.details?.changedFields?.join(", ") || "unknown fields";
                actionMsg = `${adminName} updated post "${postTitle}"`;
                details = `Changed: ${changedFields}`;
                if (ev.details?.changes) {
                  const changesList = Object.entries(ev.details.changes).map(
                    ([field, change]: [string, any]) => {
                      if (
                        typeof change === "object" &&
                        change.before !== undefined &&
                        change.after !== undefined
                      ) {
                        return `  ${field}: ${change.before} → ${change.after}`;
                      }
                      return `  ${field}: ${change}`;
                    },
                  );
                  details += `\n${changesList.join("\n")}`;
                }
              } else if (ev.type === "post_deleted") {
                const postTitle = ev.details?.postTitle || "Untitled";
                const platform = ev.details?.platform || "Unknown Platform";
                actionMsg = `${adminName} deleted post "${postTitle}"`;
                details = `Platform: ${platform}\nStatus: ${ev.details?.status || "Unknown"}`;
              } else if (ev.type === "data_update") {
                const target = ev.target || ev.details?.target || "data";
                actionMsg = `${adminName} updated ${target}`;
                details = ev.details?.message || "";
              } else if (ev.type === "error") {
                const msg = ev.details?.message || "error occurred";
                actionMsg = `${adminName} encountered error`;
                details = msg;
              } else {
                actionMsg = `${adminName} performed ${ev.type}`;
              }

              return (
                <div
                  key={ev._id ?? ev.id}
                  className="mb-4 pb-4 border-b border-slate-200 last:border-b-0"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="text-slate-500 text-xs">{t}</div>
                    <div
                      className={`px-2 py-0.5 rounded-sm text-xs font-semibold ${typeClass}`}
                    >
                      {ev.type}
                    </div>
                    <div className="text-slate-700 font-medium">
                      {actionMsg}
                    </div>
                  </div>
                  {details && (
                    <div className="mt-2 ml-0 text-slate-600 text-xs whitespace-pre-wrap break-words bg-slate-50 p-2 rounded">
                      {details}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
