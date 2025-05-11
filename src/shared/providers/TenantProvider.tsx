'use client'

import { createContext, ReactNode, useContext } from "react"

export const TenantContext = createContext<{ tenant: string } | null>(null)

/**
 * Is used for sharing current tenat through components
 */

type TProps = {
  children: ReactNode,
  tenant: string
}

export const TenantProvider = ({ children, tenant }: TProps) => {

  return (<TenantContext value={{
    tenant
  }}>
    {children}
  </TenantContext>)
}

export const useTenant = () => {
  const context = useContext(TenantContext)
  if (!context) {
    throw new Error('useTenat must be used within TenatProvider')
  }
  return context
}