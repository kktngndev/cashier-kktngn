'use client'
import { useSearchParams } from 'next/navigation'
import { FaCheck, FaChevronLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { ImCross } from "react-icons/im";
import { useRecoilValue } from 'recoil'
import { cartTotalAtom, paymentAtom } from '../../../atoms'

export default function Page() {
  const params = useSearchParams()
  const router = useRouter()
  const totalPayment = useRecoilValue(cartTotalAtom)
  const payment = useRecoilValue(paymentAtom)

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-hacienda-100 font-bold'>
      <div className='h-[600px] w-[400px] rounded-lg bg-gray-50 shadow-lg p-6 flex flex-col gap-7 items-center justify-center relative'>
        <div className='flex flex-col items-center gap-5'>
          {
            params.get('status') === 'success' ? (
              <>
                <span className='text-green-600 text-5xl'><FaCheck /></span>
                <h1 className='text-2xl text-hacienda-950'>Pembayaran Sukses!</h1>
              </>
            ) : (
              <>
                <span className='text-red-600 text-5xl'><ImCross /></span>
                <h1 className='text-2xl text-hacienda-950'>Pembayaran Gagal!</h1>
              </>
            )
          }
        </div>
        <div className='h-72 w-5/6 shadow-sm p-4 bg-white font-normal flex flex-col gap-4 text-sm'>
          <div className='flex justify-between items-center'>
            <p>Total Transaksi:</p>
            <p>Rp. {totalPayment}</p>
          </div>
          <div className='flex justify-between items-center'>
            <p>Total Pembayaran:</p>
            <p>Rp. {params.get('method') === 'qris' ? totalPayment : payment}</p>
          </div>
          <div className='flex justify-between items-center border-t border-hacienda-950 py-4 border-dashed'>
            <p>Total Kembali:</p>
            <p>Rp. {params.get('method') === 'qris' ? '0' : payment - totalPayment}</p>
          </div>
        </div>
        <button onClick={() => router.push('transaksi')} className='flex gap-5 items-center justify-center'><FaChevronLeft/> Kembali Ke Menu Transaksi</button>
      </div>
    </div>
  )
}
