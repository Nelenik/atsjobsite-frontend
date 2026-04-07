import { NextRequest } from "next/server";
import { sessions } from "./sessions";

export const getTokenFromRequest = (req: NextRequest): string | null => {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return token || null;
};

export const getAuthUserId = (req: NextRequest): number | string | null => {
  const token = getTokenFromRequest(req);
  if (!token || !sessions.has(token)) return null;
  return sessions.get(token)!;
};
