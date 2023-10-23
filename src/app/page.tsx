import type { Metadata } from 'next'
import { lazy, Suspense } from 'react'
import Navbar from '@/components/navbar/navbar'
import Greetings from '@/utils/greetings'
import LoaderComponent from '@/components/loaderComponent'
import { MdPointOfSale } from 'react-icons/md'
import { RiCupFill } from 'react-icons/ri'
import moment from 'moment'
import 'moment/locale/id'

const CardChartComponent = lazy(() => import('@/components/card/cardChartComponent'))
const CardListComponent = lazy(() => import('@/components/card/cardListComponent'))
const CardComponent = lazy(() => import('@/components/card/cardComponent'))

export const metadata: Metadata = {
  title: 'Cashier',
  description: 'Main menu',
}

export default function Home() {

  return (
    <div className="flex flex-1">
      <Navbar />
      <div className='h-screen overflow-auto p-6 w-screen'>
        <Suspense fallback={ <LoaderComponent /> }>
          <Header />
          <Dashboard />
        </Suspense>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className='flex items-center justify-between text-hacienda-800'>
      <h1 className='font-bold text-3xl'>{Greetings()}!</h1>
      <p className='font-bold text-xl'>{moment().locale('id').format('dddd, D MMMM YYYY')}</p>
    </header>
  )
}

async function Dashboard() {
  const balance = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payment/checkBalance`, {
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json());
  console.log(balance);
  

  return (
    <div className='mt-7 flex flex-col gap-6'>
      <div className='flex gap-4'>
        <CardComponent classname='bg-hacienda-700 w-[400px] text-white' icon={<MdPointOfSale />} text='Pendapatan hari ini' text2={ new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR'}).format(balance.balance)} />
        <CardComponent classname=' bg-gray-300 text-hacienda-900' icon={<RiCupFill />} text='Jumlah pesanan hari ini' text2='196' />
      </div>
      <div className='flex gap-4'>
        <CardChartComponent />
        <CardListComponent />
      </div>
    </div>
  )
}
