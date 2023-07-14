'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'

export function RQProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
