import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { buildQuotationHtml } from "@/lib/quotation-html";

export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  try {
    const { quotationId } = await request.json();
    if (!quotationId) {
      return NextResponse.json({ error: "quotationId required" }, { status: 400 });
    }

    const db = await getDb();

    let quotation: any = null;
    try {
      quotation = await db.collection("quotations").findOne({ _id: new ObjectId(quotationId) });
    } catch {
      quotation = await db.collection("quotations").findOne({ _id: quotationId as any });
    }
    if (!quotation) {
      return NextResponse.json({ error: "Quotation not found" }, { status: 404 });
    }

    let client: any = null;
    if (quotation.clientId) {
      try {
        client = await db.collection("clients").findOne({ _id: new ObjectId(quotation.clientId) });
      } catch {
        client = await db.collection("clients").findOne({ _id: quotation.clientId as any });
      }
    }

    const settings = await db.collection("settings").findOne({});

    const origin = request.nextUrl.origin;
    const html = buildQuotationHtml(quotation, client, settings, origin);

    const puppeteer = await import("puppeteer");
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 794, height: 1122 });

      // Use setContent instead of goto — no auth, no redirects
      await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });

      // Wait for images (logo, sign) to load
      await page.evaluate(() =>
        Promise.all(
          Array.from(document.images)
            .filter((img) => !img.complete)
            .map((img) => new Promise<void>((res) => { img.onload = img.onerror = () => res(); }))
        )
      );

      await page.emulateMediaType("print");

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
      });

      const safeTitle = ((quotation.title || "Quotation") as string).replace(/[^a-zA-Z0-9-_]/g, "-");
      const filename = `${quotation.quoteId || quotationId}-${safeTitle}.pdf`;

      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "X-Filename": filename,
        },
      });
    } finally {
      await browser.close();
    }
  } catch (e: any) {
    console.error("generate-quotation-pdf error:", e);
    return NextResponse.json({ error: e.message || "PDF generation failed" }, { status: 500 });
  }
}
