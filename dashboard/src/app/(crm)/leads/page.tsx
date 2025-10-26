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
import { Trash, Upload } from "lucide-react";

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
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState({
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

  // parse uploaded XLSX/CSV and map into lead objects
  async function handleImport() {
    if (!file) return alert("Choose an Excel file first");
    // load xlsx dynamically (dev dependency may not be installed)
    const XLSX = await import("xlsx");
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: "array" });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" }) as any[];
    // Expect columns: Name, Phone, Email, Staff Assigned
    function levenshtein(a: string, b: string) {
      if (a === b) return 0;
      const al = a.length,
        bl = b.length;
      if (al === 0) return bl;
      if (bl === 0) return al;
      const matrix = Array.from({ length: al + 1 }, () =>
        new Array(bl + 1).fill(0)
      );
      for (let i = 0; i <= al; i++) matrix[i][0] = i;
      for (let j = 0; j <= bl; j++) matrix[0][j] = j;
      for (let i = 1; i <= al; i++) {
        for (let j = 1; j <= bl; j++) {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1;
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + cost
          );
        }
      }
      return matrix[al][bl];
    }

    const parsed = rows.map((r) => {
      const staffName = (r["Staff Assigned"] || r["Staff"] || r.staff || "")
        .toString()
        .trim();
      let matched = null;
      if (staffName) {
        // exact match
        matched = team.find(
          (t) =>
            t.name && String(t.name).toLowerCase() === staffName.toLowerCase()
        );
        // contains
        if (!matched)
          matched = team.find(
            (t) =>
              t.name &&
              String(t.name).toLowerCase().includes(staffName.toLowerCase())
          );
        // fuzzy
        if (!matched) {
          let best: any = null;
          let bestScore = Infinity;
          for (const t of team) {
            if (!t.name) continue;
            const score = levenshtein(
              String(t.name).toLowerCase(),
              staffName.toLowerCase()
            );
            if (score < bestScore) {
              bestScore = score;
              best = t;
            }
          }
          // accept fuzzy match only when reasonably close (edit distance < 4)
          if (best && bestScore < 4) matched = best;
        }
      }
      return {
        name: r["Name"] || r["Full Name"] || r.name || "",
        phone: r["Phone"] || r.Phone || r.phone || "",
        category: r["Category"] || r.Category || r.category || "",
        email: r["Email"] || r.email || "",
        assignedTo: matched ? matched._id || matched.id : null,
        assignedToName: matched ? matched.name : staffName || null,
        // default imported status should be 'not called'
        status: "not called",
        project: r["Project"] || r.project || "",
        value: r["Value"] || r.value || 0,
        createdAt: new Date().toISOString(),
      };
    });

    // Attempt batch upload so we can show progress. We send in small batches to
    // update progress reliably and avoid long blocking requests.
    // NOTE: when running on localhost we should POST to the same origin (''),
    // and only use the production URL when running in a deployed environment.
    const API_BASE =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
        ? ""
        : "https://pixelatenest-crm.vercel.app";
    const token = localStorage.getItem("auth_token") || "";
    const batchSize = 20; // increased default batch size; server accepts arrays
    setIsImporting(true);
    setImportProgress({ current: 0, total: parsed.length });

    // helper to POST a batch with a few retries
    async function postBatch(batch: any[], retries = 2) {
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = 'Bearer ' + token;
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const res = await fetch(API_BASE + '/api/leads', {
            method: 'POST',
            headers,
            body: JSON.stringify(batch),
          });
          if (res.ok) return { ok: true, status: res.status };
          // treat 4xx as non-retriable except 429 (rate limit)
          if (res.status >= 400 && res.status < 500 && res.status !== 429) {
            const text = await res.text().catch(() => String(res.status));
            return { ok: false, status: res.status, message: text };
          }
          // otherwise try again after a short backoff
        } catch (err) {
          // network error, will retry
        }
        // exponential backoff
        await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
      }
      return { ok: false, status: 0, message: 'network or server error' };
    }

    try {
      let failedItems: any[] = [];
      for (let i = 0; i < parsed.length; i += batchSize) {
        const batch = parsed.slice(i, i + batchSize);
        const result = await postBatch(batch, 2);
        if (!result.ok) {
          // collect failed items to fallback later
          failedItems.push(...batch);
          console.warn('Batch failed:', { index: i, status: result.status, message: result.message });
        } else {
          // update progress only for successfully uploaded items
          setImportProgress(p => ({ current: Math.min(parsed.length, p.current + batch.length), total: parsed.length }));
        }
      }

      // if there are failedItems, fallback to local append for them only
      if (failedItems.length) {
        const existingRaw = localStorage.getItem('leads_local') || '[]';
        const existing = JSON.parse(existingRaw);
        const combined = [...failedItems, ...existing];
        localStorage.setItem('leads_local', JSON.stringify(combined));
        setLeads(prev => ([...failedItems, ...prev]));
        setImportProgress({ current: parsed.length - failedItems.length, total: parsed.length });
        alert(`Imported ${parsed.length - failedItems.length} items to server. ${failedItems.length} items saved locally due to upload failures.`);
      } else {
        // all good, refresh list from server
        try { const list = await fetchLeadsWithAuth(); setLeads(list || []); } catch (er) { console.warn('Failed to refresh after import', er); }
        setImportProgress({ current: parsed.length, total: parsed.length });
        alert('Imported and saved to DB');
      }
    } catch (e) {
      console.error('Unexpected import error', e);
      alert('Import failed due to an unexpected error. Check console.');
    } finally {
      setIsImporting(false);
    }
  }

  // Delete all leads: try server endpoint DELETE /api/leads, fallback to deleting per id.
  async function deleteAllLeads() {
    if (!confirm("Delete ALL leads? This cannot be undone.")) return;
    const API_BASE =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
        ? "https://pixelatenest-crm.vercel.app"
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
        "Delete ALL leads assigned to this staff member? This cannot be undone."
      )
    )
      return;
    const API_BASE =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
        ? "https://pixelatenest-crm.vercel.app"
        : "";
    const token = localStorage.getItem("auth_token") || "";
    try {
      const allLeads = await fetchLeadsWithAuth();
      const toDelete = allLeads.filter(
        (l) => String(l.assignedTo) === String(staffId)
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
            }
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
        "Deletion of assigned leads completed (check server logs for failures)"
      );
    } catch (e) {
      console.error("deleteLeadsForStaff failed", e);
      alert(
        "Failed to delete assigned leads: " +
          (e instanceof Error ? e.message : String(e))
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
        ? "https://pixelatenest-crm.vercel.app"
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
            leads.filter((l) => String(l._id || l.id) !== String(leadId))
          );
          alert("Deleted from DB");
          return;
        }
      }
      // non-admins: mark as not deletable with a reason
      const note =
        prompt(
          "You are not allowed to permanently delete leads. Enter a short note to mark this lead as not deletable:"
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
            : l
        )
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
    newStatus: (typeof leadStatuses)[number]
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
          : x
      )
    );
    const API_BASE =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
        ? "https://pixelatenest-crm.vercel.app"
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
          Import Excel (Name, Phone, Email, Staff Assigned). Staff auto-matched
          by name.
        </p>
      </header>

      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <Button onClick={handleImport} disabled={isImporting}>
          <Upload className="mr-2" /> Import
        </Button>
      </div>

      {/* Import progress bar */}
      {(isImporting || importProgress.total > 0) && (
        <div className="mt-3 w-full max-w-2xl">
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm font-medium">Import progress</div>
            <div className="text-sm text-muted-foreground">
              {importProgress.current} of {importProgress.total}
            </div>
          </div>
          <div className="w-full h-3 bg-muted rounded overflow-hidden">
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={importProgress.total || 100}
              aria-valuenow={importProgress.current}
              className="h-3 bg-primary transition-all duration-500"
              style={{
                width:
                  importProgress.total > 0
                    ? `${Math.round(
                        (importProgress.current / importProgress.total) * 100
                      )}%`
                    : "0%",
              }}
            />
          </div>
        </div>
      )}

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
                        e.target.value as any
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
