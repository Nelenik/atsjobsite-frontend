import { mutationInitialState } from "@/actions/constants";
import { TMutationState } from "@/actions/types";
import { convertFormData } from "@/lib/utils/convertFormData";
import { TValidationMappedErrors } from "@/shared/helpers";
import { ChangeEvent, useActionState, useEffect, useState } from "react";

type TFormMutationAction = (_: TMutationState, body: FormData) => Promise<TMutationState>

type TOnChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

export const useFormMutation = (mutationAction: TFormMutationAction, onSucces: () => void = () => { }) => {
  const [state, formAction, pending] = useActionState<TMutationState, FormData>(
    mutationAction,
    mutationInitialState
  );

  const [errors, setErrors] = useState<TValidationMappedErrors>({})

  useEffect(() => {
    if (state.error?.details) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...state.error?.details,
      }));
    }

  }, [state.error])

  const defaultValues = state.payload ? convertFormData(state.payload) : undefined;

  const success = state.sent && !state.error

  useEffect(() => {
    if (success) {
      console.log('Success, calling onSucces');
      onSucces()
    }
  }, [success, onSucces])

  console.log(state)


  //Removes the error from the errors object when the user starts entering data.
  const onChange = (e: TOnChangeEvent) => {
    const nameAtr = e.target.name;
    if (!errors.hasOwnProperty(nameAtr)) {
      return
    }
    setErrors((prevState) => {
      const updatedErrors = { ...prevState }
      delete updatedErrors[nameAtr]
      return updatedErrors
    });
  }

  return {
    formAction,
    pending,
    defaultValues,
    errors,
    // success,
    onChange
  }
}