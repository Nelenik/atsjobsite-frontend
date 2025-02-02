import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";
import VacancyForm from "./VacancyForm";
import { updateVacancy } from "@/actions/updateData";
import { mutationInitialState } from "@/actions/constants";
import convertToFormData from "@/lib/utils/convertToFormData";
import { TVacancyForm } from "@/shared/types";

interface IEditVacancyForm {
  closeModal: () => void
  initialData: TVacancyForm
}

const EditVacancyForm = ({ closeModal, initialData }: IEditVacancyForm) => {
  const { toast } = useToast()
  const actionWithId = updateVacancy.bind(null, initialData.id)

  const handleSuccess = useCallback(() => {
    closeModal();
    toast({
      description: 'Вакансия успешно обновлена',
    });
  }, [closeModal, toast]);

  return (
    <VacancyForm
      action={actionWithId}
      handleSuccess={handleSuccess}
      initialState={{
        ...mutationInitialState,
        payload: convertToFormData(initialData)
      }}
    />
  );
}

export default EditVacancyForm;