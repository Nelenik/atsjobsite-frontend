import { NextRequest } from "next/server";
import {
  loadDb,
  saveDb,
  ok,
  notFound,
  unauthorized,
} from "@/app/api/v1/_lib/db";
import { getAuthUserId } from "@/app/api/v1/_lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const { id } = await params;
  const idx = db.statuses.findIndex((s) => s.id === parseInt(id));
  if (idx === -1) return notFound();
  db.statuses[idx] = {
    ...db.statuses[idx],
    ...(await req.json()),
    id: db.statuses[idx].id,
  };
  saveDb(db);
  return ok(db.statuses[idx]);
}
