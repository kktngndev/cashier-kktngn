'use client'
import './globals.css'
import { Montserrat } from 'next/font/google'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import RecoilContextProvider from '../utils/recoilContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const montserrat = Montserrat({ subsets: ['latin'] })

type Props = {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <ProgressBar color="#6f5814" height='4px' shallowRouting options={{ showSpinner: false }} />
        <QueryClientProvider client={queryClient}>
          <RecoilContextProvider>
            {children}
          </RecoilContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
