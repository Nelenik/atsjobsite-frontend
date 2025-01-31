'use client'
import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/utils";
import EditVacancyForm from "../forms/EditVacancyForm";
import { Button } from "../ui/button";
import EditButton from "../buttons/EditButton";


interface IEditVacancyModal {
  className?: string
  triggerView?: 'icon' | 'default'
}

//temp mock data
const initialObj = {
  id: 1,
  name: 'Devops',
  position: 'teamlead',
  responsibilities: '',
  conditions: '',
  employment: 'full',
  skills: '',
  work_format: '',
  experience: '',
  description: 'string',
  location: 'Москва',
  salary_from: 100000,
  salary_to: 200000,
  salary_candy: 80000,
  salary_market: 100000,
}

const EditVacancyModal = ({
  className,
  triggerView = 'default'
}: IEditVacancyModal) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <EditButton isIconView={triggerView === 'icon'} className={className} />
        {/* <Button className={cn('w-max lg:w-full py-6 text-base', className)}>

          Изменить
        </Button> */}
      </DialogTrigger>

      <DialogContent className="w-[min(100%,800px)] h-full bg-white max-w-none flex flex-col">
        <DialogTitle className="text-3xl">Изменить вакансию</DialogTitle>

        <DialogDescription className="visually-hidden">
          Редактируйте вакансию
        </DialogDescription>

        <EditVacancyForm closeModal={handleClose} vacancyData={initialObj} />
      </DialogContent>
    </Dialog>
  );
}

export default EditVacancyModal;