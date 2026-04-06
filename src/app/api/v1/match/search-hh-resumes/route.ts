import { NextRequest } from "next/server";
import { ok, unauthorized } from "@/app/api/v1/_lib/db";
import { getAuthUserId } from "@/app/api/v1/_lib/auth";

export async function POST(req: NextRequest) {
  if (!getAuthUserId(req)) return unauthorized();
  return ok({ message: "Поиск резюме на HH запущен" });
}
