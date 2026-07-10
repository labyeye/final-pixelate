# How the CRM Dashboard Fetches NestHR Data (and how to plug in Nest Leads / Nest Sports)

This document explains exactly how the CRM dashboard pulls invoices and statistics
from the **NestHR** backend today, so the same contract can be implemented on the
**Nest Leads** and **Nest Sports** backends and wired up with zero code changes on
the dashboard side (the routes already exist and just need env vars).

---

## 1. Architecture overview

The dashboard never talks to the NestHR backend directly from the browser. It uses a
thin **server-side proxy** pattern:

```
Browser (React page)
   │  fetch("/api/nesthr-invoices")  — same-origin, sends dashboard's own JWT
   ▼
Next.js API route (server, dashboard/src/app/api/nesthr-*/route.ts)
   │  1. verifies the CALLER is logged into the dashboard (requireAuth)
   │  2. forwards the request to the external NestHR backend,
   │     authenticating with a server-only secret
   ▼
NestHR backend (https://backend.pixelatenest.com)
   │  returns JSON
   ▼
Next.js API route returns that JSON straight to the browser
```

Two layers of auth, two different tokens:

1. **Dashboard auth** — the browser sends its own JWT (`Authorization: Bearer <token>`,
   attached automatically by `apiFetch()` in `src/lib/api-fetch.ts`). The API route
   checks this with `requireAuth(request)` from `src/lib/require-auth.ts`. This has
   nothing to do with NestHR — it just confirms the CRM user is logged in.
2. **Backend-to-backend auth** — the API route calls the external NestHR service with
   a static secret in a custom header (`x-api-key` or `X-Stats-Key`). This secret lives
   only in `.env` on the server and is never exposed to the browser.

This means: the external backend only needs to trust **one static shared secret** per
endpoint family — it does not need to know about the CRM's users or JWTs at all.

---

## 2. The two endpoints NestHR exposes

### a) Invoices — `GET {NESTHR_BACKEND_URL}/api/crm/invoices`

- Auth header: `x-api-key: <NESTHR_CRM_SECRET or NESTHR_STATS_SECRET>`
- Optional query param: `?status=paid|unpaid|overdue`
- Expected response shape:

```json
{
  "invoices": [
    {
      "invoiceNumber": "INV-1001",
      "clientName": "Acme Corp",
      "clientEmail": "billing@acme.com",
      "amount": 4999,
      "currency": "INR",
      "status": "paid",
      "issuedDate": "2026-06-01T00:00:00.000Z",
      "dueDate": "2026-06-15T00:00:00.000Z",
      "subscriptionPlan": "Pro Monthly"
    }
  ]
}
```

Dashboard route: `dashboard/src/app/api/nesthr-invoices/route.ts` → rendered on
`dashboard/src/app/(crm)/nest-hr/invoices/page.tsx` (stat cards for paid/unpaid/overdue,
filterable table, CSV export).

### b) Stats — `GET {NESTHR_BACKEND_URL}/internal/stats`

- Auth header: `X-Stats-Key: <NESTHR_STATS_SECRET>`
- Expected response shape (only fields actually rendered are required, but the more
  you send, the more the page fills in — see full type in
  `dashboard/src/app/(crm)/nest-hr/subscriptions/page.tsx`):

```json
{
  "success": true,
  "generatedAt": "2026-07-10T09:00:00.000Z",
  "overview": {
    "tenants": { "total": 120, "active": 100, "trial": 15, "inactive": 5, "newLast7Days": 3, "newLast30Days": 12 },
    "subscriptions": { "total": 120, "active": 100, "trial": 15, "cancelled": 3, "pendingRenewal": 2, "expiringIn7Days": 4, "expiringIn30Days": 10, "expired": 2 },
    "revenue": {
      "totalAllTime": 5000000,
      "last30Days": 250000,
      "mrr": 200000,
      "arr": 2400000,
      "byBillingCycle": {
        "monthly": { "total": 150000, "count": 80 },
        "yearly": { "total": 100000, "count": 20 }
      }
    },
    "employees": { "total": 3400, "active": 3100, "avgPerTenant": 28, "maxInOneTenant": 210 },
    "activity": { "attendanceRecordsLast30Days": 45000, "leaveRequestsLast30Days": 900, "payrollsProcessedLast30Days": 100 },
    "planBreakdown": [{ "plan": "Pro", "billingCycle": "monthly", "count": 60 }]
  },
  "alerts": {
    "expiringIn7Days": [{ "name": "Acme Corp", "email": "a@acme.com", "plan": "Pro", "renewalDate": "2026-07-15" }],
    "expiringIn30Days": [],
    "expired": [],
    "trialsActive": [{ "name": "NewCo", "email": "b@newco.com", "trialEndDate": "2026-07-20", "activeEmployees": 5 }]
  },
  "tenants": [
    {
      "id": "t_1",
      "name": "Acme Corp",
      "email": "a@acme.com",
      "phone": "+91...",
      "industry": "Retail",
      "city": "Mumbai",
      "state": "MH",
      "status": "active",
      "lastLogin": "2026-07-09T10:00:00.000Z",
      "joinedAt": "2025-01-01T00:00:00.000Z",
      "activeEmployees": 40,
      "loginUsers": 5,
      "subscription": {
        "plan": "Pro", "billingCycle": "monthly", "status": "active", "isTrial": false,
        "trialEndDate": null, "renewalDate": "2026-08-01", "maxEmployees": 50,
        "currentEmployeeCount": 40, "amountPaid": 5000, "paymentStatus": "paid",
        "autoRenew": true, "expiringIn7Days": false, "expiringIn30Days": false, "isExpired": false
      }
    }
  ]
}
```

The dashboard page normalises missing sub-objects so it won't crash if a field is
absent — but the closer the response matches this shape, the more complete the UI.

---

## 3. Environment variables (server-side only, never sent to the browser)

```
NESTHR_BACKEND_URL="https://backend.pixelatenest.com"
NESTHR_CRM_SECRET="..."     # used by /api/crm/invoices (falls back to STATS_SECRET if unset)
NESTHR_STATS_SECRET="..."   # used by /internal/stats
```

For the two new integrations, the dashboard side is already scaffolded and just
needs these filled in:

```
NESTLEADS_BACKEND_URL=""
NESTLEADS_CRM_SECRET=""     # optional; falls back to NESTLEADS_STATS_SECRET
NESTLEADS_STATS_SECRET=""

NESTSPORTS_BACKEND_URL=""
NESTSPORTS_CRM_SECRET=""    # optional; falls back to NESTSPORTS_STATS_SECRET
NESTSPORTS_STATS_SECRET=""
```

Dashboard routes already wired to these vars:
- `dashboard/src/app/api/nestleads-invoices/route.ts` → calls `{NESTLEADS_BACKEND_URL}/api/crm/invoices`
- `dashboard/src/app/api/nestleads-stats/route.ts` → calls `{NESTLEADS_BACKEND_URL}/internal/stats`
- `dashboard/src/app/api/nestsports-invoices/route.ts` → calls `{NESTSPORTS_BACKEND_URL}/api/crm/invoices`
- `dashboard/src/app/api/nestsports-stats/route.ts` → calls `{NESTSPORTS_BACKEND_URL}/internal/stats`

Once the backend team implements the two endpoints below and you hand me the URL +
secret, I just drop the values into `.env` — no further code changes needed.

---

## 4. Prompt to hand to the Nest Leads / Nest Sports backend project

Copy everything in the box below into the other project's AI assistant (or give it to
the backend dev directly).

```
I need to expose two read-only, server-to-server endpoints from this backend so an
external CRM dashboard can pull invoice and subscription/usage statistics. This
mirrors an existing integration called "NestHR" — same contract, just different data.

Auth: static shared-secret header auth (no user sessions/JWT). Reject with 401 if the
header is missing or doesn't match an env-configured secret.

── Endpoint 1: GET /api/crm/invoices ──────────────────────────────────────
Header required: x-api-key: <CRM_SECRET>   (value comes from an env var, e.g. CRM_SECRET)
Optional query param: ?status=paid|unpaid|overdue  (filter invoices by status)
Response 200 JSON:
{
  "invoices": [
    {
      "invoiceNumber": "string",
      "clientName": "string",
      "clientEmail": "string",
      "amount": number,
      "currency": "string (e.g. INR)",
      "status": "paid" | "unpaid" | "overdue",
      "issuedDate": "ISO 8601 date string",
      "dueDate": "ISO 8601 date string",
      "subscriptionPlan": "string (optional)"
    }
  ]
}
Return an empty "invoices": [] array if there's nothing to show — never omit the key.

── Endpoint 2: GET /internal/stats ─────────────────────────────────────────
Header required: X-Stats-Key: <STATS_SECRET>  (separate env var from CRM_SECRET, can
reuse the same value if simpler)
Response 200 JSON:
{
  "success": true,
  "generatedAt": "ISO 8601 timestamp",
  "overview": {
    "tenants": { "total": number, "active": number, "trial": number, "inactive": number, "newLast7Days": number, "newLast30Days": number },
    "subscriptions": { "total": number, "active": number, "trial": number, "cancelled": number, "pendingRenewal": number, "expiringIn7Days": number, "expiringIn30Days": number, "expired": number },
    "revenue": {
      "totalAllTime": number, "last30Days": number, "mrr": number, "arr": number,
      "byBillingCycle": {
        "monthly": { "total": number, "count": number },
        "yearly": { "total": number, "count": number }
      }
    },
    "employees": { "total": number, "active": number, "avgPerTenant": number, "maxInOneTenant": number },
    "activity": { "attendanceRecordsLast30Days": number, "leaveRequestsLast30Days": number, "payrollsProcessedLast30Days": number },
    "planBreakdown": [ { "plan": "string", "billingCycle": "monthly" | "yearly", "count": number } ]
  },
  "alerts": {
    "expiringIn7Days": [ { "name": "string", "email": "string", "plan": "string", "renewalDate": "ISO date", "lastLogin": "ISO date (optional)" } ],
    "expiringIn30Days": [ /* same shape as above */ ],
    "expired": [ /* same shape as above */ ],
    "trialsActive": [ { "name": "string", "email": "string", "trialEndDate": "ISO date", "activeEmployees": number } ]
  },
  "tenants": [
    {
      "id": "string", "name": "string", "email": "string", "phone": "string",
      "industry": "string", "city": "string", "state": "string",
      "status": "active" | "trial" | "inactive",
      "lastLogin": "ISO date", "joinedAt": "ISO date",
      "activeEmployees": number, "loginUsers": number,
      "subscription": {
        "plan": "string", "billingCycle": "monthly" | "yearly", "status": "string",
        "isTrial": boolean, "trialEndDate": "ISO date or null", "renewalDate": "ISO date",
        "maxEmployees": number, "currentEmployeeCount": number, "amountPaid": number,
        "paymentStatus": "string", "autoRenew": boolean,
        "expiringIn7Days": boolean, "expiringIn30Days": boolean, "isExpired": boolean
      }
    }
  ]
}

Notes:
- If some of these concepts don't map 1:1 onto this product (e.g. no "employees" here,
  or "tenants" should really be "customers"/"accounts"/"teams"), keep the field NAMES
  exactly as specified above but populate them with whatever this domain's closest
  equivalent is (e.g. tenants.total = total leads/customers, employees.total = total
  seats/users, activity.* = whatever the 3 most relevant last-30-day activity counters
  are). The CRM dashboard renders these fields generically and doesn't care about the
  underlying domain meaning — it just needs the shape and types to match.
- All monetary values are numbers in the smallest sensible unit for display (not paise/cents) — plain rupee/dollar amounts as numbers, currency is informational only on invoices.
- Missing/inapplicable fields can be sent as 0, [], or null — just don't omit the key.
- Cache the stats response for ~60s server-side if computing it is expensive; the CRM
  dashboard itself also caches it for 60s.
- Add two env vars for the secrets, e.g. CRM_SECRET and STATS_SECRET, and document
  the base URL where these endpoints are reachable — I'll need to hand that URL and
  both secret values back to the CRM dashboard team to complete the wiring.
```

---

## 5. Once the other backend is ready

Send me:
1. The base URL (e.g. `https://backend.example.com`)
2. The two secret values (or one, if reused for both endpoints)

I'll drop them into `dashboard/.env` as `NESTLEADS_BACKEND_URL` /
`NESTLEADS_CRM_SECRET` / `NESTLEADS_STATS_SECRET` (or the `NESTSPORTS_*` equivalents)
and the existing pages will start showing live data immediately — no further code
changes required.
