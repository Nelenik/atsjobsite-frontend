import { TPublicVacancy } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/shadcn/card";
import { TextFormatter } from "@/shared/ui/TextFormatter";
import { Fragment } from "react";

type TProps = {
  className?: string,
  vacancy: TPublicVacancy
}
export const RekruVacancyDescription = ({
  className,
  vacancy
}: TProps) => {
  const {
    skills = '',
    responsibilities = '',
    conditions = '',
    addition = '',
  } = vacancy
  const vacancyCharacteristics: { title: string, content: string }[] = [
    {
      title: 'Задачи',
      content: responsibilities,
    },
    {
      title: 'Требования',
      content: skills,
    },
    {
      title: 'Условия',
      content: conditions,
    },
    {
      title: 'Дополнительно',
      content: addition,
    }
  ]
  return (
    <Card
      className={cn("p-4 sm:p-8 flex flex-col gap-5 rounded-3xl", className)}
    >
      {vacancyCharacteristics.map((item) => (
        <Fragment key={item.title}>
          {item.content && <div
          >
            <h3 className="text-base text-foreground font-semibold mb-5">
              {item.title}
            </h3>
            <TextFormatter text={item.content} className="text-foreground text-base [&_p]:mb-0" />
          </div>}
        </Fragment>
      ))}
    </Card>
  );
}