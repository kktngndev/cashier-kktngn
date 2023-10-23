import Navbar from '@/components/navbar/navbar'
import HeaderTrx from '@/components/headerTrxComponent'
import CardMenuComponent from '@/components/card/cardMenuComponent'

export default function Page() {
  return (
    <div className='flex flex-1'>
      <Navbar />
      <div className='w-screen grid grid-cols-12'>
        <div className='h-screen overflow-auto col-span-8 p-6 scrollbar-hide'>
          <HeaderTrx />
          <div className='p-2 mt-4 grid grid-cols-3 justify-items-center gap-6'>
            <CardMenuComponent />
            <CardMenuComponent />
            <CardMenuComponent />
            <CardMenuComponent />
            <CardMenuComponent />
            <CardMenuComponent />
            <CardMenuComponent />
          </div>
        </div>
        <div className='h-screen col-span-4 bg-hacienda-200 shadow-lg'>
          2
        </div>
      </div>
    </div>
  )
}
