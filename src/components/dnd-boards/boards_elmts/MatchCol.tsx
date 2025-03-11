'use client'
import { CandidateCard } from "@/components/cards/CandidateCard";
import { FunnelCard } from "@/components/cards/FunnelCard";
import DndDroppable from "@/components/dnd/DndDroppable";
import DndSortable from "@/components/dnd/DndSortable";
import { TCandidateShort } from "@/shared/types";
import { SortableContext } from "@dnd-kit/sortable";
import { FC, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type TProps = {
  status: string,
  status_id: number
  title: string
  isLoading?: boolean
  candidates: TCandidateShort[] | null
  className: string
}

const MatchCol: FC<TProps> = ({ status, status_id, title, isLoading = false, candidates, className }) => {

  const candidatesIds = useMemo(() => (candidates || []).map(candy => String(candy.id)), [candidates])

  return (
    <div className={cn(`flex flex-col gap-6 ring-2 ring-offset-4 rounded-lg ring-border  min-w-[256px] bg-background`, className)}>
      <FunnelCard
        name={title}
        isLoading={isLoading}
        count={candidates?.length || 0}
      />
      <div
        className="flex flex-col gap-2 grow"
      >
        <ScrollArea
          className="h-[clamp(500px,65vh,800px)] px-2"
        >
          {
            isLoading
              ? <p className="text-muted-foreground text-sm text-center">Loading...</p>
              :
              <SortableContext items={candidatesIds}>
                {(candidates || [])?.map((candidate) => (
                  <DndSortable
                    sortableId={candidate.id}
                    key={candidate.id}
                    dndData={{ type: "match_item", candidate, status, status_id }}
                  >
                    <CandidateCard
                      id={candidate.id}
                      name={candidate.name}
                      city={candidate.city}
                      salary={candidate.salary}
                      rating={candidate.match_point}
                    />
                  </DndSortable>
                ))}
              </SortableContext>
          }
        </ScrollArea>
      </div>
    </div>
  );
}

export default MatchCol;