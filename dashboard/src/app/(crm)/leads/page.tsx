'use client';

import { useEffect, useState } from 'react';
import type { Lead } from '@/lib/data';
import { leadStatuses } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash, Upload } from 'lucide-react';


export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/leads');
        const items = await res.json();
        if (mounted) setLeads(items as Lead[]);
        // load team members for name matching
        const t = await fetch('/api/team-members');
        const tm = await t.json();
        if (mounted) setTeam(tm || []);
      } catch (err) {
        console.error('Failed to load leads/team', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // parse uploaded XLSX/CSV and map into lead objects
  async function handleImport() {
    if (!file) return alert('Choose an Excel file first');
    // load xlsx dynamically (dev dependency may not be installed)
    const XLSX = await import('xlsx');
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: 'array' });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' }) as any[];
    // Expect columns: Name, Phone, Email, Staff Assigned
    function levenshtein(a: string, b: string) {
      if (a === b) return 0
      const al = a.length, bl = b.length
      if (al === 0) return bl
      if (bl === 0) return al
      const matrix = Array.from({ length: al + 1 }, () => new Array(bl + 1).fill(0))
      for (let i = 0; i <= al; i++) matrix[i][0] = i
      for (let j = 0; j <= bl; j++) matrix[0][j] = j
      for (let i = 1; i <= al; i++) {
        for (let j = 1; j <= bl; j++) {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1
          matrix[i][j] = Math.min(matrix[i-1][j] + 1, matrix[i][j-1] + 1, matrix[i-1][j-1] + cost)
        }
      }
      return matrix[al][bl]
    }

    const parsed = rows.map(r => {
      const staffName = (r['Staff Assigned'] || r['Staff'] || r.staff || '').toString().trim();
      let matched = null
      if (staffName) {
        // exact match
        matched = team.find(t => t.name && String(t.name).toLowerCase() === staffName.toLowerCase())
        // contains
        if (!matched) matched = team.find(t => t.name && String(t.name).toLowerCase().includes(staffName.toLowerCase()))
        // fuzzy
        if (!matched) {
          let best: any = null; let bestScore = Infinity
          for (const t of team) {
            if (!t.name) continue
            const score = levenshtein(String(t.name).toLowerCase(), staffName.toLowerCase())
            if (score < bestScore) { bestScore = score; best = t }
          }
          // accept fuzzy match only when reasonably close (edit distance < 4)
          if (best && bestScore < 4) matched = best
        }
      }
      return {
        name: r['Name'] || r['Full Name'] || r.name || '',
        phone: r['Phone'] || r.Phone || r.phone || '',
        email: r['Email'] || r.email || '',
        assignedTo: matched ? matched._id || matched.id : null,
        assignedToName: matched ? matched.name : staffName || null,
        status: leadStatuses[0],
        project: r['Project'] || r.project || '',
        value: r['Value'] || r.value || 0,
        createdAt: new Date().toISOString(),
      };
    });

    // POST bulk to server
    try {
      const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:9002' : '';
      const token = localStorage.getItem('auth_token') || ''
      const res = await fetch(API_BASE + '/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
        body: JSON.stringify(parsed),
      });
      if (res.ok) {
        // refresh list
        const list = await (await fetch('/api/leads')).json();
        setLeads(list || []);
        alert('Imported and saved to DB')
        return;
      }
    } catch (e) {
      console.error('Bulk upload failed, falling back to local append', e);
    }

    // fallback: append locally and persist via localStorage for now
    const existingRaw = localStorage.getItem('leads_local') || '[]';
    const existing = JSON.parse(existingRaw);
    const combined = [...parsed, ...existing];
    localStorage.setItem('leads_local', JSON.stringify(combined));
    setLeads(combined as Lead[]);
    alert('Imported locally (server unreachable).')
  }

  async function deleteLead(leadId: string | number | undefined) {
    if (!leadId) return;
    const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:9002' : '';
    try {
      const token = localStorage.getItem('auth_token') || ''
      const res = await fetch(API_BASE + '/api/leads/' + String(leadId), { method: 'DELETE', headers: token ? { Authorization: 'Bearer ' + token } : {} });
      if (res.ok) {
        setLeads(leads.filter(l => String(l._id || l.id) !== String(leadId)));
        alert('Deleted from DB')
        return;
      }
    } catch (e) {
      console.error('Delete failed', e);
    }
    // fallback local-only deletion
    setLeads(leads.filter(l => String(l._id || l.id) !== String(leadId)));
    alert('Deleted locally (server may be unreachable)')
  }

  async function updateLeadStatus(leadId: string | number | undefined, newStatus: (typeof leadStatuses)[number]) {
    if (!leadId) return;
    // optimistic UI update
    setLeads(l => l.map(x => (String(x._id || x.id) === String(leadId) ? { ...x, status: newStatus } : x)));
    const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:9002' : '';
    const token = localStorage.getItem('auth_token') || ''
    try {
      const res = await fetch(API_BASE + '/api/leads/' + String(leadId), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        // revert UI on failure
        const list = await (await fetch('/api/leads')).json();
        setLeads(list || []);
        alert('Failed to update status on server')
      }
    } catch (e) {
      console.error('Status update failed', e);
      // on network error, revert to server state
      try { const list = await (await fetch('/api/leads')).json(); setLeads(list || []); } catch (er) {}
      alert('Network error while updating status')
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Leads (Table)</h1>
        <p className="text-sm text-muted-foreground">Import Excel (Name, Phone, Email, Staff Assigned). Staff auto-matched by name.</p>
      </header>

      <div className="flex items-center gap-4">
        <input type="file" accept=".xlsx,.xls,.csv" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
        <Button onClick={handleImport}><Upload className="mr-2" /> Import</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Assigned</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map(lead => (
            <TableRow key={String(lead._id || lead.id)}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.assignedToName || lead.assignedTo || '-'}</TableCell>
              <TableCell>
                <select value={lead.status || leadStatuses[0]} onChange={(e) => updateLeadStatus(lead._id || lead.id, e.target.value as any)} className="px-2 py-1 rounded-md bg-background border">
                  {leadStatuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </TableCell>
              <TableCell>
                <Button variant="destructive" size="sm" onClick={() => deleteLead(lead._id || lead.id)}><Trash /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
