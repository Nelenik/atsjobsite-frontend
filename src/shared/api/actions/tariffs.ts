"use server";

import { apiGet, TApiListResponse } from "../common/api";
import { TTariff } from "../types";

/**
 * Fetches a list of available tariffs from the server.
 *
 * Sends a GET request to the `/tariffs` endpoint and returns the list of tariffs.
 * If the request fails, throws an error with a descriptive message.
 *
 * @returns {Promise<TTariff[]>} A promise resolving to an array of tariffs.
 *
 * @throws {Error} If the request fails, an error with a user-friendly message is thrown.
 */
export const getTariffs = async (): Promise<TTariff[]> => {
  try {
    const response = await apiGet<TApiListResponse<TTariff>>("/api/v1/tariffs");

    return response.data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      error.message = "Failed to load tariffs. Please try again later.";
    }
    throw error;
  }
};
