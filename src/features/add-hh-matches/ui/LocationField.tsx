'use client'
import { useEffect, useState } from "react";
import { LocationModal } from "./LocationModal";
import { Area } from "../api/getAreasCached";
import { getAreasByIdsList } from "../api/areasActions";
import { useQuery } from "@tanstack/react-query";

type TProps = {
  defaultValues?: string[],
  name?: string,
  className?: string,
  formRef?: React.RefObject<HTMLFormElement | null>
}
export const LocationField = ({
  defaultValues,
  name,
  className,
  formRef
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

  //Sync form reset event with this component
  useEffect(() => {
    const form = formRef?.current;
    if (!form) return;
    const handleReset = () => setSelectedLocations([]);

    form.addEventListener('reset', handleReset);
    return () => {
      form.removeEventListener('reset', handleReset);
    };
  }, [formRef])

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