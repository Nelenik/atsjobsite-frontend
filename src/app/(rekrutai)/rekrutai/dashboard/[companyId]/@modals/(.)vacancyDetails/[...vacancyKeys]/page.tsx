import { VacancyDetails } from "@/pages-layer/vacancy-details";
import { getVacancy } from "@/shared/api/actions";
import InterceptingModal from "@/shared/ui/modals/InterceptingModal";

const VacancyDetailsModal = async ({ params }: { params: Promise<{ vacancyKeys: string[] }> }) => {
  const { vacancyKeys } = await params

  const vacancy = await getVacancy(vacancyKeys[0]);

  return (
    <InterceptingModal
      dialogTitle="Vacancy name"
      dialogDescription="Detailed vacancy information"
    >
      <VacancyDetails vacancy={vacancy} />

    </InterceptingModal>
  );
};

export default VacancyDetailsModal;
