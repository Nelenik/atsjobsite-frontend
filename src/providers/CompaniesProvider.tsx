'use client'

import { getCompaniesList } from "@/actions/getData";
import { ICompany } from "@/shared/types/companies";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createContext, ReactNode, useContext } from "react"


interface CompaniesContextType {
  companiesList: ICompany[];
  isLoading: boolean;
  activeCompany: ICompany | null;
}

export const CompaniesContext = createContext<CompaniesContextType | null>(null)

export const CompaniesProvider = ({ children }: { children: ReactNode }) => {
  const { companyId } = useParams<{ companyId: string }>()

  //get user's companies list
  const { data: companiesList = [], isLoading } = useQuery({
    queryKey: ['companies', 'list'],
    queryFn: getCompaniesList
  })

  //get active company data
  const activeCompany: ICompany | null = companiesList?.find(el => el.id === Number(companyId)) || null

  return (<CompaniesContext.Provider value={{ companiesList, isLoading, activeCompany }}>
    {children}
  </CompaniesContext.Provider>)
}

export const useCompanies = () => {
  const context = useContext(CompaniesContext)
  if (!context) {
    throw new Error('useCompanies must be used within CompaniesProvider')
  }
  return context
}