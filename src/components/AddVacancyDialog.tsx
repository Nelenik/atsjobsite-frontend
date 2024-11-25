import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CirclePlus } from 'lucide-react';
const AddVacancyDialog = () => {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button className="bg-blue-700 w-full py-6">
          <CirclePlus />Добавить вакансию
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Новая вакансия</DialogTitle>
          <DialogDescription>
            Заполните информаци по новой вакансии
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" className="bg-blue-700">Добавить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddVacancyDialog;