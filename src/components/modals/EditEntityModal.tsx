'use client'
import { useState, useCallback, FC } from "react";
import EditVacancyForm from "../app_forms/EditVacancyForm";
import EditButton from "../buttons/EditButton";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { NonNullableFields } from "@/lib/utils/filterFalsyFields";

/**
 * Props for the `EditEntityModal` component.
 * 
 * @template T - Type of the `initialData` field, defaults to `unknown`.
 * @param className - Optional class name for styling.
 * @param triggerView - View type for the trigger button (`'icon'` or `'default'`).
 * @param initialData - Data to initialize the form with, has non-nullable fields.
 * @param entityType - Type of the entity being edited. Can be `'vacancy'`, `'company'`, `'resume'`, or `'match'`.
 */
type TProps<T = unknown> = {
  className?: string
  triggerView?: 'icon' | 'default'
  initialData: NonNullableFields<T>
  entityType: 'vacancy' | 'company' | 'resume' | 'match'
}

const labels = {
  vacancy: { title: 'Изменить вакансию', descr: 'Форма редактирования ваканси' },
  company: { title: 'Редактировать компанию', descr: 'Форма редактирования компании' },
  resume: { title: 'Редактировать резюме', descr: 'Форма редактирования резюме' },
  match: { title: 'Изменить мэтч', descr: 'Форма редактирования мэтча' }
}

/**
 * Modal component for editing different types of entities.
 * 
 * This modal displays the appropriate form based on the `entityType` prop.
 * 
 * @param {TProps<T>} props - Props passed to the component.
 * @returns {JSX.Element} The modal with the correct form to edit the selected entity.
 */

const EditEntityModal = <T,>(
  { className,
    triggerView = 'default',
    initialData,
    entityType }: TProps<T>

): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = useCallback(() => setOpen(false), [])

  let entity;
  switch (entityType) {
    case 'vacancy':
      entity = <EditVacancyForm closeModal={handleClose} initialData={initialData} />
      break;
    case 'company':
      entity = <p>Edift company form</p>
      break;
    case 'resume':
      entity = <p>Edit resume form</p>
      break;
    case 'match':
      entity = <p>edit match form</p>
      break;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <EditButton isIconView={triggerView === 'icon'} className={className} />
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

export default EditEntityModal;