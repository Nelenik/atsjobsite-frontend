'use client'
import { parseVacancyResponses } from "@/shared/api/actions";
import { cn } from "@/shared/lib/utils";
import { useMutateForm } from "@/shared/model/hooks/useMutateForm";
import { Button } from "@/shared/ui/shadcn/button";
import { MessageCircleReply } from "lucide-react";

type TProps = {
  className?: string,
  vacancyId: number | string,
  externalId: string
}
export const ParseResponses = ({
  className,
  vacancyId,
  externalId
}: TProps) => {
  const { formAction, pending } = useMutateForm({ mutationAction: parseVacancyResponses, toastMessage: 'Response processing started' })
  return (
    <form
      action={formAction}
      className={cn(className)}
    >
      <input type="hidden" name="vacancy_id" defaultValue={vacancyId} />
      <input type="hidden" name="external_id" defaultValue={externalId} />
      <Button
      >
        <MessageCircleReply className={cn(pending && "animate-spin")} />
        {pending ? 'Processing...' : 'Process responses'}
      </Button>
    </form>
  );
}