'use client'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { TCandidateShort, TMatchStatus, TVacancyEdit } from "@/shared/types";
import MatchCol from "./boards_elmts/MatchCol";
import { FC, useMemo, useState, useTransition } from "react";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import DndSortable from "../dnd/DndSortable";
import { CandidateCard } from "../cards/CandidateCard";
import MatchColAbstraction from "./boards_elmts/MatchColAbstraction";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { TStatus } from "@/shared/types/statuses";
import { useOptimisticUpdateMatch } from "@/hooks/useOptimisticUpdateMatch";
import { updateVacancy } from "@/actions/updateData";
import convertToFormData from "@/lib/utils/convertToFormData";

type TProps = {
  matchBoardData: TVacancyEdit
  // match_statuses: TMatchStatus[]
}

//actions over columns
// const ACTIONS = {
//   MOVE_COLUMN: 'move_column',
//   ADD_COLUMN: 'add_column',
//   REMOVE_COLUMN: 'remove_column',
//   RESET_COLUMNS: 'reset_columns'
// };

// const columnsReducer = (columnsState, action) => {

// }

// const useMatchBoardsColumns = (matchStatuses:TMatchStatus[]) => {
//   //sort match statuses by rank to get right columns order
//   const initColumns = matchStatuses.toSorted((a, b) => a.rank - b.rank).map(el => el.status)

//   const [columns, setColumns] = useState(initColumns)
//   //transition to update column position
//   const [isPending, startTransition] = useTransition();


// }

const MatchBoard: FC<TProps> = ({ matchBoardData }) => {
  const { matchStatuses, id: vacancyId, ...vacancyData } = matchBoardData

  //sort match statuses by rank to get right columns order
  const initColumns = matchStatuses.toSorted((a, b) => a.rank - b.rank).map(el => el.status)

  const [columns, setColumns] = useState(initColumns)

  const columnsIds = useMemo(() => columns.map(col => col.id), [columns])

  //activeColumn and acitveItem state for DndOverlay
  const [activeColumn, setActiveColumn] = useState<TStatus | null>(null)

  const [activeItem, setActiveItem] = useState<TCandidateShort | null>(null);

  // update match hook
  const { startMatchUpd } = useOptimisticUpdateMatch(activeItem?.id)

  //transition to update column position
  const [isPending, startTransition] = useTransition();

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const data = active.data.current;
    if (data?.type === 'match_item') {

      const activeItem = data.candidate || null
      setActiveItem(activeItem)
    } else if (data?.type === 'match_column') {
      const activeColumn = data.column || null
      setActiveColumn(activeColumn)
    }

  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null)
    setActiveItem(null)
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const activeData = active.data.current;
    const overData = over.data.current;
    if (!activeData || !overData) return

    //Ccheck active element and over zone
    const isActiveItem = activeData.type === "match_item";
    const isActiveColumn = activeData.type === "match_column"
    const isOverItem = overData.type === "match_item";
    const isOverColumn = overData.type === "match_column";

    // If there is no active element, stop dragging
    if (!isActiveItem && !isActiveColumn) return;

    if (isActiveItem) {

      const initialStatusId: number = activeData.status_id;
      let targetStatusId!: number;
      if (isOverColumn) {
        targetStatusId = overData.column.id
      } else if (isOverItem) {
        targetStatusId = overData.status_id
      }

      startMatchUpd(targetStatusId, initialStatusId)
    } else if (isActiveColumn) {

      const prevColumns = [...columns];

      // Вычисляем новый порядок колонок
      const activeColIndex = columns.findIndex(col => col.id === active.id);
      const overColIndex = columns.findIndex(col => col.id === over.id);
      const newColumns = arrayMove(columns, activeColIndex, overColIndex);
      console.log("newCol", newColumns)

      // Обновляем состояние
      setColumns(newColumns);

      // Используем новый порядок для обновления на сервере
      startTransition(async () => {
        const { error } = await updateVacancy(
          vacancyId,
          null,
          convertToFormData({
            ...vacancyData,
            matchStatuses: newColumns.map(el => el.id)
          })
        );

        if (error) {
          setColumns(prevColumns);
        }
      });
    }
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      id="matchboard-context-id"
    >
      <ScrollArea className="pb-4">
        <div className="flex gap-4 w-full p-2 ">

          <SortableContext items={columnsIds}>

            {columns.map((col, index) => (
              <DndSortable
                key={col.id}
                sortableId={col.id}
                dndData={{ type: "match_column", column: col }}
              >
                <MatchCol
                  status_id={col.id}
                  title={col.name}
                  className={cn(`w-1/${columns.length}`)}
                />
              </DndSortable>
            ))}
          </SortableContext>


        </div>
        <ScrollBar orientation="horizontal" className="bg-input/30 h-4 cursor-pointer" />
      </ScrollArea>

      <DragOverlay dropAnimation={{ easing: 'linear' }}>
        {
          activeColumn && (
            <MatchColAbstraction
              title={activeColumn.name}
              status_id={activeColumn.id}
              className={`w-1/${columns.length}`}
            />
          )
        }
        {activeItem && (
          <div className="relative cursor-grabbing ring-2 rounded-lg ring-offset-2">
            <GripVertical className="absolute left-1 top-2 z-[100] stroke-muted-foreground" />
            <CandidateCard
              id={activeItem.id}
              name={activeItem.name}
              city={activeItem.city}
              salary={activeItem.salary}
              rating={activeItem.match_point}
            />
          </div>
        )}

      </DragOverlay>
    </DndContext>
  );
}

export default MatchBoard;