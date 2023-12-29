import './globals.css'
import { Montserrat } from 'next/font/google'
import Providers from '@/utils/providers'
import { auth } from 'main/auth'
import { redirect } from 'next/navigation'
import moment from 'moment'

const montserrat = Montserrat({ subsets: ['latin'] })

type Props = {
  children: React.ReactNode
}


export default async function RootLayout({ children }: Props) {
  const session = await auth()

  if(!session?.supabaseAccessToken && !session?.user || moment(session?.expires).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) {
    redirect('/api/auth/signin')
  }
  
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
