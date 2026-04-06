import { NextRequest } from "next/server";
import { loadDb, list, paginate } from "@/app/api/v1/_lib/db";

export async function GET(req: NextRequest) {
  const db = loadDb();
  const sp = req.nextUrl.searchParams;
  const data = db.companies.map((c) => ({
    id: c.id,
    name: c.name,
    full_name: c.full_name,
    count: db.vacancies.filter((v) => v.company_id === c.id).length,
    it_accreditation: c.it_accreditation,
    logo: c.logo,
    rating: c.rating,
  }));
  return list(paginate(data, sp.get("page"), sp.get("take") ?? "50", 50));
}
