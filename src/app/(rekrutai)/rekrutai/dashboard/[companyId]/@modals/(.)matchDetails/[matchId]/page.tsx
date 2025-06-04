import { MatchDetails } from '@/pages-layer/match-details';
import { getCandidateFull } from '@/shared/api/actions';
import InterceptingModal from '@/shared/ui/modals/InterceptingModal';

const MatchDetailsModal = async ({ params }: { params: Promise<{ matchId: string }> }) => {
  const { matchId } = await params;
  const candidate = await getCandidateFull(Number(matchId))
  return (
    <InterceptingModal
      dialogTitle="Резюме"
      dialogDescription="Подробная информация о кандидате"
    >
      <MatchDetails candidate={candidate} />
    </InterceptingModal>
  );
};

export default MatchDetailsModal;
