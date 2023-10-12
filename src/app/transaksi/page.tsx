import Navbar from '@/components/navbar/navbar'
import HeaderTrx from '@/components/headerTrxComponent'

export default function Page() {
  return (
    <div className='flex flex-1'>
      <Navbar />
      <div className='w-screen grid grid-cols-12'>
        <div className='h-screen col-span-8 p-6'>
          <HeaderTrx />
        </div>
        <div className='h-screen col-span-4 bg-hacienda-200 shadow-lg'>
          2
        </div>
      </div>
    </div>
  )
}
