'use client'
// import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn/button";
import { Dialog, DialogTitle, DialogContent, DialogTrigger } from "@/shared/ui/shadcn/dialog";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { getSpecialization } from "../api/getSpecialization";
import { MultilevelCheckbox } from "@/shared/ui/form-elements/multilevel-checkbox";
import { cn } from "@/shared/lib/utils";
import { ScrollArea, ScrollBar } from "@/shared/ui/shadcn/scroll-area";

type TProps = {
  onSave?: () => void
}
export const SpecializationModal = ({
  onSave = () => { }
}: TProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [values, setValues] = useState<string[]>([])

  const { data = [] } = useQuery({
    queryKey: ['hh', 'specializations'],
    queryFn: getSpecialization,
    enabled: open
  })



  // const closeSheetModal = useCallback(() => setOpen(false), [])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Выбрать специализацию</Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        overlayStyles="bg-transparent"
        className="h-[80vh] rounded-4xl bg-card"
      >
        <DialogTitle className="text-2xl">
          Специализации
        </DialogTitle>

        <ScrollArea className="h-full pb-16" type="always">
          <MultilevelCheckbox
            items={data}
            value={values}
            onChange={(selectedIds) => setValues(selectedIds)}
            styles={{
              // className: cn(' overflow-y-auto pb-16 text-base')
            }}
          />
          <ScrollBar />
        </ScrollArea>

        <div className={cn("absolute left-0 right-0 bottom-0 ", "px-12 py-2.5 bg-white shadow-[0px_-2px_3px_-2px_rgba(0,_0,_0,_0.35)] flex justify-end gap-4")}>
          <Button type="button" variant="ghost" className="mr-2" onClick={() => setValues([])}>
            Сбросить
          </Button>
          <Button type="submit">
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}