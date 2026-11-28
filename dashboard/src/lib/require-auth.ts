import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { isRevoked } from "@/lib/security";

type AuthSuccess = {
  decoded: ReturnType<typeof verifyToken> & object;
  error: null;
};
type AuthFailure = { decoded: null; error: NextResponse };

export function requireAuth(request: Request): AuthSuccess | AuthFailure {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace("Bearer ", "");
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || isRevoked((decoded as any).sid)) {
    return {
      decoded: null,
      error: NextResponse.json({ error: "unauthorized" }, { status: 401 }),
    };
  }
  return {
    decoded: decoded as object & ReturnType<typeof verifyToken>,
    error: null,
  };
}
