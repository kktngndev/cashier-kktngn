'use client'
import React from 'react'
import CardMenuComponent from '../card/cardMenuComponent'
import { useQuery } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { checkedCategoryAtom } from '../../../atoms/categoryAtom'

export default function ListCardCategoriesTrxComponent() {
  const [checkedCategory, setCheckedCategory] = useRecoilState(checkedCategoryAtom)

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
  
  const getData = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProdukData`)
    const res = await data.json()
    return {
      data: res,
      isPostModern: res.filter((item: any) => item.kategori.nama_kategori === 'Post Modernism'),
      isKopiKita: res.filter((item: any) => item.kategori.nama_kategori === 'Kopi Kita'),
      isNonCoffee: res.filter((item: any) => item.kategori.nama_kategori === 'Non Coffee'),
      isMainCourse: res.filter((item: any) => item.kategori.nama_kategori === 'Main Course'),
      isSnack: res.filter((item: any) => item.kategori.nama_kategori === 'Snack'),
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ['produk'],
    queryFn: getData,
    refetchInterval: 1000
  })

  const isPostMod = data?.isPostModern?.map((item: { nama_produk: string, harga_produk: number, id: number }, index: number) => (
    <CardMenuComponent key={index} name={item.nama_produk} price={numberWithCommas(item.harga_produk)} />
  ))

  const isKopiKita = data?.isKopiKita?.map((item: { nama_produk: string, harga_produk: number, id: number }, index: number) => (
    <CardMenuComponent key={index} name={item.nama_produk} price={numberWithCommas(item.harga_produk)} />
  ))

  const isNonCoffee = data?.isNonCoffee?.map((item: { nama_produk: string, harga_produk: number, id: number }, index: number) => (
    <CardMenuComponent key={index} name={item.nama_produk} price={numberWithCommas(item.harga_produk)} />
  ))

  const isMainCourse = data?.isMainCourse?.map((item: { nama_produk: string, harga_produk: number, id: number }, index: number) => (
    <CardMenuComponent key={index} name={item.nama_produk} price={numberWithCommas(item.harga_produk)} />
  ))

  const isSnack = data?.isSnack?.map((item: { nama_produk: string, harga_produk: number, id: number }, index: number) => (
    <CardMenuComponent key={index} name={item.nama_produk} price={numberWithCommas(item.harga_produk)} />
  ))

  return (
    <div className='p-2 mt-4 grid grid-cols-3 justify-items-center gap-6'>
      {
        isLoading && <div>Loading...</div>
      }
      {
        data && checkedCategory === 'Post Modernism' ? isPostMod : checkedCategory === 'Kopi Kita' ? isKopiKita : checkedCategory === 'Non Coffee' ? isNonCoffee : checkedCategory === 'Main Course' ? isMainCourse : checkedCategory === 'Snack' ? isSnack : data?.data.map((item: { nama_produk: string, harga_produk: number, id: number }, index: number) => (
          <CardMenuComponent key={index} name={item.nama_produk} price={numberWithCommas(item.harga_produk)} />
        ))
      }
    </div>
  )
}
