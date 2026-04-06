import { NextRequest } from "next/server";
import { loadDb, saveDb, nextId, ok, unauthorized } from "@/app/api/v1/_lib/db";
import { getAuthUserId } from "@/app/api/v1/_lib/auth";

export async function POST(req: NextRequest) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const body = await req.json();
  const status = {
    id: nextId(db.statuses),
    ...body,
    rank: parseInt(body.rank) || 0,
  };
  db.statuses.push(status);
  saveDb(db);
  return ok(status);
}
