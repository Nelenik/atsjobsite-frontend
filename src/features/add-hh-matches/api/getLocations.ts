"use server";
/**
 * get country and areas from json files in public folder
 */
import { fetchJson } from "@/shared/api/common/fetchJson";
import { THhCheckboxGroupItem } from "./types";

export const getCountry = async () => {
  const result = await fetchJson<THhCheckboxGroupItem[]>(
    "/data/location/countries.json"
  );

  return result;
};

export const getAreas = async (countryId: string) => {
  const result = await fetchJson<THhCheckboxGroupItem[]>(
    `/data/location/areas/${countryId}.json`
  );
  return result;
};
