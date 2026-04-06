import { NextRequest } from "next/server";
import {
  loadDb,
  saveDb,
  ok,
  notFound,
  unauthorized,
} from "@/app/api/v1/_lib/db";
import { getAuthUserId } from "@/app/api/v1/_lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const { id } = await params;
  const cv = db.cvs.find((c) => c.id === parseInt(id));
  if (!cv) return notFound();
  return ok(cv);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const { id } = await params;
  const idx = db.cvs.findIndex((c) => c.id === parseInt(id));
  if (idx === -1) return notFound();
  db.cvs[idx] = { ...db.cvs[idx], ...(await req.json()), id: db.cvs[idx].id };
  saveDb(db);
  return ok(db.cvs[idx]);
}
