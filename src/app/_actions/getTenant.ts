"use server";

import { cookies } from "next/headers";

export const getTenant = async () => {
  const cookieStore = await cookies();
  const tenat = cookieStore.get("origin-host")?.value;
  return tenat || "";
};
