"use server";

import { apiGet } from "@/shared/api/common/api";
import { getSyntheticError } from "@/shared/api/common/errors";

export const addMatches = async (vacancyId: number | string) => {
  try {
    await apiGet(`/api/v1/vacancy/${vacancyId}/refresh`);
    return {
      sent: true,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      sent: true,
      error: getSyntheticError("Ошибка при добавлении мэтчей"),
    };
  }
};
