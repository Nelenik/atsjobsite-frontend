'use client'
import { createContext, ReactNode, useContext } from "react"

export const PubVacancyPositionsContext = createContext<string[]>([])


/**
 * Is used for public vacancies positions
 * It is used in jobsite for filtering by position
 */


export const PositionsProvider = ({ children, positionsList }: { children: ReactNode, positionsList: string[] }) => {
  return (<PubVacancyPositionsContext value={positionsList}>
    {children}
  </PubVacancyPositionsContext>)
}

export const usePositions = () => {
  const context = useContext(PubVacancyPositionsContext)
  if (!context) {
    throw new Error('useNavConfig must be used within PubVacancyPositionsProvider')
  }
  return context
}