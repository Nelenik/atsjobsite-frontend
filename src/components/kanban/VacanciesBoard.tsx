'use client'

import { vacancyStatusDict } from "@/shared/dictionaries";
import { EVacancyStatus, TVacancyShort } from "@/shared/types";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { FC, useCallback, useState } from "react";
import DndColumn from "./DndColumn";
import DndItem from "./DndItem";
import VacancyBoardCard from "../cards/VacancyBoardCard";
import { FunnelCard } from "../cards/FunnelCard";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { groupBy } from "@/lib/utils/groupBy";
import { sources } from "next/dist/compiled/webpack/webpack";
import { findItemStatus, hasDraggableData, isValidDragEvent } from "./helpers";

const columns = [
  {
    id: EVacancyStatus.SETTING,
    title: vacancyStatusDict[EVacancyStatus.SETTING]
  },
  {
    id: EVacancyStatus.WORK,
    title: vacancyStatusDict[EVacancyStatus.WORK]
  },
  {
    id: EVacancyStatus.WAIT,
    title: vacancyStatusDict[EVacancyStatus.WAIT]
  },
  {
    id: EVacancyStatus.PAUSE,
    title: vacancyStatusDict[EVacancyStatus.PAUSE]
  },
];

type TProps = {
  items: TVacancyShort[]
}


const VacanciesBoard: FC<TProps> = ({ items }) => {
  console.log('board items', items)
  //group received vacancies by status and used as initial state
  // const initGroups = groupBy(items, (el) => el.status)
  const [groups, setGroups] = useState<Record<string, TVacancyShort[]>>(() => groupBy(items, (el) => el.status))


  const [activeItem, setActiveItem] = useState<TVacancyShort | null>(null)

  console.log('board groups', groups)

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const activeVacancy = Object.values(groups)
      .flat()
      .find(vacancy => String(vacancy.id) === active.id) || null;

    setActiveItem(activeVacancy)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!isValidDragEvent(active, over)) return


    const isActiveItem = active.data.current?.type === 'item'
    const isOverItem = over?.data?.current?.type === 'item'
    const isOverColumn = over?.data?.current?.type === 'column'

    const sourceColStatus = findItemStatus(groups, String(active.id))
    const targetColStatus = isOverColumn ? String(over.id) : findItemStatus(groups, String(over?.id))
    if (!sourceColStatus || !targetColStatus) return

    if (isActiveItem) {
      const draggableItem = activeItem || Object.values(groups).flat().find(vac => String(vac.id) === active.id);
      if (!draggableItem) return


      if (isOverColumn) {
        setGroups(prev => {
          if (sourceColStatus === targetColStatus) return prev
          const sourceItems = [...prev[sourceColStatus]]
          const targetItems = [...(prev[targetColStatus] || [])]
          return {
            ...prev,
            [sourceColStatus]: sourceItems.filter((vac: TVacancyShort) => String(vac.id) !== active.id),
            [targetColStatus]: [...targetItems, { ...draggableItem, status: targetColStatus as EVacancyStatus }]
          }
        })
      } else if (isOverItem) {
        setGroups(prev => {

          const sourceItems = [...prev[sourceColStatus]]
          const targetItems = [...(prev[targetColStatus] || [])]

          const overIndex = over.data.current?.sortable.index ?? -1;

          //if move item between columns ant is is over other item
          if (sourceColStatus !== targetColStatus) {
            return {
              ...prev,
              [sourceColStatus]: sourceItems.filter(item => String(item.id) !== active.id),
              [targetColStatus]: [
                ...targetItems.slice(0, overIndex),
                { ...draggableItem, status: targetColStatus as EVacancyStatus },
                ...targetItems.slice(overIndex)
              ]
            }
          }

          const activeIndex = sourceItems.findIndex(item => String(item.id) === active.id)

          if (activeIndex === overIndex || overIndex === -1) return prev
          return {
            ...prev,
            [sourceColStatus]: arrayMove(sourceItems, activeIndex, overIndex)
          }
        })
      }
    }

    setActiveItem(null)
  }


  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    // console.log('onDragOverEvent', active)
    // console.log('onDragOverEvent', over)
  }, [])



  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      id="unique-dnd-context-id"
    >

      <div className="flex gap-4 w-full overflow-auto p-2 ">
        {columns.map((col) => (
          <div
            key={col.id}
            className={`flex flex-col gap-6 ring-2 ring-offset-4 rounded-lg ring-border w-1/4 min-w-[200px]`}
          >
            <FunnelCard
              name={col.title}
              count={groups[col.id]?.length || 0}
            />
            <DndColumn
              id={col.id}
              className="flex flex-col gap-2 grow"
            >
              <SortableContext items={(groups[col.id] || []).map(v => String(v.id))}>

                {(groups[col.id] || []).map((vacancy: TVacancyShort) => (
                  <DndItem
                    id={String(vacancy.id)}
                    key={vacancy.id}
                  >
                    <VacancyBoardCard
                      id={vacancy.id}
                      name={vacancy.name}
                      location={vacancy.location}
                      salary_from={vacancy.salary_from}
                      salary_to={vacancy.salary_to}
                    />
                  </DndItem>
                ))}
              </SortableContext>
            </DndColumn>
          </div>
        ))}
      </div>
      <DragOverlay>
        {activeItem && (
          <DndItem id={String(activeItem.id)}>
            <VacancyBoardCard
              id={activeItem.id}
              name={activeItem.name}
              location={activeItem.location}
              salary_from={activeItem.salary_from}
              salary_to={activeItem.salary_to}
            />
          </DndItem>
        )}
      </DragOverlay>

    </DndContext>
  );
}

export default VacanciesBoard;