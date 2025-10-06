import { cn } from "@/shared/lib/utils";
import { AutocompleteField } from "@/shared/ui/form-elements/AutocompleteField";
import { JOB_SUGGESTIONS } from "../lib/dictionary";

type TProps = {
  className?: string
}
export const SearchBar = ({
  className
}: TProps) => {
  return (
    <form className={cn(className)}>
      <AutocompleteField
        suggestionsList={JOB_SUGGESTIONS}
        defaultValue="react"
      />

    </form>
  );
}