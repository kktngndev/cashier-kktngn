import { Key } from 'react'
import { CardLabelComponent } from '@/components'

export async function HeaderTrx() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getKategoriData`).then(res => res.json())

  return (
    <div className='h-16 w-full flex gap-7 items-center'>
      <CardLabelComponent name='Semua' />
      {
        data.map((item: { nama_kategori: string }, index: Key | null | undefined) => (
          <CardLabelComponent key={index} name={item.nama_kategori} />
        ))
      }
    </div>
  )
}