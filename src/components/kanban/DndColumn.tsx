'use client'
import { useDroppable } from "@dnd-kit/core";
import { FC, HTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils";

type TProps = HTMLAttributes<HTMLDivElement> & {
  id: string
  asChild?: boolean,
}

const DndColumn: FC<TProps> = ({ id, asChild = false, children, className, ...props }) => {
  const { setNodeRef } = useDroppable({
    id: id,
    data: {
      type: 'column'
    }
  })

  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      ref={setNodeRef}
      className={cn(className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

export default DndColumn;