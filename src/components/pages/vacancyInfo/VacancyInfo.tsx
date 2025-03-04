import { getVacancy } from "@/actions/getData";


const VacancyInfo = async ({ vacancyId }: { vacancyId: number }) => {

  const vacancyData = await getVacancy(vacancyId)
  console.log(vacancyData)
  return (
    <div>VacancyInfo</div>
  );
}

export default VacancyInfo;