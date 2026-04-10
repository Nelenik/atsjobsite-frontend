import { NextRequest } from "next/server";
import { getAuthUserId } from "../../_lib/auth";
import { loadDb, notFound, ok } from "../../_lib/db";

export function GET(req: NextRequest) {
  const userId = getAuthUserId(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const db = loadDb();
  const user = db.users.find((u) => u.id === userId);
  if (!user) {
    return notFound();
  }
  return ok({
    id: user.id,
    name: user.name,
    email: user.email,
  });
}
