"use server";

import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "../constants";
import { TUser } from "../types";
import { apiGet, TApiSuccessResponse } from "../common/api";

export const getUser = async (): Promise<TUser | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME);
    if (!token) throw new Error("token not found");

    const result = await apiGet<TApiSuccessResponse<TUser>>("/api/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    return result.data;
  } catch {
    return null;
  }
};
