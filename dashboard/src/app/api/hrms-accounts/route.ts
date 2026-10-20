import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const BASE = "https://hrms.pixelatenest.com/api/crm";
const API_KEY = process.env.CRM_API_SECRET ?? "";

// Creates a NestHR customer account (admin login + company + active subscription).
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const res = await fetch(`${BASE}/companies`, {
      method: "POST",
      headers: { "x-api-key": API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: data?.message ?? `NestHR error ${res.status}` },
        { status: res.status },
      );
    }
    return NextResponse.json(data, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e.message ?? "Failed to create account" },
      { status: 500 },
    );
  }
}
