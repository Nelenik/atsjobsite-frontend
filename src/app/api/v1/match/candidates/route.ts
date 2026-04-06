import { NextRequest } from "next/server";
import { loadDb, list, unauthorized } from "@/app/api/v1/_lib/db";
import { getAuthUserId } from "@/app/api/v1/_lib/auth";

export async function GET(req: NextRequest) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const sp = req.nextUrl.searchParams;
  const vacId = sp.get("vacancy_id") ? parseInt(sp.get("vacancy_id")!) : null;
  const statusId = sp.get("status_id") ? parseInt(sp.get("status_id")!) : null;
  let matches = [...db.matches];
  if (vacId !== null) matches = matches.filter((m) => m.vacancy_id === vacId);
  if (statusId !== null)
    matches = matches.filter((m) => m.status_id === statusId);
  const data = matches.map((m) => {
    const cv = db.cvs.find((c) => c.id === m.cv_id);
    return {
      id: m.id,
      name: cv?.candy_name || "Кандидат",
      cv_name: cv?.name || "",
      city: cv?.candy_location || "",
      salary: cv?.salary || 0,
      match_point: m.point || 0,
      created_at: m.created_at,
    };
  });
  return list({ data, total: data.length, page: 1, take: data.length });
}
