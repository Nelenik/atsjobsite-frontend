'use client'
import { usePositions } from "../model/PositionsProvider";
import { vacancyPositionsDict } from "@/entities/vacancy";
import { usePathParamFilter } from "@/features/manage-url-filters";
import { cn } from "@/shared/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/shadcn/toggle-group";



type PositionItemProps = {
  positionValue: string

}
const PositionToggleItem = ({ positionValue, ...props }: PositionItemProps) => {
  const positionText = vacancyPositionsDict[positionValue]

  if (!positionText) return null

  return (
    <ToggleGroupItem
      value={positionValue}
      {...props}
      className='data-[state=on]:bg-primary data-[state=on]:text-white'
    >
      {positionText}
    </ToggleGroupItem>
  )
}

type TProps = {
  className?: string
}
export const PositionsFilterToggle = ({
  className
}: TProps) => {
  const { value: position, updatePathParam: updatePosition } = usePathParamFilter('/vacancies', 0)

  const parsedPosition = position === 'all' ? '' : position
  const positionsFromApi = usePositions()

  return (
    <ToggleGroup
      type="single"
      variant={'outline'}
      defaultValue={parsedPosition}
      className={cn('flex-wrap', className)}
      onValueChange={updatePosition}
    >
      {positionsFromApi.map((position) => (
        <PositionToggleItem
          key={position}
          positionValue={position}
        />
      ))}
    </ToggleGroup>
  );
}