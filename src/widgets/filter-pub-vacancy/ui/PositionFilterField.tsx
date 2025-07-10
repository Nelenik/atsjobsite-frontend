import { PositionSelect } from "@/entities/vacancy";
import { usePathParamFilter } from "@/features/manage-url-filters/model/usePathParamFilter";
import { cn } from "@/shared/lib/utils";
import { CancelButton } from "@/shared/ui/buttons/CancelButton";
import FormItem from "@/shared/ui/FormItem";

type TProps = {
  className?: string
}

export const PositionFilterField = ({ className }: TProps) => {
  const { value, updatePathParam } = usePathParamFilter('/vacancies', 0)
  return (
    <FormItem labelText="Специализация" className={cn(className)}>
      <CancelButton
        onClick={() => updatePathParam('')}
        className="absolute right-0 top-0 z-10"
      />
      <PositionSelect
        value={value}
        onValueChange={updatePathParam}
        className="bg-white"
      />
    </FormItem>
  );
}