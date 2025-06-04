import { VacanciesProvider } from "@/entities/vacancy";
import { getVacanciesList } from "@/shared/api/actions";
import { vacanciesDefaultStatuses } from "@/shared/constants/default-vacancy-statuses";
import { FC, PropsWithChildren } from "react";


// Next.js will invalidate the cache when a
// request comes in, at most once every 30 seconds.
export const revalidate = 30

interface IVacancyiesLayoutProp extends PropsWithChildren {
  params: Promise<{ companyId: string }>
}

const VacanciesLayout: FC<IVacancyiesLayoutProp> = async ({ children, params }) => {
  const { companyId } = await params

  //allowed vacancy statuses, now they are hardcoded
  const allowedStatuses = vacanciesDefaultStatuses.map(el => el.id)
  //get vacancies list and filter by status_id to make sure that only vacancies with allowedStatuses remain in vacancies list
  const vacancies = (await getVacanciesList({ companyId })).filter(el => allowedStatuses.includes(el.status_id));


  return (
    <VacanciesProvider vacancies={vacancies}>
      {children}
    </VacanciesProvider>
  );
}

export default VacanciesLayout;