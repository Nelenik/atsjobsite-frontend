"use server";
import { fetchJson } from "@/shared/api/common/fetchJson";
import { TCategory } from "./types";

/***
 * get categories and subcategories from json files in public folder
 */

export const getCategories = async () => {
  const res = await fetchJson<TCategory[]>(`/data/roles/categories.json`);
  return res;
};

export const getGroup = async (groupId: string) => {
  const result = await fetchJson<TCategory[]>(
    `/data/location/areas/${groupId}.json`
  );
  return result;
};
