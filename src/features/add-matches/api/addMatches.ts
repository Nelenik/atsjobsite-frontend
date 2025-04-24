"use server";

import { mutateAction } from "@/shared/api/common/mutate";
import { TMutationState } from "@/shared/api/common/types";

// This action triggers the match creation flow to get additional matches for the vacancy.
export const addMatches = async (
  vacancyId: number | string,
  _: TMutationState | null,
  body: FormData
) => {
  const result = await mutateAction(`/vacancy/${vacancyId}/refresh`, {
    body,
    method: "PUT",
  });
  console.log("refresh result", result);
  return result;
};
