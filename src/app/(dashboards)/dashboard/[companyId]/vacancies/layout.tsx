import { getVacanciesList } from "@/actions/getData";
import { VacanciesProvider } from "@/providers/VacanciesProvider";
import { FC, PropsWithChildren } from "react";


// Next.js will invalidate the cache when a
// request comes in, at most once every 30 seconds.
export const revalidate = 30

const VacanciesLayout: FC<PropsWithChildren> = async ({ children }) => {
  const vacancies = await getVacanciesList();
  console.log(vacancies)
  return (
    <VacanciesProvider vacancies={vacancies}>
      {children}
    </VacanciesProvider>
  );
}

export default VacanciesLayout;