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

export async function GET(req: NextRequest) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const sp = req.nextUrl.searchParams;
  let data = [...db.companies];
  const name = sp.get("name");
  if (name) {
    const q = name.toLowerCase();
    data = data.filter((c) => c.name.toLowerCase().includes(q));
  }
  return list(paginate(data, sp.get("page"), sp.get("take") ?? "50", 50));
}

export async function POST(req: NextRequest) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const body = await req.json();
  const company = {
    id: nextId(db.companies),
    created_at: new Date().toISOString(),
    partner: false,
    it_accreditation: false,
    logo: "",
    rating: null,
    ...body,
  };
  db.companies.push(company);
  saveDb(db);
  return ok(company);
}
