#!/usr/bin/env node
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://labhbother12:13801234@cluster0.dxbs57x.mongodb.net/";
const dbName = "crm_pixelate";

const SEARCH_TERMS = ["kalahanu", "automobile"];
const TOP_N = 30;

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("leads");
    console.log(`Connected. Database: ${db.databaseName}`);
    console.log(
      `Total documents in leads collection: ${await col.estimatedDocumentCount()}`,
    );

    const clientOwnedTotal = await col.countDocuments({
      clientId: { $exists: true },
    });
    console.log(`Client-owned leads (clientId exists): ${clientOwnedTotal}\n`);

    const campaignPopulated = await col.countDocuments({
      clientId: { $exists: true },
      campaignName: { $exists: true, $ne: "" },
    });
    console.log(
      `Client-owned leads with non-empty campaignName: ${campaignPopulated} / ${clientOwnedTotal}`,
    );
    const formPopulated = await col.countDocuments({
      clientId: { $exists: true },
      formName: { $exists: true, $ne: "" },
    });
    console.log(
      `Client-owned leads with non-empty formName: ${formPopulated} / ${clientOwnedTotal}`,
    );
    const pagePopulated = await col.countDocuments({
      clientId: { $exists: true },
      pageName: { $exists: true, $ne: "" },
    });
    console.log(
      `Client-owned leads with non-empty pageName: ${pagePopulated} / ${clientOwnedTotal}\n`,
    );

    async function topValues(label, field) {
      const rows = await col
        .aggregate([
          { $match: { clientId: { $exists: true } } },
          { $group: { _id: `$${field}`, count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: TOP_N },
        ])
        .toArray();
      console.log(`Top ${TOP_N} ${label} values:`);
      for (const r of rows) {
        const v =
          r._id === null || r._id === undefined
            ? `<${r._id === null ? "null" : "missing"}>`
            : JSON.stringify(r._id);
        console.log(`  ${v}: ${r.count}`);
      }
      console.log("");
    }

    await topValues("campaignName", "campaignName");
    await topValues("formName", "formName");
    await topValues("adName", "adName");
    await topValues("pageName", "pageName");

    const orClauses = [];
    for (const term of SEARCH_TERMS) {
      const re = { $regex: term, $options: "i" };
      orClauses.push(
        { campaignName: re },
        { formName: re },
        { adName: re },
        { pageName: re },
        { source: re },
      );
    }
    const hits = await col
      .find({ clientId: { $exists: true }, $or: orClauses })
      .project({
        _id: 1,
        clientId: 1,
        name: 1,
        campaignName: 1,
        formName: 1,
        adName: 1,
        pageName: 1,
        source: 1,
        createdAt: 1,
      })
      .toArray();

    console.log(
      `\nLeads matching any of [${SEARCH_TERMS.join(", ")}] in campaignName/formName/adName/pageName/source: ${hits.length}\n`,
    );
    const byClient = new Map();
    for (const h of hits) {
      const key = String(h.clientId);
      byClient.set(key, (byClient.get(key) || 0) + 1);
    }
    console.log("Match counts by clientId:");
    for (const [cid, count] of [...byClient.entries()].sort(
      (a, b) => b[1] - a[1],
    )) {
      console.log(`  ${cid}: ${count}`);
    }

    if (hits.length > 0) {
      console.log("\nSample matches (up to 10):");
      for (const h of hits.slice(0, 10)) {
        console.log(
          `  _id=${h._id} clientId=${h.clientId} name=${h.name || "(no name)"}`,
        );
        console.log(
          `    campaignName=${JSON.stringify(h.campaignName)} formName=${JSON.stringify(h.formName)}`,
        );
        console.log(
          `    adName=${JSON.stringify(h.adName)} pageName=${JSON.stringify(h.pageName)} source=${JSON.stringify(h.source)}`,
        );
      }
    }
  } finally {
    await client.close();
  }
}

run().catch((err) => {
  console.error("Diagnostic failed:", err);
  process.exit(1);
});
