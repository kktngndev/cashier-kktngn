import type { Metadata } from 'next'
import Navbar from '@/components/navbar/navbar'
import Greetings from '@/utils/greetings'
import CardComponent from '@/components/card/cardComponent'
import { MdPointOfSale } from 'react-icons/md'
import { RiCupFill } from 'react-icons/ri'
import moment from 'moment'
import 'moment/locale/id'
import CardChartComponent from '@/components/card/cardChartComponent'
import CardListComponent from '@/components/card/cardListComponent'

export const metadata: Metadata = {
  title: 'Cashier',
  description: 'Main menu',
}

export default function Home() {

  return (
    <div className="flex flex-1">
      <Navbar />
      <div className='h-screen overflow-auto p-6 w-screen'>
        <Header />
        <Dashboard />
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className='flex items-center justify-between text-hacienda-800'>
      <h1 className='font-bold text-3xl'>{ Greetings() }!</h1>
      <p className='font-bold text-xl'>{moment().locale('id').format('dddd, D MMMM YYYY')}</p>
    </header>
  )
}

function Dashboard() {
  return (
    <div className='mt-7 flex flex-col gap-6'>
      <div className='flex gap-4'>
        <CardComponent classname='bg-hacienda-700 text-white' icon={<MdPointOfSale />} text='Pendapatan hari ini' text2='Rp. 12.000.000' />
        <CardComponent classname=' bg-gray-300 text-hacienda-900' icon={<RiCupFill />} text='Jumlah pesanan hari ini' text2='196' />
      </div>
      <div className='flex gap-4'>
        <CardChartComponent />
        <CardListComponent />
      </div>
    </div>
  )
}

