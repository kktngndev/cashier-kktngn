import { auth } from 'main/auth'
import moment from 'moment'
import { redirect } from 'next/navigation'

type Props = {
  children: React.ReactNode
}

export default async function LaporanLayout({ children }: Props) {
  const session = await auth()

  if(!session?.supabaseAccessToken && !session?.user || moment(session?.expires).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) {
    redirect('/api/auth/signin')
  }

  return (
    <>
      {children}
    </>
  )
}