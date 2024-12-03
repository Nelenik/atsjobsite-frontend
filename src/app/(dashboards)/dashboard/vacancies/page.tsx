import DataProcessingVector from '@/assets/data-processing.svg?rc'

const VacanciesPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-xl text-center font-semibold leading-8 w-[min(100%,400px)]">Чтобы просмотреть подробности о вакансии, пожалуйста выберите вакансию из списка
      </p>
      <DataProcessingVector />
    </div>
  );
}

export default VacanciesPage;