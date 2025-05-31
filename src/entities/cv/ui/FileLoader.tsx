'use client'
import { parseCvFromFile } from "@/shared/api/actions";
import { TResume } from "@/shared/api/types";
import { useFormMutation } from "@/shared/model/hooks/useFormMutation";
import FormItem from "@/shared/ui/FormItem";
import { Button } from "@/shared/ui/shadcn/button";
import { Input } from "@/shared/ui/shadcn/input";

type TProps = {
  setInitialData: (data: TResume) => void
}
export const FileLoader = ({
  setInitialData
}: TProps) => {

  const { formAction, pending } =
    useFormMutation({
      mutationAction: parseCvFromFile,
      onSuccess: ({ payload }) => {
        setInitialData(payload as TResume)
      }
    });

  return (
    <form
      className="flex gap-3 items-end ring-1 rounded-md  p-4"
      action={formAction}
    >
      <FormItem
        labelText="Заполнить из файла"
      >
        <Input type="file" />
      </FormItem>
      <Button type="submit">
        {pending ? 'Обработка...' : 'Заполнить'}
      </Button>
    </form>
  );
}