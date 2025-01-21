import { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { AddResumeForm } from '../Forms/AddResumeForm';

export const AddResumeModal: FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-max lg:w-full py-6 text-base">
          Добавить резюме
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[min(100%,800px)] h-full bg-white max-w-none flex flex-col">
        <DialogTitle className="text-3xl">Добавить резюме</DialogTitle>

        <DialogDescription className="visually-hidden">
          Заполните информаци по резюме кандидата
        </DialogDescription>

        <AddResumeForm />
      </DialogContent>
    </Dialog>
  );
};
