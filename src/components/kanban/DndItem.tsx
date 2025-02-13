'use client'
import { FC, HTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import { Button } from "../ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { useDraggable } from "@dnd-kit/core";
type TProps = HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean,
  id: string,

}

const DndItem: FC<TProps> = ({ children, id, asChild = false, className, ...props }) => {

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id,
    data: {
      type: 'item',

    }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      className={cn('relative grow-0', className)}
      ref={setNodeRef}
      style={style}
      {...props}
    >
      <Button variant={'ghost'} {...attributes} {...listeners} className="absolute left-1 top-2 z-10 p-1 h-max cursor-grab">
        <GripVertical className="stroke-muted-foreground" />
      </Button >
      {children}
    </Comp>
  );
}

export default DndItem;