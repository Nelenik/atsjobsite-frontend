import { THhCheckboxGroupItem } from "@/features/add-hh-matches/api/types";
import { CheckboxGroup } from "@/features/add-hh-matches/ui/CheckboxGroup";
import { fetchJson } from "@/shared/api/common/fetchJson";

const SearchPage = async () => {
  const groups: THhCheckboxGroupItem[] = await fetchJson('/data/roles/categories.json')
  return (
    <div>Search page
      <div>
        {groups.map(item => (
          <CheckboxGroup
            key={item.id}
            name="professional_role"
            enableSendRoot={false}
            checkboxItem={item}
            url={`/data/roles/${item.id}.json`}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;