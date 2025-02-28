import { CandidateCard } from "@/components/cards/CandidateCard";
import { FunnelCard } from "@/components/cards/FunnelCard";
import { cn } from "@/lib/utils";
import { TCandidateShort } from "@/shared/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FC } from "react";

type TProps = {
  title: string
  candidates: TCandidateShort[] | null
  className: string
}
const MatchColAbstraction: FC<TProps> = ({
  title, candidates, className
}) => {
  return (
    <div className={cn(`flex flex-col gap-6 ring-2 bg-background ring-offset-4 rounded-lg ring-border  min-w-[256px]`, className)}>
      <FunnelCard
        name={title}
        count={candidates?.length || 0}
      />
      <div
        className="flex flex-col gap-2 grow"
      >
        <ScrollArea
          className="h-[clamp(500px,65vh,800px)] px-2"
        >
          {(candidates || [])?.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              id={candidate.id}
              name={candidate.name}
              city={candidate.city}
              salary={candidate.salary}
              rating={candidate.match_point}
            />
          ))}

        </ScrollArea>
      </div>
    </div>
  );
}

export default MatchColAbstraction;