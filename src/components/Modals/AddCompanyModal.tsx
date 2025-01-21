import { FC } from 'react';

import { TTariff } from '@/shared/types';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { AddCompanyForm } from '../Forms/AddCompanyForm';

type TProps = {
  tariffs: TTariff[];
};

export const AddCompanyModal: FC<TProps> = ({ tariffs }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-max lg:w-full py-6 text-base">
          Добавить организацию
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[min(100%,800px)] h-full bg-white max-w-none flex flex-col">
        <DialogTitle className="text-3xl">Добавить организацию</DialogTitle>

        <DialogDescription className="visually-hidden">
          Заполние данныее по новой компании
        </DialogDescription>

        <AddCompanyForm tariffs={tariffs} />
      </DialogContent>
    </Dialog>
  );
};
