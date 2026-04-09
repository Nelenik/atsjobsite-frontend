import { RekruVacancyCard } from "@/entities/vacancy";
import { TPublicVacancy } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type TProps = {
  topList: TPublicVacancy[]
}
export const TopVacancies = ({
  topList
}: TProps) => {
  return (
    <>
      <h2 className={cn(
        'mb-5 md:mb-10 text-3xl font-semibold tracking-tighter text-center',
        'lg:text-5xl'
      )}>
        Top vacancies from Rekru.ru
      </h2>

      <div className="flex flex-col gap-5">
        <ul className="flex flex-col gap-5">
          {topList.map(vacancy => (
            <li key={vacancy.id}>
              <RekruVacancyCard vacancy={vacancy} />
            </li>
          ))}
        </ul>
        <Button
          variant={'ghost'}
          asChild
        >
          <Link
            href={`/vacancies`}
            className={cn(
              "flex gap-3 items-center text-base font-medium leading-tight",
              "[&:hover_svg]:translate-x-3"
            )}
          >
            View all vacancies
            <ChevronRight className="transition-transform" />
          </Link>
        </Button>
      </div>

    </>
  );
}