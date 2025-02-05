import InterceptingModal from '@/components/modals/InterceptingModal';
import MatchInfo from '@/components/pages/MatchInfo';
import Resume from '@/components/pages/Resume';

const ResumeModal = () => {
  return (
    <InterceptingModal
      dialogTitle="Резюме"
      dialogDescription="Подробная информация о кандидате"
    >
      <MatchInfo />
    </InterceptingModal>
  );
};

export default ResumeModal;
