import { cn } from "@/shared/lib/utils";
import { Button, ButtonProps } from "@/shared/ui/shadcn/button";

const NavPanelBtn = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Button variant={"ghost"} {...props} className={cn(
      '  text-ellipsis overflow-hidden',
      className,
      'hover:bg-accent/10 hover:text-sidebar-foreground [&.active]:bg-accent/10 [&.active]:text-sidebar-foreground',)}>
      {children}
    </Button>
  );
}

export default NavPanelBtn;