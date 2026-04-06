import { readFileSync, writeFileSync } from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db.json");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Db = Record<string, any[]>;

export const loadDb = (): Db => JSON.parse(readFileSync(DB_PATH, "utf-8"));

export const saveDb = (db: Db): void =>
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nextId = (arr: any[]): number =>
  arr.length ? Math.max(...arr.map((x) => Number(x.id) || 0)) + 1 : 1;

export const paginate = <T>(
  arr: T[],
  page: string | null,
  take: string | null,
  defaultTake = 10
) => {
  const p = Math.max(1, parseInt(page ?? "1") || 1);
  const t = Math.max(1, parseInt(take ?? String(defaultTake)) || defaultTake);
  return {
    data: arr.slice((p - 1) * t, p * t),
    total: arr.length,
    page: p,
    take: t,
  };
};

export const ok = (data: unknown) =>
  Response.json({ success: true, data });

export const list = (result: Record<string, unknown>) =>
  Response.json({ success: true, ...result });

export const notFound = () =>
  Response.json({ success: false, message: "Not found" }, { status: 404 });

export const unauthorized = () =>
  Response.json({ success: false, message: "Unauthorized" }, { status: 401 });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const enrichVacancy = (v: any, db: Db) => {
  const status = db.statuses.find((s) => s.id === v.status_id) ?? null;
  const matchStatuses = db.match_statuses
    .filter((ms) => ms.vacancy_id === v.id)
    .sort((a, b) => a.rank - b.rank)
    .map((ms) => ({
      ...ms,
      status: db.statuses.find((s) => s.id === ms.status_id) ?? null,
    }));
  const match_count = db.matches.filter((m) => m.vacancy_id === v.id).length;
  const match_hot_count = db.matches.filter(
    (m) => m.vacancy_id === v.id && (m.point || 0) >= 80
  ).length;
  return { ...v, status, matchStatuses, match_count, match_hot_count };
};
