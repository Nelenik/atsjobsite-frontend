import { cn } from "@/shared/lib/utils";
import { HTMLAttributes } from "react";

type TFormItem = {
  labelText?: string,
  children: React.ReactNode,
  className?: string
  error?: string | null,

} & HTMLAttributes<HTMLDivElement>

export const ErrorMessage = ({ message, className }: { message: string, className?: string }) => {
  return (
    <p className={cn("text-destructive text-xs absolute right-0 top-2", className)}>
      {message}
    </p>
  )
}

const FormItem = ({
  labelText,
  children,
  className,
  error = null,
  ...props
}: TFormItem) => {
  return (
    <div
      className={cn("relative flex flex-col gap-2.5", className)}
      {...props}
    >
      {labelText && <span className="font-medium">
        {labelText}
      </span>}
      {children}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default FormItem;