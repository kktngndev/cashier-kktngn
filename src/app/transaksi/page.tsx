import React from 'react'
import Navbar from '@/components/navbar/navbar'
import HeaderTrx from '@/components/headerTrxComponent'

const ListCardCategoriesTrxComponent = React.lazy(() => import('@/components/list/listCardCategoriesTrxComponent'))

export default function Page() {
  return (
    <div className='flex flex-1'>
      <Navbar />
      <div className='w-screen grid grid-cols-12'>
        <div className='h-screen overflow-auto col-span-8 p-6 scrollbar-hide'>
          <HeaderTrx />
          <React.Suspense fallback={ <div>Loading...</div> }>
            <ListCardCategoriesTrxComponent />
          </React.Suspense>
        </div>
        <div className='h-screen col-span-4 bg-hacienda-200 shadow-lg'>
          2
        </div>
      </div>
    </div>
  )
}
