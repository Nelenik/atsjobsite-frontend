"use server";

import {
  apiGet,
  apiMutate,
  TApiListResponse,
  TMutationState,
} from "../common/api";
import { parseFormData } from "../common/utils";
import { TComment } from "../types";

/**
 * Fetches a paginated list of comments for a specific match.
 *
 * Sends a GET request to the `/match/:matchId/comment` endpoint with the given page number.
 * Returns the comments along with pagination details.
 *
 * @param {number | string} matchId - The ID of the match for which to retrieve comments.
 * @param {number} page - The page number for pagination.
 *
 * @returns {Promise<{ data: TComment[]; total: number; currentPage: number }>}
 * A promise resolving to an object containing the list of comments, total count, and current page.
 *
 * @throws {Error} If the request fails, an error with a user-friendly message is thrown.
 */
export const getMatchCommentList = async (
  matchId: number | string,
  page: number
) => {
  try {
    const response = await apiGet<TApiListResponse<TComment>>(
      `/api/v1/match/${matchId}/comment?page=${page}`
    );
    return {
      data: response.data,
      total: response.total,
      currentPage: response.page,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      error.message =
        "Не удалось загрузить комментарии к мэтчу. Пожалуйста, попробуйте позже.";
    }
    throw error;
  }
};

/**
 * Submits a new comment for a specific match.
 *
 * Sends a POST request to the `/match/:matchId/comment` endpoint with parsed form data.
 *
 * @param {string | number} matchId - The ID of the match to comment on.
 * @param {TMutationState | null} _ - The current mutation state (unused).
 * @param {FormData} data - The form data containing the comment content.
 *
 * @returns {Promise<TMutationState>} A promise resolving to the result of the mutation,
 * including error information if the request fails.
 */
export const storeMatchComment = async (
  matchId: string | number,
  _: TMutationState | null,
  data: FormData
): Promise<TMutationState> => {
  const result = await apiMutate(`/api/v1/match/${matchId}/comment`, {
    body: parseFormData(data),
  });
  return result;
};
