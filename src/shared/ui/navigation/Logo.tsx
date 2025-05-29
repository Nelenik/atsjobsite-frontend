import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import LogoImg from '@/assets/logo-short.png';
import Image from "next/image";

type TProps = {
  width: number,
  height: number,
  alt?: string,
  className?: string,
  href?: string
}
export const Logo = ({
  width, height, className, href = '/', alt = ''
}: TProps) => {
  return (
    <Link
      href={href}
      className={cn(
        className
      )}
    >
      <Image
        src={LogoImg}
        className={cn(
          'inline-block',
          'w-full'
        )}
        alt={alt}
        width={width}
        height={height}
        priority
      />
    </Link>
  );
}