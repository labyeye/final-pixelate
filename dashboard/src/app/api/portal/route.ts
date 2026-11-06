import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import * as svc from "@/lib/services";
import { CORS, hashCode, ipOf, isBlocked, noteFail, notifySubmit } from "@/lib/portal";

const NO_STORE = { headers: CORS };
export const OPTIONS = () => new NextResponse(null, { headers: CORS });

// Public, pass-gated. Body: { code, selections?, submit? }. Never returns asset `code`.
export async function POST(r: Request) {
  const ip = ipOf(r);
  if (isBlocked(ip)) return NextResponse.json({ error: "Too many attempts. Try later." }, { status: 429, ...NO_STORE });
  const b = await r.json().catch(() => ({}));
  if (typeof b.code !== "string" || b.code.length > 20) return NextResponse.json({ error: "Invalid pass" }, { status: 400, ...NO_STORE });

  const passes = await svc.getCollection("portal_passes");
  const pass: any = await passes.findOne({ codeHash: hashCode(b.code) });
  if (!pass || pass.revoked || pass.expiresAt < new Date()) {
    noteFail(ip);
    return NextResponse.json({ error: "Invalid or expired pass" }, { status: 401, ...NO_STORE });
  }

  if (b.selections && !pass.submittedAt) {
    const s = b.selections;
    const sel: Record<string, string> = {};
    for (const k of pass.sections) if (typeof s[k] === "string" && s[k].length < 40) sel[k] = s[k];
    await passes.updateOne({ _id: pass._id }, { $set: { selections: sel, ...(b.submit ? { submittedAt: new Date() } : {}) } });
    pass.selections = sel;
    if (b.submit) pass.submittedAt = new Date();
  }

  const proj: any = ObjectId.isValid(pass.projectId)
    ? await (await svc.getCollection("projects")).findOne({ _id: new ObjectId(pass.projectId) })
    : null;
  const assets = await (await svc.getCollection("portal_assets"))
    .find({ type: { $in: pass.sections }, $or: [{ kinds: pass.kind }, { kinds: { $size: 0 } }] }, { projection: { code: 0, kinds: 0, createdAt: 0 } })
    .toArray();

  if (b.submit && pass.submittedAt && !pass.notified) {
    await passes.updateOne({ _id: pass._id }, { $set: { notified: true } });
    const name = (id: string) => assets.find((a: any) => String(a._id) === id)?.name ?? "—";
    await notifySubmit(proj?.title ?? "A project", Object.entries(pass.selections).map(([k, v]) => `${k}: ${name(v as string)}`));
  }

  return NextResponse.json({
    kind: pass.kind, sections: pass.sections, selections: pass.selections, submitted: !!pass.submittedAt,
    project: proj && { title: proj.title, status: proj.status ?? "BACKLOG", progress: proj.progress ?? 0, deliveryDate: proj.deliveryDate ?? null },
    assets: assets.map((a: any) => ({ id: String(a._id), type: a.type, name: a.name, preview: a.preview })),
  }, NO_STORE);
}
