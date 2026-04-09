'use client'
import { TPublicVacancy } from "@/shared/api/types";
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/shadcn/card";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { vacancyEpmpoymentDict, vacancyExperienceDict, vacancyWorkFormatDict } from "../lib/dictionary";
import { formatSalaryRange } from "@/shared/lib/formatters/formatSalaryRange";
import { CollapsibleDescription } from "./CollapsibleDescription";


type TProps = {
  className?: string
  vacancy: TPublicVacancy
}
export const RekruVacancyCard = ({
  className,
  vacancy
}: TProps) => {
  const { id, company, name, salary_from, salary_to, location, employment, work_format, experience, level, description, publication_at } = vacancy

  const normalizedDate = publication_at ? format(new Date(publication_at), "d MMMM yyyy", { locale: enUS }) : 'Publication date unknown';

  const normalizedWorkFormat = capitalizeSentences(
    work_format
      ? vacancyWorkFormatDict[work_format || ''] || work_format
      : 'Work format'
  )

  const normalizedExperience = capitalizeSentences(
    experience
      ? vacancyExperienceDict[experience || ''] || experience
      : "Experience"
  )
  const normalizedEmployment = capitalizeSentences(employment ? vacancyEpmpoymentDict[employment || ''] || employment : "Employment")

  const normalizedSalary = (Number.isFinite(salary_from) || Number.isFinite(salary_to))
    ? `${formatSalaryRange(salary_from || 0, salary_to || 0)} / month`
    : 'By agreement';

  const normalizedLocation = capitalizeSentences(location ? location : 'City')
  const normalizedGrade = capitalizeSentences(level || 'no grade')

  return (
    <Card className={cn('flex flex-col gap-4 p-8 rounded-3xl border border-border', className)}>
      <div
        className={cn(
          'flex gap-4 sm:gap-8 justify-between flex-wrap'
        )}
      >
        <p
          className="text-base font-medium leading-tight tracking-tight"
        >
          {company.name || 'Company'}
        </p>
        <span
          className="text-accent2/40 text-base leading-tight tracking-tight"
        >
          {normalizedDate}
        </span>
      </div>

      <h3
        className={cn(
          'w-full max-w-[635px]',
          "text-xl lg:text-[28px] leading-[110%] font-medium lg:tracking-tighter hyphens-auto [overflow-wrap:anywhere]"
        )}
      >
        {name}
      </h3>

      <div className="flex flex-col gap-2 text-base leading-tight tracking-tight">
        <p className="font-medium">{normalizedSalary}</p>
        <p className="flex gap-2 items-center">
          <span>{normalizedLocation}</span>
          <span>•</span>
          <span>{normalizedEmployment}</span>
        </p>
        <p className="flex gap-2 items-center">
          <span>{normalizedWorkFormat}</span>
          <span>•</span>
          <span>{normalizedExperience}</span>
          <span>•</span>
          <span>{normalizedGrade}</span>
        </p>
      </div>

      <CollapsibleDescription description={description} vacancyId={String(id)} vacancyName={name} />

    </Card>
  );
}