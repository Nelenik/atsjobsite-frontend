import { PositionSelect } from "@/entities/vacancy";
import { usePathParamFilter } from "@/features/manage-url-filters/model/usePathParamFilter";
import { cn } from "@/shared/lib/utils";
import { CancelButton } from "@/shared/ui/buttons/CancelButton";
import FormItem from "@/shared/ui/FormItem";

type TProps = {
  className?: string
}

export const PositionFilterField = ({ className }: TProps) => {
  const { value: position, updatePathParam: updatePosition } = usePathParamFilter('/vacancies', 0)
  console.log(position)
  const parsedPosition = position === 'all' ? '' : position
  return (
    <FormItem labelText="Специализация" className={cn(className)}>
      <CancelButton
        onClick={() => updatePosition('')}
        className="absolute right-0 top-0 z-10"
      />
      <PositionSelect
        value={parsedPosition}
        onValueChange={updatePosition}
        className="bg-white"
      />
    </FormItem>
  );
}