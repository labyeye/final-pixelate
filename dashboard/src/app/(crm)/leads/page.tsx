"use client";

import { useEffect, useState } from "react";
import type { Lead } from "@/lib/data";
import { leadStatuses } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [staffFilter, setStaffFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [isDeletingAssigned, setIsDeletingAssigned] = useState(false);
  const [deleteProgress, setDeleteProgress] = useState({
    current: 0,
    total: 0,
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // include auth header for GET so server can return role-filtered leads
        const items = await fetchLeadsWithAuth();
        if (mounted) setLeads(items as Lead[]);
        // load team members for name matching
        const t = await fetch("/api/team-members");
        const tm = await t.json();
        if (mounted) setTeam(tm || []);
      } catch (err) {
        console.error("Failed to load leads/team", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Helper to fetch leads securely and return an array. Handles 401 and non-array responses.
  async function fetchLeadsWithAuth(): Promise<Lead[]> {
    try {
      const token = localStorage.getItem("auth_token") || "";
      const res = await fetch("/api/leads", {
        headers: token ? { Authorization: "Bearer " + token } : {},
      });
      if (!res.ok) {
        console.warn("fetchLeadsWithAuth: server returned", res.status);
        // return empty array on auth failure or other errors to avoid UI crashes
        return [];
      }
      const data = await res.json();
      if (!Array.isArray(data)) return [];
      return data as Lead[];
    } catch (e) {
      console.error("fetchLeadsWithAuth error", e);
      return [];
    }
  }

  // Delete all leads: try server endpoint DELETE /api/leads, fallback to deleting per id.
  async function deleteAllLeads() {
    if (!confirm("Delete ALL leads? This cannot be undone.")) return;
    const API_BASE =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
        ? "https://backend.pixelatenest.com"
        : "";
    const token = localStorage.getItem("auth_token") || "";
    try {
      // Attempt bulk delete endpoint first (may not exist)
      const res = await fetch(API_BASE + "/api/leads", {
        method: "DELETE",
        headers: token ? { Authorization: "Bearer " + token } : {},
      });
      if (res.ok) {
        setLeads([]);
        localStorage.removeItem("leads_local");
        alert("All leads deleted (server)");
        return;
      }
    } catch (e) {
      console.warn("Bulk delete not available or failed, falling back", e);
    }
    try {
      // Fallback: fetch list and delete one-by-one
      const list = await fetchLeadsWithAuth();
      for (const l of list) {
        try {
          await fetch("/api/leads/" + String(l._id || l.id), {
            method: "DELETE",
            headers: token ? { Authorization: "Bearer " + token } : {},
          });
        } catch (er) {
          /* continue deleting others */
        }
      }
      setLeads([]);
      localStorage.removeItem("leads_local");
      alert("All leads deleted (per-item)");
    } catch (e) {
      console.error("Failed to delete leads", e);
      alert("Failed to delete all leads");
    }
  }

  // Delete all leads assigned to a specific staff member.
  async function deleteLeadsForStaff(staffId: string | null) {
    if (!staffId) return alert("Choose a staff member first");
    if (
      !confirm(
        "Delete ALL leads assigned to this staff member? This cannot be undone.",
      )
    )
      return;
    const API_BASE =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
        ? "https://backend.pixelatenest.com"
        : "";
    const token = localStorage.getItem("auth_token") || "";
    try {
      const allLeads = await fetchLeadsWithAuth();
      const toDelete = allLeads.filter(
        (l) => String(l.assignedTo) === String(staffId),
      );
      if (!toDelete.length)
        return alert("No leads assigned to this staff member");
      setIsDeletingAssigned(true);
      setDeleteProgress({ current: 0, total: toDelete.length });
      for (const l of toDelete) {
        try {
          const res = await fetch(
            API_BASE + "/api/leads/" + String(l._id || l.id),
            {
              method: "DELETE",
              headers: token ? { Authorization: "Bearer " + token } : {},
            },
          );
          // If deletion was forbidden (non-admin) or failed, throw to stop and surface message
          if (!res.ok) {
            throw new Error("Server returned " + res.status);
          }
        } catch (e) {
          console.error("Failed to delete lead", l, e);
          // Continue attempting remaining deletions but record failure
        } finally {
          setDeleteProgress((p) => ({
            current: Math.min(p.total, p.current + 1),
            total: p.total,
          }));
        }
      }
      // Refresh list from server
      try {
        const list = await fetchLeadsWithAuth();
        setLeads(list || []);
      } catch (er) {}
      alert(
        "Deletion of assigned leads completed (check server logs for failures)",
      );
    } catch (e) {
      console.error("deleteLeadsForStaff failed", e);
      alert(
        "Failed to delete assigned leads: " +
          (e instanceof Error ? e.message : String(e)),
      );
    } finally {
      setIsDeletingAssigned(false);
      setDeleteProgress({ current: 0, total: 0 });
      setStaffFilter("");
    }
  }

  async function deleteLead(leadId: string | number | undefined) {
    if (!leadId) return;
    const API_BASE =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
        ? "https://backend.pixelatenest.com"
        : "";
    try {
      const token = localStorage.getItem("auth_token") || "";
      let decoded: any = null;
      try {
        if (token) decoded = JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        decoded = null;
      }
      // if user is admin, attempt permanent delete
      if (decoded && decoded.role === "admin") {
        const res = await fetch(API_BASE + "/api/leads/" + String(leadId), {
          method: "DELETE",
          headers: token ? { Authorization: "Bearer " + token } : {},
        });
        if (res.ok) {
          setLeads(
            leads.filter((l) => String(l._id || l.id) !== String(leadId)),
          );
          alert("Deleted from DB");
          return;
        }
      }
      // non-admins: mark as not deletable with a reason
      const note =
        prompt(
          "You are not allowed to permanently delete leads. Enter a short note to mark this lead as not deletable:",
        ) || "";
      await fetch(API_BASE + "/api/leads/" + String(leadId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
        body: JSON.stringify({ doNotDelete: true, reason: note }),
      });
      setLeads(
        leads.map((l) =>
          String(l._id || l.id) === String(leadId)
            ? { ...l, doNotDelete: true, reason: note }
            : l,
        ),
      );
      alert("Marked as not deletable");
    } catch (e) {
      console.error("Delete failed", e);
      // fallback local-only deletion
      setLeads(leads.filter((l) => String(l._id || l.id) !== String(leadId)));
      alert("Deleted locally (server may be unreachable)");
    }
  }

  async function updateLeadStatus(
    leadId: string | number | undefined,
    newStatus: (typeof leadStatuses)[number],
  ) {
    if (!leadId) return;
    // prompt user for an optional reason when changing status
    const reason =
      prompt("Optional: enter a reason for this status change") || "";
    // optimistic UI update
    setLeads((l) =>
      l.map((x) =>
        String(x._id || x.id) === String(leadId)
          ? { ...x, status: newStatus, statusReason: reason }
          : x,
      ),
    );
    const API_BASE =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
        ? "https://backend.pixelatenest.com"
        : "";
    const token = localStorage.getItem("auth_token") || "";
    try {
      const res = await fetch(API_BASE + "/api/leads/" + String(leadId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
        body: JSON.stringify({ status: newStatus, statusReason: reason }),
      });
      if (!res.ok) {
        // revert UI on failure - reload leads with auth header
        try {
          const list = await fetchLeadsWithAuth();
          setLeads(list || []);
        } catch (er) {}
        alert("Failed to update status on server");
      }
    } catch (e) {
      console.error("Status update failed", e);
      // on network error, revert to server state
      try {
        const token = localStorage.getItem("auth_token") || "";
        const list = await (
          await fetch("/api/leads", {
            headers: token ? { Authorization: "Bearer " + token } : {},
          })
        ).json();
        setLeads(list || []);
      } catch (er) {}
      alert("Network error while updating status");
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Leads (Table)</h1>
        <p className="text-sm text-muted-foreground">
          View and manage your leads.
        </p>
      </header>

      <div className="flex items-center gap-4">
        <label className="text-sm">Filter by staff:</label>
        <select
          value={staffFilter}
          onChange={(e) => setStaffFilter(e.target.value)}
          className="px-2 py-1 rounded-md bg-background border"
        >
          <option value="">-- Select staff --</option>
          {team.map((t) => (
            <option key={String(t._id || t.id)} value={String(t._id || t.id)}>
              {t.name}
            </option>
          ))}
        </select>
        <label className="text-sm">Filter by status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-2 py-1 rounded-md bg-background border"
        >
          <option value="">-- Any status --</option>
          {leadStatuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <Button
          variant="destructive"
          onClick={() => deleteLeadsForStaff(staffFilter)}
          disabled={!staffFilter || isDeletingAssigned}
        >
          Delete leads for selected staff
        </Button>
        {isDeletingAssigned ? (
          <div className="text-sm">
            Deleting {deleteProgress.current}/{deleteProgress.total}...
          </div>
        ) : null}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Assigned</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Status Reason</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads
            .filter((l) => {
              // apply staff filter first
              if (staffFilter) {
                if (
                  String(l.assignedTo || l.assignedToName) !==
                  String(staffFilter)
                )
                  return false;
              }
              // apply status filter
              if (statusFilter) {
                if (String(l.status || "") !== String(statusFilter))
                  return false;
              }
              return true;
            })
            .map((lead) => (
              <TableRow key={String(lead._id || lead.id)}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{(lead as any).category || "-"}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>
                  {lead.assignedToName || lead.assignedTo || "-"}
                </TableCell>
                <TableCell>
                  <select
                    value={lead.status || leadStatuses[0]}
                    onChange={(e) =>
                      updateLeadStatus(
                        lead._id || lead.id,
                        e.target.value as any,
                      )
                    }
                    className="px-2 py-1 rounded-md bg-background border"
                  >
                    {leadStatuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </TableCell>
                <TableCell>{(lead as any).statusReason || "-"}</TableCell>
                <TableCell>
                  {lead.doNotDelete ? (
                    <div className="text-sm text-muted-foreground">
                      Not deletable
                    </div>
                  ) : null}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteLead(lead._id || lead.id)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
