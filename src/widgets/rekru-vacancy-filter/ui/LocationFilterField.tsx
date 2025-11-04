'use client'

import { FilterBase } from "./FilterBase"
import { useQuery } from "@tanstack/react-query"
import { searchAreasByName } from "@/features/add-hh-matches/api/areasActions"
import { useState } from "react"
import { AutocompleteControlledField } from "@/shared/ui/form-elements/autocomplete-field.tsx"
import { useDebounce } from "@/shared/model/hooks/useDebounce"
import { Search } from "lucide-react"

type TProps = {
  defaultValue?: string
  updateCb?: (newValues: Record<string, string>) => void
}
export const LocationFilterField = ({
  defaultValue = '',
  updateCb = () => { }
}: TProps) => {
  const [searchText, setSearchText] = useState(defaultValue)

  const debouncedSearchText = useDebounce(searchText, 300)

  // Get areas based on search text
  const { data: searchLocations = [], isFetching } = useQuery({
    queryKey: ['search-locations', debouncedSearchText],
    queryFn: () => searchAreasByName(debouncedSearchText),
    enabled: debouncedSearchText.length >= 2
  })

  return (
    <FilterBase
      triggerText="Город"
      onSave={() => updateCb({ location: searchText })}
      onCancel={() => updateCb({ location: '' })}
      disableSave={searchText.length < 2}
    >

      <div className="relative">
        <Search
          className="absolute top-1/2 left-2 -translate-y-1/2"
        />
        <AutocompleteControlledField
          value={searchText}
          suggestionsList={searchLocations.map(item => item.name)}
          isFetching={isFetching}
          onChange={(e) => setSearchText(e.target.value)}
          onItemSelect={(value) => setSearchText(value)}
          popoverStyles="p-4"
          placeholder="Введите город, область или страну"
          className='pl-10'
        />
      </div>
    </FilterBase>
  );
}