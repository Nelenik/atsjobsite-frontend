'use client'
import { useEffect, useState } from "react";
import { LocationModal } from "./LocationModal";
import { Area } from "../api/getAreasCached";
import { getAreasByIdsList } from "../api/areasActions";
import { useQuery } from "@tanstack/react-query";

type TProps = {
  defaultValues?: string[],
  name?: string,
  className?: string
}
export const LocationField = ({
  defaultValues,
  name,
  className
}: TProps) => {


  const [selectedLocations, setSelectedLocations] = useState<Area[]>([])

  const { data } = useQuery({
    queryKey: ['areas-by-ids', defaultValues],
    queryFn: () => getAreasByIdsList(defaultValues || []),
    enabled: !!defaultValues?.length
  })

  useEffect(() => {
    if (data) {
      setSelectedLocations(data)
    }
  }, [data])


  return (
    <>
      {selectedLocations.map(location => (
        <input type="hidden" value={location.id} key={location.id} name={name} />
      ))}
      <LocationModal
        className={className}
        selectedLocations={selectedLocations}
        updateSelectedLocations={setSelectedLocations}
      />
    </>
  );
}