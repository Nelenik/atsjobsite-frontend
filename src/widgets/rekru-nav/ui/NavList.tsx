'use client'
import { TNavConfig } from "@/shared/config/types";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TProps = {
  routes: TNavConfig[]
  className?: string;
  onLinkClick?: () => void
}
export const NavList = ({
  routes,
  className,
  onLinkClick = () => { },
}: TProps) => {
  const pathname = usePathname()
  return (
    <ul
      className={cn(
        className
      )}
    >
      {routes.map(route => {
        const isAcitve = pathname === route.href
        return (
          <li key={route.routeName}>
            <Link
              className={cn(
                "w-max inline-block py-2 transition-colors",
                "border-b-2 border-transparent",
                "text-secondary-foreground font-semibold text-center",
                "hover:text-primary hover:border-primary",
                isAcitve && 'text-primary border-primary'
              )}
              href={route.href}
              onClick={onLinkClick}
            >
              {route.routeName}
            </Link>
          </li>)
      }
      )}
    </ul>
  );
}