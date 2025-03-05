import VacancyInfo from "@/components/vacancyInfoPage/VacancyInfo";

const VacancyDetailsPage = async ({ params }: { params: Promise<{ vacancyId: string }> }) => {
  const { vacancyId } = await params;
  console.log('vacancy id', vacancyId);
  return (
    <div>
      <VacancyInfo vacancyId={Number(vacancyId)} />
    </div>
  );
}

export default VacancyDetailsPage;