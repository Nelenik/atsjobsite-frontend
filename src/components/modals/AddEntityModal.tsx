'use client'
import { cn } from "@/lib/utils";
import { CirclePlus } from "lucide-react";
import { useState, useCallback, FC } from "react";
import AddVacancyForm from "../app_forms/AddVacancyForm";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { AddResumeForm } from "../app_forms/AddResumeForm";
import { AddCompanyForm } from "../app_forms/AddCompanyForm";

type TProps = {
  className?: string
  entityType: 'vacancy' | 'company' | 'resume'
}

const labels = {
  vacancy: { title: 'Создать вакансию', descr: 'Заполните информацию по новой вакансии', triggerText: 'вакансию' },
  company: { title: 'Создать компанию', descr: 'Заполните информацию по новой компании', triggerText: 'организацию' },
  resume: { title: 'Сoздать резюме', descr: 'Заполните информацию по новому резюме', triggerText: 'резюме' },
}

const AddEntityModal: FC<TProps> = ({
  className,
  entityType
}) => {

  const [open, setOpen] = useState<boolean>(false)
  const handleClose = useCallback(() => setOpen(false), [])

  let entity;
  switch (entityType) {
    case 'vacancy':
      entity = <AddVacancyForm closeModal={handleClose} />
      break;
    case 'company':
      entity = <AddCompanyForm closeModal={handleClose} />
      break;
    case 'resume':
      entity = <AddResumeForm closeModal={handleClose} />
      break;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn('w-max lg:w-full py-6 text-base', className)}>
          <CirclePlus />
          Добавить <span className="hidden sm:inline">{labels[entityType].triggerText}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[min(100%,800px)] h-full bg-white max-w-none flex flex-col">
        <DialogTitle className="text-3xl">
          {labels[entityType].title}
        </DialogTitle>

        <DialogDescription className="visually-hidden">
          {labels[entityType].descr}
        </DialogDescription>

        {entity}
      </DialogContent>
    </Dialog>
  );
}

export default AddEntityModal;