#!/usr/bin/env node
const { MongoClient } = require("mongodb");
const biharData = require("../src/lib/bihar-cities.json");

const uri = "mongodb+srv://labhbother12:13801234@cluster0.dxbs57x.mongodb.net/";
const dbName = "crm_pixelate";

// Scope: this cleanup only touches the Kalahanu client.
const KALAHANU_CLIENT_ID = "68e6b754d5f58f82267a82ae";

const argv = process.argv.slice(2);
const applyChanges = argv.includes("--yes") || argv.includes("-y");

// Mirror the UI's getCity() helper in src/app/(crm)/client/leads/page.tsx:606
// — fall back to metaFields when lead.city is empty, scanning keys
// case-insensitively for: city, location, town, district.
const CITY_KEYS = ["city", "location", "town", "district"];

const normalize = (v) => String(v ?? "").trim().toLowerCase();
const BIHAR_SET = new Set(biharData.cities.map(normalize));
const isBihar = (v) => v != null && BIHAR_SET.has(normalize(v));

function getCity(lead) {
  if (typeof lead.city === "string" && lead.city.trim()) return lead.city;
  if (lead.metaFields && typeof lead.metaFields === "object") {
    for (const [k, v] of Object.entries(lead.metaFields)) {
      if (
        CITY_KEYS.includes(String(k).toLowerCase()) &&
        typeof v === "string" &&
        v.trim()
      ) {
        return v;
      }
    }
  }
  return "";
}

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("leads");
    console.log(`Connected. Database: ${db.databaseName}`);
    console.log(`Bihar allowlist size: ${BIHAR_SET.size}`);
    console.log(`Target clientId: ${KALAHANU_CLIENT_ID}\n`);

    const cursor = col.find(
      { clientId: KALAHANU_CLIENT_ID },
      {
        projection: {
          _id: 1,
          name: 1,
          city: 1,
          metaFields: 1,
          clientId: 1,
          createdAt: 1,
        },
      },
    );

    const toDelete = [];
    const keepCityCounts = new Map();
    const deleteCityCounts = new Map();
    let total = 0;
    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      total++;
      const resolved = getCity(doc);
      const key = resolved ? resolved.trim() : "<empty>";
      if (isBihar(resolved)) {
        keepCityCounts.set(key, (keepCityCounts.get(key) || 0) + 1);
      } else {
        deleteCityCounts.set(key, (deleteCityCounts.get(key) || 0) + 1);
        toDelete.push({ ...doc, _resolvedCity: resolved });
      }
    }

    console.log(`Total leads for this client: ${total}`);
    console.log(`Kept (city in Bihar list): ${total - toDelete.length}`);
    console.log(`To delete (non-Bihar or empty): ${toDelete.length}\n`);

    const sortDesc = (a, b) => b[1] - a[1];

    console.log("Keep — top cities matched in Bihar list:");
    for (const [name, count] of [...keepCityCounts.entries()]
      .sort(sortDesc)
      .slice(0, 20)) {
      console.log(`  ${JSON.stringify(name)}: ${count}`);
    }
    console.log("");

    console.log("Delete — top cities NOT in Bihar list:");
    for (const [name, count] of [...deleteCityCounts.entries()]
      .sort(sortDesc)
      .slice(0, 30)) {
      console.log(`  ${JSON.stringify(name)}: ${count}`);
    }
    console.log("");

    if (toDelete.length === 0) {
      console.log("Nothing to delete.");
      return;
    }

    if (!applyChanges) {
      console.log(
        `Dry run complete. ${toDelete.length} lead(s) would be deleted. Re-run with --yes to apply.`,
      );
      console.log(
        "TIP: scan the 'Delete' list above for cities that are actually in Bihar but missing from the allowlist; add them to dashboard/src/lib/bihar-cities.json before applying.",
      );
      return;
    }

    const ids = toDelete.map((m) => m._id);
    const res = await col.deleteMany({ _id: { $in: ids } });
    console.log(`Done. ${res.deletedCount} lead(s) deleted.`);
  } finally {
    await client.close();
  }
}

run().catch((err) => {
  console.error("Deletion failed:", err);
  process.exit(1);
});
