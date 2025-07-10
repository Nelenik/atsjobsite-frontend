import { useParams, useRouter, useSearchParams } from "next/navigation";

export const usePathParamFilter = (baseUrl: string, paramIndex: number) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { filters = [] } = params;
  const value = filters[paramIndex] || "";

  const query = searchParams ? `?${searchParams.toString()}` : "";

  const updatePathParam = (newValue: string) => {
    const newFilters = [...filters];
    newFilters[paramIndex] = encodeURIComponent(newValue);
    //clean empty values
    const cleanedParams = newFilters.filter(Boolean).join("/");
    router.push(`${baseUrl}/${cleanedParams}${query}`);
  };
  return { value, updatePathParam };
};
