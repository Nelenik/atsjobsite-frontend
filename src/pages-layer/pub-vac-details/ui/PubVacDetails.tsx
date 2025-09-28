import { TPublicVacancy } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { VacancyParams } from "./VacancyParams";
import { CompanyInfoCard } from "@/entities/company/ui/CompanyInfoCard";
import { GoBackLink } from "@/shared/ui/GoBackLink";
import { VacancyDescription } from "./VacancyDescription";
import { MobileMenu } from "@/widgets/rekru-nav";

type TProps = {
  vacancy: TPublicVacancy;
  className?: string
}
export const PubVacDetails = ({
  vacancy
}: TProps) => {
  const {
    name,
    salary_from,
    salary_to,
    location,
    experience,
    work_format,
    employment,
    skills,
    responsibilities,
    conditions,
    addition,
    description,
    company,
    link,
    level
  } = vacancy

  return (
    <>
      <section className={cn(
        "py-4 bg-background sticky top-0 z-[100]",
        'md-lg:static md-lg:py-8'
      )}>
        <div className="rekru-container flex items-center justify-between gap-20 ">
          <GoBackLink
            className='p-0'
            text='Назад к списку вакансий'
          />
          <MobileMenu
            className="md-lg:hidden md-lg:invisible"
          />
        </div>
      </section>
      <section className="py-5 md-lg:pb-8 md-lg:pt-0">
        <div className="rekru-container grid gap-8 grid-cols-12">
          <div className={cn("col-span-7 w-full flex flex-col gap-10")} >
            <VacancyParams
              level={level}
              name={name}
              link={link}
              salary_from={salary_from}
              salary_to={salary_to}
              location={location}
              work_format={work_format}
              experience={experience}
              employment={employment}
            />
            <VacancyDescription
              description={description}
              skills={skills}
              responsibilities={responsibilities}
              conditions={conditions}
              addition={addition}
            />
          </div>
          <CompanyInfoCard
            {...company.name && { company: company }}
            sourceLink={link}
            className='col-span-5 self-start'
          />
        </div>
      </section>
    </>


  );
}
