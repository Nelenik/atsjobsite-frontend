
const VacancyDetailsPage = async ({ params }: { params: Promise<{ vacancyId: string }> }) => {
  const { vacancyId } = await params;
  console.log('vacancy id', vacancyId);
  return (
    <div>
      Детали вакансии
    </div>
  );
}

export default VacancyDetailsPage;