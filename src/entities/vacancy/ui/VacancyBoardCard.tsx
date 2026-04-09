'use client'
import Link from "next/link";
import { FC } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { formatSalaryRange } from "@/shared/lib/formatters/formatSalaryRange";
import { Card, CardHeader, CardTitle } from "@/shared/ui/shadcn/card";
import { TVacancyShort } from "@/shared/api/types";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { getDaysSinceCreated } from "@/shared/lib/date_time/getDaysSinceCreated";
import { encodeSegment } from "@/shared/lib/encodeSegments";

type TProps = Omit<TVacancyShort, 'status_id' | 'status'>

export const VacancyBoardCard: FC<TProps> = ({ id, name, location, salary_from, salary_to, created_at }) => {
  const pathname = usePathname()

  const daysInProcessing = getDaysSinceCreated(created_at)
  const isNew = daysInProcessing < 1
  const daysString = isNew ? 'New' : `${daysInProcessing} ${daysInProcessing === 1 ? 'day' : 'days'}`;
  const color = isNew ? '#34d399' : '#3b82f6'

  return (
    <Link href={`${pathname}/${id}/${encodeSegment(name)}`}>
      <Card
        className={cn(
          'w-full py-4 pr-6 pl-7 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 relateive'
        )}
      >
        <StatusBadge
          color={color}
          className={cn("absolute top-1 right-1 px-1 text-[10px] border-none", isNew && 'animate-pulse text-[12px]')}
        >
          {daysString}
        </StatusBadge>
        <CardHeader className="p-0">
          <CardTitle className="text-base hyphens-auto [overflow-wrap:anywhere]">{name ?? 'Unknown name'}</CardTitle>
        </CardHeader>
        <p className="leading-7 text-muted-foreground">
          {location || 'City unknown'}
        </p>
        <p className="leading-7 text-muted-foreground">
          {formatSalaryRange(salary_from, salary_to)}
        </p>
      </Card>
    </Link>
  );
}
