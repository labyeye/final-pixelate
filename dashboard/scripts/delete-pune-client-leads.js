#!/usr/bin/env node
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://labhbother12:13801234@cluster0.dxbs57x.mongodb.net/";
const dbName = "crm_pixelate";

const argv = process.argv.slice(2);
const applyChanges = argv.includes("--yes") || argv.includes("-y");

const CITY_KEYS = ["city", "location", "town", "district"];

const TARGET_CITIES = [
  "Aurangabad",
  "rohtak haryana",
  "Pune",
  "Ausa",
  "Navi Mumbai",
  "Chiplun",
  "Palej",
  "Etawah",

  "Odisha",
  "Nellore",
  "Ttcl",
  "Arjun",
  "यश बाबा रोड हरैया",
  "Lucknow",
  "Karandighi",
  "Malayilataninajuanagtha",
  "टुंडला",
  "Srinagar",
  "H",
  "Azamgarh",
  "Shirdi",
  "Kolkata",
  "Jaipur",
  "Hu",
  "Govind Nagar",
  "Raipur",
  "Tonk",

  "Jaipur",
  "Thane",
  "Amravati",
  "Malkapur",
  "Gunjoti",
];

const normalize = (v) =>
  String(v ?? "")
    .trim()
    .toLowerCase();
const TARGET_SET = new Set(TARGET_CITIES.map(normalize));
const isTargetCity = (v) => v != null && TARGET_SET.has(normalize(v));

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
    console.log(`Connected. Using database: ${db.databaseName}`);
    console.log(
      `Total documents in leads collection: ${await col.estimatedDocumentCount()}\n`,
    );

    const cursor = col.find(
      { clientId: { $exists: true } },
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

    const matches = [];
    const cityCounts = new Map();
    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const resolved = getCity(doc) || (doc.city ?? "");
      const key = resolved ? resolved.trim() : "<empty>";
      cityCounts.set(key, (cityCounts.get(key) || 0) + 1);
      if (isTargetCity(resolved))
        matches.push({ ...doc, _resolvedCity: resolved });
    }

    const topCities = [...cityCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
    console.log(
      "Top 20 resolved cities (lead.city || metaFields[city|location|town|district]) — client-owned leads:",
    );
    for (const [name, count] of topCities) {
      console.log(`  ${JSON.stringify(name)}: ${count}`);
    }
    console.log("");

    if (matches.length === 0) {
      console.log(
        `No client leads found with city in [${TARGET_CITIES.join(", ")}]. Nothing to do.`,
      );
      return;
    }

    console.log(
      `Found ${matches.length} client lead(s) with city in [${TARGET_CITIES.join(", ")}]:`,
    );
    for (const doc of matches) {
      console.log(
        `  _id=${doc._id} clientId=${doc.clientId} name=${doc.name || "(no name)"} city=${JSON.stringify(doc._resolvedCity)} createdAt=${doc.createdAt || "(none)"}`,
      );
    }

    if (!applyChanges) {
      console.log(
        `\nDry run complete. ${matches.length} lead(s) would be deleted. Re-run with --yes to apply.`,
      );
      return;
    }

    const ids = matches.map((m) => m._id);
    const res = await col.deleteMany({ _id: { $in: ids } });
    console.log(`\nDone. ${res.deletedCount} lead(s) deleted.`);
  } finally {
    await client.close();
  }
}

run().catch((err) => {
  console.error("Deletion failed:", err);
  process.exit(1);
});
