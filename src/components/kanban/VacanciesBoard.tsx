'use client'

import { vacancyStatusDict } from "@/shared/dictionaries";
import { EVacancyStatus, TVacancyShort } from "@/shared/types";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { FC, useCallback, useState } from "react";
import DndColumn from "./DndColumn";
import DndItem from "./DndItem";
import VacancyBoardCard from "../cards/VacancyBoardCard";
import { Card } from "../ui/card";
import { FunnelCard } from "../cards/FunnelCard";
import { createPortal } from "react-dom";
import { SortableContext } from "@dnd-kit/sortable";

const vacanciesStatuses = [
  {
    id: "3d58de36-73d7-418f-82c9-9b674cfe172d",
    value: EVacancyStatus.SETTING,
    order: 1,
  },
  {
    id: "7ce14132-cd8d-40f6-bb5b-77caf3e70abd",
    value: EVacancyStatus.WORK,
    order: 2,
  },
  {
    id: "f2c900ec-63fd-4e31-945e-a12cfecb8125",
    value: EVacancyStatus.WAIT,
    order: 3,
  },
  {
    id: "148f9446-4339-44b5-b5cb-301c32bc5582",
    value: EVacancyStatus.PAUSE,
    order: 4,
  },
];

type TProps = {
  vacancyGroups: Record<string, TVacancyShort[]>
}

const VacanciesBoard: FC<TProps> = ({ vacancyGroups }) => {

  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   // useSensor(KeyboardSensor)
  // );

  const [columns, setColumns] = useState(vacanciesStatuses)

  const [groups, setGroups] = useState(vacancyGroups)

  const [activeId, setActiveId] = useState<string | null>(null)

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    setActiveId(String(active.id))
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    console.log(active)
    console.log(over)
  }, [])

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    console.log('ondragover', active)
    console.log('ondragover', over)
  }, [])

  const activeVacancy = activeId ? Object.values(groups)
    .flat()
    .find(vacancy => String(vacancy.id) === activeId) : null


  return (
    <DndContext
      // sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >

      <div className="flex gap-4 w-full overflow-auto p-2 ">
        {columns.map((el) => (
          <div
            key={el.id}
            className={`flex flex-col gap-6 ring-2 ring-offset-4 rounded-lg ring-border w-[calc(100%/${columns.length})] min-w-[200px]`}
          >
            <FunnelCard
              name={vacancyStatusDict[el.value]}
              count={groups[el.value]?.length || 0}
            />
            <DndColumn
              id={el.id}
              className="flex flex-col gap-2 grow"
            >
              <SortableContext items={(groups[el.value] || []).map(v => String(v.id))}>

                {(groups[el.value] || []).map((vacancy: TVacancyShort) => (
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
          <VacancyBoardCard
            id={activeVacancy.id}
            name={activeVacancy.name}
            location={activeVacancy.location}
            salary_from={activeVacancy.salary_from}
            salary_to={activeVacancy.salary_to}
          />
        )}
      </DragOverlay>
      {/* {createPortal(

      )} */}
    </DndContext>
  );
}

export default VacanciesBoard;