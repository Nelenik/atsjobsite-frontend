import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { FC, ReactNode } from "react";

type TProps = {
  children: ReactNode,
  className?: string
}
const StatusBadge: FC<TProps> = ({ children, className }) => {
  return (
    <Badge className={cn("py-[5px] bg-transparent ring-1 ", className)}>
      {children}
    </Badge>
  );
}

export default StatusBadge;