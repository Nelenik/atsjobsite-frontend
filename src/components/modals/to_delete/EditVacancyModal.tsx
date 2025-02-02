'use client'
import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../../ui/dialog";
import EditVacancyForm from "../../app_forms/EditVacancyForm";
import EditButton from "../../buttons/EditButton";
import { TVacancy } from "@/shared/types";
import { NonNullableFields } from "@/lib/utils/filterFalsyFields";


interface IEditVacancyModal {
  className?: string
  triggerView?: 'icon' | 'default'
  initialData: NonNullableFields<TVacancy>
}

const EditVacancyModal = ({
  className,
  triggerView = 'default',
  initialData
}: IEditVacancyModal) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <EditButton isIconView={triggerView === 'icon'} className={className} />
      </DialogTrigger>

      <DialogContent className="w-[min(100%,800px)] h-full bg-white max-w-none flex flex-col">
        <DialogTitle className="text-3xl">Изменить вакансию</DialogTitle>

        <DialogDescription className="visually-hidden">
          Форма редактирования
        </DialogDescription>

        <EditVacancyForm closeModal={handleClose} initialData={initialData} />
      </DialogContent>
    </Dialog>
  );
}

export default EditVacancyModal;