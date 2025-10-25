'use client'

import { createContext, useContext } from "react"
import { Area } from "../api/getAreasCached"

type THhAreasContext = {
  areasMapPromise: Promise<Map<string, Area>>
}
export const HhAreasContext = createContext<THhAreasContext | null>(null)

/**
 * Is used for multilevel checkbox
 */

export const HhAreasProvider = HhAreasContext

export const useHhAreas = () => {
  const context = useContext(HhAreasContext)
  if (!context) {
    throw new Error('useHhAreas must be used within HhAreasProvider')
  }
  return context
}