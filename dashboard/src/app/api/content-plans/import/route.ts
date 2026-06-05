import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/services";
import * as XLSX from "xlsx";
import { requireAuth } from "@/lib/require-auth";

// Picks the first truthy value from a list of possible keys on the row object
function pick(row: Record<string, any>, ...keys: string[]): string {
  for (const k of keys) {
    const v = row[k];
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      return String(v).trim();
    }
  }
  return "";
}

// "Week 1 – Pehchaan Banao" → 1 ; also handles "1", "Week 1", "W1" etc.
function parseWeekNumber(raw: string): number {
  if (!raw) return 1;
  const m = String(raw).match(/\d+/);
  return m ? Number(m[0]) : 1;
}

// Extracts the week theme/name from "Week 1 – Pehchaan Banao" → "Pehchaan Banao"
function parseWeekTheme(raw: string): string {
  const m = String(raw).match(/[-–—]\s*(.+)$/);
  return m ? m[1].trim() : "";
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth.error) return auth.error;
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const fallbackCompany = (formData.get("company") as string) || "";
    const created_by = (formData.get("created_by") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer", cellDates: true });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // raw: true keeps original cell values so we can inspect them before stringifying
    const rows: Record<string, any>[] = XLSX.utils.sheet_to_json(sheet, {
      defval: "",
      raw: false, // format dates as strings
    });

    if (rows.length === 0) {
      return NextResponse.json({ error: "Sheet is empty" }, { status: 400 });
    }

    const col = await getCollection("content_plans");
    const now = new Date();

    const docs = rows.map((row) => {
      // ── Week ──────────────────────────────────────────────────────────────
      const weekRaw = pick(row, "Week", "week", "week_number", "Week Number");
      const week_number = parseWeekNumber(weekRaw);
      const week_theme = parseWeekTheme(weekRaw); // e.g. "Pehchaan Banao"

      // ── Day ───────────────────────────────────────────────────────────────
      const dayRaw = pick(row, "Day No.", "Day No", "Day Number", "day_number", "Day", "day");
      const day_number = dayRaw ? Number(dayRaw) : 1;

      // day_name is not a separate column in the Excel — derive from week theme if desired
      const day_name = pick(row, "day_name", "Day Name") || week_theme;

      // ── Company / Client — stored as plain text, NOT linked to any model ──
      const company =
        pick(row, "Client / Company", "Client/Company", "company", "Company", "Client", "client") ||
        fallbackCompany;

      return {
        week_number,
        week_label: weekRaw,     // store the full label e.g. "Week 1 – Pehchaan Banao"
        day_number,
        day_name,
        post_date: pick(row, "Post Date", "post_date", "Date", "date"),
        account: pick(row, "Account", "account"),
        post_type: pick(row, "Post Type", "post_type") || "Image Post",
        title: pick(row, "Title", "title"),
        subtitle: pick(row, "Subtitle", "subtitle"),
        product_image_note: pick(row, "Product Image Note", "product_image_note"),
        price_tag: pick(row, "Price Tag", "price_tag"),
        cta_button: pick(row, "CTA Button", "cta_button", "CTA"),
        emotional_touch: pick(row, "Emotional Touch", "emotional_touch"),
        // "Sound Note" is not in this Excel — keep empty unless present
        sound_note: pick(row, "Sound Note", "sound_note"),
        caption: pick(row, "Caption", "caption"),
        hashtags: pick(row, "Hashtags", "hashtags"),
        // "Reel / Ad Brief" covers both reel and ad brief columns
        reel_brief: pick(row, "Reel / Ad Brief", "Reel/Ad Brief", "reel_brief", "Reel Brief", "Ad Brief", "ad_brief"),
        ad_brief: pick(row, "Ad Brief", "ad_brief", "Reel / Ad Brief", "Reel/Ad Brief"),
        status: pick(row, "Status", "status") || "To Do",
        assigned_to: pick(row, "Assigned To", "assigned_to", "AssignedTo"),
        // Plain-text company — no foreign key to any collection
        company,
        created_by,
        created_at: now,
        updated_at: now,
      };
    });

    const result = await col.insertMany(docs);
    return NextResponse.json({ inserted: result.insertedCount });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
