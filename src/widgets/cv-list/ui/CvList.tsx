'use client'

import { useInfiniteScroll } from "../model/useInfiniteScroll";
import { Loader } from "@/shared/ui/Loader";
import List from "@/shared/ui/shadcn/list";
import { CvCard } from "@/entities/cv";
import { EditEntity } from "@/features/mutate-entity";
import { CvListSkeleton } from "@/shared/ui/skeletons/CvListSkeleton";
// import { CV_PER_PAGE } from "@/shared/api/constants";
// import { ScrollUpBtn } from "@/shared/ui/buttons/ScrollUpBtn";
import { Button } from "@/shared/ui/shadcn/button";
import { cn } from "@/shared/lib/utils";

export const CvList = () => {
  const {
    resumeList,
    isLoading,
    firstElementRef,
    lastElementRef,
    isFetchingNextPage,
    isFetchingPreviousPage,
    scrollToElementRef,
    indexTo,
    resetToFirstPage
  } = useInfiniteScroll()

  if (isLoading) {
    return (
      <CvListSkeleton />
    )
  }

  return (
    <div className="self-start grow pb-10">
      <Button
        className={cn(
          "h-[unset] py-1 bg-muted-foreground/75 text-xs fixed bottom-4 right-4 z-10",
          'hover:bg-muted-foreground'
        )}
        onClick={resetToFirstPage}
      >на первую</Button>
      <div
        ref={firstElementRef}
        data-id="topBoundary"
        className="relative"
      >
        {isFetchingPreviousPage && <Loader />}
      </div>
      <List className="flex flex-col gap-4">
        {resumeList.map((resume, index) => {
          return (
            <li
              ref={index === indexTo ? scrollToElementRef : null}
              key={resume.id}
              className="text-lg w-[min(100%,850px)] mx-auto relative"
            >
              <CvCard resume={resume} />
              <EditEntity
                entityType="cv"
                triggerView="icon"
                initialData={resume}
                className="absolute right-0 top-0"
              />
            </li>
          )
        })}
      </List>
      <div
        ref={lastElementRef}
        data-id="bottomBoundary"
        className="relative min-h-3"
      >
        {isFetchingNextPage && <Loader />}
      </div>
    </div>
  );
}
