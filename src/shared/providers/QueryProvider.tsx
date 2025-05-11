'use client'
import { QueryClientProvider, QueryClient, isServer } from "@tanstack/react-query";
import { ReactNode, useEffect, useMemo } from "react";
import { useTenant } from "./TenantProvider";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

//Caching clients for different tenats
//  Map is used to store the query clients for each tenant
const browserQueryClients = new Map<string, QueryClient>();

function getQueryClient(tenant: string) {
  if (isServer || typeof window === "undefined") {
    // NOTE: This is a workaround for the fact that the QueryClientProvider
    // doesn't work with SSR in Next.js. 
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClients.has(tenant)) {
      browserQueryClients.set(tenant, makeQueryClient());
    }
    return browserQueryClients.get(tenant)!;
  }
}

const QueryProvider = ({ children }: { children: ReactNode }) => {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const { tenant } = useTenant()
  const queryClient = useMemo(() => getQueryClient(tenant), [tenant]);

  useEffect(() => {
    // Reset the cache when the tenant changes    
    queryClient.clear()
  }
    , [queryClient, tenant])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
export default QueryProvider
// const QueryProvider = ({ children }: { children: ReactNode }) => {
//   // Instead do this, which ensures each request has its own cache:
//   const [queryClient] = useState(() => new QueryClient())
//   return (
//     <QueryClientProvider client={queryClient}>

//       {children}
//     </QueryClientProvider>
//   );
// }

// export default QueryProvider;

