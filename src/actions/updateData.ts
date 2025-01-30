import { revalidatePath } from "next/cache";
import { TMutationState } from "./types";

export const updateVacancy = async (
  vacancyId: number | string,
  _: TMutationState,
  body: FormData
) => {
  const result = updateEntity(`/vacancy/${vacancyId}`, body);
  revalidatePath("/dashboard/[companyId]/vacancies/*");
  return result;
};

const updateEntity = async (url: string, body: FormData) => {
  console.log(Object.fromEntries(body));
};
