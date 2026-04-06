import { NextRequest } from "next/server";
import { sessions } from "./sessions";

export const getAuthUserId = (req: NextRequest): number | null => {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || !sessions.has(token)) return null;
  return sessions.get(token)!;
};
