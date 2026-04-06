import { NextRequest } from "next/server";
import {
  loadDb,
  saveDb,
  ok,
  notFound,
  unauthorized,
  enrichVacancy,
} from "@/app/api/v1/_lib/db";
import { getAuthUserId } from "@/app/api/v1/_lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ matchId: string }> },
) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const { matchId } = await params;
  const match = db.matches.find((m) => m.id === parseInt(matchId));
  if (!match) return notFound();
  const cv = db.cvs.find((c) => c.id === match.cv_id) ?? null;
  const rawVacancy = db.vacancies.find((v) => v.id === match.vacancy_id);
  const vacancy = rawVacancy ? enrichVacancy(rawVacancy, db) : null;
  const status = db.statuses.find((s) => s.id === match.status_id) ?? null;
  return ok({ ...match, cv, vacancy, status });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ matchId: string }> },
) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const { matchId } = await params;
  const idx = db.matches.findIndex((m) => m.id === parseInt(matchId));
  if (idx === -1) return notFound();
  db.matches[idx] = {
    ...db.matches[idx],
    ...(await req.json()),
    id: db.matches[idx].id,
  };
  saveDb(db);
  return ok(db.matches[idx]);
}
