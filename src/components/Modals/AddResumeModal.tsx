import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import AddResumeForm from '../Forms/AddResumeForm';

const AddResumeModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            'w-max lg:w-full py-6 text-base',
          )}
        >
          Добавить резюме
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[min(100%,800px)] h-full bg-white max-w-none flex flex-col">
        <DialogTitle className="text-3xl">Добавить резюме</DialogTitle>
        <DialogDescription className='visually-hidden'>
          Заполните информаци по резюме кандидата
        </DialogDescription>
        {/* add resume form */}
        <AddResumeForm />
      </DialogContent>
    </Dialog>
  );
}

export default AddResumeModal;