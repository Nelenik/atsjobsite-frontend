import { FC } from 'react';

import { storeVacancy } from '@/actions/postData';

import { Textarea } from '../ui/textarea';
import FormItem from './form_elements/FormItem';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';

export const AddVacancyForm: FC = () => {
  return (
    <form action={storeVacancy} className="flex flex-col justify-between grow">
      <div className="sm:columns-2 sm:gap-6 [&>*:not(:last-child)]:mb-6 mb-6">
        <FormItem labelText="Название вакансии">
          <Input placeholder="Название вакансии" name="VacName" />
        </FormItem>
        <FormItem labelText="Позиция">
          <Select name="VacSpec">
            <SelectTrigger>
              <SelectValue placeholder="Выберите позицию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Разработчик">Разработчик</SelectItem>
              <SelectItem value="Тим лид(рук. команды разработки)">
                Тим лид(рук. команды разработки)
              </SelectItem>
              <SelectItem value="Тестировщик">Тестировщик</SelectItem>
              <SelectItem value="Продакт\Проджект менеджер">
                Продакт\Проджект менеджер
              </SelectItem>
              <SelectItem value="Аналитик">Аналитик</SelectItem>
              <SelectItem value="DevOps\SRE">DevOps\SRE</SelectItem>
              <SelectItem value="Дизайнер">Дизайнер</SelectItem>
              <SelectItem value="Data Scientist">Data Scientist</SelectItem>
              <SelectItem value="Тех.поддержка">Тех.поддержка</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
        <FormItem labelText="Обязанности">
          <Textarea
            placeholder="Обязанности"
            name="VacRec"
            className="resize-none"
            rows={9}
          ></Textarea>
        </FormItem>
        <FormItem labelText="Условия">
          <Textarea
            placeholder="Условия"
            name="VacCond"
            className="resize-none"
            rows={10}
          ></Textarea>
        </FormItem>
        <FormItem labelText="Занятость">
          <Select name="VacEmp">
            <SelectTrigger>
              <SelectValue placeholder="Занятость" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Полная">Полная</SelectItem>
              <SelectItem value="Частичная">Частичная</SelectItem>
              <SelectItem value="Проект">Проект</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
        <div className="break-before-column">
          <p className="mb-[10px] font-medium">Оплата</p>
          <div className="flex gap-4">
            <FormItem>
              <Input placeholder="от" name="VacSalaryFrom" />
            </FormItem>
            <FormItem>
              <Input placeholder="до" name="VacSalaryTo" />
            </FormItem>
          </div>
        </div>
        <FormItem labelText="Требования ">
          <Textarea
            placeholder="Требования к кандидату"
            name="VacSkills"
            className="resize-none"
            rows={8}
          ></Textarea>
        </FormItem>
        <div>
          <p className="mb-[10px] font-medium">Формат работы</p>
          <div className="flex gap-3 items-center justify-between">
            <FormItem
              labelText="Офис"
              className="flex flex-row-reverse items-center [&>span]:font-normal"
            >
              <Input
                type="radio"
                name="VacForm"
                value={'Офис'}
                className="h-[20px]"
              />
            </FormItem>
            <FormItem
              labelText="Удаленно"
              className="flex flex-row-reverse items-center [&>span]:font-normal"
            >
              <Input
                type="radio"
                name="VacForm"
                value={'Удаленно'}
                className="h-[20px]"
              />
            </FormItem>
            <FormItem
              labelText="Гибрид"
              className="flex flex-row-reverse items-center [&>span]:font-normal"
            >
              <Input
                type="radio"
                name="VacForm"
                value={'Гибрид'}
                className="h-[20px]"
              />
            </FormItem>
          </div>
        </div>
        <FormItem labelText="Опыт">
          <Select name="VacExp">
            <SelectTrigger>
              <SelectValue placeholder="Опыт" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1 год">0-1 год</SelectItem>
              <SelectItem value="1-3 года">1-3 года</SelectItem>
              <SelectItem value="3-5 лет">3-5 лет</SelectItem>
              <SelectItem value="более 5 лет">более 5 лет</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
        <FormItem labelText="География">
          <Select name="VacLoc">
            <SelectTrigger>
              <SelectValue placeholder="Выбирете город" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Москва">Москва</SelectItem>
              <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
              <SelectItem value="Краснодар">Краснодар</SelectItem>
              <SelectItem value="Новосибирск">Новосибирск</SelectItem>
              <SelectItem value="Казань">Казань</SelectItem>
              <SelectItem value="Нижний Новгород">Нижний Новгород</SelectItem>
              <SelectItem value="Екатеринбург">Екатеринбург</SelectItem>
              <SelectItem value="Воронеж">Воронеж</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      </div>

      <div className="self-end">
        <Button variant={'ghost'} className="mr-2">
          Отмена
        </Button>
        <Button type="submit">Создать</Button>
      </div>
    </form>
  );
};
