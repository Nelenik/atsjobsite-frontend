import { ChangeEvent, useState } from "react";
import { FilterBase } from "./FilterBase";
import { Input } from "@/shared/ui/shadcn/input";
import { usePathFilters } from "../model/PathFiltersProvider";

type TProps = {
  defaultValue?: string
  updateCb?: (newValues: Record<string, string>) => void
}
export const CompaniesFilterField = ({
  defaultValue,
  updateCb = () => { }
}: TProps) => {
  const [itAccreditation, setItAccreditation] = useState(false)

  const { filterCompanies, activeFilters, updateFilter } = usePathFilters()

  return (
    <FilterBase
      triggerText="Формат"
      onSave={() => updateCb({ it_accreditation: String(itAccreditation) })}
      onCancel={() => updateCb({ it_accreditation: '' })}
    >
      <div className="">

        <label
          className="flex items-center gap-2 [&:not(:last-child)]:mb-4"
        >
          <Input
            type="checkbox"
            className="inline w-5 h-5 accent-primary shrink-0"
            defaultChecked={itAccreditation}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setItAccreditation(e.target.checked)}
          />
          <span>Аккредитованные ИТ-компании</span>
        </label>



      </div>

    </FilterBase>
  );
}