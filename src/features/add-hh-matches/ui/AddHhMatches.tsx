'use client'

import { SheetModal } from "@/shared/ui/modals/SheetModal";
import { HhMatchForm } from "./HhMatchForm";
import { Button } from "@/shared/ui/shadcn/button";
import { cn } from "@/shared/lib/utils";
import { cvSource } from "@/entities/cv/lib/dictionary";

type TProps = {
  className?: string
  vacancyId: string | number
  vacancyName: string
}
export const AddHhMatches = ({
  className,
  vacancyId,
  vacancyName
}: TProps) => {


  return (
    <SheetModal
      className="overflow-visible w-[min(100%,600px)] pb-16"
      renderContent={({ closeSheetModal }) => (

        <HhMatchForm
          // ref={formRef}
          vacancyId={vacancyId}
          vacancyName={vacancyName}
          onSuccess={closeSheetModal}
          className="text-base"
        />

      )}
    >
      {{
        trigger: <Button
          className={cn('[&_svg]:size-6', className)}
        >
          {<cvSource.hh.HunterIcon
            className="h-[2cap]"
          />}
          {`Matches from ${cvSource.hh.name}`}
          {/* <HunterSvg />
          Мэтчи c hh.ru */}
        </Button>,
        title: 'Filters on hh.ru',
        description: 'Filters for searching resumes on hh.ru'
      }}
    </SheetModal>
  );
}