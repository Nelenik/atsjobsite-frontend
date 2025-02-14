'use client'
import VacancyBoardCard from '@/components/cards/VacancyBoardCard';
import VacanciesBoard from '@/components/kanban/VacanciesBoard';
import { groupBy } from '@/lib/utils/groupBy';
import { useVacancies } from '@/providers/VacanciesProvider';


const VacanciesPage = () => {
  const vacancies = useVacancies()

  const groupedByStatus = groupBy(vacancies, (el) => el.status)

  console.log(groupedByStatus)

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <VacanciesBoard items={vacancies} />
      {/* <ul className='w-full overflow-x-auto flex gap-6'>
        {vacancies.map(vacancy => (
          <li key={vacancy.id} className='w-[max(calc(100%/4),200px)]'>
            <VacancyBoardCard id={vacancy.id} name={vacancy.name} location={vacancy.location} salary_from={vacancy.salary_from} salary_to={vacancy.salary_to} />
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default VacanciesPage;