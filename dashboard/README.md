# PixelateNest Dashboard — Security & Improvement Plan

> Current revenue: ₹2.5L → Target: ₹10L  
> This document is a full technical audit of the dashboard with a prioritized action plan.

---

## Executive Summary

The dashboard has genuine, impressive infrastructure — 107 API routes, 60+ pages, WhatsApp automation, invoicing, client portal, social media planner, CRM, and ERP. But it has critical security holes that could wipe the business before the ₹10L goal is reached. Fix the security layer first, then build for growth.

---

## CRITICAL — Fix This Week

These are active security breaches, not future risks.

### 1. 91 of 107 API Routes Have Zero Authentication

The entire financial backend is publicly accessible right now with no login required.

| Route | What's Exposed |
|---|---|
| `POST /api/users` | Anyone can create an admin account right now |
| `GET /api/invoices` | All invoice data readable by anyone |
| `POST /api/payments` | Anyone can mark invoices as PAID |
| `GET /api/expenses` | All business expense data exposed |
| `GET /api/clients` | Full client database leaked |
| `GET /api/quotations` | Entire pricing strategy exposed |
| `GET /api/reports` | Full financial reports, no auth |
| `GET /api/settings` | System settings readable and modifiable |
| `GET /api/tasks` | Internal task data exposed |
| `GET /api/team-members` | Staff data exposed |

Only 16 routes check for a valid token. ~85% of the backend is open internet.

### 2. JWT Secret Is Missing From .env

`src/lib/auth.ts` line 3:
```ts
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
```

The `.env` file has **no `JWT_SECRET` set**. The app is signing tokens with the literal string `"dev-secret-change-me"`. Anyone who reads the source code can forge a valid admin JWT and log in as any user.

**Fix:** Generate a strong secret and add it to `.env`:
```bash
openssl rand -base64 64
# Add JWT_SECRET=<result> to .env
```

### 3. Login Has No Rate Limiting

`/api/auth/login` has no lockout or throttle. Brute-force attacks can run unchecked.

### 4. Debug Logs With Financial Data in Production

`src/app/api/payments/route.ts` logs invoice IDs and payment amounts to the server console on every transaction:
```ts
console.log("PAYMENT_DEBUG: Incoming request", { invoiceId, amount });
console.log("PAYMENT_DEBUG: Success", { invoiceId, newStatus, newPaid });
```
These go to the hosting provider's log infrastructure.

---

## HIGH Priority — Fix Before Scaling

### 5. No Centralized Auth Middleware

Auth logic is copy-pasted across 16 routes. One helper `src/lib/require-auth.ts` should handle token extraction and verification for all routes. Currently a fix to auth logic must be applied in 16 different places.

### 6. TypeScript `any` Everywhere

The `User` model, all API handlers, and most service functions use `any`. TypeScript provides zero protection — a typo in a field name silently fails instead of erroring at compile time.

### 7. No Input Validation on Request Bodies

No Zod schemas on incoming POST/PATCH data. Someone can send `{ "amount": -999999 }` and corrupt invoice totals. All financial endpoints need validated schemas.

### 8. CORS `*` on Financial APIs

`src/app/api/leads/route.ts` sets `Access-Control-Allow-Origin: *`. Any website in the world can call your leads API from a browser if they obtain a token.

---

## MEDIUM Priority — Systematic Improvements

### 9. No Error Monitoring

No Sentry or equivalent. When invoice generation breaks at 11pm before a client deadline, you find out from the client, not from an alert.

### 10. No Database Indexes

As data grows past a few hundred records, queries will slow. These collections need indexes:

| Collection | Index Fields |
|---|---|
| `leads` | `clientId`, `createdAt`, `status` |
| `invoices` | `clientId`, `status`, `createdAt` |
| `payments` | `invoiceId` |
| `expenses` | `date`, `category` |

### 11. Inconsistent `_id` Handling

`src/lib/services.ts` has a runtime check for whether an ID is a valid ObjectId hex string — a defensive workaround for mixed `ObjectId`/string `_id` formats in the database. The data has inconsistent ID types that need cleanup.

### 12. Hard-Delete Bypasses Trash System

Individual DELETE routes hard-delete records directly, bypassing the trash system. Soft-delete must be enforced consistently.

---

## Phase 1 Action Plan — This Week (Security)

- [ ] Add `JWT_SECRET` to `.env` — generate a strong 64-char random string
- [ ] Create `src/lib/require-auth.ts` — single helper for token extraction and verification
- [ ] Protect all 91 unprotected routes — wrap every financial, user, and client route
- [ ] Add `CRON_SECRET` env var — protect the cron endpoint
- [ ] Remove all `PAYMENT_DEBUG` console.logs from payments route

## Phase 2 Action Plan — Next 2 Weeks (Systematic)

- [ ] Add Zod schemas for every POST/PATCH body — invoices, payments, clients, leads
- [ ] Add rate limiting on `/api/auth/login` — 5 attempts per 15 minutes
- [ ] Add MongoDB indexes on all financial collections
- [ ] Fix TypeScript — replace `any` in models with real typed interfaces

## Phase 3 Action Plan — Next Month (Growth-Ready)

- [ ] Add Sentry error monitoring
- [ ] Add structured request logging with audit trail
- [ ] Add startup validation — crash on boot if required env vars are missing
- [ ] Standardize API response shape — `{ data, error, meta }` across all routes
- [ ] Add MongoDB connection pool health check

---

## Revenue-Driving Features to Build Next

These directly accelerate the path from ₹2.5L to ₹10L:

| Feature | Impact |
|---|---|
| **Client Self-Service Portal** (partially built — finish it) | Clients approve quotations and view invoices without calling. Saves 2–3 hrs/week per client. |
| **Automated Payment Reminders via WhatsApp** | WhatsApp infra already exists. Auto-send "Invoice #123 due in 3 days" — reduces follow-up time. |
| **Lead Pipeline Analytics** | Conversion rate from lead to client, average deal size. Can't grow what you don't measure. |
| **Automated Onboarding Flow** | When a quotation is accepted, auto-create project, tasks, and onboarding checklist. |

---

## The Single Most Important Action Right Now

Add `JWT_SECRET=<64-char-random>` to your `.env` and protect the payments, invoices, and users API routes. Everything else can wait — these cannot.
