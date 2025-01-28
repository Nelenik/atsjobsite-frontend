import { FC } from 'react';

import { AddCompanyModal } from '@/components/modals/AddCompanyModal';
import { AddResumeModal } from '@/components/modals/AddResumeModal';
import { getTariffs } from '@/actions/getData';

const DashboardMain: FC = async () => {
  const tariffs = await getTariffs();

  return (
    <div>
      <div className="w-[70%]">
        Main page
      </div>
    </div>
  );
};

export default DashboardMain;
