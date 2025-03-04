import VacancyInfo from "@/components/pages/vacancyInfo/VacancyInfo";

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