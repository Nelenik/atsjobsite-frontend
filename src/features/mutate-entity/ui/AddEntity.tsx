'use client'
import { VacancyForm } from "@/entities/vacancy";
import { CvForm } from "@/entities/cv";
import { CompanyForm } from "@/entities/company";
import { SheetModal } from "@/shared/ui/modals/SheetModal";
import { Button } from "@/shared/ui/shadcn/button";
import { CirclePlus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useCallback } from "react";
import { CvFormWithFileParsing } from "@/entities/cv/ui/CvFormWithFileParsing";

type TProps = {
  entityType: 'vacancy' | 'company' | 'cv',
  className?: string
}

const labels = {
  vacancy: { title: 'Create vacancy', descr: 'Fill in the details for a new vacancy', triggerText: 'vacancy' },
  company: { title: 'Create company', descr: 'Fill in the details for a new company', triggerText: 'company' },
  cv: { title: 'Create resume', descr: 'Fill in the details for a new resume', triggerText: 'resume' },
}

/**
 * `AddEntity` is a reusable client-side component that provides a button
 * to trigger a modal form for creating a new entity (vacancy, company, or CV).
 * 
 * Based on the `entityType` prop, it dynamically renders the corresponding form inside a modal sheet.
 * 
 * ### Features:
 * - Renders a specific form (`VacancyForm`, `CompanyForm`, `CvForm`) depending on the selected entity.
 * - Uses a `SheetModal` for displaying forms.
 * - Customizes button text, modal title, and description based on the entity type.
 * - Closes the modal automatically after successful form submission or cancellation.
 *
 * @param entityType - Defines which form to display: `'vacancy'`, `'company'`, or `'cv'`.
 * @param className - Optional custom className for styling the trigger button.
 *
 * @example
 * ```tsx
 * <AddEntity entityType="vacancy" />
 * <AddEntity entityType="company" className="w-full" />
 * ```
 */

export const AddEntity = ({
  entityType,
  className
}: TProps) => {

  const renderContent = useCallback(({ closeSheetModal }: { closeSheetModal: () => void }) => {

    const forms = {
      vacancy: <VacancyForm type="add" onSuccess={closeSheetModal} onCancel={closeSheetModal} />,
      company: <CompanyForm type="add" onSuccess={closeSheetModal} onCancel={closeSheetModal} />,
      cv: <CvFormWithFileParsing
        renderCvForm={
          ({ initialData }) => (
            <CvForm
              type="add"
              initialData={initialData}
              onSuccess={closeSheetModal}
              onCancel={closeSheetModal}
            />
          )
        }
      />,
    }
    return forms[entityType]
  }, [entityType])

  return (
    <SheetModal
      key={entityType}
      // render prop for content
      renderContent={renderContent}
    >
      {/* named slots  */}
      {{
        trigger: <Button className={cn('w-max lg:w-full py-6 text-base flex', className)}>
          <CirclePlus />
          Add <span className="hidden sm:inline">{labels[entityType].triggerText}</span>
        </Button>,
        title: labels[entityType].title,
        description: labels[entityType].descr
      }}
    </SheetModal>
  );
}