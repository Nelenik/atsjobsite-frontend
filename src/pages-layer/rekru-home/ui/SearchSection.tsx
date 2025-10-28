'use client'
import { SearchBar } from "@/features/search-bar";
import { useRouter } from "next/navigation";

type TProps = {
  className?: string
}
export const SearchSection = ({
  className
}: TProps) => {
  const router = useRouter();
  const handleConfirm = (value: string) => {
    if (!value) return
    router.push(`/vacancies?search=${encodeURIComponent(value)}`);
  }
  return (
    <SearchBar
      className={className}
      onConfirm={handleConfirm}
    />
  );
}