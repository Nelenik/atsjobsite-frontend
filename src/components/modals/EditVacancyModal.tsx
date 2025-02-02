'use client'
import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import EditVacancyForm from "../app_forms/EditVacancyForm";
import EditButton from "../buttons/EditButton";
import { TVacancyForm } from "@/shared/types";
import { pickAndFilter } from "@/lib/utils/pickAndFilter";


interface IEditVacancyModal {
  className?: string
  triggerView?: 'icon' | 'default'
  initialData: TVacancyForm
}
//temp mock data
// const initialObj = {
//   id: 1,
//   name: 'Devops',
//   position: 'teamlead',
//   responsibilities: '',
//   conditions: '',
//   employment: 'full',
//   skills: '',
//   work_format: '',
//   experience: '',
//   description: 'string',
//   location: 'Москва',
//   salary_from: 100000,
//   salary_to: 200000,
//   salary_candy: 80000,
//   salary_market: 100000,
// }

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