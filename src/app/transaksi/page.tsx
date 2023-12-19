'use client'
import { useEffect, useState, useCallback } from 'react'
import { Navbar } from '@/components/navbar'
import { useRecoilState, useRecoilValue } from 'recoil'
import { checkedCategoryAtom } from '../../../atoms/categoryAtom'
import { cartItemAtom, cartTotalAtom } from '../../../atoms/cartAtom'
import { SyncLoader } from 'react-spinners'
import { v4 as uuidv4 } from 'uuid'
import { ListCardCategoriesTrxComponent } from '@/components/list'
import { CardLabelComponent } from '@/components/card'
import { CardCartComponent } from '@/components/card'
import { ModalComponent } from '@/components'
import { CashPaymentComponent } from '@/components'

export default function Page() {
  const [checkedCategory, setCheckedCategory] = useRecoilState(checkedCategoryAtom)
  const [categoryData, setCategoryData] = useState([])
  const [cartItem, setCartItem] = useRecoilState(cartItemAtom) as any[]
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [modal, setModal] = useState(false)
  const [isProcess, setIsProcess] = useState(false)
  const total = useRecoilValue(cartTotalAtom)

  const cashlessPayment = useCallback(async () => {
    setIsProcess(true)
    const name = uuidv4()
    if (cartItem.length > 0) {
      const data = {
        amount: total,
        title: 'Waroeng Tjap Kakitangan QRIS Payment',
        name
      }
      const payment = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payment/createPaymentCashless`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
        .catch(err => console.error(err))

      if (payment) {
        console.log(payment);

        window.open(payment.payment_url, '_blank')
      }
      setIsProcess(false)
    }
    else {
      alert('Item Kosong, Silahkan Pilih Item Terlebih Dahulu')
      setIsProcess(false)
    }
  }, [cartItem, total])

  const cashPayment = useCallback(async () => {
    setIsProcess(true)
    if (cartItem.length > 0 && total !== 0) {
      setModal(true)
    }
    else {
      alert('Item Kosong, Silahkan Pilih Item Terlebih Dahulu')
    }
  }, [cartItem, total])

  const handlePaymentMethod = useCallback(() => {
    paymentMethod === 'tunai' ? cashPayment() : cashlessPayment()
  }, [paymentMethod, cashlessPayment, cashPayment])

  const handleCloseModal = () => {
    setModal(false)
    setIsProcess(false)
  }



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
        <div className='h-screen overflow-auto scrollbar-hide py-12 justify-between flex flex-col col-span-3 bg-hacienda-200 shadow-lg p-3 w-full mx-auto'>
          <div className='border-b-2 p-2 mx-4 border-hacienda-950'>
            <h1 className='text-2xl font-bold'>Keranjang</h1>
          </div>
          <div className='mt-7 px-3 overflow-auto scrollbar h-96'>
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
              <div className='flex flex-col gap-8 mt-4 justify-center'>
                <input type='radio' className='metodeBayarRadio' name='Bayar' id='Tunai' value='tunai' onChange={(e: any) => setPaymentMethod(e.target.value)} />
                <label className='metodeBayarLabel' htmlFor='Tunai'>Tunai</label>
                <input type='radio' className='metodeBayarRadio' name='Bayar' id='Non Tunai' value='nontunai' onChange={(e: any) => setPaymentMethod(e.target.value)} />
                <label className='metodeBayarLabel' htmlFor='Non Tunai'>Non Tunai (QRIS)</label>
              </div>
            </div>
            <div className='w-full flex justify-center mt-5'>
              {
                paymentMethod !== null ? isProcess ? (
                  <button disabled className='w-full h-16 bg-hacienda-700 rounded-xl border transition border-hacienda-950 text-white font-semibold opacity-80 flex items-center justify-center'>
                    <SyncLoader color='#fff' size={8} />
                  </button>
                ) : (
                  <button className='w-full h-16 bg-hacienda-800 rounded-xl border transition border-hacienda-950 text-white font-semibold hover:bg-hacienda-600 hover:text-hacienda-900' onClick={handlePaymentMethod}>Proses</button>
                ) : (
                  <button disabled className='w-full h-16 bg-hacienda-700 rounded-xl border transition border-hacienda-950 text-white font-semibold opacity-80'>Proses</button>
                )
              }
            </div>
          </div>
        </div>
      </div>
      {
        modal &&
        <ModalComponent>
          <CashPaymentComponent onClick={handleCloseModal} />
        </ModalComponent>
      }
    </div >
  )
}
