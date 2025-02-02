import { getUser } from '@/actions/getData';
import AddEntityModal from '@/components/modals/AddEntityModal';
import { FC } from 'react';

const MainAppPage: FC = async () => {
  const userData = await getUser()

  return (
    <div>
      <div className="w-[70%]">
        У вас нет созданных компаний.
        <AddEntityModal
          entityType='company'
        />
        {/* <AddCompanyModal /> */}
      </div>
    </div>
  );
};

export default MainAppPage;
