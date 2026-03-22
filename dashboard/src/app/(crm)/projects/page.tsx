
'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddProjectForm from "@/components/projects/add-project-form";
import { Progress } from "@/components/ui/progress";
import type { Project } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { CheckCircle, CheckCheck, Pencil, Trash2, FolderOpen } from 'lucide-react';
import { SuccessModal } from "@/components/ui/success-modal";
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 2000);
  };
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [cRes, sRes, tRes] = await Promise.all([fetch('/api/clients'), fetch('/api/services'), fetch('/api/team-members')]);
        const [cJson, sJson, tJson] = await Promise.all([cRes.json(), sRes.json(), tRes.json()]);
        if (!mounted) return;
        const normClients = (cJson as any[] || []).map(c => ({ ...c, id: c.id ?? (c._id ? String(c._id) : String(c.id)) }));
        const normServices = (sJson as any[] || []).map(s => ({ ...s, id: s.id ?? (s._id ? String(s._id) : String(s.id)) }));
        setClients(normClients);
        setServices(normServices);
        setTeamMembers(tJson as any[] || []);
      } catch (err) {
        console.error('Failed to load project related data', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);
        const items = await res.json();
        if (mounted) setProjects(items as Project[]);
      } catch (err) {
        console.error('Failed to load projects', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const statusColor: Record<string, string> = {
    COMPLETED: "bg-green-100 text-green-800 border border-green-300",
    "IN PROGRESS": "bg-blue-100 text-blue-800 border border-blue-300",
    PENDING: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    CANCELLED: "bg-red-100 text-red-800 border border-red-300",
  };

  const getClientName = (clientId: string | any, project?: any): string => {
    // First check if project has clientName from server enrichment
    if (project?.clientName) return project.clientName;
    
    if (!clientId) return "—";
    const clientIdStr = String(clientId);
    // Search in clients array as fallback
    const found = clients.find(c => {
      const cId = String(c._id || c.id || "");
      return cId === clientIdStr;
    });
    return found?.name || "—";
  };

  return (
    <div className="space-y-8 font-headline">
      {successMessage && <SuccessModal message={successMessage} />}
      <header>
        <h1 className="text-5xl font-black tracking-tighter">PROJECTS</h1>
        <p className="text-muted-foreground text-lg">An overview of all active and completed projects.</p>
      </header>

      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle className="text-2xl font-black tracking-tighter">
            {editing ? "Edit Project" : "Add Project"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AddProjectForm
            clients={clients}
            services={services}
            teamMembers={teamMembers}
            initialValues={editing}
            editingId={editing ? (editing._id ?? editing.id) : null}
            onCreate={(p) => {
              if (editing) {
                setProjects(prev => prev.map(pr => (pr._id ?? pr.id) === (editing._id ?? editing.id) ? p : pr));
                setEditing(null);
                showSuccess("Project updated!");
              } else {
                setProjects(prev => [p, ...prev]);
                showSuccess("Project added!");
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Projects Table */}
      <div className="border-2 border-black overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black bg-primary hover:bg-black">
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3">Project</TableHead>
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3">Client</TableHead>
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3">Status</TableHead>
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3">Progress</TableHead>
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3">Amount</TableHead>
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3">Assignees</TableHead>
              <TableHead className="text-white font-black text-xs uppercase tracking-widest py-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <FolderOpen className="h-10 w-10 opacity-30" />
                    <p className="text-sm font-medium">No projects yet</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {projects.map((project, idx) => (
              <TableRow
                key={project.id ?? String(project._id)}
                className={`border-b border-black/10 last:border-b-0 transition-colors hover:bg-muted/40 ${idx % 2 === 0 ? "" : "bg-muted/20"}`}
              >
                {/* Project Name */}
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    {project.status === 'COMPLETED' && (
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                    )}
                    <div>
                      <div className="font-black text-sm">{project.title}</div>
                      {project.description && (
                        <div className="text-xs text-muted-foreground line-clamp-1 max-w-[220px]">{project.description}</div>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Client */}
                <TableCell className="text-sm py-3 font-medium">
                  {getClientName(project.client, project)}
                </TableCell>

                {/* Status */}
                <TableCell className="py-3">
                  <span className={`text-xs font-black tracking-widest px-2 py-1 ${statusColor[project.status ?? ""] ?? "bg-gray-100 text-gray-700 border border-gray-300"}`}>
                    {project.status ?? "—"}
                  </span>
                </TableCell>

                {/* Progress */}
                <TableCell className="py-3 min-w-[140px]">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span>{project.progress ?? 0}%</span>
                    </div>
                    <Progress value={project.progress ?? 0} className="h-2" />
                  </div>
                </TableCell>

                {/* Amount */}
                <TableCell className="py-3">
                  <div className="font-bold text-sm">₹{(project.amount ?? 0).toLocaleString()}</div>
                  {project.assignees && project.assignees.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      ₹{Math.floor((project.amount ?? 0) / project.assignees.length).toLocaleString()} / member
                    </div>
                  )}
                </TableCell>

                {/* Assignees */}
                <TableCell className="py-3">
                  {project.assignees && project.assignees.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {project.assignees.slice(0, 3).map((a: any, i: number) => (
                        <span key={i} className="text-xs bg-black text-white px-1.5 py-0.5 font-bold">
                          {typeof a === "string" ? a : a?.name ?? "—"}
                        </span>
                      ))}
                      {project.assignees.length > 3 && (
                        <span className="text-xs bg-muted px-1.5 py-0.5 font-bold">
                          +{project.assignees.length - 3}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">None</span>
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* Edit */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 border-2 border-black hover:bg-black hover:text-white"
                      title="Edit"
                      onClick={async () => {
                        try {
                          const res = await fetch(`/api/projects/${project._id ?? project.id}`);
                          if (!res.ok) throw new Error('Failed to fetch project');
                          const data = await res.json();
                          setEditing({ ...data, id: data._id ? String(data._id) : data.id });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } catch (err) { console.error(err); }
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>

                    {/* Mark complete */}
                    {project.status !== 'COMPLETED' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                        title="Mark as Complete"
                        onClick={async () => {
                          try {
                            const id = project._id ?? project.id;
                            const res = await fetch(`/api/projects/${id}`, {
                              method: 'PUT',
                              body: JSON.stringify({ status: 'COMPLETED' }),
                              headers: { 'Content-Type': 'application/json' }
                            });
                            if (!res.ok) throw new Error('Failed to mark complete');
                            const updated = await res.json();
                            setProjects(prev => prev.map(p => (p._id ?? p.id) === id ? updated : p));
                            showSuccess("Project completed!");
                            try {
                              const invoicesRes = await fetch('/api/invoices');
                              const invoicesData = invoicesRes.ok ? await invoicesRes.json() : [];
                              window.dispatchEvent(new CustomEvent('data:changed', { detail: { type: 'invoices', invoices: invoicesData } }));
                            } catch(e) { /* ignore */ }
                          } catch (err) { console.error(err); }
                        }}
                      >
                        <CheckCheck className="h-3.5 w-3.5" />
                      </Button>
                    )}

                    {/* Delete */}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 w-8 p-0"
                      title="Delete"
                      onClick={async () => {
                        if (!window.confirm('Delete this project?')) return;
                        try {
                          const id = project._id ?? project.id;
                          const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
                          if (!res.ok) throw new Error('Delete failed');
                          setProjects(prev => prev.filter(p => (p._id ?? p.id) !== id));
                          showSuccess("Project deleted!");
                          toast({ title: 'Project Deleted', description: 'Project has been removed successfully.' });
                        } catch (err) {
                          console.error(err);
                          toast({ title: 'Delete Failed', description: 'Could not delete project.', variant: 'destructive' });
                        }
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
