import { PubVacDetails } from '@/pages-layer/pub-vac-details';
import { getPubVacancy } from '@/shared/api/actions/public-vacancy';

const JobsiteVacancyDetails = async ({
  params,
}: {
  params: Promise<{ vacancyId: string }>;
}) => {
  const { vacancyId } = await params;

  const vacancy = await getPubVacancy(vacancyId)

  if (!vacancy) return null;
  return <PubVacDetails vacancy={vacancy} />;
};

export default JobsiteVacancyDetails;
