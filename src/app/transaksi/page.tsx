'use client'
import { useEffect, useState } from 'react'
import Navbar from '@/components/navbar/navbar'
import { useRecoilState } from 'recoil'
import { checkedCategoryAtom } from '../../../atoms/categoryAtom'
import ListCardCategoriesTrxComponent from '@/components/list/listCardCategoriesTrxComponent'
import CardLabelComponent from '@/components/card/cardLabelComponent'

export default function Page() {
  const [checkedCategory, setCheckedCategory] = useRecoilState(checkedCategoryAtom)
  const [categoryData, setCategoryData] = useState([])
  useEffect(() => {
    async function getCategoryData(){
      const getData = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getKategoriData`).then(res => res.json())
      setCategoryData(getData)
    }
    getCategoryData()
  },[checkedCategory])
  return (
    <div className='flex flex-1'>
      <Navbar />
      <div className='w-screen grid grid-cols-12'>
        <div className='h-screen overflow-auto col-span-8 p-6 scrollbar-hide'>
          <div className='h-16 w-full flex gap-7 items-center'>
            <CardLabelComponent name='Semua' onChange={(e) => setCheckedCategory(e.target.checked)}/>
            {
              categoryData && categoryData.map((item: { nama_kategori: string }, index: number) => (
                <CardLabelComponent key={ index } name={ item.nama_kategori } onChange={(e) => setCheckedCategory(e.target.value)} />
              ))
            }
          </div>
          <ListCardCategoriesTrxComponent />
        </div>
        <div className='h-screen col-span-4 bg-hacienda-200 shadow-lg'>
          2
        </div>
      </div>
    </div>
  )
}
