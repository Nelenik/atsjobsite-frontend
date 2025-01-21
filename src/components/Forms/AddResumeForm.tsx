import { createData } from "@/actions/postData";
import FormItem from "./form_elements/FormItem";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const AddResumeForm = () => {
  return (
    <form action={createData} className="flex flex-col justify-between grow">
      <div className="sm:columns-2 sm:gap-6 [&>*:not(:last-child)]:mb-6 mb-6">
        <FormItem labelText="ФИО">
          <Input placeholder="ФИО" name="CandyName" />
        </FormItem>
        <FormItem labelText="Название">
          <Input placeholder="Название" name="CVName" />
        </FormItem>
        <FormItem labelText="Опыт">
          <Input placeholder="Опыт" name="CVExpDur" />
        </FormItem>
        <FormItem labelText="Зарплата">
          <Input placeholder="Зарплата" name="CvSalary" />
        </FormItem>
        <FormItem labelText="Телефон">
          <Input placeholder="Телефон" name="CandyPhone" />
        </FormItem>
        <FormItem labelText="Телеграмм">
          <Input placeholder="Телеграмм" name="CandyTG" />
        </FormItem>
        <FormItem labelText="Почта">
          <Input placeholder="Почта" name="CandyEmail" />
        </FormItem>
        <FormItem labelText="Страна">
          <Input placeholder="Страна" name="CandyCountry" />
        </FormItem>
        <FormItem labelText="Город">
          <Input placeholder="Город" name="CandyCity" />
        </FormItem>
        <FormItem labelText="Ссылка на резюме">
          <Input placeholder="Ссылка на резюме" name="CvLink" />
        </FormItem>
        <FormItem labelText="Био" className="break-before-column">
          <Textarea placeholder="Био" name="CvBio" className="resize-none" rows={9}></Textarea>
        </FormItem>
        <FormItem labelText="Опыт">
          <Textarea placeholder="Опыт" name="CVExpTxt" className="resize-none" rows={17}></Textarea>
        </FormItem>
      </div>

      <div className="self-end">
        <Button variant={'ghost'} className="mr-2">
          Отмена
        </Button>
        <Button type="submit">
          Добавить
        </Button>
      </div>
    </form>
  );
}

export default AddResumeForm;