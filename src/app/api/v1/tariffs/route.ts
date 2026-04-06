import { NextRequest } from "next/server";
import { loadDb, ok, unauthorized } from "@/app/api/v1/_lib/db";
import { getAuthUserId } from "@/app/api/v1/_lib/auth";

export async function GET(req: NextRequest) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  return ok(db.tariffs);
}
