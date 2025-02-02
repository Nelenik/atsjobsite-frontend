import { FC } from 'react';

import { getVacancy } from '@/actions/getData';
import { SummaryCard } from '@/components/cards/SummaryCard';
import { MatchStatusCol } from '@/components/MatchStatusCol';
import { getDaysSinceCreated } from '@/lib/utils/getDaysSinceCreated';
import { EMatchStatus } from '@/shared/types';
import EditVacancyModal from '@/components/modals/EditVacancyModal';
import Link from 'next/link';
import { pickAndFilter } from '@/lib/utils/pickAndFilter';


type TProps = {
  params: Promise<{ vacancyId: string, companyId: string }>
};

const VacancyMatchPage: FC<TProps> = async ({ params }) => {
  const { companyId, vacancyId } = await params;

  const vacancy = await getVacancy(vacancyId);

  const pickedVacancy = pickAndFilter(vacancy, ["id",
    "name",
    "position",
    "responsibilities",
    "conditions",
    "employment",
    "skills",
    "work_format",
    "experience",
    "description",
    "location",
    "salary_from",
    "salary_to",
    "salary_candy",
    "salary_market"])

  console.log('vacancydata', vacancy)

  return (
    <div className="flex gap-6 flex-col relative">

      <EditVacancyModal
        className='absolute top-2 right-2 z-10' triggerView='icon'
        initialData={pickedVacancy}
      />

      <Link href={`/dashboard/${companyId}/vacancy-info/${vacancyId}?name=${vacancy.name}`}>
        <SummaryCard
          vacancyName={vacancy.name}
          daysInProcessing={getDaysSinceCreated(vacancy.created_at)}
          salaryOfferFrom={vacancy.salary_from}
          salaryOfferTo={vacancy.salary_to}
          salaryMiddle={vacancy.salary_market}
          salaryCandidate={vacancy.salary_candy}
          candidatesCount={vacancy.match_count}
          jobReactions={vacancy.match_hot_count}
        />
      </Link>

      <div className="flex gap-6 w-full overflow-auto pb-2 shadow-inner">
        <div className="flex gap-6 flex-col">
          <MatchStatusCol companyId={companyId} vacId={vacancy.id} status={EMatchStatus.SCORING} />
        </div>

        <div className="flex gap-6 flex-col">
          <MatchStatusCol companyId={companyId} vacId={vacancy.id} status={EMatchStatus.SCREENING} />
        </div>

        <div className="flex gap-6 flex-col">
          <MatchStatusCol companyId={companyId} vacId={vacancy.id} status={EMatchStatus.INTERVIEW} />
        </div>

        <div className="flex gap-6 flex-col">
          <MatchStatusCol companyId={companyId} vacId={vacancy.id} status={EMatchStatus.REFUSAL} />
        </div>

        <div className="flex gap-6 flex-col">
          <MatchStatusCol companyId={companyId} vacId={vacancy.id} status={EMatchStatus.OFFER} />
        </div>
      </div>
    </div>
  );
};

export default VacancyMatchPage;
