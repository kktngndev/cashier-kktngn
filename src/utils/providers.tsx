'use client'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'


type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <>
      <ProgressBar color="#6f5814" height='4px' shallowRouting options={{ showSpinner: false }} />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </RecoilRoot>
    </>
  )
}