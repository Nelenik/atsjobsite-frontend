'use client'
import { useState } from "react";
import { THhCheckboxGroupItem } from "../api/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/ui/shadcn/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "@/shared/api/common/fetchJson";
import { Input } from "@/shared/ui/shadcn/input";

import SvgLoader2 from '@/assets/icons/spinner2.svg?rc'

type TProps = {
  checkboxItem: THhCheckboxGroupItem,
  name: string,
  url: string
  enableSendRoot?: boolean
}
export const CheckboxGroup = ({
  checkboxItem,
  name,
  url,
  enableSendRoot = true
}: TProps) => {

  console.log(url)

  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useQuery({

    queryKey: ["name", url],
    queryFn: () => fetchJson<THhCheckboxGroupItem[]>(url),
    enabled: isOpen, // запрос только при открытии
  });

  console.log(data)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div>
        <CollapsibleTrigger
          className="shrink-0 py-3 flex items-center gap-2 text-base text-secondary-foreground"
        >
          {isOpen
            ? <ChevronUp />
            : <ChevronDown />}

        </CollapsibleTrigger>
        <label>
          <Input
            type="checkbox"
            defaultValue={checkboxItem.id}
            {...(enableSendRoot) && { name }}
          />
          <span>{checkboxItem.name}</span>
        </label>
      </div>
      <CollapsibleContent>
        {isLoading && <SvgLoader2 />}
        {data?.map(item => (
          <label key={item.id}>
            <Input
              type="checkbox"
              defaultValue={item.id}
              name={name}
            />
            <span>{item.name}</span>
          </label>
        ))}


      </CollapsibleContent>
    </Collapsible>)
}