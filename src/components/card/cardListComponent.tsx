import React from 'react'

type ListProps = {
  nomor: number,
  nama: string,
  terjual: number
}
export async function CardListComponent() {
  const bestSeller = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/report/getBestSellerToday`, {}).then(res => res.json());


  return (
    <div className='p-5 w-72 h-fit rounded-2xl font-semibold flex flex-col bg-hacienda-700 text-white'>
      Best Seller hari ini
      <div className='mt-3 flex flex-col gap-4'>
        { bestSeller.length > 0 ? bestSeller.map((item: any, index: number) => <ListComponent key={ index } nomor={ index+1 } nama={ item.nama_produk } terjual={ item.total_quantity }  />) 
        : 
        (<span>
          Tidak ada data
        </span>) }
      </div>
    </div>
  )
}

function ListComponent({ nomor, nama, terjual }: ListProps){
  return (
    <div className='flex gap-4'>
      <div className='w-8 h-8 bg-white rounded-full flex justify-center items-center'>
        <div className='text-xl text-hacienda-800'>
          { nomor }
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <h2>{ nama }</h2>
        <h1 className='text-sm font-light'>Terjual: { terjual }</h1>
      </div>
    </div>
  )
}
