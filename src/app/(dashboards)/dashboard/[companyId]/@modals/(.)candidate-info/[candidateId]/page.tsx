import MatchInfo from '@/components/matchInfoPage/MatchInfo';
import InterceptingModal from '@/components/modals/InterceptingModal';

const ResumeModal = async ({ params }: { params: Promise<{ candidateId: string }> }) => {
  const { candidateId } = await params;
  return (
    <InterceptingModal
      dialogTitle="Резюме"
      dialogDescription="Подробная информация о кандидате"
    >
      <MatchInfo matchId={Number(candidateId)} />
    </InterceptingModal>
  );
};

export default ResumeModal;
