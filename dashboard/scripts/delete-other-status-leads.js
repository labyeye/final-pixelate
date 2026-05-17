#!/usr/bin/env node
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://labhbother12:13801234@cluster0.dxbs57x.mongodb.net/"
if (!uri) {
  console.error("Error: MONGODB_URI environment variable is required.");
  console.error("Example (PowerShell):");
  console.error(
    '$env:MONGODB_URI = "mongodb+srv://user:pass@cluster0/yourdb"; node .\\delete-other-status-leads.js --yes',
  );
  process.exit(1);
}

// Mirror dashboard/src/lib/mongodb.ts: prefer MONGODB_DB, then the db name
// embedded in the URI, then fall back to "admin" (NOT the driver default
// "test") so this script targets the same database the app uses.
const dbName ="crm_pixelate";

const argv = process.argv.slice(2);
const applyChanges = argv.includes("--yes") || argv.includes("-y");

// Mirror the client leads page rendering: the "Other" badge appears for
// any truthy status value that is NOT one of the recognized non-other
// statuses (STATUS_CONFIG fallback in src/app/(crm)/client/leads/page.tsx).
// So we delete client-owned leads whose status is a truthy string outside
// the known set — this captures literal "other", "Other", and any
// unrecognized values that render as Other in the UI.
const NON_OTHER_STATUSES = [
  "not called",
  "called",
  "interested",
  "meeting booked",
  "not interested",
  "call back later",
];

const filter = {
  clientId: { $exists: true },
  status: { $type: "string", $ne: "", $nin: NON_OTHER_STATUSES },
};

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName || undefined);
    const col = db.collection("leads");

    // Diagnostic: show all distinct status values for both client-owned
    // and admin-pool leads. Helps locate where "Other" leads actually live.
    async function printBreakdown(label, matchStage) {
      const rows = await col
        .aggregate([
          { $match: matchStage },
          { $group: { _id: "$status", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ])
        .toArray();
      const total = rows.reduce((s, r) => s + r.count, 0);
      console.log(`Status breakdown — ${label} (total ${total}):`);
      if (rows.length === 0) {
        console.log("  (none)");
      } else {
        for (const row of rows) {
          const display =
            row._id === null || row._id === undefined
              ? `<${row._id === null ? "null" : "missing"}>`
              : JSON.stringify(row._id);
          console.log(`  ${display}: ${row.count}`);
        }
      }
      console.log("");
    }
    await printBreakdown("client-owned (clientId exists)", {
      clientId: { $exists: true },
    });
    await printBreakdown("admin-pool (no clientId)", {
      clientId: { $exists: false },
    });

    const matches = await col
      .find(filter)
      .project({ _id: 1, name: 1, status: 1, clientId: 1, createdAt: 1 })
      .toArray();

    if (matches.length === 0) {
      console.log("No client leads with status 'other' found. Nothing to do.");
      return;
    }

    console.log(`Found ${matches.length} client lead(s) with status 'other':`);
    for (const doc of matches) {
      console.log(
        `  _id=${doc._id} clientId=${doc.clientId} name=${doc.name || "(no name)"} status=${doc.status} createdAt=${doc.createdAt || "(none)"}`,
      );
    }

    if (!applyChanges) {
      console.log(
        `\nDry run complete. ${matches.length} lead(s) would be deleted. Re-run with --yes to apply.`,
      );
      return;
    }

    const res = await col.deleteMany(filter);
    console.log(`\nDone. ${res.deletedCount} lead(s) deleted.`);
  } finally {
    await client.close();
  }
}

run().catch((err) => {
  console.error("Deletion failed:", err);
  process.exit(1);
});
