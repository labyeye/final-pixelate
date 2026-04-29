---
name: CRM Leads & Clients Zoho-like overhaul
description: Major CRM feature implementation - leads and clients pages rebuilt to Zoho CRM standard
type: project
---

Completed a full Zoho CRM-parity overhaul of the Leads and Clients pages.

**Why:** User wanted feature-parity with Zoho CRM for the leads and clients management section.

**What was built:**
- Lead Detail Page at `/leads/[id]` — full profile, inline edit, activity timeline with note/call/email/meeting logging, quick pipeline stage switcher, convert-to-client flow
- Lead Activity API at `/api/leads/[id]/activity` — stores activities in `lead_activities` MongoDB collection
- Leads page fully rewritten — Kanban view (toggle with table), analytics strip (6 KPIs), source breakdown bar chart, pipeline funnel, advanced filters (staff/status/source/priority), global search, bulk actions toolbar (change status, assign, delete), CSV export, follow-up date with overdue indicator
- Client Detail Page at `/clients/[id]` — tabs for Projects/Invoices/Leads, revenue summary cards (invoiced/paid/outstanding), CRM info (status/industry/tags/notes), GST details
- Clients page rewritten — status stats strip (active/prospect/inactive/churned), search, filter by status/tag, CSV export, clickable rows to detail page

**Data model additions (data.ts):**
- Lead: priority, followUpDate, tags, score, convertedToClientId, city, notes
- Lead: new status "converted" added
- Client: status, tags, industry, notes, convertedFromLeadId, createdAt
- New `LeadActivity` interface

**Constants added (constants.ts):**
- leadStatusColors, priorityColors, clientStatuses, clientStatusColors

**How to apply:** When working on leads/clients, reference these files as the source of truth. New fields exist in DB via PATCH/PUT endpoints automatically.
