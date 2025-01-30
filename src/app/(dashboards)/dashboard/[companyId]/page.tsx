import EditVacancyModal from '@/components/modals/EditVacancyModal';
import { FC } from 'react';

const DashboardMainPage: FC = async () => {
  return (
    <div>
      <div className="w-[70%]">
        Dashboard Main page
        <EditVacancyModal />
      </div>
    </div>
  );
};

export default DashboardMainPage;
