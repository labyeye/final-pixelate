import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireAuth } from "@/lib/require-auth";
import { generateAgreementPdf } from "@/lib/agreement-pdf";
import { SIGNATORY, buildBlocks, fmtDMY, subjectFor, titleFor } from "@/lib/agreement-templates";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const db = await getDb();
    const a: any = await db.collection("agreements").findOne({ _id: new ObjectId(id) });
    if (!a) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const sign = request.nextUrl.searchParams.get("sign") !== "0";
    const pdf = await generateAgreementPdf({
      agreementNo: a.agreementNo,
      title: titleFor(a.type),
      date: fmtDMY(a.date),
      toName: a.name,
      subject: subjectFor(a),
      blocks: buildBlocks(a),
      signatory: SIGNATORY,
      recipient: { name: a.name, designation: a.role },
      includeCompanySign: sign,
    });
    const filename = `${a.agreementNo.replace(/\//g, "-")}-${a.name.replace(/[^a-zA-Z0-9]+/g, "-")}.pdf`;
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (e: any) {
    console.error("Agreement PDF failed:", e);
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
