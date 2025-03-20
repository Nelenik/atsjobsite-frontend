'use client'

import { Input } from "../ui/input";
import FilterField from "./filters_elmts/FilterField";

const CompaniesFilter = () => {
  return (
    <FilterField paramName="name" render={({ value, onValueChange }) => (
      <Input value={value} onChange={(e) => onValueChange?.(e.target.value)} placeholder="Поиск по компании" className="w-[clamp(200px,35%,400px)]" />
    )} />
  );
}

export default CompaniesFilter;