# Enterprise CRM Gap Analysis & Roadmap ($100M Standard)

## Executive Summary
This document provides a comprehensive analysis of the current "Pixelate CRM" architecture and data models. It benchmarks the existing implementation against a professional, enterprise-grade SaaS platform suitable for a $100 Million company. 

Currently, the CRM provides a solid foundation with essential modules (Leads, Clients, Projects, Invoices, Quotations, Inventory). However, to transition to an enterprise standard, it requires fundamental shifts in **data integrity**, **schema validation**, **security**, and **relational mapping**.

---

## 1. Architectural & Infrastructure Gaps

### A. Strict Schema Validation (Critical)
**Current:** API endpoints natively insert raw request bodies into MongoDB without validation (e.g., `await col.insertOne({ ...body })`).
**Required:** Implement **Zod** or **Mongoose**. A $100M company cannot risk corrupted state. Every API edge must validate `typeof`, `length`, `required`, and sanitize inputs against NoSQL injections.

### B. Relational Integrity & Cascades
**Current:** Relationships are handled via string IDs (e.g., `clientId` as string on Projects). Soft deletes don't cascade.
**Required:** When a client is deleted, associated projects, tasks, and invoices should gracefully handle the orphaned state (e.g., block the deletion, or mark dependencies as archived).

### C. Advanced Role-Based Access Control (RBAC)
**Current:** Roles are hardcoded (`admin`, `staff`, `client`).
**Required:** Permission sets. A $100M company requires granular permissions: e.g., `can_view_financials`, `can_delete_leads`, `can_assign_projects`.

### D. Audit Logging & System Versioning
**Current:** Custom `user_activity` logger and `journey_events`.
**Required:** System-level Change Data Capture (CDC). Every update to an invoice or quotation needs a strict revision history (V1, V2) to prevent tampering.

---

## 2. Model & Field Level Enhancements

Below is a breakdown of existing models and the exact **missing fields** required to match an enterprise level.

### 👥 Leads Model
*The lifeblood of future revenue.*
- **Lead Score:** `Number` (0-100 logic based on engagements to prioritize sales).
- **UTM Parameters:** `Object` (`utm_source`, `utm_medium`, `utm_campaign`) for marketing attribution.
- **Expected Close Date:** `Date` (For forecasting sales pipeline).
- **Probability:** `Number` (Percentage chance of closing).
- **Next Follow-up Date:** `Date` (To trigger dashboard alerts).
- **Lost Reason:** `String` (Enum: Price, Competitor, Unresponsive - for analytics).
- **Timezone Option:** `String` (To schedule calls accurately).

### 🏢 Clients / Accounts Model
*Enterprise Account Management.*
- **Status:** `Enum` (Active, Dormant, Churned, At-Risk).
- **Contacts Array:** `Array` (Instead of a single email/phone, an enterprise client has Billing Contact, Tech Lead, Decision Maker).
- **Company Size & Industry:** `String/Enum` (For segmentation).
- **Billing vs. Shipping Address:** `Object` (Tax regulations require distinct addresses).
- **Total Customer Value (LTV):** `Number` (Cached field tracking lifetime spend).
- **Account Manager ID:** `ObjectId` (Who owns the relationship).

### 📊 Projects Model
*Delivery and Execution.*
- **Financial Health:** `Enum` (Under Budget, At Risk, Over Budget).
- **Project Phases:** `Array` (Not just a global status, but granular sprint/milestone tracking).
- **Start Date vs Target Date:** `Date` (Currently only `dueDate` exists. Need to track slippage).
- **Estimated vs Actual Hours:** `Number` (Crucial for calculating profitability per project).
- **Tags/Categorization:** `Array of Strings` (For portfolio filtering).
- **Created By:** `ObjectId` (Audit trail for who initiated the project).

### 💰 Invoices & Financials Model
*Strict Accounting Standards.*
- **Currency Code:** `String` (e.g., INR, USD - multi-currency is essential).
- **Line-item level Tax:** `Array` (Some services have 18% GST, others 0%. Global tax is insufficient).
- **Partial Payments Array:** `Array` (Tracking milestones payments: Advance, Mid, Final).
- **Payment Gateway Intent ID:** `String` (Stripe/Razorpay transaction linkage).
- **Due Date Penalties:** `Object` (Calculated late fees).
- **Notes & Terms Array:** `Array of Strings` (Legal protection per client).

### 📄 Quotations Model
*Sales proposals.*
- **Expiration Date:** `Date` (Creates urgency, protects against price changes).
- **Revision Number:** `Number` (Tracking negotiation steps).
- **Digital Signature Details:** `Object` (IP Address, Timestamp, Signed By).
- **PDF Artifact URL:** `String` (Immutable snapshot of what was sent to block post-send edits).

### 🛠 Inventory Model
*Supply chain mapping.*
- **SKU (Stock Keeping Unit):** `String` (Unique barcode/identifier for scanning).
- **Reorder Level / Threshold:** `Number` (Triggers low-stock alerts).
- **Bin / Warehouse Location:** `String`.
- **Last Restocked Date:** `Date`.
- **Vendor Payment Terms:** `String`.

### 👨‍💻 Users & Team Members
*HR and Security.*
- **MFA (Multi-Factor Auth):** `Boolean` (Critical for financials and enterprise data).
- **Last Login IP / Time:** `String/Date` (Security auditing).
- **Hourly Cost Rate:** `Number` (To calculate internal project costs vs client billings).
- **Status:** `Enum` (Active, Suspended, Resigned, On Leave).

---

## 3. High-Level Features Left to Implement

To command a $100M valuation or operate at that scale, implement the following workflows:

1. **Workflow Automations (Engine):** E.g., "If Lead status changes to 'Interested' -> Send automated welcome email -> Create introductory Task for assignee."
2. **Two-way Email & Calendar Integration:** Syncing Office 365 or Google Workspace so replies from clients log directly into the CRM interface, and bookings hit the calendar automatically.
3. **Advanced Financial Analytics:** MRR (Monthly Recurring Revenue), CAC (Customer Acquisition Cost), Churn rate, and Cash Flow Projections based on 'Expected Close Dates' from Leads.
4. **Data Encryption at Rest:** Fields like PAN, Aadhar, and precise financials must use field-level encryption (FLE) in MongoDB to meet enterprise compliance (SOC2 / ISO 27001).
5. **Customer Support SLAs:** Tracking time-to-first-response and issue resolution times inside Support Tickets. Automatic escalation if SLA is breached.
6. **Webhooks & Developer API:** Allow clients to integrate your CRM into their ERPs or internal Zapier flows.
7. **Client Portal 2.0:** A self-service portal where clients can view live project progress, securely pay invoices, and approve NDA / Quotations with E-signatures.

## Conclusion
The current schema effectively serves as an MVP/SMB CRM but is largely **implicit**. Moving to an enterprise standard requires making these implicit models **explicit**, strictly validated, and deeply interconnected while tracking user intent and granular financial health.
