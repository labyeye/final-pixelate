import * as svc from "@/lib/services";

// Serves a work-gallery thumbnail as a real, browser-cacheable image (instead of base64 inside the list JSON).
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item: any = await svc.findById("workGallery", id);
  const src: string = item?.thumbnailBase64 || "";
  const m = /^data:([^;]+);base64,(.*)$/s.exec(src);
  if (!m) return new Response(null, { status: 404, headers: { "Access-Control-Allow-Origin": "*" } });
  return new Response(Buffer.from(m[2], "base64"), {
    headers: {
      "Content-Type": m[1],
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
