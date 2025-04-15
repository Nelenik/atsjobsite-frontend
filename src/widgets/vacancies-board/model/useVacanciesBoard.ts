import { TVacancyShort } from "@/shared/api/types";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { TGroupedVacancies } from "./types";
import { useGroupedVacancies } from "./useGroupedVacancies";
import { useUpdateVacancyAtServer } from "./useUpdateVacancyAtServer";

export const useVacaniesBoard = () => {
  const { groups, updateGroups, isLoading } = useGroupedVacancies();

  const { optimisticGroups, startUpdVacancyStatus } = useUpdateVacancyAtServer(
    groups,
    updateGroups
  );

  //dnd logic
  const [activeItem, setActiveItem] = useState<TVacancyShort | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeVacancy = active.data.current?.vacancy;
    setActiveItem(activeVacancy);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveItem(null);
    if (!groups) return;
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;
    //Ccheck active element and over zone
    const isActiveItem = activeData.type === "vac_item";

    const sourceColStatus = Number(activeData.status_id);
    const targetColStatus = Number(overData.status_id);

    if (!sourceColStatus || !targetColStatus) return;

    //If thie item is moving
    if (isActiveItem) {
      const draggableItem = activeData.vacancy;
      if (!draggableItem) return;

      const sourceItems = [...groups[sourceColStatus]];
      const targetItems = [...(groups[targetColStatus] || [])];

      //find the active el index in sortable context and the over item index
      const activeIndex = sourceItems.findIndex(
        (el) => el.id === draggableItem.id
      );

      const overItem: TVacancyShort | undefined = overData.vacancy;
      const overIndex: number = overItem
        ? targetItems.findIndex((el) => el.id === overItem.id)
        : targetItems.length;

      const newGroups: TGroupedVacancies = { ...groups };

      //in the same column
      if (sourceColStatus === targetColStatus) {
        if (
          activeIndex !== -1 &&
          overIndex !== -1 &&
          activeIndex !== overIndex
        ) {
          newGroups[sourceColStatus] = arrayMove(
            sourceItems,
            activeIndex,
            overIndex
          );
          updateGroups(newGroups);
        }
      } else {
        // Remove from source column
        newGroups[sourceColStatus] = sourceItems.filter(
          (item) => item.id !== draggableItem.id
        );
        newGroups[targetColStatus] = [
          ...targetItems.slice(0, overIndex),
          { ...draggableItem, status_id: targetColStatus },
          ...targetItems.slice(overIndex),
        ];
        startUpdVacancyStatus(
          draggableItem.id,
          draggableItem.name,
          targetColStatus,
          newGroups
        );
      }
    }
  };

  return {
    isLoading,
    handleDragStart,
    handleDragEnd,
    activeItem,
    groups: optimisticGroups,
  };
};
