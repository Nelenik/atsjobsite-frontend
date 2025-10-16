"use server";
import { fetchJson } from "@/shared/api/common/fetchJson";
import { THhCheckboxGroupItem } from "./types";

/***
 * get categories and subcategories from json files in public folder
 */

export const getCategories = async () => {
  const res = await fetchJson<THhCheckboxGroupItem[]>(
    `/data/roles/categories.json`
  );
  return res;
};

export const getGroup = async (groupId: string) => {
  const result = await fetchJson<THhCheckboxGroupItem[]>(
    `/data/roles/groupes/${groupId}.json`
  );
  return result;
};
