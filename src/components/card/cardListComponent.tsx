import React from 'react'

type ListProps = {
  nomor: number,
  nama: string,
  terjual: number
}

const DummyBestSeller = [
  {
    nama: 'Es Kopi Susu',
    sold: 60
  },
  {
    nama: 'Matcha Latte',
    sold: 44
  },
  {
    nama: 'Iced Tea',
    sold: 39
  },
  {
    nama: 'Affogato Latte',
    sold: 16
  },
  {
    nama: 'Hazelnut Latte',
    sold: 8
  }
]

export default function CardListComponent() {
  return (
    <div className='p-5 w-72 h-fit rounded-2xl font-semibold flex flex-col bg-hacienda-700 text-white'>
      Best Seller hari ini
      <div className='mt-3 flex flex-col gap-4'>
        { DummyBestSeller.map((item, index) => <ListComponent key={ index } nomor={ index+1 } nama={ item.nama } terjual={ item.sold }  />) }
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
