import { MatchDetails } from '@/pages-layer/match-details';
import { getCandidateFull } from '@/shared/api/actions';
import InterceptingModal from '@/shared/ui/modals/InterceptingModal';

const MatchDetailsModal = async ({ params }: { params: Promise<{ matchKeys: string[] }> }) => {
  const { matchKeys } = await params;
  const candidate = await getCandidateFull(Number(matchKeys[0]))
  return (
    <InterceptingModal
      dialogTitle="Resume"
      dialogDescription="Detailed candidate information"
    >
      <MatchDetails candidate={candidate} />
    </InterceptingModal>
  );
};

export default MatchDetailsModal;
