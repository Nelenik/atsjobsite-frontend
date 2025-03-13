import { FC } from 'react';

import { getVacancy } from '@/actions/getData';
import { SummaryCard } from '@/components/cards/SummaryCard';
import { TVacancy } from '@/shared/types';
import Link from 'next/link';
import EditEntityModal from '@/components/modals/EditEntityModal';
import MatchBoard from '@/components/dnd-boards/MatchBoard';
import { pickAndFilter } from '@/lib/utils/pickAndFilter';


type TProps = {
  params: Promise<{ vacancyId: string, companyId: string }>
};

const VacancyMatchPage: FC<TProps> = async ({ params }) => {
  const { companyId, vacancyId } = await params;

  const vacancy = await getVacancy(vacancyId);
  console.log('vacancy', vacancy)

  return (
    <div className="flex gap-6 flex-col relative">
      <EditEntityModal<TVacancy>
        className='absolute top-0 right-0 z-10' triggerView='icon'
        initialData={vacancy}
        entityType='vacancy'
      />

      <Link
        scroll={false}
        href={`/dashboard/${companyId}/vacancy-info/${vacancyId}?name=${vacancy.name}`}
      >
        <SummaryCard
          summaryData={
            pickAndFilter(vacancy, ['name', 'created_at', 'salary_from', 'salary_to', 'salary_market', 'salary_candy', 'match_count', 'match_hot_count', 'status'])
          }
        />
      </Link>

      <MatchBoard match_statuses={vacancy.matchStatuses} />
    </div>
  );
};

export default VacancyMatchPage;
