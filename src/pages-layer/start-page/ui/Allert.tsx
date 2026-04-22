'use client'

import { signin } from "@/features/auth/api/auth-actions";
import { convertToFormData } from "@/shared/api/common/utils";
import { useToast } from "@/shared/model/hooks/use-toast";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/shared/ui/shadcn/alert-dialog"
import { Button } from "@/shared/ui/shadcn/button";
import { useTransition } from "react";

export const Alert = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = convertToFormData({ email: '', password: '' });

    startTransition(async () => {
      const mutationAction = signin.bind(null, null)

      //Request to server
      const { error } = await mutationAction(null, formData);

      if (error) {
        toast({
          variant: "destructive",
          description: "Error uploading demo data",
        });
        return;
      }
    })
  }

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="mb-4">
          <AlertDialogTitle className="text-center">To get dashboard demo</AlertDialogTitle>
          <AlertDialogDescription className="text-balance text-center">
            To get dashboard demo press continue. If you want to see the start page press cancel.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form onSubmit={handleContinue}>
            <Button>{isPending ? "Uploading demo..." : "Continue"}</Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}