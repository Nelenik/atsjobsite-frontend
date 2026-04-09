'use client'
import { PositionSelect } from "./PositionSelect"
import { EVacancyEmployment, EVacancyExperience, EVacancyWorkFormat, TVacancy } from "@/shared/api/types"
import { NonNullableFields } from "@/shared/lib/object_manipulations/filterFalsyFields"
import { cn } from "@/shared/lib/utils"
import FormItem, { ErrorMessage } from "@/shared/ui/form-elements/FormItem"
import { Button } from "@/shared/ui/shadcn/button"
import { Input } from "@/shared/ui/shadcn/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/shadcn/select"
import { Textarea } from "@/shared/ui/shadcn/textarea"
import { StatusSelect } from "./StatusSelect"
import { storeVacancy, updateVacancy } from "@/shared/api/actions"
import { useParams } from "next/navigation"
import { useMutateForm } from "@/shared/model/hooks/useMutateForm"

type TProps = {
  type: 'edit' | 'add'
  initialData?: NonNullableFields<TVacancy>
  onSuccess?: () => void
  onCancel?: () => void
}
/**
 * A form component for creating or editing vacancy records.
 * Handles both add and edit modes based on the type prop.
 * 
 * @param props - The component properties
 * @param props.type - Form mode ('add' or 'edit')
 * @param props.initialData - Initial form data for edit mode
 * @param props.onSuccess - Success callback
 * @param props.onCancel - Cancel callback
 * 
 */
export const VacancyForm = ({
  type,
  initialData,
  onSuccess = () => { },
  onCancel = () => { }
}: TProps) => {
  const params = useParams<{ companyId: string }>();
  const companyId = params?.companyId || '';

  //define form action depending of the form type
  const action = type === 'edit' && initialData
    ? updateVacancy.bind(null, initialData.id)
    : storeVacancy

  //define toast message
  const toastMessage = type === 'edit' ? 'Vacancy updated successfully' : 'Vacancy saved successfully'

  const { formAction, pending, defaultValues, errors, removeError } =
    useMutateForm({
      mutationAction: action,
      onSuccess,
      initialData,
      toastMessage
    });


  return (
    <form action={formAction} className="flex flex-col justify-between grow">
      <div className="sm:columns-2 sm:gap-6 [&>*:not(:last-child)]:mb-6 mb-6">
        <input type="hidden" name="company_id" defaultValue={companyId} />

        <FormItem labelText="Vacancy title" error={errors.name}>
          <Input
            placeholder="Vacancy title"
            name="name"
            defaultValue={defaultValues?.name}
            className={errors?.name && 'ring-2 ring-destructive'}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem labelText="Position" error={errors.position}>
          <PositionSelect
            name="position"
            defaultValue={defaultValues?.position}
            className={errors.position && 'ring-2 ring-destructive'}
          />
        </FormItem>

        <FormItem labelText="Status" error={errors.status_id}>
          <StatusSelect
            name="status_id"
            defaultValue={String(defaultValues?.status_id)}
            className={errors.status_id && 'ring-2 ring-destructive'}
          />
        </FormItem>

        <FormItem labelText="Responsibilities" error={errors.responsibilities}>
          <Textarea
            placeholder="Responsibilities"
            name="responsibilities"
            className={cn(
              'resize-none',
              errors.responsibilities && 'ring-2 ring-destructive'
            )}
            rows={9}
            defaultValue={defaultValues?.responsibilities}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem labelText="Conditions" error={errors.conditions}>
          <Textarea
            placeholder="Conditions"
            name="conditions"
            className={cn(
              'resize-none',
              errors.conditions && 'ring-2 ring-destructive'
            )}
            rows={10}
            defaultValue={defaultValues?.conditions}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem labelText="Employment" error={errors.employment}>
          <Select name="employment" defaultValue={defaultValues?.employment}>
            <SelectTrigger
              className={cn(errors.employment && 'ring-2 ring-destructive')}
            >
              <SelectValue placeholder="Employment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EVacancyEmployment.FULL}>Full-time</SelectItem>
              <SelectItem value={EVacancyEmployment.PARTIAL}>
                Part-time
              </SelectItem>
              <SelectItem value={EVacancyEmployment.PROJECT}>Project</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        <div >
          <p className="mb-[10px] font-medium">Salary</p>
          <div className="flex gap-4">
            <FormItem error={errors.salary_from}>
              <Input
                placeholder="from"
                name="salary_from"
                defaultValue={defaultValues?.salary_from}
                onChange={(e) => removeError(e.target.name)}
              />
            </FormItem>
            <FormItem error={errors.salary_to}>
              <Input
                placeholder="to"
                name="salary_to"
                defaultValue={defaultValues?.salary_to}
                onChange={(e) => removeError(e.target.name)}
              />
            </FormItem>
          </div>
        </div>

        <FormItem
          labelText="Requirements "
          error={errors.skills}
          className="break-before-column"
        >
          <Textarea
            placeholder="Candidate requirements"
            name="skills"
            className={cn(
              'resize-none',
              errors.skills && 'ring-2 ring-destructive'
            )}
            rows={8}
            defaultValue={defaultValues?.skills}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem labelText="Description" error={errors.description}>
          <Textarea
            placeholder="Description "
            name="description"
            className={cn(
              'resize-none',
              errors.description && 'ring-2 ring-destructive'
            )}
            rows={8}
            defaultValue={defaultValues?.description}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <div>
          <p className="mb-[10px] font-medium">Work format</p>
          <div className="flex gap-3 items-center justify-between relative">
            {errors.work_format && (
              <ErrorMessage message={errors.work_format} />
            )}
            <FormItem
              labelText="Office"
              className="flex flex-row-reverse items-center [&>span]:font-normal"
            >
              <Input
                type="radio"
                name="work_format"
                value={EVacancyWorkFormat.OFFICE}
                defaultChecked={
                  defaultValues?.work_format === EVacancyWorkFormat.OFFICE
                }
                className="h-[20px]"
              />
            </FormItem>
            <FormItem
              labelText="Remote"
              className="flex flex-row-reverse items-center [&>span]:font-normal"
            >
              <Input
                type="radio"
                name="work_format"
                value={EVacancyWorkFormat.REMOTE}
                defaultChecked={
                  defaultValues?.work_format === EVacancyWorkFormat.REMOTE
                }
                className="h-[20px]"
              />
            </FormItem>
            <FormItem
              labelText="Hybrid"
              className="flex flex-row-reverse items-center [&>span]:font-normal"
            >
              <Input
                type="radio"
                name="work_format"
                value={EVacancyWorkFormat.HYBRID}
                defaultChecked={
                  defaultValues?.work_format === EVacancyWorkFormat.HYBRID
                }
                className="h-[20px]"
              />
            </FormItem>
          </div>
        </div>

        <FormItem labelText="Experience" error={errors.experience}>
          <Select name="experience" defaultValue={defaultValues?.experience}>
            <SelectTrigger
              className={cn(errors.experience && 'ring-2 ring-destructive')}
            >
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EVacancyExperience.LESS_THAN_1}>
                0-1 year
              </SelectItem>
              <SelectItem value={EVacancyExperience.FROM_1_TO_3}>
                1-3 years
              </SelectItem>
              <SelectItem value={EVacancyExperience.FROM_3_TO_5}>
                3-5 years
              </SelectItem>
              <SelectItem value={EVacancyExperience.MORE_THAN_5}>
                more than 5 years
              </SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem labelText="Location" error={errors.location}>
          <Select name="location" defaultValue={defaultValues?.location}>
            <SelectTrigger
              className={cn(errors.location && 'ring-2 ring-destructive')}
            >
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Moscow">Moscow</SelectItem>
              <SelectItem value="Saint Petersburg">Saint Petersburg</SelectItem>
              <SelectItem value="Krasnodar">Krasnodar</SelectItem>
              <SelectItem value="Novosibirsk">Novosibirsk</SelectItem>
              <SelectItem value="Kazan">Kazan</SelectItem>
              <SelectItem value="Nizhny Novgorod">Nizhny Novgorod</SelectItem>
              <SelectItem value="Yekaterinburg">Yekaterinburg</SelectItem>
              <SelectItem value="Voronezh">Voronezh</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem labelText="External system ID" error={errors.external_id}>
          <Input
            placeholder="ID"
            name="external_id"
            defaultValue={defaultValues?.external_id}
            className={errors?.external_id && 'ring-2 ring-destructive'}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>
      </div>

      <div className="self-end">
        <Button type="button" variant="ghost" className="mr-2" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{pending ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  );
};

