'use client'
import VacanciesBoard from '@/components/kanban/VacanciesBoard';
import AddEntityModal from '@/components/modals/AddEntityModal';
import { useVacancies } from '@/providers/VacanciesProvider';


const VacanciesPage = () => {
  const vacancies = useVacancies()

  return (
    <div className="flex flex-col gap-6 h-full">
      <AddEntityModal entityType='vacancy' className="lg:w-max ml-auto" />
      <VacanciesBoard items={vacancies} />
    </div>
  );
}

export default VacanciesPage;