'use client'

import { vacancyStatusDict } from "@/shared/dictionaries";
import { EVacancyStatus, TVacancyShort } from "@/shared/types";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { FC, useCallback, useState } from "react";
import DndColumn from "./DndColumn";
import DndItem from "./DndItem";
import VacancyBoardCard from "../cards/VacancyBoardCard";
import { FunnelCard } from "../cards/FunnelCard";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

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
  vacancyGroups: Record<string, TVacancyShort[]>
}

const VacanciesBoard: FC<TProps> = ({ vacancyGroups }) => {

  const sensors = useSensors(
    useSensor(PointerSensor),
    // useSensor(KeyboardSensor)
  );

  const [groups, setGroups] = useState(vacancyGroups)

  const [activeId, setActiveId] = useState<string | null>(null)

  //find active vacancy for overlay
  const activeVacancy = activeId ? Object.values(groups)
    .flat()
    .find(vacancy => String(vacancy.id) === activeId) : null


  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(String(active.id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const sourceStatus = Object.keys(groups).find(status =>
      groups[status].some(vac => String(vac.id) === active.id)
    );
    const targetStatus = over.id
    if (!sourceStatus || sourceStatus === targetStatus) return

    setGroups(prev => {
      const vacancy = prev[sourceStatus].find((vac: TVacancyShort) => String(vac.id) === activeId)
      if (!vacancy) return prev

      return {
        ...prev,
        [sourceStatus]: prev[sourceStatus].filter((vac: TVacancyShort) => vac.id !== vacancy.id),
        [targetStatus]: [...(prev[targetStatus] || []), vacancy]
      }
    })

    setActiveId(null)
  }

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    console.log('onDragOverEvent', active)
    console.log('onDragOverEvent', over)
  }, [])



  return (
    <DndContext
      sensors={sensors}
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
      </DragOverlay>
    </DndContext>
  );
}

export default VacanciesBoard;