import { NextRequest } from "next/server";
import {
  loadDb,
  saveDb,
  nextId,
  paginate,
  list,
  ok,
  unauthorized,
} from "@/app/api/v1/_lib/db";
import { getAuthUserId } from "@/app/api/v1/_lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ matchId: string }> },
) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const { matchId } = await params;
  const sp = req.nextUrl.searchParams;
  const comments = db.comments.filter((c) => c.entity_id === parseInt(matchId));
  return list(paginate(comments, sp.get("page"), "10", 10));
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ matchId: string }> },
) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const { matchId } = await params;
  const body = await req.json();
  const comment = {
    id: nextId(db.comments),
    entity_id: parseInt(matchId),
    content: body.content || "",
    created_at: new Date().toISOString(),
  };
  db.comments.push(comment);
  saveDb(db);
  return ok(comment);
}
