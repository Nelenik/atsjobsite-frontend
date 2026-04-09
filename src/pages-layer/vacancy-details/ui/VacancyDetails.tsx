'use client'
import { vacancyEpmpoymentDict, vacancyExperienceDict, VacancyForm, vacancyPositionsDict, vacancyWorkFormatDict } from "@/entities/vacancy";
import { TVacancy } from "@/shared/api/types";
import { formatPrice } from "@/shared/lib/formatters/formatersIntl";
import { filterFalsyFields } from "@/shared/lib/object_manipulations/filterFalsyFields";
import { EditButton } from "@/shared/ui/buttons/EditButton";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { useState } from "react";
import CompanyOverview from "./CompanyOverview";
import { TextFormatter } from "@/shared/ui/TextFormatter";
import { cn } from "@/shared/lib/utils";
import { CollapsibleSummary } from "@/shared/ui/Summary";

export const VacancyDetails = ({ vacancy }: { vacancy: TVacancy }) => {
  const [isEdit, setIsEdit] = useState(false)
  const {
    name,
    status,
    salary_from,
    salary_to,
    location,
    experience,
    work_format,
    position,
    employment,
    skills,
    responsibilities,
    conditions,
    description,
    summary
  } = vacancy

  const hideForm = () => setIsEdit(false)

  const showForm = () => setIsEdit(true)

  if (isEdit) {
    return (
      <>
        <h2 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0 mb-6">
          Edit vacancy
        </h2>
        <VacancyForm
          type="edit"
          initialData={filterFalsyFields(vacancy)}
          onSuccess={hideForm}
          onCancel={hideForm}
        />
      </>

    )
  }
  return (

    <div className="@container">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0 mb-6 flex items-start gap-4">
        <span className="inline-block w-[min(500px,_75%)] hyphens-auto [overflow-wrap:anywhere]">
          {name || 'Name not specified'}

        </span>
        <StatusBadge color={status.color} className={cn(
          'text-xs py-0 px-1 shrink-0'
        )}>
          {status.name}
        </StatusBadge>
        <EditButton onClick={showForm} isIconView={true} />
      </h1>
      <CollapsibleSummary
        title="Vacancy summary"
        summary={summary}
        // defaultOpen={true}
        className=" p-4 mb-6 italic  ring-1 rounded-md "
      />
      <div className={cn(
        "flex flex-col gap-7 mb-8",
        '@2xl:flex-row'
      )}>
        <div className={cn(
          "text-base text-muted-foreground",
          '@2xl:w-1/2'
        )}>
          <h2 className="scroll-m-20 text-xl font-semibold text-foreground tracking-tight mb-2">
            {`from ${formatPrice(salary_from, "en-US", "USD")} to ${formatPrice(salary_to, 'en-US', 'USD')}`}
          </h2>
          <p>
            Location: {location}
          </p>
          <p>
            Experience: {experience ? vacancyExperienceDict[experience] : '-'}
          </p>
          <p>
            Work format: {work_format ? vacancyWorkFormatDict[work_format] : '-'}
          </p>
          <p>
            Position: {position ? vacancyPositionsDict[position] : '-'}
          </p>
          <p>
            Employment: {employment ? vacancyEpmpoymentDict[employment] : '-'}
          </p>
        </div>
        <CompanyOverview className="@2xl:w-1/2" />
      </div>
      <div className={cn(
        "grid grid-cols-1 gap-x-7 gap-y-8 text-base text-muted-foreground",
        '@2xl:grid-cols-2'
      )}>
        <section>
          <h3 className="text-lg text-foreground font-semibold mb-4">
            Requirements
          </h3>
          <TextFormatter text={skills || 'No info'} />
          <h3 className="text-lg text-foreground font-semibold mb-4">
            Responsibilities
          </h3>
          <TextFormatter text={responsibilities || 'No info'} />
        </section>
        <section>
          <h3 className="text-lg text-foreground font-semibold mb-4">
            Conditions
          </h3>
          <TextFormatter text={conditions || 'No info'} />
        </section>
        <section>
          <h3 className="text-lg text-foreground font-semibold mb-4">
            Additional
          </h3>
          <TextFormatter text={description || 'No info'} />
        </section>
      </div>

    </div>
  );
}
