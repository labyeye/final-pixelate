import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";

export async function GET() {
  try {
    const items = await svc.getInventory();
    return NextResponse.json(items);
  } catch (e: any) {
    console.error("Error fetching inventory", e);
    return NextResponse.json(
      { error: e.message || "Failed to fetch inventory" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const created = await svc.createInventory(body);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    console.error("Error creating inventory", e);
    return NextResponse.json(
      { error: e.message || "Failed to create inventory" },
      { status: 500 },
    );
  }
}
