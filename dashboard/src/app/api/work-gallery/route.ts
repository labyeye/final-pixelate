(async () => {})();
import { NextResponse } from "next/server";
import * as svc from "@/lib/services";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",

  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Cache-Control, X-Requested-With",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}

export async function GET(request: Request) {
  try {
    const col = await svc.getCollection("workGallery");
    // List only needs card fields; nested per-category objects hold huge base64 galleries.
    // Full doc is still served by /api/work-gallery/[id].
    const items = await col
      .find({}, { projection: { web: 0, app: 0, software: 0, video: 0, marketing: 0, uiux: 0, branding: 0 } })
      .toArray();

    // Public/website callers get a thumbnail URL (cacheable, lazy-loaded); dashboard/app pass ?full=1 to keep base64.
    const full = new URL(request.url).searchParams.get("full") === "1";
    const origin = new URL(request.url).origin;
    const normalized = (items || []).map((it: any) => {
      const out = { ...(it || {}), description: it?.description ?? it?.note ?? "" };
      if (!full && String(out.thumbnailBase64 || "").startsWith("data:")) {
        out.thumbnailBase64 = `${origin}/api/work-gallery/${out._id}/thumb`;
      }
      return out;
    });
    return NextResponse.json(normalized, {
      headers: { ...CORS_HEADERS, "Cache-Control": full ? "no-store" : "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const col = await svc.getCollection("workGallery");
    const res = await col.insertOne({ ...body, createdAt: new Date() });
    return NextResponse.json(
      { ...body, _id: res.insertedId },
      { status: 201, headers: CORS_HEADERS },
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
