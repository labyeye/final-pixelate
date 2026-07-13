import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { requireAuth } from "@/lib/require-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const campaign = await svc.findById("campaigns", id);

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json({ ...campaign, _id: String((campaign as any)._id) });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
