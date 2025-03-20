'use client'
import FilterField from "./filters_elmts/FilterField";
import FormItem from "../app_forms/form_elmts/FormItem";
import { Input } from "../ui/input";
import PositionSelect from "../shared/PositionSelect";
import CancelButton from "../buttons/CancelButton";
import { Button } from "../ui/button";
import { FilterX } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const ReserveFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const handleResetAll = () => {
    router.push(pathname)
  }
  return (
    <div className="flex flex-wrap @3xl:flex-col gap-6">
      <FilterField
        paramName="position"
        render={({ value, onValueChange, onClick }) => (
          <FormItem labelText="Специализация">
            <CancelButton
              onClick={onClick}
              className="absolute right-0 top-0"
            />
            <PositionSelect
              value={String(value)}
              onValueChange={onValueChange}
              className="bg-white"
            />
          </FormItem>
        )} />

      <FilterField
        paramName="salary_from"
        render={({ value, onValueChange, onClick }) => (
          <FormItem labelText="Зарплата от">
            <CancelButton
              onClick={onClick}
              className="absolute right-0 top-0"
            />
            <Input
              value={value}
              onChange={(e) => onValueChange?.(e.target.value)}
              placeholder="Зарплата от"

              className=""
            />
          </FormItem>
        )} />

      <FilterField
        paramName="salary_to"
        render={({ value, onValueChange, onClick }) => (
          <FormItem labelText="Зарплата до">
            <CancelButton
              onClick={onClick}
              className="absolute right-0 top-0"
            />
            <Input
              value={value}
              onChange={(e) => onValueChange?.(e.target.value)}
              placeholder="Зарплата до"

              className=""
            />
          </FormItem>
        )} />

      <FilterField
        paramName="location"
        render={({ value, onValueChange, onClick }) => (
          <FormItem labelText="География">
            <CancelButton
              onClick={onClick}
              className="absolute right-0 top-0"
            />
            <Input
              value={value}
              onChange={(e) => onValueChange?.(e.target.value)}
              placeholder="География"

              className=""
            />
          </FormItem>
        )} />
      <Button
        onClick={handleResetAll}
        variant={'ghost'}
        className="hover:bg-input"
      >
        <FilterX /> Сбросить все
      </Button>
    </div>
  );
}

export default ReserveFilter;