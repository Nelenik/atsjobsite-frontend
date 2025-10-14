"use server";
import { headers } from "next/headers";

export async function fetchJson<T>(url: string): Promise<T> {
  const host = (await headers()).get("host");
  const isDev = process.env.NODE_ENV === "development";
  const protocol = isDev ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  try {
    const res = await fetch(`${baseUrl}${url}`, { next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error(`Ошибка запроса: ${res.status} ${res.statusText}`);
    }
    const data: T = await res.json();
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Ошибка при загрузке JSON:", err.message);
      throw err;
    } else {
      console.error("Неизвестная ошибка при загрузке JSON", err);
      throw new Error("Неизвестная ошибка при загрузке JSON");
    }
  }
}
