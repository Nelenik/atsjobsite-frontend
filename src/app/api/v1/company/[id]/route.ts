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
  const company = db.companies.find((c) => c.id === parseInt(id));
  if (!company) return notFound();
  return ok(company);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const { id } = await params;
  const idx = db.companies.findIndex((c) => c.id === parseInt(id));
  if (idx === -1) return notFound();
  db.companies[idx] = {
    ...db.companies[idx],
    ...(await req.json()),
    id: db.companies[idx].id,
  };
  saveDb(db);
  return ok(db.companies[idx]);
}
