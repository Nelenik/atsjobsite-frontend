import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/shadcn/card";
import List from "@/shared/ui/shadcn/list";

export const PubVacancySkeleton = () => {
  return (
    <Card className={cn('flex flex-col gap-4 p-8 rounded-3xl border border-border animate-pulse')}>
      <div
        className={cn(
          'flex gap-4 sm:gap-8 justify-between flex-wrap'
        )}
      >
        <p
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-[80px]"
        > </p>
        <span
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-[80px]"
        > </span>
      </div>

      <h3
        className={cn(
          'w-full max-w-[635px] h-7 bg-gray-200 dark:bg-gray-700 rounded-xl'
        )}
      ></h3>

      <div className="flex flex-col gap-2">
        <p className="h-4 bg-gray-200 dark:bg-gray-700 w-[146px] rounded-md"></p>
        <p className="flex gap-2 items-center ">
          <span className="w-16 rounded-md h-4 bg-gray-200 dark:bg-gray-700"></span>
          <span className="text-gray-200">•</span>
          <span className="w-16 rounded-md h-4 bg-gray-200 dark:bg-gray-700"></span>
        </p>
        <p className="flex gap-2 items-center ">
          <span className="w-16 rounded-md h-4 bg-gray-200 dark:bg-gray-700"></span>
          <span className="text-gray-200">•</span>
          <span className="w-16 rounded-md h-4 bg-gray-200 dark:bg-gray-700"></span>
          <span className="text-gray-200">•</span>
          <span className="w-16 rounded-md h-4 bg-gray-200 dark:bg-gray-700"></span>
        </p>
      </div>
      <div className="flex justify-between gap-2 flex-wrap items-center">
        <span className="w-[170px] mr-4 h-4 rounded-md bg-gray-200 dark:bg-gray-700"></span>
        <span className="w-[234px] h-12 rounded-xl bg-gray-200 dark:bg-gray-700"></span>
      </div>
    </Card>
  );
}


export const PubVacancyListSkeleton = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="px-5 flex items-center flex-wrap justify-between gap-2 ">
        <span className="w-[174px] h-4 rounded-md bg-gray-200 dark:bg-gray-700 mr-4"></span>
        <span className="w-[120px] h-4 rounded-md bg-gray-200 dark:bg-gray-700"></span>
      </div>
      <List className="flex flex-col gap-4 w-full">
        {Array.from({ length: 10 }, (_, i) => (
          <li key={i} className="w-full">
            <PubVacancySkeleton />
          </li>
        ))}
      </List>
    </div>
  );
}