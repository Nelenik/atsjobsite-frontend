import { updateVacancy } from "@/shared/api/updateData";
import convertToFormData from "@/shared/lib/object_manipulations/convertToFormData";
import { useToast } from "@/shared/model/hooks/use-toast";
import { useOptimistic, useTransition } from "react";
import { TGroupedVacancies } from "./types";

/**
 * Hook for optimistic updating of vacancy status on the server
 * 
 * @param groups - Current state of grouped vacancies
 * @param updateGroups - Function to update the state of vacancy groups
 * 
 * @returns Object containing:
 * - optimisticGroups: Optimistically updated state of vacancy groups
 * - startUpdVacancyStatus: Function to start the vacancy status update process
 * 
 * @example
 * ```tsx
 * const { optimisticGroups, startUpdVacancyStatus } = useUpdateVacancyAtServer(
 *   groups,
 *   updateGroups
 * );
 * 
 * // When dragging a vacancy to another column
 * startUpdVacancyStatus(
 *   vacancyId,
 *   vacancyName,
 *   newStatusId,
 *   newGroups
 * );
 * ```
 */
export const useUpdateVacancyAtServer = (
  groups: TGroupedVacancies | null,
  updateGroups: (currentGroups: TGroupedVacancies) => void
) => {
  const { toast } = useToast();
  //optimistic state
  const [optimisticGroups, updateOptimistic] = useOptimistic(
    groups,
    (currentGroups, newGroups: TGroupedVacancies) => ({
      ...currentGroups,
      ...newGroups,
    })
  );

  const [, startTransition] = useTransition();

  /**
   * Starts the process of updating vacancy status with optimistic UI updates
   * 
   * @param vacancyId - ID of the vacancy to update
   * @param vacancyName - Name of the vacancy
   * @param newStatusId - New status ID for the vacancy
   * @param newGroups - New state of groups after moving the vacancy
   * 
   * @remarks
   * The function first optimistically updates the UI, then sends a request to the server.
   * In case of an error, it shows a notification and rolls back the changes.
   */
  const startUpdVacancyStatus = (
    vacancyId: number,
    vacancyName: string,
    newStatusId: number,
    newGroups: TGroupedVacancies
  ) => {
    const updateVacancyWithId = updateVacancy.bind(null, vacancyId);

    startTransition(async () => {
      updateOptimistic(newGroups);
      const { error } = await updateVacancyWithId(
        null,
        convertToFormData({ status_id: newStatusId, name: vacancyName })
      );
      if (error) {
        console.log(error);
        toast({
          variant: "destructive",
          description: "Error updating vacancy status",
        });
      } else {
        updateGroups(newGroups);
      }
    });
  };

  return {
    optimisticGroups,
    startUpdVacancyStatus,
  };
};
