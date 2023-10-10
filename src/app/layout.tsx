import Navbar from '@/components/navbar/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Cashier',
  description: 'Main menu',
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <div className="flex flex-1">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
