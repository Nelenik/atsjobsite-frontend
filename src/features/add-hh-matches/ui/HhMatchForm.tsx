'use client'
import { cn } from "@/shared/lib/utils";
import FormItem from "@/shared/ui/form-elements/FormItem";
import { Input } from "@/shared/ui/shadcn/input";
import { HH_FIELDS_DICT } from "../lib/dictionary";
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence";
import { Button } from "@/shared/ui/shadcn/button";
import { RefObject } from "react";

type TProps = {
  className?: string,
  vacancyId: string | number,
  vacancyName: string,
  ref?: RefObject<HTMLFormElement | null>
  onSuccess?: () => void
}
export const HhMatchForm = ({
  className,
  vacancyId,
  vacancyName,
  ref,
  onSuccess = () => { }
}: TProps) => {

  return (
    <form
      ref={ref}
      className={cn(
        'flex flex-col gap-4 px-2',
        'h-full overflow-y-auto pb-16 text-lg',
        className
      )}
      onSubmit={(e) => {
        e.preventDefault()
        if (!ref) return
        const data = new FormData(ref?.current ?? undefined)
        console.log([...data])
      }}
    >
      {/* Hidden inputs vacancyId and search text = vacancy name */}
      <input type="hidden" name="vacancy_id" defaultValue={vacancyId} />
      <input type="hidden" name="text" defaultValue={vacancyName} />

      {/* Search period in days */}
      <FormItem
        labelText="Период поиска (в днях)"
        className="max-w-[300px]"
      >
        <Input
          placeholder="Количество дней"
          title="Введите только цифры"
          pattern="[0-9]+"
          name="search_period"
        />
      </FormItem>

      {/* Experience */}
      <FormItem
        labelText="Опыт работы"
        className="gap-1"
      >
        {HH_FIELDS_DICT.experience.map((variant) => {
          const isChecked = variant.id === 'noExperience'
          return (
            <label
              key={variant.id}
              className="flex items-center gap-2"
            >
              <Input
                type="radio"
                name="experience"
                value={variant.id}
                className="inline w-5 h-5 accent-primary"
                {...isChecked && { defaultChecked: true }}
              />
              <span>{capitalizeSentences(variant.name)}</span>
            </label>
          )
        })}

      </FormItem>

      {/* Age */}
      <div >
        <p className="mb-[10px] font-medium">Возраст</p>
        <div className="flex gap-4">
          <FormItem>
            <Input
              type="number"
              placeholder="от"
              name="age_from"
              defaultValue={18}
              min={14}
              max={99}
            />
          </FormItem>
          <FormItem>
            <Input
              type="number"
              placeholder="до"
              name="salary_to"
              defaultValue={20}
              min={14}
              max={99}
            />
          </FormItem>
        </div>
      </div>

      {/* Gender */}
      <FormItem
        labelText="Пол"
        className="gap-1"
      >
        {HH_FIELDS_DICT.gender.map((variant) => {
          const isChecked = variant.id === 'unknown'
          return (
            <label
              key={variant.id}
              className="flex items-center gap-2"
            >
              <Input
                type="radio"
                name="gender"
                value={variant.id}
                className="inline w-5 h-5 accent-primary"
                {...isChecked && { defaultChecked: true }}
              />
              <span>{capitalizeSentences(variant.name)}</span>
            </label>
          )
        })}
      </FormItem>

      {/* Salary */}
      <FormItem labelText="Зарплата" className="max-w-[300px]">
        <Input
          placeholder="Зарплата"
          name="salary"
          pattern="[0-9]+"
          title="Введите только цифры"
        />
      </FormItem>
      {/* Employment */}

      <FormItem
        labelText="Тип занятости"
        className="gap-1"
      >
        {HH_FIELDS_DICT.employment.map((variant) => {
          return (
            <label
              key={variant.id}
              className="flex items-center gap-2"
            >
              <Input
                type="checkbox"
                name="[]employment"
                value={variant.id}
                className="inline w-5 h-5 accent-primary"
              />
              <span>{capitalizeSentences(variant.name)}</span>
            </label>
          )
        })}
      </FormItem>

      <div className={cn("absolute left-0 right-0 bottom-0 ", "px-12 py-2.5 bg-white shadow-[0px_-2px_5px_-2px_rgba(0,_0,_0,_0.35)] flex justify-end gap-4")}>
        <Button type="button" variant="ghost" className="mr-2" onClick={() => ref?.current?.reset()}>
          Сбросить
        </Button>
        <Button type="submit">
          {/* {pending ? 'Сохранение...' : 'Сохранить'} */}
          Запросить
        </Button>
      </div>
    </form>
  );
}