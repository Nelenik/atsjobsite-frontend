import { NextRequest } from "next/server";
import { getTokenFromRequest } from "../../_lib/auth";
import { ok, unauthorized } from "../../_lib/db";
import { sessions } from "../../_lib/sessions";

export async function POST(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (token) {
    sessions.delete(token);
    return ok(null);
  }
  return unauthorized();
}
