'use client'

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/shadcn/dialog";
import { ScrollArea, ScrollBar } from "@/shared/ui/shadcn/scroll-area";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAreas } from "../api/areasActions";
import { Area } from "../api/getAreasCached";
import { Input } from "@/shared/ui/shadcn/input";
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence";
import type { ChangeEvent } from "react";
import { MapPinPlus } from "lucide-react";

type TProps = {
  className?: string,
  selectedLocations: Area[],
  updateSelectedLocations: Dispatch<SetStateAction<Area[]>>
  // areasMap: Map<string, Area>
}
export const LocationModal = ({
  className,
  selectedLocations,
  updateSelectedLocations,
  // areasMap
}: TProps) => {

  const [open, setOpen] = useState<boolean>(false)

  const [actualList, setActualList] = useState<Area[]>([])

  const [parentId, setParentId] = useState<string | null>(null)

  const { data } = useQuery(({
    queryKey: ['root-areas', parentId],
    queryFn: () => getAreas(parentId),
    placeholderData: (prev) => prev,
    enabled: open
  }))

  useEffect(() => {
    if (data) {
      const filteredData = data.filter(area => !selectedLocations.some(selected => selected.id === area.id))
      setActualList(filteredData)
    }
  }, [data, selectedLocations])

  // console.log(data)


  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked
    const processedArea = [...selectedLocations, ...actualList].find(area => area.id === e.target.value)
    console.log(processedArea)
    if (!processedArea) return;

    if (isChecked) {
      updateSelectedLocations(prev => [...prev, processedArea])
      if (processedArea.areas?.length) {
        console.log('processed length', processedArea.areas.length)
        setParentId(processedArea.id)
      }
    } else {
      let newSelected = selectedLocations.filter(area => area.id !== processedArea.id)
      if (!newSelected.length) {
        newSelected = []
        setParentId(null)
      }
      updateSelectedLocations(newSelected)
      setActualList(prev => [processedArea, ...prev])
    }
  }

  const handleReset = () => {
    updateSelectedLocations([])
    setParentId(null)
  }

  const triggerText = selectedLocations.length ? selectedLocations.reduce((acc, item) => {
    return acc ? acc + ', ' + item.name : item.name
  }, '') : 'Все регионы'

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn('flex items-center', className)}
        >
          <MapPinPlus />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        overlayStyles="bg-transparent"
        className="flex flex-col h-[82vh] rounded-4xl bg-card"
      >
        <DialogTitle className="text-2xl ">
          Где искать
        </DialogTitle>

        <ScrollArea className="h-[82%] pr-4 " type="auto">
          <div className="flex flex-col gap-3">
            {selectedLocations.map(location => (
              <label
                key={location.id}
                className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer"
              >
                <Input
                  type="checkbox"
                  value={location.id}
                  className="inline w-5 h-5 accent-primary"
                  onChange={handleChange}
                  defaultChecked={true}
                />
                <span>{capitalizeSentences(location.name)}</span>
              </label>)
            )}
            {actualList.map(location => (
              <label
                key={location.id}
                className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer"
              >
                <Input
                  type="checkbox"
                  value={location.id}
                  className="inline w-5 h-5 accent-primary"
                  onChange={handleChange}
                />
                <span>{capitalizeSentences(location.name)}</span>
              </label>
            ))}
          </div>
          <ScrollBar />
        </ScrollArea>

        <div className={cn("absolute left-0 right-0 bottom-0 ", "px-10 py-2.5 bg-white shadow-[0px_-2px_3px_-2px_rgba(0,_0,_0,_0.35)] flex justify-end gap-4")}>
          <Button
            type="button"
            variant="outline"
            // className="mr-2"
            onClick={handleReset}
          >
            Сбросить
          </Button>
          {/* <Button
            type="button"
          >
            Сохранить
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}