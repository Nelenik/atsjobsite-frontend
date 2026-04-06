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
  { params }: { params: Promise<{ id: string }> },
) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const { id } = await params;
  const vacancy = db.vacancies.find((v) => v.id === parseInt(id));
  if (!vacancy) return notFound();
  return ok(enrichVacancy(vacancy, db));
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const { id } = await params;
  const idx = db.vacancies.findIndex((v) => v.id === parseInt(id));
  if (idx === -1) return notFound();
  const body = await req.json();
  // Keep numeric fields as numbers even when sent as strings
  if (body.status_id !== undefined)
    body.status_id = parseInt(body.status_id) || null;
  if (body.company_id !== undefined)
    body.company_id = parseInt(body.company_id) || db.vacancies[idx].company_id;
  if (body.salary_from !== undefined)
    body.salary_from = parseInt(body.salary_from) || 0;
  if (body.salary_to !== undefined)
    body.salary_to = parseInt(body.salary_to) || 0;
  db.vacancies[idx] = {
    ...db.vacancies[idx],
    ...body,
    id: db.vacancies[idx].id,
  };
  saveDb(db);
  return ok(enrichVacancy(db.vacancies[idx], db));
}
