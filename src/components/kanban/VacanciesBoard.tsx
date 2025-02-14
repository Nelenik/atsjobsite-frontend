'use client'

import { vacancyStatusDict } from "@/shared/dictionaries";
import { EVacancyStatus, TVacancyShort } from "@/shared/types";
import { Active, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, Over, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { FC, useCallback, useEffect, useState } from "react";
import DndColumn from "./DndColumn";
import DndItem from "./DndItem";
import VacancyBoardCard from "../cards/VacancyBoardCard";
import { FunnelCard } from "../cards/FunnelCard";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { groupBy } from "@/lib/utils/groupBy";
import { sources } from "next/dist/compiled/webpack/webpack";

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

const hasDraggableData = (entry: Active | Over) =>
  entry?.data?.current?.type === 'column' || entry?.data?.current?.type === 'item';


const VacanciesBoard: FC<TProps> = ({ items }) => {

  //group received vacancies by status and used as initial state
  const [groups, setGroups] = useState<Record<string, TVacancyShort[]>>(groupBy(items, (el) => el.status))
  const [activeItem, setActiveItem] = useState<TVacancyShort | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const activeVacancy = Object.values(groups)
      .flat()
      .find(vacancy => String(vacancy.id) === active.id) || null;

    setActiveItem(activeVacancy)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || !over.data.current) return
    if (over.id === active.id) return
    if (!hasDraggableData(active)) return

    const isActiveItem = active.data.current?.type === 'item'
    const isOverItem = over?.data?.current?.type === 'item'
    const isOverColumn = over?.data?.current?.type === 'column'

    if (isActiveItem && isOverColumn) {
      setGroups(prev => {
        const sourceStatus = activeItem?.status
        if (!sourceStatus || sourceStatus === over.id) return prev
        if (!activeItem) return prev

        return {
          ...prev,
          [sourceStatus]: prev[sourceStatus].filter((vac: TVacancyShort) => String(vac.id) !== active.id),
          [over.id]: [...(prev[over.id] || []), { ...activeItem, status: over.id as EVacancyStatus }]
        }
      })
    }

    if (isActiveItem && isOverItem) {
      setGroups(prev => {
        const sourceStatus = activeItem?.status
        const overStatus = Object.keys(prev).find(status =>
          prev[status].some(vac => String(vac.id) === over.id)
        );

        if (!sourceStatus || !overStatus || !activeItem) return prev;

        const sourceItems = [...prev[sourceStatus]]
        const targetItems = [...prev[overStatus]]

        const overIndex = over.data.current?.sortable.index

        //if move item between columns ant is is over other item
        if (sourceStatus !== overStatus) {
          return {
            ...prev,
            [sourceStatus]: sourceItems.filter(item => String(item.id) !== active.id),
            [overStatus]: [
              ...targetItems.slice(0, overIndex),
              { ...activeItem, status: overStatus as EVacancyStatus },
              ...targetItems.slice(overIndex)
            ]
          }
        }

        //delete active item from its postion
        const newItems = sourceItems.filter(item => String(item.id) !== active.id)
        return {
          ...prev,
          [sourceStatus]: [
            ...newItems.slice(0, overIndex),
            { ...activeItem },
            ...newItems.slice(overIndex)
          ]
        }
      })
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

      {/* <DragOverlay>
        {activeVacancy && (
          <DndItem id={String(activeVacancy.id)}>
            <VacancyBoardCard
              id={activeVacancy.id}
              name={activeVacancy.name}
              location={activeVacancy.location}
              salary_from={activeVacancy.salary_from}
              salary_to={activeVacancy.salary_to}
            />
          </DndItem>
        )}
      </DragOverlay> */}
    </DndContext>
  );
}

export default VacanciesBoard;