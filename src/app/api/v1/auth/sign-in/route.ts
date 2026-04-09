import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { loadDb, ok } from "@/app/api/v1/_lib/db";
import { sessions } from "@/app/api/v1/_lib/sessions";
import { DEV_TOKEN } from "../../_lib/constants";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  //dev auth bypass
  if (!password || !email) {
    sessions.set(DEV_TOKEN, "dev-user-id");
    console.log(sessions);
    return ok({ token: DEV_TOKEN });
  }
  // Normal auth flow
  const db = loadDb();
  const login = (email || "").trim();
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
          constraints: { credentials: "Invalid login or password" },
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
