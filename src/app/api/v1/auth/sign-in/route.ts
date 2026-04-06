import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { loadDb, ok } from "@/app/api/v1/_lib/db";
import { sessions } from "@/app/api/v1/_lib/sessions";

export async function POST(req: NextRequest) {
  const db = loadDb();
  const { email, password, username } = await req.json();
  const login = (email || username || "").trim();
  const user = db.users.find(
    (u) =>
      (u.email === login || u.username === login) && u.password === password,
  );
  if (!user) {
    return Response.json({
      errorType: "UNAUTHORIZED_EXCEPTION",
      message: [
        {
          property: "email",
          constraints: { credentials: "Неверный логин или пароль" },
          children: [],
        },
      ],
      success: false,
    });
  }
  const token = randomUUID();
  sessions.set(token, user.id);
  return ok({ token });
}
