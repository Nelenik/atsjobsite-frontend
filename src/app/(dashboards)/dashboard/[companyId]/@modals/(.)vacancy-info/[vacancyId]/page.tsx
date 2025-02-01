import InterceptingModal from '@/components/modals/InterceptingModal';

const VacancyDetailsModal = () => {
  return (
    <InterceptingModal
      dialogTitle="Название вакансии"
      dialogDescription="Подробная информация о вакансии"
    >
      <p>
        Вся информация о вакансии
      </p>
    </InterceptingModal>
  );
};

export default VacancyDetailsModal;
