import { getVacancy } from "@/actions/getData";
import StatusBadge from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatersIntl";
import { vacancyEpmpoymentDict, vacancyExperienceDict, vacancyPositionsDict, vacancyStatusDict, vacancyWorkFormatDict } from "@/shared/dictionaries";
import { vacancyBadgeColors } from "@/shared/dictionaries/badgeColors";
import CompanyOverview from "./vacancy_elmts/CompanyOverview";


const VacancyInfo = async ({ vacancyId }: { vacancyId: number }) => {

  const {
    name,
    status,
    salary_from,
    salary_to,
    location,
    experience,
    work_format,
    position,
    employment
  } = await getVacancy(vacancyId)
  console.log(work_format)
  return (
    <div>
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0 mb-6 flex items-start gap-4">
        {name || 'Имя не указано'}
        <StatusBadge className={cn(vacancyBadgeColors[status], 'text-xs py-0 px-1')}>
          {vacancyStatusDict[status]}
        </StatusBadge>
      </h2>
      <div className="flex gap-7 mb-12">
        <div className="text-base text-muted-foreground w-1/2">
          <h3 className="scroll-m-20 text-xl font-semibold text-foreground tracking-tight mb-2">
            {`от ${formatPrice(salary_from, "ru-Ru", "RUB")} до ${formatPrice(salary_to, 'ru-Ru', 'RUB')}`}
          </h3>
          <p>
            Локация: {location}
          </p>
          <p>
            Опыт: {experience ? vacancyExperienceDict[experience] : '-'}
          </p>
          <p>
            Формат работы: {work_format ? vacancyWorkFormatDict[work_format] : '-'}
          </p>
          <p>
            Позиция: {position ? vacancyPositionsDict[position] : '-'}
          </p>
          <p>
            Занятость: {employment ? vacancyEpmpoymentDict[employment] : '-'}
          </p>
        </div>
        <CompanyOverview className="w-1/2" />
      </div>
    </div>
  );
}

export default VacancyInfo;