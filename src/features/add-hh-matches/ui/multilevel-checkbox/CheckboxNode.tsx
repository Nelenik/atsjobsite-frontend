'use client'

import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import { useCheckbox } from "./CheckboxProvider";
import { TCheckboxItem } from "./types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/ui/shadcn/collapsible";
import { Input } from "@/shared/ui/shadcn/input";

import { ChevronUp, ChevronDown } from "lucide-react";
import SvgLoader2 from '@/assets/icons/spinner2.svg?rc'

type TProps = {
  item: TCheckboxItem
}

export const CheckboxNode = memo(function CheckboxNode({
  item
}: TProps) {

  const {
    selectedIds,
    onSelectionChange,
    onLoadChildren,
    includeParent
  } = useCheckbox()

  console.log('selectedIds', selectedIds)

  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<TCheckboxItem[]>(item.staticChildren || []);

  const hasChildren = !!item.childrenUrl || !!item.staticChildren?.length;
  const checkboxRef = useRef<HTMLInputElement>(null);



  // вычисляем состояния на основе selectedIds
  const childIds = children.map(c => c.id);
  const allChildrenSelected = childIds.length > 0 && childIds.every(id => selectedIds.has(id));
  const someChildrenSelected = childIds.some(id => selectedIds.has(id));

  // verify if is parent checkbox checked
  const isParentChecked = allChildrenSelected
    || (!hasChildren && selectedIds.has(item.id))
    || (!includeParent && hasChildren && selectedIds.has(`__virtual__${item.id}`));

  // загрузка детей
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["multilevel_checkbox", item.id + item.childrenUrl],
    queryFn: () => onLoadChildren(item),
    enabled: !!item.childrenUrl && isOpen,
  });

  useEffect(() => {
    if (isSuccess) {
      setChildren(data)
    };
  }, [isSuccess, data]);

  // useEffect(() => {
  //   if (children.length && isParentChecked) {
  //     const dataSet = new Set(children.map(item => item.id))
  //     const union = selectedIds.union(dataSet)
  //     onSelectionChange(union)
  //   }
  // }, [children, isParentChecked, onSelectionChange, selectedIds])

  // indeterminate для промежуточного состояния
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = hasChildren && someChildrenSelected && !allChildrenSelected;
    }
  }, [someChildrenSelected, allChildrenSelected, hasChildren]);

  // обработчик клика
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const newSelected = new Set(selectedIds);

    const virtualId = `__virtual__${item.id}`

    const toggleIds = (items: TCheckboxItem[]) => {
      for (const checkboxItem of items) {
        if (checked) newSelected.add(checkboxItem.id);
        else newSelected.delete(checkboxItem.id);
      }
    };

    if (children.length) {
      toggleIds(children)
    }

    if ((hasChildren && includeParent) || !hasChildren) {
      if (checked) newSelected.add(item.id);
      else newSelected.delete(item.id);
    } else if (hasChildren && !includeParent) {
      if (checked) newSelected.add(virtualId);
      else newSelected.delete(virtualId)
    }

    onSelectionChange(newSelected);
  };


  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div
        className="flex "
      >
        {hasChildren && <CollapsibleTrigger
          className="shrink-0 py-3 flex items-center gap-2 text-base text-secondary-foreground"
        >
          {isOpen
            ? <ChevronUp />
            : <ChevronDown />}

        </CollapsibleTrigger>}
        <label className="flex items-center gap-2">
          <Input
            type="checkbox"
            value={item.id}
            checked={isParentChecked}
            onChange={handleChange}
            ref={checkboxRef}
            className="inline w-5 h-5 accent-primary"
          />
          <span>{item.label}</span>
        </label>
      </div>
      {hasChildren && <CollapsibleContent>
        {isLoading && <SvgLoader2 />}
        {children.map(child => (
          <CheckboxNode
            key={child.id}
            item={child}
          />
        ))}
      </CollapsibleContent>}
    </Collapsible>)
})