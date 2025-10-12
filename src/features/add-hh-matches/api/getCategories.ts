import { fetchJson } from "@/shared/api/common/fetchJson";
import { TCategory } from "./types";

export const getCategories = async () => {
  const result = await fetchJson<TCategory[]>("/data/roles/categories.json");

  return result;
};

export const getGroup = async (groupId: string) => {
  const result = await fetchJson<TCategory[]>(
    `/data/location/areas/${groupId}.json`
  );
  return result;
};
