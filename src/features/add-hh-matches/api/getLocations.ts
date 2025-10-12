import { fetchJson } from "@/shared/api/common/fetchJson";
import { TLocation } from "./types";

export const getCountry = async () => {
  const result = await fetchJson<TLocation[]>("/data/location/countries.json");

  return result;
};

export const getAreas = async (countryId: string) => {
  const result = await fetchJson<TLocation[]>(
    `/data/location/areas/${countryId}.json`
  );
  return result;
};
