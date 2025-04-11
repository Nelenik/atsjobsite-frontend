import { TCandidateShort } from "@/shared/api/types";
import { TStatus } from "@/shared/api/types/statuses";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { useOptimisticUpdateMatch } from "./useOptimisticUpdateMatch";
import { useVacancyMatchStatuses } from "@/entities/vacancy";

/**
 * useMatchBoard is a custom hook that provides logic for managing the drag-and-drop
 * interactions on the candidate match board. It handles both draggable columns (statuses)
 * and draggable items (candidates).
 *
 * It integrates with `useVacancyMatchStatuses` for column operations and `useOptimisticUpdateMatch`
 * for updating candidate statuses optimistically on drag.
 *
 * @returns An object containing:
 * - `columns`: Array of status columns.
 * - `columnsIds`: Array of column IDs (used for sortable context).
 * - `activeColumn`: The column currently being dragged.
 * - `activeItem`: The candidate currently being dragged.
 * - `handleDragStart`: Handler for drag start events.
 * - `handleDragEnd`: Handler for drag end events.
 */

export const useMatchBoard = () => {
  const { columns, moveColumn } = useVacancyMatchStatuses();

  // Extract only the column IDs for SortableContext
  const columnsIds = useMemo(() => columns.map((col) => col.id), [columns]);

  // State for the currently dragged column is used for DndOverlay
  const [activeColumn, setActiveColumn] = useState<TStatus | null>(null);
  // State for the currently dragged candidate  is used for DndOverlay
  const [activeItem, setActiveItem] = useState<TCandidateShort | null>(null);

  // Hook for optimistic candidate status updates
  const { startMatchUpd } = useOptimisticUpdateMatch(activeItem?.id);

  /****DND HANDLERS *****/

  /**
   * Handles the start of a drag event, sets either the active item or column
   */
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current;
    if (data?.type === "match_item") {
      // Candidate is being dragged
      const activeItem = data.candidate || null;
      setActiveItem(activeItem);
    } else if (data?.type === "match_column") {
      // Column is being dragged
      const activeColumn = data.column || null;
      setActiveColumn(activeColumn);
    }
  };

  /**
   * Handles the end of a drag event. Depending on the dragged item type,
   * either moves the column or updates the candidate's match status.
   */
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveItem(null);
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const activeData = active.data.current;
    const overData = over.data.current;
    if (!activeData || !overData) return;

    //Ccheck active element and over zone
    const isActiveItem = activeData.type === "match_item";
    const isActiveColumn = activeData.type === "match_column";
    const isOverItem = overData.type === "match_item";
    const isOverColumn = overData.type === "match_column";

    // No valid draggable found, stop dragging
    if (!isActiveItem && !isActiveColumn) return;

    if (isActiveItem) {
      // Candidate dropped over a new column or another candidate
      const initialStatusId: number = activeData.status_id;
      let targetStatusId!: number;
      if (isOverColumn) {
        targetStatusId = overData.column.id;
      } else if (isOverItem) {
        targetStatusId = overData.status_id;
      }
      // Trigger optimistic update
      startMatchUpd(targetStatusId, initialStatusId);
    } else if (isActiveColumn) {
      // Column is being reordered
      moveColumn(active.id, over.id);
    }
  };

  return {
    columnsIds,
    activeColumn,
    activeItem,
    handleDragStart,
    handleDragEnd,
    columns,
  };
};
