import { CirclePlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import AddVacancyForm from '../Forms/AddVacancyForm';

export const AddVacancyModal = ({ className }: { className?: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            'w-max lg:w-full py-6 text-base',
            className
          )}
        >
          <CirclePlus />
          Добавить <span className="hidden sm:inline">вакансию</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[min(100%,800px)] h-full bg-white max-w-none flex flex-col">
        <DialogTitle className="text-3xl">Создать вакансию</DialogTitle>
        <DialogDescription className='visually-hidden'>
          Заполните информаци по новой вакансии
        </DialogDescription>
        {/* add vacancy form */}
        <AddVacancyForm />
      </DialogContent>
    </Dialog>
  );
};
