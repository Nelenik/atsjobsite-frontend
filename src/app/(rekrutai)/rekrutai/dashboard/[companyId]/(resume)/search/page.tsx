'use client'
import { parseCvFromFile } from "@/shared/api/actions";
import { useMutateForm } from "@/shared/model/hooks/useMutateForm";
import { FileUploadField, FileUploadRef } from "@/shared/ui/FileUploadField";
import { ErrorMessage } from "@/shared/ui/FormItem";
import { FormEventHandler, useRef, useTransition } from "react";

const SearchPage = () => {
  const updFieldRef = useRef<FileUploadRef | null>(null)

  const [, startTransition] = useTransition()

  const { formAction, errors } =
    useMutateForm({
      mutationAction: parseCvFromFile,
      onSuccess: ({ payload }) => {
        console.log(payload)
      }
    });

  const handleSumbmit: FormEventHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    if (updFieldRef.current) {
      const files = updFieldRef.current.getFiles()
      files.forEach(file => {
        formData.append('file', file)
      })

    }
    startTransition(() => formAction(formData))

  }

  console.log(errors)
  return (
    <div>Search page

      <form onSubmit={handleSumbmit} className="flex gap-4 relative">

        <FileUploadField
          accept=".pdf"
          ref={updFieldRef}
        />
        {errors.file && <ErrorMessage message={errors.file} className="left-[30%] top-0" />}
        <button>send</button>
      </form>
    </div>
  );
}

export default SearchPage;