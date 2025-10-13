Invoice ID migration

This project includes a small migration script to assign friendly `PN-00001` style IDs to existing invoices in the `invoices` collection.

Usage

1. Set your MongoDB connection string in the environment:

For PowerShell:

```powershell
$env:MONGODB_URI = "your_mongodb_uri_here"
```

2. Dry-run (by default the script prints what it will do and exits):

```powershell
node scripts/assign-invoice-ids.js
```

3. To actually run and update documents (overwrite/assign the `id` field on all invoices):

```powershell
node scripts/assign-invoice-ids.js --yes
```

Or via npm script:

```powershell
$env:MONGODB_URI = "your_mongodb_uri_here"; npm run assign-invoice-ids --yes
```

Caveats

- The script overwrites the `id` field for every invoice in ascending `createdAt` order. Existing `id` values will be replaced.
- There's a potential race condition if invoices are being written concurrently while the script runs. Stop the app or perform the migration during a maintenance window for safety.
