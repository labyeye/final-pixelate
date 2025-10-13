#!/usr/bin/env node
const { MongoClient } = require('mongodb');

// Migration script to assign friendly invoice IDs like PN-00001
// Usage:
// 1) Dry run (default):
//    $env:MONGODB_URI = "<your uri>"; node .\assign-invoice-ids.js
// 2) Apply changes:
//    $env:MONGODB_URI = "<your uri>"; node .\assign-invoice-ids.js --yes
// 3) Skip invoices that already have an `id` (assign only to missing):
//    $env:MONGODB_URI = "<your uri>"; node .\assign-invoice-ids.js --yes --skip-existing

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!uri) {
  console.error('Error: MONGODB_URI environment variable is required.');
  console.error('Example (PowerShell):');
  console.error('$env:MONGODB_URI = "mongodb+srv://user:pass@cluster0/yourdb"; node .\\assign-invoice-ids.js --yes');
  process.exit(1);
}

const dbName = process.env.MONGODB_DB || (() => {
  const withoutQuery = uri.split('?')[0];
  const lastSlash = withoutQuery.lastIndexOf('/');
  if (lastSlash === -1) return undefined;
  const name = withoutQuery.substring(lastSlash + 1);
  return name || undefined;
})();

const argv = process.argv.slice(2);
const applyChanges = argv.includes('--yes') || argv.includes('-y');
const skipExisting = argv.includes('--skip-existing') || argv.includes('--skipExisting');

async function run() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName || undefined);
    const col = db.collection('invoices');

    if (skipExisting) {
      // Compute the next sequence number based on existing PN-xxxxx ids
      const existing = await col.find({ id: { $type: 'string', $regex: '^PN-\\d{5}$' } }).project({ id: 1 }).toArray();
      let max = 0;
      for (const e of existing) {
        const m = (e.id || '').match(/^PN-(\d{5})$/);
        if (m) max = Math.max(max, parseInt(m[1], 10));
      }

      let nextNum = max + 1;
      const cursor = col.find({ id: { $exists: false } }).sort({ createdAt: 1, _id: 1 });
      let wouldUpdate = 0;
      let applied = 0;
      while (await cursor.hasNext()) {
        const doc = await cursor.next();
        const newId = `PN-${String(nextNum).padStart(5, '0')}`;
        if (!applyChanges) {
          console.log(`[DRY] Would set _id=${doc._id} -> id=${newId}`);
          wouldUpdate++;
        } else {
          await col.updateOne({ _id: doc._id }, { $set: { id: newId } });
          console.log(`Updated _id=${doc._id} -> id=${newId}`);
          applied++;
        }
        nextNum++;
      }

      if (!applyChanges) {
        console.log(`Dry run complete. ${wouldUpdate} invoices would be updated. Re-run with --yes to apply.`);
      } else {
        console.log(`Done. ${applied} invoices updated.`);
      }

      return;
    }

    // Default behavior: assign sequential PN-xxxxx to every document in createdAt order
    const cursor = col.find({}).sort({ createdAt: 1, _id: 1 });
    let counter = 1;
    let wouldUpdate = 0;
    let applied = 0;
    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const newId = `PN-${String(counter).padStart(5, '0')}`;
      if (!applyChanges) {
        console.log(`[DRY] Would set _id=${doc._id} -> id=${newId}`);
        wouldUpdate++;
      } else {
        await col.updateOne({ _id: doc._id }, { $set: { id: newId } });
        console.log(`Updated _id=${doc._id} -> id=${newId}`);
        applied++;
      }
      counter++;
    }

    if (!applyChanges) {
      console.log(`Dry run complete. ${wouldUpdate} invoices would be updated. Re-run with --yes to apply.`);
    } else {
      console.log(`Done. ${applied} invoices updated.`);
    }
  } finally {
    await client.close();
  }
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
