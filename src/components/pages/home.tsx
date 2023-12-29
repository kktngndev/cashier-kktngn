import { Greetings } from "@/utils"
import { MdPointOfSale } from 'react-icons/md'
import { RiCupFill } from 'react-icons/ri'
import moment from 'moment'
import 'moment/locale/id'
import { CardChartComponent, CardComponent, CardListComponent } from '@/components'

export function Home(){
  return (
    <div className='h-screen overflow-auto p-6 w-screen'>
      <Header />
      <Dashboard />
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
  const balance = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/report/getIncomeToday`, {
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json());

  const transaction = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/report/getTransactionToday`, {}).then(res => res.json());

  return (
    <div className='mt-7 flex flex-col gap-6'>
      <div className='flex gap-4'>
        <CardComponent classname='bg-hacienda-700 w-[400px] text-white' icon={<MdPointOfSale />} text='Pendapatan hari ini' text2={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(balance.total_income)} />
        <CardComponent classname=' bg-gray-300 text-hacienda-900' icon={<RiCupFill />} text='Jumlah pesanan hari ini' text2={transaction.total} />
      </div>
      <div className='flex gap-4'>
        <CardChartComponent />
        <CardListComponent />
      </div>
    </div>
  )
}