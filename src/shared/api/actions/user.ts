"use server";

import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "../constants";
import { TUser } from "../types";

/*----Needs to be redone with real data.--- */

export const getUser = async (): Promise<TUser | null> => {
  try {
    // return null;
    //temp
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME);
    if (!token) throw new Error("token not found");

    //fetch user
    return {
      id: 1,
      name: "Пользователь",
      email: "user@mail.com",
      profile_image: "",
    };
  } catch {
    return null;
  }
};
