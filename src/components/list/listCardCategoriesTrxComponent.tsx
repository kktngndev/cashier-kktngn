'use client'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import { checkedCategoryAtom } from '@atoms/index'
import { LoaderComponent, CardMenuComponent } from '@/components'

export function ListCardCategoriesTrxComponent() {
  const checkedCategory = useRecoilValue(checkedCategoryAtom)

  const { data, isLoading } = useQuery({
    queryKey: ['produk'],
    queryFn: async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProdukData`)
      return data.json()
    },
    refetchInterval: 1000
  })

  let filteredList = useMemo(() => {
    return data?.filter((item: any) => {
      if (!checkedCategory) {
        return item
      }
      return item?.kategori?.nama_kategori === checkedCategory
    })
  }, [checkedCategory, data])


  return (
    <div className='p-2 mt-4 grid grid-cols-3 justify-items-center gap-6'>
      {
        isLoading && <LoaderComponent />
      }
      {
        data && filteredList.map((item: { nama_produk: string, harga_produk: number }, index: number) => (
          <CardMenuComponent key={index} name={item.nama_produk} price={item.harga_produk} />
        ))
      }
    </div>
  )
}

