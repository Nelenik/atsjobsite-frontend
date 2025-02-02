"use server";
import { revalidatePath } from "next/cache";
import { TMutationState } from "./types";
import {
  extractSyntheticErrorFromApi,
  getSyntheticError,
  TBadRequest,
} from "@/shared/helpers";
import { apiPut } from "./api";

export const updateVacancy = async (
  vacancyId: number | string,
  _: TMutationState,
  body: FormData
) => {
  const result = await updateEntity(`/vacancy/${vacancyId}`, body);
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]/vacancies/*", "layout");
  }
  return result;
};

export const updateCompany = async (
  companyId: number | string,
  _: TMutationState,
  body: FormData
) => updateEntity(`/company/${companyId}`, body);

export const updateCV = async (
  cvId: number | string,
  _: TMutationState,
  body: FormData
) => updateEntity(`cv/${cvId}`, body);

const updateEntity = async (url: string, body: FormData) => {
  console.log(Object.fromEntries(body));
  try {
    const response = await apiPut<boolean | TBadRequest>(url, body);
    if (response && typeof response === "object" && response.errorType) {
      return {
        sent: true,
        error: extractSyntheticErrorFromApi(response),
        payload: body,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      sent: true,
      error: getSyntheticError("Ошибка сохранения", 500),
      payload: body,
    };
  }

  return {
    sent: true,
    error: null,
  };
};
