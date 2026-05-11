import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const COLLECTION = "whatsapp_templates";

function toObjectId(id: string) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

// Build the Meta API components array from our template document
function buildComponents(template: any): any[] {
  const components: any[] = [];

  // ── HEADER ────────────────────────────────────────────────────────────────
  if (template.headerType && template.headerType !== "NONE") {
    if (template.headerType === "TEXT" && template.headerText) {
      const hasVar = /{{[^}]+}}/.test(template.headerText);
      const comp: any = {
        type: "HEADER",
        format: "TEXT",
        text: template.headerText,
      };
      if (hasVar) {
        comp.example = {
          header_text: [template.headerExamples?.[0] ?? "Sample Header"],
        };
      }
      components.push(comp);
    } else {
      // IMAGE / DOCUMENT / VIDEO — use the uploaded Meta media handle if available
      if (template.headerMediaHandle) {
        components.push({
          type: "HEADER",
          format: template.headerType,
          example: { header_handle: [template.headerMediaHandle] },
        });
      } else {
        // No handle uploaded yet — submit without example (Meta may accept this for DOCUMENT)
        components.push({ type: "HEADER", format: template.headerType });
      }
    }
  }

  // ── BODY ──────────────────────────────────────────────────────────────────
  if (template.body) {
    // Trim trailing whitespace from each line and strip leading/trailing blank lines
    const cleanBody = (template.body as string)
      .split("\n")
      .map((line: string) => line.trimEnd())
      .join("\n")
      .trim();
    const bodyComp: any = { type: "BODY", text: cleanBody };
    // Detect {{n}} variables and attach example values
    // Sort {{1}}, {{2}}, … in numeric order so examples align correctly
    const rawMatches = template.body.match(/\{\{(\d+)\}\}/g) ?? [];
    const varNums: number[] = [
      ...new Set<number>(
        rawMatches.map((m: string) => parseInt(m.replace(/[{}]/g, ""))),
      ),
    ].sort((a, b) => a - b);
    if (varNums.length > 0) {
      const examples: string[] = varNums.map((n) => {
        const i = n - 1; // {{1}} → index 0
        const val = template.exampleValues?.[i] ?? template.variables?.[i];
        return val && String(val).trim() ? String(val).trim() : `sample_${n}`;
      });
      bodyComp.example = { body_text: [examples] };
    }
    components.push(bodyComp);
  }

  // ── FOOTER ────────────────────────────────────────────────────────────────
  if (template.footer) {
    components.push({ type: "FOOTER", text: template.footer });
  }

  // ── BUTTONS ───────────────────────────────────────────────────────────────
  if (Array.isArray(template.buttons) && template.buttons.length > 0) {
    const buttons = template.buttons.map((btn: any) => {
      if (btn.type === "QUICK_REPLY")
        return { type: "QUICK_REPLY", text: btn.text };
      if (btn.type === "URL")
        return {
          type: "URL",
          text: btn.text,
          url: btn.url ?? "https://pixelatenest.com",
        };
      if (btn.type === "PHONE_NUMBER")
        return {
          type: "PHONE_NUMBER",
          text: btn.text,
          phone_number: btn.phone ?? "+919999999999",
        };
      return { type: btn.type, text: btn.text };
    });
    components.push({ type: "BUTTONS", buttons });
  }

  return components;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // Accept optional name override in body — more reliable than ObjectId URL param
  let nameOverride: string | undefined;
  try {
    const body = await req.json().catch(() => ({}));
    nameOverride = body?.name;
  } catch {
    // body is optional
  }

  const oid = toObjectId(id);

  const accessToken = process.env.META_ACCESS_TOKEN;
  const wabaId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v21.0";

  const missing: string[] = [];
  if (!accessToken) missing.push("META_ACCESS_TOKEN");
  if (!wabaId) missing.push("WHATSAPP_BUSINESS_ACCOUNT_ID");
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing in .env: ${missing.join(", ")}` },
      { status: 500 },
    );
  }

  let db: Awaited<ReturnType<typeof getDb>>;
  try {
    db = await getDb();
  } catch (err: any) {
    return NextResponse.json(
      { error: "Database connection failed: " + err.message },
      { status: 500 },
    );
  }

  // Look up template — try 3 strategies in order:
  // 1. By name (most reliable — names are unique)
  // 2. By ObjectId from URL param
  // 3. By string _id fallback
  let template: any = null;
  try {
    if (nameOverride) {
      template = await db
        .collection(COLLECTION)
        .findOne({ name: nameOverride });
      console.info(
        `[submit] lookup by name "${nameOverride}":`,
        template ? "FOUND" : "NOT FOUND",
      );
    }
    if (!template && oid) {
      template = await db.collection(COLLECTION).findOne({ _id: oid });
      console.info(
        `[submit] lookup by ObjectId "${id}":`,
        template ? "FOUND" : "NOT FOUND",
      );
    }
    if (!template) {
      // last resort — scan entire collection (small collection, acceptable)
      const all = await db.collection(COLLECTION).find({}).toArray();
      console.info(
        `[submit] full scan, ${all.length} docs, looking for id="${id}"`,
      );
      template =
        all.find((t) => t._id.toString() === id || t.name === nameOverride) ??
        null;
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: "DB query failed: " + err.message },
      { status: 500 },
    );
  }

  if (!template) {
    return NextResponse.json(
      {
        error: `Template not found. Please delete it, recreate it, and submit again.`,
      },
      { status: 404 },
    );
  }

  const components = buildComponents(template);

  const payload = {
    name: template.name,
    language: template.language ?? "en_US",
    category: template.category ?? "UTILITY",
    components,
  };

  console.info(
    "[whatsapp-templates/submit] Submitting to Meta:",
    JSON.stringify(payload, null, 2),
  );

  let metaRes: Response;
  try {
    metaRes = await fetch(
      `https://graph.facebook.com/${apiVersion}/${wabaId}/message_templates`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Network error reaching Meta API: " + err.message },
      { status: 502 },
    );
  }

  const metaJson = await metaRes.json().catch(() => ({}));

  if (!metaRes.ok) {
    const errDetail = (metaJson as any)?.error ?? {};
    console.error(
      "[whatsapp-templates/submit] Meta error:",
      JSON.stringify(metaJson, null, 2),
    );
    console.error(
      "[submit] Meta rejected payload:",
      JSON.stringify(payload, null, 2),
    );

    const metaMessage = errDetail.message ?? "Meta API returned an error.";
    const metaDetails = errDetail.error_data?.details ?? "";
    const subcode = errDetail.error_subcode ?? "";

    // Subcode 2388023 = template name already exists on Meta — treat as success
    if (
      subcode === 2388023 ||
      String(subcode) === "2388023" ||
      metaMessage.toLowerCase().includes("already exists")
    ) {
      // Template was previously submitted — just mark it as submitted locally
      await db
        .collection(COLLECTION)
        .updateOne(
          { _id: template._id },
          {
            $set: {
              status: "SUBMITTED",
              submittedAt: new Date().toISOString(),
              updatedAt: new Date(),
            },
          },
        );
      return NextResponse.json({
        success: true,
        metaTemplateId: template.metaTemplateId ?? null,
        metaStatus: "PENDING",
        message: `Template "${template.name}" was already submitted to Meta. Check Meta Business Suite for approval status.`,
      });
    }

    const friendly = metaDetails
      ? `${metaMessage} — ${metaDetails}`
      : subcode
        ? `${metaMessage} (subcode: ${subcode})`
        : metaMessage;

    return NextResponse.json(
      {
        error: `[Meta ${errDetail.code ?? metaRes.status}] ${friendly}`,
        code: errDetail.code,
        subcode,
        detail: errDetail,
        payload,
      },
      { status: metaRes.status >= 500 ? 502 : 422 },
    );
  }

  const metaTemplateId = (metaJson as any)?.id ?? null;
  const metaStatus = (metaJson as any)?.status ?? "PENDING";

  // Update local record — use template's actual _id to be safe
  await db.collection(COLLECTION).updateOne(
    { _id: template._id },
    {
      $set: {
        status: "SUBMITTED",
        metaTemplateId,
        metaStatus,
        submittedAt: new Date().toISOString(),
        updatedAt: new Date(),
      },
    },
  );

  return NextResponse.json({
    success: true,
    metaTemplateId,
    metaStatus,
    message: `Template "${template.name}" submitted to Meta. It will be reviewed within 2–48 hours.`,
  });
}
