'use client'

import { getCompaniesList } from "@/actions/getData";
import { Company } from "@/shared/types/companies";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react"


interface CompaniesContextType {
  companiesList: Company[];
  isLoading: boolean;
}

export const CompaniesContext = createContext<CompaniesContextType>({ companiesList: [], isLoading: false })

export const CompaniesProvider = ({ children }: { children: ReactNode }) => {
  //get user's companies list
  const { data: companiesList = [], isLoading } = useQuery({
    queryKey: ['companies', 'list'],
    queryFn: getCompaniesList
  })

  return (<CompaniesContext value={{ companiesList, isLoading }}>
    {children}
  </CompaniesContext>)
}

export const useCompanies = () => {
  const context = useContext(CompaniesContext)
  if (!context) {
    throw new Error('useCompanies must be used within CompaniesProvider')
  }
  return context
}