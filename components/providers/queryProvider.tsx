'use client'

import trpc from '@/lib/_trpc/trpcClient'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import SuperJSON from 'superjson'

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          url: getUrl(),
        }),
      ],
    }),
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
function getUrl() {
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}/api/trpc`
  return 'http://localhost:3000/api/trpc'
}
