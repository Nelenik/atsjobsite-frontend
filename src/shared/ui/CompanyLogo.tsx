import { cn } from "../lib/utils";
import Image from "next/image";

type TProps = {
  className?: string,
  imageUrl?: string,
}
export const CompanyLogo = ({
  className,
  imageUrl = '/assets/companies/default.webp'
}: TProps) => {
  return (
    <div className={cn("p-2 rounded-2xl aspect-square bg-white shadow-md shadow-muted flex items-center justify-center", className)}>
      <Image
        src={imageUrl}
        alt='company logo'
        width={100}
        height={100}
        className="object-contain w-full h-full"
      />
    </div>
  );
}