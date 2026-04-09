'use client'
import { EditEntity } from "@/features/mutate-entity";
import { TCompany } from "@/shared/api/types";
import { Card } from "@/shared/ui/shadcn/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/shadcn/table";
import { format } from "date-fns";
import { FC } from "react";

type TProps = {
  companiesList: TCompany[]
}

export const CompaniesTable: FC<TProps> = ({
  companiesList
}) => {
  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader className="bg-background">
          <TableRow>
            <TableHead className="w-[30%]">
              Name
            </TableHead>
            <TableHead>
              Tax ID
            </TableHead>
            <TableHead>
              Plan
            </TableHead>
            <TableHead>
              Connection date
            </TableHead>
            <TableHead>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {companiesList.map(company => (
            <TableRow key={company.id} onClick={() => console.log('clicked row')} className="cursor-pointer  border-b-0">
              <TableCell className="font-medium text-left text-sm">
                {company.name}
              </TableCell>
              <TableCell className="font-medium text-left text-sm">
                {company.inn}
              </TableCell>
              <TableCell className="font-medium text-left text-sm">
                {company.rate}
              </TableCell>
              <TableCell className="font-medium text-left text-sm">
                {company.rate_at ? format(new Date(company.rate_at), "dd.MM.yyyy") : 'Payment date not specified'}
              </TableCell>
              <TableCell>
                <EditEntity
                  initialData={company}
                  entityType="company"
                  triggerView="icon"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}