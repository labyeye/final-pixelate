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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { TrendingUp, Users, Trophy, Zap } from "lucide-react";

type LeadStatus = typeof leadStatuses[number];

interface LeadStats {
  total: number;
  converted: number;
  conversionRate: number;
  newThisMonth: number;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  "not called": { bg: "bg-gray-100", text: "text-gray-700" },
  called: { bg: "bg-blue-100", text: "text-blue-700" },
  "not interested": { bg: "bg-red-100", text: "text-red-700" },
  "meeting booked": { bg: "bg-purple-100", text: "text-purple-700" },
  interested: { bg: "bg-green-100", text: "text-green-700" },
  "call back later": { bg: "bg-yellow-100", text: "text-yellow-700" },
  other: { bg: "bg-slate-100", text: "text-slate-700" },
};

export default function ClientLeadsPage() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats>({
    total: 0,
    converted: 0,
    conversionRate: 0,
    newThisMonth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sourceFilter, setSourceFilter] = useState<string>("");

  useEffect(() => {
    if (!user || user.role !== "client") return;

    const fetchLeads = async () => {
      try {
        setLoading(true);
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch("/api/leads", { headers });
        if (!res.ok) throw new Error("Failed to fetch leads");

        const data: Lead[] = await res.json();
        setLeads(Array.isArray(data) ? data : []);

        
        const total = data.length;
        const converted = data.filter((l) => l.status === "interested" || l.status === "meeting booked").length;
        const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0;

        
        const now = new Date();
        const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const newThisMonth = data.filter((l) => {
          const leadDate = l.createdAt ? new Date(l.createdAt) : null;
          return leadDate && leadDate >= currentMonth;
        }).length;

        setStats({
          total,
          converted,
          conversionRate,
          newThisMonth,
        });
      } catch (err) {
        console.error("Failed to load leads", err);
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [user]);

  
  const uniqueSources = Array.from(new Set(leads.map((l) => l.source).filter(Boolean)));
  const uniqueStatuses = Array.from(new Set(leads.map((l) => l.status).filter(Boolean)));

  
  const filteredLeads = leads.filter((lead) => {
    const matchSearch =
      !searchTerm ||
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = !statusFilter || lead.status === statusFilter;
    const matchSource = !sourceFilter || lead.source === sourceFilter;

    return matchSearch && matchStatus && matchSource;
  });

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
        <h1 className="text-4xl font-black tracking-tighter">Your Leads</h1>
        <p className="text-muted-foreground mt-1">Track the performance and status of your leads</p>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Total Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">All leads generated</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Converted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-green-600">{stats.converted}</div>
            <p className="text-xs text-muted-foreground mt-1">Interested + Meeting Booked</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-primary">{stats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Overall performance</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              New This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-blue-600">{stats.newThisMonth}</div>
            <p className="text-xs text-muted-foreground mt-1">This month's leads</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 border-black"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border-2 border-black rounded-md bg-background font-bold"
            >
              <option value="">All Statuses</option>
              {uniqueStatuses.sort().map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-2 border-2 border-black rounded-md bg-background font-bold"
            >
              <option value="">All Sources</option>
              {uniqueSources.sort().map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card className="border-2 border-black overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg">
            Leads ({filteredLeads.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-muted-foreground">
              Loading leads...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <p className="font-bold">No leads available yet</p>
              <p className="text-sm">Leads generated will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-black bg-muted/50">
                    <TableHead className="font-black">Lead Name</TableHead>
                    <TableHead className="font-black">Phone</TableHead>
                    <TableHead className="font-black">Source</TableHead>
                    <TableHead className="font-black">Interest</TableHead>
                    <TableHead className="font-black">Status</TableHead>
                    <TableHead className="font-black">Created Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={String(lead._id || lead.id)} className="border-b border-black">
                      <TableCell className="font-bold">{lead.name || "-"}</TableCell>
                      <TableCell className="text-sm">{lead.phone || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-black font-bold">
                          {lead.source || "Unknown"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {lead.projectType || lead.subject || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`font-bold border-black ${
                            statusColors[lead.status || "other"].bg
                          } ${statusColors[lead.status || "other"].text}`}
                        >
                          {lead.status || "Unknown"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {lead.createdAt
                          ? new Date(lead.createdAt).toLocaleDateString()
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-2 border-black bg-primary/5">
        <CardContent className="pt-6">
          <p className="text-sm">
            <span className="font-bold">💡 Tip:</span> This page is read-only. Your team manages all leads and their details. You can only view and track performance here. All status changes are made by your team.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
