'use client'
import React from 'react'
import CardMenuComponent from '../card/cardMenuComponent'
import { useQuery } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { checkedCategoryAtom } from '../../../atoms/categoryAtom'

export default function ListCardCategoriesTrxComponent() {
  const [checkedCategory, setCheckedCategory] = useRecoilState(checkedCategoryAtom)
  
  const getData = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProdukData`)
    const res = await data.json()
    return {
      data: res,
      isKopi: res.filter((item: any) => item.kategori.nama_kategori === 'Kopi'),
      isNonKopi: res.filter((item: any) => item.kategori.nama_kategori === 'Non Kopi'),
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ['produk'],
    queryFn: getData,
    refetchInterval: 1000
  })

  const isCoffee = data?.isKopi?.map((item: { nama_produk: string, harga_produk: number, id: number }, index: number) => (
    <CardMenuComponent key={index} name={item.nama_produk} price={item.harga_produk} />
  ))

  const isNonCoffee = data?.isNonKopi?.map((item: { nama_produk: string, harga_produk: number, id: number }, index: number) => (
    <CardMenuComponent key={index} name={item.nama_produk} price={item.harga_produk} />
  ))

  return (
    <div className='p-2 mt-4 grid grid-cols-3 justify-items-center gap-6'>
      {
        isLoading && <div>Loading...</div>
      }
      {
        data && checkedCategory === 'Kopi' ? isCoffee : checkedCategory === 'Non Kopi' ? isNonCoffee : data?.data.map((item: { nama_produk: string, harga_produk: number, id: number }, index: number) => (
          <CardMenuComponent key={index} name={item.nama_produk} price={item.harga_produk} />
        ))
      }
    </div>
  )
}
