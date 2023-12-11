'use client'
import { useEffect, useState, useCallback } from 'react'
import Navbar from '@/components/navbar/navbar'
import { useRecoilState, useRecoilValue } from 'recoil'
import { checkedCategoryAtom } from '../../../atoms/categoryAtom'
import { cartItemAtom, cartTotalAtom } from '../../../atoms/cartAtom'
import ListCardCategoriesTrxComponent from '@/components/list/listCardCategoriesTrxComponent'
import CardLabelComponent from '@/components/card/cardLabelComponent'
import CardCartComponent from '@/components/card/cardCartComponent'

export default function Page() {
  const [checkedCategory, setCheckedCategory] = useRecoilState(checkedCategoryAtom)
  const [categoryData, setCategoryData] = useState([])
  const [cartItem, setCartItem] = useRecoilState(cartItemAtom) as any[]
  const [paymentMethod, setPaymentMethod] = useState(null)
  const total = useRecoilValue(cartTotalAtom)

  const cashlessPayment = useCallback(async () => {
    if (cartItem.length > 0) {
      const data = {
        amount: total,
        title: 'Waroeng Tjap Kakitangan QRIS Payment'
      }
      const payment = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payment/createPaymentCashless`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
        .catch(err => console.log(err))
      console.log(payment);
    }
    else {
      alert('Item Kosong, Silahkan Pilih Item Terlebih Dahulu')
    }
  }, [cartItem, total])

  const handlePaymentMethod = useCallback(() => {
    paymentMethod === 'tunai' ? console.log('tunai') : cashlessPayment()
  }, [paymentMethod, cashlessPayment])



  useEffect(() => {
    async function getCategoryData() {
      const getData = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getKategoriData`).then(res => res.json())
      setCategoryData(getData)
    }
    getCategoryData()
  }, [checkedCategory])

  return (
    <div className='flex flex-1'>
      <Navbar />
      <div className='w-screen grid grid-cols-12'>
        <div className='h-screen overflow-auto col-span-9 p-6 scrollbar-hide'>
          <div className='h-16 w-full flex gap-7 items-center'>
            {
              categoryData && categoryData.map((item: { nama_kategori: string }, index: number) => (
                <CardLabelComponent key={index} name={item.nama_kategori} onChange={(e) => setCheckedCategory(e.target.value)} />
              ))
            }
          </div>
          <ListCardCategoriesTrxComponent />
        </div>
        <div className='h-screen overflow-auto scrollbar-hide col-span-3 bg-hacienda-200 shadow-lg p-3 w-full mx-auto'>
          <div className='border-b-2 p-2 mx-4 border-hacienda-950'>
            <h1 className='text-2xl font-bold'>Keranjang</h1>
          </div>
          <div className='mt-7 px-3 overflow-auto scrollbar h-64'>
            {
              cartItem.length > 0 ? cartItem.map((item: any, index: number) => (
                <CardCartComponent key={index} item={item} />
              ))
                : <p className='text-center text-xl font-semibold'>Keranjang Kosong</p>
            }
          </div>
          <div className='relative mt-6 p-3 bottom-0 flex flex-col justify-between gap-6 h-[350px] border-t-2 border-hacienda-950'>
            <div className='flex items-start justify-between'>
              <h1 className='font-bold text-3xl'>Total: </h1>
              <p className='text-3xl'>Rp. {total}</p>
            </div>
            <div>
              <h4 className='font-semibold text-xl text-center'>Metode Pembayaran</h4>
              <div className='flex gap-8 mt-4 justify-center'>
                <input type='radio' className='metodeBayarRadio' name='Bayar' id='Tunai' value='tunai' onChange={(e: any) => setPaymentMethod(e.target.value)} />
                <label className='metodeBayarLabel' htmlFor='Tunai'>Tunai</label>
                <input type='radio' className='metodeBayarRadio' name='Bayar' id='Non Tunai' value='nontunai' onChange={(e: any) => setPaymentMethod(e.target.value)} />
                <label className='metodeBayarLabel' htmlFor='Non Tunai'>Non Tunai</label>
              </div>
            </div>
            <div className='w-full flex justify-center mt-5'>
              {
                paymentMethod !== null ? (
                  <button className='w-full h-16 bg-hacienda-700 rounded-xl border transition border-hacienda-950 text-white font-semibold hover:bg-hacienda-600 hover:text-hacienda-900' onClick={handlePaymentMethod}>Proses</button>
                ) : (
                  <button disabled className='w-full h-16 bg-hacienda-700 rounded-xl border transition border-hacienda-950 text-white font-semibold opacity-80' onClick={handlePaymentMethod}>Proses</button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
