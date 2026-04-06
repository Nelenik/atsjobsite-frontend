import { NextRequest } from "next/server";
import { loadDb, list, unauthorized } from "@/app/api/v1/_lib/db";
import { getAuthUserId } from "@/app/api/v1/_lib/auth";

export async function GET(req: NextRequest) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const posMap: Record<string, number> = {};
  db.vacancies.forEach((v) => {
    if (v.position) posMap[v.position] = (posMap[v.position] || 0) + 1;
  });
  const data = Object.entries(posMap).map(([position, count]) => ({
    position,
    count,
  }));
  return list({ data, total: data.length, page: 1, take: data.length });
}
