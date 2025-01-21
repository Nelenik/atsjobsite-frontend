import { cn } from "@/lib/utils";

interface IFormItem {
  labelText?: string,
  children: React.ReactNode,
  className?: string
}

const FormItem = ({ labelText, children, className }: IFormItem) => {
  return (
    <label className={cn("flex flex-col gap-2.5", className)}>
      {labelText && <span className="font-medium">
        {labelText}
      </span>}
      {children}
    </label>
  );
}

export default FormItem;