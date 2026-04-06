import { NextRequest } from "next/server";
import {
  loadDb,
  saveDb,
  nextId,
  list,
  ok,
  unauthorized,
  enrichVacancy,
} from "@/app/api/v1/_lib/db";
import { getAuthUserId } from "@/app/api/v1/_lib/auth";

export async function GET(req: NextRequest) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const sp = req.nextUrl.searchParams;
  let data = [...db.vacancies];
  if (sp.get("company")) {
    data = data.filter((v) => v.company_id === parseInt(sp.get("company")!));
  }
  const result = data.map((v) => enrichVacancy(v, db));
  return list({
    data: result,
    total: result.length,
    page: 1,
    take: result.length,
  });
}

export async function POST(req: NextRequest) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const body = await req.json();
  const { matchStatuses: statusIds, ...rest } = body;
  const vacancy = {
    summary: "",
    salary_candy: 0,
    salary_market: 0,
    external_id: "",
    ...rest,
    id: nextId(db.vacancies),
    created_at: new Date().toISOString(),
    company_id: parseInt(rest.company_id) || 1,
    status_id: parseInt(rest.status_id) || null,
    salary_from: parseInt(rest.salary_from) || 0,
    salary_to: parseInt(rest.salary_to) || 0,
  };
  db.vacancies.push(vacancy);
  if (Array.isArray(statusIds)) {
    statusIds.forEach((sid: string) => {
      const s = db.statuses.find((st) => st.id === parseInt(sid));
      if (s) {
        db.match_statuses.push({
          vacancy_id: vacancy.id,
          status_id: s.id,
          rank: s.rank || 0,
        });
      }
    });
  }
  saveDb(db);
  return ok(enrichVacancy(vacancy, db));
}
