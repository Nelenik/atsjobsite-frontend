"use server";
import { mapHhRolesToCheckboxItems } from "../lib/utils";

/***
 * get categories and subcategories from json files in public folder
 */

export const getSpecialization = async () => {
  try {
    const specializationPromise = await fetch(
      "https://api.hh.ru/professional_roles",
      {
        next: {
          revalidate: 3600,
        },
      }
    );
    const specialization = await specializationPromise.json();
    const normalizedGroups = mapHhRolesToCheckboxItems(
      specialization.categories
    );
    return normalizedGroups;
  } catch (error) {
    console.error(
      `Fetching <<professional_roles>> from hh.ru api failed: ${error}`
    );
    return [];
  }
};
