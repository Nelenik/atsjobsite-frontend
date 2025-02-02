import { FC, useCallback } from 'react';

import { useToast } from '@/hooks/use-toast';
import { storeVacancy } from '@/actions/postData';
import { mutationInitialState } from '@/actions/constants';

import VacancyForm from './VacancyForm';

type TProps = {
  closeModal: () => void;
};

const AddVacancyForm: FC<TProps> = ({ closeModal }) => {
  const { toast } = useToast();

  const handleSuccess = useCallback(() => {
    closeModal();
    toast({
      description: 'Вакансия успешно создана',
    });
  }, [closeModal, toast]);

  return (
    <VacancyForm
      action={storeVacancy}
      initialState={mutationInitialState}
      handleSuccess={handleSuccess}
    />
  );
};

export default AddVacancyForm;
