import { auth } from 'main/auth'
import { redirect } from 'next/navigation'
import moment from 'moment'

type Props = {
  children: React.ReactNode
}

export default async function TransaksiLayout({ children }: Props) {
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