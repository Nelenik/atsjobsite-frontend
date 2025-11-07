import { cn } from "@/shared/lib/utils";
import List from "@/shared/ui/shadcn/list";
import { TPublicVacancy } from "@/shared/api/types";
import { RekruVacancyCard } from "@/entities/vacancy";

type TProps = {
  className?: string
  publicVacanciesList: TPublicVacancy[]
}
export const PubVacancyList = ({
  className,
  publicVacanciesList
}: TProps) => {

  return (
    <List
      className={cn(
        'w-full flex flex-col gap-5',
        className
      )}
    >
      {publicVacanciesList.map(vacEl => (
        <li key={vacEl.id}>
          <RekruVacancyCard vacancy={vacEl} />
        </li>
      ))}
    </List>
  );
}