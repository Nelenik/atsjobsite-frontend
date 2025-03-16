import { updateVacancy } from "@/actions/updateData";
import convertToFormData from "@/lib/utils/convertToFormData";
import { TMatchStatus, TVacancyEdit } from "@/shared/types";
import { TStatus } from "@/shared/types/statuses";
import { arrayMove } from "@dnd-kit/sortable";
import { useState, useTransition, useRef, useEffect } from "react";
import { useToast } from "./use-toast";

export const useMatchBoardsColumns = (
  matchStatuses: TMatchStatus[],
  vacancyId: number,
  vacancyData: TVacancyEdit
) => {
  const { toast } = useToast();
  //sort match statuses by rank to get right columns order
  const initColumns = matchStatuses
    .toSorted((a, b) => a.rank - b.rank)
    .map((el) => el.status);

  const [columns, setColumns] = useState(initColumns);

  //transition to update column position
  const [isPending, startTransition] = useTransition();

  //save the initial columns state to return to it if is needed
  const prevColumnsState = useRef(columns);

  const updateAtServer = (newColumns: TStatus[]) =>
    startTransition(async () => {
      const { error } = await updateVacancy(
        vacancyId,
        null,
        convertToFormData({
          ...vacancyData,
          matchStatuses: newColumns.map((el) => el.id),
        })
      );

      if (error) {
        toast({
          variant: "destructive",
          description:
            "Произошла ошибка при обновлении колонок. Попробуйте снова.",
        });
        setColumns(prevColumnsState.current);
      }
    });

  const updateColumns = (newColumns: TStatus[]) => {
    setColumns(newColumns);
    updateAtServer(newColumns);
  };

  const moveColumn = (activeId: number | string, overId: number | string) => {
    const activeColIndex = columns.findIndex((col) => col.id === activeId);
    const overColIndex = columns.findIndex((col) => col.id === overId);
    const newColumns = arrayMove(columns, activeColIndex, overColIndex);
    updateColumns(newColumns);
  };

  const deleteColumn = (deletingColId: number | string) => {
    const newColumns = columns.filter((col) => col.id !== deletingColId);
    updateColumns(newColumns);
  };

  const addColumn = (
    currentId: number,
    newStatus: TStatus,
    position: "left" | "right"
  ) => {
    let currPos = columns.findIndex((item) => item.id === currentId);
    currPos = position === "left" ? currPos : currPos + 1;
    const newColumns = columns.toSpliced(currPos, 0, newStatus);
    updateColumns(newColumns);
  };

  return {
    columns,
    isUpdating: isPending,
    moveColumn,
    deleteColumn,
    addColumn,
  };
};
